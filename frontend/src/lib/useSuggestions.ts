"use client";

import { useMemo } from "react";
import type { BusinessResult } from "@/lib/api";
import type { FavoriteItem } from "@/lib/useFavorites";

export interface Suggestion {
  result: BusinessResult;
  beatsName: string;
  beatsScore: number;
  newScore: number;
  keyword: string;
}

/**
 * Compare current search results against favorites.
 * Returns suggestions when a non-favorited result scores higher
 * than a saved favorite for the same keyword.
 */
export function useSuggestions(
  results: BusinessResult[],
  favorites: FavoriteItem[],
  currentKeyword: string | undefined,
  isFavorite: (name: string) => boolean,
): Suggestion[] {
  return useMemo(() => {
    if (!currentKeyword || results.length === 0 || favorites.length === 0) return [];

    const kw = currentKeyword.toLowerCase().trim();
    if (!kw) return [];

    // Find favorites that were saved for this keyword
    const matchingFavs = favorites.filter(
      (f) => f.keyword && f.keyword.toLowerCase().trim() === kw,
    );
    if (matchingFavs.length === 0) return [];

    // Best favorite score for this keyword
    const bestFavScore = Math.max(...matchingFavs.map((f) => f.matchScore));
    // The favorite with that score
    const bestFav = matchingFavs.find((f) => f.matchScore === bestFavScore)!;

    const suggestions: Suggestion[] = [];

    for (const result of results) {
      // Skip if already a favorite
      if (isFavorite(result.name)) continue;
      // Only suggest if result scores higher than the best favorite
      if (result.match_score > bestFavScore) {
        suggestions.push({
          result,
          beatsName: bestFav.name,
          beatsScore: bestFavScore,
          newScore: result.match_score,
          keyword: currentKeyword,
        });
      }
    }

    // Sort by score difference descending, limit to 3
    suggestions.sort((a, b) => (b.newScore - b.beatsScore) - (a.newScore - a.beatsScore));
    return suggestions.slice(0, 3);
  }, [results, favorites, currentKeyword, isFavorite]);
}
