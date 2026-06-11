import type { Metadata } from "next";
import { Zap, Target, Repeat, Eye, Handshake, Layers } from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Card,
  GradientText,
} from "@/components/ui";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Voltara Digital is an AI agency. We help businesses sell more, serve customers around the clock and cut hours of manual admin with AI systems built and run for them.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Target,
    title: "Outcomes over hype",
    body: "We care about revenue, time saved and customers served, not shiny demos. Every system ties back to a real business result.",
  },
  {
    icon: Repeat,
    title: "Built to be owned by you",
    body: "Your accounts, your data, your workflows. We build you leverage, never lock-in. If we ever part ways, you keep everything.",
  },
  {
    icon: Zap,
    title: "Automation with a human touch",
    body: "We automate the repetitive work so the human moments, the conversations that win customers, get more of your attention, not less.",
  },
  {
    icon: Eye,
    title: "Radically transparent",
    body: "Clear reporting, plain English and honest advice. You'll always know what we're doing, why, and what it's getting you.",
  },
];

const differentiators = [
  {
    icon: Handshake,
    title: "Senior attention, not a junior handover",
    body: "You work directly with the people doing the work. No being passed to an intern after the sales call.",
  },
  {
    icon: Layers,
    title: "Every system under one roof",
    body: "Sales, service, marketing, ops and custom builds from one team, so your AI systems are designed to work together, not in silos.",
  },
  {
    icon: Target,
    title: "Built around your numbers",
    body: "We start from the result you want and work backwards, then report against it honestly, every single month.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="glow-radial pointer-events-none absolute -top-32 right-0 h-[28rem] w-[40rem]" />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow>About Voltara</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              The AI partner your business{" "}
              <GradientText>actually needs.</GradientText>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              We started Voltara Digital with a simple frustration: brilliant
              businesses pouring hours into manual work and losing deals to slow,
              clunky processes, while the tools to fix it sat unused. Great
              businesses deserve to run like the big players. We&apos;re here to
              make that happen.
            </p>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Mission */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Our mission"
                title="Running a business shouldn't mean drowning in it"
              />
              <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted">
                <p>
                  For most businesses, the day disappears into manual work:
                  chasing leads, answering the same questions, copying data
                  between tools, pulling reports. It&apos;s draining, it&apos;s
                  slow, and it quietly caps how far you can grow.
                </p>
                <p>
                  We believe every good business deserves systems it can rely on:
                  AI that wins and serves customers, and automation that clears
                  the busywork, without burning out the owner or hiring a bigger
                  team.
                </p>
                <p>
                  So that&apos;s what we build. We give businesses the kind of AI
                  systems that used to be reserved for big companies with big
                  budgets, designed, built and run for you.
                </p>
              </div>
            </div>

            <Card className="border-gradient self-start p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-[#04121f]">
                <Zap className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold">
                Why &ldquo;Voltara&rdquo;?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                The name comes from <em>volt</em>, the unit of electrical
                energy. It&apos;s the spark that gets things moving and the
                current that keeps them running. That&apos;s the role we want to
                play for your business: the energy behind your growth, and the
                steady current that sustains it.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------- Values */}
      <Section className="bg-bg-soft">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="What we stand for"
            title="The principles behind every decision"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <Card key={value.title} className="flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-white/5 text-brand-teal">
                  <value.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {value.body}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- How we're different */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How we're different"
            title={
              <>
                Not your typical{" "}
                <GradientText>AI agency.</GradientText>
              </>
            }
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-line bg-surface/60 p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-[#04121f]">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Let's grow something together"
        description="If you've got a business you're proud of and you're ready for more people to know about it, we should talk."
      />
    </>
  );
}
