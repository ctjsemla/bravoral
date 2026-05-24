import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { MatchDetailView } from "@/components/match/MatchDetailView";
import { fetchMatchById } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function JogoPage({ params }: Props) {
  const { id } = await params;
  const match = await fetchMatchById(id);
  if (!match) notFound();

  return (
    <SiteShell>
      <MatchDetailView match={match} />
    </SiteShell>
  );
}
