"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useT } from "@/lib/i18n";
import { LOCALE_LABELS, ALL_LOCALES, type Locale } from "@/lib/i18n";
import { useAuth } from "@/lib/AuthContext";
import { fetchNotificationPrefs, updateNotificationPrefs } from "@/lib/api";

interface LanguageSelectorProps {
  className?: string;
}

export default function LanguageSelector({ className = "" }: LanguageSelectorProps) {
  const { locale, setLocale } = useT();
  const { user, getAccessToken } = useAuth();

  const syncLocaleToServer = useCallback(async (newLocale: string) => {
    if (!user) return;
    try {
      const token = await getAccessToken();
      if (!token) return;
      const prefs = await fetchNotificationPrefs(token);
      await updateNotificationPrefs(token, prefs, newLocale);
    } catch {}
  }, [user, getAccessToken]);

  const handleSetLocale = useCallback((loc: Locale) => {
    setLocale(loc);
    syncLocaleToServer(loc);
  }, [setLocale, syncLocaleToServer]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = LOCALE_LABELS[locale];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border
                   text-[12px] font-semibold transition-all cursor-pointer
                   bg-sf-card text-sf-text-secondary border-sf-border hover:border-sf-text-light"
      >
        <span>{current.flag}</span>
        <span>{locale.toUpperCase()}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 bg-sf-card border border-sf-border rounded-sf-md shadow-sf-lg z-50 min-w-[140px] py-1 animate-fade-in-up">
          {ALL_LOCALES.map((loc: Locale) => {
            const info = LOCALE_LABELS[loc];
            const isActive = loc === locale;
            return (
              <button
                key={loc}
                onClick={() => {
                  handleSetLocale(loc);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors
                           ${isActive
                             ? "bg-sf-accent-pale text-sf-accent font-semibold"
                             : "text-sf-text hover:bg-sf-bg"
                           }`}
              >
                <span>{info.flag}</span>
                <span>{info.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
