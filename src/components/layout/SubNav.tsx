"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { id: "inicio", href: "/", label: "Futebol início" },
  { id: "proximos", href: "/", label: "Próximos jogos" },
  { id: "aovivo", href: "/ao-vivo", label: "Ao vivo" },
  { id: "resultados", href: "/resultados", label: "Resultados" },
  { id: "bonus", href: "/bonus-gratis", label: "Bônus grátis" },
  { id: "cupons", href: "/cupons", label: "Cupons" },
];

export function SubNav({ active }: { active?: string }) {
  const pathname = usePathname();

  return (
    <nav className="oc-subnav scroll-x">
      <div className="mx-auto flex max-w-[1600px]">
        {ITEMS.map((item) => {
          const isActive =
            active === item.id ||
            (item.href !== "#" && pathname === item.href) ||
            (item.id === "proximos" && pathname === "/" && !active);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={isActive ? "active" : ""}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
