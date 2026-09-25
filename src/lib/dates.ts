/** Local calendar key YYYY-MM-DD. Never use toISOString() for this. */
export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function addDaysKey(key: string, delta: number): string {
  const dt = parseKey(key);
  dt.setDate(dt.getDate() + delta);
  return todayKey(dt);
}

export function weekdayIndexMon0(key: string): number {
  const day = parseKey(key).getDay(); // 0 Sun … 6 Sat
  return (day + 6) % 7;
}

export function startOfWeekKey(key: string): string {
  return addDaysKey(key, -weekdayIndexMon0(key));
}

export function formatLongDate(key: string): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(parseKey(key));
}

export function formatWeekdayShort(key: string): string {
  return new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(
    parseKey(key),
  );
}

export function formatMonthYear(key: string): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(parseKey(key));
}

export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function hourOf(d = new Date()): number {
  return d.getHours();
}
