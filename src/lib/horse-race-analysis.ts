import "server-only";

import Anthropic from "@anthropic-ai/sdk";

import {
  analyzeRunners,
  type HorseRaceAnalysis,
  type RawAnalysis,
  type RawRunner,
} from "@/lib/horse-race";

/**
 * Runs the value analysis for a single race.
 *
 * Claude is given the live `web_search` tool so it can pull current odds and
 * recent form from the open web, then asked to return a strict JSON object we
 * parse and enrich. The maths (implied probability, expected value, ranking)
 * is done in `analyzeRunners` so the figures are deterministic and auditable —
 * the model supplies prices and a fair-chance estimate, we do the arithmetic.
 */

const MODEL = "claude-opus-4-8";

/** The web-search tool version with built-in dynamic result filtering. */
const WEB_SEARCH_TOOL = {
  type: "web_search_20260209" as const,
  name: "web_search" as const,
  max_uses: 8,
};

/** Cap the server-side tool loop so a request can't run away. */
const MAX_TURNS = 6;

const SYSTEM_PROMPT = `You are a horse-racing form analyst and odds-value assessor. Your job is to assess a single race the user names, pull the latest available odds and form data from the open web, and identify where the best betting value lies.

Method:
1. Use web_search to identify the exact race (course, date, off-time, race name) and find the CURRENT odds for every declared runner. Prefer reputable, up-to-date sources (major bookmakers, racing data sites, odds comparison pages). For each runner, capture the BEST (largest) available decimal price across the bookmakers you find, and which bookmaker offers it.
2. Search for form and context that bears on each runner's true chance: recent finishing positions, the going/distance suitability, draw, weight, jockey and trainer form, class, and any market moves.
3. Estimate each runner's TRUE win probability (0–100) from the form — this is your independent assessment, NOT a copy of the bookmaker's implied figure. A horse is "value" when your fair probability is higher than the price implies.
4. Be honest about uncertainty and data gaps. If you cannot find current odds or the race is ambiguous, say so.

Return ONLY a single JSON object (no prose before or after, no markdown fences) with this exact shape:
{
  "raceFound": boolean,
  "raceTitle": string,            // e.g. "16:35 Ascot — Queen Anne Stakes"
  "raceDateTime": string,         // human-readable date and off-time
  "course": string,
  "country": string,
  "oddsAsOf": string,             // when these prices were observed
  "summary": string,              // 1–2 sentences on the race and where value lies
  "runners": [
    {
      "name": string,
      "bestOddsFractional": string,   // e.g. "7/2"
      "bestOddsDecimal": number,      // e.g. 4.5 — required
      "bookmaker": string,            // who offers that best price
      "modelProbabilityPct": number,  // YOUR fair win chance, 0–100
      "keyStats": string              // the form/context behind your estimate
    }
  ],
  "bestValuePick": { "name": string, "rationale": string },
  "notes": string,                // caveats, data limitations, responsible-gambling reminder
  "sources": [ { "title": string, "url": string } ]
}

If you cannot identify the race or find odds, return { "raceFound": false, "message": "<why>" }. Always include bestOddsDecimal for every runner. Never invent odds or runners — only report what you actually found.`;

function buildClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new HorseRaceConfigError(
      "The analyzer is not configured: set ANTHROPIC_API_KEY in the environment.",
    );
  }
  return new Anthropic({ apiKey });
}

export class HorseRaceConfigError extends Error {}

/** Pull the concatenated text out of an assistant message's content blocks. */
function textFromContent(content: Anthropic.ContentBlock[]): string {
  return content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n");
}

/** Extract the JSON object from the model's final text, tolerating fences. */
function parseAnalysisJson(text: string): RawAnalysis {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : trimmed;
  // Fall back to the outermost { ... } span if there is stray prose.
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) {
    throw new Error("No JSON object found in the model response.");
  }
  return JSON.parse(candidate.slice(start, end + 1)) as RawAnalysis;
}

export async function analyzeRace(race: string): Promise<HorseRaceAnalysis> {
  const client = buildClient();

  const messages: Anthropic.MessageParam[] = [
    {
      role: "user",
      content: `Assess this race and give me the best-value odds:\n\n${race}\n\nToday's date is ${new Date().toISOString().slice(0, 10)}.`,
    },
  ];

  let finalText = "";
  for (let turn = 0; turn < MAX_TURNS; turn += 1) {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 8000,
      thinking: { type: "adaptive" },
      output_config: { effort: "medium" },
      system: SYSTEM_PROMPT,
      tools: [WEB_SEARCH_TOOL],
      messages,
    });

    const message = await stream.finalMessage();
    messages.push({ role: "assistant", content: message.content });

    // Server-side web search paused after hitting its per-turn loop limit —
    // re-send so the server resumes where it left off.
    if (message.stop_reason === "pause_turn") continue;

    if (message.stop_reason === "refusal") {
      throw new Error(
        "The request was declined. Try rephrasing the race details.",
      );
    }

    finalText = textFromContent(message.content);
    break;
  }

  if (!finalText) {
    throw new Error(
      "The analysis did not complete — the race may be hard to research right now. Try again with more detail (course, date, off-time).",
    );
  }

  const raw = parseAnalysisJson(finalText);

  if (!raw.raceFound) {
    return {
      raceFound: false,
      runners: [],
      message:
        raw.message ??
        "Couldn't identify that race or find current odds. Try adding the course, date and off-time.",
    };
  }

  const rawRunners: RawRunner[] = Array.isArray(raw.runners) ? raw.runners : [];

  return {
    raceFound: true,
    raceTitle: raw.raceTitle,
    raceDateTime: raw.raceDateTime,
    course: raw.course,
    country: raw.country,
    oddsAsOf: raw.oddsAsOf,
    summary: raw.summary,
    runners: analyzeRunners(rawRunners),
    bestValuePick: raw.bestValuePick,
    notes: raw.notes,
    sources: raw.sources,
  };
}
