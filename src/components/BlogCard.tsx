import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/content/blog";
import { cn, formatDate } from "@/lib/utils";

export function BlogCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-surface",
        featured && "sm:p-8",
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        <span className="rounded-full bg-brand-gradient px-2.5 py-0.5 font-semibold text-[#04121f]">
          {post.category}
        </span>
        <span>{formatDate(post.date)}</span>
        <span aria-hidden>·</span>
        <span>{post.readingMinutes} min read</span>
      </div>

      <h3
        className={cn(
          "mt-4 font-display font-semibold leading-snug tracking-tight text-fg transition-colors group-hover:text-white",
          featured ? "text-2xl" : "text-xl",
        )}
      >
        {post.title}
      </h3>

      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
        {post.description}
      </p>

      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-blue">
        Read article
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
