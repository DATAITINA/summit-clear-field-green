import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SteadMark } from "@/components/stead-mark";
import { useSteadStore } from "@/lib/store";

const EXAMPLES = [
  "Write two hundred words",
  "Walk twenty minutes",
  "Open the guitar case",
  "Stretch before bed",
  "Read ten pages",
];

export function Onboarding() {
  const completeOnboarding = useSteadStore((s) => s.completeOnboarding);
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [commitment, setCommitment] = useState("");
  const example = EXAMPLES[new Date().getDate() % EXAMPLES.length] ?? EXAMPLES[0];

  function finish() {
    if (!title.trim() || !commitment.trim()) return;
    completeOnboarding({
      name: name.trim(),
      title: title.trim(),
      commitment: commitment.trim(),
    });
  }

  return (
    <div className="flex min-h-dvh justify-center">
      <main className="flex w-full max-w-lg flex-col px-6 py-10 sm:py-16">
        <header className="flex items-center gap-2.5">
          <SteadMark className="h-7" />
          <span className="font-display text-2xl leading-none tracking-tight">
            Stead
          </span>
        </header>

        {step === 0 ? (
          <section className="mt-16 flex flex-col sm:mt-20">
            <h1 className="stead-enter font-display text-3xl leading-[1.15] tracking-[-0.03em]">
              A quiet agent for showing up every day.
            </h1>
            <p className="stead-enter stead-enter-2 mt-5 max-w-sm text-base leading-normal text-muted">
              You name one thing. I keep the days. Nothing leaves this device.
            </p>
            <div className="stead-enter stead-enter-3 mt-10">
              <Button size="lg" onClick={() => setStep(1)}>
                Begin
                <ArrowRight />
              </Button>
            </div>
          </section>
        ) : null}

        {step === 1 ? (
          <section className="mt-16 flex flex-col sm:mt-20">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
              Step 1 of 2
            </p>
            <h1 className="stead-enter mt-3 font-display text-3xl leading-[1.15] tracking-[-0.03em]">
              What should I call you?
            </h1>
            <p className="stead-enter stead-enter-2 mt-3 text-base text-muted">
              Optional. I'll use it in the morning.
            </p>
            <div className="stead-enter stead-enter-3 mt-8">
              <Label htmlFor="name" className="sr-only">
                Your name
              </Label>
              <Input
                id="name"
                autoFocus
                autoComplete="given-name"
                placeholder="Ada"
                value={name}
                maxLength={32}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setStep(2);
                }}
              />
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => setStep(2)}>
                Continue
                <ArrowRight />
              </Button>
              <Button variant="quiet" onClick={() => setStep(2)}>
                Skip
              </Button>
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="mt-16 flex flex-col sm:mt-20">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
              Step 2 of 2
            </p>
            <h1 className="stead-enter mt-3 font-display text-3xl leading-[1.15] tracking-[-0.03em]">
              What will you keep?
            </h1>
            <p className="stead-enter stead-enter-2 mt-3 text-base text-muted">
              One daily act. Small enough to repeat.
            </p>
            <div className="stead-enter stead-enter-3 mt-8 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">A name for it</Label>
                <Input
                  id="title"
                  autoFocus
                  placeholder="Write"
                  value={title}
                  maxLength={40}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="commitment">The daily act</Label>
                <Textarea
                  id="commitment"
                  placeholder={example}
                  value={commitment}
                  maxLength={80}
                  rows={2}
                  onChange={(e) => setCommitment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      finish();
                    }
                  }}
                />
              </div>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                disabled={!title.trim() || !commitment.trim()}
                onClick={finish}
              >
                That's the one
              </Button>
              <Button variant="quiet" onClick={() => setStep(1)}>
                Back
              </Button>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
