"use client";

import { useState, useRef, useEffect } from "react";
import type { BusinessResult } from "@/lib/api";
import { getPhotoUrl } from "@/lib/api";

interface ResultCardProps {
  result: BusinessResult;
  rank: number;
  isSelected?: boolean;
  onClick?: () => void;
  isCompareSelected?: boolean;
  onCompareToggle?: () => void;
  compareDisabled?: boolean;
}

function renderSnippet(snippet: string) {
  const parts = snippet.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="bg-yellow-200 text-yellow-900 font-semibold px-0.5 rounded">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function ScoreBadge({ score }: { score: number }) {
  let color = "bg-red-100 text-red-700";
  if (score >= 4) color = "bg-green-100 text-green-700";
  else if (score >= 3) color = "bg-yellow-100 text-yellow-700";
  else if (score >= 2) color = "bg-orange-100 text-orange-700";

  return (
    <span className={`text-2xl font-bold px-3 py-1 rounded-lg ${color}`}>
      {score.toFixed(1)}
    </span>
  );
}

export default function ResultCard({
  result, rank, isSelected, onClick,
  isCompareSelected, onCompareToggle, compareDisabled,
}: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const hasPhoto = result.photo_name && !imgError;
  const snippets = result.snippets?.length > 0 ? result.snippets :
    result.best_snippet ? [result.best_snippet] : [];

  useEffect(() => {
    if (isSelected && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isSelected]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`bg-white rounded-xl border overflow-hidden
                    shadow-sm hover:shadow-md transition-all cursor-pointer
                    ${isSelected ? "border-brand-500 ring-2 ring-brand-500/20" : "border-gray-200"}`}
    >
      {/* Cover photo */}
      {hasPhoto && (
        <div className="relative h-40 w-full bg-gray-100">
          <img
            src={getPhotoUrl(result.photo_name)}
            alt={result.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-brand-600
                          text-white flex items-center justify-center text-sm font-bold
                          shadow-lg">
            {rank}
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Rank badge (only if no photo) */}
          {!hasPhoto && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-600 text-white
                            flex items-center justify-center text-sm font-bold">
              {rank}
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900 truncate">
                  {result.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{result.address}</p>
              </div>

              <div className="flex-shrink-0 text-right">
                <ScoreBadge score={result.match_score} />
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">
                  Match Score
                </p>
              </div>
            </div>

            {/* Metadata row */}
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 flex-wrap">
              <span>Note globale : {result.global_rating.toFixed(1)}/5</span>
              <span className="text-gray-300">|</span>
              <span>{result.frequency} mention{result.frequency > 1 ? "s" : ""}</span>
              {result.distance_km != null && (
                <>
                  <span className="text-gray-300">|</span>
                  <span className="text-brand-600 font-medium">
                    à {result.distance_km} km
                  </span>
                </>
              )}
            </div>

            {/* Review snippets */}
            {snippets.length > 0 && (
              <div className="mt-3 space-y-2">
                {snippets.map((snippet, i) => (
                  <blockquote
                    key={i}
                    className="text-sm text-gray-600 italic border-l-2
                               border-brand-500 pl-3 leading-relaxed"
                  >
                    &ldquo;{renderSnippet(snippet)}&rdquo;
                  </blockquote>
                ))}
              </div>
            )}

            {/* Action row */}
            <div className="flex items-center gap-4 mt-3">
              {result.maps_url && (
                <a
                  href={result.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-medium
                             text-brand-600 hover:text-brand-700 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Voir sur Google Maps
                </a>
              )}
              {onCompareToggle && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCompareToggle();
                  }}
                  disabled={compareDisabled && !isCompareSelected}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium
                              transition-colors
                              ${isCompareSelected
                                ? "text-purple-600 hover:text-purple-700"
                                : "text-gray-400 hover:text-gray-600"}
                              disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 111.414 1.414L5.414 15H7a1 1 0 110 2H3a1 1 0 01-1-1v-4zm13.707 4.707a1 1 0 010-1.414L15.414 13H14a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0v-1.586l-2.293 2.293a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {isCompareSelected ? "Sélectionné" : "Comparer"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
