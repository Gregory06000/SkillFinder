"use client";

import { useEffect } from "react";
import type { CompareResponse, BusinessAnalysis } from "@/lib/api";
import { useT } from "@/lib/i18n";

interface ComparisonModalProps {
  data: CompareResponse | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

function WinnerBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                     bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase tracking-wide">
      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.741L14.146 7.2 18.5 7.57a1 1 0 01.564 1.736l-3.28 2.8 1.015 4.35a1 1 0 01-1.478 1.072L12 15.863l-3.322 1.665a1 1 0 01-1.478-1.072l1.015-4.35-3.28-2.8a1 1 0 01.564-1.736l4.353-.37 1.18-4.459A1 1 0 0112 2z" clipRule="evenodd" />
      </svg>
      {label}
    </span>
  );
}

function AnalysisColumn({
  name,
  analysis,
  matchScore,
  isWinner,
  labels,
}: {
  name: string;
  analysis: BusinessAnalysis;
  matchScore: number;
  isWinner: boolean;
  labels: { winner: string; strengths: string; weaknesses: string; notIdentified: string; none: string; price: string; vibe: string; speed: string };
}) {
  return (
    <div className={`flex-1 p-4 rounded-xl border ${
      isWinner ? "border-yellow-300 bg-yellow-50/50" : "border-gray-200 bg-white"
    }`}>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 text-sm truncate">{name}</h3>
          {isWinner && <WinnerBadge label={labels.winner} />}
        </div>
        <span className={`text-lg font-bold ${
          matchScore >= 4 ? "text-green-600" :
          matchScore >= 3 ? "text-yellow-600" :
          matchScore >= 2 ? "text-orange-600" : "text-red-600"
        }`}>
          {matchScore.toFixed(1)}/5
        </span>
        <span className="text-xs text-gray-400 ml-1">Match Score</span>
      </div>

      {/* Strengths */}
      <div className="mb-3">
        <p className="text-xs font-medium text-green-700 uppercase tracking-wide mb-1.5">
          {labels.strengths}
        </p>
        {analysis.strengths.length > 0 ? (
          <ul className="space-y-1">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {s}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-400 italic">{labels.notIdentified}</p>
        )}
      </div>

      {/* Weaknesses */}
      <div className="mb-3">
        <p className="text-xs font-medium text-orange-700 uppercase tracking-wide mb-1.5">
          {labels.weaknesses}
        </p>
        {analysis.weaknesses.length > 0 ? (
          <ul className="space-y-1">
            {analysis.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
                <svg className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {w}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-400 italic">{labels.none}</p>
        )}
      </div>

      {/* Metadata grid */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
        <div className="text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">{labels.price}</p>
          <p className="text-sm font-medium text-gray-700 mt-0.5">
            {analysis.price_range || "—"}
          </p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">{labels.vibe}</p>
          <p className="text-sm font-medium text-gray-700 mt-0.5 truncate">
            {analysis.vibe || "—"}
          </p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">{labels.speed}</p>
          <p className="text-sm font-medium text-gray-700 mt-0.5">
            {analysis.service_speed || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ComparisonModal({
  data,
  isLoading,
  error,
  onClose,
}: ComparisonModalProps) {
  const { t } = useT();

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const winner =
    data && data.business_1_match_score !== data.business_2_match_score
      ? data.business_1_match_score > data.business_2_match_score
        ? 1
        : 2
      : 0; // tie

  const labels = {
    winner: t("compare.winner"),
    strengths: t("compare.strengths"),
    weaknesses: t("compare.weaknesses"),
    notIdentified: t("compare.notIdentified"),
    none: t("compare.none"),
    price: t("compare.price"),
    vibe: t("compare.vibe"),
    speed: t("compare.speed"),
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            {t("compare.title")}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600
                       hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <svg className="w-8 h-8 animate-spin text-brand-600" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-sm text-gray-500">{t("compare.loading")}</p>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {data && !isLoading && (
            <>
              {/* Side by side */}
              <div className="flex flex-col sm:flex-row gap-4">
                <AnalysisColumn
                  name={data.business_1_name}
                  analysis={data.business_1_analysis}
                  matchScore={data.business_1_match_score}
                  isWinner={winner === 1}
                  labels={labels}
                />
                <AnalysisColumn
                  name={data.business_2_name}
                  analysis={data.business_2_analysis}
                  matchScore={data.business_2_match_score}
                  isWinner={winner === 2}
                  labels={labels}
                />
              </div>

              {/* Verdict */}
              {data.verdict && (
                <div className="mt-5 p-4 rounded-xl bg-brand-50 border border-brand-200">
                  <p className="text-xs font-medium text-brand-700 uppercase tracking-wide mb-1">
                    {t("compare.verdict")}
                  </p>
                  <p className="text-sm text-brand-900">{data.verdict}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
