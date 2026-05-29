import type { Metadata } from "next";
import { Mail, Phone, MapPin, CalendarCheck, Clock } from "lucide-react";
import { Container, Eyebrow, GradientText } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Voltara Digital. Tell us about your business and we'll show you how to grow it with marketing and automation.",
};

const nextSteps = [
  {
    title: "We read your message",
    body: "A real person reviews your enquiry — usually within one business day.",
  },
  {
    title: "We book a quick call",
    body: "A relaxed 30-minute chat to understand your goals and see if we're a fit.",
  },
  {
    title: "You get a clear plan",
    body: "We follow up with honest, tailored recommendations — no obligation.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="glow-radial pointer-events-none absolute -top-32 left-1/2 h-[26rem] w-[40rem] -translate-x-1/2" />
        <Container className="relative py-20 text-center sm:py-24">
          <div className="mx-auto max-w-2xl">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Let&apos;s build your <GradientText>growth engine.</GradientText>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Tell us a little about your business and what you&apos;d like to
              achieve. We&apos;ll get back to you with honest, practical next
              steps.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          {/* Form */}
          <div className="rounded-3xl border border-line bg-surface/60 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">Send us a message</h2>
            <p className="mt-2 text-sm text-muted">
              Fields marked optional can be skipped — just give us enough to
              point you in the right direction.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-transparent bg-surface p-6 [background:linear-gradient(var(--color-surface),var(--color-surface))_padding-box,var(--brand-gradient)_border-box]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-[#04121f]">
                <CalendarCheck className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display font-semibold">
                  Prefer to talk? Book a call
                </p>
                <p className="mt-1 text-sm text-muted">
                  Grab a free 30-minute strategy slot.
                </p>
              </div>
            </a>

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
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-brand-teal" />
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                    className="text-muted transition-colors hover:text-fg"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
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
