"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (service: string, keyword: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [service, setService] = useState("");
  const [keyword, setKeyword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (service.trim() && keyword.trim()) {
      onSearch(service.trim(), keyword.trim());
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label
            htmlFor="service"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Service
          </label>
          <input
            id="service"
            type="text"
            placeholder="ex: Coiffeur, Pizzeria"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                       focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
                       outline-none transition-colors"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="keyword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Critère spécifique
          </label>
          <input
            id="keyword"
            type="text"
            placeholder="ex: Permanente, Pâte fine"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                       focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
                       outline-none transition-colors"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading || !service.trim() || !keyword.trim()}
        className="w-full sm:w-auto rounded-lg bg-brand-600 px-6 py-2.5 text-sm
                   font-semibold text-white hover:bg-brand-700
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
      >
        {isLoading ? "Recherche..." : "Trouver le meilleur"}
      </button>
    </form>
  );
}
