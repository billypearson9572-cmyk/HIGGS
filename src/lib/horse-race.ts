/**
 * Shared types and pure odds maths for the horse-race value analyzer.
 *
 * This file is import-safe from both the server (the API route that calls the
 * model) and the client (the results UI), so it must stay free of any
 * server-only dependencies. The model returns the "raw" shapes below; the
 * server enriches them with the derived value figures computed here so every
 * number on the page reconciles by hand.
 */

/* --- What the model is asked to return ----------------------------------- */

export interface RawRunner {
  /** Horse name. */
  name: string;
  /** Best available price as a fraction, e.g. "7/2" (for display). */
  bestOddsFractional?: string;
  /** Best available price in decimal, e.g. 4.5 — the canonical figure for maths. */
  bestOddsDecimal: number;
  /** Bookmaker offering that best price. */
  bookmaker?: string;
  /** The model's estimate of the horse's true win chance, 0–100. */
  modelProbabilityPct: number;
  /** One-line justification: recent form, going, draw, jockey/trainer, etc. */
  keyStats?: string;
}

export interface RawAnalysis {
  /** False when the race could not be identified or no odds were found. */
  raceFound: boolean;
  raceTitle?: string;
  raceDateTime?: string;
  course?: string;
  country?: string;
  /** When the odds were observed (the model's reading of the source pages). */
  oddsAsOf?: string;
  summary?: string;
  runners?: RawRunner[];
  bestValuePick?: { name: string; rationale: string };
  notes?: string;
  sources?: { title: string; url: string }[];
  /** Explanation shown when raceFound is false. */
  message?: string;
}

/* --- What the API route returns to the client ---------------------------- */

export type ValueRating = "strong" | "slight" | "fair" | "negative";

export interface AnalyzedRunner extends RawRunner {
  /** Win chance implied by the bookmaker's price (includes their margin), 0–100. */
  impliedProbabilityPct: number;
  /** Model's fair win chance after normalising the field to sum to 100%. */
  fairProbabilityPct: number;
  /** Expected return per £1 staked, as a percentage. Positive = value (overlay). */
  expectedValuePct: number;
  /** How far the fair chance beats the implied chance, in percentage points. */
  edgePoints: number;
  rating: ValueRating;
}

export interface HorseRaceAnalysis {
  raceFound: boolean;
  raceTitle?: string;
  raceDateTime?: string;
  course?: string;
  country?: string;
  oddsAsOf?: string;
  summary?: string;
  runners: AnalyzedRunner[];
  bestValuePick?: { name: string; rationale: string };
  notes?: string;
  sources?: { title: string; url: string }[];
  message?: string;
}

/* --- Odds maths ----------------------------------------------------------- */

/** Parse a fractional price like "7/2" or "evens" into decimal odds. */
export function fractionalToDecimal(fractional: string): number | null {
  const cleaned = fractional.trim().toLowerCase();
  if (cleaned === "evens" || cleaned === "even" || cleaned === "evs") return 2;
  const match = cleaned.match(/^(\d+(?:\.\d+)?)\s*[/-]\s*(\d+(?:\.\d+)?)$/);
  if (!match) return null;
  const num = Number(match[1]);
  const den = Number(match[2]);
  if (!den) return null;
  return num / den + 1;
}

/** Decimal odds → win chance implied by the price, as a percentage (0–100). */
export function impliedProbabilityPct(decimalOdds: number): number {
  if (decimalOdds <= 1) return 0;
  return 100 / decimalOdds;
}

const RATING_THRESHOLDS: { min: number; rating: ValueRating }[] = [
  { min: 10, rating: "strong" },
  { min: 2, rating: "slight" },
  { min: -2, rating: "fair" },
];

function ratingFor(expectedValuePct: number): ValueRating {
  for (const { min, rating } of RATING_THRESHOLDS) {
    if (expectedValuePct >= min) return rating;
  }
  return "negative";
}

/**
 * Turn the model's raw runners into the enriched set the UI renders.
 *
 * The model's per-horse win chances are normalised so the field sums to 100%
 * (exactly one horse wins), giving a clean "fair" probability. Value is then
 * the edge of that fair chance over the bookmaker's price, expressed as the
 * expected return on a £1 win bet: EV% = (fairProb × decimalOdds − 1) × 100.
 * Runners are returned sorted by expected value, best first.
 */
export function analyzeRunners(runners: RawRunner[]): AnalyzedRunner[] {
  const probTotal = runners.reduce(
    (sum, r) => sum + Math.max(0, r.modelProbabilityPct),
    0,
  );

  const analyzed = runners.map((runner): AnalyzedRunner => {
    const decimal =
      runner.bestOddsDecimal > 1
        ? runner.bestOddsDecimal
        : (runner.bestOddsFractional &&
            fractionalToDecimal(runner.bestOddsFractional)) ||
          runner.bestOddsDecimal;

    const implied = impliedProbabilityPct(decimal);
    const fairProbabilityPct =
      probTotal > 0
        ? (Math.max(0, runner.modelProbabilityPct) / probTotal) * 100
        : 0;
    const fairProb = fairProbabilityPct / 100;
    const expectedValuePct = decimal > 1 ? (fairProb * decimal - 1) * 100 : -100;

    return {
      ...runner,
      bestOddsDecimal: decimal,
      impliedProbabilityPct: implied,
      fairProbabilityPct,
      expectedValuePct,
      edgePoints: fairProbabilityPct - implied,
      rating: ratingFor(expectedValuePct),
    };
  });

  return analyzed.sort((a, b) => b.expectedValuePct - a.expectedValuePct);
}

/* --- Display helpers ------------------------------------------------------ */

export function formatDecimalOdds(decimalOdds: number): string {
  return decimalOdds.toFixed(2);
}

export function formatSignedPct(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded > 0 ? "+" : ""}${rounded.toFixed(1)}%`;
}

export const RATING_LABELS: Record<ValueRating, string> = {
  strong: "Strong value",
  slight: "Slight value",
  fair: "Fair price",
  negative: "Poor value",
};
