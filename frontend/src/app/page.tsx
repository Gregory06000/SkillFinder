"use client";

import { useState, useCallback, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import ResultCard from "@/components/ResultCard";
import ResultsMap from "@/components/ResultsMap";
import ComparisonModal from "@/components/ComparisonModal";
import UserStats from "@/components/UserStats";
import ConversionModal from "@/components/ConversionModal";
import LeaderboardWidget from "@/components/LeaderboardWidget";
import {
  searchBusinesses,
  compareBusinesses,
  verifyBusiness,
  reverseGeocode,
  type BusinessResult,
  type CompareResponse,
} from "@/lib/api";
import {
  loadRewards,
  earnPoints,
  markVoted,
  type RewardsData,
} from "@/lib/gamification";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="h-40 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-3 w-56 bg-gray-100 rounded" />
          </div>
          <div className="h-10 w-16 bg-gray-200 rounded-lg" />
        </div>
        <div className="h-3 w-32 bg-gray-100 rounded" />
        <div className="h-12 w-full bg-gray-50 rounded border-l-2 border-gray-200" />
      </div>
    </div>
  );
}

export default function Home() {
  const [results, setResults] = useState<BusinessResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearch, setLastSearch] = useState<{
    service: string;
    keyword: string;
  } | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [searchCenter, setSearchCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [searchRadiusKm, setSearchRadiusKm] = useState<number | null>(null);

  // Compare state
  const [compareSet, setCompareSet] = useState<Set<number>>(new Set());
  const [showCompare, setShowCompare] = useState(false);
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareData, setCompareData] = useState<CompareResponse | null>(null);
  const [compareError, setCompareError] = useState<string | null>(null);

  // Verify state
  const [verifyLoading, setVerifyLoading] = useState(false);

  // Gamification state
  const [rewards, setRewards] = useState<RewardsData>({
    points: 0, pseudo: "Guest", city: "", weekStart: "", weeklyPoints: 0,
  });
  const [flyingText, setFlyingText] = useState<string | null>(null);
  const [showConversion, setShowConversion] = useState(false);

  // Load rewards from localStorage on mount
  useEffect(() => {
    setRewards(loadRewards());
  }, []);

  // Resolve city from search center for leaderboard
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

  async function handleSearch(service: string, keyword: string, location: string, radiusKm: number) {
    setIsLoading(true);
    setError(null);
    setResults([]);
    setSelectedIndex(null);
    setCompareSet(new Set());

    try {
      const data = await searchBusinesses(service, keyword, location, radiusKm);
      setResults(data.results);
      setLastSearch({ service, keyword });
      if (data.center_lat != null && data.center_lng != null) {
        setSearchCenter({ lat: data.center_lat, lng: data.center_lng });
        setSearchRadiusKm(data.radius_km);
      } else {
        setSearchCenter(null);
        setSearchRadiusKm(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCompareToggle = useCallback((index: number) => {
    setCompareSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else if (next.size < 2) {
        next.add(index);
      }
      return next;
    });
  }, []);

  async function handleCompare() {
    if (compareSet.size !== 2 || !lastSearch) return;
    const [i1, i2] = Array.from(compareSet);
    const biz1 = results[i1];
    const biz2 = results[i2];

    setShowCompare(true);
    setCompareLoading(true);
    setCompareData(null);
    setCompareError(null);

    try {
      const data = await compareBusinesses(lastSearch.keyword, biz1, biz2);
      setCompareData(data);
    } catch (err) {
      setCompareError(err instanceof Error ? err.message : "Erreur lors de la comparaison");
    } finally {
      setCompareLoading(false);
    }
  }

  function handleCloseCompare() {
    setShowCompare(false);
    setCompareData(null);
    setCompareError(null);
  }

  async function handleVerify(placeId: string, vote: "yes" | "no") {
    setVerifyLoading(true);
    try {
      await verifyBusiness(placeId, vote);
      // Optimistically update the local results
      setResults((prev) =>
        prev.map((r) =>
          r.name === placeId
            ? {
                ...r,
                verification_yes: r.verification_yes + (vote === "yes" ? 1 : 0),
                verification_no: r.verification_no + (vote === "no" ? 1 : 0),
                verification_last: new Date().toISOString(),
              }
            : r
        )
      );

      // Gamification: mark voted + earn points + trigger flying badge
      markVoted(placeId);
      const { newData, increment, hitMilestone } = earnPoints(rewards);
      setRewards(newData);
      if (increment > 0) {
        setFlyingText(`+${increment}`);
      }
      if (hitMilestone) {
        // Small delay so user sees the flying badge first
        setTimeout(() => setShowConversion(true), 1400);
      }
    } catch {
      // Silent fail — vote feedback is non-critical
    } finally {
      setVerifyLoading(false);
    }
  }

  const handleFlyingDone = useCallback(() => {
    setFlyingText(null);
  }, []);

  const hasResults = results.length > 0 && !isLoading;
  const hasCoords = results.some((r) => r.lat != null && r.lng != null);
  const showMap = hasResults && hasCoords;

  return (
    <div className="space-y-6">
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {/* Gamification: User Stats */}
      <UserStats
        rewards={rewards}
        flyingText={flyingText}
        onFlyingDone={handleFlyingDone}
      />

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analyse des avis en cours...
          </div>
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {lastSearch && results.length === 0 && !isLoading && !error && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-4xl mb-3">:/</p>
          <p className="text-sm text-gray-500">
            Aucun résultat trouvé pour <strong>{lastSearch.keyword}</strong>.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Essayez un autre mot-clé ou une autre catégorie.
          </p>
        </div>
      )}

      {hasResults && (
        <>
          {/* Header + mobile toggle */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              <strong>{results.length}</strong> résultat{results.length > 1 ? "s" : ""} pour{" "}
              <strong>{lastSearch?.keyword}</strong> dans{" "}
              <strong>{lastSearch?.service}</strong> :
            </p>

            {showMap && (
              <div className="flex sm:hidden rounded-lg border border-gray-300 overflow-hidden text-xs">
                <button
                  onClick={() => setMobileView("list")}
                  className={`px-3 py-1.5 ${
                    mobileView === "list"
                      ? "bg-brand-600 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  Liste
                </button>
                <button
                  onClick={() => setMobileView("map")}
                  className={`px-3 py-1.5 ${
                    mobileView === "map"
                      ? "bg-brand-600 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  Carte
                </button>
              </div>
            )}
          </div>

          {/* Split layout: list + map */}
          <div className={`flex gap-6 ${showMap ? "items-start" : ""}`}>
            {/* List panel */}
            <div
              className={`space-y-4 ${
                showMap
                  ? "sm:w-[40%] sm:max-h-[calc(100vh-260px)] sm:overflow-y-auto sm:pr-2"
                  : "w-full"
              } ${showMap && mobileView === "map" ? "hidden sm:block" : "w-full"}`}
            >
              {results.map((result, i) => (
                <ResultCard
                  key={`${result.name}-${i}`}
                  result={result}
                  rank={i + 1}
                  isSelected={selectedIndex === i}
                  onClick={() =>
                    setSelectedIndex(selectedIndex === i ? null : i)
                  }
                  isCompareSelected={compareSet.has(i)}
                  onCompareToggle={() => handleCompareToggle(i)}
                  compareDisabled={compareSet.size >= 2}
                  onVerify={handleVerify}
                  verifyLoading={verifyLoading}
                />
              ))}

              {/* Leaderboard widget below results */}
              {rewards.city && (
                <LeaderboardWidget
                  city={rewards.city}
                  userPseudo={rewards.pseudo}
                  userWeeklyPoints={rewards.weeklyPoints}
                  userTotalPoints={rewards.points}
                />
              )}
            </div>

            {/* Map panel */}
            {showMap && (
              <div
                className={`sm:w-[60%] sm:sticky sm:top-4 h-[500px] sm:h-[calc(100vh-260px)] ${
                  mobileView === "list" ? "hidden sm:block" : "w-full"
                }`}
              >
                <ResultsMap
                  results={results}
                  selectedIndex={selectedIndex}
                  onSelect={setSelectedIndex}
                  searchCenter={searchCenter}
                  searchRadiusKm={searchRadiusKm}
                />
              </div>
            )}
          </div>
        </>
      )}

      {/* Floating compare button */}
      {compareSet.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={handleCompare}
            disabled={compareSet.size < 2}
            className="flex items-center gap-2 px-6 py-3 rounded-full shadow-xl
                       bg-purple-600 text-white font-semibold text-sm
                       hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 111.414 1.414L5.414 15H7a1 1 0 110 2H3a1 1 0 01-1-1v-4zm13.707 4.707a1 1 0 010-1.414L15.414 13H14a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0v-1.586l-2.293 2.293a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            {compareSet.size < 2
              ? `Comparer (${compareSet.size}/2)`
              : "Comparer ces 2 commerces"}
          </button>
        </div>
      )}

      {/* Comparison modal */}
      {showCompare && (
        <ComparisonModal
          data={compareData}
          isLoading={compareLoading}
          error={compareError}
          onClose={handleCloseCompare}
        />
      )}

      {/* Conversion modal (100-point milestone) */}
      {showConversion && (
        <ConversionModal onClose={() => setShowConversion(false)} />
      )}
    </div>
  );
}
