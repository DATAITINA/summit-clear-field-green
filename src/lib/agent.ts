import { hourOf } from "@/lib/dates";
import type { Practice } from "@/lib/store";

export type AgentSpeech = {
  greeting: string;
  body: string;
};

export type AgentContext = {
  today: string;
  name: string;
  hour?: number;
  practices: Practice[];
  keptCount: number;
  total: number;
  missedYesterday: boolean;
  bestCurrentStreak: number;
  isFirstCalendarDay: boolean;
};

function pick(lines: string[], seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 33 + seed.charCodeAt(i)) >>> 0;
  }
  return lines[h % lines.length] ?? lines[0] ?? "";
}

function greet(name: string, hour: number): string {
  const n = name.trim();
  const who = n ? `, ${n}` : "";
  if (hour < 5) return `You're still up${who}.`;
  if (hour < 12) return `Good morning${who}.`;
  if (hour < 17) return `Good afternoon${who}.`;
  if (hour < 21) return `Good evening${who}.`;
  return `It's late${who}.`;
}

export function speak(ctx: AgentContext): AgentSpeech {
  const hour = ctx.hour ?? hourOf();
  const greeting = greet(ctx.name, hour);
  const allDone = ctx.total > 0 && ctx.keptCount === ctx.total;
  const noneDone = ctx.keptCount === 0;
  const seed = `${ctx.today}:${ctx.keptCount}:${ctx.total}:${ctx.missedYesterday ? 1 : 0}`;
  const first = ctx.practices[0];
  const named = first?.title ? first.title : "the work";

  if (ctx.total === 0) {
    return {
      greeting,
      body: "You have nothing to keep yet. Name one small thing. I'll hold it.",
    };
  }

  if (ctx.isFirstCalendarDay && noneDone) {
    return {
      greeting,
      body: pick(
        [
          `This is day one of ${named}. Not a streak. Not a test. Just the thing you said you'd do.`,
          `We start today. ${named} — once, all the way through. That's the whole job.`,
          `A first mark is the only one that matters right now. Keep ${named}. The rest follows.`,
        ],
        seed,
      ),
    };
  }

  if (ctx.isFirstCalendarDay && allDone) {
    return {
      greeting,
      body: pick(
        [
          "Day one, kept. The rest is repetition.",
          "That's a start you can trust. Come back tomorrow and do it again.",
          "One mark on the page. That's how every long thing begins.",
        ],
        seed,
      ),
    };
  }

  if (allDone) {
    if (ctx.bestCurrentStreak >= 30) {
      return {
        greeting,
        body: pick(
          [
            "Thirty days and counting. The practice is starting to keep you.",
            "A month of showing up. Quiet, unspectacular, and real.",
          ],
          seed,
        ),
      };
    }
    if (ctx.bestCurrentStreak >= 14) {
      return {
        greeting,
        body: pick(
          [
            "Two weeks. This is no longer a mood. It's a rhythm.",
            "Fourteen days. You don't have to feel it. You just have to keep it.",
          ],
          seed,
        ),
      };
    }
    if (ctx.bestCurrentStreak >= 7) {
      return {
        greeting,
        body: pick(
          [
            "A week, kept. Quiet work compounds.",
            "Seven days in a row. That's a promise with a spine.",
            "A week of showing up. Set the day down.",
          ],
          seed,
        ),
      };
    }
    if (ctx.bestCurrentStreak >= 3) {
      return {
        greeting,
        body: pick(
          [
            "Three days. The hard part is becoming ordinary.",
            "Kept again. Momentum is just tomorrow's version of today.",
            "You can put the day down. It was kept.",
          ],
          seed,
        ),
      };
    }
    if (hour >= 21) {
      return {
        greeting,
        body: "Evening, and it's done. That's a day you can set down.",
      };
    }
    return {
      greeting,
      body: pick(
        [
          "Already kept. The rest of the day is yours.",
          "Marked. Come back tomorrow — that's the whole trick.",
          `${named} is done. Nothing else is owed today.`,
        ],
        seed,
      ),
    };
  }

  if (!noneDone) {
    return {
      greeting,
      body: pick(
        [
          "Part of the list is kept. Finish what's open if you can.",
          "One down. Close the rest when you have a sliver of time.",
          "Halfway is not a failure. It's a list with a next step.",
        ],
        seed,
      ),
    };
  }

  if (ctx.missedYesterday) {
    if (hour >= 21) {
      return {
        greeting,
        body: "Yesterday went unmarked. If you have a little left tonight, use it. If not, sleep — morning is a clean start, not a test.",
      };
    }
    return {
      greeting,
      body: pick(
        [
          "Yesterday went unmarked. Nothing to make up. Begin here.",
          "A missed day is not a verdict. Today is still available.",
          "You don't restart a life. You keep the next one. That's today.",
        ],
        seed,
      ),
    };
  }

  if (hour >= 21) {
    return {
      greeting,
      body: pick(
        [
          `Late. If you still have a sliver of time, keep ${named}. If you don't, rest — I'll be here in the morning.`,
          "The day is thin now. A small mark still counts. So does sleep.",
        ],
        seed,
      ),
    };
  }

  if (hour < 12) {
    return {
      greeting,
      body: pick(
        [
          `You have one thing to keep today. ${named}. That's the whole list.`,
          "Morning is for the first mark. Do it before the day fills up.",
          `Keep ${named} once. Then you can forget me until tomorrow.`,
        ],
        seed,
      ),
    };
  }

  return {
    greeting,
    body: pick(
      [
        `Still open: ${named}. A short pass is enough.`,
        "The day is moving. The mark doesn't have to be large. It has to be today.",
        `Return to ${named} when you can. I'll hold the place.`,
      ],
      seed,
    ),
  };
}
