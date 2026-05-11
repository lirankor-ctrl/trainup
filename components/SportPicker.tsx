"use client";

import type { Sport } from "@/lib/types";

type Props = {
  onPick: (sport: Sport) => void;
};

export function SportPicker({ onPick }: Props) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="space-y-2">
        <div className="text-5xl">👟</div>
        <h1 className="text-3xl font-bold text-stone-800">ברוכים הבאים</h1>
        <p className="text-stone-500">איזה ספורט אתם רוצים לעקוב אחריו?</p>
      </div>

      <div className="grid w-full max-w-sm gap-4">
        <button
          onClick={() => onPick("walking")}
          className="flex items-center justify-between rounded-3xl bg-white p-6 text-right shadow-soft ring-1 ring-stone-100 transition hover:ring-brand-300 active:scale-[0.98]"
        >
          <span className="text-4xl">🚶</span>
          <div>
            <div className="text-2xl font-bold text-stone-800">הליכה</div>
            <div className="text-sm text-stone-500">קצב נינוח, יומיומי</div>
          </div>
        </button>

        <button
          onClick={() => onPick("running")}
          className="flex items-center justify-between rounded-3xl bg-white p-6 text-right shadow-soft ring-1 ring-stone-100 transition hover:ring-brand-300 active:scale-[0.98]"
        >
          <span className="text-4xl">🏃</span>
          <div>
            <div className="text-2xl font-bold text-stone-800">ריצה</div>
            <div className="text-sm text-stone-500">קצב מהיר, אתגרי</div>
          </div>
        </button>
      </div>

      <p className="max-w-xs text-xs text-stone-400">
        תוכלו לשנות את הבחירה בכל זמן מהמסך הראשי.
      </p>
    </div>
  );
}
