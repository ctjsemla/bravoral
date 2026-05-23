import type { BookmakerOdds } from "@/types/match";

export function bestOddsValues(oddsList: BookmakerOdds[]) {
  if (!oddsList.length) return { home: 0, draw: 0, away: 0 };
  return {
    home: Math.max(...oddsList.map((o) => o.home)),
    draw: Math.max(...oddsList.map((o) => o.draw)),
    away: Math.max(...oddsList.map((o) => o.away)),
  };
}

export function formatKickoff(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
