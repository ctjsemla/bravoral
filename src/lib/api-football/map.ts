import type { Form, Match, MatchStatus, Team } from "@/types";
import {
  API_LEAGUE_TO_SLUG,
  BRAZIL_COUNTRY,
} from "@/lib/api-football/config";
import type { ApiFixtureItem } from "@/lib/api-football/types";

const COLORS = ["#067a3e", "#e4002b", "#1565c0", "#ff6b00", "#6a0dad", "#c62828"];

function team(name: string, i: number): Team {
  return { name, form: [] as Form[], color: COLORS[i % COLORS.length] };
}

function leagueSlug(apiLeagueId: number): string {
  return API_LEAGUE_TO_SLUG[apiLeagueId] ?? `ext-${apiLeagueId}`;
}

function fixtureStatus(short: string): MatchStatus {
  if (["1H", "2H", "HT", "ET", "BT", "P", "LIVE"].includes(short)) return "live";
  if (["FT", "AET", "PEN", "AWD", "WO"].includes(short)) return "finished";
  return "upcoming";
}

export function priorityScore(item: ApiFixtureItem): number {
  let score = 0;
  if (item.league.country === BRAZIL_COUNTRY) score += 100;
  if (API_LEAGUE_TO_SLUG[item.league.id]) score += 50;
  if (["1H", "2H", "HT"].includes(item.fixture.status.short)) score += 10;
  return score;
}

export function fixtureToMatch(item: ApiFixtureItem): Match {
  const status = fixtureStatus(item.fixture.status.short);
  const homeGoals = item.goals.home ?? 0;
  const awayGoals = item.goals.away ?? 0;

  return {
    id: String(item.fixture.id),
    leagueId: leagueSlug(item.league.id),
    league: item.league.name,
    kickoff: item.fixture.date,
    home: team(item.teams.home.name, 0),
    away: team(item.teams.away.name, 1),
    status,
    minute: item.fixture.status.elapsed ?? undefined,
    score:
      status === "live" || status === "finished"
        ? { home: homeGoals, away: awayGoals }
        : undefined,
    odds: [],
  };
}
