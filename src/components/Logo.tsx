import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Voltara Digital logo, built from the real brand assets in /public:
 *   - voltara-mark.png      the gradient "V" (white background keyed out)
 *   - voltara-wordmark.png  "VOLTARA DIGITAL" recoloured light for dark UI
 *
 * Pass `withWordmark={false}` to render just the mark.
 */
export function Logo({
  withWordmark = true,
  className,
}: {
  withWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/voltara-mark.png"
        alt="Voltara Digital"
        width={512}
        height={442}
        className="h-9 w-auto"
      />
      {withWordmark ? (
        <Image
          src="/voltara-wordmark.png"
          alt=""
          width={680}
          height={174}
          className="h-6 w-auto"
        />
      ) : null}
    </span>
  );
}
