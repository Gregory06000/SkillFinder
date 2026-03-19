"use client";

import { getPhotoUrl } from "@/lib/api";
import { useT } from "@/lib/i18n";
import { useState } from "react";

interface Props {
  params: Record<string, string | undefined>;
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <span className="inline-flex gap-px">
      {Array.from({ length: full }, (_, i) => (
        <span key={`f${i}`} className="text-sf-gold text-base">&#9733;</span>
      ))}
      {hasHalf && <span className="text-sf-gold text-base opacity-60">&#9733;</span>}
      {Array.from({ length: empty }, (_, i) => (
        <span key={`e${i}`} className="text-sf-border text-base">&#9733;</span>
      ))}
    </span>
  );
}

export default function SharePageClient({ params }: Props) {
  const { t } = useT();
  const [imgError, setImgError] = useState(false);

  const name = params.name || "Commerce";
  const score = parseFloat(params.score || "0");
  const rating = parseFloat(params.rating || "0");
  const address = params.address || "";
  const keyword = params.keyword || "";
  const photo = params.photo || "";
  const maps = params.maps || "";

  const hasPhoto = photo && !imgError;

  const searchUrl = keyword
    ? `/?service=${encodeURIComponent(keyword)}&city=${encodeURIComponent(address.split(",").pop()?.trim() || "")}`
    : "/";

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-5 py-12">
      {/* Card */}
      <div className="w-full max-w-md bg-sf-card border border-sf-border rounded-sf-lg overflow-hidden shadow-sf-md animate-fade-in-up">
        {/* Photo */}
        {hasPhoto && (
          <div className="h-[180px] overflow-hidden bg-sf-bg">
            <img
              src={getPhotoUrl(photo)}
              alt={name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="min-w-0 flex-1">
              <h1 className="font-serif text-2xl font-bold text-sf-text leading-tight">
                {name}
              </h1>
              {address && (
                <div className="flex items-center gap-1 mt-1.5 text-sm text-sf-text-secondary">
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="truncate">{address}</span>
                </div>
              )}
            </div>
            {score > 0 && (
              <div className="flex-shrink-0 flex flex-col items-center gap-0.5">
                <span className="text-3xl font-bold text-sf-accent leading-none tabular-nums">
                  {score.toFixed(1)}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-sf-text-light">
                  Score
                </span>
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {rating > 0 && (
              <div className="inline-flex items-center gap-1.5 text-sm text-sf-text-secondary font-medium">
                <StarRating rating={rating} />
                {rating.toFixed(1)}/5
              </div>
            )}
            {keyword && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sf-accent-pale text-sf-accent text-xs font-medium">
                {keyword}
              </span>
            )}
          </div>

          {/* Shared via SkillFinder badge */}
          <div className="flex items-center gap-2 mb-5 px-3 py-2 bg-sf-bg rounded-sf-sm">
            <div className="w-6 h-6 bg-sf-accent rounded-[6px] flex items-center justify-center text-white font-bold text-[10px]">
              SF
            </div>
            <span className="text-xs text-sf-text-secondary">
              {t("share.badge")}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5">
            <a
              href={searchUrl}
              className="w-full py-3 bg-sf-accent text-white text-sm font-semibold rounded-sf-md
                         text-center hover:bg-sf-accent-light transition-colors"
            >
              {t("share.cta")}
            </a>
            {maps && (
              <a
                href={maps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-sf-card border border-sf-border text-sf-text-secondary text-sm
                           font-medium rounded-sf-md text-center hover:border-sf-text-light transition-colors"
              >
                {t("share.maps")}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <p className="mt-6 text-sm text-sf-text-light text-center max-w-sm">
        {t("share.footer")}
      </p>
    </div>
  );
}
