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
import { reverseGeocode, updateLeaderboard } from "@/lib/api";
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
    if (searchCenter && !rewards.city) {
      reverseGeocode(searchCenter.lat, searchCenter.lng).then((city) => {
        setRewards((prev) => {
          const updated = { ...prev, city };
          localStorage.setItem("sf_rewards", JSON.stringify(updated));
          return updated;
        });
      });
    }
  }, [searchCenter, rewards.city]);

  // Sync local rewards to server when user logs in
  useEffect(() => {
    const token = getAccessToken();
    if (user && token && rewards.points > 0 && rewards.city) {
      updateLeaderboard(
        rewards.pseudo,
        rewards.city,
        rewards.weeklyPoints,
        rewards.points,
        token,
      ).catch(() => {});
    }
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

  function awardVotePoints() {
    const { newData, increment, hitMilestone } = earnPoints(rewards);
    setRewards(newData);
    if (increment > 0) {
      setFlyingText(`+${increment}`);
    }
    if (hitMilestone) {
      setTimeout(() => setShowConversion(true), 1400);
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
