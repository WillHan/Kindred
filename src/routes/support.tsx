import { createFileRoute, Link } from "@tanstack/react-router";
import { KindredLogo } from "@/components/KindredLogo";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support Kindred — keep it free for the people who need it" },
      {
        name: "description",
        content:
          "Kindred is always free for the people who need it. It stays free because people who care chip in. Here's how to help.",
      },
      { property: "og:title", content: "Support Kindred" },
      {
        property: "og:description",
        content:
          "Kindred is always free for the people who need it — funded by people who care, not by them.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kindred.mygoodcommonsense.com/support" },
    ],
    links: [
      { rel: "canonical", href: "https://kindred.mygoodcommonsense.com/support" },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/">
          <KindredLogo />
        </Link>
        <Button asChild size="sm" variant="ghost" className="rounded-full">
          <Link to="/">Home</Link>
        </Button>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10 sm:pt-16">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Heart className="h-3 w-3 text-accent" />
          Always free for the people who need it
        </div>

        <h1 className="text-balance font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
          Kindred is{" "}
          <span className="italic text-primary">free because people care</span>
          , not because someone's paying with their data.
        </h1>

        <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
          If you're using Kindred to feel a little less alone, you'll never be
          charged. No paywall, no upsell, no credit card. People who are doing
          okay help cover the cost so people who aren't can just land here and
          breathe.
        </p>

        <section className="mt-10">
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
            Ways to help
          </h2>
          <ul className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Chip in.</span>{" "}
              Any amount keeps the lights on for someone you'll never meet.
            </li>
            <li>
              <span className="font-medium text-foreground">Contribute.</span>{" "}
              Engineers, writers, clinicians, designers — Kindred is open
              source and shaped by the community it serves.
            </li>
            <li>
              <span className="font-medium text-foreground">Tell one person.</span>{" "}
              Most people who need this don't know it exists yet.
            </li>
          </ul>
        </section>

        <div className="mt-10">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link to="/">
              Back to Kindred
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <p className="mt-12 text-xs italic text-muted-foreground">
          Non-profit · non-clinical · open source.
        </p>
      </main>
    </div>
  );
}
