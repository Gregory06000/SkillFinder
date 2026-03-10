"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "@/lib/i18n";

const CONSENT_KEY = "sf_cookie_consent";

export default function CookieBanner() {
  const { t } = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY) === null) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "1");
    window.dispatchEvent(new CustomEvent("sf:consent"));
    setVisible(false);
  }

  function refuse() {
    localStorage.setItem(CONSENT_KEY, "0");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("cookie.label")}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg px-4 py-4"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-600 flex-1 leading-relaxed">
          {t("cookie.message")}{" "}
          <Link href="/confidentialite" className="text-[#C45D3E] hover:underline underline-offset-2">
            {t("cookie.policy")}
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={refuse}
            className="bg-white border border-gray-300 hover:border-gray-400 text-gray-600 text-sm font-medium px-5 py-2 rounded-full transition-colors"
          >
            {t("cookie.refuse")}
          </button>
          <button
            onClick={accept}
            className="bg-[#C45D3E] hover:bg-[#a84c32] text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
          >
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
