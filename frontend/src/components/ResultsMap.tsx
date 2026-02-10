"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import type { BusinessResult } from "@/lib/api";

interface ResultsMapProps {
  results: BusinessResult[];
  selectedIndex: number | null;
  onSelect: (index: number | null) => void;
  searchCenter?: { lat: number; lng: number } | null;
  searchRadiusKm?: number | null;
}

function scoreColor(score: number): string {
  if (score >= 4) return "#16a34a";   // green-600
  if (score >= 3) return "#ca8a04";   // yellow-600
  if (score >= 2) return "#ea580c";   // orange-600
  return "#dc2626";                   // red-600
}

function scoreBg(score: number): string {
  if (score >= 4) return "#dcfce7";   // green-100
  if (score >= 3) return "#fef9c3";   // yellow-100
  if (score >= 2) return "#ffedd5";   // orange-100
  return "#fee2e2";                   // red-100
}

/** Computes bounds to fit all markers. */
function FitBounds({ results }: { results: BusinessResult[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || results.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    let hasValidCoords = false;

    for (const r of results) {
      if (r.lat != null && r.lng != null) {
        bounds.extend({ lat: r.lat, lng: r.lng });
        hasValidCoords = true;
      }
    }

    if (hasValidCoords) {
      map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
    }
  }, [map, results]);

  return null;
}

function MarkerWithInfo({
  result,
  index,
  isSelected,
  onSelect,
}: {
  result: BusinessResult;
  index: number;
  isSelected: boolean;
  onSelect: (index: number | null) => void;
}) {
  const handleClick = useCallback(() => {
    onSelect(isSelected ? null : index);
  }, [index, isSelected, onSelect]);

  if (result.lat == null || result.lng == null) return null;

  return (
    <>
      <AdvancedMarker
        position={{ lat: result.lat, lng: result.lng }}
        onClick={handleClick}
        zIndex={isSelected ? 100 : index}
      >
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-full shadow-lg border-2 cursor-pointer transition-transform"
          style={{
            backgroundColor: scoreBg(result.match_score),
            borderColor: scoreColor(result.match_score),
            transform: isSelected ? "scale(1.2)" : "scale(1)",
          }}
        >
          <span
            className="text-xs font-bold"
            style={{ color: scoreColor(result.match_score) }}
          >
            {result.match_score.toFixed(1)}
          </span>
        </div>
      </AdvancedMarker>

      {isSelected && (
        <InfoWindow
          position={{ lat: result.lat, lng: result.lng }}
          onCloseClick={() => onSelect(null)}
          pixelOffset={[0, -35]}
        >
          <div className="max-w-[220px] p-1">
            <p className="font-semibold text-sm text-gray-900">{result.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{result.address}</p>
            <div className="flex items-center gap-2 mt-1.5 text-xs">
              <span
                className="font-bold px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: scoreBg(result.match_score),
                  color: scoreColor(result.match_score),
                }}
              >
                {result.match_score.toFixed(1)}
              </span>
              <span className="text-gray-400">
                Note : {result.global_rating.toFixed(1)}/5
              </span>
            </div>
            {result.maps_url && (
              <a
                href={result.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1.5 text-xs text-blue-600 hover:underline"
              >
                Google Maps &rarr;
              </a>
            )}
          </div>
        </InfoWindow>
      )}
    </>
  );
}

/** Draws a blue transparent circle to visualize the search radius. */
function SearchRadiusCircle({
  center,
  radiusKm,
}: {
  center: { lat: number; lng: number };
  radiusKm: number;
}) {
  const map = useMap();
  const circleRef = useRef<google.maps.Circle | null>(null);

  useEffect(() => {
    if (!map) return;

    if (!circleRef.current) {
      circleRef.current = new google.maps.Circle({
        map,
        center,
        radius: radiusKm * 1000,
        fillColor: "#3b82f6",
        fillOpacity: 0.08,
        strokeColor: "#3b82f6",
        strokeOpacity: 0.3,
        strokeWeight: 2,
        clickable: false,
      });
    } else {
      circleRef.current.setCenter(center);
      circleRef.current.setRadius(radiusKm * 1000);
      circleRef.current.setMap(map);
    }

    return () => {
      circleRef.current?.setMap(null);
    };
  }, [map, center, radiusKm]);

  return null;
}

const DEFAULT_CENTER = { lat: 46.603354, lng: 1.888334 }; // France center

export default function ResultsMap({
  results,
  selectedIndex,
  onSelect,
  searchCenter,
  searchRadiusKm,
}: ResultsMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl text-sm text-gray-500">
        Carte indisponible (clé API manquante)
      </div>
    );
  }

  const hasCoords = results.some((r) => r.lat != null && r.lng != null);

  if (!hasCoords) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl text-sm text-gray-500">
        Aucune coordonnée disponible pour afficher la carte
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={6}
        mapId="skillfinder-map"
        gestureHandling="greedy"
        disableDefaultUI={false}
        className="w-full h-full rounded-xl"
      >
        <FitBounds results={results} />
        {searchCenter && searchRadiusKm && (
          <>
            <SearchRadiusCircle center={searchCenter} radiusKm={searchRadiusKm} />
            <AdvancedMarker position={searchCenter} zIndex={0}>
              <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md" />
            </AdvancedMarker>
          </>
        )}
        {results.map((result, i) => (
          <MarkerWithInfo
            key={`${result.name}-${i}`}
            result={result}
            index={i}
            isSelected={selectedIndex === i}
            onSelect={onSelect}
          />
        ))}
      </Map>
    </APIProvider>
  );
}
