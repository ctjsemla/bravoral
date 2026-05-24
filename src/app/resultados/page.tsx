import { SiteShell } from "@/components/layout/SiteShell";
import { ComparisonBoard } from "@/components/ComparisonBoard";
import { fetchMatches } from "@/lib/api";

export default async function ResultadosPage() {
  const matches = await fetchMatches({ status: "finished" });

  return (
    <SiteShell activeSub="resultados">
      <ComparisonBoard
        title="Resultados"
        subtitle="Jogos encerrados — odds de fechamento (mock)"
        matches={matches}
      />
    </SiteShell>
  );
}
