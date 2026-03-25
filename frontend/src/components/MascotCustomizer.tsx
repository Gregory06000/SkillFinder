"use client";

import { useState } from "react";
import type { MascotCustomization, ItemCategory } from "@/lib/mascotItems";
import { getItemsByCategory, isItemUnlocked } from "@/lib/mascotItems";
import { useT } from "@/lib/i18n";

interface MascotCustomizerProps {
  customization: MascotCustomization;
  userTier: number;
  onChange: (custom: MascotCustomization) => void;
  onPreview?: (custom: MascotCustomization | null) => void;
}

const CATEGORIES: { key: ItemCategory; labelKey: string; icon: string }[] = [
  { key: "hat", labelKey: "mascot.cat.hat", icon: "🎩" },
  { key: "scarf", labelKey: "mascot.cat.scarf", icon: "🧣" },
  { key: "accessory", labelKey: "mascot.cat.accessory", icon: "👜" },
  { key: "boots", labelKey: "mascot.cat.boots", icon: "👢" },
];

export default function MascotCustomizer({
  customization,
  userTier,
  onChange,
  onPreview,
}: MascotCustomizerProps) {
  const { t } = useT();
  const [activeCategory, setActiveCategory] = useState<ItemCategory>("hat");
  const [previewingId, setPreviewingId] = useState<string | null>(null);

  const items = getItemsByCategory(activeCategory);
  const currentEquipped = customization[activeCategory];

  function handleSelect(itemId: string) {
    onChange({ ...customization, [activeCategory]: itemId });
    setPreviewingId(null);
    onPreview?.(null);
  }

  function handlePreviewToggle(itemId: string) {
    if (previewingId === itemId) {
      setPreviewingId(null);
      onPreview?.(null);
    } else {
      setPreviewingId(itemId);
      onPreview?.({ ...customization, [activeCategory]: itemId });
    }
  }

  return (
    <div>
      {/* Premium shimmer animation */}
      <style>{`
        @keyframes premium-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .premium-card {
          position: relative;
          overflow: hidden;
        }
        .premium-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(212, 168, 83, 0.08) 45%,
            rgba(212, 168, 83, 0.15) 50%,
            rgba(212, 168, 83, 0.08) 55%,
            transparent 70%
          );
          background-size: 200% 100%;
          animation: premium-shimmer 4s ease-in-out infinite;
          pointer-events: none;
          border-radius: inherit;
          z-index: 1;
        }
        .premium-glow {
          box-shadow: 0 0 8px rgba(212, 168, 83, 0.25), inset 0 1px 0 rgba(212, 168, 83, 0.15);
        }
        .premium-glow:hover {
          box-shadow: 0 0 12px rgba(212, 168, 83, 0.4), inset 0 1px 0 rgba(212, 168, 83, 0.2);
        }
      `}</style>

      {/* Category tabs */}
      <div className="flex gap-1 mb-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              setPreviewingId(null);
              onPreview?.(null);
            }}
            className={`flex-1 text-center py-1.5 rounded-sf-sm text-xs font-medium transition-colors
                        ${activeCategory === cat.key
                          ? "bg-sf-accent text-white"
                          : "bg-sf-bg text-sf-text-secondary hover:bg-sf-border"}`}
          >
            <span className="mr-0.5">{cat.icon}</span>
            {t(cat.labelKey)}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-4 gap-1.5">
        {items.map((item) => {
          const unlocked = isItemUnlocked(item, userTier);
          const equipped = currentEquipped === item.id;
          const isPremium = item.tier === null;
          const isHighTier = (item.tier ?? 0) >= 9;
          const isPreviewing = previewingId === item.id;

          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => unlocked && handleSelect(item.id)}
                disabled={!unlocked && !isPremium}
                className={`relative w-full rounded-sf-sm p-2 text-center transition-all border
                            ${isPremium && !equipped ? "premium-card premium-glow" : ""}
                            ${equipped
                              ? "border-sf-accent bg-sf-accent-pale ring-1 ring-sf-accent/30"
                              : isPreviewing
                                ? "border-sf-gold bg-sf-gold-light ring-1 ring-sf-gold/30"
                                : unlocked
                                  ? "border-sf-border bg-sf-bg hover:border-sf-accent/40 hover:bg-sf-accent-pale/50 cursor-pointer"
                                  : isPremium
                                    ? "border-sf-gold bg-gradient-to-b from-sf-gold-light to-sf-bg cursor-default"
                                    : "border-sf-border bg-sf-bg opacity-50 cursor-not-allowed"}`}
                title={unlocked ? t(item.nameKey) : isPremium ? `${item.price?.toFixed(2)} EUR` : t("mascot.locked", { tier: item.tier || 0 })}
              >
                <div className="text-lg leading-none relative z-[2]">{item.preview}</div>
                <div className={`text-[9px] mt-0.5 leading-tight truncate relative z-[2] ${isPremium && !unlocked ? "text-sf-gold font-semibold" : isHighTier && !unlocked ? "text-sf-accent font-medium" : "text-sf-text-secondary"}`}>
                  {t(item.nameKey)}
                </div>
                {/* Lock badge (tier-locked) */}
                {!unlocked && !isPremium && (
                  <div className="absolute -top-1 -right-1 text-[8px] font-bold rounded-full px-1 py-0.5 leading-none bg-sf-text text-white z-[3]">
                    <svg className="w-2.5 h-2.5 inline" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {/* Premium diamond badge with price */}
                {isPremium && !unlocked && !isPreviewing && (
                  <div className="absolute -top-1.5 -right-1.5 flex items-center gap-0.5 text-[7px] font-bold rounded-full pl-1 pr-1.5 py-0.5 leading-none bg-gradient-to-r from-yellow-500 to-sf-gold text-white shadow-md z-[3]">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0L10.2 5.6L16 6.4L12 10.8L12.8 16L8 13.2L3.2 16L4 10.8L0 6.4L5.8 5.6Z"/>
                    </svg>
                    {item.price}&euro;
                  </div>
                )}
                {/* Equipped check */}
                {equipped && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sf-accent text-white flex items-center justify-center z-[3]">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>

              {/* Preview eye button for premium items */}
              {isPremium && !equipped && (
                <button
                  onClick={() => handlePreviewToggle(item.id)}
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center transition-all shadow-sm z-[3]
                              ${isPreviewing
                                ? "bg-sf-gold text-white"
                                : "bg-sf-card border border-sf-border text-sf-text-light hover:text-sf-gold hover:border-sf-gold/40"}`}
                  title={t("mascot.preview")}
                >
                  <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Preview indicator */}
      {previewingId && (
        <div className="mt-2 text-center text-[10px] text-sf-gold font-medium animate-pulse">
          {t("mascot.previewing")}
        </div>
      )}
    </div>
  );
}
