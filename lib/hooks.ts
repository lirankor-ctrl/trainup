"use client";

import { useEffect, useState } from "react";
import { loadSettings, loadWorkouts, saveSettings } from "./storage";
import type { Settings, Workout } from "./types";

// Hydrate from localStorage after mount; SSR returns empty state.
export function useWorkouts(): {
  workouts: Workout[];
  hydrated: boolean;
  refresh: () => void;
} {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const refresh = () => setWorkouts(loadWorkouts());

  useEffect(() => {
    setWorkouts(loadWorkouts());
    setHydrated(true);

    // Keep tabs in sync if another tab writes.
    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key.startsWith("trainup.")) refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { workouts, hydrated, refresh };
}

export function useSettings(): {
  settings: Settings;
  hydrated: boolean;
  update: (next: Partial<Settings>) => void;
} {
  const [settings, setSettings] = useState<Settings>({ sport: null });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    setHydrated(true);
  }, []);

  const update = (next: Partial<Settings>) => {
    const merged = { ...settings, ...next };
    setSettings(merged);
    saveSettings(merged);
  };

  return { settings, hydrated, update };
}
