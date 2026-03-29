"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";

const DISMISS_KEY = "sf_pwa_dismissed";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaInstallBanner() {
  const { t } = useT();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed or already installed (standalone)
    if (localStorage.getItem(DISMISS_KEY)) return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    function handlePrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    }

    window.addEventListener("beforeinstallprompt", handlePrompt);
    return () => window.removeEventListener("beforeinstallprompt", handlePrompt);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setVisible(false);
    }
    setDeferredPrompt(null);
  }

  function handleDismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 sm:left-auto sm:right-4 sm:max-w-sm
                    bg-sf-card border border-sf-border rounded-2xl shadow-lg p-4
                    animate-fade-in-up">
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #C45D3E, #E8805F)" }}
        >
          SF
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-sf-text">{t("pwa.title")}</p>
          <p className="text-xs text-sf-text-secondary mt-0.5">{t("pwa.description")}</p>
          <div className="flex gap-2 mt-2.5">
            <button
              onClick={handleInstall}
              className="px-3.5 py-1.5 bg-sf-accent text-white text-xs font-medium rounded-full
                         hover:bg-sf-accent-light transition-colors"
            >
              {t("pwa.install")}
            </button>
            <button
              onClick={handleDismiss}
              className="px-3.5 py-1.5 text-xs text-sf-text-secondary hover:text-sf-text transition-colors"
            >
              {t("pwa.later")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
