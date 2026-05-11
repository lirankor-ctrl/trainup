"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { MotivationCard } from "@/components/MotivationCard";
import { QuickAdd } from "@/components/QuickAdd";
import { SportPicker } from "@/components/SportPicker";
import { StatsGrid } from "@/components/Stats";
import { useSettings, useWorkouts } from "@/lib/hooks";
import { buildInsight } from "@/lib/insights";
import { addWorkout } from "@/lib/storage";
import { computeStats, filterByRange } from "@/lib/stats";
import { SPORT_LABEL, type Sport } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const { settings, hydrated: settingsReady, update } = useSettings();
  const { workouts, hydrated: workoutsReady, refresh } = useWorkouts();

  const sport = settings.sport;

  const { monthKm, yearKm, allStats } = useMemo(() => {
    const month = filterByRange(workouts, "month");
    const year = filterByRange(workouts, "year");
    return {
      monthKm: computeStats(month).totalKm,
      yearKm: computeStats(year).totalKm,
      allStats: computeStats(workouts),
    };
  }, [workouts]);

  const insight = useMemo(() => {
    if (!sport) return null;
    return buildInsight({ sport, monthKm, yearKm });
  }, [sport, monthKm, yearKm]);

  if (!settingsReady || !workoutsReady) {
    return <div className="h-[60vh]" aria-hidden />;
  }

  if (!sport) {
    return <SportPicker onPick={(s) => update({ sport: s })} />;
  }

  const handleAdd = (km: number) => {
    addWorkout({ sport, distanceKm: km });
    refresh();
  };

  return (
    <div className="space-y-6">
      <Header sport={sport} onSwitch={() => update({ sport: nextSport(sport) })} />
      {insight && <MotivationCard insight={insight} />}
      <QuickAdd onAdd={handleAdd} />
      <StatsGrid
        monthKm={monthKm}
        yearKm={yearKm}
        allKm={allStats.totalKm}
        count={allStats.count}
        avgKm={allStats.avgKm}
      />
      <button
        onClick={() => router.push("/reports")}
        className="w-full rounded-2xl bg-stone-800 px-4 py-3 font-bold text-white shadow-soft transition active:scale-[0.99]"
      >
        כל האימונים שלי
      </button>
    </div>
  );
}

function Header({ sport, onSwitch }: { sport: Sport; onSwitch: () => void }) {
  return (
    <header className="flex items-start justify-between">
      <button
        onClick={onSwitch}
        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-600 shadow-soft ring-1 ring-stone-100"
      >
        החלף ל{SPORT_LABEL[nextSport(sport)]}
      </button>
      <div className="text-right">
        <div className="text-xs text-stone-400">מצב נוכחי</div>
        <h1 className="text-2xl font-bold text-stone-800">
          {SPORT_LABEL[sport]} {sport === "running" ? "🏃" : "🚶"}
        </h1>
      </div>
    </header>
  );
}

function nextSport(s: Sport): Sport {
  return s === "walking" ? "running" : "walking";
}
