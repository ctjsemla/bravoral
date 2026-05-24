import { ANALISES } from "@/data/analises";

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ArticleCards() {
  return (
    <div className="content-cards">
      {ANALISES.map((article) => (
        <article key={article.id} className="article-card">
          <div className="article-card__tags">
            {article.tags.map((t) => (
              <span key={t} className="article-tag">
                {t}
              </span>
            ))}
          </div>
          <h2 className="article-card__title">{article.title}</h2>
          <p className="article-card__summary">{article.summary}</p>
          <footer className="article-card__foot">
            <span>{article.author}</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          </footer>
          <p className="article-card__soon text-[10px] text-[#888]">
            Artigo completo em breve (CMS)
          </p>
        </article>
      ))}
    </div>
  );
}
