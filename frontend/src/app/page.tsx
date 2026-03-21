"use client";

import { useState, lazy, Suspense, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import ResultCard from "@/components/ResultCard";
import ComparisonModal from "@/components/ComparisonModal";

const ResultsMap = lazy(() => import("@/components/ResultsMap"));
import UserStats from "@/components/UserStats";
import ConversionModal from "@/components/ConversionModal";
import TierUpModal from "@/components/TierUpModal";
import ProfilePanel from "@/components/ProfilePanel";
import LeaderboardTab from "@/components/LeaderboardTab";
import { useSearch, type SortMode } from "@/lib/useSearch";
import { useRewards } from "@/lib/useRewards";
import { useCompare } from "@/lib/useCompare";
import { useVerification } from "@/lib/useVerification";
import { useFavorites } from "@/lib/useFavorites";
import { useAuth } from "@/lib/AuthContext";
import { useT } from "@/lib/i18n";
import { useTheme } from "@/lib/useTheme";
import { trackEvent } from "@/lib/analytics";
import Mascot from "@/components/Mascot";

function SkeletonCard() {
  return (
    <div className="bg-sf-card rounded-sf-lg border border-sf-border overflow-hidden animate-pulse">
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

export default function Page() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}

function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [activeTab, setActiveTab] = useState<"search" | "leaderboard">("search");
  const [searchBarKey, setSearchBarKey] = useState(0);

  const searchParams = useSearchParams();
  const urlParams = useMemo(() => ({
    service: searchParams.get("service") || "",
    keyword: searchParams.get("keyword") || "",
    city: searchParams.get("city") || "",
  }), [searchParams]);

  const search = useSearch();
  const rewards = useRewards(search.searchCenter);
  const compare = useCompare();
  const { user, signOut, getAccessToken } = useAuth();
  const { t, locale, setLocale } = useT();
  const { theme, toggleTheme } = useTheme();
  const favs = useFavorites();

  const verification = useVerification({
    setResults: search.setResults,
    markVoted: rewards.markVoted,
    awardVotePoints: rewards.awardVotePoints,
    setShowConversion: rewards.setShowConversion,
  });

  // Sync server-side voted places when results arrive and user is logged in
  useEffect(() => {
    if (user && search.results.length > 0) {
      verification.syncServerVotes(search.results.map((r) => r.name));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.results, user]);

  function onSearch(
    service: string,
    keyword: string,
    location: string,
    radiusKm: number,
  ) {
    setSelectedIndex(null);
    compare.resetCompare();
    search.handleSearch(service, keyword, location, radiusKm, locale);
    trackEvent("Search", { keyword, service, radiusKm });
  }

  const SORT_OPTIONS: { key: SortMode; labelKey: string }[] = [
    { key: "match", labelKey: "results.sortMatch" },
    { key: "distance", labelKey: "results.sortDistance" },
    { key: "rating", labelKey: "results.sortRating" },
  ];

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        aria-label={t("nav.ariaLabel")}
        className="sticky top-0 z-50 border-b border-sf-border px-5 sm:px-10 h-16
                   flex items-center justify-between"
        style={{
          background: theme === "dark" ? "rgba(20,18,17,0.85)" : "rgba(246,243,238,0.85)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        }}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("search");
            search.resetSearch();
            setSelectedIndex(null);
            compare.resetCompare();
            setSearchBarKey((k) => k + 1);
          }}
          className="flex items-center gap-2.5 no-underline"
        >
          <Mascot pose="default" size={44} />
          <span className="font-serif text-2xl font-bold text-sf-text tracking-tight">
            Skill<span className="text-sf-accent">Finder</span>
          </span>
        </a>
        <div className="relative flex items-center gap-3 sm:gap-6">
          <button
            onClick={() => setActiveTab(activeTab === "leaderboard" ? "search" : "leaderboard")}
            aria-label={t("nav.leaderboard")}
            aria-pressed={activeTab === "leaderboard"}
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border
                        text-[13px] font-medium transition-all cursor-pointer
                        ${activeTab === "leaderboard"
                          ? "bg-sf-accent text-white border-sf-accent"
                          : "bg-sf-card text-sf-text-secondary border-sf-border hover:border-sf-text-light"
                        }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
            </svg>
            {t("nav.leaderboard")}
          </button>
          {/* Language toggle */}
          <button
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
            className="hidden sm:flex items-center px-2.5 py-1.5 rounded-full border
                        text-[12px] font-semibold transition-all cursor-pointer
                        bg-sf-card text-sf-text-secondary border-sf-border hover:border-sf-text-light"
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t("nav.lightMode") : t("nav.darkMode")}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border
                        transition-all cursor-pointer bg-sf-card text-sf-text-secondary
                        border-sf-border hover:border-sf-text-light"
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          {user ? (
            <button
              onClick={signOut}
              className="hidden sm:block text-xs text-sf-text-secondary hover:text-sf-text transition-colors"
            >
              {t("nav.logout")}
            </button>
          ) : (
            <button
              onClick={verification.showLoginForVote}
              className="hidden sm:block text-xs font-medium text-sf-accent hover:text-sf-accent-light transition-colors"
            >
              {t("nav.login")}
            </button>
          )}
          <button
            data-no-panel-close
            onClick={() => rewards.showProfile ? rewards.handleProfileClose() : rewards.setShowProfile(true)}
            aria-label={t("nav.profileAria", { pseudo: rewards.rewards.pseudo })}
            aria-expanded={rewards.showProfile}
            className="hidden sm:flex items-center gap-2.5 border border-sf-gold/25
                        rounded-full py-1 pl-1.5 pr-3.5 cursor-pointer transition-shadow
                        hover:shadow-sf-sm"
            style={{ background: "var(--sf-gold-light)" }}
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
                {t(rewards.rank.titleKey)}
              </span>
              <span className="text-[11px] text-sf-text-secondary">
                {t("nav.tier", { palier: rewards.rank.palier })} &middot; {t("nav.pts", { pts: rewards.rewards.points })}
              </span>
            </div>
          </button>

          {/* Mobile: Classement */}
          <button
            onClick={() => setActiveTab(activeTab === "leaderboard" ? "search" : "leaderboard")}
            aria-label={t("nav.leaderboard")}
            className={`sm:hidden flex items-center justify-center w-8 h-8 rounded-full border transition-colors
              ${activeTab === "leaderboard" ? "bg-sf-accent text-white border-sf-accent" : "bg-sf-card text-sf-text-secondary border-sf-border"}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
            </svg>
          </button>

          {/* Mobile: Language toggle */}
          <button
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
            className="sm:hidden flex items-center px-2 py-1 rounded-full border text-[12px] font-semibold
                       bg-sf-card text-sf-text-secondary border-sf-border"
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>
          {/* Mobile: Dark mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t("nav.lightMode") : t("nav.darkMode")}
            className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full border
                        bg-sf-card text-sf-text-secondary border-sf-border"
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Mobile: Connexion / Déconnexion */}
          {user ? (
            <button
              onClick={signOut}
              className="sm:hidden text-[11px] text-sf-text-secondary hover:text-sf-text transition-colors"
            >
              {t("nav.logout")}
            </button>
          ) : (
            <button
              onClick={verification.showLoginForVote}
              className="sm:hidden text-[11px] font-medium text-sf-accent"
            >
              {t("nav.login")}
            </button>
          )}

          {/* Mobile avatar button */}
          <button
            data-no-panel-close
            onClick={() => rewards.showProfile ? rewards.handleProfileClose() : rewards.setShowProfile(true)}
            aria-label={t("nav.profileAria", { pseudo: rewards.rewards.pseudo })}
            aria-expanded={rewards.showProfile}
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

      <main>
      {activeTab === "search" ? (
      <>
      {/* ── HERO ── */}
      <section className="px-5 sm:px-10 pt-12 max-w-[1400px] mx-auto animate-fade-in-up">
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-[38px] font-bold tracking-tight leading-tight text-sf-text">
            {t("hero.title1")}
            <br />
            {t("hero.title2")} <em className="text-sf-accent">{t("hero.title3")}</em>
          </h1>
          <p className="mt-2 text-base text-sf-text-secondary max-w-[500px]">
            {t("hero.subtitle")}
          </p>
        </div>

        <SearchBar
          key={searchBarKey}
          onSearch={onSearch}
          isLoading={search.isLoading}
          initialService={urlParams.service}
          initialKeyword={urlParams.keyword}
          initialCity={urlParams.city}
        />

        {/* Search history */}
        {!search.hasResults && !search.isLoading && search.history.length > 0 && (
          <div className="mt-4 mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-sf-text-light uppercase tracking-wider">
                {t("history.title")}
              </span>
              <button
                onClick={search.clearHistory}
                className="text-[11px] text-sf-text-light hover:text-sf-text transition-colors"
              >
                {t("history.clear")}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {search.history.slice(0, 5).map((h, i) => (
                <button
                  key={`hist-${i}`}
                  onClick={() => onSearch(h.service, h.keyword, h.location, h.radiusKm)}
                  className="px-3 py-1.5 bg-sf-card border border-sf-border rounded-full text-xs
                             text-sf-text-secondary hover:border-sf-accent/40 hover:text-sf-accent
                             transition-all cursor-pointer"
                >
                  {h.keyword ? `${h.keyword} · ${h.service}` : h.service}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* XP Bar */}
        <UserStats
          rewards={rewards.rewards}
          flyingText={rewards.flyingText}
          onFlyingDone={rewards.handleFlyingDone}
        />
      </section>

      {/* ── FAVORITES (when no search results) ── */}
      {!search.hasResults && !search.isLoading && favs.favorites.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-5 sm:px-10 pt-4 pb-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-sf-text-light uppercase tracking-wider">
              {t("fav.title", { count: favs.favorites.length })}
            </span>
            <button
              onClick={favs.clearFavorites}
              className="text-[11px] text-sf-text-light hover:text-sf-text transition-colors"
            >
              {t("fav.clearAll")}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favs.favorites.slice(0, 6).map((fav) => (
              <div
                key={fav.name}
                className="bg-sf-card border border-sf-border rounded-sf-md p-3 flex items-center gap-3
                           hover:shadow-sf-sm transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-sf-text truncate">{fav.name}</p>
                  <p className="text-[11px] text-sf-text-secondary truncate">{fav.address}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-sf-text-light">
                    <span>{fav.globalRating.toFixed(1)} &#9733;</span>
                    <span>&middot; Score {fav.matchScore.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  {fav.mapsUrl && (
                    <a
                      href={fav.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${fav.name} — Google Maps`}
                      className="w-7 h-7 rounded-full border border-sf-border flex items-center justify-center
                                 text-sf-text-light hover:text-sf-accent hover:border-sf-accent/40 transition-all"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  )}
                  <button
                    onClick={() => favs.removeFavorite(fav.name)}
                    aria-label={`${t("fav.remove")} ${fav.name}`}
                    className="w-7 h-7 rounded-full border border-sf-border flex items-center justify-center
                               text-sf-text-light hover:text-red-500 hover:border-red-200 transition-all"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── RESULTS ── */}
      <section aria-live="polite" aria-label={t("results.ariaRegion")} className="max-w-[1400px] mx-auto px-5 sm:px-10 pt-8 pb-16">
        {search.error && (
          <div className="rounded-sf-md bg-red-50 border border-red-200 p-4 text-sm text-red-700 mb-6">
            {search.error}
          </div>
        )}

        {search.isLoading && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-sf-text-secondary">
              <Mascot pose="search" size={48} animate />
              {search.lastSearch?.keyword ? t("results.loading") : t("results.loadingExplore")}
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
          <div className="text-center py-16 animate-fade-in-up">
            <Mascot pose="sad" size={100} className="mx-auto mb-4" />
            <p className="text-sm font-semibold text-sf-text mb-1">
              {search.lastSearch.keyword ? (
                <>{t("results.noResults")}{" "}<span className="text-sf-accent">{search.lastSearch.keyword}</span></>
              ) : (
                t("results.noResultsExplore")
              )}
            </p>
            <p className="text-xs text-sf-text-light max-w-[280px] mx-auto">
              {t("results.tryOther")}
            </p>
          </div>
        )}

        {search.hasResults && (
          <>
            {/* Results header */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="text-sm text-sf-text-secondary">
                <strong className="text-sf-text font-semibold">
                  {t("results.count", { count: search.sortedResults.length, plural: search.sortedResults.length > 1 ? "s" : "" })}
                </strong>{" "}
                {t("results.in")} <strong className="text-sf-text font-semibold">{search.lastSearch?.service}</strong>
                {search.lastSearch?.keyword && (
                  <> {t("results.for")} <strong className="text-sf-text font-semibold">{search.lastSearch.keyword}</strong></>
                )}
                {search.sortedResults.length < search.results.length && (
                  <span className="text-sf-text-light ml-1">
                    {t("results.filtered", { count: search.results.length - search.sortedResults.length })}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                {/* Row 1 : tri + IA */}
                <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
                  {SORT_OPTIONS
                    .filter((opt) => opt.key !== "match" || !!search.lastSearch?.keyword)
                    .map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => search.setSortMode(opt.key)}
                        className={`shrink-0 px-3.5 py-1.5 rounded-full border text-[13px] font-medium
                                   transition-all cursor-pointer
                                   ${
                                     search.sortMode === opt.key
                                       ? "bg-sf-accent text-white border-sf-accent"
                                       : "bg-sf-card text-sf-text-secondary border-sf-border hover:border-sf-text-light"
                                   }`}
                      >
                        {t(opt.labelKey)}
                      </button>
                    ))}

                  {/* AI Reasoning toggle — masqué sans critère spécifique */}
                  {search.lastSearch?.keyword && (
                    <button
                      onClick={rewards.toggleReasoning}
                      className={`shrink-0 px-3.5 py-1.5 rounded-full border text-[13px] font-medium
                                 transition-all cursor-pointer inline-flex items-center gap-1.5
                                 ${
                                   rewards.showReasoning
                                     ? "bg-sf-accent text-white border-sf-accent"
                                     : "bg-sf-card text-sf-text-secondary border-sf-border hover:border-sf-text-light"
                                 }`}
                      title={t("results.aiTitle")}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                      {t("results.aiToggle")}
                    </button>
                  )}
                </div>

                {/* Row 2 : Liste / Carte (mobile only) */}
                {search.showMap && (
                  <div className="flex lg:hidden rounded-sf-sm border border-sf-border overflow-hidden self-start">
                    <button
                      onClick={() => setMobileView("list")}
                      className={`px-4 py-1.5 text-xs font-medium transition-all
                                 ${mobileView === "list" ? "bg-sf-accent text-white" : "bg-sf-card text-sf-text-secondary"}`}
                    >
                      {t("results.list")}
                    </button>
                    <button
                      onClick={() => setMobileView("map")}
                      className={`px-4 py-1.5 text-xs font-medium transition-all
                                 ${mobileView === "map" ? "bg-sf-accent text-white" : "bg-sf-card text-sf-text-secondary"}`}
                    >
                      {t("results.map")}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="text-[11px] font-semibold text-sf-text-light uppercase tracking-wider">
                {t("filters.label")}
              </span>
              {[3, 3.5, 4, 4.5].map((rating) => (
                <button
                  key={`r-${rating}`}
                  onClick={() =>
                    search.setFilters((f) => ({
                      ...f,
                      minRating: f.minRating === rating ? 0 : rating,
                    }))
                  }
                  className={`px-2.5 py-1 rounded-full border text-[12px] font-medium transition-all cursor-pointer
                             ${search.filters.minRating === rating
                               ? "bg-sf-gold text-white border-sf-gold"
                               : "bg-sf-card text-sf-text-secondary border-sf-border hover:border-sf-text-light"
                             }`}
                >
                  {rating}+ &#9733;
                </button>
              ))}
              {search.searchCenter && (
                <>
                  {[2, 5, 10].map((dist) => (
                    <button
                      key={`d-${dist}`}
                      onClick={() =>
                        search.setFilters((f) => ({
                          ...f,
                          maxDistance: f.maxDistance === dist ? 0 : dist,
                        }))
                      }
                      className={`px-2.5 py-1 rounded-full border text-[12px] font-medium transition-all cursor-pointer
                                 ${search.filters.maxDistance === dist
                                   ? "bg-sf-accent text-white border-sf-accent"
                                   : "bg-sf-card text-sf-text-secondary border-sf-border hover:border-sf-text-light"
                                 }`}
                    >
                      &lt; {dist} km
                    </button>
                  ))}
                </>
              )}
              {(search.filters.minRating > 0 || search.filters.maxDistance > 0) && (
                <button
                  onClick={() => search.setFilters({ minRating: 0, maxDistance: 0 })}
                  className="text-[11px] text-sf-accent hover:underline cursor-pointer"
                >
                  {t("filters.clear")}
                </button>
              )}
            </div>

            {/* 2-column layout: cards + map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Cards */}
              <div
                role="list"
                aria-label={t("results.ariaList")}
                className={`flex flex-col gap-4 ${
                  search.showMap && mobileView === "map"
                    ? "hidden lg:flex"
                    : "flex"
                }`}
              >
                {search.paginatedResults.map((result, i) => (
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
                    onVerify={verification.handleVerify}
                    verifyLoading={verification.verifyLoading}
                    showReasoning={rewards.showReasoning}
                    isVoted={verification.votedPlaces.has(result.name)}
                    isFavorite={favs.isFavorite(result.name)}
                    onToggleFavorite={() =>
                      favs.toggleFavorite({
                        name: result.name,
                        address: result.address,
                        matchScore: result.match_score,
                        globalRating: result.global_rating,
                        photoName: result.photo_name,
                        mapsUrl: result.maps_url,
                      })
                    }
                    keyword={search.lastSearch?.keyword || ""}
                    user={user}
                    pseudo={rewards.rewards.pseudo}
                    getAccessToken={getAccessToken}
                    userId={user?.id}
                  />
                ))}

                {/* Show more button */}
                {search.canShowMore && (
                  <button
                    onClick={search.showMore}
                    className="w-full py-3 bg-sf-card border border-sf-border rounded-sf-lg text-sm
                               font-medium text-sf-text-secondary hover:border-sf-accent/40
                               hover:text-sf-accent transition-all cursor-pointer"
                  >
                    {t("results.showMore", { count: search.sortedResults.length - search.paginatedResults.length })}
                  </button>
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
                  <Suspense
                    fallback={
                      <div className="w-full h-full flex items-center justify-center bg-sf-bg text-sm text-sf-text-light">
                        {t("results.mapLoading")}
                      </div>
                    }
                  >
                    <ResultsMap
                      results={search.sortedResults}
                      selectedIndex={selectedIndex}
                      onSelect={setSelectedIndex}
                      searchCenter={search.searchCenter}
                      searchRadiusKm={search.searchRadiusKm}
                    />
                  </Suspense>
                </div>
              )}
            </div>
          </>
        )}
      </section>
      </>
      ) : (
        <section className="max-w-[1400px] mx-auto px-5 sm:px-10 pt-12 pb-16 animate-fade-in-up">
          <LeaderboardTab
            userPseudo={rewards.rewards.pseudo}
            userCity={rewards.rewards.city}
            userWeeklyPoints={rewards.rewards.weeklyPoints}
            userTotalPoints={rewards.rewards.points}
            userId={user?.id}
          />
        </section>
      )}
      </main>

      {/* Floating compare button */}
      {compare.compareSet.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() => {
              if (search.lastSearch) {
                compare.handleCompare(search.lastSearch.keyword, search.results, locale);
                trackEvent("Compare", { keyword: search.lastSearch.keyword });
              }
            }}
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
              ? t("compare.btn", { count: compare.compareSet.size })
              : t("compare.btnReady")}
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
        <ConversionModal
          variant={verification.conversionVariant}
          rankTitle={t(rewards.rank.titleKey)}
          onClose={() => rewards.setShowConversion(false)}
        />
      )}

      {/* Tier-up celebration modal */}
      {rewards.tierUp && (
        <TierUpModal
          rank={rewards.rank}
          onClose={() => rewards.setTierUp(false)}
        />
      )}

    </>
  );
}
