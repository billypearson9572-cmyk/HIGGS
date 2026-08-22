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
/**
 * The redesign is the site. It serves everywhere by default.
 *
 * Rollback without a code change: set NEXT_PUBLIC_LEGACY_SITE=1 in the Vercel
 * project's environment variables and redeploy. Every original route is still
 * present underneath — the redesign is layered over them with rewrites, not a
 * replacement — so the old site comes straight back.
 */
const serveRedesign = process.env.NEXT_PUBLIC_LEGACY_SITE !== "1";

/** /lead-calculator was renamed to /calculator; the old URL must keep working. */
const newSiteIsLive = serveRedesign;

/** Pages of the redesign, as they are named under public/v2. */
const redesignPages = [
  "index",
  "services",
  "calculator",
  "about",
  "blog",
  "podcast",
  "contact",
  "privacy",
];

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
  async rewrites() {
    if (!serveRedesign) return { beforeFiles: [], afterFiles: [], fallback: [] };
    return {
      // beforeFiles runs ahead of the filesystem and the app router, which is
      // what lets these take precedence over the existing pages of the same name.
      beforeFiles: [
        { source: "/", destination: "/v2/index.html" },

        // Clean URLs: /services rather than /services.html.
        ...redesignPages
          .filter((p) => p !== "index")
          .map((p) => ({ source: `/${p}`, destination: `/v2/${p}.html` })),

        // The exported pages link to each other as "services.html", which
        // resolves to /services.html. Without this, every nav click 404s.
        { source: "/:page.html", destination: "/v2/:page.html" },

        // Phase-2 SEO landing pages, authored as plain HTML like /privacy.
        // Nested paths, so they need their own entries: the single-segment
        // rules above cannot reach them.
        {
          source: "/services/ai-receptionist",
          destination: "/v2/services/ai-receptionist.html",
        },
        { source: "/industries/:page", destination: "/v2/industries/:page.html" },

        // Same story for the logo, referenced as "public/voltara-mark.png",
        // and for the script that makes the contact form submit. Without this
        // last one the form loads looking fine and does nothing.
        { source: "/public/:file", destination: "/v2/public/:file" },
        { source: "/voltara.js", destination: "/v2/voltara.js" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
