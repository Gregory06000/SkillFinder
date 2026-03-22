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
  // ── 1 pt ──
  {
    id: "newcomer",
    titleKey: "badge.newcomer",
    descKey: "badge.newcomerDesc",
    emoji: "👋",
    check: (ctx) => ctx.points >= 1,
  },
  // ── 5 votes ──
  {
    id: "contributor",
    titleKey: "badge.contributor",
    descKey: "badge.contributorDesc",
    emoji: "✍️",
    check: (ctx) => ctx.votedCount >= 5,
  },
  // ── 10 pts ──
  {
    id: "first_vote",
    titleKey: "badge.firstVote",
    descKey: "badge.firstVoteDesc",
    emoji: "🗳️",
    check: (ctx) => ctx.points >= 10,
  },
  // ── 10 votes ──
  {
    id: "scout",
    titleKey: "badge.scout",
    descKey: "badge.scoutDesc",
    emoji: "🏅",
    check: (ctx) => ctx.votedCount >= 10,
  },
  // ── 50 pts ──
  {
    id: "explorer",
    titleKey: "badge.explorer",
    descKey: "badge.explorerDesc",
    emoji: "🔍",
    check: (ctx) => ctx.points >= 50,
  },
  // ── 100 pts ──
  {
    id: "enthusiast",
    titleKey: "badge.enthusiast",
    descKey: "badge.enthusiastDesc",
    emoji: "🔥",
    check: (ctx) => ctx.points >= 100,
  },
  // ── palier 2 (101 pts) ──
  {
    id: "adventurer",
    titleKey: "badge.adventurer",
    descKey: "badge.adventurerDesc",
    emoji: "🧭",
    check: (ctx) => getUserRank(ctx.points).palier >= 2,
  },
  // ── palier 3 (201 pts) ──
  {
    id: "certified",
    titleKey: "badge.certified",
    descKey: "badge.certifiedDesc",
    emoji: "📜",
    check: (ctx) => getUserRank(ctx.points).palier >= 3,
  },
  // ── 25 votes ──
  {
    id: "globe_trotter",
    titleKey: "badge.globeTrotter",
    descKey: "badge.globeTrotterDesc",
    emoji: "🌍",
    check: (ctx) => ctx.votedCount >= 25,
  },
  // ── 250 pts ──
  {
    id: "champion",
    titleKey: "badge.champion",
    descKey: "badge.championDesc",
    emoji: "🏆",
    check: (ctx) => ctx.points >= 250,
  },
  // ── palier 4 (301 pts) ──
  {
    id: "sage",
    titleKey: "badge.sage",
    descKey: "badge.sageDesc",
    emoji: "📚",
    check: (ctx) => getUserRank(ctx.points).palier >= 4,
  },
  // ── palier 5 (401 pts) ──
  {
    id: "expert",
    titleKey: "badge.expert",
    descKey: "badge.expertDesc",
    emoji: "⭐",
    check: (ctx) => getUserRank(ctx.points).palier >= 5,
  },
  // ── 500 pts ──
  {
    id: "titan",
    titleKey: "badge.titan",
    descKey: "badge.titanDesc",
    emoji: "⚡",
    check: (ctx) => ctx.points >= 500,
  },
  // ── 50 votes ──
  {
    id: "marathon",
    titleKey: "badge.marathon",
    descKey: "badge.marathonDesc",
    emoji: "🏃",
    check: (ctx) => ctx.votedCount >= 50,
  },
  // ── palier 6 (501 pts) ──
  {
    id: "legend",
    titleKey: "badge.legend",
    descKey: "badge.legendDesc",
    emoji: "🌟",
    check: (ctx) => getUserRank(ctx.points).palier >= 6,
  },
  // ── palier 7 (601 pts) ──
  {
    id: "veteran",
    titleKey: "badge.veteran",
    descKey: "badge.veteranDesc",
    emoji: "🛡️",
    check: (ctx) => getUserRank(ctx.points).palier >= 7,
  },
  // ── palier 8 (701 pts) ──
  {
    id: "oracle",
    titleKey: "badge.oracle",
    descKey: "badge.oracleDesc",
    emoji: "🔮",
    check: (ctx) => getUserRank(ctx.points).palier >= 8,
  },
  // ── palier 9 (801 pts) ──
  {
    id: "master",
    titleKey: "badge.master",
    descKey: "badge.masterDesc",
    emoji: "👑",
    check: (ctx) => getUserRank(ctx.points).palier >= 9,
  },
  // ── 100 votes ──
  {
    id: "centurion",
    titleKey: "badge.centurion",
    descKey: "badge.centurionDesc",
    emoji: "💯",
    check: (ctx) => ctx.votedCount >= 100,
  },
  // ── 1000 pts (palier 10) ──
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
