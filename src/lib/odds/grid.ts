import { BOOKMAKERS } from "@/data/bookmakers";
import type { Odds } from "@/types";

/** Preenche colunas vazias do grid com fallback (média da primeira casa encontrada). */
export function fillOddsGrid(partial: Odds[]): Odds[] {
  const fallback = partial[0] ?? { home: 2.0, draw: 3.2, away: 3.4 };
  return BOOKMAKERS.map((b) => {
    const found = partial.find((o) => o.bookmakerId === b.id);
    if (found) return found;
    return {
      bookmakerId: b.id,
      home: fallback.home,
      draw: fallback.draw,
      away: fallback.away,
    };
  });
}
