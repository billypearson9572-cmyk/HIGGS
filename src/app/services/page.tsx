import type { Metadata } from "next";
import { ArrowRight, Check, Sparkles, FileText, Plug, TrendingUp } from "lucide-react";
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
import { services } from "@/config/services";
import { cta } from "@/config/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI systems built and run for you: sales automation, customer-service chatbots, internal-ops automation, AI marketing, custom builds, industry-specific systems and business development.",
  alternates: { canonical: "/services" },
};

const serviceSchemas = servicesSchema(
  services.map((s) => ({
    name: s.title,
    description: s.description,
    hash: s.hash,
  })),
);

const howWeWork = [
  {
    icon: FileText,
    title: "Scoped & quoted up front",
    body: "Every system is a defined project with a price agreed before we start. No retainers, no surprises.",
  },
  {
    icon: Plug,
    title: "Built on your tools",
    body: "We connect to the apps and accounts you already use, so everything stays yours.",
  },
  {
    icon: TrendingUp,
    title: "Prove ROI, then expand",
    body: "We start with the highest-return system, show it working, and only then build the next.",
  },
];

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
              AI systems that{" "}
              <GradientText>do the work for you.</GradientText>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Seven ways we put AI to work in your business, all designed, built
              and run for you. Most clients start with sales automation, then
              expand as it pays for itself.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={cta.href} size="lg">
                <Sparkles className="h-5 w-5" />
                {cta.label}
              </Button>
              <Button href="#sales-automation" variant="secondary" size="lg">
                See the flagship
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------- Service sections */}
      {services.map((service, i) => {
        const Icon = service.icon;
        return (
          <Section
            key={service.hash}
            id={service.hash}
            className={i % 2 === 1 ? "bg-bg-soft" : undefined}
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-[#04121f]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full border border-line px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                      {service.featured
                        ? `Flagship · ${service.tagline}`
                        : service.tagline}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                    {service.description}
                  </p>
                  <div className="mt-2">
                    <Button href={cta.href} size="md">
                      {service.featured
                        ? "Start with sales automation"
                        : "Get started"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <ul className="grid gap-3 rounded-2xl border border-line bg-surface/60 p-6 sm:grid-cols-2 lg:p-8">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </Section>
        );
      })}

      {/* ---------------------------------------------------------- How we work */}
      <Section className="border-t border-line/60">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="How we work"
            title="Start with one system. Expand as it pays off."
            description="No retainers, no long contracts, no lock-in. We scope each system as a project and prove the return before building the next."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {howWeWork.map((item) => (
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
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Let's find your highest-ROI AI win"
        description="Tell us how your business runs today and we'll send back a free audit: the systems that'll save you the most time and win you the most revenue, and exactly where to start."
      />
    </>
  );
}
