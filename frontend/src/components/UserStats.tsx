"use client";

import { useState, useEffect, useCallback } from "react";
import type { UserRank, RewardsData } from "@/lib/gamification";
import { getUserRank } from "@/lib/gamification";

interface UserStatsProps {
  rewards: RewardsData;
  flyingText: string | null; // "+10" or "+1" — set externally, cleared after animation
  onFlyingDone: () => void;
}

const PALIER_COLORS: Record<number, string> = {
  1: "from-gray-400 to-gray-500",
  2: "from-blue-400 to-blue-500",
  3: "from-green-400 to-emerald-500",
  4: "from-purple-400 to-purple-600",
  5: "from-yellow-400 to-amber-500",
  6: "from-red-400 to-rose-600",
  7: "from-pink-400 to-fuchsia-600",
};

function getPalierColor(palier: number): string {
  return PALIER_COLORS[Math.min(palier, 7)] || PALIER_COLORS[7];
}

export default function UserStats({ rewards, flyingText, onFlyingDone }: UserStatsProps) {
  const rank: UserRank = getUserRank(rewards.points);
  const [showFlying, setShowFlying] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (flyingText) {
      setDisplayText(flyingText);
      setShowFlying(true);
      const timer = setTimeout(() => {
        setShowFlying(false);
        onFlyingDone();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [flyingText, onFlyingDone]);

  const gradient = getPalierColor(rank.palier);

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      {/* Flying badge animation */}
      {showFlying && (
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none
                     text-2xl font-black text-green-500 animate-fly-up z-50"
        >
          {displayText}
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Avatar / Palier badge */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${gradient}
                      flex items-center justify-center text-white font-bold text-lg shadow-md`}
        >
          {rank.palier}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 text-sm truncate">
              {rank.title}
            </span>
            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full font-medium">
              Palier {rank.palier}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            Niveau {rank.level} &middot; {rewards.points} pts
          </div>

          {/* Progress bar */}
          <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700 ease-out`}
              style={{ width: `${Math.max(2, rank.progress * 100)}%` }}
            />
          </div>
          <div className="text-[10px] text-gray-400 mt-0.5">
            Prochain palier : niveau {rank.nextThreshold}
          </div>
        </div>

        {/* Points badge */}
        <div className="flex-shrink-0 text-center">
          <div className={`text-xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {rewards.points}
          </div>
          <div className="text-[9px] text-gray-400 uppercase tracking-wide font-medium">
            Points
          </div>
        </div>
      </div>

      {/* Weekly stats */}
      {rewards.weeklyPoints > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
          <span>Cette semaine : +{rewards.weeklyPoints} pts</span>
          {rewards.city && <span>{rewards.city}</span>}
        </div>
      )}
    </div>
  );
}
