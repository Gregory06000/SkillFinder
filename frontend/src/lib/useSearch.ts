"use client";

import { useState, useMemo, useEffect } from "react";
import {
  searchBusinesses,
  type BusinessResult,
} from "@/lib/api";

export type SortMode = "match" | "distance" | "rating";

const SEARCH_CACHE_KEY = "sf_last_search";

interface CachedSearch {
  results: BusinessResult[];
  lastSearch: { service: string; keyword: string } | null;
  searchCenter: { lat: number; lng: number } | null;
  searchRadiusKm: number | null;
}

export function useSearch() {
  const [results, setResults] = useState<BusinessResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearch, setLastSearch] = useState<{
    service: string;
    keyword: string;
  } | null>(null);
  const [searchCenter, setSearchCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchRadiusKm, setSearchRadiusKm] = useState<number | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("match");

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

  const hasResults = results.length > 0 && !isLoading;
  const hasCoords = results.some((r) => r.lat != null && r.lng != null);
  const showMap = hasResults && hasCoords;

  async function handleSearch(
    service: string,
    keyword: string,
    location: string,
    radiusKm: number,
  ) {
    setIsLoading(true);
    setError(null);
    setResults([]);
    setSortMode("match");

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
    hasResults,
    showMap,
    handleSearch,
  };
}
