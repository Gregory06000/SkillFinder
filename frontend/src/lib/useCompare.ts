"use client";

import { useState, useCallback } from "react";
import {
  compareBusinesses,
  type BusinessResult,
  type CompareResponse,
} from "@/lib/api";

export function useCompare() {
  const [compareSet, setCompareSet] = useState<Set<number>>(new Set());
  const [showCompare, setShowCompare] = useState(false);
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareData, setCompareData] = useState<CompareResponse | null>(null);
  const [compareError, setCompareError] = useState<string | null>(null);

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

  async function handleCompare(
    keyword: string,
    results: BusinessResult[],
    locale: string = "fr",
  ) {
    if (compareSet.size !== 2) return;
    const [i1, i2] = Array.from(compareSet);
    const biz1 = results[i1];
    const biz2 = results[i2];

    setShowCompare(true);
    setCompareLoading(true);
    setCompareData(null);
    setCompareError(null);

    try {
      const data = await compareBusinesses(keyword, biz1, biz2, locale);
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

  async function compareDirect(
    keyword: string,
    biz1: BusinessResult,
    biz2: BusinessResult,
    locale: string = "fr",
  ) {
    setShowCompare(true);
    setCompareLoading(true);
    setCompareData(null);
    setCompareError(null);

    try {
      const data = await compareBusinesses(keyword, biz1, biz2, locale);
      setCompareData(data);
    } catch (err) {
      setCompareError(
        err instanceof Error ? err.message : "Erreur lors de la comparaison",
      );
    } finally {
      setCompareLoading(false);
    }
  }

  function resetCompare() {
    setCompareSet(new Set());
  }

  return {
    compareSet,
    showCompare,
    compareLoading,
    compareData,
    compareError,
    handleCompareToggle,
    handleCompare,
    compareDirect,
    handleCloseCompare,
    resetCompare,
  };
}
