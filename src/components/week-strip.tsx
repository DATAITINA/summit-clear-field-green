import { formatWeekdayShort } from "@/lib/dates";
import { dayCompletion, weekKeys } from "@/lib/streak";
import type { CheckIn, Practice } from "@/lib/store";
import { cn } from "@/lib/utils";

export function WeekStrip({
  practices,
  checkIns,
  today,
}: {
  practices: Practice[];
  checkIns: CheckIn[];
  today: string;
}) {
  const keys = weekKeys(today);

  return (
    <ol className="grid grid-cols-7 gap-2" aria-label="This week">
      {keys.map((key) => {
        const { kept, total } = dayCompletion(practices, checkIns, key);
        const isToday = key === today;
        const isFuture = key > today;
        const ratio = total === 0 ? 0 : kept / total;
        const all = total > 0 && kept === total;
        return (
          <li key={key} className="flex flex-col items-center gap-2">
            <span
              className={cn(
                "text-xs font-medium uppercase tracking-[0.14em]",
                isToday ? "text-fg" : "text-subtle",
              )}
            >
              {formatWeekdayShort(key).slice(0, 1)}
            </span>
            <span
              className={cn(
                "relative flex size-8 items-center justify-center rounded-full border border-border transition-[background-color,border-color,box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-out)]",
                isToday && "ring-1 ring-fg ring-offset-2 ring-offset-bg",
                isFuture && "opacity-40",
                all && "border-accent bg-accent",
                !all && ratio > 0 && "border-accent/50 bg-accent/20",
              )}
              title={`${key}: ${kept}/${total || 0} kept`}
            >
              {all ? (
                <span className="size-1.5 rounded-full bg-accent-fg" />
              ) : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
