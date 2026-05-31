import { pickLandmark, type Landmark } from "./landmarks";
import { SPORT_VERB_PAST, type Sport } from "./types";

export type Period = "month" | "year" | "all";

export type Insight = {
  scope: string; // small label above the card, e.g. "החודש"
  headline: string; // the distance, e.g. "12.4 ק״מ"
  body: string; // the landmark comparison sentence
  cheer: string; // short encouragement
  emoji: string; // landmark emoji for visual flavor
};

const PERIOD_LABEL: Record<Period, string> = {
  month: "החודש",
  year: "השנה",
  all: "מאז שהתחלת",
};

const CHEERS = [
  "כל הכבוד — צעד אחרי צעד מגיעים רחוק 💪",
  "אלוף/ה! הגוף שלך מודה לך על כל ק״מ 🙌",
  "ממשיכים בקצב הזה — אתה בדרך הנכונה ✨",
  "כל ק״מ נחשב, וזה כבר הישג יפה 🎉",
  "הצעדים שלך הפכו למסע קטן בעולם 🌍",
  "יש לך מומנטום — אל תעצור עכשיו 🔥",
];

function pick<T>(arr: T[], rand: number): T {
  return arr[Math.floor(rand * arr.length) % arr.length];
}

// Build a Hebrew motivational comparison for the dashboard's main card.
// `rand` is injected so callers can reseed on every app open for variety.
export function buildInsight(opts: {
  sport: Sport;
  monthKm: number;
  yearKm: number;
  allKm: number;
  rand?: number;
}): Insight {
  const { sport, monthKm, yearKm, allKm } = opts;
  const rand = opts.rand ?? Math.random();
  const verb = SPORT_VERB_PAST[sport];

  // Nothing logged yet — warm welcome instead of a comparison.
  if (allKm <= 0) {
    return {
      scope: "בואו נתחיל",
      headline: "המסע שלך מתחיל כאן",
      body: "הוסף את האימון הראשון שלך, ונראה לך לאן הצעדים שלך כבר היו מגיעים בעולם.",
      cheer: "כל מסע גדול מתחיל בצעד אחד 🌍",
      emoji: "👟",
    };
  }

  // Choose a period to talk about — rotate among the ones that have distance,
  // so the card feels fresh on every open.
  const options: { period: Period; km: number }[] = (
    [
      { period: "month", km: monthKm },
      { period: "year", km: yearKm },
      { period: "all", km: allKm },
    ] as { period: Period; km: number }[]
  ).filter((o) => o.km > 0);

  const choice = pick(options, rand);
  const km = choice.km;
  const landmark = pickLandmark(km, rand);

  if (!landmark) {
    return {
      scope: PERIOD_LABEL[choice.period],
      headline: `${formatKm(km)} ק״מ`,
      body: "ממשיכים לצבור מרחק — בקרוב תופיע השוואה לציון דרך מפורסם בעולם.",
      cheer: pick(CHEERS, rand),
      emoji: "🌍",
    };
  }

  return {
    scope: PERIOD_LABEL[choice.period],
    headline: `${formatKm(km)} ק״מ`,
    body: comparisonSentence(verb, km, landmark, rand),
    cheer: pick(CHEERS, rand * 7 + 0.13),
    emoji: landmark.emoji,
  };
}

function comparisonSentence(verb: string, km: number, landmark: Landmark, rand: number): string {
  const ratio = km / landmark.km;
  const phrase = landmark.phrase;

  // Roughly equal — the most inspiring case.
  if (ratio >= 0.9 && ratio <= 1.15) {
    return pick(
      [
        `כבר צברת מרחק שמרגיש בדיוק כמו ${phrase}.`,
        `המרחק שעברת שווה ערך ל${phrase} — ממש מסע אמיתי.`,
        `${verb} מרחק שמזכיר ${phrase}. תרגיש/י את זה!`,
      ],
      rand,
    );
  }

  // Comfortably more than the landmark.
  if (ratio > 1.15) {
    if (ratio >= 1.9) {
      const times = ratio >= 2.6 ? Math.round(ratio) : ratio.toFixed(1);
      return `${verb} מספיק בשביל ${times} פעמים את המסלול של ${phrase}! 🏆`;
    }
    const extra = formatKm(km - landmark.km);
    return `עברת מרחק כמו ${phrase}, ועוד ${extra} ק״מ בונוס מעל.`;
  }

  // A bit less — frame it as encouraging progress.
  const pct = Math.max(5, Math.round(ratio * 100));
  return pick(
    [
      `כבר עברת ${pct}% מהמרחק של ${phrase} — ממשיכים!`,
      `אתה כבר ${pct}% מהדרך של ${phrase}. עוד קצת ותסגור/י את זה.`,
    ],
    rand,
  );
}

// Friendly time-of-day greeting for the home header.
export function greeting(hour: number): string {
  if (hour < 5) return "לילה טוב";
  if (hour < 12) return "בוקר טוב";
  if (hour < 17) return "צהריים טובים";
  if (hour < 21) return "ערב טוב";
  return "לילה טוב";
}

function formatKm(n: number): string {
  if (n >= 100) return n.toFixed(0);
  if (n >= 10) return n.toFixed(1);
  return n.toFixed(2);
}
