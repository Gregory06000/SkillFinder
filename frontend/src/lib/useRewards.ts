"use client";

import { useState, useCallback, useEffect } from "react";
import {
  loadRewards,
  saveRewards,
  clearRewards,
  earnPoints,
  markVoted,
  getUserRank,
  type RewardsData,
} from "@/lib/gamification";
import { getAvatarData } from "@/components/ProfilePanel";
import { reverseGeocode, updateLeaderboard, fetchUserProfile, notifyBadge } from "@/lib/api";
import { getUnlockedBadges } from "@/lib/badges";
import { useAuth } from "@/lib/AuthContext";

const AI_REASONING_KEY = "sf_show_reasoning";
const MERGE_FLAG_KEY = "sf_points_merged";

export function useRewards(searchCenter: { lat: number; lng: number } | null) {
  const { user, loading, getAccessToken } = useAuth();
  const [rewards, setRewards] = useState<RewardsData>({
    points: 0,
    pseudo: "Guest",
    city: "",
    weekStart: "",
    weeklyPoints: 0,
    weeklyPointsByCity: {},
  });
  const [flyingText, setFlyingText] = useState<string | null>(null);
  const [showConversion, setShowConversion] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [avatarData, setAvatarData] = useState({
    avatarColor: "#C45D3E",
    avatarPhoto: null as string | null,
  });
  const [showReasoning, setShowReasoning] = useState(false);
  const [tierUp, setTierUp] = useState(false);

  useEffect(() => {
    setRewards(loadRewards());
    setAvatarData(getAvatarData());
    setShowReasoning(localStorage.getItem(AI_REASONING_KEY) === "true");
  }, []);

  useEffect(() => {
    if (searchCenter) {
      reverseGeocode(searchCenter.lat, searchCenter.lng).then((city) => {
        setRewards((prev) => {
          if (prev.city === city) return prev;
          const updated = {
            ...prev,
            city,
            weeklyPoints: prev.weeklyPointsByCity[city] ?? 0,
          };
          saveRewards(updated);
          return updated;
        });
      });
    }
  }, [searchCenter]);

  // Sync rewards with server when user logs in:
  // - First login: merge localStorage points with server (max), then clear localStorage
  // - Subsequent logins: just load server points (merge flag prevents re-merge)
  // When user logs out: clear localStorage so guest sees 0 pts
  useEffect(() => {
    // Wait for auth state to be determined — avoids wiping localStorage during
    // the brief moment user=null before the OAuth session is restored (race condition)
    if (loading) return;

    if (!user) {
      // Truly logged out → reset merge flag so next login can re-merge
      localStorage.removeItem(MERGE_FLAG_KEY);
      clearRewards();
      setRewards(loadRewards());
      return;
    }

    (async () => {
      try {
        const token = await getAccessToken();
        if (!token) return;

        // Read local points BEFORE any clearing
        const localData = loadRewards();
        const localPoints = localData.points;

        const profile = await fetchUserProfile(token);
        const serverPoints = (profile.found && profile.total_points !== undefined)
          ? profile.total_points!
          : 0;
        const alreadyMerged = localStorage.getItem(MERGE_FLAG_KEY) === "1";

        // Determine pseudo and city from server or local
        const pseudo = (profile.found && profile.pseudo) ? profile.pseudo
          : localData.pseudo !== "Guest" ? localData.pseudo : "Guest";
        const city = (profile.found && profile.city) ? profile.city
          : localData.city || "";

        let finalPoints = serverPoints;

        if (!alreadyMerged && localPoints > 0) {
          // First-time merge: take the higher of local vs server
          // (handles existing accounts where localStorage was already synced)
          finalPoints = Math.max(localPoints, serverPoints);

          // Push merged total to server only if local had more
          if (finalPoints > serverPoints) {
            if (city) {
              const weeklyPts = Math.max(
                localData.weeklyPointsByCity[city] ?? 0,
                (profile.found && profile.weekly_points) ? profile.weekly_points : 0,
              );
              await updateLeaderboard(pseudo, city, weeklyPts, finalPoints, token).catch(() => {});
            } else {
              await updateLeaderboard(pseudo, "", 0, finalPoints, token).catch(() => {});
            }
          }

          // Mark as merged and clear guest localStorage
          localStorage.setItem(MERGE_FLAG_KEY, "1");
          clearRewards();
        }

        // Build the rewards state from server data
        const serverWeekly: Record<string, number> = {};
        if (city && profile.found && profile.weekly_points) {
          serverWeekly[city] = profile.weekly_points;
        }

        const merged: RewardsData = {
          points: finalPoints,
          pseudo,
          city,
          weekStart: localData.weekStart,
          weeklyPoints: serverWeekly[city] ?? 0,
          weeklyPointsByCity: serverWeekly,
        };
        saveRewards(merged);
        setRewards(merged);
      } catch {
        // Silently fail — local data is still available
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const rank = getUserRank(rewards.points);

  const handleFlyingDone = useCallback(() => {
    setFlyingText(null);
  }, []);

  function handlePseudoChange(pseudo: string) {
    setRewards((prev) => {
      const updated = { ...prev, pseudo };
      saveRewards(updated);
      return updated;
    });
  }

  function handleProfileClose() {
    setShowProfile(false);
    setAvatarData(getAvatarData());
  }

  function toggleReasoning() {
    setShowReasoning((v) => {
      const next = !v;
      localStorage.setItem(AI_REASONING_KEY, String(next));
      return next;
    });
  }

  function awardVotePoints(onMilestone?: () => void) {
    const oldPalier = getUserRank(rewards.points).palier;
    const oldBadgeIds = new Set(getUnlockedBadges(rewards.points).map((b) => b.id));
    const { newData, increment, hitMilestone } = earnPoints(rewards);
    const newPalier = getUserRank(newData.points).palier;
    setRewards(newData);
    if (increment > 0) {
      setFlyingText(`+${increment}`);
    }
    // Check for tier-up (different from milestone)
    if (newPalier > oldPalier) {
      setTimeout(() => setTierUp(true), 1500);
    } else if (hitMilestone) {
      setTimeout(() => {
        onMilestone?.();
        setShowConversion(true);
      }, 1400);
    }
    // Sync ALL cities to server after each vote so total_points stays consistent
    if (user) {
      getAccessToken().then((token) => {
        if (!token) {
          return;
        }
        const cities = Object.entries(newData.weeklyPointsByCity);
        for (const [city, cityWeekly] of cities) {
          if (city && cityWeekly > 0) {
            updateLeaderboard(
              newData.pseudo,
              city,
              cityWeekly,
              newData.points,
              token,
            ).catch(() => {});
          }
        }
        // Notify for newly unlocked badges
        const newBadges = getUnlockedBadges(newData.points).filter(
          (b) => !oldBadgeIds.has(b.id),
        );
        for (const badge of newBadges) {
          const userLocale = localStorage.getItem("sf_locale") || "fr";
          notifyBadge(token, newData.pseudo, badge.id, badge.emoji, userLocale).catch(() => {});
        }
      });
    }
  }

  return {
    rewards,
    rank,
    flyingText,
    showConversion,
    setShowConversion,
    showProfile,
    setShowProfile,
    avatarData,
    showReasoning,
    tierUp,
    setTierUp,
    handleFlyingDone,
    handlePseudoChange,
    handleProfileClose,
    toggleReasoning,
    awardVotePoints,
    markVoted,
  };
}
