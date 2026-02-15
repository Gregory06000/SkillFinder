"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getUserRank } from "@/lib/gamification";

interface LeaderboardEntry {
  pseudo: string;
  weeklyPoints: number;
  totalPoints: number;
  city: string;
  userId?: string;
}

interface LeaderboardTabProps {
  userPseudo: string;
  userCity: string;
  userWeeklyPoints: number;
  userTotalPoints: number;
  userId?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const PODIUM_STYLES: Record<number, { bg: string; border: string; text: string; icon: string }> = {
  0: {
    bg: "bg-gradient-to-br from-yellow-50 to-amber-50",
    border: "border-yellow-300",
    text: "text-yellow-700",
    icon: "from-yellow-400 to-amber-500",
  },
  1: {
    bg: "bg-gradient-to-br from-gray-50 to-slate-50",
    border: "border-gray-300",
    text: "text-gray-600",
    icon: "from-gray-300 to-gray-400",
  },
  2: {
    bg: "bg-gradient-to-br from-orange-50 to-amber-50",
    border: "border-amber-400",
    text: "text-amber-700",
    icon: "from-amber-500 to-amber-700",
  },
};

export default function LeaderboardTab({
  userPseudo,
  userCity,
  userWeeklyPoints,
  userTotalPoints,
  userId,
}: LeaderboardTabProps) {
  const [cityQuery, setCityQuery] = useState(userCity || "");
  const [selectedCity, setSelectedCity] = useState(userCity || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Close suggestions on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Debounced city autocomplete
  useEffect(() => {
    if (cityQuery.length < 2 || cityQuery === selectedCity) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/leaderboard/cities?q=${encodeURIComponent(cityQuery)}`
        );
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.cities || []);
          setShowSuggestions(true);
        }
      } catch {
        setSuggestions([]);
      }
    }, 300);
  }, [cityQuery, selectedCity]);

  const fetchLeaderboard = useCallback(async (city: string) => {
    if (!city) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/leaderboard?city=${encodeURIComponent(city)}&limit=50`
      );
      if (res.ok) {
        const data = await res.json();
        const mapped: LeaderboardEntry[] = (data.entries || []).map(
          (e: Record<string, unknown>) => ({
            pseudo: e.pseudo as string,
            weeklyPoints: (e.weekly_points ?? e.weeklyPoints ?? 0) as number,
            totalPoints: (e.total_points ?? e.totalPoints ?? 0) as number,
            city: e.city as string,
            userId: (e.user_id as string) || undefined,
          })
        );
        setEntries(mapped);
      } else {
        setEntries([]);
      }
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch user's city when it becomes available
  useEffect(() => {
    if (userCity && !selectedCity) {
      setSelectedCity(userCity);
      setCityQuery(userCity);
      fetchLeaderboard(userCity);
    }
  }, [userCity, selectedCity, fetchLeaderboard]);

  function selectCity(city: string) {
    setSelectedCity(city);
    setCityQuery(city);
    setShowSuggestions(false);
    setExpandedIdx(null);
    fetchLeaderboard(city);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cityQuery.trim()) {
      selectCity(cityQuery.trim());
    }
  }

  // Merge current user if not in list
  const allEntries = [...entries];
  const isUserById = userId
    ? allEntries.some((e) => e.userId === userId)
    : false;
  const isUserByPseudo = allEntries.some(
    (e) => e.pseudo === userPseudo && e.city === selectedCity
  );
  const userInList = isUserById || isUserByPseudo;

  if (!userInList && userWeeklyPoints > 0 && selectedCity === userCity) {
    allEntries.push({
      pseudo: userPseudo,
      weeklyPoints: userWeeklyPoints,
      totalPoints: userTotalPoints,
      city: selectedCity,
      userId: userId,
    });
  }

  allEntries.sort((a, b) => b.weeklyPoints - a.weeklyPoints);
  const top50 = allEntries.slice(0, 50);
  const podium = top50.slice(0, 3);
  const rest = top50.slice(3);

  function isCurrentUser(entry: LeaderboardEntry): boolean {
    if (userId && entry.userId) return entry.userId === userId;
    return entry.pseudo === userPseudo && entry.city === userCity;
  }

  // Find user's actual rank if not in top 50
  const userRankIdx = allEntries.findIndex(isCurrentUser);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-sf-text tracking-tight">
          Classement de la semaine
        </h2>
        <p className="text-sm text-sf-text-secondary mt-1">
          Découvrez les meilleurs contributeurs de votre ville
        </p>
      </div>

      {/* City search bar */}
      <div className="relative mb-8" ref={suggestionsRef}>
        <form onSubmit={handleSearchSubmit}>
          <div className="flex items-center bg-white border border-sf-border rounded-sf-lg shadow-sf-sm overflow-hidden focus-within:border-sf-accent/50 focus-within:shadow-sf-md transition-all">
            <svg
              className="w-5 h-5 text-sf-text-light ml-4 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Rechercher une ville..."
              className="flex-1 px-3 py-3.5 text-sm text-sf-text placeholder-sf-text-light outline-none bg-transparent"
            />
            {cityQuery && (
              <button
                type="button"
                onClick={() => {
                  setCityQuery("");
                  setSelectedCity("");
                  setEntries([]);
                  setSuggestions([]);
                }}
                className="p-2 mr-1 text-sf-text-light hover:text-sf-text transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-3.5 bg-sf-accent text-white text-sm font-semibold hover:bg-sf-accent-light transition-colors"
            >
              Rechercher
            </button>
          </div>
        </form>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-sf-border rounded-sf-md shadow-sf-lg z-20 max-h-48 overflow-y-auto">
            {suggestions.map((city) => (
              <button
                key={city}
                onClick={() => selectCity(city)}
                className="w-full text-left px-4 py-2.5 text-sm text-sf-text hover:bg-sf-bg transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5 inline mr-2 text-sf-text-light"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <svg className="w-6 h-6 animate-spin mx-auto text-sf-accent mb-3" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-sf-text-secondary">Chargement du classement...</p>
        </div>
      )}

      {/* Empty state: no city selected */}
      {!loading && !selectedCity && (
        <div className="text-center py-16">
          <svg className="w-12 h-12 mx-auto text-sf-text-light/40 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p className="text-sf-text-secondary text-sm">
            Recherchez une ville pour voir son classement
          </p>
        </div>
      )}

      {/* Empty state: no entries */}
      {!loading && selectedCity && top50.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sf-text-light text-4xl mb-3">:/</p>
          <p className="text-sm text-sf-text-secondary">
            Aucun contributeur cette semaine à <strong>{selectedCity}</strong>.
          </p>
          <p className="text-xs text-sf-text-light mt-1">
            Soyez le premier à voter !
          </p>
        </div>
      )}

      {/* Results */}
      {!loading && selectedCity && top50.length > 0 && (
        <div className="animate-fade-in-up">
          {/* Week badge */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm text-sf-text-secondary">
              <strong className="text-sf-text font-semibold">{selectedCity}</strong>
              {" "}&middot; {top50.length} contributeur{top50.length > 1 ? "s" : ""}
            </span>
            <span className="text-[11px] bg-sf-gold-light text-sf-gold px-2.5 py-1 rounded-full font-semibold">
              Cette semaine
            </span>
          </div>

          {/* Podium — Top 3 */}
          {podium.length >= 3 && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[1, 0, 2].map((podiumIdx) => {
                const entry = podium[podiumIdx];
                if (!entry) return null;
                const rank = getUserRank(entry.totalPoints);
                const isUser = isCurrentUser(entry);
                const style = PODIUM_STYLES[podiumIdx];
                const isFirst = podiumIdx === 0;

                return (
                  <div
                    key={`podium-${entry.pseudo}-${podiumIdx}`}
                    className={`relative rounded-sf-lg border-2 p-4 text-center transition-all
                               ${style.bg} ${style.border}
                               ${isFirst ? "lg:-mt-4 lg:pb-6" : ""}
                               ${isUser ? "ring-2 ring-sf-accent/30" : ""}`}
                  >
                    <div
                      className={`w-10 h-10 mx-auto rounded-full bg-gradient-to-br ${style.icon}
                                  text-white text-lg font-bold flex items-center justify-center mb-2`}
                    >
                      {podiumIdx + 1}
                    </div>
                    <p className={`font-semibold text-sm truncate ${isUser ? "text-sf-accent" : "text-sf-text"}`}>
                      {entry.pseudo}
                      {isUser && (
                        <span className="ml-1 text-[9px] bg-sf-accent text-white px-1.5 py-0.5 rounded-full">
                          Vous
                        </span>
                      )}
                    </p>
                    <p className={`text-[11px] font-medium ${style.text} mt-0.5`}>
                      {rank.title}
                    </p>
                    <p className="text-lg font-bold text-sf-text mt-1">
                      {entry.weeklyPoints}
                      <span className="text-[10px] text-sf-text-light font-normal ml-0.5">pts</span>
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Table — positions 4+ (or all if < 3 entries) */}
          <div className="bg-white border border-sf-border rounded-sf-lg overflow-hidden shadow-sf-sm">
            {/* Header */}
            <div className="grid grid-cols-[40px_1fr_80px_80px] sm:grid-cols-[50px_1fr_100px_100px] px-4 py-2.5 bg-sf-bg text-[11px] font-semibold text-sf-text-light uppercase tracking-wider border-b border-sf-border">
              <span>#</span>
              <span>Joueur</span>
              <span className="text-right">Semaine</span>
              <span className="text-right">Total</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-sf-border/50">
              {(podium.length >= 3 ? rest : top50).map((entry, i) => {
                const globalIdx = podium.length >= 3 ? i + 3 : i;
                const rank = getUserRank(entry.totalPoints);
                const isUser = isCurrentUser(entry);
                const isExpanded = expandedIdx === globalIdx;

                return (
                  <div key={`row-${entry.pseudo}-${globalIdx}`}>
                    <button
                      onClick={() => setExpandedIdx(isExpanded ? null : globalIdx)}
                      className={`w-full grid grid-cols-[40px_1fr_80px_80px] sm:grid-cols-[50px_1fr_100px_100px] items-center px-4 py-3 text-left text-sm
                                  transition-colors cursor-pointer
                                  ${isUser
                                    ? "bg-sf-accent-pale border-l-4 border-sf-accent"
                                    : "hover:bg-sf-bg border-l-4 border-transparent"
                                  }`}
                    >
                      {/* Rank */}
                      <span className="text-sf-text-light font-semibold text-xs">
                        {globalIdx + 1}
                      </span>

                      {/* Name + tier */}
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                          style={{ background: isUser ? "#C45D3E" : "#9CA3AF" }}
                        >
                          {entry.pseudo.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <span className={`block truncate ${isUser ? "font-semibold text-sf-accent" : "text-sf-text"}`}>
                            {entry.pseudo}
                            {isUser && (
                              <span className="ml-1.5 text-[9px] bg-sf-accent text-white px-1.5 py-0.5 rounded-full">
                                Vous
                              </span>
                            )}
                          </span>
                          <span className="block text-[10px] text-sf-text-light truncate">
                            {rank.title}
                          </span>
                        </div>
                      </div>

                      {/* Weekly pts */}
                      <span className="text-right font-semibold text-sf-text tabular-nums">
                        {entry.weeklyPoints}
                        <span className="text-[10px] text-sf-text-light font-normal ml-0.5">pts</span>
                      </span>

                      {/* Total pts */}
                      <span className="text-right text-sf-text-secondary tabular-nums text-xs">
                        {entry.totalPoints}
                      </span>
                    </button>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="px-4 pb-3 pl-16 sm:pl-20 grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-sf-text-secondary border-l-4 border-transparent">
                        <span>Niveau</span>
                        <span className="font-medium text-sf-text">{rank.level}</span>
                        <span>Palier</span>
                        <span className="font-medium text-sf-text">{rank.palier}</span>
                        <span>Titre</span>
                        <span className="font-medium text-sf-text">{rank.title}</span>
                        <span>Points totaux</span>
                        <span className="font-medium text-sf-text">{entry.totalPoints}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* User not in top 50 — sticky footer */}
          {!userInList && userWeeklyPoints > 0 && selectedCity === userCity && userRankIdx >= 50 && (
            <div className="mt-4 bg-sf-accent-pale border border-sf-accent/20 rounded-sf-lg px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-sf-accent">
                  #{userRankIdx + 1}
                </span>
                <span className="text-sm text-sf-text font-medium">
                  {userPseudo}
                  <span className="ml-1.5 text-[9px] bg-sf-accent text-white px-1.5 py-0.5 rounded-full">
                    Vous
                  </span>
                </span>
              </div>
              <span className="text-sm font-semibold text-sf-text">
                {userWeeklyPoints}
                <span className="text-[10px] text-sf-text-light font-normal ml-0.5">pts</span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
