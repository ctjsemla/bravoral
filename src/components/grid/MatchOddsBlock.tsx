import Link from "next/link";
import type { Match } from "@/types";
import { timeBRT } from "@/lib/format";
import { OddsLine } from "@/components/grid/OddsLine";

export function MatchOddsBlock({ match, index }: { match: Match; index: number }) {
  const live = match.status === "live";
  const sub = live
    ? `${match.minute}' · ${match.score?.home}:${match.score?.away}`
    : `${timeBRT(match.kickoff)} BRT`;

  return (
    <div className="oc-match-block">
      <div className="oc-match-info">
        <Link href={`/jogo/${match.id}`}>
          <span className="oc-match-row__plus">+</span>{" "}
          <span className="oc-match-row__num">{index + 1}</span>
          <div className="mt-1 flex items-center gap-2">
            <span
              className="oc-match-row__logo"
              style={{ background: match.home.color }}
            >
              {match.home.name.slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0">
              <div className="oc-match-row__name truncate">
                {match.home.name} v {match.away.name}
              </div>
              <div className="oc-match-row__sub">
                {sub} · {match.league}
              </div>
            </div>
          </div>
          {live && (
            <span className="mt-1 inline-block bg-[var(--oc-blue-accent)] px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-white">
              Ao vivo
            </span>
          )}
        </Link>
      </div>
      <div className="min-w-0">
        <OddsLine match={match} kind="home" label="1" />
        <OddsLine match={match} kind="draw" label="X" />
        <OddsLine match={match} kind="away" label="2" />
      </div>
    </div>
  );
}
