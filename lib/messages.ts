import type { Landmark } from "./landmarks";
import { formatKm } from "./stats";

// Deterministic pick from an array using an injected 0..1 random value.
export function pick<T>(arr: T[], rand: number): T {
  return arr[Math.floor(rand * arr.length) % arr.length];
}

// Spread a single rand seed into several uncorrelated 0..1 values, so one call
// can drive multiple independent choices without them lining up.
function spread(rand: number, salt: number): number {
  const x = Math.sin(rand * 9973 + salt * 131.7) * 10000;
  return x - Math.floor(x);
}

// ----------------------------------------------------------------------------
// Encouragement — built by combining an opener with a booster so the full
// sentence feels different almost every time.
// ----------------------------------------------------------------------------

const CHEER_OPENERS = [
  "היום התקדמת עוד צעד במסע שלך.",
  "עוד אימון מצוין נוסף לדרך.",
  "כל קילומטר מצטבר להישג גדול.",
  "אתה בונה התמדה מעוררת השראה.",
  "מרשים לראות את ההתקדמות שלך.",
  "הדרך הארוכה מתחילה בעוד צעד אחד.",
  "כל יציאה לאימון היא ניצחון קטן.",
  "הצעדים של היום הם ההישגים של מחר.",
];

const CHEER_BOOSTERS = [
  "תמשיך כך 💪",
  "שמור על הקצב 🔥",
  "הגוף שלך מודה לך 🙌",
  "כל הכבוד! 🎉",
  "אתה בדרך הנכונה ✨",
  "אל תעצור עכשיו 🚀",
  "מגיע לך 👏",
  "יאללה, ממשיכים 🌟",
];

export function buildCheer(rand: number): string {
  const opener = pick(CHEER_OPENERS, spread(rand, 1));
  const booster = pick(CHEER_BOOSTERS, spread(rand, 2));
  return `${opener} ${booster}`;
}

// ----------------------------------------------------------------------------
// Comparison wording — many sentence styles for "you've covered X like Y".
// ----------------------------------------------------------------------------

export function comparisonSentence(verb: string, km: number, landmark: Landmark, rand: number): string {
  const ratio = km / landmark.km;
  const phrase = landmark.phrase;

  // Roughly equal — the most inspiring case.
  if (ratio >= 0.85 && ratio <= 1.2) {
    return pick(
      [
        `כבר עברת מרחק שמזכיר ${phrase}.`,
        `הצעדים שלך כבר שווים למסלול של ${phrase}.`,
        `המרחק שצברת יכול לקחת אותך לאורך ${phrase}.`,
        `אם היית מטייל בעולם, כבר היית משלים ${phrase}.`,
        `זה כמעט בדיוק כמו ${phrase}.`,
        `${verb} מרחק ששווה ל${phrase} — מסע אמיתי!`,
      ],
      spread(rand, 3),
    );
  }

  // Comfortably more — express it as multiples for a sense of magnitude.
  if (ratio >= 1.9) {
    const times = ratio >= 2.6 ? Math.round(ratio) : ratio.toFixed(1);
    return pick(
      [
        `המרחק שצברת יכול לקחת אותך פי ${times} לאורך ${phrase}! 🏆`,
        `${verb} מספיק בשביל ${times} פעמים את המסלול של ${phrase}!`,
        `הצעדים שלך כבר שווים ל-${times} מסעות של ${phrase}.`,
      ],
      spread(rand, 4),
    );
  }

  // A bit more than the landmark.
  if (ratio > 1.2) {
    const extra = formatKm(km - landmark.km);
    return pick(
      [
        `עברת מרחק כמו ${phrase}, ועוד ${extra} ק״מ בונוס מעבר לזה.`,
        `כבר השלמת את ${phrase} ואפילו המשכת ${extra} ק״מ הלאה.`,
        `${verb} את כל ${phrase} — ועוד קצת.`,
      ],
      spread(rand, 5),
    );
  }

  // A bit less — frame it as encouraging progress.
  const pct = Math.max(5, Math.round(ratio * 100));
  return pick(
    [
      `כבר עברת ${pct}% מהמרחק של ${phrase} — ממשיכים!`,
      `אתה כבר ${pct}% מהדרך אל ${phrase}. עוד קצת ותסגור/י את זה.`,
      `${pct}% מ${phrase} כבר מאחוריך. הקצב מעולה!`,
    ],
    spread(rand, 6),
  );
}

// ----------------------------------------------------------------------------
// "Did you know?" — short facts shown only occasionally (not every launch).
// ----------------------------------------------------------------------------

const FACTS = [
  "הליכה של 30 דקות ביום יכולה לשפר את מצב הרוח ואת איכות השינה.",
  "גם הליכה קלה אחרי הארוחה מסייעת לאיזון רמות הסוכר בדם.",
  "ריצה קבועה מחזקת את הלב ומורידה את הדופק במנוחה.",
  "כ-10,000 צעדים ביום הם בערך 7 קילומטרים של תנועה.",
  "החומה הגדולה של סין נמתחת על פני אלפי קילומטרים — ארוכה מכל שביל בעולם.",
  "שביל ישראל משתרע על כ-1,000 ק״מ, מדן ועד אילת.",
  "כל קילומטר בהליכה שורף בממוצע כ-50 קלוריות.",
  "תנועה סדירה משחררת אנדורפינים — ההורמונים שמשפרים את ההרגשה.",
  "שתייה של מים לפני ואחרי האימון משפרת ביצועים והתאוששות.",
  "אפילו 10 דקות תנועה ביום עדיפות בהרבה על ישיבה ממושכת.",
  "חמש דקות חימום לפני האימון מפחיתות משמעותית את הסיכון לפציעה.",
  "מתיחות קלות אחרי האימון עוזרות לשרירים להתאושש מהר יותר.",
];

const FACT_CHANCE = 0.33; // roughly one in three launches

// Returns a fact occasionally, otherwise null (so the surprise stays special).
export function maybeFact(rand: number): string | null {
  if (spread(rand, 7) > FACT_CHANCE) return null;
  return pick(FACTS, spread(rand, 8));
}

// ----------------------------------------------------------------------------
// Milestones — one-time celebrations remembered in localStorage.
// ----------------------------------------------------------------------------

export const MILESTONES = [10, 25, 50, 75, 100, 250, 500, 750, 1000];

const MILESTONE_KEY = "trainup.milestones.v1";

const MILESTONE_BODY: Record<number, string> = {
  10: "10 הקילומטרים הראשונים כבר מאחוריך — ההתחלה המושלמת!",
  25: "25 ק״מ של התמדה! אתה כבר לא מתחיל, אתה ספורטאי.",
  50: "חצי-מאה קילומטרים! ההרגל הפך לחלק ממך.",
  75: "75 ק״מ! אתה כבר בשליש האחרון לקראת ה-100.",
  100: "מאה קילומטרים מלאים! הישג שמעטים מגיעים אליו.",
  250: "250 ק״מ! זה כבר מרחק של מסע אמיתי בין ערים.",
  500: "חצי אלף קילומטרים! אלוף של ממש.",
  750: "750 ק״מ! אתה במרחק נגיעה מהאלף.",
  1000: "1,000 ק״מ! עברת מרחק כמו שביל ישראל כולו. אגדה! 🇮🇱",
};

const MILESTONE_CHEERS = [
  "איזה הישג — תיהנה מהרגע הזה! 🎉",
  "עבודה מדהימה. עכשיו אל היעד הבא! 🚀",
  "ההתמדה שלך משתלמת. כל הכבוד! 🏆",
  "רגע של גאווה — בהחלט הרווחת אותו! ✨",
];

function readCelebrated(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MILESTONE_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

function writeCelebrated(ms: number[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(MILESTONE_KEY, JSON.stringify(ms));
  } catch {
    // ignore storage failures
  }
}

// If the user has reached a milestone that hasn't been celebrated yet, claim
// the largest such one (and mark all reached milestones celebrated so we never
// repeat or build a backlog). Returns the milestone value, or null.
export function claimMilestone(totalKm: number): number | null {
  if (!Number.isFinite(totalKm) || totalKm <= 0) return null;

  const reached = MILESTONES.filter((m) => totalKm >= m);
  if (reached.length === 0) return null;

  const celebrated = readCelebrated();
  const fresh = reached.filter((m) => !celebrated.includes(m));
  if (fresh.length === 0) return null;

  writeCelebrated(reached); // remember every reached milestone at once
  return Math.max(...fresh);
}

export function milestoneCheer(rand: number): string {
  return pick(MILESTONE_CHEERS, spread(rand, 9));
}

export function milestoneBody(milestone: number): string {
  return MILESTONE_BODY[milestone] ?? `חצית את רף ${milestone} הקילומטרים — כל הכבוד!`;
}
