import { speak } from "@/lib/agent";
import { formatLongDate, hourOf } from "@/lib/dates";
import {
  activePractices,
  createdKey,
  dayCompletion,
  fullDayStreak,
  missedYesterday,
  streakFor,
} from "@/lib/streak";
import { useSteadStore } from "@/lib/store";
import { useTodayKey } from "@/lib/use-today-key";
import { PracticeCard } from "@/components/practice-card";
import { WeekStrip } from "@/components/week-strip";
import { Button } from "@/components/ui/button";

export function TodayView({ onAddPractice }: { onAddPractice: () => void }) {
  const profile = useSteadStore((s) => s.profile);
  const allPractices = useSteadStore((s) => s.practices);
  const checkIns = useSteadStore((s) => s.checkIns);
  const practices = activePractices(allPractices);
  const today = useTodayKey();
  const { kept, total } = dayCompletion(practices, checkIns, today);
  const best = practices.reduce(
    (m, p) => Math.max(m, streakFor(p.id, checkIns, today)),
    0,
  );
  const full = fullDayStreak(practices, checkIns, today);
  const isFirstCalendarDay =
    practices.length > 0 && practices.every((p) => createdKey(p) === today);

  const speech = speak({
    today,
    name: profile.name,
    hour: hourOf(),
    practices,
    keptCount: kept,
    total,
    missedYesterday: missedYesterday(practices, checkIns, today),
    bestCurrentStreak: best,
    isFirstCalendarDay,
  });

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-5">
        <time
          dateTime={today}
          className="text-xs font-medium uppercase tracking-[0.16em] text-subtle"
        >
          {formatLongDate(today)}
        </time>
        <p className="stead-enter text-sm text-muted">{speech.greeting}</p>
        <p className="stead-enter stead-enter-2 font-display text-2xl leading-snug tracking-[-0.02em]">
          {speech.body}
        </p>
      </header>

      {practices.length === 0 ? (
        <section className="rounded-2xl bg-surface p-5">
          <h2 className="font-display text-xl">Nothing on the list</h2>
          <p className="mt-2 text-sm text-muted">
            Name one daily act and I'll hold it.
          </p>
          <Button className="mt-5" onClick={onAddPractice}>
            Add a practice
          </Button>
        </section>
      ) : (
        <div className="flex flex-col gap-4">
          {practices.map((p) => (
            <PracticeCard
              key={p.id}
              practice={p}
              checkIns={checkIns}
              today={today}
            />
          ))}
        </div>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
          This week
        </h2>
        <WeekStrip practices={practices} checkIns={checkIns} today={today} />
        <p className="text-sm tabular-nums text-muted">
          {full > 0
            ? `${full} full day${full === 1 ? "" : "s"} in a row`
            : best > 0
              ? `A ${best}-day run is still alive`
              : "No run yet. Today is enough."}
        </p>
      </section>
    </div>
  );
}
