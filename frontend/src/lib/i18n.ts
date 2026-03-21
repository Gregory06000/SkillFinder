"use client";

import { createContext, useContext } from "react";
import { fr, en, es, de, pt, it, nl } from "./locales";

// -- Supported locales --
export type Locale = "fr" | "en" | "es" | "de" | "pt" | "it" | "nl";

export const LOCALE_LABELS: Record<Locale, { flag: string; label: string }> = {
  fr: { flag: "\ud83c\uddeb\ud83c\uddf7", label: "Fran\u00e7ais" },
  en: { flag: "\ud83c\uddec\ud83c\udde7", label: "English" },
  es: { flag: "\ud83c\uddea\ud83c\uddf8", label: "Espa\u00f1ol" },
  de: { flag: "\ud83c\udde9\ud83c\uddea", label: "Deutsch" },
  pt: { flag: "\ud83c\udde7\ud83c\uddf7", label: "Portugu\u00eas" },
  it: { flag: "\ud83c\uddee\ud83c\uddf9", label: "Italiano" },
  nl: { flag: "\ud83c\uddf3\ud83c\uddf1", label: "Nederlands" },
};

export const ALL_LOCALES = Object.keys(LOCALE_LABELS) as Locale[];

const LOCALE_KEY = "sf_locale";

export function loadLocale(): Locale {
  if (typeof window === "undefined") return "fr";
  const saved = localStorage.getItem(LOCALE_KEY);
  if (saved && ALL_LOCALES.includes(saved as Locale)) return saved as Locale;
  // Auto-detect from browser
  const lang = navigator.language?.slice(0, 2);
  if (ALL_LOCALES.includes(lang as Locale)) return lang as Locale;
  return "fr";
}

export function saveLocale(locale: Locale): void {
  localStorage.setItem(LOCALE_KEY, locale);
}

// -- Translation dictionaries --

type Dict = Record<string, string>;

const dictionaries: Record<Locale, Dict> = { fr, en, es, de, pt, it, nl };

// -- Translation function --

export function t(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  let str = dictionaries[locale]?.[key] ?? dictionaries.fr[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll(`{${k}}`, String(v));
    }
  }
  return str;
}

// -- React Context --

export interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextValue>({
  locale: "fr",
  setLocale: () => {},
  t: (key) => key,
});

export function useT() {
  return useContext(I18nContext);
}
