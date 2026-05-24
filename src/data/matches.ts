import type { Form, Match, Odds } from "@/types";
import { BOOKMAKERS } from "@/data/bookmakers";

const COLORS = ["#067a3e", "#e4002b", "#1565c0", "#ff6b00", "#6a0dad", "#c62828"];

function team(name: string, form: Form[], i: number) {
  return { name, form, color: COLORS[i % COLORS.length] };
}

type PartialOdds = {
  home: number;
  draw: number;
  away: number;
  moveHome?: "short" | "drift";
  moveDraw?: "short" | "drift";
  moveAway?: "short" | "drift";
};

function mk(p: Record<string, PartialOdds>): Odds[] {
  return BOOKMAKERS.map((b) => {
    const o = p[b.id] ?? { home: 2, draw: 3.2, away: 3.5 };
    return {
      bookmakerId: b.id,
      home: o.home,
      draw: o.draw,
      away: o.away,
      moveHome: o.moveHome,
      moveDraw: o.moveDraw,
      moveAway: o.moveAway,
    };
  });
}

const now = Date.now();

export const MATCHES: Match[] = [
  {
    id: "1",
    leagueId: "serie-a",
    league: "Brasileirão Série A",
    kickoff: new Date(now).toISOString(),
    home: team("Flamengo", ["W", "W", "D", "W", "L"], 0),
    away: team("Palmeiras", ["W", "D", "W", "W", "W"], 1),
    status: "live",
    minute: 68,
    score: { home: 2, away: 1 },
    odds: mk({
      bet365: { home: 2.1, draw: 3.4, away: 3.2, moveHome: "short" },
      betano: { home: 2.15, draw: 3.35, away: 3.15 },
      sportingbet: { home: 2.05, draw: 3.5, away: 3.25, moveAway: "drift" },
      superbet: { home: 2.12, draw: 3.38, away: 3.18 },
      pixbet: { home: 2.08, draw: 3.42, away: 3.22 },
      kto: { home: 2.18, draw: 3.3, away: 3.28 },
      estrela: { home: 2.11, draw: 3.44, away: 3.2 },
      betfair: { home: 2.14, draw: 3.36, away: 3.17 },
      novibet: { home: 2.09, draw: 3.4, away: 3.21 },
      rivalo: { home: 2.07, draw: 3.45, away: 3.24 },
    }),
  },
  {
    id: "2",
    leagueId: "serie-a",
    league: "Brasileirão Série A",
    kickoff: new Date(now).toISOString(),
    home: team("Corinthians", ["D", "W", "L", "W", "D"], 2),
    away: team("São Paulo", ["W", "W", "D", "L", "W"], 3),
    status: "live",
    minute: 41,
    score: { home: 0, away: 0 },
    odds: mk({
      bet365: { home: 2.45, draw: 3.1, away: 2.9 },
      betano: { home: 2.5, draw: 3.05, away: 2.85, moveHome: "short" },
      sportingbet: { home: 2.4, draw: 3.15, away: 2.95 },
      superbet: { home: 2.48, draw: 3.08, away: 2.88 },
      pixbet: { home: 2.42, draw: 3.12, away: 2.92 },
      kto: { home: 2.52, draw: 3.02, away: 2.82 },
      estrela: { home: 2.46, draw: 3.11, away: 2.91 },
      betfair: { home: 2.44, draw: 3.09, away: 2.89 },
      novibet: { home: 2.47, draw: 3.07, away: 2.9 },
      rivalo: { home: 2.43, draw: 3.13, away: 2.93, moveDraw: "drift" },
    }),
  },
  {
    id: "3",
    leagueId: "serie-a",
    league: "Brasileirão Série A",
    kickoff: new Date(now + 4e6).toISOString(),
    home: team("Santos", ["W", "L", "W", "D", "W"], 4),
    away: team("Botafogo", ["D", "W", "W", "L", "D"], 5),
    status: "upcoming",
    odds: mk({
      bet365: { home: 2.8, draw: 3.2, away: 2.5 },
      betano: { home: 2.75, draw: 3.25, away: 2.55 },
      sportingbet: { home: 2.85, draw: 3.15, away: 2.48, moveHome: "short" },
      superbet: { home: 2.78, draw: 3.22, away: 2.52 },
      pixbet: { home: 2.82, draw: 3.18, away: 2.49 },
      kto: { home: 2.76, draw: 3.24, away: 2.54 },
      estrela: { home: 2.84, draw: 3.16, away: 2.47 },
      betfair: { home: 2.79, draw: 3.21, away: 2.51 },
      novibet: { home: 2.81, draw: 3.19, away: 2.5 },
      rivalo: { home: 2.77, draw: 3.23, away: 2.53 },
    }),
  },
  {
    id: "4",
    leagueId: "serie-b",
    league: "Série B",
    kickoff: new Date(now + 5e6).toISOString(),
    home: team("Cruzeiro", ["W", "W", "D", "W", "W"], 0),
    away: team("Atlético-MG", ["L", "D", "W", "L", "W"], 1),
    status: "upcoming",
    odds: mk({
      bet365: { home: 2.2, draw: 3.15, away: 3.1 },
      betano: { home: 2.18, draw: 3.2, away: 3.12 },
      sportingbet: { home: 2.22, draw: 3.12, away: 3.08 },
      superbet: { home: 2.19, draw: 3.17, away: 3.11 },
      pixbet: { home: 2.21, draw: 3.14, away: 3.09 },
      kto: { home: 2.23, draw: 3.11, away: 3.07 },
      estrela: { home: 2.17, draw: 3.19, away: 3.13 },
      betfair: { home: 2.2, draw: 3.16, away: 3.1 },
      novibet: { home: 2.19, draw: 3.15, away: 3.11 },
      rivalo: { home: 2.21, draw: 3.13, away: 3.09 },
    }),
  },
  {
    id: "5",
    leagueId: "premier",
    league: "Premier League",
    kickoff: new Date(now + 6e6).toISOString(),
    home: team("Arsenal", ["W", "W", "W", "D", "W"], 0),
    away: team("Liverpool", ["W", "D", "W", "W", "L"], 1),
    status: "upcoming",
    odds: mk({
      bet365: { home: 2.55, draw: 3.4, away: 2.7 },
      betano: { home: 2.58, draw: 3.35, away: 2.65 },
      sportingbet: { home: 2.52, draw: 3.45, away: 2.72 },
      superbet: { home: 2.56, draw: 3.38, away: 2.68 },
      pixbet: { home: 2.54, draw: 3.42, away: 2.71 },
      kto: { home: 2.6, draw: 3.32, away: 2.64, moveHome: "short" },
      estrela: { home: 2.53, draw: 3.44, away: 2.73 },
      betfair: { home: 2.57, draw: 3.37, away: 2.69 },
      novibet: { home: 2.55, draw: 3.41, away: 2.7 },
      rivalo: { home: 2.51, draw: 3.46, away: 2.74, moveAway: "drift" },
    }),
  },
  {
    id: "6",
    leagueId: "la-liga",
    league: "La Liga",
    kickoff: new Date(now + 8e6).toISOString(),
    home: team("Real Madrid", ["W", "W", "D", "W", "W"], 2),
    away: team("Barcelona", ["W", "W", "W", "L", "W"], 3),
    status: "upcoming",
    odds: mk({
      bet365: { home: 2.35, draw: 3.5, away: 2.85 },
      betano: { home: 2.38, draw: 3.45, away: 2.8 },
      sportingbet: { home: 2.32, draw: 3.55, away: 2.9 },
      superbet: { home: 2.36, draw: 3.48, away: 2.82 },
      pixbet: { home: 2.34, draw: 3.52, away: 2.88 },
      kto: { home: 2.4, draw: 3.42, away: 2.78 },
      estrela: { home: 2.33, draw: 3.54, away: 2.91 },
      betfair: { home: 2.37, draw: 3.47, away: 2.83 },
      novibet: { home: 2.35, draw: 3.51, away: 2.86 },
      rivalo: { home: 2.31, draw: 3.56, away: 2.92 },
    }),
  },
  {
    id: "7",
    leagueId: "ucl",
    league: "Liga dos Campeões",
    kickoff: new Date(now + 10e6).toISOString(),
    home: team("Bayern", ["W", "W", "W", "D", "W"], 4),
    away: team("Dortmund", ["W", "L", "W", "W", "D"], 5),
    status: "upcoming",
    odds: mk({
      bet365: { home: 1.72, draw: 3.9, away: 4.5, moveHome: "short" },
      betano: { home: 1.75, draw: 3.85, away: 4.4 },
      sportingbet: { home: 1.7, draw: 3.95, away: 4.6 },
      superbet: { home: 1.73, draw: 3.88, away: 4.45 },
      pixbet: { home: 1.71, draw: 3.92, away: 4.55 },
      kto: { home: 1.76, draw: 3.82, away: 4.35 },
      estrela: { home: 1.69, draw: 3.98, away: 4.65 },
      betfair: { home: 1.74, draw: 3.86, away: 4.42 },
      novibet: { home: 1.72, draw: 3.9, away: 4.48 },
      rivalo: { home: 1.7, draw: 3.94, away: 4.58 },
    }),
  },
  {
    id: "8",
    leagueId: "libertadores",
    league: "Libertadores",
    kickoff: new Date(now + 12e6).toISOString(),
    home: team("Boca Juniors", ["W", "D", "W", "W", "L"], 0),
    away: team("River Plate", ["W", "W", "L", "W", "W"], 1),
    status: "upcoming",
    odds: mk({
      bet365: { home: 2.65, draw: 3.15, away: 2.6 },
      betano: { home: 2.68, draw: 3.1, away: 2.55, moveDraw: "drift" },
      sportingbet: { home: 2.62, draw: 3.2, away: 2.65 },
      superbet: { home: 2.66, draw: 3.12, away: 2.58 },
      pixbet: { home: 2.64, draw: 3.18, away: 2.62 },
      kto: { home: 2.7, draw: 3.08, away: 2.52, moveHome: "short" },
      estrela: { home: 2.61, draw: 3.22, away: 2.66 },
      betfair: { home: 2.67, draw: 3.14, away: 2.59 },
      novibet: { home: 2.63, draw: 3.17, away: 2.63 },
      rivalo: { home: 2.65, draw: 3.16, away: 2.61 },
    }),
  },
  {
    id: "9",
    leagueId: "copa",
    league: "Copa do Brasil",
    kickoff: new Date(now - 2e6).toISOString(),
    home: team("Fluminense", ["W", "L", "W", "D", "W"], 2),
    away: team("Vasco", ["L", "W", "D", "L", "D"], 3),
    status: "finished",
    score: { home: 2, away: 1 },
    odds: mk({
      bet365: { home: 1.9, draw: 3.5, away: 3.8 },
      betano: { home: 1.92, draw: 3.45, away: 3.75 },
      sportingbet: { home: 1.88, draw: 3.55, away: 3.85 },
      superbet: { home: 1.91, draw: 3.48, away: 3.78 },
      pixbet: { home: 1.89, draw: 3.52, away: 3.82 },
      kto: { home: 1.93, draw: 3.44, away: 3.72 },
      estrela: { home: 1.87, draw: 3.58, away: 3.88 },
      betfair: { home: 1.9, draw: 3.5, away: 3.8 },
      novibet: { home: 1.91, draw: 3.49, away: 3.79 },
      rivalo: { home: 1.89, draw: 3.53, away: 3.81 },
    }),
  },
];
