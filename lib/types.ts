export type Sport = "walking" | "running";

export type Workout = {
  id: string;
  date: string; // ISO YYYY-MM-DD
  sport: Sport;
  distanceKm: number;
};

export type Settings = {
  sport: Sport | null;
};

export const SPORT_LABEL: Record<Sport, string> = {
  walking: "הליכה",
  running: "ריצה",
};

export const SPORT_VERB_PAST: Record<Sport, string> = {
  walking: "הלכת",
  running: "רצת",
};
