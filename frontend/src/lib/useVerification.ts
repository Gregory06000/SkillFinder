"use client";

import { useState, useCallback, useEffect } from "react";
import { verifyBusiness, fetchMyVotes, type BusinessResult } from "@/lib/api";
import { markVoted as markVotedStorage, hasVoted } from "@/lib/gamification";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/lib/ToastContext";
import { trackEvent } from "@/lib/analytics";

interface UseVerificationOptions {
  setResults: React.Dispatch<React.SetStateAction<BusinessResult[]>>;
  markVoted: (placeId: string) => void;
  awardVotePoints: (onMilestone: () => void) => void;
  setShowConversion: (show: boolean) => void;
}

export function useVerification({
  setResults,
  markVoted,
  awardVotePoints,
  setShowConversion,
}: UseVerificationOptions) {
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [conversionVariant, setConversionVariant] = useState<
    "milestone" | "login" | "vote"
  >("milestone");

  // React state set for voted places (source of truth for UI)
  const [votedPlaces, setVotedPlaces] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem("sf_voted_places");
      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  });

  const { user, getAccessToken } = useAuth();
  const { addToast } = useToast();

  // Clear voted state on logout
  useEffect(() => {
    if (!user) setVotedPlaces(new Set());
  }, [user]);

  // Mark a place as voted in both React state and localStorage
  const markVotedBoth = useCallback((placeId: string) => {
    setVotedPlaces((prev) => new Set([...prev, placeId]));
    markVoted(placeId);       // localStorage via gamification
    markVotedStorage(placeId); // direct localStorage write
  }, [markVoted]);

  // Sync server-side voted places after search results arrive
  const syncServerVotes = useCallback(async (placeIds: string[]) => {
    if (!user || !placeIds.length) return;
    const token = await getAccessToken();
    if (!token) return;
    const voted = await fetchMyVotes(placeIds, token);
    if (voted.length > 0) {
      setVotedPlaces((prev) => {
        const next = new Set(prev);
        voted.forEach((id) => next.add(id));
        return next;
      });
      voted.forEach((id) => markVotedStorage(id));
    }
  }, [user, getAccessToken]);

  const handleVerify = useCallback(
    async (placeId: string, vote: "yes" | "no") => {
      if (!user) {
        setConversionVariant("vote");
        setShowConversion(true);
        return;
      }

      setVerifyLoading(true);
      try {
        const token = await getAccessToken();
        if (!token) {
          setConversionVariant("vote");
          setShowConversion(true);
          setVerifyLoading(false);
          return;
        }
        await verifyBusiness(placeId, vote, token);
        setResults((prev) =>
          prev.map((r) =>
            r.name === placeId
              ? {
                  ...r,
                  verification_yes:
                    r.verification_yes + (vote === "yes" ? 1 : 0),
                  verification_no: r.verification_no + (vote === "no" ? 1 : 0),
                  verification_last: new Date().toISOString(),
                }
              : r,
          ),
        );
        markVotedBoth(placeId);
        awardVotePoints(() => setConversionVariant("milestone"));
        trackEvent("Vote", { vote });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erreur lors du vote";
        addToast(msg);
      } finally {
        setVerifyLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, getAccessToken, setResults, markVotedBoth, awardVotePoints, setShowConversion],
  );

  const showLoginForVote = useCallback(() => {
    setConversionVariant("login");
    setShowConversion(true);
  }, [setShowConversion]);

  return {
    verifyLoading,
    conversionVariant,
    handleVerify,
    showLoginForVote,
    votedPlaces,
    syncServerVotes,
  };
}
