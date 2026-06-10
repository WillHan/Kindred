import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ADMIN_EMAIL = "test-admin@kindred.com";

export const getAdminSystemPrompt = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = (context.claims as { email?: string })?.email;
    if (!email || email.toLowerCase() !== ADMIN_EMAIL) {
      throw new Error("Forbidden: admin only");
    }
    const { SYSTEM_PROMPT } = await import("./system-prompt.server");
    return { email, prompt: SYSTEM_PROMPT };
  });
