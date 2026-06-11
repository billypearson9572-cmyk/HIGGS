import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { Container, Eyebrow, GradientText } from "@/components/ui";
import { HorseRaceAnalyzer } from "@/components/HorseRaceAnalyzer";

export const metadata: Metadata = {
  title: "Horse Race Value Finder",
  description:
    "Assess any horse race in seconds. This free tool pulls live odds and form from the web, estimates each runner's fair win chance, and ranks the field by betting value to surface the best-value odds.",
  alternates: { canonical: "/horse-race" },
};

export default function HorseRacePage() {
  return (
    <>
      {/* ------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="glow-radial pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[44rem] -translate-x-1/2" />
        <Container className="relative py-16 text-center sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <Eyebrow>
              <Sparkles className="h-3.5 w-3.5 text-brand-teal" />
              Horse race value finder
            </Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Find the <GradientText>best-value odds</GradientText> in any race
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Name a race and the analyzer pulls the latest odds and form from
              the web, estimates each runner&apos;s true win chance, and ranks
              the field by value — so you can see exactly where the price is
              generous and where it isn&apos;t.
            </p>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- Analyzer */}
      <Container className="py-12 sm:py-16">
        <HorseRaceAnalyzer />
      </Container>
    </>
  );
}
