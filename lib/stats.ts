import type { Workout } from "./types";

export type RangeKey = "week" | "month" | "year" | "all";

export type Stats = {
  totalKm: number;
  count: number;
  avgKm: number;
};

export function computeStats(workouts: Workout[]): Stats {
  const totalKm = workouts.reduce((sum, w) => sum + w.distanceKm, 0);
  const count = workouts.length;
  const avgKm = count === 0 ? 0 : totalKm / count;
  return { totalKm, count, avgKm };
}

export function filterByRange(workouts: Workout[], range: RangeKey, now = new Date()): Workout[] {
  if (range === "all") return workouts;

  const start = startOfRange(range, now);
  const startIso = toIso(start);
  return workouts.filter((w) => w.date >= startIso);
}

export function startOfRange(range: Exclude<RangeKey, "all">, now = new Date()): Date {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  if (range === "week") {
    // Week starts Sunday in Israel.
    const day = d.getDay();
    d.setDate(d.getDate() - day);
  } else if (range === "month") {
    d.setDate(1);
  } else if (range === "year") {
    d.setMonth(0, 1);
  }
  return d;
}

export function toIso(d: Date): string {
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function formatKm(n: number): string {
  if (n === 0) return "0";
  if (n >= 100) return n.toFixed(0);
  if (n >= 10) return n.toFixed(1);
  return n.toFixed(2);
}

export function formatHebrewDate(iso: string): string {
  // dd/mm/yyyy — universally readable.
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
