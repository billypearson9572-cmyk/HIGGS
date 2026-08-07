import type { Metadata } from "next";
import Link from "next/link";
import {
  PhoneCall,
  MessageSquareText,
  Filter,
  CalendarCheck,
  Repeat,
  Database,
  Check,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Container, Section, Eyebrow, Card, GradientText } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Stop losing leads to slow replies",
  description:
    "A done-for-you lead system for UK businesses: every call, form and message answered in 60 seconds, qualified, booked and followed up automatically. Live in three weeks.",
  alternates: { canonical: "/leads" },
  // Campaign landing page: kept out of the index so it never competes with
  // the homepage for the same terms.
  robots: { index: false, follow: true },
};

/** The funnel, in the order a real enquiry travels through it. */
const funnel = [
  {
    icon: PhoneCall,
    step: "01",
    title: "It catches everything",
    body: "Missed calls, web forms, WhatsApp, Facebook and Instagram messages all land in one place. Nothing sits in an inbox nobody checks.",
  },
  {
    icon: MessageSquareText,
    step: "02",
    title: "It replies in 60 seconds",
    body: "Every enquiry gets a personal reply within a minute, day or night, in your tone of voice. Before they've had time to ring anyone else.",
  },
  {
    icon: Filter,
    step: "03",
    title: "It qualifies them",
    body: "It asks the questions you'd ask: what they need, where they are, budget and timing. Time-wasters get filtered out before they reach you.",
  },
  {
    icon: CalendarCheck,
    step: "04",
    title: "It books the job",
    body: "Good leads get offered real slots from your calendar and book themselves in. You get a notification, not a to-do.",
  },
  {
    icon: Repeat,
    step: "05",
    title: "It chases the quiet ones",
    body: "No reply? It follows up automatically over the next few days, then stops. This is where most of the recovered revenue actually comes from.",
  },
  {
    icon: Database,
    step: "06",
    title: "It logs the lot",
    body: "Every enquiry, reply and booking written into your CRM or a simple sheet, so you can finally see what your marketing is really producing.",
  },
];

const objections = [
  {
    q: "Will it sound like a robot?",
    a: "You approve every message template before it goes live, and it replies in your words. Anything it isn't sure about gets handed straight to a human.",
  },
  {
    q: "Do I have to change my tools?",
    a: "No. It's built on the phone number, inbox, calendar and CRM you already use. Your accounts, your data, and yours to keep.",
  },
  {
    q: "How long until it's running?",
    a: "Live in about three weeks. Your total time involved is two to three hours, because building it is our job, not yours.",
  },
  {
    q: "What does it cost?",
    a: "It's priced per project, because it depends on your volume and tools. We look at your setup first, then you get one fixed price before any work starts. Founding clients pay half.",
  },
  {
    q: "What if it doesn't work?",
    a: "Then you don't pay. No invoice goes out until it has caught your first missed enquiry, or 30 days after it goes live, whichever comes first \u2014 and if it isn't live within 30 days of kickoff you don't pay at all. The risk sits with us, which is the only fair way round when you haven't worked with us before.",
  },
  {
    q: "Do I have to get on a call?",
    a: "No. You get a video, you watch it whenever suits you, and you decide. If you'd rather talk it through we're happy to, but it's your choice, not a hoop.",
  },
];

export default function LeadsLandingPage() {
  return (
    <>
      {/* ------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="glow-radial pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[46rem] -translate-x-1/2" />
        <Container className="relative py-20 text-center sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>
              <Clock className="h-3.5 w-3.5 text-brand-teal" />
              For UK businesses that live on enquiries
            </Eyebrow>
            <h1 className="mx-auto mt-6 max-w-2xl text-balance font-display text-[2.5rem] font-bold leading-[1.12] tracking-tight sm:text-5xl">
              You&apos;re not losing leads.{" "}
              <GradientText>You&apos;re losing them slowly.</GradientText>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              An enquiry that waits an hour has usually already rung someone
              else. We build the system that answers in 60 seconds, qualifies
              them, books them in and chases the ones who go quiet.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#book"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 text-base font-semibold text-[#04121f] shadow-[0_10px_34px_-12px_rgba(52,199,201,0.65)] transition-all duration-200 hover:-translate-y-0.5"
              >
                Get my free audit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/lead-calculator"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-base font-medium text-muted transition-colors hover:text-fg"
              >
                See what it&apos;s costing you
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted">
              You don&apos;t pay until it catches your first missed enquiry ·
              Built on your existing tools · You own it
            </p>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- The cost */}
      <Section className="py-14 sm:py-16">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              {
                stat: "7x",
                body: "more likely to qualify a lead when you reply within the hour, rather than even an hour later.",
              },
              {
                stat: "42 hrs",
                body: "was the average first response time across the firms audited. Most buyers are long gone by then.",
              },
              {
                stat: "5 mins",
                body: "is the window where a lead is still hot. After that, conversion drops away sharply.",
              },
            ].map((item) => (
              <Card key={item.stat} className="text-center">
                <p className="font-display text-3xl font-extrabold">
                  <GradientText>{item.stat}</GradientText>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </Card>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-muted/80">
            First two figures: Harvard Business Review, &ldquo;The Short Life of
            Online Sales Leads&rdquo;, an audit of 2,241 companies. The
            five-minute window comes from the Lead Response Management study.
            Published research, shown to give you a sense of the scale. Not a
            promise about your business.
          </p>
        </Container>
      </Section>

      {/* --------------------------------------------------------- The funnel */}
      <Section className="bg-bg-soft">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>The system</Eyebrow>
            <h2 className="mt-5 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              What happens the moment someone{" "}
              <GradientText>gets in touch.</GradientText>
            </h2>
          </div>
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {funnel.map((item) => (
              <Card key={item.step}>
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/5 text-brand-teal">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-sm font-bold text-muted/60">
                    {item.step}
                  </span>
                </div>
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

      {/* ------------------------------------------------- Founding + honesty */}
      <Section className="py-14 sm:py-16">
        <Container>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-transparent bg-surface px-6 py-10 [background:linear-gradient(var(--color-surface),var(--color-surface))_padding-box,var(--brand-gradient)_border-box] sm:px-10">
            <div className="glow-radial pointer-events-none absolute -top-20 right-0 h-64 w-96" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <Eyebrow>Founding clients</Eyebrow>
                <h2 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Three spots.{" "}
                  <GradientText>Half the standard rate.</GradientText>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  Voltara is new, and I&apos;d rather trade than pretend
                  otherwise. Three founding clients get the same build at half
                  price, in exchange for a case study, a testimonial and one
                  introduction. In writing, both ways.
                </p>
                <p className="mt-4 text-sm font-medium text-fg/80">
                  Billy Pearson, founder
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  "One fixed price, agreed before we start",
                  "Live in about three weeks",
                  "Your accounts, your data, no lock-in",
                  "Support afterwards is optional",
                ].map((line) => (
                  <div
                    key={line}
                    className="flex items-center gap-3 rounded-xl border border-line bg-bg-soft/60 px-4 py-3 text-sm"
                  >
                    <Check className="h-4 w-4 shrink-0 text-brand-teal" />
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------- FAQ */}
      <Section className="bg-bg-soft">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">
              The questions everyone asks
            </h2>
            <div className="mt-10 flex flex-col gap-4">
              {objections.map((item) => (
                <Card key={item.q}>
                  <h3 className="font-display text-base font-semibold">
                    {item.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.a}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------- Book */}
      <Section id="book" className="scroll-mt-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Next step</Eyebrow>
            <h2 className="mt-5 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Fifteen minutes to see if it{" "}
              <GradientText>fits your business.</GradientText>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Give us your website and we&apos;ll enquire with you the way a
              customer would. You get back a short video showing exactly what
              happened, what it&apos;s costing you and what we&apos;d change.
              No call needed, no slides, no obligation, and it&apos;s yours to
              keep whether or not you hire us.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl">
            <ContactForm
              submitLabel="Send me my free audit"
              topic="leads-landing"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
