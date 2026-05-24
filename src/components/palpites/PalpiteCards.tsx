import { BOOKMAKERS } from "@/data/bookmakers";
import { PALPITES, PALPITE_LABEL } from "@/data/palpites";
import { formatPrice } from "@/lib/format";

export function PalpiteCards() {
  return (
    <ul className="content-cards">
      {PALPITES.map((p) => {
        const book = BOOKMAKERS.find((b) => b.id === p.bookmakerId)!;
        return (
          <li key={p.id} className="palpite-card">
            <div className="palpite-card__top">
              <div>
                <p className="palpite-card__league">{p.league}</p>
                <h2 className="palpite-card__match">{p.matchLabel}</h2>
                <p className="palpite-card__time">{p.kickoff}</p>
              </div>
              <span className={`palpite-pick palpite-pick--${p.pick}`}>{p.pick}</span>
            </div>
            <p className="palpite-card__rationale">{p.rationale}</p>
            <div className="palpite-card__meta">
              <span>
                <strong>Palpite:</strong> {PALPITE_LABEL[p.pick]} ({p.pick})
              </span>
              <span>
                <strong>Odd sugerida:</strong> {formatPrice(p.suggestedOdd)}
              </span>
              <span className="palpite-card__book">
                <span
                  className="inline-flex h-6 w-6 items-center justify-center rounded text-[8px] font-extrabold"
                  style={{ background: book.color, color: book.text }}
                >
                  {book.abbr}
                </span>
                {book.name}
              </span>
            </div>
            <p className="palpite-card__tipster">Por {p.tipster}</p>
          </li>
        );
      })}
    </ul>
  );
}
