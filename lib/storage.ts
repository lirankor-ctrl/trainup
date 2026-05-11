import type { Settings, Sport, Workout } from "./types";

// localStorage keys — keep stable; Supabase migration will copy from here.
const WORKOUTS_KEY = "trainup.workouts.v1";
const SETTINGS_KEY = "trainup.settings.v1";

// TODO(supabase): replace these sync localStorage calls with async Supabase
// queries (e.g. supabase.from("workouts").select()). The component layer
// already treats reads as state-on-mount, so swapping to async is local.

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadWorkouts(): Workout[] {
  if (typeof window === "undefined") return [];
  const list = safeParse<Workout[]>(localStorage.getItem(WORKOUTS_KEY), []);
  // Newest first.
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

export function saveWorkouts(workouts: Workout[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
}

export function addWorkout(input: {
  sport: Sport;
  distanceKm: number;
  date?: string;
}): Workout {
  const workout: Workout = {
    id: cryptoId(),
    date: input.date ?? todayIso(),
    sport: input.sport,
    distanceKm: round2(input.distanceKm),
  };
  // TODO(supabase): await supabase.from("workouts").insert(workout)
  const current = loadWorkouts();
  saveWorkouts([workout, ...current]);
  return workout;
}

export function deleteWorkout(id: string): void {
  // TODO(supabase): await supabase.from("workouts").delete().eq("id", id)
  const next = loadWorkouts().filter((w) => w.id !== id);
  saveWorkouts(next);
}

export function loadSettings(): Settings {
  if (typeof window === "undefined") return { sport: null };
  return safeParse<Settings>(localStorage.getItem(SETTINGS_KEY), { sport: null });
}

export function saveSettings(settings: Settings): void {
  if (typeof window === "undefined") return;
  // TODO(supabase): persist user prefs on auth.users metadata or a profile row.
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function cryptoId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function todayIso(): string {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
