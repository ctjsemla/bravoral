import { NEWS_FALLBACK } from "@/data/news-fallback";

export type NewsItem = {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
};

const FEEDS: { url: string; source: string }[] = [
  { url: "https://ge.globo.com/rss/ge/", source: "ge.globo.com" },
  { url: "https://www.espn.com.br/espn/rss/futebol/news", source: "ESPN Brasil" },
];

function decodeXml(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function extractTag(block: string, tag: string): string {
  const cdata = new RegExp(
    `<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`,
    "i",
  );
  const plain = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = block.match(cdata) ?? block.match(plain);
  return m ? decodeXml(m[1]) : "";
}

function parseRss(xml: string, source: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = extractTag(block, "title");
    const link = extractTag(block, "link");
    const pubDate = extractTag(block, "pubDate");
    if (!title || !link) continue;
    items.push({
      title,
      source,
      url: link,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
    });
  }
  return items;
}

async function fetchFeed(feed: { url: string; source: string }): Promise<NewsItem[]> {
  const res = await fetch(feed.url, {
    next: { revalidate: 3600 },
    headers: { Accept: "application/rss+xml, application/xml, text/xml" },
  });
  if (!res.ok) return [];
  const xml = await res.text();
  return parseRss(xml, feed.source);
}

export type NewsFetchResult = {
  items: NewsItem[];
  fromFeed: boolean;
};

export async function fetchNewsHeadlines(limit = 20): Promise<NewsFetchResult> {
  try {
    const batches = await Promise.all(FEEDS.map(fetchFeed));
    const merged = batches.flat().filter((n) => n.title.length > 0);
    if (merged.length === 0) {
      return { items: NEWS_FALLBACK.slice(0, limit), fromFeed: false };
    }
    merged.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
    const seen = new Set<string>();
    const unique: NewsItem[] = [];
    for (const item of merged) {
      const key = item.title.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(item);
      if (unique.length >= limit) break;
    }
    return { items: unique, fromFeed: true };
  } catch {
    return { items: NEWS_FALLBACK.slice(0, limit), fromFeed: false };
  }
}
