import type { League } from "@/types";

export type LeagueGroup = { label: string; leagues: League[] };

export const LEAGUE_GROUPS: LeagueGroup[] = [
  {
    label: "Brasil",
    leagues: [
      { id: "serie-a", name: "Brasileirão Série A", region: "brasil" },
      { id: "serie-b", name: "Série B", region: "brasil" },
      { id: "copa", name: "Copa do Brasil", region: "brasil" },
      { id: "paulistao", name: "Paulistão", region: "brasil" },
      { id: "gaucho", name: "Gaúcho", region: "brasil" },
    ],
  },
  {
    label: "Europa & Libertadores",
    leagues: [
      { id: "premier", name: "Premier League", region: "europa" },
      { id: "la-liga", name: "La Liga", region: "europa" },
      { id: "ucl", name: "Liga dos Campeões", region: "europa" },
      { id: "libertadores", name: "Libertadores", region: "europa" },
      { id: "bundesliga", name: "Bundesliga", region: "europa" },
    ],
  },
  {
    label: "Mundo",
    leagues: [
      { id: "ligue-1", name: "Ligue 1", region: "mundo" },
      { id: "mls", name: "MLS", region: "mundo" },
      { id: "liga-mx", name: "Liga MX", region: "mundo" },
    ],
  },
];

export const ALL_LEAGUES = LEAGUE_GROUPS.flatMap((g) => g.leagues);

export function leagueById(id: string) {
  return ALL_LEAGUES.find((l) => l.id === id);
}

export function leagueName(id: string) {
  return leagueById(id)?.name ?? id;
}
