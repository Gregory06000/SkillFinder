"use client";

import { useState, useCallback, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const FAVORITES_KEY = "sf_favorites";
const MAX_FAVORITES = 50;

export interface FavoriteItem {
  name: string;
  address: string;
  matchScore: number;
  globalRating: number;
  photoName: string;
  mapsUrl: string;
  addedAt: number;
  keyword?: string;
  location?: string;
}

function loadFavorites(): FavoriteItem[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(items: FavoriteItem[]) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items.slice(0, MAX_FAVORITES)));
  } catch {}
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => loadFavorites());

  // Persist on change
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const isFavorite = useCallback(
    (name: string) => favorites.some((f) => f.name === name),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (item: Omit<FavoriteItem, "addedAt">) => {
      setFavorites((prev) => {
        const exists = prev.some((f) => f.name === item.name);
        if (exists) {
          return prev.filter((f) => f.name !== item.name);
        }
        trackEvent("Favorite", { name: item.name });
        return [{ ...item, addedAt: Date.now() }, ...prev].slice(0, MAX_FAVORITES);
      });
    },
    [],
  );

  const removeFavorite = useCallback((name: string) => {
    setFavorites((prev) => prev.filter((f) => f.name !== name));
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
  };
}
