"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";

const CONSENT_KEY = "sf_cookie_consent";

export default function ConditionalAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY) === "1") {
      setConsented(true);
      return;
    }

    function onConsent() {
      setConsented(true);
    }

    // Same-tab: CookieBanner dispatches this event after localStorage.setItem
    window.addEventListener("sf:consent", onConsent);
    // Cross-tab: standard storage event
    function onStorage(e: StorageEvent) {
      if (e.key === CONSENT_KEY && e.newValue === "1") setConsented(true);
    }
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("sf:consent", onConsent);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  if (!consented) return null;
  return <Analytics />;
}
