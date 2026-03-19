"use client";

import { useState, useEffect } from "react";
import { getUserRank } from "@/lib/gamification";
import { useT } from "@/lib/i18n";

interface LeaderboardEntry {
  pseudo: string;
  weeklyPoints: number;
  totalPoints: number;
  city: string;
}

interface LeaderboardWidgetProps {
  city: string;
  userPseudo: string;
  userWeeklyPoints: number;
  userTotalPoints: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function LeaderboardWidget({
  city,
  userPseudo,
  userWeeklyPoints,
  userTotalPoints,
}: LeaderboardWidgetProps) {
  const { t } = useT();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen || !city) return;

    async function fetchLeaderboard() {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/api/leaderboard?city=${encodeURIComponent(city)}`
        );
        if (res.ok) {
          const data = await res.json();
          setEntries(data.entries || []);
        } else {
          setEntries([]);
        }
      } catch {
        setEntries([]);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [isOpen, city]);

  // Merge current user into the displayed list if they're not already there
  const allEntries = [...entries];
  const userInList = allEntries.some(
    (e) => e.pseudo === userPseudo && e.city === city
  );
  if (!userInList && userWeeklyPoints > 0) {
    allEntries.push({
      pseudo: userPseudo,
      weeklyPoints: userWeeklyPoints,
      totalPoints: userTotalPoints,
      city,
    });
  }

  // Sort by weekly points, take top 10
  allEntries.sort((a, b) => b.weeklyPoints - a.weeklyPoints);
  const top10 = allEntries.slice(0, 10);

  const RANK_STYLES: Record<number, string> = {
    0: "bg-gradient-to-r from-yellow-400 to-amber-500 text-white",
    1: "bg-gradient-to-r from-gray-300 to-gray-400 text-white",
    2: "bg-gradient-to-r from-amber-600 to-amber-700 text-white",
  };

  return (
    <div className="bg-sf-card rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Toggle header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-sf-bg transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold text-sm text-gray-900">
            {t("lb.localTitle", { city: city || "Local" })}
          </span>
          <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">
            {t("lb.thisWeek")}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Body */}
      {isOpen && (
        <div className="border-t border-gray-100">
          {loading ? (
            <div className="p-6 text-center text-sm text-gray-400">
              {t("lb.loading")}
            </div>
          ) : top10.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-400">
              {t("lb.noContribShort")}
              <br />
              <span className="text-xs">{t("lb.beFirst")}</span>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {top10.map((entry, idx) => {
                const rank = getUserRank(entry.totalPoints);
                const isUser = entry.pseudo === userPseudo;
                const isExpanded = expandedIdx === idx;

                return (
                  <div key={`${entry.pseudo}-${idx}`}>
                    <button
                      onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left
                                  hover:bg-sf-bg transition-colors text-sm
                                  ${isUser ? "bg-blue-50/50" : ""}`}
                    >
                      {/* Rank */}
                      <div
                        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
                                    text-xs font-bold ${RANK_STYLES[idx] || "bg-gray-100 text-gray-600"}`}
                      >
                        {idx + 1}
                      </div>

                      {/* Name */}
                      <span className={`flex-1 truncate ${isUser ? "font-semibold text-brand-600" : "text-gray-700"}`}>
                        {entry.pseudo}
                        {isUser && (
                          <span className="ml-1.5 text-[9px] bg-brand-500 text-white px-1 py-0.5 rounded-full uppercase">
                            {t("lb.you")}
                          </span>
                        )}
                      </span>

                      {/* Weekly pts */}
                      <span className="flex-shrink-0 font-semibold text-gray-900">
                        {entry.weeklyPoints}
                        <span className="text-[10px] text-gray-400 font-normal ml-0.5">pts</span>
                      </span>

                      {/* Expand arrow */}
                      <svg
                        className={`w-3.5 h-3.5 text-gray-300 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="px-4 pb-3 pl-14 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
                        <span>{t("lb.totalPoints")}</span>
                        <span className="font-medium text-gray-700">{entry.totalPoints}</span>
                        <span>{t("lb.level")}</span>
                        <span className="font-medium text-gray-700">{rank.level}</span>
                        <span>{t("lb.tierLabel")}</span>
                        <span className="font-medium text-gray-700">{rank.palier}</span>
                        <span>{t("lb.titleLabel")}</span>
                        <span className="font-medium text-gray-700">{t(rank.titleKey)}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
