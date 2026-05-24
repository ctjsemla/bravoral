import { BOOKMAKERS } from "@/data/bookmakers";
import { BONUS_OFFERS, BONUS_TYPE_LABEL } from "@/data/bonuses";

export function BonusOffersTable() {
  const sorted = [...BONUS_OFFERS].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <div className="bonus-table-wrap scroll-x border border-[var(--oc-border)]">
      <table className="bonus-table w-full min-w-[720px] border-collapse">
        <thead>
          <tr className="bg-[var(--oc-head-bg)]">
            <th className="bonus-th text-left">Casa</th>
            <th className="bonus-th text-left">Oferta</th>
            <th className="bonus-th">Valor</th>
            <th className="bonus-th">Tipo</th>
            <th className="bonus-th">Dep. mín.</th>
            <th className="bonus-th">Rollover</th>
            <th className="bonus-th text-left">Válido para</th>
            <th className="bonus-th" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((offer) => {
            const book = BOOKMAKERS.find((b) => b.id === offer.bookmakerId)!;
            return (
              <tr key={offer.id} className="bonus-tr">
                <td className="bonus-td">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded text-[10px] font-extrabold"
                      style={{ background: book.color, color: book.text }}
                    >
                      {book.abbr}
                    </span>
                    <span className="font-bold text-[#111]">{book.name}</span>
                    {offer.featured && (
                      <span className="bonus-tag">Destaque</span>
                    )}
                  </div>
                </td>
                <td className="bonus-td text-left">
                  <span className="font-semibold text-[#222]">{offer.headline}</span>
                  {offer.code && (
                    <span className="mt-1 block font-mono text-[10px] text-[#666]">
                      Código: <strong>{offer.code}</strong>
                    </span>
                  )}
                </td>
                <td className="bonus-td">
                  <span className="text-lg font-extrabold text-[var(--oc-blue-accent)]">
                    {offer.amount}
                  </span>
                </td>
                <td className="bonus-td text-[11px] text-[#555]">
                  {BONUS_TYPE_LABEL[offer.type]}
                </td>
                <td className="bonus-td text-[12px]">{offer.minDeposit}</td>
                <td className="bonus-td text-left text-[11px] text-[#444]">
                  {offer.wagering}
                </td>
                <td className="bonus-td text-left text-[11px] text-[#666]">
                  {offer.validFor}
                  {offer.newCustomersOnly && (
                    <span className="mt-1 block text-[10px] text-[#888]">
                      Só novos clientes
                    </span>
                  )}
                </td>
                <td className="bonus-td">
                  <a href="#" className="bonus-cta">
                    Reivindicar
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
