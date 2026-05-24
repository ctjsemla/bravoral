export const ODDS_API_BASE = "https://api.the-odds-api.com/v4";

export function getOddsApiKey(): string | undefined {
  return (
    process.env.ODDS_API_KEY?.trim() ||
    process.env.THE_ODDS_API_KEY?.trim() ||
    undefined
  );
}

export function isOddsApiEnabled(): boolean {
  return Boolean(getOddsApiKey());
}

/** Slug do site → sport_key The Odds API */
export const LEAGUE_TO_ODDS_SPORT: Record<string, string> = {
  "serie-a": "soccer_brazil_campeonato",
  "serie-b": "soccer_brazil_serie_b",
  copa: "soccer_brazil_campeonato",
  premier: "soccer_epl",
  "la-liga": "soccer_spain_la_liga",
  ucl: "soccer_uefa_champs_league",
  libertadores: "soccer_conmebol_copa_libertadores",
  bundesliga: "soccer_germany_bundesliga",
  "ligue-1": "soccer_france_ligue_one",
  mls: "soccer_usa_mls",
  "liga-mx": "soccer_mexico_ligamx",
};

/** Ligas sempre pré-carregadas (quota: 1 req/liga) */
export const DEFAULT_ODDS_SPORTS = [
  "soccer_brazil_campeonato",
  "soccer_epl",
  "soccer_uefa_champs_league",
] as const;

export function leagueToOddsSport(leagueId: string): string | undefined {
  if (LEAGUE_TO_ODDS_SPORT[leagueId]) return LEAGUE_TO_ODDS_SPORT[leagueId];
  return undefined;
}
