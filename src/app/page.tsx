import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Calculator,
  Megaphone,
  Workflow,
  Search,
  Rocket,
  TrendingUp,
  Check,
  ShieldCheck,
  Repeat,
  Sparkles,
  CircleDot,
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
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const problems = [
  {
    icon: TrendingUp,
    title: "Feast or famine",
    body: "Some months are packed, others are dead quiet, and you can never predict which is coming next.",
  },
  {
    icon: Search,
    title: "Invisible to new customers",
    body: "The people who'd love what you do have never heard of you, because you're not showing up where they look.",
  },
  {
    icon: CircleDot,
    title: "No system to lean on",
    body: "Growth depends on you personally hustling for referrals. The moment you stop, the pipeline dries up.",
  },
];

const steps = [
  {
    icon: Search,
    title: "Discovery & audit",
    body: "We dig into your goals, audience and current presence to find the fastest path to more customers.",
  },
  {
    icon: Megaphone,
    title: "Strategy & launch",
    body: "We build your content engine and launch campaigns designed to attract, nurture and convert.",
  },
  {
    icon: Rocket,
    title: "Grow & optimise",
    body: "Leads start flowing. We double down on what's working using real data, not guesswork.",
  },
  {
    icon: Workflow,
    title: "Automate & scale",
    body: "Once you're busy, we automate the admin so growth never turns into overwhelm.",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Done for you",
    body: "We run it end to end. You stay focused on serving the customers we bring you.",
  },
  {
    icon: Sparkles,
    title: "Built for SMEs",
    body: "No bloated retainers or agency jargon, just practical growth for real businesses.",
  },
  {
    icon: Workflow,
    title: "Powered by automation",
    body: "We use n8n and AI to do the repetitive work, so your results scale without the headcount.",
  },
  {
    icon: Repeat,
    title: "Owned by you",
    body: "Your accounts, your data, your workflows. No lock-in, no holding your business hostage.",
  },
];

const faqs = [
  {
    q: "How soon will I see results?",
    a: "Marketing compounds. Most clients see early traction, more reach and enquiries, within the first 4 to 8 weeks, with momentum building from there. We focus on the metrics that lead to revenue, not vanity numbers.",
  },
  {
    q: "Do I need to be on every social platform?",
    a: "No. We focus on the one or two channels where your customers actually spend time and do them properly, rather than spreading thin across all of them.",
  },
  {
    q: "What exactly do you automate?",
    a: "Anything repetitive that's costing you time or losing you leads: lead capture into your CRM, instant follow-ups, nurture emails, reminders and reporting. We build it on n8n so it connects to the tools you already use.",
  },
  {
    q: "Are there long contracts?",
    a: "We work in flexible monthly engagements. We'd rather earn your business every month than trap you in a 12-month tie-in.",
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
              Social media marketing + AI automation
            </Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Grow beyond <GradientText>word-of-mouth.</GradientText>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {siteConfig.name} builds the marketing engine that brings small and
              medium businesses a steady, predictable flow of customers, then
              automates the admin behind it, so scaling never means drowning in
              busywork.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={cta.href} size="lg">
                <Search className="h-5 w-5" />
                {cta.label}
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                Explore our services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted">
              Free, no-obligation. For ambitious SMEs ready to stop relying on
              referrals alone.
            </p>
          </div>

          <HeroVisual />
        </Container>
      </section>

      {/* ------------------------------------------------------------- The thesis */}
      <Section className="border-t border-line/60">
        <Container>
          <SectionHeading
            eyebrow="The hard truth"
            title={
              <>
                Relationships got you here. They won&apos;t get you to{" "}
                <GradientText>scale.</GradientText>
              </>
            }
            description="Word-of-mouth is powerful, but it's unpredictable, impossible to forecast, and caps how fast you can grow. Today, the businesses pulling ahead aren't always the best ones. They're the most visible."
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

      {/* ----------------------------------------------------------- Two services */}
      <Section className="bg-bg-soft">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="What we do"
            title={
              <>
                Two engines. <GradientText>One growth system.</GradientText>
              </>
            }
            description="We start by filling your funnel. Then, once the leads are flowing, we automate the admin so your time scales with your revenue, not against it."
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
            <ServiceCard
              phase="Phase 1"
              icon={Megaphone}
              title="Social media marketing"
              body="We turn your social channels into a consistent source of qualified leads: strategy, content, paid ads and community management, all done for you."
              points={[
                "Content strategy & creation",
                "Paid social advertising",
                "Community management",
                "Analytics & reporting",
              ]}
              href="/services#social-media"
              cta="Marketing services"
            />
            <ServiceCard
              phase="Phase 2"
              icon={Workflow}
              title="AI automation"
              body="Once you're growing, busywork becomes the bottleneck. We automate emails, CRM updates, follow-ups and reporting with smart n8n workflows, so nothing slips and you get your week back."
              points={[
                "Lead capture into your CRM",
                "Instant, personalised follow-ups",
                "Email nurture sequences",
                "Automated reporting",
              ]}
              href="/services#automation"
              cta="Automation services"
            />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------- Calculator promo */}
      <Section className="py-14 sm:py-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-transparent bg-surface px-6 py-12 [background:linear-gradient(var(--color-surface),var(--color-surface))_padding-box,var(--brand-gradient)_border-box] sm:px-12">
            <div className="glow-radial pointer-events-none absolute -top-20 right-0 h-72 w-[32rem]" />
            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <Eyebrow>
                  <Calculator className="h-3.5 w-3.5 text-brand-teal" />
                  Free tool
                </Eyebrow>
                <h2 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  How much is slow lead response{" "}
                  <GradientText>costing you?</GradientText>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  Most SMEs lose more revenue to slow follow-up than they
                  realise. Plug in your numbers and see the leak in real time,
                  plus what instant, automated follow-up could recover.
                </p>
              </div>
              <Button href="/lead-calculator" size="lg" className="shrink-0">
                Try the calculator
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
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
                A clear path from invisible to{" "}
                <GradientText>in-demand.</GradientText>
              </>
            }
            description="No mystery, no smoke and mirrors. Here's exactly how we take you from relying on referrals to running a predictable growth system."
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
            title="Marketing muscle, without the agency baggage"
            description="We pair creative marketing with serious automation, and treat your business like we'd want ours treated."
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

function ServiceCard({
  phase,
  icon: Icon,
  title,
  body,
  points,
  href,
  cta,
}: {
  phase: string;
  icon: React.ElementType;
  title: string;
  body: string;
  points: string[];
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col rounded-3xl border border-line bg-surface p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-[#04121f]">
          <Icon className="h-6 w-6" />
        </span>
        <span className="rounded-full border border-line px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-muted">
          {phase}
        </span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
      <ul className="mt-6 flex flex-col gap-3">
        {points.map((point) => (
          <li key={point} className="flex items-center gap-3 text-sm">
            <Check className="h-4 w-4 shrink-0 text-brand-teal" />
            {point}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-teal"
      >
        {cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function HeroVisual() {
  const bars = [42, 56, 50, 68, 61, 84, 92];
  const rows = [
    { icon: Megaphone, label: "Campaign live", meta: "Active" },
    { icon: CalendarCheck, label: "12 posts scheduled", meta: "This week" },
    { icon: Repeat, label: "Auto-reply to new leads", meta: "On" },
    { icon: Workflow, label: "Leads synced to CRM", meta: "n8n" },
  ];

  return (
    <div className="relative animate-fade-up [animation-delay:120ms]">
      <div className="glow-radial pointer-events-none absolute inset-0 scale-110" />
      <div className="relative rounded-3xl border border-line bg-surface/80 p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              Your growth system
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
          Leads trending up
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
