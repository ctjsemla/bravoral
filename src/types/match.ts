export type MatchStatus = "live" | "upcoming" | "finished";

export type BookmakerOdds = {
  bookmaker: string;
  home: number;
  draw: number;
  away: number;
  updatedAt: string;
};

export type Match = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  kickoff: string;
  minute?: number;
  score?: { home: number; away: number };
  status: MatchStatus;
  odds: BookmakerOdds[];
};

export type OddsHistoryPoint = {
  time: string;
  home: number;
  draw: number;
  away: number;
};
