import { i as __toESM } from "../_runtime.mjs";
import { a as Overlay2, b as require_jsx_runtime, c as Title2, d as DialogClose, f as DialogContent$1, g as DialogTitle$1, h as DialogPortal$1, i as Description2, l as Trigger2, m as DialogOverlay$1, n as Cancel, o as Portal2, p as DialogDescription$1, r as Content2, s as Root2, t as Action, u as Dialog$1, x as require_react, y as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as Check, i as CircleDot, o as CalendarDays, r as List, s as ArrowRight, t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-oSZXoq8u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function newId() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
function SteadMark({ className, lit = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-end justify-center", className),
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 12 28",
			className: "h-full w-auto",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "5",
				y: "8",
				width: "2",
				height: "18",
				rx: "1",
				className: lit ? "fill-accent" : "fill-fg"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "6",
				cy: "6",
				r: "2.25",
				className: lit ? "fill-accent" : "fill-fg"
			})]
		})
	});
}
var TABS = [
	{
		id: "today",
		label: "Today",
		icon: CircleDot
	},
	{
		id: "log",
		label: "Log",
		icon: CalendarDays
	},
	{
		id: "practices",
		label: "Promises",
		icon: List
	}
];
function AppFrame({ tab, onTab, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full max-w-lg flex-col px-6 pb-24 pt-8 sm:pb-10 sm:pt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteadMark, {
						className: "h-6",
						lit: tab === "today"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl leading-none tracking-tight",
						children: "Stead"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 sm:flex",
					"aria-label": "Primary",
					children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onTab(t.id),
						className: cn("rounded-md px-3 py-2 text-sm font-medium transition-colors duration-[var(--motion-quick)]", tab === t.id ? "text-fg" : "text-muted hover:text-fg"),
						children: t.label
					}, t.id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mt-10 flex-1 pb-8",
				children
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] sm:hidden",
			"aria-label": "Primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mx-auto grid max-w-lg grid-cols-3",
				children: TABS.map((t) => {
					const Icon = t.icon;
					const active = tab === t.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onTab(t.id),
						className: cn("flex h-14 w-full flex-col items-center justify-center gap-0.5 text-xs font-medium tracking-wide transition-colors duration-[var(--motion-quick)]", active ? "text-fg" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-4",
							strokeWidth: active ? 2.2 : 1.8
						}), t.label]
					}) }, t.id);
				})
			})
		})]
	});
}
/** Local calendar key YYYY-MM-DD. Never use toISOString() for this. */
function todayKey(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function parseKey(key) {
	const [y, m, d] = key.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function addDaysKey(key, delta) {
	const dt = parseKey(key);
	dt.setDate(dt.getDate() + delta);
	return todayKey(dt);
}
function weekdayIndexMon0(key) {
	return (parseKey(key).getDay() + 6) % 7;
}
function startOfWeekKey(key) {
	return addDaysKey(key, -weekdayIndexMon0(key));
}
function formatLongDate(key) {
	return new Intl.DateTimeFormat(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long"
	}).format(parseKey(key));
}
function formatWeekdayShort(key) {
	return new Intl.DateTimeFormat(void 0, { weekday: "short" }).format(parseKey(key));
}
function formatMonthYear(key) {
	return new Intl.DateTimeFormat(void 0, {
		month: "long",
		year: "numeric"
	}).format(parseKey(key));
}
function formatTime(iso) {
	return new Intl.DateTimeFormat(void 0, {
		hour: "numeric",
		minute: "2-digit"
	}).format(new Date(iso));
}
function hourOf(d = /* @__PURE__ */ new Date()) {
	return d.getHours();
}
function keptOn(checkIns, practiceId, date) {
	return checkIns.find((c) => c.practiceId === practiceId && c.date === date);
}
function activePractices(practices) {
	return practices.filter((p) => !p.archived);
}
function createdKey(practice) {
	return todayKey(new Date(practice.createdAt));
}
function streakFor(practiceId, checkIns, today = todayKey()) {
	const set = new Set(checkIns.filter((c) => c.practiceId === practiceId).map((c) => c.date));
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
function longestStreakFor(practiceId, checkIns) {
	const dates = checkIns.filter((c) => c.practiceId === practiceId).map((c) => c.date).sort();
	if (dates.length === 0) return 0;
	const unique = [...new Set(dates)];
	let best = 1;
	let run = 1;
	for (let i = 1; i < unique.length; i++) {
		const prev = unique[i - 1];
		const cur = unique[i];
		if (addDaysKey(prev, 1) === cur) {
			run += 1;
			if (run > best) best = run;
		} else run = 1;
	}
	return best;
}
function dayCompletion(practices, checkIns, date) {
	const active = activePractices(practices);
	const total = active.length;
	if (total === 0) return {
		kept: 0,
		total: 0
	};
	return {
		kept: active.filter((p) => keptOn(checkIns, p.id, date)).length,
		total
	};
}
/** Consecutive days where every active practice was kept. */
function fullDayStreak(practices, checkIns, today = todayKey()) {
	const active = activePractices(practices);
	if (active.length === 0) return 0;
	const isFull = (date) => active.every((p) => keptOn(checkIns, p.id, date));
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
function missedYesterday(practices, checkIns, today = todayKey()) {
	const active = activePractices(practices);
	if (active.length === 0) return false;
	const y = addDaysKey(today, -1);
	const due = active.filter((p) => createdKey(p) <= y);
	if (due.length === 0) return false;
	return due.some((p) => !keptOn(checkIns, p.id, y));
}
function weekKeys(today = todayKey()) {
	const start = startOfWeekKey(today);
	return Array.from({ length: 7 }, (_, i) => addDaysKey(start, i));
}
function heatmapKeys(today = todayKey()) {
	const gridStart = addDaysKey(startOfWeekKey(today), -77);
	return Array.from({ length: 84 }, (_, i) => addDaysKey(gridStart, i));
}
function totalKeptDays(practices, checkIns) {
	const ids = new Set(activePractices(practices).map((p) => p.id));
	return new Set(checkIns.filter((c) => ids.has(c.practiceId)).map((c) => c.date)).size;
}
var emptyProfile = {
	name: "",
	onboarded: false
};
var useSteadStore = create()(persist((set, get) => ({
	profile: emptyProfile,
	practices: [],
	checkIns: [],
	completeOnboarding: ({ name, title, commitment }) => {
		const practice = {
			id: newId(),
			title: title.trim(),
			commitment: commitment.trim(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			archived: false
		};
		set({
			profile: {
				name: name.trim(),
				onboarded: true
			},
			practices: [practice]
		});
	},
	setName: (name) => set({ profile: {
		...get().profile,
		name: name.trim()
	} }),
	addPractice: ({ title, commitment }) => {
		if (get().practices.filter((p) => !p.archived).length >= 4) return null;
		const practice = {
			id: newId(),
			title: title.trim(),
			commitment: commitment.trim(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			archived: false
		};
		set({ practices: [...get().practices, practice] });
		return practice.id;
	},
	updatePractice: (id, { title, commitment }) => {
		set({ practices: get().practices.map((p) => p.id === id ? {
			...p,
			title: title.trim(),
			commitment: commitment.trim()
		} : p) });
	},
	archivePractice: (id) => {
		set({ practices: get().practices.map((p) => p.id === id ? {
			...p,
			archived: true
		} : p) });
	},
	restorePractice: (id) => {
		if (get().practices.filter((p) => !p.archived).length >= 4) return;
		set({ practices: get().practices.map((p) => p.id === id ? {
			...p,
			archived: false
		} : p) });
	},
	keep: (practiceId, note) => {
		const date = todayKey();
		const existing = get().checkIns.find((c) => c.practiceId === practiceId && c.date === date);
		if (existing) {
			if (note !== void 0) set({ checkIns: get().checkIns.map((c) => c.id === existing.id ? {
				...c,
				note: note.trim()
			} : c) });
			return;
		}
		const checkIn = {
			id: newId(),
			practiceId,
			date,
			note: (note ?? "").trim(),
			at: (/* @__PURE__ */ new Date()).toISOString()
		};
		set({ checkIns: [...get().checkIns, checkIn] });
	},
	unkeep: (practiceId, date = todayKey()) => {
		set({ checkIns: get().checkIns.filter((c) => !(c.practiceId === practiceId && c.date === date)) });
	},
	setNote: (practiceId, date, note) => {
		set({ checkIns: get().checkIns.map((c) => c.practiceId === practiceId && c.date === date ? {
			...c,
			note: note.trim()
		} : c) });
	},
	resetAll: () => {
		set({
			profile: emptyProfile,
			practices: [],
			checkIns: []
		});
	}
}), {
	name: "stead-v1",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (state) => ({
		profile: state.profile,
		practices: state.practices,
		checkIns: state.checkIns
	})
}));
function useTodayKey() {
	const [key, setKey] = (0, import_react.useState)(todayKey);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			const next = todayKey();
			setKey((k) => k === next ? k : next);
		}, 3e4);
		return () => window.clearInterval(id);
	}, []);
	return key;
}
function LogView() {
	const practices = useSteadStore((s) => s.practices);
	const checkIns = useSteadStore((s) => s.checkIns);
	const today = useTodayKey();
	const active = activePractices(practices);
	const cells = heatmapKeys(today);
	const daysKept = totalKeptDays(practices, checkIns);
	const longest = active.reduce((m, p) => Math.max(m, longestStreakFor(p.id, checkIns)), 0);
	const notes = [...checkIns].filter((c) => c.note.trim().length > 0).sort((a, b) => a.date === b.date ? b.at.localeCompare(a.at) : b.date.localeCompare(a.date));
	const practiceTitle = (id) => practices.find((p) => p.id === id)?.title ?? "Practice";
	const grouped = groupByDate(notes);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
						children: "The record"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl leading-[1.15] tracking-[-0.03em]",
						children: "Days you kept."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-2 flex flex-wrap gap-x-8 gap-y-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-subtle",
							children: "Days marked"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums text-fg",
							children: daysKept
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-subtle",
							children: "Longest run"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums text-fg",
							children: longest
						})] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
						children: "Last twelve weeks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto pb-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid w-fit grid-flow-col grid-rows-7 gap-1",
							role: "img",
							"aria-label": "Twelve-week consistency grid",
							children: cells.map((key) => {
								const { kept, total } = dayCompletion(active, checkIns, key);
								const ratio = total === 0 ? 0 : kept / total;
								const future = key > today;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									title: `${formatLongDate(key)} · ${kept}/${total || 0}`,
									className: cn("size-3.5 rounded-xs", future && "opacity-30", ratio === 0 && "bg-surface-2", ratio > 0 && ratio < 1 && "bg-accent/40", ratio === 1 && "bg-accent", key === today && "ring-1 ring-fg ring-offset-1 ring-offset-bg")
								}, key);
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: formatMonthYear(today)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
					children: "Lines"
				}), grouped.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Notes you leave when you keep a day will live here. Optional, always."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "flex flex-col gap-8",
					children: grouped.map(([date, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
							dateTime: date,
							className: "text-xs font-medium uppercase tracking-[0.14em] text-subtle",
							children: formatLongDate(date)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-3",
							children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [practiceTitle(c.practiceId), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums",
										children: [
											" ",
											"· ",
											formatTime(c.at)
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg italic leading-snug",
									children: c.note
								})]
							}, c.id))
						})]
					}, date))
				})]
			})
		]
	});
}
function groupByDate(items) {
	const map = /* @__PURE__ */ new Map();
	for (const item of items) {
		const list = map.get(item.date) ?? [];
		list.push(item);
		map.set(item.date, list);
	}
	return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,border-color,opacity,transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			outline: "border border-border bg-transparent text-fg hover:bg-surface",
			ghost: "text-fg hover:bg-surface",
			quiet: "text-muted hover:text-fg hover:bg-surface"
		},
		size: {
			default: "h-11 px-5",
			sm: "h-9 px-3 text-sm",
			lg: "h-12 px-6 text-base",
			wide: "h-12 w-full px-6",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border border-border bg-surface px-3 text-base text-fg shadow-none transition-[border-color,box-shadow] duration-[var(--motion-quick)] placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40", "disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-sm font-medium text-muted leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
	...props
}));
Label.displayName = Root.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-20 w-full rounded-md border border-border bg-surface px-3 py-2 text-base text-fg shadow-none transition-[border-color,box-shadow] duration-[var(--motion-quick)] placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40", "disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var EXAMPLES = [
	"Write two hundred words",
	"Walk twenty minutes",
	"Open the guitar case",
	"Stretch before bed",
	"Read ten pages"
];
function Onboarding() {
	const completeOnboarding = useSteadStore((s) => s.completeOnboarding);
	const [step, setStep] = (0, import_react.useState)(0);
	const [name, setName] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [commitment, setCommitment] = (0, import_react.useState)("");
	const example = EXAMPLES[(/* @__PURE__ */ new Date()).getDate() % EXAMPLES.length] ?? EXAMPLES[0];
	function finish() {
		if (!title.trim() || !commitment.trim()) return;
		completeOnboarding({
			name: name.trim(),
			title: title.trim(),
			commitment: commitment.trim()
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex w-full max-w-lg flex-col px-6 py-10 sm:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteadMark, { className: "h-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl leading-none tracking-tight",
						children: "Stead"
					})]
				}),
				step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16 flex flex-col sm:mt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "stead-enter font-display text-3xl leading-[1.15] tracking-[-0.03em]",
							children: "A quiet agent for showing up every day."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "stead-enter stead-enter-2 mt-5 max-w-sm text-base leading-normal text-muted",
							children: "You name one thing. I keep the days. Nothing leaves this device."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "stead-enter stead-enter-3 mt-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								onClick: () => setStep(1),
								children: ["Begin", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						})
					]
				}) : null,
				step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16 flex flex-col sm:mt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
							children: "Step 1 of 2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "stead-enter mt-3 font-display text-3xl leading-[1.15] tracking-[-0.03em]",
							children: "What should I call you?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "stead-enter stead-enter-2 mt-3 text-base text-muted",
							children: "Optional. I'll use it in the morning."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stead-enter stead-enter-3 mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "name",
								className: "sr-only",
								children: "Your name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								autoFocus: true,
								autoComplete: "given-name",
								placeholder: "Ada",
								value: name,
								maxLength: 32,
								onChange: (e) => setName(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter") setStep(2);
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								onClick: () => setStep(2),
								children: ["Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "quiet",
								onClick: () => setStep(2),
								children: "Skip"
							})]
						})
					]
				}) : null,
				step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16 flex flex-col sm:mt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
							children: "Step 2 of 2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "stead-enter mt-3 font-display text-3xl leading-[1.15] tracking-[-0.03em]",
							children: "What will you keep?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "stead-enter stead-enter-2 mt-3 text-base text-muted",
							children: "One daily act. Small enough to repeat."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stead-enter stead-enter-3 mt-8 flex flex-col gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "title",
									children: "A name for it"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "title",
									autoFocus: true,
									placeholder: "Write",
									value: title,
									maxLength: 40,
									onChange: (e) => setTitle(e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "commitment",
									children: "The daily act"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "commitment",
									placeholder: example,
									value: commitment,
									maxLength: 80,
									rows: 2,
									onChange: (e) => setCommitment(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											finish();
										}
									}
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								disabled: !title.trim() || !commitment.trim(),
								onClick: finish,
								children: "That's the one"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "quiet",
								onClick: () => setStep(1),
								children: "Back"
							})]
						})
					]
				}) : null
			]
		})
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-fg/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-3xl border border-border bg-bg p-6 shadow-none", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 pr-8 text-left", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("font-display text-xl leading-snug text-fg", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted leading-normal", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	ref,
	className: cn("fixed inset-0 z-50 bg-fg/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-3xl border border-border bg-bg p-6", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 text-left", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("font-display text-xl leading-snug text-fg", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted leading-normal", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function PracticesView() {
	const profile = useSteadStore((s) => s.profile);
	const practices = useSteadStore((s) => s.practices);
	const checkIns = useSteadStore((s) => s.checkIns);
	const setName = useSteadStore((s) => s.setName);
	const addPractice = useSteadStore((s) => s.addPractice);
	const updatePractice = useSteadStore((s) => s.updatePractice);
	const archivePractice = useSteadStore((s) => s.archivePractice);
	const restorePractice = useSteadStore((s) => s.restorePractice);
	const resetAll = useSteadStore((s) => s.resetAll);
	const today = useTodayKey();
	const active = practices.filter((p) => !p.archived);
	const archived = practices.filter((p) => p.archived);
	const [nameDraft, setNameDraft] = (0, import_react.useState)(profile.name);
	const [editor, setEditor] = (0, import_react.useState)(null);
	const editing = editor?.mode === "edit" ? practices.find((p) => p.id === editor.id) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
						children: "The promises"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl leading-[1.15] tracking-[-0.03em]",
						children: "What you keep."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md text-sm leading-normal text-muted",
						children: "Stead works best with a short list. Four is the ceiling. Everything stays on this device."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "your-name",
					children: "What I call you"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "your-name",
					value: nameDraft,
					maxLength: 32,
					placeholder: "Optional",
					onChange: (e) => setNameDraft(e.target.value),
					onBlur: () => setName(nameDraft),
					onKeyDown: (e) => {
						if (e.key === "Enter") {
							setName(nameDraft);
							e.target.blur();
						}
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
							children: "Active"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							disabled: active.length >= 4,
							onClick: () => setEditor({ mode: "add" }),
							children: "Add"
						})]
					}),
					active.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No active practices."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-3",
						children: active.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticeRow, {
							practice: p,
							streak: streakFor(p.id, checkIns, today),
							longest: longestStreakFor(p.id, checkIns),
							onEdit: () => setEditor({
								mode: "edit",
								id: p.id
							}),
							onArchive: () => archivePractice(p.id)
						}, p.id))
					}),
					active.length >= 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: "Four is enough. Archive one to add another."
					}) : null
				]
			}),
			archived.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
					children: "Archived"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-3",
					children: archived.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 rounded-2xl bg-surface px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: p.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted",
								children: p.commitment
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							disabled: active.length >= 4,
							onClick: () => restorePractice(p.id),
							children: "Restore"
						})]
					}, p.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border pt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "quiet",
						className: "text-muted",
						children: "Start over"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Clear this device?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "All practices, days, and notes on this device will be removed. This cannot be undone." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Keep them" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: resetAll,
					children: "Clear everything"
				})] })] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticeDialog, {
				open: editor !== null,
				onOpenChange: (open) => {
					if (!open) setEditor(null);
				},
				practice: editing,
				onSave: (input) => {
					if (editor?.mode === "edit") updatePractice(editor.id, input);
					else addPractice(input);
					setEditor(null);
				}
			})
		]
	});
}
function PracticeRow({ practice, streak, longest, onEdit, onArchive }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex flex-col gap-3 rounded-2xl bg-surface p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl leading-snug",
					children: practice.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: practice.commitment
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs tabular-nums text-subtle",
					children: [
						"Now ",
						streak,
						" · longest ",
						longest
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: onEdit,
				children: "Edit"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "quiet",
				onClick: onArchive,
				children: "Archive"
			})]
		})]
	});
}
function PracticeDialog({ open, onOpenChange, practice, onSave }) {
	const [title, setTitle] = (0, import_react.useState)(practice?.title ?? "");
	const [commitment, setCommitment] = (0, import_react.useState)(practice?.commitment ?? "");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setTitle(practice?.title ?? "");
		setCommitment(practice?.commitment ?? "");
	}, [open, practice]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: practice ? "Edit practice" : "New practice" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "A name, and the daily act. Keep it small enough to repeat." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex flex-col gap-4",
			onSubmit: (e) => {
				e.preventDefault();
				if (!title.trim() || !commitment.trim()) return;
				onSave({
					title,
					commitment
				});
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "p-title",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "p-title",
						value: title,
						maxLength: 40,
						onChange: (e) => setTitle(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "p-act",
						children: "Daily act"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "p-act",
						value: commitment,
						maxLength: 80,
						rows: 2,
						onChange: (e) => setCommitment(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !title.trim() || !commitment.trim(),
					children: "Save"
				}) })
			]
		})] })
	});
}
function pick(lines, seed) {
	let h = 0;
	for (let i = 0; i < seed.length; i++) h = h * 33 + seed.charCodeAt(i) >>> 0;
	return lines[h % lines.length] ?? lines[0] ?? "";
}
function greet(name, hour) {
	const n = name.trim();
	const who = n ? `, ${n}` : "";
	if (hour < 5) return `You're still up${who}.`;
	if (hour < 12) return `Good morning${who}.`;
	if (hour < 17) return `Good afternoon${who}.`;
	if (hour < 21) return `Good evening${who}.`;
	return `It's late${who}.`;
}
function speak(ctx) {
	const hour = ctx.hour ?? hourOf();
	const greeting = greet(ctx.name, hour);
	const allDone = ctx.total > 0 && ctx.keptCount === ctx.total;
	const noneDone = ctx.keptCount === 0;
	const seed = `${ctx.today}:${ctx.keptCount}:${ctx.total}:${ctx.missedYesterday ? 1 : 0}`;
	const first = ctx.practices[0];
	const named = first?.title ? first.title : "the work";
	if (ctx.total === 0) return {
		greeting,
		body: "You have nothing to keep yet. Name one small thing. I'll hold it."
	};
	if (ctx.isFirstCalendarDay && noneDone) return {
		greeting,
		body: pick([
			`This is day one of ${named}. Not a streak. Not a test. Just the thing you said you'd do.`,
			`We start today. ${named} — once, all the way through. That's the whole job.`,
			`A first mark is the only one that matters right now. Keep ${named}. The rest follows.`
		], seed)
	};
	if (ctx.isFirstCalendarDay && allDone) return {
		greeting,
		body: pick([
			"Day one, kept. The rest is repetition.",
			"That's a start you can trust. Come back tomorrow and do it again.",
			"One mark on the page. That's how every long thing begins."
		], seed)
	};
	if (allDone) {
		if (ctx.bestCurrentStreak >= 30) return {
			greeting,
			body: pick(["Thirty days and counting. The practice is starting to keep you.", "A month of showing up. Quiet, unspectacular, and real."], seed)
		};
		if (ctx.bestCurrentStreak >= 14) return {
			greeting,
			body: pick(["Two weeks. This is no longer a mood. It's a rhythm.", "Fourteen days. You don't have to feel it. You just have to keep it."], seed)
		};
		if (ctx.bestCurrentStreak >= 7) return {
			greeting,
			body: pick([
				"A week, kept. Quiet work compounds.",
				"Seven days in a row. That's a promise with a spine.",
				"A week of showing up. Set the day down."
			], seed)
		};
		if (ctx.bestCurrentStreak >= 3) return {
			greeting,
			body: pick([
				"Three days. The hard part is becoming ordinary.",
				"Kept again. Momentum is just tomorrow's version of today.",
				"You can put the day down. It was kept."
			], seed)
		};
		if (hour >= 21) return {
			greeting,
			body: "Evening, and it's done. That's a day you can set down."
		};
		return {
			greeting,
			body: pick([
				"Already kept. The rest of the day is yours.",
				"Marked. Come back tomorrow — that's the whole trick.",
				`${named} is done. Nothing else is owed today.`
			], seed)
		};
	}
	if (!noneDone) return {
		greeting,
		body: pick([
			"Part of the list is kept. Finish what's open if you can.",
			"One down. Close the rest when you have a sliver of time.",
			"Halfway is not a failure. It's a list with a next step."
		], seed)
	};
	if (ctx.missedYesterday) {
		if (hour >= 21) return {
			greeting,
			body: "Yesterday went unmarked. If you have a little left tonight, use it. If not, sleep — morning is a clean start, not a test."
		};
		return {
			greeting,
			body: pick([
				"Yesterday went unmarked. Nothing to make up. Begin here.",
				"A missed day is not a verdict. Today is still available.",
				"You don't restart a life. You keep the next one. That's today."
			], seed)
		};
	}
	if (hour >= 21) return {
		greeting,
		body: pick([`Late. If you still have a sliver of time, keep ${named}. If you don't, rest — I'll be here in the morning.`, "The day is thin now. A small mark still counts. So does sleep."], seed)
	};
	if (hour < 12) return {
		greeting,
		body: pick([
			`You have one thing to keep today. ${named}. That's the whole list.`,
			"Morning is for the first mark. Do it before the day fills up.",
			`Keep ${named} once. Then you can forget me until tomorrow.`
		], seed)
	};
	return {
		greeting,
		body: pick([
			`Still open: ${named}. A short pass is enough.`,
			"The day is moving. The mark doesn't have to be large. It has to be today.",
			`Return to ${named} when you can. I'll hold the place.`
		], seed)
	};
}
function PracticeCard({ practice, checkIns, today }) {
	const keep = useSteadStore((s) => s.keep);
	const unkeep = useSteadStore((s) => s.unkeep);
	const setNote = useSteadStore((s) => s.setNote);
	const checkIn = keptOn(checkIns, practice.id, today);
	const streak = streakFor(practice.id, checkIns, today);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [editingNote, setEditingNote] = (0, import_react.useState)(false);
	function onKeep() {
		keep(practice.id, draft);
		setDraft("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-2xl bg-surface p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl leading-snug tracking-[-0.02em]",
					children: practice.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-normal text-muted",
					children: practice.commitment
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("relative mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color] duration-[var(--motion-fast)] ease-[var(--ease-out)]", checkIn ? "border-accent bg-accent text-accent-fg" : "border-border text-transparent"),
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: cn("size-4 transition-[opacity,transform,filter] duration-[var(--motion-fast)] ease-[var(--ease-out)]", checkIn ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]"),
					strokeWidth: 2.5
				})
			})]
		}), checkIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Kept",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [" · ", formatTime(checkIn.at)]
						}),
						streak > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [
								" · ",
								streak,
								" in a row"
							]
						}) : null
					]
				}),
				editingNote || !checkIn.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						setNote(practice.id, today, draft || checkIn.note);
						setEditingNote(false);
						setDraft("");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: editingNote ? draft : draft || checkIn.note,
						onChange: (e) => {
							setEditingNote(true);
							setDraft(e.target.value);
						},
						placeholder: "A line about today (optional)",
						maxLength: 200,
						rows: 2,
						className: "min-h-16 bg-bg text-sm"
					}), editingNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "sm",
							children: "Save line"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "quiet",
							onClick: () => {
								setEditingNote(false);
								setDraft("");
							},
							children: "Cancel"
						})]
					}) : null]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-left font-display text-base italic leading-snug text-fg",
					onClick: () => {
						setDraft(checkIn.note);
						setEditingNote(true);
					},
					children: checkIn.note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					size: "sm",
					className: "-ml-3 self-start",
					onClick: () => unkeep(practice.id, today),
					children: "Undo"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					placeholder: "A line about today (optional)",
					maxLength: 200,
					rows: 2,
					className: "min-h-16 bg-bg text-sm",
					onKeyDown: (e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							onKeep();
						}
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "wide",
					onClick: onKeep,
					children: "Keep it"
				}),
				streak > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs tabular-nums text-subtle",
					children: [
						streak,
						" day",
						streak === 1 ? "" : "s",
						" in a row so far"
					]
				}) : null
			]
		})]
	});
}
function WeekStrip({ practices, checkIns, today }) {
	const keys = weekKeys(today);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "grid grid-cols-7 gap-2",
		"aria-label": "This week",
		children: keys.map((key) => {
			const { kept, total } = dayCompletion(practices, checkIns, key);
			const isToday = key === today;
			const isFuture = key > today;
			const ratio = total === 0 ? 0 : kept / total;
			const all = total > 0 && kept === total;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-col items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("text-xs font-medium uppercase tracking-[0.14em]", isToday ? "text-fg" : "text-subtle"),
					children: formatWeekdayShort(key).slice(0, 1)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("relative flex size-8 items-center justify-center rounded-full border border-border transition-[background-color,border-color,box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-out)]", isToday && "ring-1 ring-fg ring-offset-2 ring-offset-bg", isFuture && "opacity-40", all && "border-accent bg-accent", !all && ratio > 0 && "border-accent/50 bg-accent/20"),
					title: `${key}: ${kept}/${total || 0} kept`,
					children: all ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-accent-fg" }) : null
				})]
			}, key);
		})
	});
}
function TodayView({ onAddPractice }) {
	const profile = useSteadStore((s) => s.profile);
	const allPractices = useSteadStore((s) => s.practices);
	const checkIns = useSteadStore((s) => s.checkIns);
	const practices = activePractices(allPractices);
	const today = useTodayKey();
	const { kept, total } = dayCompletion(practices, checkIns, today);
	const best = practices.reduce((m, p) => Math.max(m, streakFor(p.id, checkIns, today)), 0);
	const full = fullDayStreak(practices, checkIns, today);
	const isFirstCalendarDay = practices.length > 0 && practices.every((p) => createdKey(p) === today);
	const speech = speak({
		today,
		name: profile.name,
		hour: hourOf(),
		practices,
		keptCount: kept,
		total,
		missedYesterday: missedYesterday(practices, checkIns, today),
		bestCurrentStreak: best,
		isFirstCalendarDay
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
						dateTime: today,
						className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
						children: formatLongDate(today)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "stead-enter text-sm text-muted",
						children: speech.greeting
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "stead-enter stead-enter-2 font-display text-2xl leading-snug tracking-[-0.02em]",
						children: speech.body
					})
				]
			}),
			practices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Nothing on the list"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Name one daily act and I'll hold it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-5",
						onClick: onAddPractice,
						children: "Add a practice"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-4",
				children: practices.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticeCard, {
					practice: p,
					checkIns,
					today
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
						children: "This week"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekStrip, {
						practices,
						checkIns,
						today
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm tabular-nums text-muted",
						children: full > 0 ? `${full} full day${full === 1 ? "" : "s"} in a row` : best > 0 ? `A ${best}-day run is still alive` : "No run yet. Today is enough."
					})
				]
			})
		]
	});
}
function Home() {
	const onboarded = useSteadStore((s) => s.profile.onboarded);
	const [tab, setTab] = (0, import_react.useState)("today");
	(0, import_react.useEffect)(() => {
		useSteadStore.persist.rehydrate();
	}, []);
	if (!onboarded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, {
		tab,
		onTab: setTab,
		children: [
			tab === "today" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayView, { onAddPractice: () => setTab("practices") }) : null,
			tab === "log" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogView, {}) : null,
			tab === "practices" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticesView, {}) : null
		]
	});
}
//#endregion
export { Home as component };
