export type Landmark = {
  km: number;
  // Short Hebrew phrase that fits after a verb, e.g. "ממגדל אייפל עד הלובר".
  phrase: string;
};

// Curated list of real-world distances, sorted ascending by km.
// Sources are approximations — good enough for motivational comparisons.
export const LANDMARKS: Landmark[] = [
  { km: 1.0, phrase: "לאורך טיילת תל אביב מקטע קצר" },
  { km: 2.4, phrase: "סביב חומות העיר העתיקה בירושלים" },
  { km: 4.0, phrase: "ממגדל אייפל עד מוזיאון הלובר" },
  { km: 4.0, phrase: "לאורך פארק סנטרל בניו יורק" },
  { km: 2.7, phrase: "על גשר שער הזהב בסן פרנסיסקו, הלוך וחזור" },
  { km: 5.0, phrase: "סביב הפירמידות בגיזה" },
  { km: 6.0, phrase: "לאורך טיילת תל אביב מקצה לקצה" },
  { km: 13.4, phrase: "לאורך מנהטן מקצה לקצה" },
  { km: 21.0975, phrase: "של חצי מרתון מלא" },
  { km: 42.195, phrase: "של מרתון מלא" },
  { km: 55.0, phrase: "סביב הכינרת" },
  { km: 67.0, phrase: "לאורך חוף ים המלח" },
  { km: 100.0, phrase: "מתל אביב עד חיפה" },
  { km: 220.0, phrase: "מתל אביב עד אילת" },
  { km: 470.0, phrase: "לאורך שביל ישראל בקטע צפון" },
  { km: 1000.0, phrase: "לאורך שביל ישראל המלא" },
];

// Pick the landmark whose distance is closest to `km` (in absolute terms).
export function closestLandmark(km: number): Landmark | null {
  if (!Number.isFinite(km) || km <= 0) return null;
  let best: Landmark | null = null;
  let bestDelta = Infinity;
  for (const l of LANDMARKS) {
    const delta = Math.abs(l.km - km);
    if (delta < bestDelta) {
      bestDelta = delta;
      best = l;
    }
  }
  return best;
}
