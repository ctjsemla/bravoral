import type { Match } from "@/types";

const TZ = "America/Sao_Paulo";

export type DayGroup = { key: string; title: string; matches: Match[] };

function dayKey(iso: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date(iso));
}

function titleFor(key: string, sampleIso: string, ref = new Date()) {
  const today = dayKey(ref.toISOString());
  const tomorrow = dayKey(new Date(ref.getTime() + 864e5).toISOString());
  const d = new Date(sampleIso).toLocaleDateString("pt-BR", {
    timeZone: TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const pretty = d.charAt(0).toUpperCase() + d.slice(1);
  if (key === today) return `Hoje — ${pretty}`;
  if (key === tomorrow) return `Amanhã — ${pretty}`;
  return pretty;
}

export function groupByDay(matches: Match[]): DayGroup[] {
  const sorted = [...matches].sort(
    (a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime(),
  );
  const map = new Map<string, Match[]>();
  for (const m of sorted) {
    const k = dayKey(m.kickoff);
    map.set(k, [...(map.get(k) ?? []), m]);
  }
  return [...map.entries()].map(([key, list]) => ({
    key,
    title: titleFor(key, list[0].kickoff),
    matches: list,
  }));
}
