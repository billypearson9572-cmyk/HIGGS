import type { Metadata } from "next";
import Link from "next/link";
import {
  Megaphone,
  Workflow,
  PenTool,
  Target,
  MessagesSquare,
  Repeat,
  BarChart3,
  Inbox,
  Zap,
  Mail,
  Database,
  Bot,
  Check,
  ArrowRight,
  ArrowDown,
  Search,
} from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Button,
  GradientText,
} from "@/components/ui";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { servicesSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { cta } from "@/config/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Social media marketing that fills your funnel, and AI automation that frees your time, delivered as scoped, project-based engagements for SMEs.",
  alternates: { canonical: "/services" },
};

const socialOfferings = [
  {
    icon: Target,
    title: "Social strategy",
    body: "A focused channel and content plan built around your goals, your audience and what actually drives enquiries.",
  },
  {
    icon: PenTool,
    title: "Content creation",
    body: "Scroll-stopping posts, reels and graphics: on-brand, on-message and published on a consistent schedule.",
  },
  {
    icon: Megaphone,
    title: "Paid social ads",
    body: "Targeted campaigns on Meta, TikTok and LinkedIn that turn ad budget into qualified leads, not just impressions.",
  },
  {
    icon: MessagesSquare,
    title: "Community management",
    body: "We engage your audience and respond to comments and DMs, so warm prospects are never left on read.",
  },
  {
    icon: Repeat,
    title: "Content repurposing",
    body: "One idea, many formats. We squeeze maximum reach out of every asset across your channels.",
  },
  {
    icon: BarChart3,
    title: "Analytics & reporting",
    body: "Clear reporting tied to leads and revenue, so you always know what your marketing is doing.",
  },
];

const automationOfferings = [
  {
    icon: Inbox,
    title: "Lead capture & routing",
    body: "Enquiries from your site, ads and DMs flow straight into your CRM, tagged, organised and ready to action.",
  },
  {
    icon: Zap,
    title: "Instant follow-up",
    body: "Every new lead gets a personalised reply within seconds, so you never lose one to a slow response.",
  },
  {
    icon: Mail,
    title: "Email & nurture sequences",
    body: "Automated, well-timed emails that keep you front of mind and warm up prospects until they're ready to buy.",
  },
  {
    icon: Database,
    title: "CRM setup & automation",
    body: "We set up or tidy your CRM and automate the data entry, so your pipeline stays clean without you touching it.",
  },
  {
    icon: Workflow,
    title: "Workflow automation (n8n)",
    body: "Custom workflows connecting the tools you already use: Gmail, Slack, Notion, Sheets, Stripe and 400+ more.",
  },
  {
    icon: Bot,
    title: "AI assistants & reporting",
    body: "AI-drafted replies, enquiry summaries and automated reports, delivered to your inbox so nothing slips.",
  },
];

const projects = [
  {
    name: "Social Launch",
    tagline: "Best for getting visible",
    description:
      "Stand up a professional, consistent social presence that starts attracting the right audience.",
    features: [
      "Channel strategy & setup",
      "Branded content templates",
      "An initial batch of content",
      "A 30-day content plan",
    ],
    highlighted: false,
  },
  {
    name: "Growth Campaign",
    tagline: "Best for driving leads",
    description:
      "A focused campaign engineered to turn attention into enquiries: content, paid ads and optimisation.",
    features: [
      "Full content production",
      "Paid social ad campaign",
      "Lead capture & landing page",
      "Performance reporting",
    ],
    highlighted: true,
  },
  {
    name: "Automation Build",
    tagline: "Best for saving time",
    description:
      "Connect your tools and automate the admin so growth never buries you in busywork.",
    features: [
      "n8n workflow build",
      "CRM setup & integration",
      "Automated lead follow-up",
      "Reporting dashboards",
    ],
    highlighted: false,
  },
];

const serviceSchemas = servicesSchema([
  {
    name: "Social media marketing",
    description:
      "Strategy, content creation, paid social ads, community management and reporting that turn your social channels into a consistent source of qualified leads.",
    hash: "social-media",
  },
  {
    name: "AI automation",
    description:
      "Lead capture into your CRM, instant follow-ups, nurture sequences, workflow automation and reporting, built on n8n so growth never buries you in admin.",
    hash: "automation",
  },
]);

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceSchemas} />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="glow-radial pointer-events-none absolute -top-32 left-1/2 h-[30rem] w-[44rem] -translate-x-1/2" />
        <Container className="relative py-20 text-center sm:py-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <Eyebrow>Services</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Marketing that fills the funnel. Automation that{" "}
              <GradientText>frees your time.</GradientText>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Two services that work as one system. We bring you a steady flow of
              customers, then take the admin off your plate so growth stays
              light on its feet.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={cta.href} size="lg">
                <Search className="h-5 w-5" />
                {cta.label}
              </Button>
              <Button href="#pricing" variant="secondary" size="lg">
                See how we work
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------- Social media marketing */}
      <Section id="social-media">
        <Container>
          <div className="flex flex-col gap-4">
            <Eyebrow>
              <Megaphone className="h-3.5 w-3.5 text-brand-teal" />
              Phase 1 · Social media marketing
            </Eyebrow>
            <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Turn your social channels into a{" "}
              <GradientText>lead-generating machine.</GradientText>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Most SMEs post and pray. We build a content engine with a clear job:
              attract the right people, earn their trust, and move them towards
              becoming customers, consistently.
            </p>
          </div>
          <OfferingGrid items={socialOfferings} />
        </Container>
      </Section>

      {/* -------------------------------------------------------- AI automation */}
      <Section id="automation" className="bg-bg-soft">
        <Container>
          <div className="flex flex-col gap-4">
            <Eyebrow>
              <Workflow className="h-3.5 w-3.5 text-brand-teal" />
              Phase 2 · AI automation
            </Eyebrow>
            <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Hand the busywork to{" "}
              <GradientText>smart automation.</GradientText>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              As the leads roll in, admin becomes the bottleneck. We connect your
              tools with n8n and AI to handle the repetitive work, so nothing
              slips through the cracks and you get your week back.
            </p>
          </div>
          <OfferingGrid items={automationOfferings} />
        </Container>
      </Section>

      {/* --------------------------------------------------------- Phased model */}
      <Section>
        <Container>
          <SectionHeading
            align="center"
            eyebrow="The Voltara model"
            title="Land first. Then expand."
            description="We don't sell you everything on day one. We earn the right to automate by first proving we can grow your business."
          />
          <div className="mx-auto mt-12 flex max-w-4xl flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <PhaseStep
              num="01"
              title="Fill the funnel"
              body="We launch your marketing and build a predictable flow of qualified leads."
            />
            <span className="flex shrink-0 items-center justify-center text-brand-teal">
              <ArrowRight className="hidden h-7 w-7 sm:block" />
              <ArrowDown className="h-6 w-6 sm:hidden" />
            </span>
            <PhaseStep
              num="02"
              title="Automate the admin"
              body="Once you're growing, we automate follow-ups, CRM and reporting to save your time."
            />
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------- Projects / packages */}
      <Section id="pricing" className="bg-bg-soft">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Projects"
            title="Work with us, project by project"
            description="No retainers, no long contracts, no lock-in. We scope each project to your goals and quote up front, so you know exactly what you're getting before we start."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.name}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-8",
                  project.highlighted
                    ? "border-transparent bg-surface [background:linear-gradient(var(--color-surface),var(--color-surface))_padding-box,var(--brand-gradient)_border-box]"
                    : "border-line bg-surface/60",
                )}
              >
                {project.highlighted ? (
                  <span className="absolute -top-3 left-8 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-[#04121f]">
                    Most popular
                  </span>
                ) : null}
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                  Project
                </span>
                <h3 className="mt-2 font-display text-xl font-bold">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand-teal">
                  {project.tagline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  href="/contact"
                  variant={project.highlighted ? "primary" : "secondary"}
                  className="mt-8 w-full"
                >
                  Get a quote
                </Button>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted">
            Every project is scoped and quoted on a quick call.{" "}
            <Link
              href="/contact"
              className="font-medium text-brand-blue hover:underline"
            >
              Get in touch
            </Link>{" "}
            and we&apos;ll find the right fit.
          </p>
        </Container>
      </Section>

      <CTASection
        title="Let's build your growth engine"
        description="Tell us where you are and where you want to be. We'll send back a free audit and show you exactly how marketing and automation get you there."
      />
    </>
  );
}

/* --- Local components ---------------------------------------------------- */

function OfferingGrid({
  items,
}: {
  items: { icon: React.ElementType; title: string; body: string }[];
}) {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-line bg-surface/60 p-6"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/5 text-brand-teal">
            <item.icon className="h-5 w-5" />
          </span>
          <h3 className="mt-5 font-display text-lg font-semibold">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

function PhaseStep({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex-1 rounded-3xl border border-line bg-surface p-8">
      <span className="font-display text-sm font-semibold text-brand-teal">
        {num}
      </span>
      <h3 className="mt-3 font-display text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
