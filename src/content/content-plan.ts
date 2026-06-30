/**
 * Voltara Digital — website content plan.
 *
 * Three sections:
 *   1. Editorial calendar  – blog posts planned through Dec 2026, with SEO
 *      metadata and the social post(s) each article feeds.
 *   2. Page roadmap       – new pages that would materially improve SEO and
 *      conversion, in priority order.
 *   3. Content principles – the rules that govern Voltara's voice.
 *
 * Posts already live in blog.ts are marked status: "published".
 * Posts planned but not yet written are status: "planned".
 * Posts in progress are status: "draft".
 *
 * Cadence target: 1–2 posts per week. LinkedIn posts go out same day as
 * publication; Instagram and X can be offset by 1–2 days.
 */

export type PostStatus = "published" | "draft" | "planned";
export type ContentPillar =
  | "education"     // explain what AI automation is and how it works
  | "proof"         // case studies and real results
  | "comparison"    // help the reader make a decision
  | "industry"      // sector-specific automation guides
  | "growth"        // broader SME growth topics
  | "seo";          // high-intent commercial/informational searches

export type PlannedPost = {
  slug: string;
  title: string;
  description: string;
  targetDate: string;       // ISO date — publish on or around this date
  category: string;
  pillar: ContentPillar;
  status: PostStatus;
  seoKeyword: string;       // primary keyword to optimise for
  cta: string;              // CTA to end the post with
  socialCalendarIds?: number[]; // IDs in social-calendar.ts this post feeds
  notes?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// PUBLISHED POSTS
// ─────────────────────────────────────────────────────────────────────────────

export const publishedPosts: PlannedPost[] = [
  {
    slug: "ai-automation-tipping-point-2026",
    title: "The AI automation tipping point: what UK SMEs need to know in 2026",
    description: "Why 2026 is the year automation stopped being optional, the three automations that pay back fastest, and the honest take on timing.",
    targetDate: "2026-06-16",
    category: "AI & Automation",
    pillar: "education",
    status: "published",
    seoKeyword: "AI automation for SMEs UK 2026",
    cta: "Free AI audit",
    socialCalendarIds: [19, 20],
  },
  {
    slug: "questions-before-hiring-ai-agency",
    title: "5 questions to ask before hiring an AI agency",
    description: "The five questions that filter out the wrong AI agencies quickly — and why the honest ones answer them before you ask.",
    targetDate: "2026-06-23",
    category: "AI & Automation",
    pillar: "comparison",
    status: "published",
    seoKeyword: "how to choose an AI agency UK",
    cta: "Free AI audit",
    socialCalendarIds: [23, 24],
  },
  {
    slug: "word-of-mouth-ceiling",
    title: "Why word-of-mouth has a ceiling (and what to do about it)",
    description: "Referrals are the best customers you'll ever get, and the worst growth strategy you can rely on.",
    targetDate: "2026-05-20",
    category: "Growth",
    pillar: "growth",
    status: "published",
    seoKeyword: "grow beyond word of mouth small business",
    cta: "Free AI audit",
  },
  {
    slug: "social-media-that-sells",
    title: "The SME's guide to social media that actually sells",
    description: "The simple framework for turning social channels into a predictable source of qualified leads.",
    targetDate: "2026-05-12",
    category: "Social Media",
    pillar: "education",
    status: "published",
    seoKeyword: "social media strategy for small business UK",
    cta: "Services",
  },
  {
    slug: "automate-your-admin",
    title: "Drowning in admin? How AI automation buys back your week",
    description: "Growth creates a hidden tax: admin. Here's how smart automation hands those hours back.",
    targetDate: "2026-04-28",
    category: "Automation",
    pillar: "education",
    status: "published",
    seoKeyword: "automate business admin UK",
    cta: "Free AI audit",
    socialCalendarIds: [1, 4],
  },
  {
    slug: "ai-automation-cost-uk-sme",
    title: "How much does AI automation cost? An honest guide for UK SMEs",
    description: "Straight answers on build costs, monthly running costs, and how to think about ROI.",
    targetDate: "2026-07-07",
    category: "AI & Automation",
    pillar: "comparison",
    status: "published",
    seoKeyword: "AI automation cost UK SME",
    cta: "Free AI audit",
    socialCalendarIds: [12],
  },
  {
    slug: "ai-automation-trades-businesses-uk",
    title: "AI automation for trades businesses: a practical guide",
    description: "Plumbers, electricians, landscapers — trades businesses get more enquiries than they can handle. Here's what to automate.",
    targetDate: "2026-07-14",
    category: "AI & Automation",
    pillar: "industry",
    status: "published",
    seoKeyword: "AI automation for trades businesses UK",
    cta: "Free AI audit",
    socialCalendarIds: [16],
  },
  {
    slug: "ai-automation-vs-hiring",
    title: "AI automation vs hiring: the honest cost comparison",
    description: "When something needs to give, the instinct is to hire. Here's the real comparison between headcount and automation.",
    targetDate: "2026-07-21",
    category: "Growth",
    pillar: "comparison",
    status: "published",
    seoKeyword: "AI automation vs hiring cost UK",
    cta: "Free AI audit",
    socialCalendarIds: [28],
  },
  {
    slug: "whatsapp-business-automation-smes",
    title: "WhatsApp for business: how to handle 50+ enquiries without extra staff",
    description: "WhatsApp is where UK SME customers reach out. Here's how to automate it properly.",
    targetDate: "2026-07-28",
    category: "AI & Automation",
    pillar: "education",
    status: "published",
    seoKeyword: "WhatsApp Business automation UK SME",
    cta: "Free AI audit",
    socialCalendarIds: [3],
  },
  {
    slug: "automate-your-weekly-business-report",
    title: "The 5-minute business report that runs itself",
    description: "Most SME owners fly blind on their own numbers. Here's how to automate your weekly report.",
    targetDate: "2026-08-04",
    category: "Automation",
    pillar: "education",
    status: "published",
    seoKeyword: "automated business reporting SME UK",
    cta: "Free AI audit",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PLANNED POSTS — August to December 2026
// ─────────────────────────────────────────────────────────────────────────────

export const plannedPosts: PlannedPost[] = [

  // ── AUGUST ────────────────────────────────────────────────────────────────

  {
    slug: "crm-automation-sme-guide",
    title: "CRM automation 101: the setup every growing SME needs",
    description: "Most SMEs either don't have a CRM or don't use it properly. Here's what to track, how to automate it, and which tools to use.",
    targetDate: "2026-08-11",
    category: "AI & Automation",
    pillar: "education",
    status: "planned",
    seoKeyword: "CRM automation small business UK",
    cta: "Free AI audit",
    notes: "Link to sales-automation service. Mention HubSpot, Pipedrive, Notion CRM as popular SME options.",
  },
  {
    slug: "ai-customer-service-smes",
    title: "AI customer service for SMEs: beyond the chatbot",
    description: "Most chatbots are frustrating. Here's what a well-designed AI customer service setup actually looks like — and what it can and can't do.",
    targetDate: "2026-08-18",
    category: "AI & Automation",
    pillar: "education",
    status: "planned",
    seoKeyword: "AI customer service chatbot UK SME",
    cta: "Free AI audit",
    notes: "Link to customer-service service. Differentiate from low-quality chatbots — focus on quality of conversation design.",
  },
  {
    slug: "scale-revenue-without-headcount",
    title: "How to scale revenue without scaling headcount",
    description: "The playbook for growing a service business without a linear increase in staff costs.",
    targetDate: "2026-08-25",
    category: "Growth",
    pillar: "growth",
    status: "planned",
    seoKeyword: "scale business without hiring UK",
    cta: "Free AI audit",
    notes: "Broad appeal post — good for shares. Frame automation as the infrastructure layer that enables non-linear growth.",
  },

  // ── SEPTEMBER ─────────────────────────────────────────────────────────────

  {
    slug: "ai-automation-professional-services",
    title: "AI automation for professional services: accountants, solicitors, consultants",
    description: "Professional services firms have unique automation opportunities. Here's what works and what compliance considerations to keep in mind.",
    targetDate: "2026-09-01",
    category: "AI & Automation",
    pillar: "industry",
    status: "planned",
    seoKeyword: "AI automation accountants solicitors UK",
    cta: "Free AI audit",
    notes: "High-value client sector. Address compliance and data sensitivity head-on. Focus on client intake, follow-up, and document workflows.",
  },
  {
    slug: "lead-qualification-why-it-matters",
    title: "Lead qualification: why chasing bad leads costs more than you think",
    description: "Not every enquiry is worth your time. Here's how to qualify leads automatically — and what you gain when you do.",
    targetDate: "2026-09-08",
    category: "Sales",
    pillar: "education",
    status: "planned",
    seoKeyword: "lead qualification automation UK",
    cta: "Free AI audit",
    notes: "Links naturally to sales automation. Include the 'BANT' and 'MEDDIC' frameworks in simple terms.",
  },
  {
    slug: "zapier-vs-make-vs-n8n",
    title: "Zapier vs Make vs n8n: which automation platform should you use?",
    description: "A plain-English comparison of the three main automation platforms — what each is good at and which suits UK SMEs best.",
    targetDate: "2026-09-15",
    category: "AI & Automation",
    pillar: "comparison",
    status: "planned",
    seoKeyword: "Zapier vs Make vs n8n UK business",
    cta: "Free AI audit",
    notes: "High-search-intent comparison post. Be honest: n8n for self-hosters, Make for mid-complexity, Zapier for simplicity. Don't just rank by affiliate value.",
  },
  {
    slug: "case-study-whatsapp-chatbot-conversion",
    title: "How a WhatsApp AI assistant converted 3× more leads for a local service business",
    description: "A detailed walkthrough of a client engagement: the problem, what we built, and the results after 60 days.",
    targetDate: "2026-09-22",
    category: "Case Study",
    pillar: "proof",
    status: "planned",
    seoKeyword: "WhatsApp chatbot case study UK business",
    cta: "Free AI audit",
    notes: "Best if this is a real named client case study. If not yet available, use an anonymised version with specific numbers. Proof content converts best.",
  },
  {
    slug: "ai-sales-automation-b2b-sme",
    title: "AI sales automation for B2B SMEs: what actually works",
    description: "Cold email is dead. Here's what B2B AI outbound and pipeline automation looks like when it's done right in 2026.",
    targetDate: "2026-09-29",
    category: "Sales",
    pillar: "education",
    status: "planned",
    seoKeyword: "AI sales automation B2B UK 2026",
    cta: "Free AI audit",
    notes: "Address the spam-bot misconception directly. Focus on quality signals, warm outreach, and intent-based targeting.",
  },

  // ── OCTOBER ───────────────────────────────────────────────────────────────

  {
    slug: "ai-automation-estate-agents-property",
    title: "AI automation for estate agents and property businesses",
    description: "Property is enquiry-heavy and follow-up-dependent. Here's how estate agents are using automation to manage viewings, leads, and client communication.",
    targetDate: "2026-10-06",
    category: "AI & Automation",
    pillar: "industry",
    status: "planned",
    seoKeyword: "AI automation estate agents UK",
    cta: "Free AI audit",
    notes: "Good SEO target — less competitive than generic automation terms. Focus on viewing scheduling, portal lead follow-up, landlord/vendor comms.",
  },
  {
    slug: "10-automations-before-2027",
    title: "The 10 tasks every UK SME should automate before 2027",
    description: "A practical checklist of the 10 most valuable automations for small businesses — ranked by return and complexity.",
    targetDate: "2026-10-13",
    category: "AI & Automation",
    pillar: "education",
    status: "planned",
    seoKeyword: "business automation checklist UK SME 2027",
    cta: "Free AI audit",
    notes: "Evergreen listicle format — good for organic reach. Rank by ROI: lead follow-up, quote chasing, CRM logging, scheduling, reporting, etc.",
  },
  {
    slug: "how-to-measure-roi-ai-automation",
    title: "How to measure ROI on AI automation (without a data team)",
    description: "What to track, how to attribute results, and when to declare the automation a success — a practical guide for SME owners.",
    targetDate: "2026-10-20",
    category: "AI & Automation",
    pillar: "education",
    status: "planned",
    seoKeyword: "ROI AI automation small business",
    cta: "Free AI audit",
    notes: "Addresses the 'how do I know it's working?' objection. Frame around 3 metrics: time saved, leads recovered, revenue influenced.",
  },
  {
    slug: "ai-automation-hospitality-restaurants",
    title: "AI automation for restaurants and hospitality businesses",
    description: "Bookings, reviews, staffing, and customer messages — hospitality has more automation opportunities than most owners realise.",
    targetDate: "2026-10-27",
    category: "AI & Automation",
    pillar: "industry",
    status: "planned",
    seoKeyword: "AI automation restaurants hospitality UK",
    cta: "Free AI audit",
    notes: "Target the hospitality sector — high volume of SMEs, relatively low digital sophistication, big opportunity around reservations and reviews management.",
  },

  // ── NOVEMBER ──────────────────────────────────────────────────────────────

  {
    slug: "build-a-business-that-runs-without-you",
    title: "How to build a business that doesn't depend entirely on you",
    description: "The practical steps to systemising a service business so it can run — and grow — when you step back.",
    targetDate: "2026-11-03",
    category: "Growth",
    pillar: "growth",
    status: "planned",
    seoKeyword: "systemise business UK owner operator",
    cta: "Free AI audit",
    notes: "Aspirational, high-share content. Frame automation as one pillar of systemisation alongside SOPs and team structure.",
  },
  {
    slug: "automate-christmas-customer-service",
    title: "Prepare for Christmas now: automating customer service over the holidays",
    description: "For SMEs, Christmas is a peak demand period with reduced staffing. Here's how to handle it without burning out your team.",
    targetDate: "2026-11-10",
    category: "Automation",
    pillar: "education",
    status: "planned",
    seoKeyword: "holiday customer service automation UK business",
    cta: "Free AI audit",
    notes: "Timely/seasonal content. Publish in early November so businesses have time to set up before December.",
  },
  {
    slug: "ai-automation-recruitment-hr-smes",
    title: "AI automation for recruitment and HR in small businesses",
    description: "Hiring is one of the most time-consuming processes an SME owner manages. Here's what can be automated.",
    targetDate: "2026-11-17",
    category: "AI & Automation",
    pillar: "industry",
    status: "planned",
    seoKeyword: "AI HR automation small business UK",
    cta: "Free AI audit",
    notes: "Cover application screening, interview scheduling, offer letter generation, onboarding checklists.",
  },
  {
    slug: "ai-automation-year-review-2026",
    title: "2026 in AI automation: what worked, what didn't, and what's next",
    description: "An honest review of how AI automation changed for UK SMEs in 2026 — the tools, the wins, and the lessons.",
    targetDate: "2026-11-24",
    category: "AI & Automation",
    pillar: "education",
    status: "planned",
    seoKeyword: "AI automation review 2026 UK business",
    cta: "Free AI audit",
    notes: "Year-in-review content performs well in November/December. Make it genuinely opinionated — not a press release.",
  },

  // ── DECEMBER ──────────────────────────────────────────────────────────────

  {
    slug: "ai-automation-predictions-2027",
    title: "AI automation in 2027: what UK SMEs should prepare for",
    description: "The tools, trends, and shifts on the horizon — and how to position your business ahead of them.",
    targetDate: "2026-12-07",
    category: "AI & Automation",
    pillar: "education",
    status: "planned",
    seoKeyword: "AI automation trends 2027 UK",
    cta: "Free AI audit",
    notes: "Forward-looking content to close the year. Avoid vague predictions — ground in specific tools and shifts already in development.",
  },
  {
    slug: "year-end-automation-checklist",
    title: "The SME owner's year-end automation checklist",
    description: "12 things to audit, fix, or set up before the new year so your business starts 2027 running efficiently.",
    targetDate: "2026-12-14",
    category: "Automation",
    pillar: "education",
    status: "planned",
    seoKeyword: "year end business checklist automation UK",
    cta: "Free AI audit",
    notes: "Evergreen checklist format — easy to read, easy to share. Covers: CRM audit, automation health check, reporting setup, Q1 planning.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE ROADMAP
// Priority order: high-intent pages first.
// ─────────────────────────────────────────────────────────────────────────────

export type PagePriority = "high" | "medium" | "low";

export type PlannedPage = {
  path: string;
  title: string;
  purpose: string;
  priority: PagePriority;
  seoKeyword: string;
  notes: string;
};

export const plannedPages: PlannedPage[] = [
  {
    path: "/industries/trades",
    title: "AI Automation for Trades Businesses",
    purpose: "Industry landing page for plumbers, electricians, landscapers, cleaners, builders",
    priority: "high",
    seoKeyword: "AI automation for trades businesses UK",
    notes: "Converts from the trades blog post. Specific pain points, specific automations, social proof from trades clients.",
  },
  {
    path: "/industries/professional-services",
    title: "AI Automation for Professional Services",
    purpose: "Industry landing page for accountants, solicitors, consultants, financial advisers",
    priority: "high",
    seoKeyword: "AI automation professional services UK",
    notes: "Address compliance and data handling directly. Focus on client intake, billing, and communication workflows.",
  },
  {
    path: "/case-studies",
    title: "Case Studies",
    purpose: "Social proof hub — anonymised client results with specific metrics",
    priority: "high",
    seoKeyword: "AI automation results UK SME",
    notes: "Most important trust-builder on the site. Even 2–3 well-documented case studies will significantly improve conversion.",
  },
  {
    path: "/services/sales-automation",
    title: "AI Sales Automation",
    purpose: "Dedicated landing page for the flagship service with full detail and FAQ",
    priority: "medium",
    seoKeyword: "AI sales automation UK agency",
    notes: "Expand on the homepage services section. Include pricing guide, timeline, what's included, and a clear CTA.",
  },
  {
    path: "/services/whatsapp-automation",
    title: "WhatsApp Business Automation",
    purpose: "Dedicated landing page for WhatsApp enquiry handling",
    priority: "medium",
    seoKeyword: "WhatsApp Business automation UK SME",
    notes: "WhatsApp is a heavily searched channel for UK SMEs. A dedicated page would capture significant organic traffic.",
  },
  {
    path: "/industries/property",
    title: "AI Automation for Estate Agents & Property",
    purpose: "Industry landing page for estate agents, letting agents, property management",
    priority: "medium",
    seoKeyword: "AI automation estate agents UK",
    notes: "Viewing scheduling, portal lead response, landlord communication workflows.",
  },
  {
    path: "/tools/lead-response-cost-calculator",
    title: "Lead Response Cost Calculator",
    purpose: "Interactive tool: how much slow follow-up is costing you per month",
    priority: "medium",
    seoKeyword: "lead response time calculator",
    notes: "Expand the existing /lead-calculator page or create a companion. High engagement and shareable. Good for email capture.",
  },
  {
    path: "/industries/hospitality",
    title: "AI Automation for Restaurants & Hospitality",
    purpose: "Industry landing page for restaurants, cafés, hotels, event venues",
    priority: "low",
    seoKeyword: "AI automation restaurants UK",
    notes: "Lower priority than trades/professional services. Good Q4 content given December seasonality.",
  },
  {
    path: "/blog/category/case-studies",
    title: "Case Studies Category",
    purpose: "Filtered blog view showing only case study posts",
    priority: "low",
    seoKeyword: "Voltara Digital case studies",
    notes: "Depends on having enough case study posts first. Low effort if the blog category filter already exists.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT PRINCIPLES
// ─────────────────────────────────────────────────────────────────────────────

export const contentPrinciples = {
  voice: [
    "Direct and plain-spoken. No jargon, no buzzwords.",
    "Honest over optimistic. Acknowledge limitations, set realistic expectations.",
    "SME-first. Write for the business owner, not the tech community.",
    "Specific over vague. Use numbers, timelines, and real examples wherever possible.",
    "Opinionated where warranted. Voltara has a point of view.",
  ],
  seo: [
    "One primary keyword per post. Don't stuff — earn the ranking with genuinely useful content.",
    "H2 headings should reflect real questions people ask. Use them as the skeleton.",
    "Internal links: every post should link to at least one service page and one other blog post.",
    "CTA in every post: link to /contact for the free AI audit. Don't assume readers will find it.",
    "Posts should be 700–1,200 words. Long enough to cover the topic; short enough to respect time.",
  ],
  publishing: [
    "Publish on Tuesdays or Thursdays — highest open and engagement rates.",
    "Share on LinkedIn same day as publishing. Put the link in the first comment.",
    "Repurpose into Instagram carousel or Reel within 3 days.",
    "X thread within 24 hours — use the post's key points as thread tweets.",
    "Email subscribers (when list is active): send a short teaser with a read link.",
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// QUICK HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export const allPlanned = [...publishedPosts, ...plannedPosts];

export function getPostsByPillar(pillar: ContentPillar) {
  return allPlanned.filter((p) => p.pillar === pillar);
}

export function getUpcoming(from: string = new Date().toISOString().slice(0, 10)) {
  return plannedPosts
    .filter((p) => p.targetDate >= from && p.status !== "published")
    .sort((a, b) => a.targetDate.localeCompare(b.targetDate));
}
