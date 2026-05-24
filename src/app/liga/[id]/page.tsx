import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ComparisonBoard } from "@/components/ComparisonBoard";
import { fetchMatches } from "@/lib/api";
import { leagueById, leagueName } from "@/data/leagues";

type Props = { params: Promise<{ id: string }> };

export default async function LigaPage({ params }: Props) {
  const { id } = await params;
  if (!leagueById(id)) notFound();

  const matches = await fetchMatches({ leagueId: id });

  return (
    <SiteShell>
      <ComparisonBoard
        title={leagueName(id)}
        subtitle="Resultado final (1X2) — todas as casas"
        matches={matches}
      />
    </SiteShell>
  );
}
