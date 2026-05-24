import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/content/PageHeader";
import { ArticleCards } from "@/components/analises/ArticleCards";

export const metadata = {
  title: "Análises — BrasilOdds",
  description: "Análises pré-jogo, estatísticas e leitura de mercados de futebol.",
};

export default function AnalisesPage() {
  return (
    <SiteShell>
      <div className="content-page py-4">
        <PageHeader
          kicker="Blog"
          title="Análises"
          description="Artigos sobre futebol brasileiro e internacional, com foco em contexto para apostas esportivas."
        />
        <ArticleCards />
      </div>
    </SiteShell>
  );
}
