import type { ReactNode } from "react";
import { CalendarDays, CircleDot, List } from "lucide-react";
import { SteadMark } from "@/components/stead-mark";
import { cn } from "@/lib/utils";

export type AppTab = "today" | "log" | "practices";

const TABS: { id: AppTab; label: string; icon: typeof CircleDot }[] = [
  { id: "today", label: "Today", icon: CircleDot },
  { id: "log", label: "Log", icon: CalendarDays },
  { id: "practices", label: "Promises", icon: List },
];

export function AppFrame({
  tab,
  onTab,
  children,
}: {
  tab: AppTab;
  onTab: (tab: AppTab) => void;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh justify-center">
      <div className="flex w-full max-w-lg flex-col px-6 pb-24 pt-8 sm:pb-10 sm:pt-12">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <SteadMark className="h-6" lit={tab === "today"} />
            <span className="font-display text-xl leading-none tracking-tight">
              Stead
            </span>
          </div>
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onTab(t.id)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-[var(--motion-quick)]",
                  tab === t.id ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </header>

        <main className="mt-10 flex-1 pb-8">{children}</main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] sm:hidden"
        aria-label="Primary"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-3">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => onTab(t.id)}
                  className={cn(
                    "flex h-14 w-full flex-col items-center justify-center gap-0.5 text-xs font-medium tracking-wide transition-colors duration-[var(--motion-quick)]",
                    active ? "text-fg" : "text-muted",
                  )}
                >
                  <Icon className="size-4" strokeWidth={active ? 2.2 : 1.8} />
                  {t.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
