"use client";

import type { Match } from "@/types/match";
import { bestOddsValues, formatKickoff } from "@/lib/odds";
import { OddsCell } from "@/components/OddsCell";
import { LiveBadge } from "@/components/LiveBadge";
import { cn } from "@/lib/utils";

type Props = {
  match: Match;
  onSelect: (match: Match) => void;
};

export function MatchRow({ match, onSelect }: Props) {
  const best = bestOddsValues(match.odds);
  const isLive = match.status === "live";
  const isFinished = match.status === "finished";

  return (
    <button
      type="button"
      onClick={() => onSelect(match)}
      className="group w-full border-b border-[#E5E7EB] text-left transition-colors hover:bg-[#F8F9FA]"
    >
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-4 py-5 sm:px-8 lg:max-w-[42%] lg:py-7">
          <div className="flex items-center gap-3">
            {isLive && <LiveBadge />}
            {isFinished && (
              <span className="bg-[#E5E7EB] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
                Encerrado
              </span>
            )}
            {!isLive && !isFinished && (
              <span className="text-xs text-[#6B7280]">{formatKickoff(match.kickoff)}</span>
            )}
          </div>
          <p className="text-lg font-semibold tracking-tight text-[#0A0A0A] sm:text-xl">
            {match.homeTeam}
            <span className="mx-2 font-normal text-[#6B7280]">–</span>
            {match.awayTeam}
          </p>
          <p className="text-sm text-[#6B7280]">{match.league}</p>
          {isLive && match.score && (
            <p className="mt-1 text-2xl font-bold tabular-nums text-[#0A0A0A] lg:hidden">
              {match.score.home} : {match.score.away}
              <span className="ml-3 text-sm font-normal text-[#E52222]">
                {match.minute}&apos;
              </span>
            </p>
          )}
        </div>

        {isLive && match.score && (
          <div className="hidden items-center justify-end px-8 lg:flex lg:w-32">
            <div className="text-right">
              <p className="text-4xl font-bold tabular-nums tracking-tight text-[#0A0A0A]">
                {match.score.home}
                <span className="mx-1 text-[#6B7280]">:</span>
                {match.score.away}
              </p>
              <p className="text-sm font-medium text-[#E52222]">{match.minute}&apos;</p>
            </div>
          </div>
        )}

        <div
          className={cn(
            "flex overflow-x-auto border-t border-[#E5E7EB] lg:border-t-0 lg:border-l",
            isLive && "lg:flex-1",
          )}
        >
          {match.odds.map((o) => (
            <OddsCell
              key={o.bookmaker}
              bookmaker={o.bookmaker}
              home={o.home}
              draw={o.draw}
              away={o.away}
              updatedAt={o.updatedAt}
              bestHome={best.home}
              bestDraw={best.draw}
              bestAway={best.away}
            />
          ))}
        </div>
      </div>
    </button>
  );
}
