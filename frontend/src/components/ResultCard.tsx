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
  onVerify?: (placeId: string, vote: "yes" | "no") => void;
  verifyLoading?: boolean;
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

export default function ResultCard({
  result, rank, isSelected, onClick,
  isCompareSelected, onCompareToggle, compareDisabled,
  onVerify, verifyLoading,
}: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const hasPhoto = result.photo_name && !imgError;

  // Check if user already voted (localStorage)
  const voteKey = `verify_${result.name}`;
  const [hasVoted, setHasVoted] = useState(false);
  useEffect(() => {
    setHasVoted(!!localStorage.getItem(voteKey));
  }, [voteKey]);

  const totalVotes = result.verification_yes + result.verification_no;
  const isVerified = result.verification_yes >= 3 && result.verification_yes > result.verification_no;
  const isWarning = result.verification_no >= 3 && result.verification_no > result.verification_yes;

  function handleVote(vote: "yes" | "no") {
    if (hasVoted || !onVerify) return;
    onVerify(result.name, vote);
    localStorage.setItem(voteKey, vote);
    setHasVoted(true);
  }
  const snippets = result.snippets?.length > 0 ? result.snippets :
    result.best_snippet ? [result.best_snippet] : [];
  const isWinner = rank === 1;

  useEffect(() => {
    if (isSelected && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isSelected]);

  const borderClass = isSelected
    ? "border-brand-500 ring-2 ring-brand-500/20"
    : isWinner
      ? "border-yellow-400 ring-2 ring-yellow-400/20 shadow-md"
      : "border-gray-200";

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`bg-white rounded-xl border overflow-hidden
                    shadow-sm hover:shadow-md transition-all cursor-pointer
                    ${borderClass}`}
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
          <div className={`absolute top-2 left-2 w-8 h-8 rounded-full
                          text-white flex items-center justify-center text-sm font-bold
                          shadow-lg ${isWinner ? "bg-gradient-to-br from-yellow-400 to-amber-500" : "bg-brand-600"}`}>
            {rank}
          </div>
          {isWinner && (
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full
                            bg-gradient-to-r from-yellow-400 to-amber-500
                            text-white text-[10px] font-bold uppercase tracking-wide shadow-lg">
              Meilleur match
            </div>
          )}
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Rank badge (only if no photo) */}
          {!hasPhoto && (
            <div className={`flex-shrink-0 w-8 h-8 rounded-full text-white
                            flex items-center justify-center text-sm font-bold
                            ${isWinner ? "bg-gradient-to-br from-yellow-400 to-amber-500" : "bg-brand-600"}`}>
              {rank}
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {result.name}
                  </h3>
                  {isVerified && (
                    <span className="flex-shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full
                                     bg-green-100 text-green-700 text-[9px] font-bold uppercase tracking-wide"
                          title={`${result.verification_yes} confirmations`}>
                      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Vérifié
                    </span>
                  )}
                  {isWarning && (
                    <span className="flex-shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full
                                     bg-orange-100 text-orange-700 text-[9px] font-bold uppercase tracking-wide"
                          title={`${result.verification_no} signalements`}>
                      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Contesté
                    </span>
                  )}
                  {isWinner && !hasPhoto && (
                    <span className="flex-shrink-0 px-1.5 py-0.5 rounded-full
                                     bg-gradient-to-r from-yellow-400 to-amber-500
                                     text-white text-[9px] font-bold uppercase tracking-wide">
                      Meilleur match
                    </span>
                  )}
                </div>
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

            {/* Community verification */}
            <div className="mt-3 flex items-center gap-3 text-xs" onClick={(e) => e.stopPropagation()}>
              <span className="text-gray-500 font-medium">Toujours vrai ?</span>
              {hasVoted ? (
                <span className="text-gray-400 italic">Merci pour votre vote !</span>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleVote("yes")}
                    disabled={verifyLoading}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                               bg-green-50 text-green-700 hover:bg-green-100
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
                <span className="text-gray-400">
                  ({result.verification_yes}/{totalVotes})
                  {result.verification_last && (
                    <span className="ml-1">&middot; {getTimeSince(result.verification_last)}</span>
                  )}
                </span>
              )}
            </div>

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
