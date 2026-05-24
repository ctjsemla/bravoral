export function MarketBar() {
  const tabs = [
    { id: "1x2", label: "Resultado final (1X2)", on: true },
    { id: "dc", label: "Dupla chance", on: false },
    { id: "ou25", label: "Mais/Menos 2.5", on: false },
    { id: "btts", label: "Ambas marcam", on: false },
  ];

  return (
    <div className="oc-markets">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          disabled={!t.on}
          className={`oc-market ${t.on ? "oc-market--on" : ""}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
