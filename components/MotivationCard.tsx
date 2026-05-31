"use client";

import type { Insight } from "@/lib/insights";

type Props = {
  insight: Insight;
};

export function MotivationCard({ insight }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ocean-500 via-ocean-600 to-sage-600 p-6 text-white shadow-glow">
      <div className="pointer-events-none absolute -left-8 -top-8 text-8xl opacity-20">🌍</div>
      <div className="pointer-events-none absolute -bottom-6 -left-4 text-6xl opacity-10">
        {insight.emoji}
      </div>
      <div className="relative space-y-2 text-right">
        <div className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
          <span>{insight.emoji}</span>
          <span>{insight.scope}</span>
        </div>
        <div className="text-3xl font-extrabold tabular-nums">{insight.headline}</div>
        <p className="text-lg font-bold leading-snug">{insight.body}</p>
        <p className="pt-1 text-sm text-white/90">{insight.cheer}</p>
      </div>
    </section>
  );
}
