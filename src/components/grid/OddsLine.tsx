import Link from "next/link";
import type { Match, OddKind } from "@/types";
import { BOOKMAKERS } from "@/data/bookmakers";
import { formatPrice } from "@/lib/format";
import { highlightLevel, valuesFor } from "@/lib/odds";

const MOVE_KEY = {
  home: "moveHome",
  draw: "moveDraw",
  away: "moveAway",
} as const;

type Props = {
  match: Match;
  kind: OddKind;
  label: string;
};

export function OddsLine({ match, kind, label }: Props) {
  const all = match.odds;
  const values = valuesFor(all, kind);

  return (
    <div className="oc-odd-line">
      <span className="oc-odd-line-label">{label}</span>
      {BOOKMAKERS.map((b) => {
        const cell = all.find((o) => o.bookmakerId === b.id)!;
        const value = cell[kind];
        const lv = highlightLevel(value, values);
        const move = cell[MOVE_KEY[kind] as keyof typeof cell] as
          | "short"
          | "drift"
          | undefined;
        const moveClass =
          move === "short" ? "oc-odd-cell--short" : move === "drift" ? "oc-odd-cell--drift" : "";

        return (
          <Link
            key={b.id}
            href={`/jogo/${match.id}`}
            className={`oc-odd-cell ${lv === "best" ? "oc-odd-cell--best" : ""} ${moveClass} ${
              lv === "second" ? "!font-bold !text-[var(--oc-blue-accent)]" : ""
            } ${lv === "worst" ? "!text-[#9ca3af]" : ""}`}
            title={`${match.home.name} v ${match.away.name} — ${label}`}
          >
            {formatPrice(value)}
          </Link>
        );
      })}
    </div>
  );
}
