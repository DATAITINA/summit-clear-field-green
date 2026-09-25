import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppFrame, type AppTab } from "@/components/app-frame";
import { LogView } from "@/components/log-view";
import { Onboarding } from "@/components/onboarding";
import { PracticesView } from "@/components/practices-view";
import { TodayView } from "@/components/today-view";
import { useSteadStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const onboarded = useSteadStore((s) => s.profile.onboarded);
  const [tab, setTab] = useState<AppTab>("today");

  useEffect(() => {
    void useSteadStore.persist.rehydrate();
  }, []);

  if (!onboarded) {
    return <Onboarding />;
  }

  return (
    <AppFrame tab={tab} onTab={setTab}>
      {tab === "today" ? (
        <TodayView onAddPractice={() => setTab("practices")} />
      ) : null}
      {tab === "log" ? <LogView /> : null}
      {tab === "practices" ? <PracticesView /> : null}
    </AppFrame>
  );
}
