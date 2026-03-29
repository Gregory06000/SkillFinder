import { track } from "@vercel/analytics";

// Unified event tracker — sends to Vercel Analytics (primary)
// and Plausible (if loaded, as secondary/future option).

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

export function trackEvent(
  event: string,
  props?: Record<string, string | number | boolean>,
): void {
  // Vercel Analytics
  try {
    track(event, props);
  } catch {
    // Vercel Analytics not loaded (e.g. no consent yet) — silently skip
  }

  // Plausible (if script loaded)
  if (typeof window !== "undefined" && typeof window.plausible === "function") {
    window.plausible(event, props ? { props } : undefined);
  }
}
