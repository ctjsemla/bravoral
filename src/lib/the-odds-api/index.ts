import { cache } from "react";
import {
  DEFAULT_ODDS_SPORTS,
  isOddsApiEnabled,
  leagueToOddsSport,
} from "@/lib/the-odds-api/config";
import { fetchSportH2hOdds, OddsApiError } from "@/lib/the-odds-api/client";
import { findOddsForMatch, parseOddsApiEvent, type ParsedOddsEvent } from "@/lib/the-odds-api/match";
import type { Match } from "@/types";

const getSportOddsCache = cache(async (sportKey: string): Promise<ParsedOddsEvent[]> => {
  if (!isOddsApiEnabled()) return [];
  try {
    const raw = await fetchSportH2hOdds(sportKey);
    return raw.map(parseOddsApiEvent);
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[odds-api] ${sportKey}:`, e);
    }
    return [];
  }
});

async function loadSports(sportKeys: string[]): Promise<Map<string, ParsedOddsEvent[]>> {
  const unique = [...new Set(sportKeys)];
  const entries = await Promise.all(
    unique.map(async (key) => [key, await getSportOddsCache(key)] as const),
  );
  return new Map(entries);
}

function sportsForMatches(matches: Match[]): string[] {
  const keys = new Set<string>(DEFAULT_ODDS_SPORTS);
  for (const m of matches) {
    const sk = leagueToOddsSport(m.leagueId);
    if (sk) keys.add(sk);
  }
  return [...keys];
}

export async function enrichMatchesWithOdds(matches: Match[]): Promise<Match[]> {
  if (!isOddsApiEnabled() || !matches.length) return matches;

  try {
    const sportKeys = sportsForMatches(matches);
    const bySport = await loadSports(sportKeys);

    return matches.map((match) => {
      const sportKey = leagueToOddsSport(match.leagueId);
      if (!sportKey) return match;

      const events = bySport.get(sportKey) ?? [];
      const hit = findOddsForMatch(events, match);
      if (!hit) return match;

      return { ...match, odds: hit.odds };
    });
  } catch (e) {
    if (e instanceof OddsApiError && process.env.NODE_ENV === "development") {
      console.warn("[odds-api] enrich:", e.message);
    }
    return matches;
  }
}

export async function fetchOddsForMatchDetail(match: Match): Promise<Match> {
  if (!isOddsApiEnabled()) return match;

  const sportKey = leagueToOddsSport(match.leagueId);
  if (!sportKey) return match;

  const events = await getSportOddsCache(sportKey);
  const hit = findOddsForMatch(events, match);
  if (!hit) return match;

  return { ...match, odds: hit.odds };
}
