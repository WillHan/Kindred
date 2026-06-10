import { createFileRoute, Link } from "@tanstack/react-router";
import { KindredLogo } from "@/components/KindredLogo";
import { Button } from "@/components/ui/button";
import { ArrowRight, LifeBuoy } from "lucide-react";

export const Route = createFileRoute("/aird")({
  head: () => ({
    meta: [
      { title: "AIRD (AI Replacement Dysfunction) — what it is & what helps" },
      {
        name: "description",
        content:
          "AIRD — AI Replacement Dysfunction — explained: what AIRD is, what AI Replacement Dysfunction feels like, and simple, non-clinical things that help.",
      },
      {
        property: "og:title",
        content: "AIRD (AI Replacement Dysfunction) — what it is & what helps",
      },
      {
        property: "og:description",
        content:
          "AIRD (AI Replacement Dysfunction): a name for the anxiety and lost identity people feel as AI threatens their work — and gentle, human steps that help.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://kindred.mygoodcommonsense.com/aird" },
    ],
    links: [
      { rel: "canonical", href: "https://kindred.mygoodcommonsense.com/aird" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "AIRD — what it is, and what actually helps",
          description:
            "AIRD (AI Replacement Dysfunction): what it is, what it feels like, and simple, non-clinical things that help.",
          author: { "@type": "Organization", name: "Kindred" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is AIRD?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AIRD (AI Replacement Dysfunction) is a term coined in 2025 by University of Florida researchers (McNamara & Thornton) for the stress and lost identity people feel as AI replaces or threatens their work. The fear and uncertainty alone are enough to cause strain.",
              },
            },
            {
              "@type": "Question",
              name: "What does AIRD feel like?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Anxiety, trouble sleeping, a racing 'what now' mind; feeling useless or unneeded; losing a sense of who you are when the work goes; pulling away from people.",
              },
            },
            {
              "@type": "Question",
              name: "What actually helps with AIRD?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Name it. Know you're not alone. Take one small step today. Tell one person. Talk to a professional if it's heavy.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: AirdPage,
});

function AirdPage() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/">
          <KindredLogo />
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="ghost" className="rounded-full">
            <Link to="/">Home</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full">
            <Link to="/chat">Talk to Kindred</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10 sm:pt-16">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <LifeBuoy className="h-3 w-3 text-accent" />
          Non-clinical · information, not medical advice
        </div>

        <h1 className="text-balance font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
          AIRD — what it is, and{" "}
          <span className="italic text-primary">what actually helps</span>
        </h1>

        <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
          If you found this because AI is threatening your job and you feel
          anxious, lost, or "no longer needed" — you're not broken, and you're
          not alone. There's a name for this now.
        </p>

        <section className="mt-12">
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
            What is AIRD?
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            AIRD (AI Replacement Dysfunction) is a term coined in 2025 by
            University of Florida researchers (McNamara & Thornton) for the
            stress and lost identity people feel as AI replaces or threatens
            their work. A key finding: the strain doesn't require actually
            losing your job — the fear and uncertainty are enough.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
            What it can feel like
          </h2>
          <ul className="mt-3 space-y-2 leading-relaxed text-muted-foreground">
            <li>· anxiety, trouble sleeping, a racing "what now" mind</li>
            <li>· feeling useless, unneeded, or like your skills don't matter</li>
            <li>· losing a sense of who you are when the work goes</li>
            <li>· pulling away from people, going quiet</li>
          </ul>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            None of that means something is wrong with you. It's a human
            response to the ground shifting.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
            What actually helps
          </h2>
          <ul className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Name it.</span>{" "}
              Putting words to the feeling ("this is AIRD") takes some of its
              power away.
            </li>
            <li>
              <span className="font-medium text-foreground">
                Know you're not alone.
              </span>{" "}
              This is a wave, not a personal failing.
            </li>
            <li>
              <span className="font-medium text-foreground">
                One small step today.
              </span>{" "}
              Not a five-year plan — just the next small thing.
            </li>
            <li>
              <span className="font-medium text-foreground">
                Tell one person.
              </span>{" "}
              The feeling shrinks the moment it's shared.
            </li>
            <li>
              <span className="font-medium text-foreground">
                Talk to a professional if it's heavy.
              </span>{" "}
              Naming it doesn't replace real help when you need it.
            </li>
          </ul>
        </section>

        <section className="mt-10 rounded-3xl border border-border bg-card p-7">
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
            If it's heavy right now
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            If you're thinking about harming yourself, please reach a human now:
          </p>
          <ul className="mt-3 space-y-2 leading-relaxed text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Canada / US:</span>{" "}
              call or text <span className="font-medium text-foreground">9-8-8</span>
            </li>
            <li>
              <span className="font-medium text-foreground">UK:</span>{" "}
              <span className="font-medium text-foreground">116 123</span>{" "}
              (Samaritans)
            </li>
            <li>
              <span className="font-medium text-foreground">Anywhere:</span>{" "}
              <a
                className="underline underline-offset-2"
                href="https://findahelpline.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                findahelpline.com
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
            Where Kindred fits
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Researchers named the problem.{" "}
            <span className="font-medium text-foreground">
              Kindred is the human answer.
            </span>{" "}
            We're a non-profit, non-clinical, AI-assisted project with a human
            in the loop — not a clinic, not a therapist, not a diagnosis. A
            quiet, opt-in place to land. You don't have to be "okay enough."
            You just don't have to be the only one.
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/">
                Come find the quiet place
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <p className="mt-12 text-xs italic text-muted-foreground">
          Non-clinical information, not medical advice. If you need care,
          please reach a professional or the lines above.
        </p>
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
