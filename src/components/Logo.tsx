import { cn } from "@/lib/utils";

/**
 * Voltara mark + wordmark, drawn as inline SVG so it stays crisp at any size
 * and inherits the brand gradient. To use your exact logo file instead, drop
 * it in /public and swap this component for a next/image.
 *
 * `id` must be unique per page (the gradient is referenced by id), so pass a
 * distinct value when more than one Logo is rendered on the same page.
 */
export function Logo({
  withWordmark = true,
  size = 34,
  id = "vd-logo",
  className,
}: {
  withWordmark?: boolean;
  size?: number;
  id?: string;
  className?: string;
}) {
  const gradId = `${id}-grad`;
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="6"
            y1="6"
            x2="58"
            y2="60"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8ae04b" />
            <stop offset="0.5" stopColor="#34c7c9" />
            <stop offset="1" stopColor="#1e8fe6" />
          </linearGradient>
        </defs>
        {/* The "V" */}
        <path
          d="M8 7 L23 7 L33 44 L43 7 L58 7 L33 60 Z"
          fill={`url(#${gradId})`}
        />
        {/* Lightning bolt highlight */}
        <path
          d="M37 12 L25 37 L32 37 L29 54 L43 28 L35 28 Z"
          fill="#eafcff"
          fillOpacity="0.95"
        />
      </svg>

      {withWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.05rem] font-bold tracking-[0.22em] text-fg">
            VOLTARA
          </span>
          <span className="mt-0.5 text-[0.58rem] font-medium tracking-[0.42em] text-muted">
            DIGITAL
          </span>
        </span>
      ) : null}
    </span>
  );
}
