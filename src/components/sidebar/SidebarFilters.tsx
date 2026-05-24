"use client";

export function SidebarFilters() {
  return (
    <div className="oc-filters">
      <label>
        <input type="checkbox" defaultChecked /> Melhores odds
      </label>
      <label>
        <input type="checkbox" /> Melhores odds (só vitória)
      </label>
      <div className="oc-legend">
        <span>
          <span className="oc-swatch oc-swatch--short" /> Odds em queda
        </span>
        <span>
          <span className="oc-swatch oc-swatch--drift" /> Odds em alta
        </span>
      </div>
      <select className="oc-sort" defaultValue="price">
        <option value="price">Ordenar: preço</option>
        <option value="time">Horário do jogo</option>
        <option value="name">Nome</option>
      </select>
    </div>
  );
}
