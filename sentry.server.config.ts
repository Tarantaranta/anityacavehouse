// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://2f41544bfacaaaf0d0dc7ccb355b2ac4@o4510920566505472.ingest.de.sentry.io/4510920568340560",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1, // Production'da %10, dev'de %100

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Environment tagging
  environment: process.env.NODE_ENV || 'development',

  // Ignore common noisy errors
  ignoreErrors: [
    'Non-Error promise rejection captured',
    'ResizeObserver loop limit exceeded',
    'cancelled', // User cancelled fetch
  ],

  // Enable sending user PII (Personally Identifiable Information) - GDPR dikkat!
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: false, // GDPR için kapalı tutulmalı
});
