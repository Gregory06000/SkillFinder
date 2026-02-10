// ──────────────────────────────────────────────
// SkillFinder Rewards — Gamification Engine
// ──────────────────────────────────────────────

const STORAGE_KEY = "sf_rewards";
const VOTED_KEY = "sf_voted_places";

// ── Point Logic ──────────────────────────────

const HARD_CAP = 1000;

export function getIncrement(currentPoints: number): number {
  if (currentPoints >= HARD_CAP) return 0;
  return currentPoints < 100 ? 10 : 1;
}

export function addPoints(currentPoints: number): number {
  const inc = getIncrement(currentPoints);
  return Math.min(currentPoints + inc, HARD_CAP);
}

// ── Level & Tier System ──────────────────────

export interface Tier {
  palier: number;
  title: string;
  minLevel: number;
  maxLevel: number;
}

const TIERS: Tier[] = [
  { palier: 1, title: "Apprenti Dénicheur", minLevel: 1, maxLevel: 20 },
  { palier: 2, title: "Éclaireur Urbain", minLevel: 21, maxLevel: 40 },
  { palier: 3, title: "Guide Certifié", minLevel: 41, maxLevel: 60 },
  { palier: 4, title: "Expert Local", minLevel: 61, maxLevel: 80 },
  { palier: 5, title: "Maître de la Ville", minLevel: 81, maxLevel: 100 },
  { palier: 6, title: "Légende Vivante", minLevel: 101, maxLevel: 200 },
];

/**
 * Convert points → level.
 * 0-100 pts  → levels 1-100  (each +10 pts = ~10 levels, each +1 pt = 1 level)
 * 100+ pts   → levels 100+   (1:1 mapping)
 */
export function getLevel(points: number): number {
  if (points <= 0) return 1;
  // Under 100: each 10-pt increment = 10 levels → 1 pt ≈ 1 level
  if (points <= 100) return Math.max(1, points);
  // Above 100: direct mapping
  return points;
}

export interface UserRank {
  title: string;
  palier: number;
  level: number;
  points: number;
  nextThreshold: number;
  progress: number; // 0-1 within current tier
}

export function getUserRank(points: number): UserRank {
  const level = getLevel(points);

  // Find current tier
  let tier = TIERS[TIERS.length - 1];
  for (const t of TIERS) {
    if (level >= t.minLevel && level <= t.maxLevel) {
      tier = t;
      break;
    }
  }

  // Palier 7+: "Gardien du Temple" for every 100 pts beyond level 200
  if (level > 200) {
    const extraPaliers = Math.floor((level - 201) / 100);
    const palier = 7 + extraPaliers;
    const base = 200 + extraPaliers * 100;
    const nextThreshold = base + 100;
    return {
      title: "Gardien du Temple",
      palier,
      level,
      points,
      nextThreshold,
      progress: (level - base) / 100,
    };
  }

  const rangeSize = tier.maxLevel - tier.minLevel + 1;
  const progress = (level - tier.minLevel) / rangeSize;
  const nextThreshold = tier.maxLevel + 1;

  return {
    title: tier.title,
    palier: tier.palier,
    level,
    points,
    nextThreshold,
    progress: Math.min(1, Math.max(0, progress)),
  };
}

// ── LocalStorage Persistence ─────────────────

export interface RewardsData {
  points: number;
  pseudo: string;
  city: string;
  weekStart: string; // ISO date of current week's Monday
  weeklyPoints: number;
}

function getCurrentWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().split("T")[0];
}

export function loadRewards(): RewardsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data: RewardsData = JSON.parse(raw);
      // Reset weekly points if new week
      const currentWeek = getCurrentWeekStart();
      if (data.weekStart !== currentWeek) {
        data.weeklyPoints = 0;
        data.weekStart = currentWeek;
        saveRewards(data);
      }
      return data;
    }
  } catch {}
  return {
    points: 0,
    pseudo: "Guest",
    city: "",
    weekStart: getCurrentWeekStart(),
    weeklyPoints: 0,
  };
}

export function saveRewards(data: RewardsData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function earnPoints(data: RewardsData): {
  newData: RewardsData;
  increment: number;
  hitMilestone: boolean;
} {
  const increment = getIncrement(data.points);
  const wasBelowMilestone = data.points < 100;
  const newPoints = addPoints(data.points);
  const hitMilestone = wasBelowMilestone && newPoints >= 100;

  const newData: RewardsData = {
    ...data,
    points: newPoints,
    weeklyPoints: data.weeklyPoints + increment,
  };
  saveRewards(newData);

  return { newData, increment, hitMilestone };
}

// ── Voted Places Persistence ─────────────────

export function hasVoted(placeId: string): boolean {
  try {
    const raw = localStorage.getItem(VOTED_KEY);
    if (!raw) return false;
    const set: string[] = JSON.parse(raw);
    return set.includes(placeId);
  } catch {
    return false;
  }
}

export function markVoted(placeId: string): void {
  try {
    const raw = localStorage.getItem(VOTED_KEY);
    const set: string[] = raw ? JSON.parse(raw) : [];
    if (!set.includes(placeId)) {
      set.push(placeId);
      localStorage.setItem(VOTED_KEY, JSON.stringify(set));
    }
  } catch {}
}
