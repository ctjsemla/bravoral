export type ApiFixtureStatus = {
  long: string;
  short: string;
  elapsed: number | null;
};

export type ApiFixtureItem = {
  fixture: {
    id: number;
    date: string;
    status: ApiFixtureStatus;
  };
  league: {
    id: number;
    name: string;
    country: string;
  };
  teams: {
    home: { name: string };
    away: { name: string };
  };
  goals: { home: number | null; away: number | null };
};

export type ApiFixturesResponse = {
  response: ApiFixtureItem[];
  errors?: Record<string, string>;
};

export type ApiBetValue = { value: string; odd: string };

export type ApiBet = { id: number; name: string; values: ApiBetValue[] };

export type ApiBookmaker = { id: number; name: string; bets: ApiBet[] };

export type ApiOddsItem = {
  fixture: { id: number };
  bookmakers: ApiBookmaker[];
};

export type ApiOddsResponse = {
  response: ApiOddsItem[];
  errors?: Record<string, string>;
};
