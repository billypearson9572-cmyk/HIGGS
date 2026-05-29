"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, Check, Loader2, AlertCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-line bg-bg-soft px-4 py-3 text-sm text-fg placeholder:text-muted/70 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setError("");

    // 1. Web3Forms — emails submissions straight to your inbox.
    if (siteConfig.web3formsKey) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: siteConfig.web3formsKey,
            subject: `New enquiry from ${payload.name || "the website"}`,
            from_name: "Voltara Digital website",
            ...payload,
          }),
        });
        const data = await res.json();
        if (!data.success) throw new Error("Request failed");
        setStatus("success");
        form.reset();
      } catch {
        setStatus("error");
        setError(
          `Something went wrong. Please email us directly at ${siteConfig.email}.`,
        );
      }
      return;
    }

    // 2. A generic JSON endpoint (e.g. Formspree).
    if (siteConfig.contactEndpoint) {
      try {
        const res = await fetch(siteConfig.contactEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
        setStatus("success");
        form.reset();
      } catch {
        setStatus("error");
        setError(
          `Something went wrong. Please email us directly at ${siteConfig.email}.`,
        );
      }
      return;
    }

    // Fallback: open the visitor's email client, pre-filled.
    const subject = `New enquiry from ${payload.name || "the website"}`;
    const body = [
      `Name: ${payload.name ?? ""}`,
      `Email: ${payload.email ?? ""}`,
      `Company: ${payload.company ?? ""}`,
      `Interested in: ${payload.service ?? ""}`,
      `Budget: ${payload.budget ?? ""}`,
      "",
      `${payload.message ?? ""}`,
    ].join("\n");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-surface/60 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-[#04121f]">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold">
          Thanks — message on its way!
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          We typically reply within one business day — usually with a first look
          at your audit and clear next steps.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-brand-blue hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot: hidden from people, catches spam bots (Web3Forms). */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        style={{ display: "none" }}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className={fieldClass}
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className={fieldClass}
          />
        </Field>
      </div>

      <Field label="Company" htmlFor="company" optional>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          placeholder="Your business name"
          className={fieldClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="I'm interested in" htmlFor="service">
          <select id="service" name="service" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Choose one…
            </option>
            <option>A free marketing audit</option>
            <option>Social media marketing</option>
            <option>AI automation</option>
            <option>Both</option>
            <option>Not sure yet</option>
          </select>
        </Field>
        <Field label="Monthly budget" htmlFor="budget" optional>
          <select id="budget" name="budget" defaultValue="" className={fieldClass}>
            <option value="">Prefer not to say</option>
            <option>Under £1,000</option>
            <option>£1,000 – £2,500</option>
            <option>£2,500 – £5,000</option>
            <option>£5,000+</option>
          </select>
        </Field>
      </div>

      <Field label="How can we help?" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us a little about your business and what you'd like to achieve…"
          className={cn(fieldClass, "resize-y")}
        />
      </Field>

      {status === "error" ? (
        <p className="flex items-center gap-2 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 text-base font-semibold text-[#04121f] shadow-[0_10px_34px_-12px_rgba(52,199,201,0.65)] transition-all duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4.5 w-4.5" />
            Get my free audit
          </>
        )}
      </button>

      <p className="text-xs text-muted">
        By submitting, you agree to be contacted about your enquiry. We never
        sell or share your details — see our{" "}
        <Link href="/privacy" className="text-brand-blue hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  optional = false,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="text-sm font-medium text-fg">
        {label}
        {optional ? (
          <span className="ml-1.5 text-xs font-normal text-muted">
            (optional)
          </span>
        ) : null}
      </span>
      {children}
    </label>
  );
}
