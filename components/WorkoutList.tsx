"use client";

import { formatHebrewDate, formatKm } from "@/lib/stats";
import { SPORT_LABEL, type Workout } from "@/lib/types";

type Props = {
  workouts: Workout[];
  onDelete: (id: string) => void;
};

export function WorkoutList({ workouts, onDelete }: Props) {
  if (workouts.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center text-stone-500 ring-1 ring-stone-100">
        אין אימונים בטווח שנבחר.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-stone-100 overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-stone-100">
      {workouts.map((w) => (
        <li key={w.id} className="flex items-center justify-between gap-3 p-4">
          <button
            onClick={() => onDelete(w.id)}
            aria-label="מחיקה"
            className="rounded-full p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-500"
          >
            🗑️
          </button>
          <div className="flex-1 text-right">
            <div className="flex items-baseline gap-2 justify-start">
              <span className="text-lg font-bold text-stone-800">
                {formatKm(w.distanceKm)} ק״מ
              </span>
              <span className="text-xs text-stone-500">{SPORT_LABEL[w.sport]}</span>
            </div>
            <div className="text-xs text-stone-400">{formatHebrewDate(w.date)}</div>
          </div>
          <span className="text-2xl" aria-hidden>
            {w.sport === "running" ? "🏃" : "🚶"}
          </span>
        </li>
      ))}
    </ul>
  );
}
