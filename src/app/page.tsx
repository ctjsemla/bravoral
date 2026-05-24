import { SiteShell } from "@/components/layout/SiteShell";
import { ComparisonBoard } from "@/components/ComparisonBoard";
import { fetchMatches } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const all = await fetchMatches();
  const matches = all.filter((m) => m.status === "live" || m.status === "upcoming");

  return (
    <SiteShell activeSub="proximos">
      <ComparisonBoard
        title="Próximos jogos de futebol"
        subtitle="Compare odds 1X2 entre casas licenciadas no Brasil"
        matches={matches}
      />
    </SiteShell>
  );
}
