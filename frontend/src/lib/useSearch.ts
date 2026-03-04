"use client";

import { useState, useMemo, useEffect } from "react";
import {
  searchBusinesses,
  type BusinessResult,
} from "@/lib/api";

export type SortMode = "match" | "distance" | "rating";

const SEARCH_CACHE_KEY = "sf_last_search";
const HISTORY_KEY = "sf_search_history";
const PAGE_SIZE = 5;
const MAX_HISTORY = 10;

export interface SearchHistoryEntry {
  service: string;
  keyword: string;
  location: string;
  radiusKm: number;
  timestamp: number;
}

export interface SearchFilters {
  minRating: number; // 0 = no filter
  maxDistance: number; // 0 = no filter (km)
}

interface CachedSearch {
  results: BusinessResult[];
  lastSearch: { service: string; keyword: string; location?: string; radiusKm?: number } | null;
  searchCenter: { lat: number; lng: number } | null;
  searchRadiusKm: number | null;
}

function loadHistory(): SearchHistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(entries: SearchHistoryEntry[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, MAX_HISTORY)));
  } catch {}
}

export function useSearch() {
  const [results, setResults] = useState<BusinessResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearch, setLastSearch] = useState<{
    service: string;
    keyword: string;
    location?: string;
    radiusKm?: number;
  } | null>(null);
  const [searchCenter, setSearchCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchRadiusKm, setSearchRadiusKm] = useState<number | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("match");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filters, setFilters] = useState<SearchFilters>({ minRating: 0, maxDistance: 0 });
  const [history, setHistory] = useState<SearchHistoryEntry[]>([]);

  // Load history from localStorage on mount (avoids SSR hydration mismatch)
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // Restore last search from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SEARCH_CACHE_KEY);
      if (raw) {
        const cached: CachedSearch = JSON.parse(raw);
        if (cached.results?.length > 0) {
          setResults(cached.results);
          setLastSearch(cached.lastSearch);
          setSearchCenter(cached.searchCenter);
          setSearchRadiusKm(cached.searchRadiusKm);
        }
      }
    } catch {
      // Ignore corrupt cache
    }
  }, []);

  // Persist search results to localStorage
  useEffect(() => {
    if (results.length > 0) {
      try {
        const cache: CachedSearch = {
          results,
          lastSearch,
          searchCenter,
          searchRadiusKm,
        };
        localStorage.setItem(SEARCH_CACHE_KEY, JSON.stringify(cache));
      } catch {
        // localStorage full or unavailable
      }
    }
  }, [results, lastSearch, searchCenter, searchRadiusKm]);

  const sortedResults = useMemo(() => {
    let copy = [...results];
    // Apply filters
    if (filters.minRating > 0) {
      copy = copy.filter((r) => r.global_rating >= filters.minRating);
    }
    if (filters.maxDistance > 0) {
      copy = copy.filter((r) => r.distance_km != null && r.distance_km <= filters.maxDistance);
    }
    // Sort
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
  }, [results, sortMode, filters]);

  const paginatedResults = useMemo(
    () => sortedResults.slice(0, visibleCount),
    [sortedResults, visibleCount],
  );
  const canShowMore = visibleCount < sortedResults.length;

  const hasResults = results.length > 0 && !isLoading;
  const hasCoords = results.some((r) => r.lat != null && r.lng != null);
  const showMap = hasResults && hasCoords;

  async function handleSearch(
    service: string,
    keyword: string,
    location: string,
    radiusKm: number,
    locale: string = "fr",
  ) {
    setIsLoading(true);
    setError(null);
    setResults([]);
    setSortMode(keyword.trim() ? "match" : "rating");
    setVisibleCount(PAGE_SIZE);
    setFilters({ minRating: 0, maxDistance: 0 });

    try {
      const data = await searchBusinesses(service, keyword, location, radiusKm, [], locale);
      setResults(data.results);
      setLastSearch({ service, keyword, location, radiusKm });

      // Save to history (dedup by service+keyword+location)
      const entry: SearchHistoryEntry = {
        service,
        keyword,
        location,
        radiusKm,
        timestamp: Date.now(),
      };
      const newHistory = [entry, ...history.filter(
        (h) => !(h.service === service && h.keyword === keyword && h.location === location),
      )].slice(0, MAX_HISTORY);
      setHistory(newHistory);
      saveHistory(newHistory);
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

  function resetSearch() {
    setResults([]);
    setLastSearch(null);
    setSearchCenter(null);
    setSearchRadiusKm(null);
    setError(null);
    setSortMode("match");
    localStorage.removeItem(SEARCH_CACHE_KEY);
  }

  function showMore() {
    setVisibleCount((c) => c + PAGE_SIZE);
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }

  return {
    results,
    setResults,
    isLoading,
    error,
    lastSearch,
    searchCenter,
    searchRadiusKm,
    sortMode,
    setSortMode,
    sortedResults,
    paginatedResults,
    canShowMore,
    showMore,
    filters,
    setFilters,
    history,
    clearHistory,
    hasResults,
    showMap,
    handleSearch,
    resetSearch,
  };
}
