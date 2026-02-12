"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import ResultCard from "@/components/ResultCard";
import ResultsMap from "@/components/ResultsMap";
import ComparisonModal from "@/components/ComparisonModal";
import UserStats from "@/components/UserStats";
import ConversionModal from "@/components/ConversionModal";
import LeaderboardWidget from "@/components/LeaderboardWidget";
import ProfilePanel, { getAvatarData } from "@/components/ProfilePanel";
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
  saveRewards,
  earnPoints,
  markVoted,
  getUserRank,
  type RewardsData,
} from "@/lib/gamification";

type SortMode = "match" | "distance" | "rating";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-sf-lg border border-sf-border overflow-hidden animate-pulse">
      <div className="h-[140px] bg-sf-border/40" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="h-5 w-44 bg-sf-border/40 rounded" />
            <div className="h-3 w-60 bg-sf-border/30 rounded" />
          </div>
          <div className="h-12 w-14 bg-sf-border/40 rounded-lg" />
        </div>
        <div className="h-3 w-36 bg-sf-border/30 rounded" />
        <div className="h-16 w-full bg-sf-bg rounded-sf-sm" />
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
  const [searchCenter, setSearchCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchRadiusKm, setSearchRadiusKm] = useState<number | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("match");

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
    points: 0,
    pseudo: "Guest",
    city: "",
    weekStart: "",
    weeklyPoints: 0,
  });
  const [flyingText, setFlyingText] = useState<string | null>(null);
  const [showConversion, setShowConversion] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [avatarData, setAvatarData] = useState({ avatarColor: "#C45D3E", avatarPhoto: null as string | null });

  useEffect(() => {
    setRewards(loadRewards());
    setAvatarData(getAvatarData());
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

  // Sorted results
  const sortedResults = useMemo(() => {
    const copy = [...results];
    switch (sortMode) {
      case "distance":
        return copy.sort(
          (a, b) => (a.distance_km ?? 999) - (b.distance_km ?? 999),
        );
      case "rating":
        return copy.sort((a, b) => b.global_rating - a.global_rating);
      default:
        return copy.sort((a, b) => b.match_score - a.match_score);
    }
  }, [results, sortMode]);

  async function handleSearch(
    service: string,
    keyword: string,
    location: string,
    radiusKm: number,
  ) {
    setIsLoading(true);
    setError(null);
    setResults([]);
    setSelectedIndex(null);
    setCompareSet(new Set());
    setSortMode("match");

    try {
      const data = await searchBusinesses(
        service,
        keyword,
        location,
        radiusKm,
      );
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
      setCompareError(
        err instanceof Error ? err.message : "Erreur lors de la comparaison",
      );
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
      const { newData, increment, hitMilestone } = earnPoints(rewards);
      setRewards(newData);
      if (increment > 0) {
        setFlyingText(`+${increment}`);
      }
      if (hitMilestone) {
        setTimeout(() => setShowConversion(true), 1400);
      }
    } catch {
      // Silent fail
    } finally {
      setVerifyLoading(false);
    }
  }

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

  const rank = getUserRank(rewards.points);
  const hasResults = results.length > 0 && !isLoading;
  const hasCoords = results.some((r) => r.lat != null && r.lng != null);
  const showMap = hasResults && hasCoords;

  const SORT_OPTIONS: { key: SortMode; label: string }[] = [
    { key: "match", label: "Meilleur match" },
    { key: "distance", label: "Distance" },
    { key: "rating", label: "Note" },
  ];

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className="sticky top-0 z-50 border-b border-sf-border px-5 sm:px-10 h-16
                   flex items-center justify-between"
        style={{
          background: "rgba(246,243,238,0.85)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        }}
      >
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 bg-sf-accent rounded-[10px] flex items-center justify-center text-white font-bold text-[15px]">
            SF
          </div>
          <span className="font-serif text-xl font-bold text-sf-text tracking-tight">
            SkillFinder
          </span>
        </a>
        <div className="relative flex items-center gap-6">
          <button
            onClick={() => setShowProfile((p) => !p)}
            className="hidden sm:flex items-center gap-2.5 border border-sf-gold/25
                        rounded-full py-1 pl-1.5 pr-3.5 cursor-pointer transition-shadow
                        hover:shadow-sf-sm"
            style={{ background: "#FBF5E6" }}
          >
            {avatarData.avatarPhoto ? (
              <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                <img src={avatarData.avatarPhoto} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center
                            text-white text-xs font-bold"
                style={{ background: avatarData.avatarColor }}
              >
                {rewards.pseudo.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col leading-tight text-left">
              <span className="text-[11px] font-semibold text-sf-gold">
                {rank.title}
              </span>
              <span className="text-[11px] text-sf-text-secondary">
                Palier {rank.palier} &middot; {rewards.points} pts
              </span>
            </div>
          </button>

          {/* Mobile avatar button */}
          <button
            onClick={() => setShowProfile((p) => !p)}
            className="sm:hidden"
          >
            {avatarData.avatarPhoto ? (
              <div className="w-8 h-8 rounded-full overflow-hidden border border-sf-gold/25">
                <img src={avatarData.avatarPhoto} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center
                            text-white text-xs font-bold"
                style={{ background: avatarData.avatarColor }}
              >
                {rewards.pseudo.charAt(0).toUpperCase()}
              </div>
            )}
          </button>

          {/* Profile Panel */}
          {showProfile && (
            <ProfilePanel
              rewards={rewards}
              onClose={handleProfileClose}
              onPseudoChange={handlePseudoChange}
            />
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="px-5 sm:px-10 pt-12 max-w-[1400px] mx-auto animate-fade-in-up">
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-[38px] font-bold tracking-tight leading-tight text-sf-text">
            Trouvez le meilleur pour
            <br />
            ce qui compte <em className="text-sf-accent">vraiment</em>
          </h1>
          <p className="mt-2 text-base text-sf-text-secondary max-w-[500px]">
            Comparez les professionnels près de chez vous selon vos critères
            précis.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* XP Bar */}
        <UserStats
          rewards={rewards}
          flyingText={flyingText}
          onFlyingDone={handleFlyingDone}
        />
      </section>

      {/* ── RESULTS ── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 pt-8 pb-16">
        {error && (
          <div className="rounded-sf-md bg-red-50 border border-red-200 p-4 text-sm text-red-700 mb-6">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-sf-text-secondary">
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Analyse des avis en cours...
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
              <div className="hidden lg:block rounded-sf-lg bg-sf-border/30 h-[500px]" />
            </div>
          </div>
        )}

        {lastSearch && results.length === 0 && !isLoading && !error && (
          <div className="text-center py-16">
            <p className="text-sf-text-light text-4xl mb-3">:/</p>
            <p className="text-sm text-sf-text-secondary">
              Aucun résultat trouvé pour{" "}
              <strong>{lastSearch.keyword}</strong>.
            </p>
            <p className="text-xs text-sf-text-light mt-1">
              Essayez un autre mot-clé ou une autre catégorie.
            </p>
          </div>
        )}

        {hasResults && (
          <>
            {/* Results header */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="text-sm text-sf-text-secondary">
                <strong className="text-sf-text font-semibold">
                  {results.length} résultats
                </strong>{" "}
                pour <strong className="text-sf-text font-semibold">{lastSearch?.keyword}</strong>{" "}
                dans {lastSearch?.service}
              </div>
              <div className="flex items-center gap-2">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setSortMode(opt.key)}
                    className={`px-3.5 py-1.5 rounded-full border text-[13px] font-medium
                               transition-all cursor-pointer
                               ${
                                 sortMode === opt.key
                                   ? "bg-sf-dark text-white border-sf-dark"
                                   : "bg-white text-sf-text-secondary border-sf-border hover:border-sf-text-light"
                               }`}
                  >
                    {opt.label}
                  </button>
                ))}

                {/* Mobile list/map toggle */}
                {showMap && (
                  <div className="flex lg:hidden rounded-sf-sm border border-sf-border overflow-hidden">
                    <button
                      onClick={() => setMobileView("list")}
                      className={`px-3 py-1.5 text-xs font-medium transition-all
                                 ${
                                   mobileView === "list"
                                     ? "bg-sf-dark text-white"
                                     : "bg-white text-sf-text-secondary"
                                 }`}
                    >
                      Liste
                    </button>
                    <button
                      onClick={() => setMobileView("map")}
                      className={`px-3 py-1.5 text-xs font-medium transition-all
                                 ${
                                   mobileView === "map"
                                     ? "bg-sf-dark text-white"
                                     : "bg-white text-sf-text-secondary"
                                 }`}
                    >
                      Carte
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 2-column layout: cards + map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Cards */}
              <div
                className={`flex flex-col gap-4 ${
                  showMap && mobileView === "map"
                    ? "hidden lg:flex"
                    : "flex"
                }`}
              >
                {sortedResults.map((result, i) => (
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
                  className={`lg:sticky lg:top-[88px] rounded-sf-lg overflow-hidden
                              border border-sf-border shadow-sf-md
                              h-[400px] lg:h-[calc(100vh-112px)]
                              animate-fade-in-up
                              ${
                                mobileView === "list"
                                  ? "hidden lg:block"
                                  : "block"
                              }`}
                  style={{ animationDelay: "0.15s" }}
                >
                  <ResultsMap
                    results={sortedResults}
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
      </section>

      {/* Floating compare button */}
      {compareSet.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={handleCompare}
            disabled={compareSet.size < 2}
            className="flex items-center gap-2 px-6 py-3 rounded-full shadow-sf-lg
                       bg-sf-accent text-white font-semibold text-sm
                       hover:bg-sf-accent-light disabled:opacity-50
                       disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 111.414 1.414L5.414 15H7a1 1 0 110 2H3a1 1 0 01-1-1v-4zm13.707 4.707a1 1 0 010-1.414L15.414 13H14a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0v-1.586l-2.293 2.293a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
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
    </>
  );
}
