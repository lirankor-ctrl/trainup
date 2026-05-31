"use client";

import { formatKm } from "@/lib/stats";

type StatCardProps = {
  icon: string;
  label: string;
  value: string;
  suffix?: string;
  accent?: boolean;
};

function StatCard({ icon, label, value, suffix, accent }: StatCardProps) {
  return (
    <div
      className={`rounded-2xl p-4 shadow-soft ring-1 transition ${
        accent
          ? "bg-gradient-to-br from-sage-500 to-sage-600 text-white ring-sage-400"
          : "bg-white text-stone-800 ring-stone-100"
      }`}
    >
      <div
        className={`flex items-center gap-1.5 text-xs ${accent ? "text-white/85" : "text-stone-500"}`}
      >
        <span aria-hidden>{icon}</span>
        <span>{label}</span>
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-bold tabular-nums">{value}</span>
        {suffix && (
          <span className={`text-sm ${accent ? "text-white/85" : "text-stone-500"}`}>{suffix}</span>
        )}
      </div>
    </div>
  );
}

type Props = {
  monthKm: number;
  yearKm: number;
  allKm: number;
  count: number;
  avgKm: number;
};

export function StatsGrid({ monthKm, yearKm, allKm, count, avgKm }: Props) {
  return (
    <section className="space-y-3">
      <h2 className="text-right text-lg font-bold text-stone-800">המספרים שלך</h2>
      <div className="grid grid-cols-2 gap-3">
        <StatCard accent icon="📅" label="החודש" value={formatKm(monthKm)} suffix="ק״מ" />
        <StatCard icon="🗓️" label="השנה" value={formatKm(yearKm)} suffix="ק״מ" />
        <StatCard icon="🌍" label="מאז שהתחלת" value={formatKm(allKm)} suffix="ק״מ" />
        <StatCard icon="🏃" label="אימונים" value={`${count}`} />
        <div className="col-span-2">
          <StatCard icon="📈" label="ממוצע לאימון" value={formatKm(avgKm)} suffix="ק״מ" />
        </div>
      </div>
    </section>
  );
}
