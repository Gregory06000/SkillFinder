"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import type { BusinessResult } from "@/lib/api";
import { getPhotoUrl } from "@/lib/api";
import { hasVoted as checkVoted } from "@/lib/gamification";

interface ResultCardProps {
  result: BusinessResult;
  rank: number;
  isSelected?: boolean;
  onClick?: () => void;
  isCompareSelected?: boolean;
  onCompareToggle?: () => void;
  compareDisabled?: boolean;
  onVerify?: (placeId: string, vote: "yes" | "no") => void;
  verifyLoading?: boolean;
  showReasoning?: boolean;
}

function renderSnippet(snippet: string) {
  const parts = snippet.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="bg-sf-accent-pale text-sf-accent font-semibold px-0.5 rounded">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <span className="inline-flex gap-px">
      {Array.from({ length: full }, (_, i) => (
        <span key={`f${i}`} className="text-sf-gold text-[13px]">&#9733;</span>
      ))}
      {hasHalf && <span className="text-sf-gold text-[13px] opacity-60">&#9733;</span>}
      {Array.from({ length: empty }, (_, i) => (
        <span key={`e${i}`} className="text-sf-border text-[13px]">&#9733;</span>
      ))}
    </span>
  );
}

function getTimeSince(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "il y a quelques minutes";
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `il y a ${days}j`;
  const months = Math.floor(days / 30);
  return `il y a ${months} mois`;
}

function ResultCard({
  result,
  rank,
  isSelected,
  onClick,
  isCompareSelected,
  onCompareToggle,
  compareDisabled,
  onVerify,
  verifyLoading,
  showReasoning,
}: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const hasPhoto = result.photo_name && !imgError;

  const [hasVoted, setHasVoted] = useState(false);
  useEffect(() => {
    setHasVoted(checkVoted(result.name));
  }, [result.name, result.verification_last]);

  const totalVotes = result.verification_yes + result.verification_no;
  const isVerified =
    result.verification_yes >= 3 &&
    result.verification_yes > result.verification_no;
  const isWarning =
    result.verification_no >= 3 &&
    result.verification_no > result.verification_yes;

  const handleVote = useCallback(
    (vote: "yes" | "no") => {
      if (hasVoted || !onVerify) return;
      onVerify(result.name, vote);
      // Don't set hasVoted here — parent confirms via markVoted() on success
    },
    [hasVoted, onVerify, result.name],
  );

  const snippets =
    result.snippets?.length > 0
      ? result.snippets
      : result.best_snippet
        ? [result.best_snippet]
        : [];
  const isWinner = rank === 1;

  useEffect(() => {
    if (isSelected && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isSelected]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`group bg-white border rounded-sf-lg overflow-hidden
                  transition-all duration-300 cursor-pointer relative
                  animate-fade-in-up
                  ${
                    isSelected
                      ? "border-sf-accent ring-2 ring-sf-accent/20 shadow-sf-hover"
                      : "border-sf-border hover:shadow-sf-hover hover:-translate-y-0.5 hover:border-sf-accent/20"
                  }`}
      style={{ animationDelay: `${rank * 0.1}s` }}
    >
      {/* Rank + badges */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
        <div
          className="w-7 h-7 rounded-full bg-sf-accent text-white text-[13px] font-bold
                      flex items-center justify-center"
          style={{ boxShadow: "0 2px 8px rgba(196,93,62,0.3)" }}
        >
          {rank}
        </div>
        {isWinner && (
          <div
            className="bg-sf-accent text-white text-[11px] font-semibold px-2.5 py-1
                        rounded-full tracking-wide"
            style={{ boxShadow: "0 2px 8px rgba(196,93,62,0.3)" }}
          >
            Meilleur match
          </div>
        )}
        {isVerified && (
          <div className="bg-sf-success text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Vérifié
          </div>
        )}
        {isWarning && (
          <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Contesté
          </div>
        )}
      </div>

      {/* Photo */}
      {hasPhoto && (
        <div className="h-[140px] overflow-hidden bg-sf-bg">
          <img
            src={getPhotoUrl(result.photo_name)}
            alt={result.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      {/* Body */}
      <div className="p-5">
        {/* Top: name + score */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-xl font-semibold text-sf-text leading-tight tracking-tight">
              {result.name}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-[13px] text-sf-text-secondary">
              <svg
                className="w-3.5 h-3.5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="truncate">
                {result.address}
                {result.distance_km != null && ` \u00B7 ${result.distance_km} km`}
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center gap-0.5">
            <span className="text-[28px] font-bold text-sf-accent leading-none tabular-nums">
              {result.match_score.toFixed(1)}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-sf-text-light">
              Match
            </span>
          </div>
        </div>

        {/* Meta tags */}
        <div className="flex items-center gap-3 mb-3.5 flex-wrap">
          <div className="inline-flex items-center gap-1.5 text-xs text-sf-text-secondary font-medium">
            <StarRating rating={result.global_rating} />
            {result.global_rating.toFixed(1)}/5
          </div>
          <div className="inline-flex items-center gap-1 text-xs text-sf-text-secondary font-medium">
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {result.review_count} avis &middot; {result.frequency} mention
            {result.frequency > 1 ? "s" : ""}
          </div>
        </div>

        {/* Review snippet */}
        {snippets.length > 0 && (
          <div className="bg-sf-bg rounded-sf-sm p-3 relative">
            <span className="absolute top-1 left-2.5 font-serif text-[32px] text-sf-accent/50 leading-none select-none">
              &ldquo;
            </span>
            <p className="pl-4 text-[13px] text-sf-text-secondary leading-relaxed italic">
              {renderSnippet(snippets[0])}
            </p>
          </div>
        )}

        {/* Community verification */}
        <div
          className="mt-3 flex items-center gap-2.5 text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-sf-text-secondary font-medium">
            Toujours vrai ?
          </span>
          {hasVoted ? (
            <span className="text-sf-success font-medium animate-fade-in-up">
              Merci pour votre vote !
            </span>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleVote("yes")}
                disabled={verifyLoading}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                           bg-green-50 text-sf-success hover:bg-green-100
                           transition-colors disabled:opacity-50"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                Oui
              </button>
              <button
                onClick={() => handleVote("no")}
                disabled={verifyLoading}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                           bg-red-50 text-red-600 hover:bg-red-100
                           transition-colors disabled:opacity-50"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                </svg>
                Non
              </button>
            </div>
          )}
          {totalVotes > 0 && (
            <span className="text-sf-text-light">
              ({result.verification_yes}/{totalVotes})
              {result.verification_last && (
                <span className="ml-1">
                  &middot; {getTimeSince(result.verification_last)}
                </span>
              )}
            </span>
          )}
        </div>

        {/* AI Reasoning */}
        {showReasoning && result.reasoning && (
          <div className="mt-3 bg-gray-50 rounded-sf-sm px-3 py-2 flex items-start gap-2">
            <svg className="w-3.5 h-3.5 text-sf-text-light flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <p className="text-[11px] text-sf-text-light italic leading-relaxed">
              {result.reasoning}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 pt-3.5 border-t border-sf-border flex items-center justify-between">
          {result.maps_url ? (
            <a
              href={result.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[13px] font-semibold text-sf-accent inline-flex items-center
                         gap-1.5 transition-all hover:gap-2.5"
            >
              Voir le profil
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          ) : (
            <span />
          )}
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {result.maps_url && (
              <a
                href={result.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-sf-border bg-white
                           flex items-center justify-center text-sf-text-light
                           hover:bg-sf-bg hover:text-sf-text hover:border-sf-text-light
                           transition-all"
                title="Google Maps"
              >
                <svg
                  className="w-[15px] h-[15px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>
            )}
            {onCompareToggle && (
              <button
                onClick={onCompareToggle}
                disabled={compareDisabled && !isCompareSelected}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all
                           ${
                             isCompareSelected
                               ? "border-sf-accent bg-sf-accent-pale text-sf-accent"
                               : "border-sf-border bg-white text-sf-text-light hover:bg-sf-bg hover:text-sf-text hover:border-sf-text-light"
                           }
                           disabled:opacity-30 disabled:cursor-not-allowed`}
                title={
                  isCompareSelected
                    ? "Sélectionné pour comparaison"
                    : "Comparer"
                }
              >
                <svg
                  className="w-[15px] h-[15px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ResultCard);
