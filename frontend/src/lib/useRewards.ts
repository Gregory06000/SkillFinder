"use client";

import { useState, useCallback, useEffect } from "react";
import {
  loadRewards,
  saveRewards,
  earnPoints,
  markVoted,
  getUserRank,
  type RewardsData,
} from "@/lib/gamification";
import { getAvatarData } from "@/components/ProfilePanel";
import { reverseGeocode, updateLeaderboard, fetchUserProfile } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

const AI_REASONING_KEY = "sf_show_reasoning";

export function useRewards(searchCenter: { lat: number; lng: number } | null) {
  const { user, getAccessToken } = useAuth();
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
  // 1. Fetch server-side profile
  // 2. Merge: take the higher points (local vs server)
  // 3. Push merged result back to server for each city
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const token = await getAccessToken();
        if (!token) return;

        const profile = await fetchUserProfile(token);

        if (profile.found && profile.total_points !== undefined) {
          setRewards((prev) => {
            const serverPoints = profile.total_points!;
            const mergedPoints = Math.max(prev.points, serverPoints);
            const mergedPseudo = prev.pseudo === "Guest" && profile.pseudo
              ? profile.pseudo
              : prev.pseudo;
            const mergedCity = prev.city || profile.city || "";

            // Merge server weekly points for the server's city
            const mergedByCity = { ...prev.weeklyPointsByCity };
            if (profile.city && profile.weekly_points) {
              mergedByCity[profile.city] = Math.max(
                mergedByCity[profile.city] ?? 0,
                profile.weekly_points,
              );
            }

            const merged = {
              ...prev,
              points: mergedPoints,
              weeklyPoints: mergedByCity[mergedCity] ?? 0,
              weeklyPointsByCity: mergedByCity,
              pseudo: mergedPseudo,
              city: mergedCity,
            };
            saveRewards(merged);
            return merged;
          });
        }

        // Push local data to server for each city with weekly points
        setRewards((current) => {
          if (current.points > 0) {
            const cities = Object.entries(current.weeklyPointsByCity);
            for (const [city, cityWeekly] of cities) {
              if (city && cityWeekly > 0) {
                updateLeaderboard(
                  current.pseudo,
                  city,
                  cityWeekly,
                  current.points,
                  token,
                ).catch(() => {});
              }
            }
          }
          return current;
        });
      } catch {
        // Silently fail — local data is still available
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
    const { newData, increment, hitMilestone } = earnPoints(rewards);
    setRewards(newData);
    if (increment > 0) {
      setFlyingText(`+${increment}`);
    }
    if (hitMilestone) {
      setTimeout(() => {
        onMilestone?.();
        setShowConversion(true);
      }, 1400);
    }
    // Sync to server after each vote if logged in
    if (user && newData.city) {
      getAccessToken().then((token) => {
        if (!token) return;
        const cityWeekly = newData.weeklyPointsByCity[newData.city] ?? 0;
        updateLeaderboard(
          newData.pseudo,
          newData.city,
          cityWeekly,
          newData.points,
          token,
        ).catch(() => {});
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
    handleFlyingDone,
    handlePseudoChange,
    handleProfileClose,
    toggleReasoning,
    awardVotePoints,
    markVoted,
  };
}
