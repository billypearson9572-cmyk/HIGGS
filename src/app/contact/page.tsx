import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Search, Check } from "lucide-react";
import { Container, Eyebrow, GradientText } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Get a free marketing audit",
  description:
    "Tell us about your business and we'll send back a free, tailored review of your marketing: what's working, what's leaking growth, and the fastest wins.",
  alternates: { canonical: "/contact" },
};

const auditIncludes = [
  "A review of your current social presence",
  "Where you're losing potential leads",
  "Quick wins you can action right away",
  "A clear plan to grow, with or without us",
];

const nextSteps = [
  {
    title: "We review your details",
    body: "A real person reads your enquiry, usually within one business day.",
  },
  {
    title: "We prepare your free audit",
    body: "We put together a tailored review of your marketing and the biggest opportunities.",
  },
  {
    title: "We share it with you",
    body: "You get honest, practical recommendations and clear next steps. No obligation.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="glow-radial pointer-events-none absolute -top-32 left-1/2 h-[26rem] w-[40rem] -translate-x-1/2" />
        <Container className="relative py-20 text-center sm:py-24">
          <div className="mx-auto max-w-2xl">
            <Eyebrow>Free marketing audit</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Get your free <GradientText>marketing audit.</GradientText>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Tell us about your business and we&apos;ll send back a tailored
              review of your marketing: what&apos;s working, what&apos;s leaking
              growth, and the fastest wins. Free, and no obligation.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          {/* Form */}
          <div className="rounded-3xl border border-line bg-surface/60 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">
              Tell us about your business
            </h2>
            <p className="mt-2 text-sm text-muted">
              Fields marked optional can be skipped, just enough for us to give
              you something useful.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-transparent bg-surface p-6 [background:linear-gradient(var(--color-surface),var(--color-surface))_padding-box,var(--brand-gradient)_border-box]">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-[#04121f]">
                <Search className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">
                What&apos;s in your audit
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {auditIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-surface/60 p-6">
              <h3 className="font-display text-base font-semibold">
                Contact details
              </h3>
              <ul className="mt-4 flex flex-col gap-4 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-brand-teal" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-muted transition-colors hover:text-fg"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                {siteConfig.phone ? (
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-brand-teal" />
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                      className="text-muted transition-colors hover:text-fg"
                    >
                      {siteConfig.phone}
                    </a>
                  </li>
                ) : null}
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-brand-teal" />
                  <span className="text-muted">{siteConfig.location}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-brand-teal" />
                  <span className="text-muted">
                    Replies within 1 business day
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-surface/60 p-6">
              <h3 className="font-display text-base font-semibold">
                What happens next
              </h3>
              <ol className="mt-4 flex flex-col gap-5">
                {nextSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-[#04121f]">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-fg">
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm text-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
