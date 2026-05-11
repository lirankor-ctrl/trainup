"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { QuickAdd } from "@/components/QuickAdd";
import { useSettings, useWorkouts } from "@/lib/hooks";
import { addWorkout } from "@/lib/storage";
import { formatKm } from "@/lib/stats";
import { SPORT_LABEL, type Sport } from "@/lib/types";

export default function AddPage() {
  const router = useRouter();
  const { settings, hydrated: settingsReady, update } = useSettings();
  const { refresh } = useWorkouts();
  const [lastAdded, setLastAdded] = useState<number | null>(null);

  if (!settingsReady) {
    return <div className="h-[60vh]" aria-hidden />;
  }

  const sport: Sport = settings.sport ?? "walking";

  const handleAdd = (km: number) => {
    addWorkout({ sport, distanceKm: km });
    refresh();
    setLastAdded(km);
    setTimeout(() => router.push("/"), 800);
  };

  return (
    <div className="space-y-6">
      <header className="text-right">
        <div className="text-xs text-stone-400">הוספת אימון</div>
        <h1 className="text-2xl font-bold text-stone-800">כמה {SPORT_LABEL[sport]} היום?</h1>
      </header>

      <div className="flex gap-2">
        {(["walking", "running"] as Sport[]).map((s) => (
          <button
            key={s}
            onClick={() => update({ sport: s })}
            className={`flex-1 rounded-2xl px-4 py-3 text-sm font-bold transition ${
              sport === s
                ? "bg-brand-500 text-white shadow-soft"
                : "bg-white text-stone-600 ring-1 ring-stone-100"
            }`}
          >
            {s === "running" ? "🏃" : "🚶"} {SPORT_LABEL[s]}
          </button>
        ))}
      </div>

      <QuickAdd onAdd={handleAdd} />

      {lastAdded !== null && (
        <div className="rounded-2xl bg-sage-500 p-4 text-center font-bold text-white shadow-soft">
          ✅ נוספו {formatKm(lastAdded)} ק״מ! מעביר אותך לראשי…
        </div>
      )}
    </div>
  );
}
