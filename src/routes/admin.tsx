import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { KindredLogo } from "@/components/KindredLogo";
import { ArrowLeft, Lock } from "lucide-react";
import { getAdminSystemPrompt } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Kindred" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

const ADMIN_EMAIL = "test-admin@kindred.com";

function AdminPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user?.email ?? null);
      setReady(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_e, session) => setEmail(session?.user?.email ?? null),
    );
    return () => subscription.unsubscribe();
  }, []);

  const fetchPrompt = useServerFn(getAdminSystemPrompt);
  const authorized = email?.toLowerCase() === ADMIN_EMAIL;
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-prompt"],
    queryFn: () => fetchPrompt(),
    enabled: authorized,
  });

  if (!ready) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-sm text-center">
          <Lock className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />
          <h1 className="font-serif text-2xl">Admin sign-in required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with the admin account to continue.
          </p>
          <Button
            className="mt-5 rounded-full"
            onClick={() => navigate({ to: "/auth" })}
          >
            Go to sign in
          </Button>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-sm text-center">
          <h1 className="font-serif text-2xl">Not authorized</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Signed in as {email}. Admin access is restricted.
          </p>
          <Button
            variant="ghost"
            className="mt-5 rounded-full"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
        <Link to="/">
          <KindredLogo />
        </Link>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{email}</span>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-full"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/" });
            }}
          >
            Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-24">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> Home
        </Link>

        <h1 className="font-serif text-3xl text-foreground sm:text-4xl">
          Admin
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Internal tools. Treat any content here as confidential.
        </p>

        <section className="mt-10 rounded-2xl border border-border bg-card p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-xl">Chat system prompt</h2>
            <span className="text-xs text-muted-foreground">
              served by /api/chat
            </span>
          </div>
          {isLoading && (
            <p className="text-sm text-muted-foreground">Loading…</p>
          )}
          {error && (
            <p className="text-sm text-destructive">
              {error instanceof Error ? error.message : "Failed to load"}
            </p>
          )}
          {data?.prompt && (
            <pre className="mt-2 max-h-[60vh] overflow-auto whitespace-pre-wrap rounded-lg bg-muted p-4 text-xs leading-relaxed text-foreground">
              {data.prompt}
            </pre>
          )}
        </section>
      </main>
    </div>
  );
}
