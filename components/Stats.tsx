"use client";

import { formatKm } from "@/lib/stats";

type StatCardProps = {
  label: string;
  value: string;
  suffix?: string;
  accent?: boolean;
};

function StatCard({ label, value, suffix, accent }: StatCardProps) {
  return (
    <div
      className={`rounded-2xl p-4 shadow-soft ring-1 ${
        accent
          ? "bg-gradient-to-br from-brand-500 to-brand-600 text-white ring-brand-400"
          : "bg-white text-stone-800 ring-stone-100"
      }`}
    >
      <div className={`text-xs ${accent ? "text-brand-50" : "text-stone-500"}`}>{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-bold">{value}</span>
        {suffix && (
          <span className={`text-sm ${accent ? "text-brand-50" : "text-stone-500"}`}>{suffix}</span>
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
      <h2 className="text-lg font-bold text-stone-800">הנתונים שלך</h2>
      <div className="grid grid-cols-2 gap-3">
        <StatCard accent label="החודש" value={formatKm(monthKm)} suffix="ק״מ" />
        <StatCard label="השנה" value={formatKm(yearKm)} suffix="ק״מ" />
        <StatCard label="סך הכל" value={formatKm(allKm)} suffix="ק״מ" />
        <StatCard label="מספר אימונים" value={`${count}`} />
        <div className="col-span-2">
          <StatCard label="ממוצע אימון" value={formatKm(avgKm)} suffix="ק״מ" />
        </div>
      </div>
    </section>
  );
}
