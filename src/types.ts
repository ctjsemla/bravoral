export type Form = "W" | "D" | "L";

export type MatchStatus = "live" | "upcoming" | "finished";

export type Team = { name: string; form: Form[]; color: string };

export type OddKind = "home" | "draw" | "away";

export type Odds = {
  bookmakerId: string;
  home: number;
  draw: number;
  away: number;
  moveHome?: "short" | "drift";
  moveDraw?: "short" | "drift";
  moveAway?: "short" | "drift";
};

export type Match = {
  id: string;
  leagueId: string;
  league: string;
  kickoff: string;
  home: Team;
  away: Team;
  status: MatchStatus;
  minute?: number;
  score?: { home: number; away: number };
  odds: Odds[];
};

export type Bookmaker = {
  id: string;
  name: string;
  abbr: string;
  color: string;
  text: string;
  offer: string;
  terms: string;
  className: string;
};

export type League = { id: string; name: string; region: string };
