import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui";
import { CTASection } from "@/components/CTASection";
import { getAllPosts, getPostBySlug } from "@/content/blog";
import { formatDate } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

// Internal links use the client router; external links open in a new tab.
function MarkdownLink({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  if (href && href.startsWith("/")) {
    return <Link href={href}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article className="relative overflow-hidden">
        <div className="glow-radial pointer-events-none absolute -top-32 left-1/2 h-[24rem] w-[40rem] -translate-x-1/2" />
        <Container className="relative max-w-3xl py-16 sm:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span className="rounded-full bg-brand-gradient px-2.5 py-0.5 text-xs font-semibold text-[#04121f]">
              {post.category}
            </span>
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {post.description}
          </p>

          <div className="mt-6 flex items-center gap-3 border-y border-line py-4 text-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-[#04121f]">
              VD
            </span>
            <span className="text-muted">
              By <span className="text-fg">{post.author}</span>
            </span>
          </div>

          <div className="prose prose-invert prose-volt mt-10 max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-xl prose-a:font-medium prose-a:text-brand-blue hover:prose-a:text-brand-teal prose-strong:text-fg prose-li:marker:text-brand-teal">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{ a: MarkdownLink }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </Container>
      </article>

      <CTASection
        title="Like the thinking? Let's apply it to your business."
        description="Book a free strategy call and we'll turn ideas like these into a concrete plan for your growth."
      />
    </>
  );
}
