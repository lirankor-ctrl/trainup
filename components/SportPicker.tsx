"use client";

import Image from "next/image";
import type { Sport } from "@/lib/types";

type Props = {
  onPick: (sport: Sport) => void;
};

export function SportPicker({ onPick }: Props) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="space-y-3">
        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-3xl shadow-glow ring-1 ring-ocean-100">
          <Image src="/logo.jpg" alt="TrainUp" fill sizes="96px" className="object-contain" priority />
        </div>
        <h1 className="text-3xl font-extrabold text-stone-800">ברוכים הבאים ל-TrainUp</h1>
        <p className="text-stone-500">כל צעד שלך הופך למסע בין ציוני דרך בעולם. במה נתחיל?</p>
      </div>

      <div className="grid w-full max-w-sm gap-4">
        <button
          onClick={() => onPick("walking")}
          className="flex items-center justify-between rounded-3xl bg-white p-6 text-right shadow-soft ring-1 ring-stone-100 transition hover:ring-ocean-300 active:scale-[0.98]"
        >
          <span className="text-4xl">🚶</span>
          <div>
            <div className="text-2xl font-bold text-stone-800">הליכה</div>
            <div className="text-sm text-stone-500">קצב נינוח, יומיומי</div>
          </div>
        </button>

        <button
          onClick={() => onPick("running")}
          className="flex items-center justify-between rounded-3xl bg-white p-6 text-right shadow-soft ring-1 ring-stone-100 transition hover:ring-ocean-300 active:scale-[0.98]"
        >
          <span className="text-4xl">🏃</span>
          <div>
            <div className="text-2xl font-bold text-stone-800">ריצה</div>
            <div className="text-sm text-stone-500">קצב מהיר, אתגרי</div>
          </div>
        </button>
      </div>

      <p className="max-w-xs text-xs text-stone-400">אפשר לשנות את הבחירה בכל רגע מהמסך הראשי.</p>
    </div>
  );
}
