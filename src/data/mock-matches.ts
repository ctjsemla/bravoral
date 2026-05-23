import type { Match, OddsHistoryPoint } from "@/types/match";

const bookmakers = ["Bet365", "Betano", "Sportingbet", "SuperBet", "Pixbet"];

function odds(
  bookmaker: string,
  home: number,
  draw: number,
  away: number,
  minutesAgo = 2,
): Match["odds"][0] {
  const t = new Date(Date.now() - minutesAgo * 60_000).toISOString();
  return { bookmaker, home, draw, away, updatedAt: t };
}

export const LEAGUES = [
  "Série A",
  "Série B",
  "Copa do Brasil",
  "Paulistão",
  "Gaúcho",
  "Carioca",
] as const;

export const mockMatches: Match[] = [
  {
    id: "1",
    homeTeam: "Flamengo",
    awayTeam: "Palmeiras",
    league: "Série A",
    kickoff: new Date().toISOString(),
    minute: 67,
    score: { home: 2, away: 1 },
    status: "live",
    odds: [
      odds("Bet365", 2.1, 3.4, 3.2),
      odds("Betano", 2.15, 3.35, 3.15),
      odds("Sportingbet", 2.05, 3.5, 3.25),
      odds("SuperBet", 2.12, 3.38, 3.18),
      odds("Pixbet", 2.08, 3.42, 3.22),
    ],
  },
  {
    id: "2",
    homeTeam: "Corinthians",
    awayTeam: "São Paulo",
    league: "Série A",
    kickoff: new Date().toISOString(),
    minute: 34,
    score: { home: 0, away: 0 },
    status: "live",
    odds: [
      odds("Bet365", 2.45, 3.1, 2.9),
      odds("Betano", 2.5, 3.05, 2.85),
      odds("Sportingbet", 2.4, 3.15, 2.95),
      odds("SuperBet", 2.48, 3.08, 2.88),
      odds("Pixbet", 2.42, 3.12, 2.92),
    ],
  },
  {
    id: "3",
    homeTeam: "Grêmio",
    awayTeam: "Internacional",
    league: "Gaúcho",
    kickoff: new Date().toISOString(),
    minute: 78,
    score: { home: 1, away: 2 },
    status: "live",
    odds: [
      odds("Bet365", 4.2, 3.6, 1.75),
      odds("Betano", 4.1, 3.65, 1.78),
      odds("Sportingbet", 4.25, 3.55, 1.72),
      odds("SuperBet", 4.15, 3.62, 1.76),
      odds("Pixbet", 4.18, 3.58, 1.74),
    ],
  },
  {
    id: "4",
    homeTeam: "Santos",
    awayTeam: "Botafogo",
    league: "Série A",
    kickoff: new Date(Date.now() + 3_600_000 * 4).toISOString(),
    status: "upcoming",
    odds: [
      odds("Bet365", 2.8, 3.2, 2.5),
      odds("Betano", 2.75, 3.25, 2.55),
      odds("Sportingbet", 2.85, 3.15, 2.48),
      odds("SuperBet", 2.78, 3.22, 2.52),
      odds("Pixbet", 2.82, 3.18, 2.49),
    ],
  },
  {
    id: "5",
    homeTeam: "Atlético-MG",
    awayTeam: "Cruzeiro",
    league: "Série A",
    kickoff: new Date(Date.now() + 3_600_000 * 6).toISOString(),
    status: "upcoming",
    odds: [
      odds("Bet365", 1.95, 3.5, 3.8),
      odds("Betano", 1.98, 3.45, 3.75),
      odds("Sportingbet", 1.92, 3.55, 3.85),
      odds("SuperBet", 1.96, 3.48, 3.78),
      odds("Pixbet", 1.94, 3.52, 3.82),
    ],
  },
  {
    id: "6",
    homeTeam: "Vasco",
    awayTeam: "Fluminense",
    league: "Carioca",
    kickoff: new Date(Date.now() - 3_600_000 * 2).toISOString(),
    score: { home: 1, away: 3 },
    status: "finished",
    odds: [
      odds("Bet365", 3.1, 3.3, 2.2, 120),
      odds("Betano", 3.05, 3.35, 2.22, 120),
      odds("Sportingbet", 3.15, 3.28, 2.18, 120),
      odds("SuperBet", 3.08, 3.32, 2.21, 120),
      odds("Pixbet", 3.12, 3.31, 2.19, 120),
    ],
  },
  {
    id: "7",
    homeTeam: "Athletico-PR",
    awayTeam: "Fortaleza",
    league: "Série B",
    kickoff: new Date(Date.now() + 3_600_000 * 8).toISOString(),
    status: "upcoming",
    odds: [
      odds("Bet365", 2.2, 3.15, 3.1),
      odds("Betano", 2.18, 3.2, 3.12),
      odds("Sportingbet", 2.22, 3.12, 3.08),
      odds("SuperBet", 2.19, 3.17, 3.11),
      odds("Pixbet", 2.21, 3.14, 3.09),
    ],
  },
  {
    id: "8",
    homeTeam: "Bahia",
    awayTeam: "Vitória",
    league: "Copa do Brasil",
    kickoff: new Date(Date.now() + 3_600_000 * 12).toISOString(),
    status: "upcoming",
    odds: [
      odds("Bet365", 1.85, 3.6, 4.0),
      odds("Betano", 1.88, 3.55, 3.95),
      odds("Sportingbet", 1.82, 3.65, 4.05),
      odds("SuperBet", 1.86, 3.58, 3.98),
      odds("Pixbet", 1.84, 3.62, 4.02),
    ],
  },
];

export function getOddsHistory(matchId: string): OddsHistoryPoint[] {
  const base = mockMatches.find((m) => m.id === matchId);
  if (!base?.odds[0]) return [];
  const { home, draw, away } = base.odds[0];
  return [
    { time: "14:00", home: home + 0.15, draw: draw - 0.05, away: away + 0.1 },
    { time: "14:30", home: home + 0.08, draw, away: away + 0.05 },
    { time: "15:00", home: home + 0.03, draw: draw + 0.02, away },
    { time: "15:30", home, draw, away },
    { time: "16:00", home: home - 0.02, draw, away: away - 0.03 },
    { time: "Agora", home: home - 0.05, draw: draw + 0.03, away: away - 0.05 },
  ];
}

export { bookmakers };
