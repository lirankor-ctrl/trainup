"use client";

import { useState } from "react";

type Props = {
  onAdd: (distanceKm: number) => void;
};

const PRESETS = [1, 3, 5, 10];

export function QuickAdd({ onAdd }: Props) {
  const [custom, setCustom] = useState("");
  const [pulse, setPulse] = useState<number | null>(null);

  const submit = (km: number) => {
    if (!Number.isFinite(km) || km <= 0) return;
    onAdd(km);
    setPulse(km);
    setCustom("");
    setTimeout(() => setPulse(null), 700);
  };

  const handleCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(custom.replace(",", "."));
    submit(parsed);
  };

  return (
    <section className="space-y-4">
      <p className="text-right text-sm text-stone-500">בחר/י מרחק מהיר, או הקלד/י מרחק מדויק 👇</p>

      <div className="grid grid-cols-2 gap-3">
        {PRESETS.map((km) => (
          <button
            key={km}
            onClick={() => submit(km)}
            className={`group flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-brand-400 to-brand-500 py-7 text-white shadow-glow transition active:scale-95 ${
              pulse === km ? "ring-4 ring-brand-200" : ""
            }`}
          >
            <div className="text-4xl font-extrabold leading-none">{km}</div>
            <div className="mt-1 text-sm font-medium opacity-90">ק״מ</div>
          </button>
        ))}
      </div>

      <form
        onSubmit={handleCustom}
        className="flex gap-2 rounded-3xl bg-white p-3 shadow-soft ring-1 ring-stone-100"
      >
        <input
          type="number"
          inputMode="decimal"
          step="0.1"
          min="0"
          placeholder="מרחק מותאם אישית (ק״מ)"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className="flex-1 rounded-2xl bg-stone-50 px-4 py-3 text-right text-lg outline-none ring-1 ring-transparent focus:ring-brand-300"
        />
        <button
          type="submit"
          disabled={!custom}
          className="rounded-2xl bg-brand-500 px-6 font-bold text-white transition active:scale-95 disabled:opacity-40"
        >
          הוסף
        </button>
      </form>
    </section>
  );
}
