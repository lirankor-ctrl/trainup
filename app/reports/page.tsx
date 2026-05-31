"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RangeTabs } from "@/components/RangeTabs";
import { WorkoutList } from "@/components/WorkoutList";
import { useWorkouts } from "@/lib/hooks";
import { deleteWorkout } from "@/lib/storage";
import { computeStats, filterByRange, formatKm, type RangeKey } from "@/lib/stats";

const RANGE_LABEL: Record<RangeKey, string> = {
  week: "השבוע",
  month: "החודש",
  year: "השנה",
  all: "בכל הזמן",
};

export default function ReportsPage() {
  const router = useRouter();
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

  const hasAnyWorkout = workouts.length > 0;

  return (
    <div className="space-y-5">
      <header className="text-right">
        <div className="text-xs text-stone-400">דוחות</div>
        <h1 className="text-2xl font-bold text-stone-800">האימונים שלי</h1>
      </header>

      {!hasAnyWorkout ? (
        <EmptyAllState onAdd={() => router.push("/add")} />
      ) : (
        <>
          <RangeTabs value={range} onChange={setRange} />

          <div className="grid grid-cols-3 gap-2 rounded-3xl bg-white p-4 shadow-soft ring-1 ring-stone-100">
            <Cell icon="🌍" label="סה״כ ק״מ" value={formatKm(stats.totalKm)} />
            <Cell icon="🏃" label="אימונים" value={`${stats.count}`} />
            <Cell icon="📈" label="ממוצע" value={formatKm(stats.avgKm)} />
          </div>

          {filtered.length === 0 ? (
            <EmptyRangeState label={RANGE_LABEL[range]} onAdd={() => router.push("/add")} />
          ) : (
            <WorkoutList workouts={filtered} onDelete={handleDelete} />
          )}
        </>
      )}
    </div>
  );
}

function Cell({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-xl font-bold tabular-nums text-stone-800">{value}</div>
      <div className="mt-0.5 text-xs text-stone-500">
        <span aria-hidden>{icon} </span>
        {label}
      </div>
    </div>
  );
}

function EmptyAllState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-stone-100">
      <div className="text-5xl">👟</div>
      <h2 className="mt-3 text-lg font-bold text-stone-800">עוד לא רשמת אימונים</h2>
      <p className="mx-auto mt-1 max-w-xs text-sm text-stone-500">
        האימון הראשון שלך נמצא במרחק נגיעה. בוא/י נתחיל לצבור מרחק ולגלות לאן הוא לוקח אותך בעולם.
      </p>
      <button
        onClick={onAdd}
        className="mt-5 rounded-2xl bg-brand-500 px-6 py-3 font-bold text-white shadow-glow transition active:scale-95"
      >
        ➕ הוספת אימון ראשון
      </button>
    </div>
  );
}

function EmptyRangeState({ label, onAdd }: { label: string; onAdd: () => void }) {
  return (
    <div className="rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-stone-100">
      <div className="text-4xl">🗓️</div>
      <h2 className="mt-3 text-base font-bold text-stone-800">אין אימונים {label}</h2>
      <p className="mx-auto mt-1 max-w-xs text-sm text-stone-500">
        זה הזמן המושלם להוסיף אחד ולשמור על הרצף.
      </p>
      <button
        onClick={onAdd}
        className="mt-4 rounded-2xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-soft transition active:scale-95"
      >
        ➕ הוספת אימון
      </button>
    </div>
  );
}
