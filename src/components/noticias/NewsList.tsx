import type { NewsItem } from "@/lib/news";

function formatNewsDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type Props = {
  items: NewsItem[];
  fromFeed?: boolean;
};

export function NewsList({ items, fromFeed }: Props) {
  return (
    <>
      {fromFeed && (
        <p className="mb-3 text-[11px] text-[#666]">
          Atualizado via RSS (GE · ESPN Brasil). Atualização automática a cada hora.
        </p>
      )}
      <ul className="news-list">
        {items.map((item, i) => (
          <li key={`${item.url}-${i}`} className="news-list__item">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="news-list__title">
              {item.title}
            </a>
            <div className="news-list__meta">
              <span className="news-list__source">{item.source}</span>
              <span className="news-list__date">{formatNewsDate(item.publishedAt)}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
