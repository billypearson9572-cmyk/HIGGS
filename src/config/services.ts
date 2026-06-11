import {
  Rocket,
  MessagesSquare,
  Workflow,
  Megaphone,
  Code,
  Building2,
  Handshake,
} from "lucide-react";
import type { ComponentType } from "react";

export type Service = {
  hash: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  tagline: string;
  featured?: boolean;
  description: string;
  points: string[];
};

/**
 * The agency's service areas, in priority order. Sales automation is the
 * flagship and leads wherever services appear. Used by the homepage, the
 * services page and the structured-data (SEO) builders so everything stays
 * in sync — edit a service once here and it updates across the site.
 */
export const services: Service[] = [
  {
    hash: "sales-automation",
    icon: Rocket,
    title: "Sales automation",
    tagline: "Our flagship",
    featured: true,
    description:
      "An AI sales engine that finds, qualifies and follows up with leads around the clock, so meetings get booked and deals move forward while you sleep.",
    points: [
      "Lead sourcing & enrichment",
      "AI outreach & follow-up",
      "Instant lead qualification",
      "Pipeline & CRM automation",
      "Meetings booked on autopilot",
    ],
  },
  {
    hash: "customer-service",
    icon: MessagesSquare,
    title: "Customer service & AI chat",
    tagline: "Always-on support",
    description:
      "AI assistants that answer questions, resolve issues and capture leads instantly across your website, WhatsApp and socials, 24/7, with a clean handoff to a human when it matters.",
    points: [
      "Website & WhatsApp chatbots",
      "Instant first response",
      "Smart query routing",
      "AI-drafted replies",
      "Human handoff built in",
    ],
  },
  {
    hash: "internal-ops",
    icon: Workflow,
    title: "Admin & internal ops",
    tagline: "Win back your week",
    description:
      "We automate the repetitive back-office work — data entry, scheduling, documents and reporting — so your team spends its time on what actually grows the business.",
    points: [
      "Data entry & syncing",
      "Automated reporting",
      "Document & invoice workflows",
      "Scheduling & reminders",
      "Tool-to-tool integrations",
    ],
  },
  {
    hash: "marketing",
    icon: Megaphone,
    title: "AI-powered marketing",
    tagline: "More output, sharper aim",
    description:
      "Content, social and ads supercharged with AI, so you produce more, target sharper and turn attention into pipeline without growing the team.",
    points: [
      "Content creation at scale",
      "Social media management",
      "Paid advertising",
      "SEO & analytics",
    ],
  },
  {
    hash: "build",
    icon: Code,
    title: "Build & tech help",
    tagline: "Your on-demand tech team",
    description:
      "Websites, web apps, internal tools and integrations — built fast and built right. The technical muscle to ship whatever your business needs.",
    points: [
      "Websites & landing pages",
      "Custom web apps & tools",
      "API & system integrations",
      "Ongoing technical support",
    ],
  },
  {
    hash: "industry-systems",
    icon: Building2,
    title: "Industry-specific systems",
    tagline: "Built for your sector",
    description:
      "Pre-built AI systems tuned to how your industry actually works, so you get a solution that fits on day one instead of a generic template.",
    points: [
      "Sector-tuned workflows",
      "Compliance-aware automation",
      "Fast, templated deployment",
      "Tailored to your stack",
    ],
  },
  {
    hash: "business-development",
    icon: Handshake,
    title: "Business development",
    tagline: "Open new channels",
    description:
      "AI-driven outbound and partnership systems that keep your top-of-funnel full and surface new opportunities and channels to grow through.",
    points: [
      "Partner & channel outreach",
      "Market & prospect research",
      "Outbound campaigns",
      "Deal-flow tracking",
    ],
  },
];
