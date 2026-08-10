import type { Metadata } from "next";
import { Container, Eyebrow, GradientText } from "@/components/ui";
import { EmailSignature } from "@/components/EmailSignature";
import { siteConfig } from "@/config/site";

/**
 * Internal tool: reachable by anyone with the link, but kept out of search and
 * out of the sitemap. Deliberately not listed in robots.txt — a Disallow line
 * would advertise the URL to anyone who reads it, and would stop crawlers
 * fetching the page at all, which is how they see the noindex below.
 */
export const metadata: Metadata = {
  title: "Email signature",
  description: "Internal tool for copying the Voltara Digital email signature.",
  robots: { index: false, follow: true },
};

export default function SignaturePage() {
  return (
    <Container className="py-20 sm:py-24">
      <div className="max-w-2xl">
        <Eyebrow>Internal</Eyebrow>
        <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
          Email <GradientText>signature.</GradientText>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Pick a name, hit <strong className="text-fg">Copy for Gmail</strong>,
          then paste straight into your signature box.
        </p>
      </div>

      <div className="mt-12 max-w-3xl">
        <EmailSignature />
      </div>

      <div className="mt-16 max-w-2xl border-t border-line pt-10">
        <h2 className="font-display text-xl font-semibold">
          Setting it up
        </h2>
        <ol className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
          <li>
            <strong className="text-fg">Gmail.</strong>{" "}
            Settings (cog) &rarr;
            See all settings &rarr; General &rarr; Signature. Paste with{" "}
            <strong className="text-fg">Copy for Gmail</strong>, not the source
            button: Gmail&apos;s box renders what is on the clipboard, so raw
            HTML would paste as visible code.
          </li>
          <li>
            <strong className="text-fg">Outlook and Apple Mail.</strong> Same
            paste works. If a client mangles it, use{" "}
            <strong className="text-fg">Copy HTML source</strong> or the
            download and import the file instead.
          </li>
          <li>
            <strong className="text-fg">Images.</strong> The badge loads from{" "}
            <code className="text-brand-teal">
              {siteConfig.url.replace(/^https?:\/\//, "")}/voltara-badge.png
            </code>
            , so it keeps working on every machine that opens the email.
          </li>
        </ol>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          The signature is a table with inline styles and Arial, which is what
          survives Gmail&apos;s signature box. It strips CSS animation,
          webfonts and 3D transforms, so nothing here relies on them.
        </p>
      </div>
    </Container>
  );
}
