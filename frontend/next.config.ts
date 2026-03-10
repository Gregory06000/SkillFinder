import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js needs unsafe-inline for styles; Google Maps needs its CDN
      "script-src 'self' 'unsafe-inline' https://maps.googleapis.com https://maps.gstatic.com https://plausible.io",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Google Maps tiles, Street View, Places photos proxied via backend on Render
      "img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com https://*.google.com https://*.googleusercontent.com https://*.onrender.com",
      // API calls: backend (Render), Supabase, Google APIs, Sentry
      "connect-src 'self' https://*.supabase.co https://maps.googleapis.com https://*.onrender.com https://*.vercel.app https://*.sentry.io https://plausible.io",
      "frame-src 'none'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async rewrites() {
    // In production (Vercel), the frontend calls Render directly via NEXT_PUBLIC_API_URL.
    // The rewrite proxy is only needed for local development.
    if (process.env.NEXT_PUBLIC_API_URL) return [];
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // Sentry org and project — set via env or replace with your values
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT ?? "skillfinder",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces
  widenClientFileUpload: true,

  webpack: {
    // Disable Sentry logger to reduce bundle size
    treeshake: { removeDebugLogging: true },
    // Disable automatic Vercel Cron monitors
    automaticVercelMonitors: false,
  },
});
