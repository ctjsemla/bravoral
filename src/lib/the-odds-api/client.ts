import { getOddsApiKey, ODDS_API_BASE } from "@/lib/the-odds-api/config";
import type { OddsApiEvent } from "@/lib/the-odds-api/types";

export class OddsApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OddsApiError";
  }
}

export async function oddsApiGet<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const key = getOddsApiKey();
  if (!key) throw new OddsApiError("ODDS_API_KEY não configurada");

  const url = new URL(path, ODDS_API_BASE);
  url.searchParams.set("apiKey", key);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), { next: { revalidate: 120 } });

  if (!res.ok) {
    throw new OddsApiError(`The Odds API HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function fetchSportH2hOdds(sportKey: string): Promise<OddsApiEvent[]> {
  const data = await oddsApiGet<OddsApiEvent[]>(`/sports/${sportKey}/odds`, {
    regions: "eu,uk,us,au",
    markets: "h2h",
    oddsFormat: "decimal",
  });
  return Array.isArray(data) ? data : [];
}
