import { fillOddsGrid } from "@/lib/odds/grid";
import type { Odds } from "@/types";
import type { OddsApiBookmaker } from "@/lib/the-odds-api/types";

/** site bookmaker id → possíveis keys na The Odds API (ordem de prioridade) */
export const SITE_TO_ODDS_KEYS: Record<string, string[]> = {
  bet365: ["bet365"],
  betano: ["betano"],
  sportingbet: ["sportingbet", "betway"],
  superbet: ["superbet", "pinnacle"],
  pixbet: ["pixbet", "onexbet"],
  kto: ["kto", "betsson", "nordicbet"],
  estrela: ["estrela", "estrelabet"],
  betfair: ["betfair_ex_eu", "betfair_ex_uk", "betfair_sb_uk", "betfair"],
  novibet: ["novibet", "unibet_uk", "unibet_nl", "unibet_se"],
  rivalo: ["rivalo", "marathonbet", "onexbet"],
};

function normTeam(name: string): string {
  return name
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function teamsMatch(a: string, b: string): boolean {
  const na = normTeam(a);
  const nb = normTeam(b);
  if (na === nb) return true;
  if (na.length >= 4 && nb.length >= 4) {
    return na.includes(nb) || nb.includes(na);
  }
  return false;
}

function h2hFromBookmaker(
  bm: OddsApiBookmaker,
  homeTeam: string,
  awayTeam: string,
): { home: number; draw: number; away: number } | null {
  const market = bm.markets.find((m) => m.key === "h2h");
  if (!market?.outcomes?.length) return null;

  let home: number | undefined;
  let draw: number | undefined;
  let away: number | undefined;

  for (const o of market.outcomes) {
    const price = typeof o.price === "number" ? o.price : parseFloat(String(o.price));
    if (!Number.isFinite(price)) continue;
    if (o.name === "Draw" || normTeam(o.name) === "draw") {
      draw = price;
    } else if (teamsMatch(o.name, homeTeam)) {
      home = price;
    } else if (teamsMatch(o.name, awayTeam)) {
      away = price;
    }
  }

  if (home == null || draw == null || away == null) return null;
  return { home, draw, away };
}

export function oddsFromOddsApiBookmakers(
  bookmakers: OddsApiBookmaker[],
  homeTeam: string,
  awayTeam: string,
): Odds[] {
  const partial: Odds[] = [];

  for (const [siteId, keys] of Object.entries(SITE_TO_ODDS_KEYS)) {
    const bm = bookmakers.find((b) => keys.includes(b.key));
    if (!bm) continue;
    const prices = h2hFromBookmaker(bm, homeTeam, awayTeam);
    if (!prices) continue;
    partial.push({ bookmakerId: siteId, ...prices });
  }

  return fillOddsGrid(partial);
}
