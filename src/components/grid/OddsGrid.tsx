import { Fragment } from "react";
import type { Match } from "@/types";
import { groupByDay } from "@/lib/dates";
import { GridHeader } from "@/components/grid/GridHeader";
import { DateBand } from "@/components/grid/DateBand";
import { MatchOddsBlock } from "@/components/grid/MatchOddsBlock";
import { AdBanner } from "@/components/grid/AdBanner";

export function OddsGrid({ matches }: { matches: Match[] }) {
  const days = groupByDay(matches);
  let idx = 0;
  const midDay = Math.floor(days.length / 2);

  return (
    <div className="oc-grid-wrap">
      <div className="oc-grid-inner">
        <GridHeader />
        {days.map((day, dayIndex) => (
          <Fragment key={day.key}>
            <DateBand title={day.title} />
            {day.matches.map((m) => {
              idx += 1;
              return <MatchOddsBlock key={m.id} match={m} index={idx - 1} />;
            })}
            {dayIndex === midDay - 1 || (days.length === 1 && dayIndex === 0) ? (
              <AdBanner />
            ) : null}
          </Fragment>
        ))}
        {!matches.length && (
          <p className="py-12 text-center text-sm text-[#666]">Nenhum jogo encontrado.</p>
        )}
      </div>
    </div>
  );
}
