export type LandmarkCategory =
  | "city"
  | "park"
  | "promenade"
  | "bridge"
  | "island"
  | "trail"
  | "unesco"
  | "street"
  | "coastline"
  | "mountain"
  | "route";

export type Continent = "israel" | "europe" | "asia" | "africa" | "americas" | "oceania" | "mideast";

export type Landmark = {
  id: string;
  km: number;
  // Visual Hebrew phrase that fits naturally after "כמו" / "מרחק של",
  // e.g. "טיול ממוזיאון הלובר עד מגדל אייפל בפריז".
  phrase: string;
  emoji: string;
  category: LandmarkCategory;
  continent: Continent;
};

// Curated list of real-world routes & landmarks, sorted ascending by km.
// Distances are friendly approximations — perfect for motivational comparisons.
// Spans ~1 km up to several thousand km so there is always a fresh comparison,
// no matter how much distance the user has accumulated.
// NOTE: intentionally no marathon / half-marathon comparisons.
export const LANDMARKS: Landmark[] = [
  // --- Short strolls (1–5 km): streets, bridges, promenades, small loops ---
  { id: "tlv-promenade-short", km: 1.2, phrase: "הליכה קצרה לאורך טיילת תל אביב", emoji: "🏖️", category: "promenade", continent: "israel" },
  { id: "las-ramblas", km: 1.2, phrase: "טיול לאורך לאס ראמבלאס בברצלונה", emoji: "🌳", category: "street", continent: "europe" },
  { id: "charles-bridge", km: 1.4, phrase: "מעבר על גשר קארל אל העיר העתיקה בפראג", emoji: "🌉", category: "bridge", continent: "europe" },
  { id: "sydney-harbour-bridge", km: 1.5, phrase: "חציית גשר הנמל של סידני", emoji: "🌉", category: "bridge", continent: "oceania" },
  { id: "dubai-fountain", km: 1.5, phrase: "הליכה מהבורג' חליפה אל מזרקות דובאי", emoji: "⛲", category: "promenade", continent: "mideast" },
  { id: "abbey-road", km: 1.8, phrase: "סיבוב בשכונת אבי רוד המפורסמת בלונדון", emoji: "🎸", category: "street", continent: "europe" },
  { id: "champs-elysees", km: 1.9, phrase: "צעידה לאורך השאנז אליזה בפריז", emoji: "🇫🇷", category: "street", continent: "europe" },
  { id: "brooklyn-bridge", km: 2.0, phrase: "הליכה על גשר ברוקלין בניו יורק", emoji: "🌉", category: "bridge", continent: "americas" },
  { id: "philosophers-path", km: 2.0, phrase: "שביל הפילוסוף בקיוטו", emoji: "🌸", category: "trail", continent: "asia" },
  { id: "tower-bigben", km: 2.3, phrase: "הליכה מטאואר ברידג' עד הביג בן בלונדון", emoji: "🕰️", category: "route", continent: "europe" },
  { id: "venice-canals", km: 2.5, phrase: "מסלול בין תעלות המים של ונציה", emoji: "🛶", category: "city", continent: "europe" },
  { id: "central-park-reservoir", km: 2.5, phrase: "הקפת מאגר המים בסנטרל פארק, ניו יורק", emoji: "🏞️", category: "park", continent: "americas" },
  { id: "golden-gate", km: 2.7, phrase: "חציית גשר שער הזהב בסן פרנסיסקו", emoji: "🌉", category: "bridge", continent: "americas" },
  { id: "colosseum-area", km: 2.8, phrase: "סיבוב באזור הקולוסיאום ברומא", emoji: "🏛️", category: "unesco", continent: "europe" },
  { id: "louvre-arc", km: 3.0, phrase: "טיול מהלובר עד שער הניצחון בפריז", emoji: "🇫🇷", category: "route", continent: "europe" },
  { id: "marina-bay", km: 3.5, phrase: "הקפת מפרץ מרינה ביי בסינגפור", emoji: "🌃", category: "promenade", continent: "asia" },
  { id: "vatican-colosseum", km: 3.5, phrase: "הליכה מהוותיקן עד הקולוסיאום ברומא", emoji: "🏛️", category: "route", continent: "europe" },
  { id: "sagrada-guell", km: 4.0, phrase: "מהסגרדה פמיליה עד פארק גואל בברצלונה", emoji: "⛪", category: "route", continent: "europe" },
  { id: "central-park-length", km: 4.0, phrase: "אורך סנטרל פארק מקצה לקצה, ניו יורק", emoji: "🏞️", category: "park", continent: "americas" },
  { id: "copacabana", km: 4.0, phrase: "טיילת חוף קופקבנה בריו דה ז'ניירו", emoji: "🏖️", category: "promenade", continent: "americas" },
  { id: "jerusalem-walls", km: 4.0, phrase: "הקפת חומות העיר העתיקה בירושלים", emoji: "🕌", category: "route", continent: "israel" },
  { id: "notre-dame-eiffel", km: 4.2, phrase: "טיול מנוטרדאם עד מגדל אייפל בפריז", emoji: "🗼", category: "route", continent: "europe" },
  { id: "amsterdam-canals", km: 4.5, phrase: "סיבוב בין תעלות אמסטרדם", emoji: "🚲", category: "city", continent: "europe" },
  { id: "hyde-park-loop", km: 4.5, phrase: "הקפת הייד פארק בלונדון", emoji: "🦢", category: "park", continent: "europe" },
  { id: "louvre-eiffel", km: 4.8, phrase: "טיול ממוזיאון הלובר עד מגדל אייפל בפריז", emoji: "🗼", category: "route", continent: "europe" },

  // --- Half-day walks (5–15 km) ---
  { id: "giza-pyramids", km: 5.0, phrase: "סיבוב סביב הפירמידות בגיזה", emoji: "🐫", category: "unesco", continent: "africa" },
  { id: "table-mountain", km: 5.5, phrase: "מסלול ההליכה אל הר השולחן בקייפטאון", emoji: "⛰️", category: "mountain", continent: "africa" },
  { id: "bondi-coogee", km: 6.0, phrase: "מסלול החוף מבונדי לקוג'י בסידני", emoji: "🌊", category: "coastline", continent: "oceania" },
  { id: "tlv-promenade-full", km: 6.5, phrase: "טיילת תל אביב מקצה לקצה", emoji: "🏖️", category: "promenade", continent: "israel" },
  { id: "mount-fuji-lower", km: 7.0, phrase: "מקטע השביל התחתון של הר פוג'י", emoji: "🗻", category: "mountain", continent: "asia" },
  { id: "petra", km: 8.0, phrase: "מסלול המבקרים בפטרה שבירדן", emoji: "🏜️", category: "unesco", continent: "mideast" },
  { id: "santorini-fira-oia", km: 9.0, phrase: "השביל בין פירא לאויה בסנטוריני", emoji: "🇬🇷", category: "trail", continent: "europe" },
  { id: "great-wall-section", km: 10.0, phrase: "מקטע הליכה על החומה הגדולה של סין", emoji: "🧱", category: "unesco", continent: "asia" },
  { id: "cinque-terre", km: 12.0, phrase: "שביל הכחול של צ'ינקווה טרה באיטליה", emoji: "🍋", category: "trail", continent: "europe" },
  { id: "manhattan-length", km: 13.4, phrase: "אורך כל אי מנהטן בניו יורק", emoji: "🏙️", category: "island", continent: "americas" },
  { id: "inca-trail-section", km: 14.0, phrase: "מקטע משביל האינקה אל מאצ'ו פיצ'ו בפרו", emoji: "🏔️", category: "trail", continent: "americas" },

  // --- Full-day hikes (15–50 km) ---
  { id: "grand-canyon-rim", km: 16.0, phrase: "מקטע משביל שפת הגרנד קניון", emoji: "🏜️", category: "trail", continent: "americas" },
  { id: "cliffs-of-moher", km: 18.0, phrase: "שביל הצוקים של מוהר באירלנד", emoji: "🌅", category: "coastline", continent: "europe" },
  { id: "tongariro-crossing", km: 19.4, phrase: "מעבר טונגרירו האלפיני בניו זילנד", emoji: "🌋", category: "mountain", continent: "oceania" },
  { id: "west-highland-section", km: 22.0, phrase: "מקטע מדרך הרמה המערבית בסקוטלנד", emoji: "🏴", category: "trail", continent: "europe" },
  { id: "golan-trail-section", km: 24.0, phrase: "מקטע משביל הגולן", emoji: "🌄", category: "trail", continent: "israel" },
  { id: "sea-of-galilee-section", km: 25.0, phrase: "מקטע יפה לאורך חופי הכינרת", emoji: "💧", category: "coastline", continent: "israel" },
  { id: "dead-sea-section", km: 30.0, phrase: "מקטע נופי לאורך חוף ים המלח", emoji: "🧂", category: "coastline", continent: "israel" },
  { id: "carmel-ridge", km: 35.0, phrase: "רכס הכרמל לכל אורכו", emoji: "🌲", category: "mountain", continent: "israel" },
  { id: "lake-como-length", km: 45.0, phrase: "אורך אגם קומו שבאיטליה", emoji: "🏞️", category: "coastline", continent: "europe" },
  { id: "amalfi-coast", km: 50.0, phrase: "הדרך לאורך חוף אמאלפי באיטליה", emoji: "🍋", category: "coastline", continent: "europe" },

  // --- Multi-day routes (50–200 km) ---
  { id: "manhattan-waterfront", km: 51.0, phrase: "הקפת קו החוף של אי מנהטן", emoji: "🏙️", category: "coastline", continent: "americas" },
  { id: "kineret-full", km: 55.0, phrase: "הקפה מלאה של הכינרת", emoji: "💙", category: "route", continent: "israel" },
  { id: "kumano-kodo", km: 68.0, phrase: "דרך העלייה לרגל קומאנו קודו ביפן", emoji: "⛩️", category: "unesco", continent: "asia" },
  { id: "jeju-olle", km: 80.0, phrase: "מקטע משבילי האולה באי ג'ג'ו בקוריאה", emoji: "🌺", category: "trail", continent: "asia" },
  { id: "loch-ness-loop", km: 90.0, phrase: "הקפת אגם לוך נס בסקוטלנד", emoji: "🏴", category: "coastline", continent: "europe" },
  { id: "camino-final-100", km: 116.0, phrase: "100 הקילומטרים האחרונים של דרך סנטיאגו", emoji: "🐚", category: "route", continent: "europe" },
  { id: "hadrians-wall", km: 117.0, phrase: "שביל חומת אדריאנוס בצפון אנגליה", emoji: "🧱", category: "route", continent: "europe" },
  { id: "wicklow-way", km: 130.0, phrase: "שביל וויקלו ההרי באירלנד", emoji: "☘️", category: "trail", continent: "europe" },
  { id: "west-highland-full", km: 154.0, phrase: "דרך הרמה המערבית המלאה בסקוטלנד", emoji: "🏴", category: "trail", continent: "europe" },
  { id: "lake-geneva-loop", km: 167.0, phrase: "הקפת אגם ז'נבה בשווייץ", emoji: "🏔️", category: "coastline", continent: "europe" },
  { id: "tour-mont-blanc", km: 170.0, phrase: "מסלול סובב הר מון בלאן באלפים", emoji: "🏔️", category: "mountain", continent: "europe" },
  { id: "gr20-corsica", km: 180.0, phrase: "שביל ה-GR20 החוצה את קורסיקה", emoji: "🥾", category: "mountain", continent: "europe" },

  // --- Long journeys (200–500 km) ---
  { id: "great-ocean-road", km: 240.0, phrase: "כביש האוקיינוס הגדול באוסטרליה", emoji: "🚙", category: "route", continent: "oceania" },
  { id: "garden-route", km: 300.0, phrase: "מסלול הגן לאורך חופי דרום אפריקה", emoji: "🌿", category: "route", continent: "africa" },
  { id: "john-muir-trail", km: 340.0, phrase: "שביל ג'ון מויר בהרי קליפורניה", emoji: "🏔️", category: "mountain", continent: "americas" },
  { id: "norway-trolls", km: 350.0, phrase: "דרך הטרולים בין פיורדים בנורבגיה", emoji: "🏔️", category: "route", continent: "europe" },
  { id: "israel-length", km: 470.0, phrase: "אורך מדינת ישראל, ממטולה ועד אילת", emoji: "🇮🇱", category: "route", continent: "israel" },

  // --- Epic trails (500–1500 km) ---
  { id: "camino-frances", km: 800.0, phrase: "דרך סנטיאגו הצרפתית לכל אורכה בספרד", emoji: "🐚", category: "route", continent: "europe" },
  { id: "israel-trail", km: 1000.0, phrase: "שביל ישראל מדן ועד אילת", emoji: "🇮🇱", category: "trail", continent: "israel" },
  { id: "sw-coast-path", km: 1014.0, phrase: "שביל החוף הדרום-מערבי של אנגליה", emoji: "🌊", category: "coastline", continent: "europe" },
  { id: "danube-cycle", km: 1200.0, phrase: "שביל הדנובה מגרמניה עד הונגריה", emoji: "🚲", category: "route", continent: "europe" },
  { id: "ring-road-iceland", km: 1322.0, phrase: "כביש הטבעת המקיף את איסלנד", emoji: "🌋", category: "route", continent: "europe" },
  { id: "wales-coast-path", km: 1400.0, phrase: "שביל החוף המלא של ויילס", emoji: "🐉", category: "coastline", continent: "europe" },

  // --- Continental-scale dreams (1500+ km) ---
  { id: "danube-length", km: 2850.0, phrase: "לאורך נהר הדנובה החוצה אירופה", emoji: "🌊", category: "route", continent: "europe" },
  { id: "te-araroa", km: 3000.0, phrase: "שביל טה אררואה לכל אורך ניו זילנד", emoji: "🇳🇿", category: "trail", continent: "oceania" },
  { id: "appalachian-trail", km: 3500.0, phrase: "שביל אפלצ'יה במזרח ארצות הברית", emoji: "🌲", category: "trail", continent: "americas" },
  { id: "route-66", km: 3940.0, phrase: "כביש 66 ההיסטורי לכל אורכו בארה״ב", emoji: "🛣️", category: "route", continent: "americas" },
  { id: "pacific-crest", km: 4265.0, phrase: "שביל פסיפיק קרסט ממקסיקו עד קנדה", emoji: "🏔️", category: "trail", continent: "americas" },
  { id: "nile-length", km: 6650.0, phrase: "לאורך נהר הנילוס, הארוך באפריקה", emoji: "🌍", category: "route", continent: "africa" },
  { id: "great-wall-full", km: 8850.0, phrase: "החומה הגדולה של סין במלואה", emoji: "🧱", category: "unesco", continent: "asia" },
];

// ----------------------------------------------------------------------------
// Selection engine — recency-aware, with category/continent rotation.
// ----------------------------------------------------------------------------

const RECENT_KEY = "trainup.recentLandmarks.v2";
const RECENT_CAP = 12; // avoid repeating any landmark within this many picks

// A comparison reads naturally when the user's distance is between half a
// landmark and eight times it: either "about the same", "a bit more" or
// "N times over". This wide band guarantees plenty of candidates at every
// scale, so the engine never gets stuck on a single landmark.
const RATIO_MIN = 0.5;
const RATIO_MAX = 8;

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

// Landmarks whose distance keeps the comparison natural for the given km.
export function candidatesFor(km: number): Landmark[] {
  if (!Number.isFinite(km) || km <= 0) return [];

  const inBand = LANDMARKS.filter((l) => {
    const ratio = km / l.km;
    return ratio >= RATIO_MIN && ratio <= RATIO_MAX;
  });
  if (inBand.length > 0) return inBand;

  // km is tinier than the smallest landmark (or, in theory, huge) — fall back
  // to the few closest landmarks so there's still some rotation.
  return [...LANDMARKS].sort((a, b) => Math.abs(a.km - km) - Math.abs(b.km - km)).slice(0, 5);
}

// Pick a landmark for the given distance: random among suitable candidates,
// skipping recently-shown ones and preferring a different category & continent
// from the last pick, so the experience stays fresh launch after launch.
export function pickLandmark(km: number, rand: number = Math.random()): Landmark | null {
  const candidates = candidatesFor(km);
  if (candidates.length === 0) return null;

  const recent = readRecent();
  let pool = candidates.filter((l) => !recent.includes(l.id));
  if (pool.length === 0) pool = candidates; // everything relevant was shown recently

  // Rotate scenery: avoid the same category & continent as the previous pick.
  const last = LANDMARKS.find((l) => l.id === recent[0]);
  if (last) {
    const rotated = pool.filter((l) => l.category !== last.category && l.continent !== last.continent);
    if (rotated.length > 0) pool = rotated;
  }

  const chosen = pool[Math.floor(rand * pool.length) % pool.length];

  writeRecent([chosen.id, ...recent.filter((id) => id !== chosen.id)].slice(0, RECENT_CAP));
  return chosen;
}
