import type { Odds } from "@/types";
import type { OddKind } from "@/types";

export function valuesFor(matchOdds: Odds[], kind: OddKind) {
  return matchOdds.map((o) => o[kind]);
}

export function bestValue(values: number[]) {
  return Math.max(...values);
}

export function highlightLevel(value: number, values: number[]) {
  const sorted = [...values].sort((a, b) => b - a);
  const max = sorted[0];
  const min = sorted[sorted.length - 1];
  const second = sorted[1] ?? max;
  if (value === max) return "best" as const;
  if (value === second && value !== max) return "second" as const;
  if (value <= min + 0.05) return "worst" as const;
  return "normal" as const;
}
