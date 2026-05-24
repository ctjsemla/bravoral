/**
 * API-Football: fixtures ao vivo + placar.
 * The Odds API: odds 1X2 das casas no grid.
 */
import type { Match } from "@/types";
import { MATCHES } from "@/data/matches";
import {
  fetchFixtureByIdFromApi,
  fetchLiveMatchesFromApi,
} from "@/lib/api-football";
import { isApiFootballEnabled } from "@/lib/api-football/config";
import { fillOddsGrid } from "@/lib/odds/grid";
import {
  enrichMatchesWithOdds,
  fetchOddsForMatchDetail,
} from "@/lib/the-odds-api";

export type FetchMatchesParams = {
  leagueId?: string | null;
  status?: "live" | "upcoming" | "finished" | "all";
};

function filterMock(params: FetchMatchesParams): Match[] {
  const { leagueId, status = "all" } = params;
  let list = [...MATCHES];
  if (leagueId) list = list.filter((m) => m.leagueId === leagueId);
  if (status === "live") list = list.filter((m) => m.status === "live");
  if (status === "upcoming") list = list.filter((m) => m.status === "upcoming");
  if (status === "finished") list = list.filter((m) => m.status === "finished");
  return list;
}

async function withOdds(matches: Match[]): Promise<Match[]> {
  const enriched = await enrichMatchesWithOdds(matches);
  return enriched.map((m) => {
    if (!m.odds.length) return { ...m, odds: fillOddsGrid([]) };
    const allSame = m.odds.every(
      (o) =>
        o.home === m.odds[0].home &&
        o.draw === m.odds[0].draw &&
        o.away === m.odds[0].away,
    );
    if (allSame && m.odds[0].home === 2 && m.odds[0].draw === 3.2) {
      return { ...m, odds: fillOddsGrid([]) };
    }
    return m;
  });
}

async function mergeWithApiLive(
  mock: Match[],
  params: FetchMatchesParams,
): Promise<Match[]> {
  if (!isApiFootballEnabled()) return withOdds(mock);

  const apiLive = await fetchLiveMatchesFromApi(params.leagueId);
  const withoutMockLive = mock.filter((m) => m.status !== "live");
  const apiIds = new Set(apiLive.map((m) => m.id));

  let merged: Match[];
  if (params.status === "live") merged = apiLive;
  else if (params.status === "upcoming" || params.status === "finished") merged = mock;
  else merged = [...apiLive, ...withoutMockLive.filter((m) => !apiIds.has(m.id))];

  return withOdds(merged);
}

export async function fetchMatches(params: FetchMatchesParams = {}): Promise<Match[]> {
  const mock = filterMock(params);
  return mergeWithApiLive(mock, params);
}

export async function fetchMatchById(id: string): Promise<Match | null> {
  const fromApi = await fetchFixtureByIdFromApi(id);
  if (fromApi) {
    const withDetail = await fetchOddsForMatchDetail(fromApi);
    return withDetail.odds.length
      ? withDetail
      : { ...withDetail, odds: fillOddsGrid([]) };
  }

  const mock = MATCHES.find((m) => m.id === id);
  if (!mock) return null;
  const [enriched] = await enrichMatchesWithOdds([mock]);
  return enriched;
}
