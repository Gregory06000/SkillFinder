// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://3cbe626f2c60f3684dca86b72dc2f9f2@o4510925392117760.ingest.de.sentry.io/4510925399261264",

  // Do not send personally identifiable information (RGPD compliance)
  sendDefaultPii: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
