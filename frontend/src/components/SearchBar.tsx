"use client";

import { useState } from "react";
import { reverseGeocode } from "@/lib/api";

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
  const [geoLoading, setGeoLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (service.trim() && keyword.trim()) {
      onSearch(service.trim(), keyword.trim(), location.trim(), radiusKm);
    }
  }

  async function handleGetCurrentLocation() {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    setGeoLoading(true);
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 10000,
          });
        }
      );

      const { latitude, longitude } = position.coords;
      const cityName = await reverseGeocode(latitude, longitude);
      setLocation(cityName);
    } catch {
      alert("Impossible d'obtenir votre position. Vérifiez les permissions.");
    } finally {
      setGeoLoading(false);
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
          <div className="relative">
            <input
              id="location"
              type="text"
              placeholder="ex: Nice, Paris 15e, 12 rue de la Paix"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm
                         focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
                         outline-none transition-colors"
            />
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={geoLoading}
              title="Utiliser ma position"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md
                         text-gray-400 hover:text-brand-600 hover:bg-brand-50
                         disabled:opacity-50 disabled:cursor-wait
                         transition-colors"
            >
              {geoLoading ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                     strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3m0 14v3m10-10h-3M5 12H2" />
                  <circle cx="12" cy="12" r="8" strokeDasharray="2 3" />
                </svg>
              )}
            </button>
          </div>
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
