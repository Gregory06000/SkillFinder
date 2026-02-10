"use client";

import { useState } from "react";

const RADIUS_OPTIONS = [
  { value: 5, label: "5 km" },
  { value: 10, label: "10 km" },
  { value: 25, label: "25 km" },
  { value: 50, label: "50 km" },
];

interface SearchBarProps {
  onSearch: (service: string, keyword: string, location: string, radiusKm: number) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [service, setService] = useState("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [radiusKm, setRadiusKm] = useState(10);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (service.trim() && keyword.trim()) {
      onSearch(service.trim(), keyword.trim(), location.trim(), radiusKm);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Row 1: Service + Keyword */}
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

      {/* Row 2: Location + Radius */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Ville ou adresse
            <span className="text-gray-400 font-normal ml-1">(optionnel)</span>
          </label>
          <input
            id="location"
            type="text"
            placeholder="ex: Nice, Paris 15e, 12 rue de la Paix"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                       focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
                       outline-none transition-colors"
          />
        </div>
        <div className="w-full sm:w-36">
          <label
            htmlFor="radius"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Rayon
          </label>
          <select
            id="radius"
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                       focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
                       outline-none transition-colors bg-white"
          >
            {RADIUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
