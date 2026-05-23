"use client";

import { cn } from "@/lib/utils";

type Props = {
  leagues: readonly string[];
  active: string | null;
  onChange: (league: string | null) => void;
};

export function LeagueFilter({ leagues, active, onChange }: Props) {
  return (
    <div className="overflow-x-auto">
      <div className="flex w-max gap-2 pb-1">
        <button
          type="button"
          onClick={() => onChange(null)}
          className={cn(
            "shrink-0 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200",
            active === null
              ? "bg-[#E52222] text-white"
              : "bg-[#F8F9FA] text-[#0A0A0A] hover:bg-[#E5E7EB]",
          )}
        >
          Todas
        </button>
        {leagues.map((league) => (
          <button
            key={league}
            type="button"
            onClick={() => onChange(league)}
            className={cn(
              "shrink-0 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200",
              active === league
                ? "bg-[#E52222] text-white"
                : "bg-[#F8F9FA] text-[#0A0A0A] hover:bg-[#E5E7EB]",
            )}
          >
            {league}
          </button>
        ))}
      </div>
    </div>
  );
}
