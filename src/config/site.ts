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
   * Scheduling link — Billy uses Cal.com. Paste the full booking URL, e.g.
   * "https://cal.com/billy-pearson/15min", and the /book page swaps its
   * fallback form for the live scheduler. Provider-agnostic: it is embedded in
   * an iframe, so any scheduler that allows embedding works.
   *
   * Deliberately NOT the primary CTA anywhere. A booked call is the escape
   * hatch for people who would rather talk; the audit is the front door.
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
 * The site's primary call-to-action: a free audit.
 *
 * Deliberately not "book a consult". Asking for a meeting only converts people
 * who have already decided they need us — and it makes the first thing we do
 * to a stranger a request rather than a favour. The audit inverts that:
 * we go and look at their enquiry route and send them what we find. It gets
 * read late at night, re-read, and forwarded to a business partner, none of
 * which a call does.
 *
 * The button never says "video", even though a video is usually what we send.
 * Naming the format makes the offer sound like a deliverable to evaluate;
 * "free audit" is the thing they actually want, and it leaves us free to send
 * a written breakdown when that suits the prospect better.
 *
 * A call is still offered everywhere. It just isn't the price of entry.
 */
export const cta = {
  label: "Get my free audit",
  shortLabel: "Free audit",
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

/**
 * Conversion landing pages used in cold outreach and paid ads. They render
 * with stripped-back chrome (logo and one call to action, no nav links) so a
 * visitor who arrived from an email or an ad has nowhere to wander off to.
 * Add a path here and the Navbar and Footer collapse automatically.
 */
export const landingPaths = ["/leads"] as const;

export function isLandingPath(pathname: string) {
  return landingPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

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
