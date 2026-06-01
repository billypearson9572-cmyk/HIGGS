"use client";

import { useEffect, useRef, useState } from "react";
import {
  Users,
  PoundSterling,
  Timer,
  Percent,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * Response-time tiers and their conversion multipliers, applied to the user's
 * baseline (5-minute) close rate. Industry benchmark: speed-to-lead falls off a
 * cliff after the first few minutes, so a slow reply quietly shreds conversion.
 */
const RESPONSE_TIERS = [
  {
    value: "under5",
    label: "Under 5 minutes",
    multiplier: 1.0,
    context:
      "You're already in the top tier. Leads barely have time to cool off — this is exactly where you want to be.",
  },
  {
    value: "5to30",
    label: "5 to 30 minutes",
    multiplier: 0.85,
    context:
      "Still competitive, but conversion drops sharply after the 5-minute mark. There's revenue left on the table.",
  },
  {
    value: "30to120",
    label: "30 mins to 2 hours",
    multiplier: 0.7,
    context:
      "Your leads are cooling. By the time you reply, a faster competitor may already have their attention.",
  },
  {
    value: "2to24",
    label: "2 to 24 hours",
    multiplier: 0.45,
    context:
      "Most buyers expect a reply within the hour. A same-day response is quietly costing you serious revenue.",
  },
  {
    value: "over24",
    label: "Over 24 hours",
    multiplier: 0.25,
    context:
      "Most of your leads have already gone to a competitor by the time you reply.",
  },
] as const;

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/** Eases the displayed number towards a moving target with requestAnimationFrame. */
function useCountUp(target: number, duration = 650) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const start = fromRef.current;
    const startTime = performance.now();

    const tick = (now: number) => {
      // Reduced motion jumps straight to the target on the first frame.
      const t = reduce ? 1 : Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = start + (target - start) * eased;
      fromRef.current = current;
      setValue(current);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}

export function LeadCalculator() {
  // Inputs are kept as strings so the fields can be cleared while typing.
  const [leads, setLeads] = useState("60");
  const [deal, setDeal] = useState("2000");
  const [tier, setTier] = useState<(typeof RESPONSE_TIERS)[number]["value"]>(
    "30to120",
  );
  const [closeRate, setCloseRate] = useState(15);

  const leadsNum = Math.max(0, Number(leads) || 0);
  const dealNum = Math.max(0, Number(deal) || 0);
  const activeTier =
    RESPONSE_TIERS.find((t) => t.value === tier) ?? RESPONSE_TIERS[0];

  // The user's input is their real close rate at their current response speed.
  // The tier multiplier is how much of the 5-minute potential they capture, so
  // the potential rate with instant follow-up is their current rate scaled back
  // up (capped at 100%).
  const currentRate = closeRate / 100;
  const potentialRate = Math.min(1, currentRate / activeTier.multiplier);
  const potentialClosePct = potentialRate * 100;

  // Work in whole customers so every figure on the page reconciles by hand:
  // the lost revenue is simply the extra customers instant follow-up would
  // win, multiplied by the deal value.
  const currentCustomers = Math.round(leadsNum * currentRate);
  const potentialCustomers = Math.round(leadsNum * potentialRate);
  const lostCustomers = Math.max(0, potentialCustomers - currentCustomers);

  const currentRevenue = currentCustomers * dealNum;
  const potentialRevenue = potentialCustomers * dealNum;
  const monthlyLost = lostCustomers * dealNum;
  const annualLost = monthlyLost * 12;

  const animatedMonthlyLost = useCountUp(monthlyLost);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
      {/* ----------------------------------------------------------- Inputs */}
      <div className="rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur-sm sm:p-8">
        <h2 className="font-display text-xl font-bold">Your numbers</h2>
        <p className="mt-1 text-sm text-muted">
          Adjust these and watch the impact update instantly.
        </p>

        <div className="mt-8 flex flex-col gap-7">
          <NumberField
            id="leads"
            label="Monthly leads coming in"
            icon={Users}
            value={leads}
            onChange={setLeads}
            placeholder="100"
            suffix="leads / mo"
          />

          <NumberField
            id="deal"
            label="Average deal value"
            icon={PoundSterling}
            value={deal}
            onChange={setDeal}
            placeholder="1500"
            prefix="£"
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="response"
              className="flex items-center gap-2 text-sm font-medium text-fg"
            >
              <Timer className="h-4 w-4 text-brand-teal" />
              Current average response time
            </label>
            <select
              id="response"
              value={tier}
              onChange={(e) =>
                setTier(e.target.value as typeof tier)
              }
              className="w-full rounded-xl border border-line bg-bg-soft px-4 py-3 text-sm text-fg outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
            >
              {RESPONSE_TIERS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="closeRate"
                className="flex items-center gap-2 text-sm font-medium text-fg"
              >
                <Percent className="h-4 w-4 text-brand-teal" />
                Current lead-to-customer close rate
              </label>
              <span className="font-display text-base font-bold text-brand-teal">
                {closeRate}%
              </span>
            </div>
            <input
              id="closeRate"
              type="range"
              min={1}
              max={100}
              value={closeRate}
              onChange={(e) => setCloseRate(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-[var(--color-brand-teal)]"
              aria-valuetext={`${closeRate} percent`}
            />
            <div className="flex justify-between text-xs text-muted">
              <span>1%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------- Results */}
      <div className="flex flex-col gap-6">
        {/* Hero: revenue lost */}
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-9">
          <div className="glow-radial pointer-events-none absolute -top-24 -right-10 h-64 w-80" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-red-300">
              <TrendingDown className="h-3.5 w-3.5" />
              Revenue lost to slow follow-up
            </span>
            <p
              className="mt-5 font-display text-5xl font-extrabold leading-none tracking-tight text-red-400 sm:text-6xl"
              aria-live="polite"
            >
              {gbp.format(Math.round(animatedMonthlyLost))}
              <span className="ml-2 align-baseline text-xl font-semibold text-muted">
                / month
              </span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-fg/90">
              That&apos;s{" "}
              <span className="font-semibold text-red-300">
                {gbp.format(Math.round(annualLost))}
              </span>{" "}
              walking out the door every year.
            </p>
            <p className="mt-4 rounded-xl border border-line bg-bg-soft/70 px-4 py-3 text-sm leading-relaxed text-muted">
              {activeTier.context}
            </p>
          </div>
        </div>

        {/* The working — every step spelled out so the number reconciles */}
        <div className="rounded-3xl border border-line bg-surface/60 p-6 sm:p-7">
          <h3 className="font-display text-base font-semibold">
            How this adds up
          </h3>
          <p className="mt-1 text-sm text-muted">
            Slow replies drag your close rate down. Here&apos;s the maths, in
            customers.
          </p>

          <dl className="mt-5 overflow-hidden rounded-xl border border-line">
            <BreakdownRow
              label="Leads coming in"
              value={`${leadsNum.toLocaleString("en-GB")} / month`}
            />
            <BreakdownRow
              label={`Customers you win today`}
              note={`at your ${(currentRate * 100).toFixed(0)}% close rate`}
              value={`${currentCustomers} ${plural(currentCustomers)}`}
              amount={`${gbp.format(currentRevenue)} / mo`}
            />
            <BreakdownRow
              label="If you replied instantly"
              note={`close rate climbs to ~${potentialClosePct.toFixed(0)}%`}
              value={`${potentialCustomers} ${plural(potentialCustomers)}`}
              amount={`${gbp.format(potentialRevenue)} / mo`}
            />
          </dl>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3.5">
            <div>
              <p className="text-sm font-semibold text-fg">
                Lost to slow replies
              </p>
              <p className="text-xs text-muted">
                {lostCustomers} {plural(lostCustomers)} × {gbp.format(dealNum)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-lg font-bold text-red-300">
                {gbp.format(monthlyLost)} / mo
              </p>
              <p className="text-xs text-muted">
                {gbp.format(annualLost)} a year
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-transparent bg-surface p-7 text-center [background:linear-gradient(var(--color-surface),var(--color-surface))_padding-box,var(--brand-gradient)_border-box] sm:p-8">
          <h3 className="font-display text-xl font-bold">
            This leak is fixable — fast.
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            Automated, AI-powered follow-up replies to every new lead in
            seconds, so you stop bleeding revenue to slow response.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/contact" size="lg">
              See how to fix this. Get a free audit
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <p className="text-center text-xs leading-relaxed text-muted/80">
          Estimates based on industry speed-to-lead benchmarks: conversion can
          be up to ~9x higher when leads are contacted within 5 minutes versus
          30+ minutes. Figures are indicative, not a guarantee.
        </p>
      </div>
    </div>
  );
}

/* --- Local components ---------------------------------------------------- */

function NumberField({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
}: {
  id: string;
  label: string;
  icon: React.ElementType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-sm font-medium text-fg"
      >
        <Icon className="h-4 w-4 text-brand-teal" />
        {label}
      </label>
      <div className="relative flex items-center">
        {prefix ? (
          <span className="pointer-events-none absolute left-4 text-sm font-medium text-muted">
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border border-line bg-bg-soft py-3 text-sm text-fg placeholder:text-muted/60 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25",
            prefix ? "pl-8 pr-4" : "px-4",
            suffix && "pr-24",
          )}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-4 text-xs font-medium text-muted">
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function plural(n: number) {
  return n === 1 ? "customer" : "customers";
}

function BreakdownRow({
  label,
  note,
  value,
  amount,
}: {
  label: string;
  note?: string;
  value: string;
  amount?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 last:border-b-0">
      <div>
        <dt className="text-sm font-medium text-fg">{label}</dt>
        {note ? <p className="text-xs text-muted">{note}</p> : null}
      </div>
      <dd className="text-right">
        <span className="block text-sm font-semibold text-fg">{value}</span>
        {amount ? (
          <span className="block text-xs text-muted">{amount}</span>
        ) : null}
      </dd>
    </div>
  );
}
