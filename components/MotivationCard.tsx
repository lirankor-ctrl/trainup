"use client";

import type { Insight } from "@/lib/insights";

type Props = {
  insight: Insight;
};

export function MotivationCard({ insight }: Props) {
  const isMilestone = insight.kind === "milestone";

  // Festive gold gradient for milestones, calm ocean→sage for everything else.
  const gradient = isMilestone
    ? "from-amber-400 via-orange-500 to-rose-500"
    : "from-ocean-500 via-ocean-600 to-sage-600";

  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 text-white shadow-glow`}
    >
      <div className="pointer-events-none absolute -left-8 -top-8 text-8xl opacity-20">
        {isMilestone ? "🎉" : "🌍"}
      </div>
      <div className="pointer-events-none absolute -bottom-6 -left-4 text-6xl opacity-10">
        {insight.emoji}
      </div>
      <div className="relative space-y-2 text-right">
        <div className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
          <span>{insight.emoji}</span>
          <span>{insight.scope}</span>
        </div>
        <div className={`font-extrabold tabular-nums ${isMilestone ? "text-4xl" : "text-3xl"}`}>
          {insight.headline}
        </div>
        <p className="text-lg font-bold leading-snug">{insight.body}</p>
        <p className="pt-1 text-sm text-white/90">{insight.cheer}</p>
      </div>
    </section>
  );
}
