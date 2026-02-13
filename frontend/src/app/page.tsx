"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ResultCard from "@/components/ResultCard";
import ResultsMap from "@/components/ResultsMap";
import ComparisonModal from "@/components/ComparisonModal";
import UserStats from "@/components/UserStats";
import ConversionModal from "@/components/ConversionModal";
import LeaderboardWidget from "@/components/LeaderboardWidget";
import ProfilePanel from "@/components/ProfilePanel";
import { verifyBusiness } from "@/lib/api";
import { useSearch, type SortMode } from "@/lib/useSearch";
import { useRewards } from "@/lib/useRewards";
import { useCompare } from "@/lib/useCompare";

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [verifyLoading, setVerifyLoading] = useState(false);

  const search = useSearch();
  const rewards = useRewards(search.searchCenter);
  const compare = useCompare();

  function onSearch(
    service: string,
    keyword: string,
    location: string,
    radiusKm: number,
  ) {
    setSelectedIndex(null);
    compare.resetCompare();
    search.handleSearch(service, keyword, location, radiusKm);
  }

  async function handleVerify(placeId: string, vote: "yes" | "no") {
    setVerifyLoading(true);
    try {
      await verifyBusiness(placeId, vote);
      search.setResults((prev) =>
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
      rewards.markVoted(placeId);
      rewards.awardVotePoints();
    } catch {
      // Silent fail
    } finally {
      setVerifyLoading(false);
    }
  }

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
            onClick={() => rewards.setShowProfile((p) => !p)}
            className="hidden sm:flex items-center gap-2.5 border border-sf-gold/25
                        rounded-full py-1 pl-1.5 pr-3.5 cursor-pointer transition-shadow
                        hover:shadow-sf-sm"
            style={{ background: "#FBF5E6" }}
          >
            {rewards.avatarData.avatarPhoto ? (
              <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                <img src={rewards.avatarData.avatarPhoto} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center
                            text-white text-xs font-bold"
                style={{ background: rewards.avatarData.avatarColor }}
              >
                {rewards.rewards.pseudo.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col leading-tight text-left">
              <span className="text-[11px] font-semibold text-sf-gold">
                {rewards.rank.title}
              </span>
              <span className="text-[11px] text-sf-text-secondary">
                Palier {rewards.rank.palier} &middot; {rewards.rewards.points} pts
              </span>
            </div>
          </button>

          {/* Mobile avatar button */}
          <button
            onClick={() => rewards.setShowProfile((p) => !p)}
            className="sm:hidden"
          >
            {rewards.avatarData.avatarPhoto ? (
              <div className="w-8 h-8 rounded-full overflow-hidden border border-sf-gold/25">
                <img src={rewards.avatarData.avatarPhoto} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center
                            text-white text-xs font-bold"
                style={{ background: rewards.avatarData.avatarColor }}
              >
                {rewards.rewards.pseudo.charAt(0).toUpperCase()}
              </div>
            )}
          </button>

          {/* Profile Panel */}
          {rewards.showProfile && (
            <ProfilePanel
              rewards={rewards.rewards}
              onClose={rewards.handleProfileClose}
              onPseudoChange={rewards.handlePseudoChange}
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

        <SearchBar onSearch={onSearch} isLoading={search.isLoading} />

        {/* XP Bar */}
        <UserStats
          rewards={rewards.rewards}
          flyingText={rewards.flyingText}
          onFlyingDone={rewards.handleFlyingDone}
        />
      </section>

      {/* ── RESULTS ── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-10 pt-8 pb-16">
        {search.error && (
          <div className="rounded-sf-md bg-red-50 border border-red-200 p-4 text-sm text-red-700 mb-6">
            {search.error}
          </div>
        )}

        {search.isLoading && (
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

        {search.lastSearch && search.results.length === 0 && !search.isLoading && !search.error && (
          <div className="text-center py-16">
            <p className="text-sf-text-light text-4xl mb-3">:/</p>
            <p className="text-sm text-sf-text-secondary">
              Aucun résultat trouvé pour{" "}
              <strong>{search.lastSearch.keyword}</strong>.
            </p>
            <p className="text-xs text-sf-text-light mt-1">
              Essayez un autre mot-clé ou une autre catégorie.
            </p>
          </div>
        )}

        {search.hasResults && (
          <>
            {/* Results header */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="text-sm text-sf-text-secondary">
                <strong className="text-sf-text font-semibold">
                  {search.results.length} résultats
                </strong>{" "}
                pour <strong className="text-sf-text font-semibold">{search.lastSearch?.keyword}</strong>{" "}
                dans {search.lastSearch?.service}
              </div>
              <div className="flex items-center gap-2">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => search.setSortMode(opt.key)}
                    className={`px-3.5 py-1.5 rounded-full border text-[13px] font-medium
                               transition-all cursor-pointer
                               ${
                                 search.sortMode === opt.key
                                   ? "bg-sf-dark text-white border-sf-dark"
                                   : "bg-white text-sf-text-secondary border-sf-border hover:border-sf-text-light"
                               }`}
                  >
                    {opt.label}
                  </button>
                ))}

                {/* AI Reasoning toggle */}
                <button
                  onClick={rewards.toggleReasoning}
                  className={`px-3.5 py-1.5 rounded-full border text-[13px] font-medium
                             transition-all cursor-pointer inline-flex items-center gap-1.5
                             ${
                               rewards.showReasoning
                                 ? "bg-sf-dark text-white border-sf-dark"
                                 : "bg-white text-sf-text-secondary border-sf-border hover:border-sf-text-light"
                             }`}
                  title="Afficher le raisonnement IA"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  IA
                </button>

                {/* Mobile list/map toggle */}
                {search.showMap && (
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
                  search.showMap && mobileView === "map"
                    ? "hidden lg:flex"
                    : "flex"
                }`}
              >
                {search.sortedResults.map((result, i) => (
                  <ResultCard
                    key={`${result.name}-${i}`}
                    result={result}
                    rank={i + 1}
                    isSelected={selectedIndex === i}
                    onClick={() =>
                      setSelectedIndex(selectedIndex === i ? null : i)
                    }
                    isCompareSelected={compare.compareSet.has(i)}
                    onCompareToggle={() => compare.handleCompareToggle(i)}
                    compareDisabled={compare.compareSet.size >= 2}
                    onVerify={handleVerify}
                    verifyLoading={verifyLoading}
                    showReasoning={rewards.showReasoning}
                  />
                ))}

                {rewards.rewards.city && (
                  <LeaderboardWidget
                    city={rewards.rewards.city}
                    userPseudo={rewards.rewards.pseudo}
                    userWeeklyPoints={rewards.rewards.weeklyPoints}
                    userTotalPoints={rewards.rewards.points}
                  />
                )}
              </div>

              {/* Map panel */}
              {search.showMap && (
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
                    results={search.sortedResults}
                    selectedIndex={selectedIndex}
                    onSelect={setSelectedIndex}
                    searchCenter={search.searchCenter}
                    searchRadiusKm={search.searchRadiusKm}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {/* Floating compare button */}
      {compare.compareSet.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() =>
              search.lastSearch &&
              compare.handleCompare(search.lastSearch.keyword, search.results)
            }
            disabled={compare.compareSet.size < 2}
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
            {compare.compareSet.size < 2
              ? `Comparer (${compare.compareSet.size}/2)`
              : "Comparer ces 2 commerces"}
          </button>
        </div>
      )}

      {/* Comparison modal */}
      {compare.showCompare && (
        <ComparisonModal
          data={compare.compareData}
          isLoading={compare.compareLoading}
          error={compare.compareError}
          onClose={compare.handleCloseCompare}
        />
      )}

      {/* Conversion modal (100-point milestone) */}
      {rewards.showConversion && (
        <ConversionModal onClose={() => rewards.setShowConversion(false)} />
      )}
    </>
  );
}
