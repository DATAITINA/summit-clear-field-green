import { useEffect, useState } from "react";
import { todayKey } from "@/lib/dates";

export function useTodayKey(): string {
  const [key, setKey] = useState(todayKey);
  useEffect(() => {
    const id = window.setInterval(() => {
      const next = todayKey();
      setKey((k) => (k === next ? k : next));
    }, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return key;
}
