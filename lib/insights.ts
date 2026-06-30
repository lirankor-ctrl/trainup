import { pickLandmark } from "./landmarks";
import {
  buildCheer,
  claimMilestone,
  comparisonSentence,
  maybeFact,
  milestoneBody,
  milestoneCheer,
  pick,
} from "./messages";
import { formatKm } from "./stats";
import { SPORT_VERB_PAST, type Sport } from "./types";

export type Period = "month" | "year" | "all";

export type InsightKind = "welcome" | "comparison" | "milestone";

export type Insight = {
  kind: InsightKind;
  scope: string; // small label above the card, e.g. "החודש"
  headline: string; // the distance, e.g. "12.4 ק״מ"
  body: string; // the landmark comparison sentence
  cheer: string; // short encouragement
  emoji: string; // emoji for visual flavor
  fact?: string | null; // optional "did you know?" surprise
};

const PERIOD_LABEL: Record<Period, string> = {
  month: "החודש",
  year: "השנה",
  all: "מאז שהתחלת",
};

// Build a Hebrew motivational card for the dashboard.
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
      kind: "welcome",
      scope: "בואו נתחיל",
      headline: "המסע שלך מתחיל כאן",
      body: "הוסף את האימון הראשון שלך, ונראה לך לאן הצעדים שלך כבר היו מגיעים בעולם.",
      cheer: "כל מסע גדול מתחיל בצעד אחד 🌍",
      emoji: "👟",
    };
  }

  // Milestone celebration takes priority over the regular comparison.
  const milestone = claimMilestone(allKm);
  if (milestone) {
    return {
      kind: "milestone",
      scope: "ציון דרך 🎉",
      headline: `${milestone} ק״מ`,
      body: milestoneBody(milestone),
      cheer: milestoneCheer(rand),
      emoji: "🏆",
    };
  }

  // Choose a period to talk about — rotate among those with distance.
  const options = (
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
      kind: "comparison",
      scope: PERIOD_LABEL[choice.period],
      headline: `${formatKm(km)} ק״מ`,
      body: "ממשיכים לצבור מרחק — בקרוב תופיע השוואה לציון דרך מפורסם בעולם.",
      cheer: buildCheer(rand),
      emoji: "🌍",
    };
  }

  return {
    kind: "comparison",
    scope: PERIOD_LABEL[choice.period],
    headline: `${formatKm(km)} ק״מ`,
    body: comparisonSentence(verb, km, landmark, rand),
    cheer: buildCheer(rand),
    emoji: landmark.emoji,
    fact: maybeFact(rand),
  };
}

// Friendly time-of-day greeting for the home header.
export function greeting(hour: number): string {
  if (hour < 5) return "לילה טוב";
  if (hour < 12) return "בוקר טוב";
  if (hour < 17) return "צהריים טובים";
  if (hour < 21) return "ערב טוב";
  return "לילה טוב";
}
