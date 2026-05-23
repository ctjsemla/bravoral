"use client";

import type { Match } from "@/types/match";
import { getOddsHistory } from "@/data/mock-matches";
import { bestOddsValues, formatKickoff } from "@/lib/odds";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OddsChart } from "@/components/OddsChart";
import { OddsCell } from "@/components/OddsCell";
import { LiveBadge } from "@/components/LiveBadge";

type Props = {
  match: Match | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MatchDetailModal({ match, open, onOpenChange }: Props) {
  if (!match) return null;

  const best = bestOddsValues(match.odds);
  const history = getOddsHistory(match.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {match.status === "live" && <LiveBadge />}
            <span className="text-sm text-[#6B7280]">{match.league}</span>
          </div>
          <DialogTitle className="mt-2 text-3xl">
            {match.homeTeam} vs {match.awayTeam}
          </DialogTitle>
          {match.score && (
            <p className="text-4xl font-bold tabular-nums">
              {match.score.home} : {match.score.away}
              {match.minute != null && (
                <span className="ml-3 text-lg font-normal text-[#E52222]">
                  {match.minute}&apos;
                </span>
              )}
            </p>
          )}
          <p className="text-sm text-[#6B7280]">{formatKickoff(match.kickoff)}</p>
        </DialogHeader>

        <section className="mb-8">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#6B7280]">
            Evolução das odds (1X2)
          </h3>
          <OddsChart data={history} />
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#6B7280]">
            Todas as casas
          </h3>
          <div className="flex overflow-x-auto border border-[#E5E7EB]">
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
        </section>
      </DialogContent>
    </Dialog>
  );
}
