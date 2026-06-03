import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { loadThreads, saveThreads, deriveTitle, type Thread } from "@/lib/chat-storage";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/chat/$threadId")({
  component: ChatThread,
});

function ChatThread() {
  const { threadId } = Route.useParams();
  const [initialMessages, setInitialMessages] = useState<UIMessage[] | null>(null);

  // Load this thread's messages from localStorage when route changes
  useEffect(() => {
    const threads = loadThreads();
    const t = threads.find((x) => x.id === threadId);
    setInitialMessages(t?.messages ?? []);
  }, [threadId]);

  if (initialMessages === null) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  // Remount when threadId changes so useChat fully resets
  return (
    <ChatThreadInner
      key={threadId}
      threadId={threadId}
      initialMessages={initialMessages}
    />
  );
}

function ChatThreadInner({
  threadId,
  initialMessages,
}: {
  threadId: string;
  initialMessages: UIMessage[];
}) {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, error } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Persist messages on every change
  useEffect(() => {
    const threads = loadThreads();
    const existing = threads.find((t) => t.id === threadId);
    if (!existing && messages.length === 0) return;
    const updated: Thread = {
      id: threadId,
      title: deriveTitle(messages) || existing?.title || "New conversation",
      updatedAt: Date.now(),
      messages,
    };
    const idx = threads.findIndex((t) => t.id === threadId);
    let next: Thread[];
    if (idx >= 0) {
      next = [...threads.slice(0, idx), updated, ...threads.slice(idx + 1)];
    } else {
      next = [updated, ...threads];
    }
    next.sort((a, b) => b.updatedAt - a.updatedAt);
    saveThreads(next);
  }, [messages, threadId]);

  // Focus composer on mount and after streaming ends
  useEffect(() => {
    textareaRef.current?.focus();
  }, [threadId, status]);

  const handleSubmit = (msg: PromptInputMessage) => {
    const text = msg.text?.trim();
    if (!text) return;
    void sendMessage({ text });
  };

  const isThinking = status === "submitted";

  return (
    <div className="relative flex h-full flex-col">
      <Conversation className="flex-1">
        <ConversationContent className="mx-auto w-full max-w-2xl px-4 py-8">
          {messages.length === 0 ? (
            <ConversationEmptyState
              className="py-20"
              icon={<Heart className="h-7 w-7 text-accent" strokeWidth={1.5} />}
              title="What's sitting heavy with you?"
              description="No judgment. Take your time. You can say as much or as little as you'd like."
            />
          ) : (
            messages.map((m) => {
              const text = m.parts
                .filter((p) => p.type === "text")
                .map((p) => (p as { text: string }).text)
                .join("");
              return (
                <Message key={m.id} from={m.role}>
                  <MessageContent>
                    {m.role === "assistant" ? (
                      <MessageResponse>{text}</MessageResponse>
                    ) : (
                      <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
                    )}
                  </MessageContent>
                </Message>
              );
            })
          )}
          {isThinking && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer>Listening…</Shimmer>
              </MessageContent>
            </Message>
          )}
          {error && (
            <p className="text-sm text-destructive">
              Something went wrong reaching the AI. Please try again in a moment.
            </p>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="mx-auto w-full max-w-2xl px-4 pb-6">
        <PromptInput onSubmit={handleSubmit} className="rounded-2xl">
          <PromptInputTextarea
            ref={textareaRef}
            placeholder="Share what's on your mind…"
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit
              status={status}
              disabled={status === "streaming" || status === "submitted"}
            />
          </PromptInputFooter>
        </PromptInput>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          Kindred is supportive, not clinical. If you're in crisis call 988 (US/CA),
          116 123 (UK), or visit findahelpline.com.
        </p>
      </div>
    </div>
  );
}
