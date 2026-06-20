import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, LifeBuoy, Loader2 } from "lucide-react";

export const Route = createFileRoute("/check-in")({
  head: () => ({
    meta: [
      { title: "Still Water — a 60-second mirror for AI work anxiety" },
      {
        name: "description",
        content:
          "Still Water is a calm 60-second self-reflection for the dread many feel about AI and their work. Not a test. Nothing saved.",
      },
      { property: "og:title", content: "Still Water — a quiet mirror" },
      {
        property: "og:description",
        content:
          "A 60-second self-reflection on AI, work, and what still feels like you.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://kindred.mygoodcommonsense.com/check-in",
      },
      { name: "robots", content: "index,follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://kindred.mygoodcommonsense.com/check-in",
      },
    ],
  }),
  component: CheckInPage,
});

const PROMPTS = [
  "I catch myself worrying AI could replace my work.",
  "Sometimes I feel my skills are slipping behind the technology.",
  "I avoid news or conversations about AI and automation.",
  "It's hard to picture a future where my work still matters.",
  "Thinking about how AI is changing work leaves me unsettled.",
];

const OPTIONS = ["Rarely", "Some days", "Many days", "Almost always"] as const;

const REFLECTIONS = [
  "It sounds like the question of whether AI could replace your work has been quietly following you around.",
  "It sounds like you've been feeling the ground shift under your skills — like the tools move faster than you can.",
  "It sounds like you've been steering away from the AI conversation — and that avoidance is its own kind of tired.",
  "It sounds like it's been hard to picture a future where your work still feels like it matters. That's a heavy thing to carry.",
  "It sounds like thinking about how AI is changing work leaves you unsettled, even when you try to set it down.",
];

type Stage = "hook" | "prompt" | "reflection" | "cta" | "thanks";

function CheckInPage() {
  const [stage, setStage] = useState<Stage>("hook");
  const [promptIdx, setPromptIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(PROMPTS.length).fill(-1));
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalDots = PROMPTS.length;

  const strongestIdx = useMemo(() => {
    let best = 0;
    let bestVal = -1;
    answers.forEach((v, i) => {
      if (v > bestVal) {
        bestVal = v;
        best = i;
      }
    });
    return best;
  }, [answers]);

  const showCrisis = answers[3] >= 2;

  function selectOption(value: number) {
    const next = [...answers];
    next[promptIdx] = value;
    setAnswers(next);
    // small delay for soft feel
    setTimeout(() => {
      if (promptIdx < PROMPTS.length - 1) {
        setPromptIdx(promptIdx + 1);
      } else {
        setStage("reflection");
      }
    }, 220);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setError("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    const { error: insertError } = await supabase
      .from("kindred_signups")
      .insert({ email: trimmed, source: "still-water" });
    setSubmitting(false);
    if (insertError) {
      setError("Something went wrong. Please try again.");
      return;
    }
    setStage("thanks");
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.97 0.018 220) 0%, oklch(0.96 0.022 180) 45%, oklch(0.965 0.028 90) 100%)",
      }}
    >
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-10 sm:py-16">
        <div className="w-full max-w-md">
          {/* Progress dots */}
          {stage === "prompt" && (
            <div className="flex items-center justify-center gap-2 mb-10">
              {Array.from({ length: totalDots }).map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === promptIdx ? 28 : 10,
                    background:
                      i <= promptIdx
                        ? "oklch(0.55 0.07 165)"
                        : "oklch(0.85 0.02 180)",
                  }}
                />
              ))}
            </div>
          )}

          <div
            key={stage + promptIdx}
            className="animate-in fade-in duration-700"
          >
            {stage === "hook" && <Hook onBegin={() => setStage("prompt")} />}

            {stage === "prompt" && (
              <Prompt
                text={PROMPTS[promptIdx]}
                onSelect={selectOption}
                selected={answers[promptIdx]}
              />
            )}

            {stage === "reflection" && (
              <Reflection
                line={REFLECTIONS[strongestIdx]}
                showCrisis={showCrisis}
                onContinue={() => setStage("cta")}
              />
            )}

            {stage === "cta" && (
              <Cta
                email={email}
                setEmail={setEmail}
                onSubmit={handleSubmit}
                submitting={submitting}
                error={error}
              />
            )}

            {stage === "thanks" && <Thanks />}
          </div>
        </div>
      </main>

      <footer className="px-5 pb-8 pt-4">
        <p className="mx-auto max-w-md text-center text-[11px] leading-relaxed text-muted-foreground/80">
          Still Water is a self-reflection, not a medical test or diagnosis. If
          you're in crisis, call or text 988. Adapted from McNamara &amp;
          Thornton, Cureus 2025, used under CC BY 4.0.
        </p>
      </footer>
    </div>
  );
}

function Hook({ onBegin }: { onBegin: () => void }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-8 h-12 w-12 rounded-full" style={{
        background: "radial-gradient(circle at 35% 30%, oklch(0.98 0.03 90) 0%, oklch(0.78 0.06 175) 60%, oklch(0.58 0.07 180) 100%)",
        boxShadow: "0 8px 30px -10px oklch(0.5 0.08 180 / 0.45)",
      }} />
      <h1
        className="font-serif text-3xl sm:text-4xl leading-[1.15] text-foreground"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        There's a name for the dread you feel about AI and your work.
      </h1>
      <p className="mt-5 text-base text-muted-foreground">
        A 60-second mirror. Not a test. Nothing is saved.
      </p>
      <Button
        onClick={onBegin}
        size="lg"
        className="mt-10 rounded-full px-8 h-12 text-base"
      >
        Begin
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

function Prompt({
  text,
  onSelect,
  selected,
}: {
  text: string;
  onSelect: (v: number) => void;
  selected: number;
}) {
  return (
    <div className="text-center">
      <h2
        className="font-serif text-2xl sm:text-3xl leading-snug text-foreground"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {text}
      </h2>
      <div className="mt-10 flex flex-col gap-3">
        {OPTIONS.map((opt, i) => {
          const isSelected = selected === i;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(i)}
              className="w-full rounded-2xl border bg-card/70 backdrop-blur px-5 py-4 text-base text-foreground transition-all duration-300 hover:bg-card hover:shadow-sm active:scale-[0.99]"
              style={{
                borderColor: isSelected
                  ? "oklch(0.55 0.07 165)"
                  : "oklch(0.88 0.02 180)",
                boxShadow: isSelected
                  ? "0 0 0 3px oklch(0.55 0.07 165 / 0.15)"
                  : undefined,
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Reflection({
  line,
  showCrisis,
  onContinue,
}: {
  line: string;
  showCrisis: boolean;
  onContinue: () => void;
}) {
  return (
    <div>
      <p
        className="font-serif text-2xl sm:text-[28px] leading-snug text-foreground"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {line}
      </p>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        You're not imagining it, and you're not alone — so many people feel this
        right now that researchers gave it a name. Naming it is how it starts to
        lose its grip.
      </p>

      {showCrisis && (
        <div
          className="mt-6 rounded-2xl border p-4 flex gap-3"
          style={{
            borderColor: "oklch(0.78 0.09 55)",
            background: "oklch(0.97 0.03 75)",
          }}
        >
          <LifeBuoy className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "oklch(0.55 0.13 50)" }} />
          <p className="text-sm leading-relaxed text-foreground">
            If the future has felt dark lately, please don't carry it alone. You
            can talk to someone right now — call or text{" "}
            <a href="tel:988" className="underline font-medium">988</a>{" "}
            (US &amp; Canada), free and confidential, 24/7.
          </p>
        </div>
      )}

      <div
        className="mt-6 rounded-2xl border bg-card/70 backdrop-blur p-5"
        style={{ borderColor: "oklch(0.88 0.02 180)" }}
      >
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          One small thing
        </p>
        <p className="mt-2 text-base leading-relaxed text-foreground">
          Write down the single part of your work that still feels like you —
          the part no tool can copy.
        </p>
      </div>

      <Button
        onClick={onContinue}
        size="lg"
        className="mt-10 w-full rounded-full h-12 text-base"
      >
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

function Cta({
  email,
  setEmail,
  onSubmit,
  submitting,
  error,
}: {
  email: string;
  setEmail: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  error: string | null;
}) {
  return (
    <div className="text-center">
      <h2
        className="font-serif text-3xl sm:text-4xl leading-[1.15] text-foreground"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        You don't have to speak to be heard.
      </h2>
      <p className="mt-4 text-base text-muted-foreground">
        Kindred is a quiet place to keep hearing your own voice.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 text-left">
        <Input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@somewhere.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-full px-5 bg-card/80 backdrop-blur border-[oklch(0.88_0.02_180)]"
          aria-label="Email address"
        />
        {error && (
          <p className="text-sm text-destructive text-center" role="alert">
            {error}
          </p>
        )}
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="h-12 rounded-full text-base"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining…
            </>
          ) : (
            <>Join Kindred</>
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Free · anonymous · no sign-up required after this.
        </p>
      </form>
    </div>
  );
}

function Thanks() {
  return (
    <div className="text-center">
      <div
        className="mx-auto mb-8 h-16 w-16 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, oklch(0.98 0.03 90) 0%, oklch(0.78 0.06 175) 60%, oklch(0.58 0.07 180) 100%)",
          boxShadow: "0 10px 40px -10px oklch(0.5 0.08 180 / 0.5)",
        }}
      />
      <h2
        className="font-serif text-3xl sm:text-4xl leading-[1.15] text-foreground"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Welcome in.
      </h2>
      <p className="mt-4 text-base text-muted-foreground">
        We'll be in touch softly. In the meantime, breathe — and remember the
        part of your work that still feels like you.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center text-sm text-foreground underline underline-offset-4"
      >
        Visit Kindred
        <ArrowRight className="ml-1 h-3.5 w-3.5" />
      </a>
    </div>
  );
}
