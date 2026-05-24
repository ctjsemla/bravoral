import { BOOKMAKERS } from "@/data/bookmakers";

function HeaderRow({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="oc-h-spacer sticky left-0 z-10" />
      {children}
    </div>
  );
}

export function GridHeader() {
  return (
    <>
      <HeaderRow className="oc-h-offers">
        {BOOKMAKERS.map((b) => (
          <div key={b.id} className={`oc-col oc-col--${b.className}`}>
            <span className="oc-offer-badge" style={{ background: b.color }}>
              {b.offer}
            </span>
          </div>
        ))}
      </HeaderRow>
      <HeaderRow className="oc-h-check">
        {BOOKMAKERS.map((b) => (
          <div key={b.id} className={`oc-col oc-col--${b.className}`}>
            <span className="oc-check">✓</span>
          </div>
        ))}
      </HeaderRow>
      <HeaderRow className="oc-h-logos">
        {BOOKMAKERS.map((b) => (
          <div key={b.id} className={`oc-col oc-col--${b.className}`}>
            <span
              className="oc-logo-img"
              style={{ background: b.color, color: b.text }}
            >
              {b.abbr}
            </span>
            <span className="oc-logo-vert">{b.name}</span>
          </div>
        ))}
      </HeaderRow>
      <HeaderRow className="oc-h-terms">
        {BOOKMAKERS.map((b) => (
          <div key={b.id} className={`oc-col oc-col--${b.className}`}>
            {b.terms}
          </div>
        ))}
      </HeaderRow>
      <HeaderRow className="oc-h-quick">
        {BOOKMAKERS.map((b) => (
          <div key={b.id} className={`oc-col oc-col--${b.className}`}>
            <span className="oc-bolt">⚡</span>
          </div>
        ))}
      </HeaderRow>
    </>
  );
}
