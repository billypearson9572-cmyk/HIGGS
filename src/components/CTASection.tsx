import { ArrowRight, CalendarCheck } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { siteConfig } from "@/config/site";

export function CTASection({
  title = "Ready to grow beyond referrals?",
  description = "Book a free 30-minute strategy call. We'll map where your marketing is leaking growth — and exactly how to fix it. No pressure, no jargon.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="glow-radial pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={siteConfig.bookingUrl} external size="lg">
                <CalendarCheck className="h-5 w-5" />
                Book a free strategy call
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Send us a message
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
