import { SiteShell } from "@/components/layout/SiteShell";
import { ComparisonBoard } from "@/components/ComparisonBoard";
import { fetchMatches } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function AoVivoPage() {
  const matches = await fetchMatches({ status: "live" });

  return (
    <SiteShell activeSub="aovivo">
      <ComparisonBoard
        title="Futebol ao vivo"
        subtitle="Odds em tempo real — atualização via API em breve"
        matches={matches}
      />
    </SiteShell>
  );
}
