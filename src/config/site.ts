/**
 * Central site configuration.
 *
 * Edit the values below to update contact details, links and social profiles
 * across the entire site. Leave a value blank to hide it (e.g. socials and
 * phone won't render until you add them).
 */
export const siteConfig = {
  name: "Voltara Digital",
  shortName: "Voltara",
  tagline: "AI systems that win you customers and run the busywork",
  description:
    "Voltara Digital is an AI automation agency. We build systems that sell for you, serve your customers and run your back office — from AI sales automation and chatbots to custom builds and internal ops, all done for you.",

  // Your live domain. Used for SEO and share links.
  url: "https://voltaradigital.com",

  // Contact details.
  email: "info@voltaradigital.com",
  // Add a number to display it on the site, e.g. "+44 20 1234 5678".
  phone: "",
  location: "United Kingdom · Working with SMEs everywhere",

  /**
   * Scheduling link (Calendly, Cal.com, etc.). Not surfaced yet. When you
   * have one, paste it here and a "Book a call" button can be wired up.
   */
  bookingUrl: "",

  /**
   * Live demo number (Twilio). When set (e.g. "07123 456789"), the homepage
   * hero shows "Text DEMO to ..." as the primary call to action — the visitor
   * texts it and watches the system reply in seconds. Leave blank to hide.
   */
  demoNumber: "",

  /**
   * Contact form delivery (in priority order):
   *
   * 1. Web3Forms, the easy option. Get a free access key at
   *    https://web3forms.com using info@voltaradigital.com, then set
   *    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY. Submissions email straight to you.
   * 2. A generic JSON endpoint (e.g. Formspree) via NEXT_PUBLIC_CONTACT_ENDPOINT.
   * 3. If neither is set, the form opens the visitor's email client pre-filled.
   */
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "",
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "",

  // Leave blank to hide the icon. Add full profile URLs when they're live.
  socials: {
    instagram: "",
    linkedin: "",
    x: "",
  },
};

/**
 * The site's primary call-to-action: a free AI consult, requested via the
 * contact form. Used by buttons across the site so the offer stays consistent.
 */
export const cta = {
  label: "Book a free consult",
  shortLabel: "Free AI consult",
  href: "/contact",
} as const;

/**
 * The Voltara podcast — powers the /podcast page and the outreach invites.
 *
 * Rename anything freely; the page reads it all from here. Leave the platform
 * links blank until the show is live and they stay hidden. `episodes` starts
 * empty and the page shows an honest "now recording" state until you add real
 * ones, so nothing ever looks faked.
 */
export const podcast = {
  name: "Stateside",
  tagline: "How American businesses win, and what UK founders can learn from them.",
  intro:
    "A relaxed remote interview with US founders and owners about how they really build, sell and grow. We dig into the American playbook so UK listeners can apply it at home. No fluff and no hard sell, just a good conversation you get to keep and share.",
  host: "Billy Pearson, Voltara Digital",
  // Roughly how long a recording takes, shown on the page.
  length: "30–40 minutes, recorded remotely over Zoom",
  // Where episodes live once published. Any blank link is hidden.
  links: {
    youtube: "",
    spotify: "",
    apple: "",
  },
  // Add episodes as you record them: { title, guest, company, url }.
  episodes: [] as { title: string; guest: string; company: string; url: string }[],
} as const;

export type NavItem = { title: string; href: string };

export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Calculator", href: "/lead-calculator" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Podcast", href: "/podcast" },
  { title: "Contact", href: "/contact" },
];
