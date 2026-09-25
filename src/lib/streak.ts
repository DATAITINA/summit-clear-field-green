import { addDaysKey, startOfWeekKey, todayKey } from "@/lib/dates";
import type { CheckIn, Practice } from "@/lib/store";

export function keptOn(
  checkIns: CheckIn[],
  practiceId: string,
  date: string,
): CheckIn | undefined {
  return checkIns.find((c) => c.practiceId === practiceId && c.date === date);
}

export function activePractices(practices: Practice[]): Practice[] {
  return practices.filter((p) => !p.archived);
}

export function createdKey(practice: Practice): string {
  return todayKey(new Date(practice.createdAt));
}

export function streakFor(
  practiceId: string,
  checkIns: CheckIn[],
  today: string = todayKey(),
): number {
  const set = new Set(
    checkIns.filter((c) => c.practiceId === practiceId).map((c) => c.date),
  );
  let cursor = today;
  if (!set.has(cursor)) {
    cursor = addDaysKey(today, -1);
    if (!set.has(cursor)) return 0;
  }
  let n = 0;
  while (set.has(cursor)) {
    n += 1;
    cursor = addDaysKey(cursor, -1);
  }
  return n;
}

export function longestStreakFor(
  practiceId: string,
  checkIns: CheckIn[],
): number {
  const dates = checkIns
    .filter((c) => c.practiceId === practiceId)
    .map((c) => c.date)
    .sort();
  if (dates.length === 0) return 0;
  const unique = [...new Set(dates)];
  let best = 1;
  let run = 1;
  for (let i = 1; i < unique.length; i++) {
    const prev = unique[i - 1]!;
    const cur = unique[i]!;
    if (addDaysKey(prev, 1) === cur) {
      run += 1;
      if (run > best) best = run;
    } else {
      run = 1;
    }
  }
  return best;
}

export function dayCompletion(
  practices: Practice[],
  checkIns: CheckIn[],
  date: string,
): { kept: number; total: number } {
  const active = activePractices(practices);
  const total = active.length;
  if (total === 0) return { kept: 0, total: 0 };
  const kept = active.filter((p) => keptOn(checkIns, p.id, date)).length;
  return { kept, total };
}

/** Consecutive days where every active practice was kept. */
export function fullDayStreak(
  practices: Practice[],
  checkIns: CheckIn[],
  today: string = todayKey(),
): number {
  const active = activePractices(practices);
  if (active.length === 0) return 0;
  const isFull = (date: string) =>
    active.every((p) => keptOn(checkIns, p.id, date));
  let cursor = today;
  if (!isFull(cursor)) {
    cursor = addDaysKey(today, -1);
    if (!isFull(cursor)) return 0;
  }
  let n = 0;
  while (isFull(cursor)) {
    n += 1;
    cursor = addDaysKey(cursor, -1);
  }
  return n;
}

export function missedYesterday(
  practices: Practice[],
  checkIns: CheckIn[],
  today: string = todayKey(),
): boolean {
  const active = activePractices(practices);
  if (active.length === 0) return false;
  const y = addDaysKey(today, -1);
  const due = active.filter((p) => createdKey(p) <= y);
  if (due.length === 0) return false;
  return due.some((p) => !keptOn(checkIns, p.id, y));
}

export function weekKeys(today: string = todayKey()): string[] {
  const start = startOfWeekKey(today);
  return Array.from({ length: 7 }, (_, i) => addDaysKey(start, i));
}

export function heatmapKeys(today: string = todayKey()): string[] {
  const weekStart = startOfWeekKey(today);
  const gridStart = addDaysKey(weekStart, -7 * 11);
  return Array.from({ length: 7 * 12 }, (_, i) => addDaysKey(gridStart, i));
}

export function totalKeptDays(
  practices: Practice[],
  checkIns: CheckIn[],
): number {
  const ids = new Set(activePractices(practices).map((p) => p.id));
  const days = new Set(
    checkIns.filter((c) => ids.has(c.practiceId)).map((c) => c.date),
  );
  return days.size;
}
