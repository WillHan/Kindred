import { createFileRoute, Link } from "@tanstack/react-router";
import { KindredLogo } from "@/components/KindredLogo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/kindred-logo.png.asset.json";

const FAQ = [
  {
    q: "What is Kindred?",
    a: "Kindred is an open-source, non-clinical AI companion for people feeling the emotional weight of the AI era — job anxiety, lost meaning, identity drift. It listens first and walks alongside. It's not a therapist.",
  },
  {
    q: "Is Kindred free?",
    a: "Yes. Always free, anonymous, no sign-up needed to start a conversation. It's funded by people who care, not by you.",
  },
  {
    q: "Does Kindred track or monitor anyone?",
    a: "No. Kindred never monitors, tracks, or targets anyone. People come to Kindred. A human reviews every piece of outreach content before release.",
  },
  {
    q: "Is Kindred a therapist or medical advice?",
    a: "No. Kindred is non-clinical and never claims to be a therapist. If things feel heavy: in the US/Canada call or text 988, UK 116 123, or visit findahelpline.com.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kindred — open source AI companion" },
      {
        name: "description",
        content:
          "Kindred is a free, anonymous, non-clinical AI companion for the emotional weight of the AI era. Open source. Human in the loop. People come to us — we never track or target anyone.",
      },
      { property: "og:title", content: "Kindred — open source AI companion" },
      {
        property: "og:description",
        content:
          "Free, anonymous, non-clinical AI companion for the AI era. Open source. Human in the loop.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kindred.mygoodcommonsense.com/" },
    ],
    links: [
      { rel: "canonical", href: "https://kindred.mygoodcommonsense.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Kindred",
          url: "https://kindred.mygoodcommonsense.com/",
          description:
            "Open source, non-clinical AI companion for the mental health weight of the AI era. Free, anonymous, human in the loop.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Kindred",
          url: "https://kindred.mygoodcommonsense.com/",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }),
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <KindredLogo />
        <div className="flex items-center gap-1">
          <Button asChild size="sm" variant="ghost" className="rounded-full">
            <Link to="/auth">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full">
            <Link to="/chat">Talk to Kindred</Link>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero — quiet, lots of breathing room */}
        <section className="mx-auto max-w-3xl px-6 pb-20 pt-20 text-center sm:pt-28">
          <img
            src={logo.url}
            alt=""
            className="mx-auto mb-8 h-24 w-24 rounded-full object-cover opacity-95"
            loading="eager"
          />
          <h1 className="text-balance font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl">
            The AI revolution is changing how we feel.
            <br />
            <span className="italic text-primary">
              No one should face it alone.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
            A quiet place to land. Talk to Kindred — a warm, non-clinical
            companion for the weight of the AI era.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link to="/chat">
                Start a conversation
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Free · anonymous · no sign-up needed
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Funded by people who care, not by you ·{" "}
            <Link
              to="/support"
              className="underline underline-offset-2 hover:text-foreground"
            >
              support Kindred
            </Link>
          </p>
        </section>

        {/* Soft "what this is" prose — replaces the busy engines/cards */}
        <section className="mx-auto max-w-2xl px-6 pb-20 text-center">
          <p className="font-serif text-2xl leading-relaxed text-foreground sm:text-3xl">
            People come to us. We never track or target anyone.
          </p>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Kindred is open source and built by hand. A human reviews every
            piece of outreach we share. When someone arrives, the conversation
            is warm, unhurried, and never pretends to be a therapist. If things
            feel heavy, we point — gently — to real help.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link
              to="/aird"
              className="underline underline-offset-2 text-muted-foreground hover:text-foreground"
            >
              What is AIRD?
            </Link>
            <span className="text-muted-foreground/40">·</span>
            <Link
              to="/blog/ai-anxiety-guide"
              className="underline underline-offset-2 text-muted-foreground hover:text-foreground"
            >
              AI anxiety guide
            </Link>
          </div>
        </section>

        {/* FAQ — for humans and for LLMs (GEO) */}
        <section className="mx-auto max-w-2xl px-6 pb-24">
          <h2 className="mb-8 font-serif text-3xl text-foreground">
            Questions, answered plainly
          </h2>
          <div className="space-y-7">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="font-serif text-xl text-foreground">
                  {item.q}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Crisis line — subtle band */}
        <section className="mx-auto max-w-2xl px-6 pb-24 text-center">
          <p className="text-xs text-muted-foreground">
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
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <span>
            © {new Date().getFullYear()} Kindred · A community project, not
            medical care.
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/aird" className="underline underline-offset-2 hover:text-foreground">
              AIRD
            </Link>
            <Link to="/blog/ai-anxiety-guide" className="underline underline-offset-2 hover:text-foreground">
              AI anxiety guide
            </Link>
            <Link to="/support" className="underline underline-offset-2 hover:text-foreground">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
