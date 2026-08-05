import { ArrowRight, Search } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { cta } from "@/config/site";

export function CTASection({
  title = "See what happens to your enquiries",
  description = "Send us your website and we'll send back a short video: what actually happens when someone enquires with you today, and what we'd change. Free, no call needed, no obligation. If you'd rather talk it through, we're happy to do that instead.",
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
              <Button href={cta.href} size="lg">
                <Search className="h-5 w-5" />
                {cta.label}
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                Explore services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
