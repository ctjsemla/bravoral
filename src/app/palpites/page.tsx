import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/content/PageHeader";
import { PalpiteCards } from "@/components/palpites/PalpiteCards";

export const metadata = {
  title: "Palpites — BrasilOdds",
  description: "Palpites editoriais de futebol com odd sugerida e casa recomendada.",
};

export default function PalpitesPage() {
  return (
    <SiteShell>
      <div className="content-page py-4">
        <PageHeader
          kicker="Editorial"
          title="Palpites"
          description="Opinião da redação e colunistas — não constitui recomendação de aposta. Confira as odds antes de jogar."
        />
        <div className="content-disclaimer">
          +18 · Conteúdo informativo · Odds podem variar entre as casas
        </div>
        <PalpiteCards />
      </div>
    </SiteShell>
  );
}
