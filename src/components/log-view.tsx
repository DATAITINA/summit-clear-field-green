import { formatLongDate, formatMonthYear, formatTime } from "@/lib/dates";
import {
  activePractices,
  dayCompletion,
  heatmapKeys,
  longestStreakFor,
  totalKeptDays,
} from "@/lib/streak";
import { useSteadStore } from "@/lib/store";
import { useTodayKey } from "@/lib/use-today-key";
import { cn } from "@/lib/utils";

export function LogView() {
  const practices = useSteadStore((s) => s.practices);
  const checkIns = useSteadStore((s) => s.checkIns);
  const today = useTodayKey();
  const active = activePractices(practices);
  const cells = heatmapKeys(today);
  const daysKept = totalKeptDays(practices, checkIns);
  const longest = active.reduce(
    (m, p) => Math.max(m, longestStreakFor(p.id, checkIns)),
    0,
  );

  const notes = [...checkIns]
    .filter((c) => c.note.trim().length > 0)
    .sort((a, b) =>
      a.date === b.date ? b.at.localeCompare(a.at) : b.date.localeCompare(a.date),
    );

  const practiceTitle = (id: string) =>
    practices.find((p) => p.id === id)?.title ?? "Practice";

  const grouped = groupByDate(notes);

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
          The record
        </p>
        <h1 className="font-display text-3xl leading-[1.15] tracking-[-0.03em]">
          Days you kept.
        </h1>
        <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <div>
            <dt className="text-subtle">Days marked</dt>
            <dd className="tabular-nums text-fg">{daysKept}</dd>
          </div>
          <div>
            <dt className="text-subtle">Longest run</dt>
            <dd className="tabular-nums text-fg">{longest}</dd>
          </div>
        </dl>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
          Last twelve weeks
        </h2>
        <div className="overflow-x-auto pb-1">
          <div
            className="grid w-fit grid-flow-col grid-rows-7 gap-1"
            role="img"
            aria-label="Twelve-week consistency grid"
          >
            {cells.map((key) => {
              const { kept, total } = dayCompletion(active, checkIns, key);
              const ratio = total === 0 ? 0 : kept / total;
              const future = key > today;
              return (
                <span
                  key={key}
                  title={`${formatLongDate(key)} · ${kept}/${total || 0}`}
                  className={cn(
                    "size-3.5 rounded-xs",
                    future && "opacity-30",
                    ratio === 0 && "bg-surface-2",
                    ratio > 0 && ratio < 1 && "bg-accent/40",
                    ratio === 1 && "bg-accent",
                    key === today && "ring-1 ring-fg ring-offset-1 ring-offset-bg",
                  )}
                />
              );
            })}
          </div>
        </div>
        <p className="text-xs text-subtle">{formatMonthYear(today)}</p>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
          Lines
        </h2>
        {grouped.length === 0 ? (
          <p className="text-sm text-muted">
            Notes you leave when you keep a day will live here. Optional, always.
          </p>
        ) : (
          <ol className="flex flex-col gap-8">
            {grouped.map(([date, items]) => (
              <li key={date} className="flex flex-col gap-3">
                <time
                  dateTime={date}
                  className="text-xs font-medium uppercase tracking-[0.14em] text-subtle"
                >
                  {formatLongDate(date)}
                </time>
                <ul className="flex flex-col gap-3">
                  {items.map((c) => (
                    <li key={c.id} className="flex flex-col gap-1">
                      <p className="text-xs text-muted">
                        {practiceTitle(c.practiceId)}
                        <span className="tabular-nums">
                          {" "}
                          · {formatTime(c.at)}
                        </span>
                      </p>
                      <p className="font-display text-lg italic leading-snug">
                        {c.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

function groupByDate<T extends { date: string }>(items: T[]): [string, T[]][] {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const list = map.get(item.date) ?? [];
    list.push(item);
    map.set(item.date, list);
  }
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
}
