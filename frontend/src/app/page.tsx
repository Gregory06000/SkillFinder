"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ResultCard from "@/components/ResultCard";
import { searchBusinesses, type BusinessResult } from "@/lib/api";

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

  async function handleSearch(service: string, keyword: string) {
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const data = await searchBusinesses(service, keyword);
      setResults(data.results);
      setLastSearch({ service, keyword });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

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

      {lastSearch && results.length > 0 && !isLoading && (
        <p className="text-sm text-gray-500">
          <strong>{results.length}</strong> résultat{results.length > 1 ? "s" : ""} pour{" "}
          <strong>{lastSearch.keyword}</strong> dans{" "}
          <strong>{lastSearch.service}</strong> :
        </p>
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

      {!isLoading && (
        <div className="space-y-4">
          {results.map((result, i) => (
            <ResultCard key={`${result.name}-${i}`} result={result} rank={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
