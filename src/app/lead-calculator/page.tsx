import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import { Container, Eyebrow, GradientText } from "@/components/ui";
import { LeadCalculator } from "@/components/LeadCalculator";

export const metadata: Metadata = {
  title: "Lead Response Revenue Calculator",
  description:
    "See how much revenue your business is losing to slow lead follow-up. A free tool from Voltara Digital — adjust your numbers and watch the impact of speed-to-lead in real time.",
  alternates: { canonical: "/lead-calculator" },
};

export default function LeadCalculatorPage() {
  return (
    <>
      {/* ------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="glow-radial pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[44rem] -translate-x-1/2" />
        <Container className="relative py-16 text-center sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <Eyebrow>
              <Calculator className="h-3.5 w-3.5 text-brand-teal" />
              Free tool
            </Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              How much revenue is your{" "}
              <GradientText>slow lead response</GradientText> costing you?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Every minute a new lead waits, the odds of winning them drop. Plug
              in your numbers below to see the revenue slipping through the
              cracks — and what instant, automated follow-up could recover.
            </p>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- Calculator */}
      <Container className="py-12 sm:py-16">
        <LeadCalculator />
      </Container>
    </>
  );
}
