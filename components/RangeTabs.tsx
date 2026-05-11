"use client";

import type { RangeKey } from "@/lib/stats";

const OPTIONS: { key: RangeKey; label: string }[] = [
  { key: "week", label: "השבוע" },
  { key: "month", label: "החודש" },
  { key: "year", label: "השנה" },
  { key: "all", label: "הכל" },
];

type Props = {
  value: RangeKey;
  onChange: (key: RangeKey) => void;
};

export function RangeTabs({ value, onChange }: Props) {
  return (
    <div className="flex gap-1 rounded-2xl bg-stone-100 p-1">
      {OPTIONS.map((opt) => {
        const active = opt.key === value;
        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition ${
              active ? "bg-white text-stone-800 shadow" : "text-stone-500"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
