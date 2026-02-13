"use client";

import { useState, useEffect } from "react";
import type { UserRank, RewardsData } from "@/lib/gamification";
import { getUserRank } from "@/lib/gamification";

interface UserStatsProps {
  rewards: RewardsData;
  flyingText: string | null;
  onFlyingDone: () => void;
}

export default function UserStats({
  rewards,
  flyingText,
  onFlyingDone,
}: UserStatsProps) {
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

  return (
    <div className="relative max-w-[900px] mt-7 mb-1">
      {/* Flying badge animation */}
      {showFlying && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-4 pointer-events-none
                     text-2xl font-black text-sf-success animate-fly-up z-50"
        >
          {displayText}
        </div>
      )}

      {/* Top row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-base"
            style={{
              background: "linear-gradient(135deg, #D4A853, #E8C06A)",
              boxShadow: "0 2px 8px rgba(212,168,83,0.3)",
            }}
          >
            &#127942;
          </div>
          <div>
            <div className="text-sm font-semibold text-sf-text">
              {rank.title} &middot; Palier {rank.palier}
            </div>
            <div className="text-xs text-sf-text-light">
              {rank.palier >= 10
                ? "Niveau maximum atteint"
                : `Prochain palier : niveau ${rank.nextThreshold}`}
            </div>
          </div>
        </div>
        <div className="text-[22px] font-bold text-sf-gold tabular-nums">
          {rewards.points}
          <span className="text-xs font-medium text-sf-text-light ml-0.5">
            pts
          </span>
        </div>
      </div>

      {/* Progress track */}
      <div className="h-1.5 bg-sf-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${Math.max(2, rank.progress * 100)}%`,
            background: "linear-gradient(90deg, #D4A853, #E8805F)",
          }}
        />
      </div>

      {/* Bottom row */}
      <div className="flex justify-between mt-1.5 text-[11px] text-sf-text-light">
        <span>Niveau {rank.level}</span>
        <span>+ {rewards.weeklyPoints} pts cette semaine</span>
      </div>
    </div>
  );
}
