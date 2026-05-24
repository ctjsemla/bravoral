import { oddsFromOddsApiBookmakers } from "@/lib/the-odds-api/bookmakers";
import type { OddsApiEvent } from "@/lib/the-odds-api/types";
import type { Match } from "@/types";
import type { Odds } from "@/types";

export type ParsedOddsEvent = {
  id: string;
  sportKey: string;
  homeTeam: string;
  awayTeam: string;
  commenceTime: string;
  odds: Odds[];
};

export function parseOddsApiEvent(event: OddsApiEvent): ParsedOddsEvent {
  return {
    id: event.id,
    sportKey: event.sport_key,
    homeTeam: event.home_team,
    awayTeam: event.away_team,
    commenceTime: event.commence_time,
    odds: oddsFromOddsApiBookmakers(event.bookmakers, event.home_team, event.away_team),
  };
}

function normTeam(name: string): string {
  return name
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function teamsPairMatch(
  homeA: string,
  awayA: string,
  homeB: string,
  awayB: string,
): boolean {
  const h = normTeam(homeA);
  const a = normTeam(awayA);
  const h2 = normTeam(homeB);
  const a2 = normTeam(awayB);
  const direct = (h === h2 || h.includes(h2) || h2.includes(h)) && (a === a2 || a.includes(a2) || a2.includes(a));
  if (direct) return true;
  const swapped =
    (h === a2 || h.includes(a2) || a2.includes(h)) && (a === h2 || a.includes(h2) || h2.includes(a));
  return swapped;
}

function kickoffClose(isoA: string, isoB: string, maxHours = 4): boolean {
  const diff = Math.abs(new Date(isoA).getTime() - new Date(isoB).getTime());
  return diff <= maxHours * 60 * 60 * 1000;
}

export function findOddsForMatch(
  events: ParsedOddsEvent[],
  match: Pick<Match, "home" | "away" | "kickoff">,
): ParsedOddsEvent | undefined {
  return events.find(
    (e) =>
      teamsPairMatch(match.home.name, match.away.name, e.homeTeam, e.awayTeam) &&
      kickoffClose(match.kickoff, e.commenceTime),
  );
}
