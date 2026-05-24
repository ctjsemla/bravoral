export type AnaliseArticle = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  author: string;
  tags: string[];
};

export const ANALISES: AnaliseArticle[] = [
  {
    id: "a1",
    slug: "flamengo-palmeiras-preview",
    title: "Flamengo x Palmeiras: força no Maracanã e duelo de transições",
    summary:
      "Análise tática do clássico da rodada: volume ofensivo do Fla, bloco baixo do Verdão e mercados de escanteios.",
    publishedAt: "2026-05-22",
    author: "BrasilOdds",
    tags: ["Brasileirão", "Pré-jogo"],
  },
  {
    id: "a2",
    slug: "serie-a-rodada-12-tendencias",
    title: "Série A — rodada 12: tendências de gols e cartões",
    summary:
      "Médias de xG, faltas e cartões por time nas últimas cinco partidas; onde o mercado pode estar errado.",
    publishedAt: "2026-05-21",
    author: "Ana Costa",
    tags: ["Estatísticas", "Brasileirão"],
  },
  {
    id: "a3",
    slug: "libertadores-quartas-odds",
    title: "Libertadores: quartas de final e movimento de odds",
    summary:
      "Como as casas ajustaram os favoritos após os sorteios; comparação 1X2 e classificação.",
    publishedAt: "2026-05-20",
    author: "Rafael Mendes",
    tags: ["Libertadores", "Odds"],
  },
  {
    id: "a4",
    slug: "premier-final-champions",
    title: "Premier League: corrida pelo top 4 e impacto na Champions",
    summary:
      "Cenários matemáticos para Arsenal, City e United; leitura para apostas de longo prazo.",
    publishedAt: "2026-05-19",
    author: "BrasilOdds",
    tags: ["Premier League", "Longo prazo"],
  },
];
