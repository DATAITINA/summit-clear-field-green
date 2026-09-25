import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MAX_PRACTICES, useSteadStore, type Practice } from "@/lib/store";
import { longestStreakFor, streakFor } from "@/lib/streak";
import { useTodayKey } from "@/lib/use-today-key";

export function PracticesView() {
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

  const [nameDraft, setNameDraft] = useState(profile.name);
  const [editor, setEditor] = useState<
    null | { mode: "add" } | { mode: "edit"; id: string }
  >(null);

  const editing =
    editor?.mode === "edit"
      ? practices.find((p) => p.id === editor.id)
      : undefined;

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
          The promises
        </p>
        <h1 className="font-display text-3xl leading-[1.15] tracking-[-0.03em]">
          What you keep.
        </h1>
        <p className="max-w-md text-sm leading-normal text-muted">
          Stead works best with a short list. Four is the ceiling. Everything
          stays on this device.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <Label htmlFor="your-name">What I call you</Label>
        <Input
          id="your-name"
          value={nameDraft}
          maxLength={32}
          placeholder="Optional"
          onChange={(e) => setNameDraft(e.target.value)}
          onBlur={() => setName(nameDraft)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setName(nameDraft);
              (e.target as HTMLInputElement).blur();
            }
          }}
        />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
            Active
          </h2>
          <Button
            size="sm"
            disabled={active.length >= MAX_PRACTICES}
            onClick={() => setEditor({ mode: "add" })}
          >
            Add
          </Button>
        </div>
        {active.length === 0 ? (
          <p className="text-sm text-muted">No active practices.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {active.map((p) => (
              <PracticeRow
                key={p.id}
                practice={p}
                streak={streakFor(p.id, checkIns, today)}
                longest={longestStreakFor(p.id, checkIns)}
                onEdit={() => setEditor({ mode: "edit", id: p.id })}
                onArchive={() => archivePractice(p.id)}
              />
            ))}
          </ul>
        )}
        {active.length >= MAX_PRACTICES ? (
          <p className="text-xs text-subtle">
            Four is enough. Archive one to add another.
          </p>
        ) : null}
      </section>

      {archived.length > 0 ? (
        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
            Archived
          </h2>
          <ul className="flex flex-col gap-3">
            {archived.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-2xl bg-surface px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{p.title}</p>
                  <p className="truncate text-sm text-muted">{p.commitment}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={active.length >= MAX_PRACTICES}
                  onClick={() => restorePractice(p.id)}
                >
                  Restore
                </Button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="border-t border-border pt-8">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="quiet" className="text-muted">
              Start over
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear this device?</AlertDialogTitle>
              <AlertDialogDescription>
                All practices, days, and notes on this device will be removed.
                This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep them</AlertDialogCancel>
              <AlertDialogAction onClick={resetAll}>
                Clear everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      <PracticeDialog
        open={editor !== null}
        onOpenChange={(open) => {
          if (!open) setEditor(null);
        }}
        practice={editing}
        onSave={(input) => {
          if (editor?.mode === "edit") {
            updatePractice(editor.id, input);
          } else {
            addPractice(input);
          }
          setEditor(null);
        }}
      />
    </div>
  );
}

function PracticeRow({
  practice,
  streak,
  longest,
  onEdit,
  onArchive,
}: {
  practice: Practice;
  streak: number;
  longest: number;
  onEdit: () => void;
  onArchive: () => void;
}) {
  return (
    <li className="flex flex-col gap-3 rounded-2xl bg-surface p-5">
      <div className="min-w-0">
        <p className="font-display text-xl leading-snug">{practice.title}</p>
        <p className="mt-1 text-sm text-muted">{practice.commitment}</p>
        <p className="mt-2 text-xs tabular-nums text-subtle">
          Now {streak} · longest {longest}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button size="sm" variant="quiet" onClick={onArchive}>
          Archive
        </Button>
      </div>
    </li>
  );
}

function PracticeDialog({
  open,
  onOpenChange,
  practice,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  practice?: Practice;
  onSave: (input: { title: string; commitment: string }) => void;
}) {
  const [title, setTitle] = useState(practice?.title ?? "");
  const [commitment, setCommitment] = useState(practice?.commitment ?? "");

  useEffect(() => {
    if (!open) return;
    setTitle(practice?.title ?? "");
    setCommitment(practice?.commitment ?? "");
  }, [open, practice]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{practice ? "Edit practice" : "New practice"}</DialogTitle>
          <DialogDescription>
            A name, and the daily act. Keep it small enough to repeat.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim() || !commitment.trim()) return;
            onSave({ title, commitment });
          }}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="p-title">Name</Label>
            <Input
              id="p-title"
              value={title}
              maxLength={40}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="p-act">Daily act</Label>
            <Textarea
              id="p-act"
              value={commitment}
              maxLength={80}
              rows={2}
              onChange={(e) => setCommitment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!title.trim() || !commitment.trim()}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
