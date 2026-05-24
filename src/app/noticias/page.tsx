import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/content/PageHeader";
import { NewsList } from "@/components/noticias/NewsList";
import { fetchNewsHeadlines } from "@/lib/news";

export const metadata = {
  title: "Notícias — BrasilOdds",
  description: "Últimas notícias de futebol e mercado de apostas no Brasil.",
};

export const revalidate = 3600;

export default async function NoticiasPage() {
  const { items, fromFeed } = await fetchNewsHeadlines(20);

  return (
    <SiteShell>
      <div className="content-page py-4">
        <PageHeader
          kicker="Futebol"
          title="Notícias"
          description="Manchetes de futebol e contexto do mercado de apostas. Links abrem no site de origem."
        />
        <NewsList items={items} fromFeed={fromFeed} />
      </div>
    </SiteShell>
  );
}
