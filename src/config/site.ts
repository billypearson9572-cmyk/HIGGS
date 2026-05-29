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
  tagline: "Social media marketing & AI automation for growing businesses",
  description:
    "Voltara Digital builds the social-media marketing engine that brings small and medium businesses a steady flow of customers — then automates the admin so growth never buries you in busywork.",

  // Your live domain. Used for SEO and share links.
  url: "https://voltaradigital.com",

  // Contact details.
  email: "hello@voltaradigital.com",
  // Add a number to display it on the site, e.g. "+44 20 1234 5678".
  phone: "",
  location: "United Kingdom · Working with SMEs everywhere",

  /**
   * Scheduling link (Calendly, Cal.com, etc.). Not surfaced yet — when you
   * have one, paste it here and a "Book a call" button can be wired up.
   */
  bookingUrl: "",

  /**
   * Optional: set NEXT_PUBLIC_CONTACT_ENDPOINT to a form backend (e.g.
   * Formspree or Web3Forms). When set, the contact form POSTs there; when
   * empty, it falls back to opening the visitor's email client pre-filled.
   */
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "",

  // Leave blank to hide the icon. Add full profile URLs when they're live.
  socials: {
    instagram: "",
    linkedin: "",
    x: "",
  },
};

/**
 * The site's primary call-to-action: a free marketing audit, requested via the
 * contact form. Used by buttons across the site so the offer stays consistent.
 */
export const cta = {
  label: "Get a free marketing audit",
  shortLabel: "Free audit",
  href: "/contact",
} as const;

export type NavItem = { title: string; href: string };

export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];
