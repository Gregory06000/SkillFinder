// ──────────────────────────────────────────────
// SkillFinder Badges — Achievement System
// ──────────────────────────────────────────────

import { getUserRank } from "@/lib/gamification";

export interface Badge {
  id: string;
  titleKey: string;
  descKey: string;
  emoji: string;
  unlocked: boolean;
}

interface BadgeContext {
  points: number;
  votedCount: number;
}

interface BadgeDef {
  id: string;
  titleKey: string;
  descKey: string;
  emoji: string;
  check: (ctx: BadgeContext) => boolean;
}

const BADGE_DEFS: BadgeDef[] = [
  {
    id: "first_vote",
    titleKey: "badge.firstVote",
    descKey: "badge.firstVoteDesc",
    emoji: "🗳️",
    check: (ctx) => ctx.points >= 10,
  },
  {
    id: "explorer",
    titleKey: "badge.explorer",
    descKey: "badge.explorerDesc",
    emoji: "🔍",
    check: (ctx) => ctx.points >= 50,
  },
  {
    id: "scout",
    titleKey: "badge.scout",
    descKey: "badge.scoutDesc",
    emoji: "🏅",
    check: (ctx) => ctx.votedCount >= 10,
  },
  {
    id: "certified",
    titleKey: "badge.certified",
    descKey: "badge.certifiedDesc",
    emoji: "📜",
    check: (ctx) => getUserRank(ctx.points).palier >= 3,
  },
  {
    id: "expert",
    titleKey: "badge.expert",
    descKey: "badge.expertDesc",
    emoji: "⭐",
    check: (ctx) => getUserRank(ctx.points).palier >= 5,
  },
  {
    id: "marathon",
    titleKey: "badge.marathon",
    descKey: "badge.marathonDesc",
    emoji: "🏃",
    check: (ctx) => ctx.votedCount >= 50,
  },
  {
    id: "veteran",
    titleKey: "badge.veteran",
    descKey: "badge.veteranDesc",
    emoji: "🛡️",
    check: (ctx) => getUserRank(ctx.points).palier >= 7,
  },
  {
    id: "master",
    titleKey: "badge.master",
    descKey: "badge.masterDesc",
    emoji: "👑",
    check: (ctx) => getUserRank(ctx.points).palier >= 9,
  },
  {
    id: "deity",
    titleKey: "badge.deity",
    descKey: "badge.deityDesc",
    emoji: "🔱",
    check: (ctx) => ctx.points >= 1000,
  },
];

const VOTED_KEY = "sf_voted_places";

function getVotedCount(): number {
  try {
    const raw = localStorage.getItem(VOTED_KEY);
    if (!raw) return 0;
    return (JSON.parse(raw) as string[]).length;
  } catch {
    return 0;
  }
}

export function computeBadges(points: number): Badge[] {
  const ctx: BadgeContext = {
    points,
    votedCount: typeof window !== "undefined" ? getVotedCount() : 0,
  };

  return BADGE_DEFS.map((def) => ({
    id: def.id,
    titleKey: def.titleKey,
    descKey: def.descKey,
    emoji: def.emoji,
    unlocked: def.check(ctx),
  }));
}

export function getUnlockedBadges(points: number): Badge[] {
  return computeBadges(points).filter((b) => b.unlocked);
}
