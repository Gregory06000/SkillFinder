"use client";

import { useEffect, useState } from "react";
import type { UserRank } from "@/lib/gamification";
import { useT } from "@/lib/i18n";

interface TierUpModalProps {
  rank: UserRank;
  onClose: () => void;
}

export default function TierUpModal({ rank, onClose }: TierUpModalProps) {
  const [visible, setVisible] = useState(false);
  const { t } = useT();

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => setVisible(true));
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center transition-all duration-300
                  ${visible ? "bg-black/40 backdrop-blur-sm" : "bg-transparent"}`}
      onClick={() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }}
    >
      <div
        className={`bg-white rounded-sf-xl shadow-sf-lg p-8 max-w-sm w-full mx-4 text-center
                    transition-all duration-500
                    ${visible ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-4"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Trophy icon */}
        <div
          className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl"
          style={{
            background: "linear-gradient(135deg, #D4A853, #E8C06A)",
            boxShadow: "0 4px 20px rgba(212,168,83,0.4)",
          }}
        >
          &#127942;
        </div>

        <h3 className="font-serif text-2xl font-bold text-sf-text mb-1">
          {t("tierUp.title")}
        </h3>
        <p className="text-lg font-semibold text-sf-accent mb-1">
          {t(rank.titleKey)}
        </p>
        <p className="text-sm text-sf-text-secondary mb-4">
          {t("tierUp.tierLevel", { palier: rank.palier, level: rank.level })}
        </p>

        {/* Progress bar */}
        <div className="h-2 bg-sf-border rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${Math.max(5, rank.progress * 100)}%`,
              background: "linear-gradient(90deg, #D4A853, #E8805F)",
            }}
          />
        </div>

        <p className="text-xs text-sf-text-light mb-5">
          {rank.palier >= 10
            ? t("tierUp.maxReached")
            : t("tierUp.nextAt", { threshold: rank.nextThreshold })}
        </p>

        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="px-6 py-2.5 bg-sf-accent text-white text-sm font-semibold rounded-full
                     hover:bg-sf-accent-light transition-colors"
        >
          {t("tierUp.continue")}
        </button>
      </div>
    </div>
  );
}
