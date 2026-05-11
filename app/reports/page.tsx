"use client";

import { useMemo, useState } from "react";
import { RangeTabs } from "@/components/RangeTabs";
import { WorkoutList } from "@/components/WorkoutList";
import { useWorkouts } from "@/lib/hooks";
import { deleteWorkout } from "@/lib/storage";
import { computeStats, filterByRange, formatKm, type RangeKey } from "@/lib/stats";

export default function ReportsPage() {
  const { workouts, hydrated, refresh } = useWorkouts();
  const [range, setRange] = useState<RangeKey>("month");

  const filtered = useMemo(() => filterByRange(workouts, range), [workouts, range]);
  const stats = useMemo(() => computeStats(filtered), [filtered]);

  const handleDelete = (id: string) => {
    if (!confirm("למחוק את האימון הזה?")) return;
    deleteWorkout(id);
    refresh();
  };

  if (!hydrated) {
    return <div className="h-[60vh]" aria-hidden />;
  }

  return (
    <div className="space-y-5">
      <header className="text-right">
        <div className="text-xs text-stone-400">דוחות</div>
        <h1 className="text-2xl font-bold text-stone-800">האימונים שלי</h1>
      </header>

      <RangeTabs value={range} onChange={setRange} />

      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-stone-100">
        <Cell label="סהכ ק״מ" value={formatKm(stats.totalKm)} />
        <Cell label="אימונים" value={`${stats.count}`} />
        <Cell label="ממוצע" value={formatKm(stats.avgKm)} />
      </div>

      <WorkoutList workouts={filtered} onDelete={handleDelete} />
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-xl font-bold text-stone-800">{value}</div>
      <div className="text-xs text-stone-500">{label}</div>
    </div>
  );
}
