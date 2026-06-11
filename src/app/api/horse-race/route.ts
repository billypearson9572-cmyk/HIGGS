import {
  analyzeRace,
  HorseRaceConfigError,
} from "@/lib/horse-race-analysis";

// Web search + form analysis can take a while; give the function room to run.
export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(request: Request) {
  let race: unknown;
  try {
    ({ race } = await request.json());
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof race !== "string" || race.trim().length < 3) {
    return Response.json(
      { error: "Describe the race — e.g. the course, date and off-time." },
      { status: 400 },
    );
  }

  if (race.length > 2000) {
    return Response.json(
      { error: "That's too long — keep the race description under 2000 characters." },
      { status: 400 },
    );
  }

  try {
    const analysis = await analyzeRace(race);
    return Response.json(analysis);
  } catch (error) {
    if (error instanceof HorseRaceConfigError) {
      return Response.json({ error: error.message }, { status: 503 });
    }
    const message =
      error instanceof Error ? error.message : "The analysis failed unexpectedly.";
    return Response.json({ error: message }, { status: 502 });
  }
}
