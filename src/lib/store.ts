import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { newId } from "@/lib/utils";
import { todayKey } from "@/lib/dates";

export const MAX_PRACTICES = 4;

export type Practice = {
  id: string;
  title: string;
  commitment: string;
  createdAt: string;
  archived: boolean;
};

export type CheckIn = {
  id: string;
  practiceId: string;
  date: string;
  note: string;
  at: string;
};

export type Profile = {
  name: string;
  onboarded: boolean;
};

type SteadState = {
  profile: Profile;
  practices: Practice[];
  checkIns: CheckIn[];
  completeOnboarding: (input: {
    name: string;
    title: string;
    commitment: string;
  }) => void;
  setName: (name: string) => void;
  addPractice: (input: { title: string; commitment: string }) => string | null;
  updatePractice: (
    id: string,
    input: { title: string; commitment: string },
  ) => void;
  archivePractice: (id: string) => void;
  restorePractice: (id: string) => void;
  keep: (practiceId: string, note?: string) => void;
  unkeep: (practiceId: string, date?: string) => void;
  setNote: (practiceId: string, date: string, note: string) => void;
  resetAll: () => void;
};

const emptyProfile: Profile = { name: "", onboarded: false };

export const useSteadStore = create<SteadState>()(
  persist(
    (set, get) => ({
      profile: emptyProfile,
      practices: [],
      checkIns: [],

      completeOnboarding: ({ name, title, commitment }) => {
        const practice: Practice = {
          id: newId(),
          title: title.trim(),
          commitment: commitment.trim(),
          createdAt: new Date().toISOString(),
          archived: false,
        };
        set({
          profile: { name: name.trim(), onboarded: true },
          practices: [practice],
        });
      },

      setName: (name) =>
        set({ profile: { ...get().profile, name: name.trim() } }),

      addPractice: ({ title, commitment }) => {
        const active = get().practices.filter((p) => !p.archived);
        if (active.length >= MAX_PRACTICES) return null;
        const practice: Practice = {
          id: newId(),
          title: title.trim(),
          commitment: commitment.trim(),
          createdAt: new Date().toISOString(),
          archived: false,
        };
        set({ practices: [...get().practices, practice] });
        return practice.id;
      },

      updatePractice: (id, { title, commitment }) => {
        set({
          practices: get().practices.map((p) =>
            p.id === id
              ? { ...p, title: title.trim(), commitment: commitment.trim() }
              : p,
          ),
        });
      },

      archivePractice: (id) => {
        set({
          practices: get().practices.map((p) =>
            p.id === id ? { ...p, archived: true } : p,
          ),
        });
      },

      restorePractice: (id) => {
        const active = get().practices.filter((p) => !p.archived);
        if (active.length >= MAX_PRACTICES) return;
        set({
          practices: get().practices.map((p) =>
            p.id === id ? { ...p, archived: false } : p,
          ),
        });
      },

      keep: (practiceId, note) => {
        const date = todayKey();
        const existing = get().checkIns.find(
          (c) => c.practiceId === practiceId && c.date === date,
        );
        if (existing) {
          if (note !== undefined) {
            set({
              checkIns: get().checkIns.map((c) =>
                c.id === existing.id ? { ...c, note: note.trim() } : c,
              ),
            });
          }
          return;
        }
        const checkIn: CheckIn = {
          id: newId(),
          practiceId,
          date,
          note: (note ?? "").trim(),
          at: new Date().toISOString(),
        };
        set({ checkIns: [...get().checkIns, checkIn] });
      },

      unkeep: (practiceId, date = todayKey()) => {
        set({
          checkIns: get().checkIns.filter(
            (c) => !(c.practiceId === practiceId && c.date === date),
          ),
        });
      },

      setNote: (practiceId, date, note) => {
        set({
          checkIns: get().checkIns.map((c) =>
            c.practiceId === practiceId && c.date === date
              ? { ...c, note: note.trim() }
              : c,
          ),
        });
      },

      resetAll: () => {
        set({ profile: emptyProfile, practices: [], checkIns: [] });
      },
    }),
    {
      name: "stead-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        profile: state.profile,
        practices: state.practices,
        checkIns: state.checkIns,
      }),
    },
  ),
);
