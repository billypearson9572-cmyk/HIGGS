import type { Metadata } from "next";
import {
  ArrowRight,
  Mic,
  Video,
  Share2,
  Link2,
  Clock,
  Sparkles,
  Play,
  Check,
} from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Button,
  Card,
  GradientText,
} from "@/components/ui";
import { podcast, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${podcast.name} — the Voltara podcast`,
  description: podcast.tagline,
  alternates: { canonical: "/podcast" },
};

const whatYouGet = [
  {
    icon: Video,
    title: "A finished episode",
    body: "A polished recording of your conversation, yours to keep and share however you like.",
  },
  {
    icon: Share2,
    title: "Clips for social",
    body: "Short, captioned highlights you can post to LinkedIn, Instagram and your site.",
  },
  {
    icon: Link2,
    title: "A real backlink",
    body: "Your episode links back to your business, a genuine mention from another site.",
  },
  {
    icon: Sparkles,
    title: "A wider audience",
    body: "Your story in front of UK founders and owners looking to the US for what works.",
  },
];

const format = [
  {
    icon: Clock,
    title: "Short and remote",
    body: podcast.length,
  },
  {
    icon: Mic,
    title: "Just a conversation",
    body: "We talk about how you started, what's working, and what you're tackling next. No scripts.",
  },
  {
    icon: Video,
    title: "Nothing to prepare",
    body: "Turn up on the call, be yourself. We handle the recording, editing and publishing.",
  },
];

const steps = [
  {
    title: "A quick intro call",
    body: "Fifteen minutes to say hello, make sure it's a fit, and pick a recording time that suits you.",
  },
  {
    title: "We record the episode",
    body: `A relaxed ${podcast.length.toLowerCase()}. We do the technical bits, you just talk about your business.`,
  },
  {
    title: "You get the episode and clips",
    body: "We edit and publish, then send you the full episode plus short clips to share.",
  },
];

const forYou = [
  "You own or run a US business, ideally on the East Coast",
  "You've built something real and have a story worth hearing",
  "You're happy to share what works for a UK audience learning from the US",
  "You're open to a friendly conversation, not a sales pitch",
  "You'd like the exposure, the clips and the backlink that come with it",
];

export default function PodcastPage() {
  const platformLinks = [
    { href: podcast.links.youtube, label: "YouTube", icon: Play },
    { href: podcast.links.spotify, label: "Spotify", icon: Mic },
    { href: podcast.links.apple, label: "Apple Podcasts", icon: Mic },
  ].filter((l) => l.href);

  const hasEpisodes = podcast.episodes.length > 0;

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="glow-radial pointer-events-none absolute -top-32 left-1/2 h-[32rem] w-[46rem] -translate-x-1/2" />
        <Container className="relative py-20 text-center sm:py-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <Eyebrow>
              <Mic className="h-3.5 w-3.5" />
              {podcast.name} · a Voltara podcast
            </Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Come on <GradientText>{podcast.name}.</GradientText>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {podcast.intro}
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Button href="/book" size="lg">
                <Mic className="h-5 w-5" />
                Book your slot
              </Button>
              {platformLinks.length > 0 ? (
                <Button href={platformLinks[0].href} variant="secondary" size="lg" external>
                  Listen to an episode
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
            <p className="mt-6 text-sm text-muted">
              Season one is being recorded now, booking guests for the coming weeks.
            </p>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------- Format */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The format"
            title="A good conversation, made easy"
            description="No prep, no production hassle on your end. Show up and talk about the business you know inside out."
            align="center"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {format.map((f) => (
              <Card key={f.title}>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-[#04121f]">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ What you get */}
      <Section className="border-y border-line/60 bg-bg-soft/40">
        <Container>
          <SectionHeading
            eyebrow="Why come on"
            title="You walk away with more than a chat"
            description="Being a guest is genuinely useful for your business, not just for ours."
            align="center"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whatYouGet.map((w) => (
              <Card key={w.title}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-brand-teal">
                  <w.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- How it works */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <SectionHeading
              eyebrow="How it works"
              title="Three simple steps"
              description="From first hello to a published episode, we keep it light and do the heavy lifting."
            />
            <ol className="flex flex-col gap-8">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-[#04121f]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-fg">
                      {step.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ Episodes */}
      {hasEpisodes ? (
        <Section className="border-t border-line/60">
          <Container>
            <SectionHeading eyebrow="Episodes" title="Recent conversations" align="center" />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {podcast.episodes.map((ep) => (
                <a
                  key={ep.title}
                  href={ep.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <Card className="h-full transition-colors group-hover:border-white/25">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-teal">
                      {ep.company}
                    </p>
                    <h3 className="mt-3 font-display text-lg font-semibold">
                      {ep.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">with {ep.guest}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue">
                      Watch <ArrowRight className="h-4 w-4" />
                    </span>
                  </Card>
                </a>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* --------------------------------------------------------- Who it's for */}
      <Section className="border-t border-line/60 bg-bg-soft/40">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              eyebrow="Who it's for"
              title="Is it a fit for you?"
              description="We keep the guest list small and the conversations honest. If this sounds like you, we'd love to have you on."
            />
            <ul className="flex flex-col gap-4">
              {forYou.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                  <span className="text-base leading-relaxed text-fg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------- Book CTA */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="glow-radial pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Want to be a guest on {podcast.name}?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Grab a quick intro call and we&apos;ll find a recording time that
                works for you. No prep needed.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/book" size="lg">
                  <Mic className="h-5 w-5" />
                  Book your slot
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Ask a question
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              {platformLinks.length > 0 ? (
                <div className="mt-8 flex items-center justify-center gap-5">
                  {platformLinks.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                    >
                      <l.icon className="h-4 w-4" />
                      {l.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <p className="sr-only">
        {podcast.name} is hosted by {podcast.host}. Contact {siteConfig.email}.
      </p>
    </>
  );
}
