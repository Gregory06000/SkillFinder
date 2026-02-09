"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ResultCard from "@/components/ResultCard";
import { searchBusinesses, type BusinessResult } from "@/lib/api";

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
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {lastSearch && results.length > 0 && (
        <p className="text-sm text-gray-500">
          Résultats pour <strong>{lastSearch.keyword}</strong> dans la catégorie{" "}
          <strong>{lastSearch.service}</strong> :
        </p>
      )}

      {lastSearch && results.length === 0 && !isLoading && !error && (
        <p className="text-sm text-gray-500 text-center py-8">
          Aucun résultat trouvé.
        </p>
      )}

      <div className="space-y-3">
        {results.map((result, i) => (
          <ResultCard key={result.name} result={result} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}
