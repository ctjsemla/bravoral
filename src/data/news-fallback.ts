import type { NewsItem } from "@/lib/news";

export const NEWS_FALLBACK: NewsItem[] = [
  {
    title: "Brasileirão: Flamengo lidera após vitória no clássico",
    source: "BrasilOdds",
    url: "https://ge.globo.com/futebol/",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "Libertadores: confira os confrontos das quartas de final",
    source: "BrasilOdds",
    url: "https://ge.globo.com/futebol/libertadores/",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    title: "Premier League: Arsenal mantém vantagem na ponta",
    source: "BrasilOdds",
    url: "https://www.espn.com.br/futebol/",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    title: "Mercado de apostas: novas regras de publicidade entram em vigor",
    source: "BrasilOdds",
    url: "#",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    title: "Seleção Brasileira: convocados para amistosos de junho",
    source: "BrasilOdds",
    url: "https://ge.globo.com/futebol/selecao-brasileira/",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
  },
];
