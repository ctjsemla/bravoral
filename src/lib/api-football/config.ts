export const API_FOOTBALL_BASE = "https://v3.football.api-sports.io";

export function getApiFootballKey(): string | undefined {
  return (
    process.env.APIFOOTBALL_KEY?.trim() ||
    process.env.API_FOOTBALL_KEY?.trim() ||
    undefined
  );
}

export function isApiFootballEnabled(): boolean {
  return Boolean(getApiFootballKey());
}

/** API league id → site slug (sidebar / filtros) */
export const API_LEAGUE_TO_SLUG: Record<number, string> = {
  71: "serie-a",
  72: "serie-b",
  73: "copa",
  475: "paulistao",
  477: "gaucho",
  39: "premier",
  140: "la-liga",
  2: "ucl",
  13: "libertadores",
  78: "bundesliga",
  61: "ligue-1",
  253: "mls",
  262: "liga-mx",
};

export const BRAZIL_COUNTRY = "Brazil";

export const MAX_LIVE_FIXTURES = 12;
