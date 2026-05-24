import { cache } from "react";
import {
  API_LEAGUE_TO_SLUG,
  isApiFootballEnabled,
  MAX_LIVE_FIXTURES,
} from "@/lib/api-football/config";
import { apiFootballGet } from "@/lib/api-football/client";
import { fixtureToMatch, priorityScore } from "@/lib/api-football/map";
import type { ApiFixtureItem, ApiFixturesResponse } from "@/lib/api-football/types";
import type { Match } from "@/types";

const getLiveFixtureItems = cache(async (): Promise<ApiFixtureItem[]> => {
  const data = await apiFootballGet<ApiFixturesResponse>("/fixtures", { live: "all" });
  return data.response ?? [];
});

export async function fetchLiveMatchesFromApi(leagueSlug?: string | null): Promise<Match[]> {
  if (!isApiFootballEnabled()) return [];

  try {
    let items = await getLiveFixtureItems();

    if (leagueSlug) {
      const apiIds = Object.entries(API_LEAGUE_TO_SLUG)
        .filter(([, slug]) => slug === leagueSlug)
        .map(([id]) => Number(id));
      if (apiIds.length) {
        items = items.filter((f) => apiIds.includes(f.league.id));
      } else if (!leagueSlug.startsWith("ext-")) {
        return [];
      }
    }

    items = [...items].sort((a, b) => priorityScore(b) - priorityScore(a));
    return items.slice(0, MAX_LIVE_FIXTURES).map((item) => fixtureToMatch(item));
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[api-football] live:", e);
    }
    return [];
  }
}

export async function fetchFixtureByIdFromApi(id: string): Promise<Match | null> {
  if (!isApiFootballEnabled() || !/^\d+$/.test(id)) return null;

  try {
    const data = await apiFootballGet<ApiFixturesResponse>("/fixtures", { id });
    const item = data.response?.[0];
    if (!item) return null;
    return fixtureToMatch(item);
  } catch {
    return null;
  }
}
