import Link from "next/link";
import {
  ArrowRight,
  Search,
  Check,
  Sparkles,
  Inbox,
  PhoneCall,
  Repeat,
  Code,
  Rocket,
  TrendingUp,
  ShieldCheck,
  Plug,
  MessagesSquare,
  CalendarCheck,
  Workflow,
} from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Card,
  Button,
  GradientText,
} from "@/components/ui";
import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig, cta } from "@/config/site";
import { services, type Service } from "@/config/services";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Voltara Digital" },
  alternates: { canonical: "/" },
};

const problems = [
  {
    icon: Inbox,
    title: "Buried in busywork",
    body: "Your team loses hours every week to admin a machine could do in seconds.",
  },
  {
    icon: PhoneCall,
    title: "Leads slip away",
    body: "Slow follow-up and missed enquiries quietly cost you deals you never even see.",
  },
  {
    icon: Repeat,
    title: "Everything's manual",
    body: "Growing means hiring more people to do more repetitive work. That doesn't scale.",
  },
];

const steps = [
  {
    icon: Search,
    title: "Map the opportunities",
    body: "We audit how you work and find where AI will save the most time and win the most revenue.",
  },
  {
    icon: Code,
    title: "Build your systems",
    body: "We build and connect the automations to the tools you already use, tested and reliable.",
  },
  {
    icon: Rocket,
    title: "Launch & train",
    body: "We switch it on, train your team, and make sure it runs smoothly from day one.",
  },
  {
    icon: TrendingUp,
    title: "Optimise & scale",
    body: "We track results, sharpen what's working, and add new systems as you grow.",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Done for you",
    body: "We design, build and run it end to end. You get the outcome, not a pile of homework.",
  },
  {
    icon: Sparkles,
    title: "AI-first, not AI-hype",
    body: "Practical systems that pay for themselves. No buzzwords, no science projects.",
  },
  {
    icon: Plug,
    title: "Built on your stack",
    body: "Everything connects to the tools you already use, and runs on your own accounts.",
  },
  {
    icon: Repeat,
    title: "Owned by you",
    body: "Your systems, your data, your workflows. No lock-in, no holding your business hostage.",
  },
];

const faqs = [
  {
    q: "What does an AI agency actually do for me?",
    a: "In plain terms, we build systems that do work for you: AI that books sales meetings, answers customers and clears admin, so your business does more without more staff. We design it, build it and run it.",
  },
  {
    q: "Do I need to be technical?",
    a: "Not at all. We handle everything end to end and connect it to the tools you already use. You get the results; we own the complexity.",
  },
  {
    q: "Where should we start?",
    a: "Usually sales automation, because it pays for itself the fastest. We begin with the one system that has the clearest return, prove it works, then expand from there.",
  },
  {
    q: "Are there long contracts?",
    a: "No. We work in flexible, project-based engagements with no long tie-ins. We'd rather earn the next project than lock you in.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="glow-radial pointer-events-none absolute -top-40 right-0 h-[34rem] w-[34rem]" />
        <Container className="relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-10 lg:py-28">
          <div className="animate-fade-up">
            <Eyebrow>
              <Sparkles className="h-3.5 w-3.5 text-brand-teal" />
              AI automation agency
            </Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              The AI team your <GradientText>business runs on.</GradientText>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {siteConfig.name} builds AI systems that win you customers and run
              the busywork, from sales automation that books meetings while you
              sleep to AI chat, custom builds and internal ops. All designed,
              built and run for you.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={cta.href} size="lg">
                <Sparkles className="h-5 w-5" />
                {cta.label}
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                Explore our services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted">
              Free, no-obligation AI audit. For businesses ready to put growth on
              autopilot.
            </p>
          </div>

          <HeroVisual />
        </Container>
      </section>

      {/* ------------------------------------------------------------- The shift */}
      <Section className="border-t border-line/60">
        <Container>
          <SectionHeading
            eyebrow="The shift"
            title={
              <>
                Your competitors are about to get a lot{" "}
                <GradientText>faster.</GradientText>
              </>
            }
            description="AI has quietly changed what a small team can do. The businesses building it into how they work are pulling ahead, more sales, faster service, less admin, while everyone else still does it by hand."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {problems.map((item) => (
              <Card key={item.title}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/5 text-brand-teal">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- What we do */}
      <Section className="bg-bg-soft">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="What we do"
            title={
              <>
                One agency for every <GradientText>AI system</GradientText> your
                business needs.
              </>
            }
            description="From winning customers to serving them and running the admin behind it all, we design, build and run it for you."
          />

          <div className="mx-auto mt-14 max-w-5xl">
            <FeaturedService service={services[0]} />
          </div>

          <div className="mx-auto mt-6 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(1).map((service) => (
              <ServiceTile key={service.hash} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------- How it works */}
      <Section id="how-it-works">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                From manual to <GradientText>automated</GradientText>, without
                the headache.
              </>
            }
            description="No jargon, no months-long projects. Here's exactly how we get AI working inside your business."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative rounded-2xl border border-line bg-surface/60 p-6"
              >
                <span className="font-display text-sm font-semibold text-brand-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/5 text-fg">
                  <step.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------- Why Voltara */}
      <Section className="bg-bg-soft">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Why Voltara"
            title="Serious AI, without the agency baggage"
            description="We pair real automation engineering with a plain-English, done-for-you approach, and treat your business like we'd want ours treated."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-[#04121f]">
                  <value.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------------- FAQ */}
      <Section>
        <Container className="max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="Questions"
            title="The things businesses ask us first"
          />
          <div className="mt-10 flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-line bg-surface/60 p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="text-xl text-brand-teal transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}

/* --- Local components ---------------------------------------------------- */

function FeaturedService({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <div className="relative overflow-hidden rounded-3xl border border-transparent bg-surface p-8 [background:linear-gradient(var(--color-surface),var(--color-surface))_padding-box,var(--brand-gradient)_border-box] sm:p-10">
      <div className="glow-radial pointer-events-none absolute -top-24 right-0 h-72 w-72" />
      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-[#04121f]">
              <Icon className="h-6 w-6" />
            </span>
            <span className="rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#04121f]">
              {service.tagline}
            </span>
          </div>
          <h3 className="mt-6 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {service.title}
          </h3>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
            {service.description}
          </p>
          <Link
            href={`/services#${service.hash}`}
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-teal"
          >
            Explore sales automation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="flex flex-col gap-3 rounded-2xl border border-line bg-bg-soft/60 p-6">
          {service.points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-sm">
              <Check className="h-4 w-4 shrink-0 text-brand-teal" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ServiceTile({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services#${service.hash}`}
      className="group flex flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-surface"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/5 text-brand-teal">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {service.description}
      </p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-blue">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function HeroVisual() {
  const bars = [42, 56, 50, 68, 61, 84, 92];
  const rows = [
    { icon: PhoneCall, label: "Lead auto-qualified", meta: "AI" },
    { icon: MessagesSquare, label: "Customer chat answered", meta: "24/7" },
    { icon: CalendarCheck, label: "Sales meeting booked", meta: "Auto" },
    { icon: Workflow, label: "Synced to your CRM", meta: "Done" },
  ];

  return (
    <div className="relative animate-fade-up [animation-delay:120ms]">
      <div className="glow-radial pointer-events-none absolute inset-0 scale-110" />
      <div className="relative rounded-3xl border border-line bg-surface/80 p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              Your AI back office
            </p>
            <p className="mt-1 font-display text-lg font-semibold">This month</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
            </span>
            Live
          </span>
        </div>

        <div className="mt-6 flex items-end justify-between gap-2.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="w-full rounded-md bg-brand-gradient"
              style={{
                height: `${h}px`,
                opacity: 0.5 + (i / bars.length) * 0.5,
              }}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted">
          <TrendingUp className="h-3.5 w-3.5 text-brand-green" />
          Pipeline trending up
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-xl border border-line bg-bg-soft/80 px-4 py-3"
            >
              <span className="flex items-center gap-3 text-sm">
                <row.icon className="h-4 w-4 text-brand-teal" />
                {row.label}
              </span>
              <span className="text-xs text-muted">{row.meta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
