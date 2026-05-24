import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/content/PageHeader";
import { ResponsibleContent } from "@/components/jogo-responsavel/ResponsibleContent";

export const metadata = {
  title: "Jogo responsável — BrasilOdds",
  description:
    "Limites, autoexclusão e canais de ajuda para apostas responsáveis no Brasil.",
};

export default function JogoResponsavelPage() {
  return (
    <SiteShell>
      <div className="content-page content-page--narrow py-4">
        <PageHeader
          title="Jogo responsável"
          description="Informações sobre limites, autoexclusão e apoio. Apostas apenas para maiores de 18 anos."
        />
        <ResponsibleContent />
      </div>
    </SiteShell>
  );
}
