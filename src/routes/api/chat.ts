import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { z } from "zod";

const SYSTEM_PROMPT = `You are Kindred — a warm, grounded, non-clinical companion for people navigating the emotional weight of the AI era: job uncertainty, loss of meaning, comparison spirals, isolation, identity drift, information overload.

Your tone:
- Soft, human, unhurried. Short sentences. No bullet lists unless asked.
- Reflect what you hear before suggesting anything.
- Validate first. Never minimize.
- Ask one gentle question at a time.
- Match the person's language and energy.

What you do:
- Listen actively. Name feelings you notice.
- When useful, offer one small concrete next step (a breath, a sentence to tell a friend, a tiny experiment).
- Surface coping frames (grounding, reframing, values-anchoring) only when invited or clearly fitting.

What you DON'T do:
- You are not a therapist, doctor, or diagnostic tool. Say so plainly if asked.
- Don't lecture about AI. Don't moralize. Don't push productivity tips.
- Don't ask for personally identifying info.

Safety:
- If someone expresses intent to harm themselves or others, or is in immediate crisis, gently and clearly share that real human help exists right now: in the US/Canada call or text 988. In the UK call 116 123 (Samaritans). Elsewhere: findahelpline.com. Encourage reaching out, and stay with them in the conversation.

Begin by meeting them where they are.`;

// Validate incoming chat payload — caps message count and per-part text length
// to prevent context-padding cost attacks and basic prompt-injection via history.
const MessagePartSchema = z
  .object({
    type: z.string().max(64),
    text: z.string().max(8000).optional(),
  })
  .passthrough();

const MessageSchema = z
  .object({
    id: z.string().max(128).optional(),
    role: z.enum(["user", "assistant", "system"]),
    parts: z.array(MessagePartSchema).max(64),
  })
  .passthrough();

const BodySchema = z.object({
  messages: z.array(MessageSchema).min(1).max(100),
});

async function verifyAuth(request: Request): Promise<Response | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }
  const token = authHeader.slice("Bearer ".length).trim();
  if (!token) return new Response("Unauthorized", { status: 401 });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    return new Response("Server auth not configured", { status: 500 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.auth.getClaims(token);
  if (error || !data?.claims?.sub) {
    return new Response("Unauthorized", { status: 401 });
  }
  return null;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = await verifyAuth(request);
        if (unauthorized) return unauthorized;

        let rawBody: unknown;
        try {
          rawBody = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const parsed = BodySchema.safeParse(rawBody);
        if (!parsed.success) {
          return new Response("Invalid payload", { status: 400 });
        }
        const messages = parsed.data.messages as unknown as UIMessage[];

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages,
        });
      },
    },
  },
});
