/**
 * Central site configuration.
 *
 * Edit the values below to update contact details, booking links and social
 * profiles across the entire site. Nothing else needs to change.
 */
export const siteConfig = {
  name: "Voltara Digital",
  shortName: "Voltara",
  tagline: "Social media marketing & AI automation for growing businesses",
  description:
    "Voltara Digital builds the social-media marketing engine that brings small and medium businesses a steady flow of customers — then automates the admin so growth never buries you in busywork.",

  // Used for SEO / share links. Update once you have your live domain.
  url: "https://voltaradigital.com",

  // Contact details — replace with your real ones.
  email: "hello@voltaradigital.com",
  phone: "+44 20 0000 0000",
  location: "London, UK · Working with SMEs everywhere",

  // Your scheduling link (Calendly, Cal.com, etc.). All "Book a call" buttons use this.
  bookingUrl: "https://calendly.com/voltaradigital/discovery-call",

  /**
   * Optional: set NEXT_PUBLIC_CONTACT_ENDPOINT in your environment to a form
   * backend (e.g. Formspree or Web3Forms). When set, the contact form POSTs
   * submissions there. When empty, the form falls back to opening the
   * visitor's email client pre-filled.
   */
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "",

  /**
   * Legal entity details — used across the Privacy Policy, Terms of Service
   * and Cookie Policy. Replace the placeholders with your real registered
   * details before going live, and have the pages reviewed by a professional.
   */
  legal: {
    // Registered / trading name of the business that controls the data.
    entityName: "Voltara Digital",
    // Companies House number if you're a registered company (leave "" if not).
    companyNumber: "",
    // Registered or business address shown on the legal pages.
    address: "London, United Kingdom",
    // ICO (Information Commissioner's Office) registration reference, if held.
    icoRegistration: "",
    // Jurisdiction whose law governs the Terms.
    governingLaw: "England and Wales",
    // Date the current legal documents took effect (shown as "Last updated").
    lastUpdated: "12 July 2026",
  },

  socials: {
    instagram: "https://instagram.com/",
    linkedin: "https://www.linkedin.com/company/",
    x: "https://x.com/",
  },
} as const;

export type NavItem = { title: string; href: string };

export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];
