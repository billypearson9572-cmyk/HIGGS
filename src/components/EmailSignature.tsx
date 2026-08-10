"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * The signature markup, kept as a single HTML string so the preview below and
 * the text on the clipboard can never drift apart.
 *
 * Constraints this markup is written to (Gmail's signature box is strict):
 * - tables + inline styles only; Gmail strips <style> blocks, classes and CSS
 *   animation, so anything decorative has to survive as an inline attribute
 * - Arial rather than the brand webfonts, which mail clients will not load
 * - the badge is an absolute URL; Gmail will not embed a local file, and the
 *   gradient ring is baked into the PNG because Outlook ignores border-radius
 * - the CTA carries a flat background-color under the gradient so clients that
 *   drop background-image still render a solid brand-blue pill
 * - the CTA's gradient sweep is a named animation (ctaShift, defined in
 *   globals.css). Mail clients strip CSS animation and cannot see that rule,
 *   so they fall back to the static gradient; the page preview animates
 * - no panel background: the signature sits on whatever the message body is,
 *   so it reads as part of the email rather than a pasted block. Text colours
 *   are therefore chosen for a light body, and leaving the background unset
 *   also lets dark-mode clients recolour it instead of stranding dark text on
 *   a dark panel
 */
const BADGE_PATH = "/voltara-badge.png";
const BADGE_URL = `${siteConfig.url.replace(/\/$/, "")}${BADGE_PATH}`;

/**
 * `badge` differs between the two uses on purpose: the on-page preview loads
 * the image from this origin so it renders before the site is deployed, while
 * anything copied to the clipboard must carry the absolute URL because a mail
 * client has no origin to resolve a relative path against.
 */
function buildSignature(
  {
    name,
    role,
    email,
  }: {
    name: string;
    role: string;
    email: string;
  },
  badge: string = BADGE_URL,
) {
  const site = siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;color:#0e1626;">
  <tr>
    <td style="padding:0 18px 0 0;vertical-align:middle;">
      <img src="${badge}" width="88" height="88" alt="${siteConfig.name}" style="display:block;width:88px;height:88px;border:0;border-radius:44px;" />
    </td>
    <td style="padding:2px 0 2px 18px;vertical-align:middle;border-left:3px solid #34c7c9;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;color:#0e1626;">${name}</div>
      <div style="font-size:13px;color:#5b6a86;padding-top:3px;">${role} &middot; ${siteConfig.name}</div>
      <div style="font-size:13px;padding-top:8px;white-space:nowrap;">
        <a href="${siteConfig.url}" style="color:#1e8fe6;text-decoration:none;font-weight:bold;">${site}</a>
        <span style="color:#c3cddd;">&nbsp;|&nbsp;</span>
        <a href="mailto:${email}" style="color:#1e8fe6;text-decoration:none;">${email}</a>
      </div>
      <div style="padding-top:12px;">
        <a href="${siteConfig.url}/contact" style="display:inline-block;background-color:#1e8fe6;background-image:linear-gradient(120deg,#8ae04b 0%,#34c7c9 50%,#1e8fe6 100%);background-size:220% 100%;animation:ctaShift 5s ease-in-out infinite;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:0.6px;text-decoration:none;padding:9px 18px;border-radius:20px;transition:transform 0.25s,box-shadow 0.25s;">FREE AI CONSULT &rarr;</a>
      </div>
    </td>
  </tr>
</table>`;
}

const people = [
  { name: "Billy Pearson", role: "Founder", email: siteConfig.email },
  { name: "Harvey Bullingham", role: "Software Engineer", email: siteConfig.email },
];

export function EmailSignature() {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState<"rendered" | "source" | "failed" | null>(
    null,
  );

  const html = buildSignature(people[index]);
  const previewHtml = buildSignature(people[index], BADGE_PATH);

  function flash(state: "rendered" | "source" | "failed") {
    setCopied(state);
    setTimeout(() => setCopied(null), 2200);
  }

  /**
   * Last resort when the async Clipboard API is unavailable or blocked: select
   * the rendered node and let the browser copy the selection, which still puts
   * rich HTML on the clipboard rather than source. The selection is built from
   * an offscreen copy carrying the absolute badge URL, so what lands on the
   * clipboard matches the email version rather than the preview's local path.
   */
  function selectionCopy(): boolean {
    const holder = document.createElement("div");
    holder.setAttribute("aria-hidden", "true");
    holder.style.cssText =
      "position:fixed;left:-10000px;top:0;opacity:0;pointer-events:none;";
    holder.innerHTML = html;
    document.body.appendChild(holder);
    try {
      const range = document.createRange();
      range.selectNodeContents(holder);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      const ok = document.execCommand("copy");
      selection?.removeAllRanges();
      return ok;
    } catch {
      return false;
    } finally {
      holder.remove();
    }
  }

  async function copyRendered() {
    // Gmail's signature box wants rendered HTML on the clipboard, not source.
    try {
      const item = new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([html], { type: "text/plain" }),
      });
      await navigator.clipboard.write([item]);
      flash("rendered");
      return;
    } catch {
      // Safari and permission-restricted contexts reject ClipboardItem.
    }
    flash(selectionCopy() ? "rendered" : "failed");
  }

  /**
   * Plain-text equivalent of selectionCopy: a throwaway textarea is the one
   * copy path that predates the async Clipboard API and works everywhere.
   */
  function textareaCopy(): boolean {
    const area = document.createElement("textarea");
    area.value = html;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;left:-10000px;top:0;opacity:0;";
    document.body.appendChild(area);
    try {
      area.select();
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      area.remove();
    }
  }

  async function copySource() {
    try {
      await navigator.clipboard.writeText(html);
      flash("source");
      return;
    } catch {
      // Clipboard API can be unavailable on http origins or refused by policy.
    }
    flash(textareaCopy() ? "source" : "failed");
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {people.map((person, i) => (
          <button
            key={person.name}
            type="button"
            onClick={() => setIndex(i)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              i === index
                ? "bg-brand-blue text-white"
                : "border border-line text-muted hover:text-fg"
            }`}
          >
            {person.name}
          </button>
        ))}
      </div>

      <div className="signature-preview mt-6 overflow-x-auto rounded-2xl border border-line bg-white p-6">
        <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyRendered}
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          {copied === "rendered" ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied === "rendered"
            ? "Copied"
            : copied === "failed"
              ? "Press Ctrl+C"
              : "Copy for Gmail"}
        </button>
        <button
          type="button"
          onClick={copySource}
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold transition hover:border-brand-teal"
        >
          {copied === "source" ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied === "source"
            ? "Copied"
            : copied === "failed"
              ? "Copy failed"
              : "Copy HTML source"}
        </button>
        <a
          href="/voltara-signature.html"
          download
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold transition hover:border-brand-teal"
        >
          Download .html
        </a>
      </div>

      <details className="mt-6 rounded-2xl border border-line p-5">
        <summary className="cursor-pointer text-sm font-semibold">
          View the raw HTML
        </summary>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-black/40 p-4 text-xs leading-relaxed text-muted">
          <code>{html}</code>
        </pre>
      </details>
    </div>
  );
}
