import { LeagueSidebar } from "@/components/sidebar/LeagueSidebar";
import { MarketBar } from "@/components/MarketBar";
import { OddsGrid } from "@/components/grid/OddsGrid";
import type { Match } from "@/types";

type Props = {
  title: string;
  subtitle?: string;
  matches: Match[];
};

export function ComparisonBoard({ title, subtitle, matches }: Props) {
  return (
    <>
      <div className="oc-page-bar">
        <div>
          <strong className="text-[#111]">{title}</strong>
          {subtitle && <span className="ml-2">{subtitle}</span>}
        </div>
        <span className="text-[#888]">{matches.length} jogos · odds 1X2 · BRT</span>
      </div>
      <MarketBar />
      <div className="oc-content">
        <LeagueSidebar />
        <OddsGrid matches={matches} />
      </div>
    </>
  );
}
