import { createFileRoute, Outlet, useNavigate, useParams, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { KindredLogo } from "@/components/KindredLogo";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, MessageCircle, ArrowLeft } from "lucide-react";
import { loadThreads, saveThreads, newThreadId, type Thread } from "@/lib/chat-storage";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat with Kindred" },
      {
        name: "description",
        content:
          "A warm, non-clinical AI companion. Talk through what's on your mind, privately in your browser.",
      },
    ],
  }),
  component: ChatLayout,
});

export type ChatLayoutContext = {
  threads: Thread[];
  upsertThread: (thread: Thread) => void;
};

function ChatLayout() {
  const router = useRouter();
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as { threadId?: string };
  const activeId = params.threadId;

  const [threads, setThreads] = useState<Thread[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Bootstrap (idempotent): load threads, create first if needed, navigate to "/" thread.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = loadThreads();
    let initial = existing;
    if (initial.length === 0) {
      const id = newThreadId();
      const first: Thread = {
        id,
        title: "New conversation",
        updatedAt: Date.now(),
        messages: [],
      };
      initial = [first];
      saveThreads(initial);
    }
    setThreads(initial);
    setHydrated(true);
    if (!activeId) {
      navigate({ to: "/chat/$threadId", params: { threadId: initial[0].id }, replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const upsertThread = useCallback((thread: Thread) => {
    setThreads((prev) => {
      const idx = prev.findIndex((t) => t.id === thread.id);
      const next = idx >= 0
        ? [...prev.slice(0, idx), thread, ...prev.slice(idx + 1)]
        : [thread, ...prev];
      next.sort((a, b) => b.updatedAt - a.updatedAt);
      saveThreads(next);
      return next;
    });
  }, []);

  const createThread = useCallback(() => {
    const id = newThreadId();
    const t: Thread = { id, title: "New conversation", updatedAt: Date.now(), messages: [] };
    setThreads((prev) => {
      const next = [t, ...prev];
      saveThreads(next);
      return next;
    });
    navigate({ to: "/chat/$threadId", params: { threadId: id } });
  }, [navigate]);

  const deleteThread = useCallback((id: string) => {
    setThreads((prev) => {
      const next = prev.filter((t) => t.id !== id);
      if (next.length === 0) {
        const fresh: Thread = { id: newThreadId(), title: "New conversation", updatedAt: Date.now(), messages: [] };
        const arr = [fresh];
        saveThreads(arr);
        navigate({ to: "/chat/$threadId", params: { threadId: fresh.id }, replace: true });
        return arr;
      }
      saveThreads(next);
      if (id === activeId) {
        navigate({ to: "/chat/$threadId", params: { threadId: next[0].id }, replace: true });
      }
      return next;
    });
  }, [activeId, navigate]);




  return (
    <div className="flex h-screen w-full bg-background">
      <aside className="hidden w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </div>
        <div className="px-3 pb-2">
          <Button onClick={createThread} className="w-full justify-start rounded-xl" variant="secondary">
            <Plus className="h-4 w-4" /> New conversation
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 pb-3">
          {threads.map((t) => {
            const isActive = t.id === activeId;
            return (
              <div
                key={t.id}
                className={`group mx-1 my-0.5 flex items-center gap-1 rounded-lg px-2 ${isActive ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/60"}`}
              >
                <button
                  type="button"
                  onClick={() => navigate({ to: "/chat/$threadId", params: { threadId: t.id } })}
                  className="flex flex-1 items-center gap-2 truncate py-2 text-left text-sm text-sidebar-foreground"
                >
                  <MessageCircle className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span className="truncate">{t.title}</span>
                </button>
                <button
                  type="button"
                  aria-label="Delete conversation"
                  onClick={() => deleteThread(t.id)}
                  className="rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-background hover:text-destructive group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border px-4 py-3">
          <KindredLogo />
          <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
            Kindred isn't a therapist. In crisis call 988 (US/CA) or 116 123 (UK).
          </p>
        </div>
      </aside>

      <main className="flex flex-1 flex-col">
        {hydrated ? (
          <Outlet />
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            Loading…
          </div>
        )}
      </main>
    </div>
  );
}
