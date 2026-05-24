import { BOOKMAKERS } from "@/data/bookmakers";
import { BONUS_OFFERS } from "@/data/bonuses";

export function BonusFeatured() {
  const featured = BONUS_OFFERS.filter((o) => o.featured).slice(0, 2);

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2">
      {featured.map((offer) => {
        const book = BOOKMAKERS.find((b) => b.id === offer.bookmakerId)!;
        return (
          <article
            key={offer.id}
            className="bonus-card flex flex-col border border-[var(--oc-border)] bg-white p-4"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded text-xs font-extrabold"
                style={{ background: book.color, color: book.text }}
              >
                {book.abbr}
              </span>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#888]">
                  {book.name}
                </p>
                <p className="text-2xl font-extrabold text-[var(--oc-blue-accent)]">
                  {offer.amount}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm font-semibold text-[#222]">{offer.headline}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-[#666]">
              Depósito mín. {offer.minDeposit} · {offer.wagering}
            </p>
            <a href="#" className="bonus-cta mt-4 inline-block w-full text-center">
              Reivindicar oferta
            </a>
          </article>
        );
      })}
    </div>
  );
}
