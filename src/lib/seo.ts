import type { Post } from "@/content/blog";
import { siteConfig } from "@/config/site";

/**
 * JSON-LD structured data builders. These help search engines (and AI search)
 * understand the business, its pages and articles, and can unlock rich results
 * (FAQ accordions, article cards, breadcrumbs).
 */
const base = siteConfig.url.replace(/\/$/, "");
const sameAs = Object.values(siteConfig.socials).filter(Boolean);

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${base}/#organization`,
  name: siteConfig.name,
  url: `${base}/`,
  logo: `${base}/voltara-logo-full.png`,
  image: `${base}/opengraph-image`,
  description: siteConfig.description,
  email: siteConfig.email,
  areaServed: "GB",
  contactPoint: {
    "@type": "ContactPoint",
    email: siteConfig.email,
    contactType: "customer service",
    areaServed: "GB",
    availableLanguage: "English",
  },
  ...(sameAs.length ? { sameAs } : {}),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${base}/#website`,
  name: siteConfig.name,
  url: `${base}/`,
  inLanguage: "en-GB",
  publisher: { "@id": `${base}/#organization` },
};

export function servicesSchema(
  services: { name: string; description: string; hash: string }[],
) {
  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.name,
    provider: { "@id": `${base}/#organization` },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    url: `${base}/services#${service.hash}`,
  }));
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-GB",
    articleSection: post.category,
    author: { "@type": "Organization", name: post.author, url: `${base}/` },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${base}/voltara-logo-full.png` },
    },
    image: `${base}/opengraph-image`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${base}/blog/${post.slug}`,
    },
  };
}

export function breadcrumbSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${base}/blog/${post.slug}`,
      },
    ],
  };
}
