"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MotivationCard } from "@/components/MotivationCard";
import { DidYouKnow } from "@/components/DidYouKnow";
import { SportPicker } from "@/components/SportPicker";
import { StatsGrid } from "@/components/Stats";
import { useSettings, useWorkouts } from "@/lib/hooks";
import { buildInsight, greeting } from "@/lib/insights";
import { computeStats, filterByRange } from "@/lib/stats";
import { SPORT_LABEL, type Sport } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const { settings, hydrated: settingsReady, update } = useSettings();
  const { workouts, hydrated: workoutsReady } = useWorkouts();

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

  // Reseed once per mount (i.e. per app open) so the comparison changes each time.
  const insight = useMemo(() => {
    if (!sport) return null;
    return buildInsight({
      sport,
      monthKm,
      yearKm,
      allKm: allStats.totalKm,
      rand: Math.random(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sport, monthKm, yearKm, allStats.totalKm, workoutsReady]);

  if (!settingsReady || !workoutsReady) {
    return <div className="h-[60vh]" aria-hidden />;
  }

  if (!sport) {
    return <SportPicker onPick={(s) => update({ sport: s })} />;
  }

  return (
    <div className="space-y-6">
      <Header sport={sport} onSwitch={() => update({ sport: nextSport(sport) })} />

      {insight && (
        <div className="animate-rise space-y-3">
          <MotivationCard insight={insight} />
          {insight.fact && <DidYouKnow fact={insight.fact} />}
        </div>
      )}

      <ActionButtons onAdd={() => router.push("/add")} onReports={() => router.push("/reports")} />

      <StatsGrid
        monthKm={monthKm}
        yearKm={yearKm}
        allKm={allStats.totalKm}
        count={allStats.count}
        avgKm={allStats.avgKm}
      />
    </div>
  );
}

function Header({ sport, onSwitch }: { sport: Sport; onSwitch: () => void }) {
  const hello = greeting(new Date().getHours());
  return (
    <header className="flex items-center gap-3">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl shadow-soft ring-1 ring-ocean-100">
        <Image
          src="/logo.jpg"
          alt="TrainUp"
          fill
          sizes="56px"
          className="object-contain"
          priority
        />
      </div>
      <div className="flex-1 text-right">
        <div className="text-xs text-stone-400">{hello} 👋</div>
        <h1 className="text-2xl font-bold leading-tight text-stone-800">
          מוכנים ל{SPORT_LABEL[sport]}?
        </h1>
      </div>
      <button
        onClick={onSwitch}
        className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ocean-600 shadow-soft ring-1 ring-ocean-100 transition active:scale-95"
      >
        {sport === "running" ? "🏃" : "🚶"} החלף
      </button>
    </header>
  );
}

function ActionButtons({ onAdd, onReports }: { onAdd: () => void; onReports: () => void }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <button
        onClick={onAdd}
        className="flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-br from-brand-400 to-brand-500 px-5 py-5 text-lg font-bold text-white shadow-glow transition active:scale-[0.98] sm:col-span-2"
      >
        <span className="text-2xl">➕</span>
        הוספת אימון חדש
      </button>
      <button
        onClick={onReports}
        className="flex items-center justify-center gap-2 rounded-3xl bg-white px-5 py-5 text-base font-bold text-stone-700 shadow-soft ring-1 ring-stone-100 transition active:scale-[0.98]"
      >
        <span className="text-2xl">📊</span>
        הדוחות שלי
      </button>
    </div>
  );
}

function nextSport(s: Sport): Sport {
  return s === "walking" ? "running" : "walking";
}
