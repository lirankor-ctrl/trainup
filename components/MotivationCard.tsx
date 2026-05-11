"use client";

import type { Insight } from "@/lib/insights";

type Props = {
  insight: Insight;
};

export function MotivationCard({ insight }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sage-500 to-emerald-600 p-6 text-white shadow-soft">
      <div className="absolute -left-6 -top-6 text-7xl opacity-20">✨</div>
      <div className="absolute -bottom-4 -right-4 text-7xl opacity-10">🏆</div>
      <div className="relative space-y-2">
        <div className="text-xs uppercase tracking-wider text-emerald-50/80">
          {insight.headline}
        </div>
        <p className="text-xl font-bold leading-snug">{insight.body}</p>
        <p className="text-sm text-emerald-50/90">{insight.cheer}</p>
      </div>
    </section>
  );
}
