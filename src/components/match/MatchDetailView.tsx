import Link from "next/link";
import type { Match } from "@/types";
import { BOOKMAKERS } from "@/data/bookmakers";
import { formatPrice, timeBRT } from "@/lib/format";
import { highlightLevel, valuesFor } from "@/lib/odds";
import type { OddKind } from "@/types";

const KINDS: { k: OddKind; label: string; name: string }[] = [
  { k: "home", label: "1", name: "Casa" },
  { k: "draw", label: "X", name: "Empate" },
  { k: "away", label: "2", name: "Fora" },
];

export function MatchDetailView({ match }: { match: Match }) {
  return (
    <div className="py-4">
      <p className="text-[11px] text-[#666]">
        <Link href="/" className="text-[var(--oc-blue-accent)] hover:underline">
          ← Voltar
        </Link>
      </p>
      <h1 className="mt-4 text-2xl font-extrabold text-[#111]">
        {match.home.name} v {match.away.name}
      </h1>
      <p className="mt-1 text-sm text-[#555]">
        {match.league} · {timeBRT(match.kickoff)} BRT
        {match.status === "live" && match.score && (
          <span className="ml-2 font-bold text-[var(--oc-blue-accent)]">
            Ao vivo {match.score.home}:{match.score.away} ({match.minute}&apos;)
          </span>
        )}
      </p>

      <table className="oc-detail-table mt-6">
        <thead>
          <tr>
            <th className="text-left">Mercado</th>
            {BOOKMAKERS.map((b) => (
              <th key={b.id}>{b.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {KINDS.map(({ k, label, name }) => {
            const values = valuesFor(match.odds, k);
            return (
              <tr key={k}>
                <td className="text-left font-bold">
                  {label} <span className="font-normal text-[#888]">({name})</span>
                </td>
                {BOOKMAKERS.map((b) => {
                  const cell = match.odds.find((o) => o.bookmakerId === b.id)!;
                  const v = cell[k];
                  const lv = highlightLevel(v, values);
                  return (
                    <td
                      key={b.id}
                      className={
                        lv === "best"
                          ? "bg-[var(--oc-blue-accent)] font-bold text-white"
                          : lv === "second"
                            ? "font-bold text-[var(--oc-blue-accent)]"
                            : ""
                      }
                    >
                      {formatPrice(v)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="mt-6 text-[11px] text-[#888]">
        Clique numa casa para abrir o site — integração de links virá com a API.
      </p>
    </div>
  );
}
