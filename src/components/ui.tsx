import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* --- Layout -------------------------------------------------------------- */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

/* --- Typography ---------------------------------------------------------- */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function GradientText({ children }: { children: ReactNode }) {
  return <span className="text-gradient">{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* --- Card ---------------------------------------------------------------- */

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* --- Button -------------------------------------------------------------- */

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50 disabled:pointer-events-none disabled:opacity-60";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-gradient font-semibold text-[#04121f] shadow-[0_10px_34px_-12px_rgba(52,199,201,0.65)] hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-12px_rgba(52,199,201,0.85)]",
  secondary:
    "border border-line bg-white/0 text-fg hover:border-white/25 hover:bg-white/5",
  ghost: "text-muted hover:text-fg",
};

const buttonSizes: Record<ButtonSize, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const classes = cn(
    buttonBase,
    buttonVariants[variant],
    buttonSizes[size],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
