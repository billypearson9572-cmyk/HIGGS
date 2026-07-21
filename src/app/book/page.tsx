import type { Metadata } from "next";
import { CalendarClock, Mail, Clock, Check, Video } from "lucide-react";
import { Container, Eyebrow, GradientText } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Pick a time for a quick, no-pressure call with Voltara Digital, whether you're coming on the podcast or want to talk about your business.",
  alternates: { canonical: "/book" },
  // A booking page shouldn't dilute the site's SEO; keep it out of the index.
  robots: { index: false, follow: true },
};

const whatToExpect = [
  "A friendly 15 minutes, no slides and no hard sell",
  "A quick sense of whether we're a fit",
  "A recording time picked around your schedule",
  "Clear next steps before we hang up",
];

export default function BookPage() {
  const hasScheduler = Boolean(siteConfig.bookingUrl);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="glow-radial pointer-events-none absolute -top-32 left-1/2 h-[26rem] w-[40rem] -translate-x-1/2" />
        <Container className="relative py-20 text-center sm:py-24">
          <div className="mx-auto max-w-2xl">
            <Eyebrow>
              <CalendarClock className="h-3.5 w-3.5" />
              Book a call
            </Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Let&apos;s find a <GradientText>time.</GradientText>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Fifteen minutes to say hello and line up a slot, whether you&apos;re
              coming on the podcast or just want to talk through your business.
              No prep, no pressure.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          {/* Scheduler, or request-a-time fallback */}
          <div className="rounded-3xl border border-line bg-surface/60 p-6 sm:p-8">
            {hasScheduler ? (
              <>
                <h2 className="font-display text-2xl font-bold">Pick a time</h2>
                <p className="mt-2 text-sm text-muted">
                  Choose a slot that suits you and you&apos;ll get a calendar
                  invite straight away.
                </p>
                <div className="mt-8 overflow-hidden rounded-2xl border border-line">
                  <iframe
                    src={siteConfig.bookingUrl}
                    title="Book a call with Voltara Digital"
                    className="h-[70vh] min-h-[640px] w-full"
                    loading="lazy"
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold">
                  Send us your availability
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Tell us a little about you and roughly when you&apos;re free,
                  and we&apos;ll come straight back with a time.
                </p>
                <div className="mt-8">
                  <ContactForm submitLabel="Request my call" topic="Call booking" />
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-transparent bg-surface p-6 [background:linear-gradient(var(--color-surface),var(--color-surface))_padding-box,var(--brand-gradient)_border-box]">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-[#04121f]">
                <Video className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">
                What to expect
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {whatToExpect.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-surface/60 p-6">
              <h3 className="font-display text-base font-semibold">
                Prefer email?
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
                  <Clock className="h-5 w-5 text-brand-teal" />
                  <span className="text-muted">Replies within 1 business day</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
