import { createFileRoute, Link } from "@tanstack/react-router";
import { KindredLogo } from "@/components/KindredLogo";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Radar,
  MessageCircleHeart,
  Compass,
  RotateCcw,
  Code2,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kindred — open source AI companion for the mental cost of AI" },
      {
        name: "description",
        content:
          "An open source project using AI to reach, listen to, and gently support people struggling with the emotional weight of the AI era.",
      },
      { property: "og:title", content: "Kindred — open source AI companion" },
      {
        property: "og:description",
        content:
          "Outreach. Conversation. Support. Reflection. Four engines, fully open source, built so no one navigates the AI era alone.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});

const ENGINES = [
  {
    icon: Radar,
    title: "Reach",
    subtitle: "Meet people where they already are",
    body: "We never monitor, track, or scan anyone. Kindred shares feeling-first videos and music about what AI is doing to work and identity. People who recognize themselves choose to come to us — anonymously, on their own terms.",
  },
  {
    icon: MessageCircleHeart,
    title: "Conversation",
    subtitle: "Meet them where they are",
    body: "A warm, non-clinical AI companion that listens first, validates, and walks alongside — not above. Safe defaults, crisis-aware, never claims to be a therapist.",
  },
  {
    icon: Compass,
    title: "Support",
    subtitle: "One small step at a time",
    body: "Customized, evidence-informed next steps — a grounding exercise, a journal prompt, a community to find, a hotline when needed. Ongoing, gentle, opt-in.",
  },
  {
    icon: RotateCcw,
    title: "Reflection",
    subtitle: "Learn, with consent",
    body: "Anonymous, opt-in feedback teaches the system what actually helps — so outreach, conversation, and support get kinder and more useful over time.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <KindredLogo />
        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer noopener"
            className="hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            <Code2 className="h-4 w-4" />
            Contribute
          </a>
          <Button asChild size="sm" variant="ghost" className="rounded-full">
            <Link to="/auth">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full">
            <Link to="/chat">Talk to Kindred</Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-4xl px-6 pb-24 pt-16 text-center sm:pt-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-accent" />
            Open source · community-built · non-clinical
          </div>
          <h1 className="text-balance font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
            The AI revolution is changing how we feel.
            <br />
            <span className="italic text-primary">No one should face it alone.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-balance text-lg text-muted-foreground">
            Kindred is an open project using AI for the opposite of what's
            scaring us — to reach people who feel left behind by AI, listen
            without judgment, and walk with them toward something a little
            lighter.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/chat">
                Start a conversation
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-6"
            >
              <a href="#engines">See how it works</a>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            If you're in crisis: in the US/Canada call or text{" "}
            <span className="font-medium text-foreground">988</span> · UK{" "}
            <span className="font-medium text-foreground">116 123</span> ·
            elsewhere{" "}
            <a
              className="underline underline-offset-2"
              href="https://findahelpline.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              findahelpline.com
            </a>
          </p>
        </section>

        <section
          id="engines"
          className="mx-auto max-w-6xl px-6 pb-24"
        >
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-widest text-accent">
              Four engines, one circle
            </p>
            <h2 className="font-serif text-4xl text-foreground sm:text-5xl">
              Care, designed as a system that learns from being cared for.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {ENGINES.map((e, i) => {
              const Icon = e.icon;
              return (
                <article
                  key={e.title}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-shadow hover:shadow-[0_8px_40px_-12px_color-mix(in_oklab,var(--color-primary)_25%,transparent)]"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      0{i + 1}
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl text-foreground">
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {e.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {e.body}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 pb-28">
          <div className="rounded-3xl border border-border bg-card p-10 text-center sm:p-14">
            <h2 className="font-serif text-3xl text-foreground sm:text-4xl">
              Built in the open. Built by people who care.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Researchers, clinicians, engineers, designers, and people with
              lived experience are all welcome. Kindred only works if it's
              shaped by the community it serves.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Code2 className="mr-1 h-4 w-4" />
                  Contribute on GitHub
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="rounded-full"
              >
                <Link to="/chat">Try the conversation engine</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <span>
            © {new Date().getFullYear()} Kindred · A community project, not
            medical care.
          </span>
          <span>
            In crisis? Call 988 (US/CA) · 116 123 (UK) ·{" "}
            <a
              className="underline underline-offset-2"
              href="https://findahelpline.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              findahelpline.com
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
