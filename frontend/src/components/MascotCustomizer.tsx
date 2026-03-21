"use client";

import { useState } from "react";
import type { MascotCustomization, ItemCategory } from "@/lib/mascotItems";
import { getItemsByCategory, isItemUnlocked } from "@/lib/mascotItems";
import { useT } from "@/lib/i18n";

interface MascotCustomizerProps {
  customization: MascotCustomization;
  userTier: number;
  onChange: (custom: MascotCustomization) => void;
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
}: MascotCustomizerProps) {
  const { t } = useT();
  const [activeCategory, setActiveCategory] = useState<ItemCategory>("hat");

  const items = getItemsByCategory(activeCategory);
  const currentEquipped = customization[activeCategory];

  function handleSelect(itemId: string) {
    onChange({ ...customization, [activeCategory]: itemId });
  }

  return (
    <div>
      {/* Category tabs */}
      <div className="flex gap-1 mb-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
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

          return (
            <button
              key={item.id}
              onClick={() => unlocked && handleSelect(item.id)}
              disabled={!unlocked}
              className={`relative rounded-sf-sm p-2 text-center transition-all border
                          ${equipped
                            ? "border-sf-accent bg-sf-accent-pale ring-1 ring-sf-accent/30"
                            : unlocked
                              ? "border-sf-border bg-sf-bg hover:border-sf-accent/40 hover:bg-sf-accent-pale/50 cursor-pointer"
                              : "border-sf-border bg-sf-bg opacity-50 cursor-not-allowed"}`}
              title={unlocked ? t(item.nameKey) : isPremium ? `${item.price?.toFixed(2)} EUR` : t("mascot.locked", { tier: item.tier || 0 })}
            >
              <div className="text-lg leading-none">{item.preview}</div>
              <div className="text-[9px] mt-0.5 leading-tight text-sf-text-secondary truncate">
                {t(item.nameKey)}
              </div>
              {/* Lock / price badge */}
              {!unlocked && (
                <div className="absolute -top-1 -right-1 text-[8px] font-bold rounded-full px-1 py-0.5 leading-none
                                bg-sf-text text-white">
                  {isPremium ? `${item.price}\u00A0\u20AC` : (
                    <svg className="w-2.5 h-2.5 inline" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              )}
              {equipped && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sf-accent text-white flex items-center justify-center">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
