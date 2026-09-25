import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatTime } from "@/lib/dates";
import { keptOn, streakFor } from "@/lib/streak";
import type { CheckIn, Practice } from "@/lib/store";
import { useSteadStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function PracticeCard({
  practice,
  checkIns,
  today,
}: {
  practice: Practice;
  checkIns: CheckIn[];
  today: string;
}) {
  const keep = useSteadStore((s) => s.keep);
  const unkeep = useSteadStore((s) => s.unkeep);
  const setNote = useSteadStore((s) => s.setNote);
  const checkIn = keptOn(checkIns, practice.id, today);
  const streak = streakFor(practice.id, checkIns, today);
  const [draft, setDraft] = useState("");
  const [editingNote, setEditingNote] = useState(false);

  function onKeep() {
    keep(practice.id, draft);
    setDraft("");
  }

  return (
    <article className="rounded-2xl bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-xl leading-snug tracking-[-0.02em]">
            {practice.title}
          </h2>
          <p className="mt-1 text-sm leading-normal text-muted">
            {practice.commitment}
          </p>
        </div>
        <span
          className={cn(
            "relative mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color] duration-[var(--motion-fast)] ease-[var(--ease-out)]",
            checkIn ? "border-accent bg-accent text-accent-fg" : "border-border text-transparent",
          )}
          aria-hidden="true"
        >
          <Check
            className={cn(
              "size-4 transition-[opacity,transform,filter] duration-[var(--motion-fast)] ease-[var(--ease-out)]",
              checkIn
                ? "scale-100 opacity-100 blur-0"
                : "scale-[0.25] opacity-0 blur-[4px]",
            )}
            strokeWidth={2.5}
          />
        </span>
      </div>

      {checkIn ? (
        <div className="mt-5 flex flex-col gap-3">
          <p className="text-sm text-muted">
            Kept
            <span className="tabular-nums"> · {formatTime(checkIn.at)}</span>
            {streak > 1 ? (
              <span className="tabular-nums"> · {streak} in a row</span>
            ) : null}
          </p>
          {editingNote || !checkIn.note ? (
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setNote(practice.id, today, draft || checkIn.note);
                setEditingNote(false);
                setDraft("");
              }}
            >
              <Textarea
                value={editingNote ? draft : draft || checkIn.note}
                onChange={(e) => {
                  setEditingNote(true);
                  setDraft(e.target.value);
                }}
                placeholder="A line about today (optional)"
                maxLength={200}
                rows={2}
                className="min-h-16 bg-bg text-sm"
              />
              {editingNote ? (
                <div className="flex gap-2">
                  <Button type="submit" size="sm">
                    Save line
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="quiet"
                    onClick={() => {
                      setEditingNote(false);
                      setDraft("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : null}
            </form>
          ) : (
            <button
              type="button"
              className="text-left font-display text-base italic leading-snug text-fg"
              onClick={() => {
                setDraft(checkIn.note);
                setEditingNote(true);
              }}
            >
              {checkIn.note}
            </button>
          )}
          <Button
            variant="quiet"
            size="sm"
            className="-ml-3 self-start"
            onClick={() => unkeep(practice.id, today)}
          >
            Undo
          </Button>
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="A line about today (optional)"
            maxLength={200}
            rows={2}
            className="min-h-16 bg-bg text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onKeep();
              }
            }}
          />
          <Button size="wide" onClick={onKeep}>
            Keep it
          </Button>
          {streak > 0 ? (
            <p className="text-xs tabular-nums text-subtle">
              {streak} day{streak === 1 ? "" : "s"} in a row so far
            </p>
          ) : null}
        </div>
      )}
    </article>
  );
}
