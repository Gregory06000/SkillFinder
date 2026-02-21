// Plausible Analytics — privacy-first, cookie-free, RGPD compliant
// Custom events are sent only if the Plausible script is loaded.
// https://plausible.io/docs/custom-event-goals

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
  if (typeof window !== "undefined" && typeof window.plausible === "function") {
    window.plausible(event, props ? { props } : undefined);
  }
}
