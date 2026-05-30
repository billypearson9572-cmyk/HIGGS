import type { Metadata } from "next";
import { Container, Section, Eyebrow, GradientText } from "@/components/ui";
import { BlogCard } from "@/components/BlogCard";
import { CTASection } from "@/components/CTASection";
import { getAllPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical insights on social media marketing, AI automation and growth for small and medium businesses, from the Voltara Digital team.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="glow-radial pointer-events-none absolute -top-32 left-1/2 h-[24rem] w-[40rem] -translate-x-1/2" />
        <Container className="relative py-20 text-center sm:py-24">
          <div className="mx-auto max-w-2xl">
            <Eyebrow>The Voltara blog</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Marketing, automation &{" "}
              <GradientText>growth, decoded.</GradientText>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              No fluff, no jargon. Just practical ideas to help you bring in more
              customers and win back your time.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          {featured ? (
            <div className="mb-6">
              <BlogCard post={featured} featured />
            </div>
          ) : null}

          {rest.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : null}
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
