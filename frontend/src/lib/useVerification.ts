"use client";

import { useState, useCallback } from "react";
import { verifyBusiness, type BusinessResult } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/lib/ToastContext";

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

  const { user, getAccessToken } = useAuth();
  const { addToast } = useToast();

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
        // Only update UI after server confirmation
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
        markVoted(placeId);
        awardVotePoints(() => setConversionVariant("milestone"));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erreur lors du vote";
        addToast(msg);
      } finally {
        setVerifyLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, getAccessToken, setResults, markVoted, awardVotePoints, setShowConversion],
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
  };
}
