import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/ui";
import type { LegalDoc } from "@/content/legal";

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

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <article className="relative overflow-hidden">
      <div className="glow-radial pointer-events-none absolute -top-32 left-1/2 h-[22rem] w-[38rem] -translate-x-1/2" />
      <Container className="relative max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {doc.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{doc.intro}</p>

        <div className="prose prose-invert prose-volt mt-10 max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-xl prose-a:font-medium prose-a:text-brand-blue hover:prose-a:text-brand-teal prose-strong:text-fg prose-li:marker:text-brand-teal">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: MarkdownLink }}>
            {doc.content}
          </ReactMarkdown>
        </div>
      </Container>
    </article>
  );
}
