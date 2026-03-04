"use client";

import { useState } from "react";
import { reverseGeocode } from "@/lib/api";
import { useT } from "@/lib/i18n";

const RADIUS_OPTIONS = [
  { value: 5, label: "5 km" },
  { value: 10, label: "10 km" },
  { value: 25, label: "25 km" },
  { value: 50, label: "50 km" },
];

interface SearchBarProps {
  onSearch: (
    service: string,
    keyword: string,
    location: string,
    radiusKm: number,
  ) => void;
  isLoading: boolean;
  initialService?: string;
  initialKeyword?: string;
  initialCity?: string;
}

export default function SearchBar({ onSearch, isLoading, initialService, initialKeyword, initialCity }: SearchBarProps) {
  const { t } = useT();
  const [service, setService] = useState(initialService || "");
  const [keyword, setKeyword] = useState(initialKeyword || "");
  const [location, setLocation] = useState(initialCity || "");
  const [radiusKm, setRadiusKm] = useState(10);
  const [geoLoading, setGeoLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (service.trim()) {
      onSearch(service.trim(), keyword.trim(), location.trim(), radiusKm);
    }
  }

  async function handleGeo() {
    if (!navigator.geolocation) {
      alert(t("search.geoUnsupported"));
      return;
    }
    setGeoLoading(true);
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 10000,
        });
      });
      const city = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
      setLocation(city);
    } catch {
      alert(t("search.geoError"));
    } finally {
      setGeoLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-sf-border rounded-sf-lg p-2
                 flex items-center gap-1 shadow-sf-md transition-shadow
                 focus-within:shadow-sf-lg focus-within:border-sf-accent/25
                 max-w-[900px] flex-col sm:flex-row"
    >
      {/* Service */}
      <div className="flex-1 px-4 py-3 rounded-sf-md hover:bg-sf-bg transition-colors min-w-0 w-full sm:w-auto">
        <label className="block text-[10px] font-semibold uppercase tracking-wider text-sf-text-light">
          {t("search.service")}
        </label>
        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder={t("search.servicePlaceholder")}
          className="w-full bg-transparent border-none outline-none text-sm font-medium
                     text-sf-text placeholder:text-sf-text-light/60"
        />
      </div>

      <div className="hidden sm:block w-px h-9 bg-sf-border flex-shrink-0" />
      <div className="sm:hidden w-full h-px bg-sf-border flex-shrink-0" />

      {/* Keyword */}
      <div className="flex-1 px-4 py-3 rounded-sf-md hover:bg-sf-bg transition-colors min-w-0 w-full sm:w-auto">
        <label className="block text-[10px] font-semibold uppercase tracking-wider text-sf-text-light">
          {t("search.keyword")}
        </label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={t("search.keywordPlaceholder")}
          className="w-full bg-transparent border-none outline-none text-sm font-medium
                     text-sf-text placeholder:text-sf-text-light/60"
        />
      </div>

      <div className="hidden sm:block w-px h-9 bg-sf-border flex-shrink-0" />
      <div className="sm:hidden w-full h-px bg-sf-border flex-shrink-0" />

      {/* Location */}
      <div className="flex-1 px-4 py-3 rounded-sf-md hover:bg-sf-bg transition-colors min-w-0 w-full sm:w-auto">
        <label className="block text-[10px] font-semibold uppercase tracking-wider text-sf-text-light">
          {t("search.city")}
        </label>
        <div className="flex items-center gap-1">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={t("search.cityPlaceholder")}
            className="w-full bg-transparent border-none outline-none text-sm font-medium
                       text-sf-text placeholder:text-sf-text-light/60"
          />
          <button
            type="button"
            onClick={handleGeo}
            disabled={geoLoading}
            aria-label={t("search.geoTitle")}
            title={t("search.geoTitle")}
            className="flex-shrink-0 p-1 rounded-full text-sf-text-light
                       hover:text-sf-accent transition-colors disabled:opacity-50"
          >
            {geoLoading ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3m0 14v3m10-10h-3M5 12H2" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="hidden sm:block w-px h-9 bg-sf-border flex-shrink-0" />
      <div className="sm:hidden w-full h-px bg-sf-border flex-shrink-0" />

      {/* Radius */}
      <div className="px-4 py-3 rounded-sf-md hover:bg-sf-bg transition-colors w-full sm:w-auto sm:max-w-[120px]">
        <label className="block text-[10px] font-semibold uppercase tracking-wider text-sf-text-light">
          {t("search.radius")}
        </label>
        <select
          value={radiusKm}
          onChange={(e) => setRadiusKm(Number(e.target.value))}
          className="bg-transparent border-none outline-none text-sm font-medium
                     text-sf-text cursor-pointer w-full"
        >
          {RADIUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Search button */}
      <button
        type="submit"
        disabled={isLoading || !service.trim()}
        aria-label={t("search.submit")}
        className="flex-shrink-0 w-full sm:w-[52px] h-12 sm:h-[52px] rounded-sf-md
                   bg-sf-accent text-white flex items-center justify-center
                   hover:bg-sf-accent-light hover:scale-[1.04] transition-all
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        )}
      </button>
    </form>
  );
}
