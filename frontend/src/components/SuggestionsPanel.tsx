"use client";

import { useState } from "react";
import type { Suggestion } from "@/lib/useSuggestions";
import { getPhotoUrl } from "@/lib/api";
import { useT } from "@/lib/i18n";

interface SuggestionsPanelProps {
  suggestions: Suggestion[];
  onAddFavorite: (suggestion: Suggestion) => void;
}

export default function SuggestionsPanel({ suggestions, onAddFavorite }: SuggestionsPanelProps) {
  const { t } = useT();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  if (suggestions.length === 0) return null;

  const visible = suggestions.filter((s) => !dismissed.has(s.result.name));
  if (visible.length === 0) return null;

  return (
    <div className="mb-6 animate-fade-in-up">
      <div className="bg-gradient-to-r from-sf-gold-light to-sf-accent-pale border border-sf-gold/30 rounded-sf-lg p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-sf-gold" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <span className="text-sm font-semibold text-sf-text">
            {t("suggest.title")}
          </span>
        </div>

        <div className="space-y-2">
          {visible.map((suggestion) => {
            const diff = Math.round(suggestion.newScore - suggestion.beatsScore);
            return (
              <div
                key={suggestion.result.name}
                className="flex items-center gap-3 bg-sf-card rounded-sf-sm p-3 border border-sf-border"
              >
                {/* Photo */}
                {suggestion.result.photo_name && (
                  <div className="w-10 h-10 rounded-sf-sm overflow-hidden flex-shrink-0">
                    <img
                      src={getPhotoUrl(suggestion.result.photo_name)}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-sf-text truncate">
                    {suggestion.result.name}
                  </div>
                  <div className="text-[11px] text-sf-text-secondary">
                    {t("suggest.beats", {
                      name: suggestion.beatsName,
                      diff: String(diff),
                    })}
                  </div>
                </div>

                {/* Score badge */}
                <div className="flex-shrink-0 text-center">
                  <div className="text-lg font-bold text-sf-success">{Math.round(suggestion.newScore)}</div>
                  <div className="text-[9px] text-sf-text-light uppercase">score</div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={() => onAddFavorite(suggestion)}
                    className="p-1.5 rounded-sf-sm bg-sf-accent text-white hover:bg-sf-accent-light transition-colors"
                    title={t("suggest.addFav")}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDismissed((prev) => new Set([...prev, suggestion.result.name]))}
                    className="p-1.5 rounded-sf-sm text-sf-text-light hover:text-sf-text hover:bg-sf-bg transition-colors"
                    title={t("suggest.dismiss")}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
