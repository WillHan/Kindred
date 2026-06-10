import { createFileRoute, Link } from "@tanstack/react-router";
import { KindredLogo } from "@/components/KindredLogo";
import { Button } from "@/components/ui/button";
import { ArrowRight, LifeBuoy } from "lucide-react";

const TITLE = "AI anxiety: a gentle guide to the fear of AI";
const DESCRIPTION =
  "A non-clinical guide to AI anxiety and the fear of AI — what it is, why it's so common right now, and simple, practical things that actually help.";
const URL = "https://kindred.mygoodcommonsense.com/blog/ai-anxiety-guide";

export const Route = createFileRoute("/blog/ai-anxiety-guide")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "Kindred" },
          mainEntityOfPage: URL,
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
              name: "What is AI anxiety?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AI anxiety is the worry, dread, or low-grade panic many people feel about how fast AI is changing work and daily life. It can show up as fear of losing your job, fear of falling behind, or a vague sense that the future is slipping away from you.",
              },
            },
            {
              "@type": "Question",
              name: "Is fear of AI normal?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. When the world changes faster than we can make sense of it, fear is a normal human response — not a flaw. A lot of people are feeling some version of it right now.",
              },
            },
            {
              "@type": "Question",
              name: "How do I cope with AI anxiety?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Name what you're feeling, limit doomscrolling, take one small concrete step (learn one tool, talk to one person, update one skill), stay connected with people, and reach a professional if it feels heavy.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: AiAnxietyGuide,
});

function AiAnxietyGuide() {
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
          AI anxiety:{" "}
          <span className="italic text-primary">
            a gentle guide to the fear of AI
          </span>
        </h1>

        <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
          If the pace of AI is making you feel anxious, behind, or quietly
          panicked about what comes next — you're not alone, and you're not
          overreacting. This is a short, honest guide to what AI anxiety is and
          what actually helps.
        </p>

        <section className="mt-12">
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
            What is AI anxiety?
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            AI anxiety is the worry, dread, or low-grade panic many people feel
            as AI changes work and daily life faster than we can make sense of
            it. It can sound like: <em>"Will my job exist next year?"</em>{" "}
            <em>"Am I already behind?"</em>{" "}
            <em>"What's the point of getting good at anything?"</em> The fear of
            AI doesn't require anything bad to have happened yet — the
            uncertainty alone is enough.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
            Why so many people feel it right now
          </h2>
          <ul className="mt-3 space-y-2 leading-relaxed text-muted-foreground">
            <li>· the rules of work are being rewritten in public, in real time</li>
            <li>· news and social feeds amplify the scariest version of the story</li>
            <li>· identity is tangled up with what we do — and that's shifting</li>
            <li>· there's no clear playbook yet, so everyone looks lost</li>
          </ul>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            None of that means something is wrong with you. It means you're
            paying attention.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
            What it can feel like
          </h2>
          <ul className="mt-3 space-y-2 leading-relaxed text-muted-foreground">
            <li>· racing thoughts, trouble sleeping, a tight chest</li>
            <li>· comparing yourself to everyone "ahead" online</li>
            <li>· avoiding the topic — or doomscrolling it for hours</li>
            <li>· feeling useless, frozen, or quietly hopeless</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
            What actually helps
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            This isn't therapy or medical advice — just simple things that help
            real people lower the volume on AI anxiety.
          </p>
          <ul className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Name it.</span>{" "}
              Saying "this is AI anxiety" out loud takes some of its power
              away. It's a known thing, not a personal failing.
            </li>
            <li>
              <span className="font-medium text-foreground">
                Cut the doom intake.
              </span>{" "}
              Mute the loudest accounts for a week. The signal returns; the
              dread fades.
            </li>
            <li>
              <span className="font-medium text-foreground">
                One small, concrete step.
              </span>{" "}
              Try one tool for 20 minutes. Update one bullet on your resume.
              Action shrinks fear faster than planning.
            </li>
            <li>
              <span className="font-medium text-foreground">
                Stay close to people.
              </span>{" "}
              Tell one person how you're feeling. The fear of AI is loneliest
              in the dark.
            </li>
            <li>
              <span className="font-medium text-foreground">
                Anchor in what's human.
              </span>{" "}
              Walks, sleep, food, the people you love — the boring fundamentals
              are still the foundation.
            </li>
            <li>
              <span className="font-medium text-foreground">
                Talk to a professional if it's heavy.
              </span>{" "}
              Coping tips don't replace real help. If the weight is staying,
              reach out.
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
              call or text{" "}
              <span className="font-medium text-foreground">9-8-8</span>
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
            A related name: AIRD
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            When AI anxiety is specifically tied to your job being threatened
            or replaced, researchers have started calling it{" "}
            <Link to="/aird" className="underline underline-offset-2">
              AIRD (AI Replacement Dysfunction)
            </Link>
            . Same family of feelings — there's a name for it, and you're not
            the only one.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
            Where Kindred fits
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Kindred is a non-profit, non-clinical, AI-assisted project with a
            human in the loop — a quiet, opt-in place to land when the AI era
            feels like a lot. Not a clinic, not a therapist. Just somewhere
            you don't have to be the only one.
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/chat">
                Talk to Kindred
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
