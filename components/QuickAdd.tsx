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
      <h2 className="text-lg font-bold text-stone-800">הוספת אימון מהירה</h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PRESETS.map((km) => (
          <button
            key={km}
            onClick={() => submit(km)}
            className={`group rounded-2xl bg-gradient-to-br from-brand-400 to-brand-500 p-5 text-white shadow-soft transition active:scale-95 ${
              pulse === km ? "ring-4 ring-brand-200" : ""
            }`}
          >
            <div className="text-3xl font-bold">{km}</div>
            <div className="text-sm opacity-90">ק״מ</div>
          </button>
        ))}
      </div>

      <form
        onSubmit={handleCustom}
        className="flex gap-2 rounded-2xl bg-white p-3 shadow-soft ring-1 ring-stone-100"
      >
        <input
          type="number"
          inputMode="decimal"
          step="0.1"
          min="0"
          placeholder="מרחק מותאם אישית (ק״מ)"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className="flex-1 rounded-xl bg-stone-50 px-4 py-3 text-right text-lg outline-none ring-1 ring-transparent focus:ring-brand-300"
        />
        <button
          type="submit"
          disabled={!custom}
          className="rounded-xl bg-stone-800 px-5 text-white transition disabled:opacity-40"
        >
          הוסף
        </button>
      </form>
    </section>
  );
}
