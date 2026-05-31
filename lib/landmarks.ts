export type Landmark = {
  id: string;
  km: number;
  // Visual Hebrew phrase that fits after "מרחק של" / "כמו",
  // e.g. "טיול ממוזיאון הלובר עד מגדל אייפל בפריז".
  phrase: string;
  emoji: string;
};

// Curated list of real-world routes & landmarks, sorted ascending by km.
// Distances are friendly approximations — perfect for motivational comparisons.
// NOTE: intentionally no marathon / half-marathon comparisons.
export const LANDMARKS: Landmark[] = [
  { id: "tlv-promenade-short", km: 1.2, phrase: "הליכה קצרה לאורך טיילת תל אביב", emoji: "🏖️" },
  { id: "charles-bridge", km: 1.5, phrase: "מעבר על גשר קארל אל העיר העתיקה בפראג", emoji: "🌉" },
  { id: "las-ramblas", km: 1.2, phrase: "טיול לאורך לאס ראמבלאס בברצלונה", emoji: "🌳" },
  { id: "philosophers-path", km: 2.0, phrase: "שביל הפילוסוף בקיוטו", emoji: "🌸" },
  { id: "tower-bridge-bigben", km: 2.3, phrase: "הליכה מטאואר ברידג' עד הביג בן בלונדון", emoji: "🕰️" },
  { id: "jerusalem-walls", km: 2.4, phrase: "הקפת חומות העיר העתיקה בירושלים", emoji: "🕌" },
  { id: "venice-canals", km: 2.5, phrase: "מסלול בין תעלות המים של ונציה", emoji: "🛶" },
  { id: "central-park-reservoir", km: 2.5, phrase: "הקפת מאגר המים בסנטרל פארק, ניו יורק", emoji: "🏞️" },
  { id: "golden-gate", km: 2.7, phrase: "חציית גשר שער הזהב בסן פרנסיסקו", emoji: "🌉" },
  { id: "colosseum-area", km: 2.8, phrase: "סיבוב באזור הקולוסיאום ברומא", emoji: "🏛️" },
  { id: "louvre-arc", km: 3.0, phrase: "טיול מהלובר עד שער הניצחון בפריז", emoji: "🇫🇷" },
  { id: "vatican-colosseum", km: 3.5, phrase: "הליכה מהוותיקן עד הקולוסיאום ברומא", emoji: "🏛️" },
  { id: "marina-bay", km: 3.5, phrase: "הקפת מפרץ מרינה ביי בסינגפור", emoji: "🌃" },
  { id: "burj-dubai-mall", km: 1.5, phrase: "מהבורג' חליפה עד מזרקות דובאי מול", emoji: "⛲" },
  { id: "sydney-harbour", km: 1.5, phrase: "חציית גשר הנמל של סידני", emoji: "🌉" },
  { id: "notre-dame-eiffel", km: 4.2, phrase: "טיול מנוטרדאם עד מגדל אייפל בפריז", emoji: "🗼" },
  { id: "copacabana", km: 4.0, phrase: "טיילת חוף קופקבנה בריו דה ז'ניירו", emoji: "🏖️" },
  { id: "amsterdam-canals", km: 4.5, phrase: "סיבוב בין תעלות אמסטרדם", emoji: "🚲" },
  { id: "hyde-park-loop", km: 4.5, phrase: "הקפת הייד פארק בלונדון", emoji: "🦢" },
  { id: "louvre-eiffel", km: 4.8, phrase: "טיול ממוזיאון הלובר עד מגדל אייפל בפריז", emoji: "🗼" },
  { id: "central-park-length", km: 4.0, phrase: "אורך סנטרל פארק מקצה לקצה, ניו יורק", emoji: "🏞️" },
  { id: "sagrada-guell", km: 4.0, phrase: "מהסגרדה פמיליה עד פארק גואל בברצלונה", emoji: "⛪" },
  { id: "table-mountain", km: 5.5, phrase: "מסלול ההליכה אל הר השולחן בקייפטאון", emoji: "⛰️" },
  { id: "giza-pyramids", km: 5.0, phrase: "סיבוב סביב הפירמידות בגיזה", emoji: "🐫" },
  { id: "bondi-coogee", km: 6.0, phrase: "מסלול החוף מבונדי לקוג'י בסידני", emoji: "🌊" },
  { id: "tlv-promenade-full", km: 6.5, phrase: "טיילת תל אביב מקצה לקצה", emoji: "🏖️" },
  { id: "brooklyn-bridge", km: 2.0, phrase: "הליכה על גשר ברוקלין בניו יורק", emoji: "🌉" },
  { id: "petra", km: 8.0, phrase: "מסלול המבקרים בפטרה שבירדן", emoji: "🏜️" },
  { id: "mount-fuji-lower", km: 7.0, phrase: "מקטע השביל התחתון של הר פוג'י", emoji: "🗻" },
  { id: "great-wall-section", km: 10.0, phrase: "מקטע הליכה על החומה הגדולה של סין", emoji: "🧱" },
  { id: "cinque-terre", km: 11.0, phrase: "שביל הכחול של צ'ינקווה טרה באיטליה", emoji: "🍋" },
  { id: "manhattan-length", km: 13.4, phrase: "אורך כל אי מנהטן בניו יורק", emoji: "🏙️" },
  { id: "inca-trail-section", km: 14.0, phrase: "מקטע משביל האינקה אל מאצ'ו פיצ'ו בפרו", emoji: "🏔️" },
  { id: "west-highland-section", km: 20.0, phrase: "מקטע מדרך הרמה המערבית בסקוטלנד", emoji: "🏴" },
  { id: "sea-of-galilee-section", km: 25.0, phrase: "מקטע יפה לאורך חופי הכינרת", emoji: "💧" },
  { id: "dead-sea-section", km: 30.0, phrase: "מקטע נופי לאורך חוף ים המלח", emoji: "🧂" },
  { id: "kineret-full", km: 55.0, phrase: "הקפה מלאה של הכינרת", emoji: "💙" },
];

const RECENT_KEY = "trainup.recentLandmarks.v1";

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeRecent(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(ids));
  } catch {
    // ignore storage failures (private mode etc.)
  }
}

// Landmarks whose distance is "in the same ballpark" as km, so the comparison
// reads naturally (roughly between a quarter and four times the distance).
export function candidatesFor(km: number): Landmark[] {
  if (!Number.isFinite(km) || km <= 0) return [];
  const inBand = LANDMARKS.filter((l) => km >= l.km * 0.5 && km <= l.km * 2.5);
  if (inBand.length > 0) return inBand;
  // Distance is tiny or huge — fall back to the single closest landmark.
  const closest = closestLandmark(km);
  return closest ? [closest] : [];
}

// Pick a landmark for the given distance, randomly among relevant candidates
// while avoiding the recently-shown ones (persisted in localStorage). Recent
// IDs are only forgotten once most of the list has been used.
export function pickLandmark(km: number, rand: number = Math.random()): Landmark | null {
  const candidates = candidatesFor(km);
  if (candidates.length === 0) return null;

  const recent = readRecent();
  let pool = candidates.filter((l) => !recent.includes(l.id));
  if (pool.length === 0) pool = candidates; // everything relevant was shown recently

  const chosen = pool[Math.floor(rand * pool.length) % pool.length];

  // Remember it; keep the recent list below ~70% of the catalog so variety stays high.
  const cap = Math.max(1, Math.floor(LANDMARKS.length * 0.7));
  const next = [chosen.id, ...recent.filter((id) => id !== chosen.id)].slice(0, cap);
  writeRecent(next);

  return chosen;
}

// Pick the landmark whose distance is closest to `km` (absolute difference).
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
