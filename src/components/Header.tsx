"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  leagues: readonly string[];
  selectedLeague: string | null;
  onLeagueChange: (league: string | null) => void;
};

export function Header({ leagues, selectedLeague, onLeagueChange }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 sm:px-8">
        <a href="/" className="font-serif text-lg font-bold tracking-tight text-[#0A0A0A]">
          BrasilOdds
        </a>
        <Select
          value={selectedLeague ?? "all"}
          onValueChange={(v) => onLeagueChange(v === "all" ? null : v)}
        >
          <SelectTrigger className="h-9 border-[#E5E7EB] text-sm">
            <SelectValue placeholder="Liga" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as ligas</SelectItem>
            {leagues.map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}
