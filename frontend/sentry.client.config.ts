import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Only enable if DSN is configured
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Capture 10% of transactions for performance monitoring
  tracesSampleRate: 0.1,

  // Replay: capture 100% of sessions with errors, 1% otherwise
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.01,

  integrations: [
    Sentry.replayIntegration({
      // Mask all text and inputs for privacy
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
