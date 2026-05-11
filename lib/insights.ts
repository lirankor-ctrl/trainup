import { closestLandmark } from "./landmarks";
import { SPORT_VERB_PAST, type Sport } from "./types";

export type Insight = {
  headline: string;
  body: string;
  cheer: string;
};

const CHEERS = [
  "כל הכבוד, המשך כך!",
  "אלוף, צעד אחרי צעד!",
  "ממשיכים, אתה בקצב מעולה!",
  "כל ק״מ נחשב — גאווה אמיתית!",
  "מדהים, הגוף שלך מודה לך!",
];

function pickCheer(seed: number): string {
  const i = Math.abs(Math.floor(seed)) % CHEERS.length;
  return CHEERS[i];
}

// Build a Hebrew motivational sentence comparing distance to a real landmark.
export function buildInsight(opts: {
  sport: Sport;
  monthKm: number;
  yearKm: number;
}): Insight {
  const { sport, monthKm, yearKm } = opts;
  const verb = SPORT_VERB_PAST[sport];

  // No activity yet.
  if (monthKm <= 0 && yearKm <= 0) {
    return {
      headline: "מוכנים להתחיל?",
      body: "הוסיפו את האימון הראשון שלכם וצברו מרחק שיתחיל לספר סיפור.",
      cheer: "צעד ועוד צעד מגיעים רחוק.",
    };
  }

  // Prefer comparing to the larger of month/year so the comparison feels meaningful.
  const usingYear = yearKm >= monthKm * 1.2;
  const km = usingYear ? yearKm : monthKm;
  const scopeLabel = usingYear ? "השנה" : "החודש עד כה";
  const landmark = closestLandmark(km);

  if (!landmark) {
    return {
      headline: `${scopeLabel} צברת ${formatKm(km)} ק״מ`,
      body: "ממשיכים לצבור מרחק — בקרוב תופיע השוואה לציון דרך מפורסם.",
      cheer: pickCheer(km * 10),
    };
  }

  const ratio = km / landmark.km;
  const body = phraseFor(ratio, verb, landmark.phrase, km, landmark.km);

  return {
    headline: `${scopeLabel}: ${formatKm(km)} ק״מ`,
    body,
    cheer: pickCheer(km * 10 + landmark.km),
  };
}

function phraseFor(
  ratio: number,
  verb: string,
  landmarkPhrase: string,
  km: number,
  landmarkKm: number,
): string {
  if (ratio >= 0.95 && ratio <= 1.05) {
    return `${verb} מרחק ${landmarkPhrase}.`;
  }
  if (ratio > 1.05 && ratio < 2) {
    const extra = formatKm(km - landmarkKm);
    return `${verb} מרחק ${landmarkPhrase}, ועוד ${extra} ק״מ בונוס.`;
  }
  if (ratio >= 2) {
    const times = ratio >= 3 ? Math.round(ratio) : ratio.toFixed(1);
    return `${verb} ${times} פעמים את המרחק ${landmarkPhrase}!`;
  }
  // ratio < 0.95 — encourage as a percentage of the landmark.
  const pct = Math.max(1, Math.round(ratio * 100));
  return `${verb} כבר ${pct}% מהמרחק ${landmarkPhrase}.`;
}

function formatKm(n: number): string {
  if (n >= 100) return n.toFixed(0);
  if (n >= 10) return n.toFixed(1);
  return n.toFixed(2);
}
