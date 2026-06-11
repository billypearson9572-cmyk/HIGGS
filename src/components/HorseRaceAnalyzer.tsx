"use client";

import { useState } from "react";
import {
  Search,
  Loader2,
  TrendingUp,
  Trophy,
  AlertTriangle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  formatDecimalOdds,
  formatSignedPct,
  RATING_LABELS,
  type AnalyzedRunner,
  type HorseRaceAnalysis,
  type ValueRating,
} from "@/lib/horse-race";

const EXAMPLES = [
  "The 3:00 at Cheltenham tomorrow",
  "Kentucky Derby 2026",
  "Next race at Ascot today",
];

const RATING_STYLES: Record<ValueRating, string> = {
  strong: "border-brand-green/40 bg-brand-green/10 text-brand-green",
  slight: "border-brand-teal/40 bg-brand-teal/10 text-brand-teal",
  fair: "border-line bg-white/5 text-muted",
  negative: "border-red-500/30 bg-red-500/10 text-red-300",
};

export function HorseRaceAnalyzer() {
  const [race, setRace] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HorseRaceAnalysis | null>(null);

  async function runAnalysis(query: string) {
    const trimmed = query.trim();
    if (trimmed.length < 3 || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/horse-race", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ race: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }
      setResult(data as HorseRaceAnalysis);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* ----------------------------------------------------------- Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runAnalysis(race);
        }}
        className="rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur-sm sm:p-8"
      >
        <label
          htmlFor="race"
          className="flex items-center gap-2 text-sm font-medium text-fg"
        >
          <Search className="h-4 w-4 text-brand-teal" />
          Which race do you want assessed?
        </label>
        <p className="mt-1 text-sm text-muted">
          Name the course, date and off-time — or paste the runners. The
          analyzer pulls live odds and form from the web.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            id="race"
            value={race}
            onChange={(e) => setRace(e.target.value)}
            placeholder="e.g. 16:35 Ascot today — Queen Anne Stakes"
            maxLength={2000}
            className="w-full rounded-xl border border-line bg-bg-soft px-4 py-3 text-sm text-fg placeholder:text-muted/60 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
          />
          <button
            type="submit"
            disabled={loading || race.trim().length < 3}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 text-base font-semibold text-[#04121f] shadow-[0_10px_34px_-12px_rgba(52,199,201,0.65)] transition-all duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Analyzing…
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Find the value
              </>
            )}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted">Try:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setRace(ex);
                runAnalysis(ex);
              }}
              disabled={loading}
              className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-muted transition hover:border-white/25 hover:text-fg disabled:opacity-60"
            >
              {ex}
            </button>
          ))}
        </div>
      </form>

      {/* ----------------------------------------------------------- States */}
      {loading ? <LoadingState /> : null}

      {error ? (
        <div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-200">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      ) : null}

      {result && !result.raceFound ? (
        <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface/60 p-5 text-sm text-muted">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
          <p>{result.message}</p>
        </div>
      ) : null}

      {result && result.raceFound ? <Results result={result} /> : null}
    </div>
  );
}

/* --- Results ------------------------------------------------------------- */

function Results({ result }: { result: HorseRaceAnalysis }) {
  const topPick =
    result.runners.find((r) => r.name === result.bestValuePick?.name) ??
    result.runners[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Race header */}
      <div className="rounded-3xl border border-line bg-surface/60 p-6 sm:p-7">
        <h2 className="font-display text-2xl font-bold">
          {result.raceTitle ?? "Race analysis"}
        </h2>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          {result.raceDateTime ? <span>{result.raceDateTime}</span> : null}
          {result.course ? <span>· {result.course}</span> : null}
          {result.country ? <span>· {result.country}</span> : null}
        </div>
        {result.summary ? (
          <p className="mt-4 text-sm leading-relaxed text-fg/90">
            {result.summary}
          </p>
        ) : null}
        {result.oddsAsOf ? (
          <p className="mt-3 text-xs text-muted/80">Odds observed: {result.oddsAsOf}</p>
        ) : null}
      </div>

      {/* Best-value pick */}
      {topPick ? (
        <div className="relative overflow-hidden rounded-3xl border border-transparent bg-surface p-7 [background:linear-gradient(var(--color-surface),var(--color-surface))_padding-box,var(--brand-gradient)_border-box] sm:p-8">
          <div className="glow-radial pointer-events-none absolute -top-24 -right-10 h-64 w-80" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-brand-green">
              <Trophy className="h-3.5 w-3.5" />
              Best value
            </span>
            <p className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              {topPick.name}
            </p>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <span className="text-lg font-semibold text-fg">
                {topPick.bestOddsFractional ??
                  formatDecimalOdds(topPick.bestOddsDecimal)}{" "}
                <span className="text-sm font-normal text-muted">
                  ({formatDecimalOdds(topPick.bestOddsDecimal)})
                </span>
              </span>
              {topPick.bookmaker ? (
                <span className="text-sm text-muted">at {topPick.bookmaker}</span>
              ) : null}
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-semibold",
                  topPick.expectedValuePct >= 0 ? "text-brand-green" : "text-red-300",
                )}
              >
                <TrendingUp className="h-4 w-4" />
                {formatSignedPct(topPick.expectedValuePct)} expected value
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg/90">
              {result.bestValuePick?.rationale ?? topPick.keyStats}
            </p>
          </div>
        </div>
      ) : null}

      {/* Full field, ranked by value */}
      <div className="rounded-3xl border border-line bg-surface/60 p-2 sm:p-3">
        <div className="px-4 pb-2 pt-4 sm:px-5">
          <h3 className="font-display text-base font-semibold">
            Every runner, ranked by value
          </h3>
          <p className="mt-1 text-sm text-muted">
            Value = our fair win chance versus the price. Positive expected value
            means the odds are generous relative to the form.
          </p>
        </div>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-muted">
                <th className="px-4 py-3 font-medium">Runner</th>
                <th className="px-4 py-3 font-medium">Best odds</th>
                <th className="px-4 py-3 font-medium">Implied</th>
                <th className="px-4 py-3 font-medium">Fair chance</th>
                <th className="px-4 py-3 font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {result.runners.map((runner, i) => (
                <RunnerRow key={`${runner.name}-${i}`} runner={runner} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {result.notes ? (
        <div className="rounded-2xl border border-line bg-bg-soft/60 px-5 py-4 text-sm leading-relaxed text-muted">
          {result.notes}
        </div>
      ) : null}

      {result.sources && result.sources.length > 0 ? (
        <div className="rounded-2xl border border-line bg-surface/40 px-5 py-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Sources
          </h4>
          <ul className="mt-3 flex flex-col gap-2">
            {result.sources.map((source, i) => (
              <li key={`${source.url}-${i}`}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-brand-teal hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  {source.title || source.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Responsible-gambling notice */}
      <p className="text-center text-xs leading-relaxed text-muted/80">
        For information only — not betting advice or a guarantee of any outcome.
        Odds and form change constantly; always confirm the live price with the
        bookmaker before betting. 18+. When the fun stops, stop. Help is
        available at{" "}
        <a
          href="https://www.begambleaware.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-teal hover:underline"
        >
          BeGambleAware.org
        </a>
        .
      </p>
    </div>
  );
}

function RunnerRow({ runner }: { runner: AnalyzedRunner }) {
  return (
    <tr className="border-b border-line/60 last:border-b-0">
      <td className="px-4 py-3.5">
        <span className="font-medium text-fg">{runner.name}</span>
        {runner.keyStats ? (
          <p className="mt-0.5 max-w-md text-xs leading-relaxed text-muted">
            {runner.keyStats}
          </p>
        ) : null}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5">
        <span className="font-medium text-fg">
          {runner.bestOddsFractional ?? formatDecimalOdds(runner.bestOddsDecimal)}
        </span>
        {runner.bookmaker ? (
          <p className="text-xs text-muted">{runner.bookmaker}</p>
        ) : null}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-muted">
        {runner.impliedProbabilityPct.toFixed(1)}%
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-fg">
        {runner.fairProbabilityPct.toFixed(1)}%
      </td>
      <td className="whitespace-nowrap px-4 py-3.5">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
            RATING_STYLES[runner.rating],
          )}
        >
          {formatSignedPct(runner.expectedValuePct)} · {RATING_LABELS[runner.rating]}
        </span>
      </td>
    </tr>
  );
}

/* --- Loading skeleton ---------------------------------------------------- */

function LoadingState() {
  return (
    <div className="rounded-3xl border border-line bg-surface/60 p-7 sm:p-8">
      <div className="flex items-center gap-3 text-sm text-muted">
        <Loader2 className="h-5 w-5 animate-spin text-brand-teal" />
        Searching the web for live odds and form, then crunching the value…
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-10 animate-pulse rounded-xl bg-white/5"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
      <p className="mt-5 text-xs text-muted/70">
        This can take 20–40 seconds — it&apos;s reading multiple sources.
      </p>
    </div>
  );
}
