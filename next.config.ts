import type { NextConfig } from "next";

// Sensible security headers (also a technical-SEO signal). Applied to all routes.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/**
 * The redesign renames /lead-calculator to /calculator, so the old URL needs a
 * permanent redirect to keep existing links and search results working.
 *
 * It is gated because the destination does not exist yet: the redesign is
 * staged under /public/v2 and /calculator is not a route until it goes live.
 * Shipping the redirect before then would point a working page at a 404. Set
 * NEXT_PUBLIC_NEW_SITE=1 at cutover and it turns on.
 */
const newSiteIsLive = process.env.NEXT_PUBLIC_NEW_SITE === "1";

const nextConfig: NextConfig = {
  // Don't advertise the framework (minor info-leak hardening).
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    if (!newSiteIsLive) return [];
    return [
      { source: "/lead-calculator", destination: "/calculator", permanent: true },
    ];
  },
};

export default nextConfig;
