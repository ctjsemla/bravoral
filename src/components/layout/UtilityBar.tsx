"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { setOddsFormat } from "@/lib/format";

const LINKS: { label: string; href: string }[] = [
  { label: "Bônus grátis", href: "/bonus-gratis" },
  { label: "Cassino", href: "/cassino" },
  { label: "Palpites", href: "/palpites" },
  { label: "Análises", href: "/analises" },
  { label: "Jogo responsável", href: "/jogo-responsavel" },
  { label: "Notícias", href: "/noticias" },
];

export function UtilityBar() {
  const pathname = usePathname();

  return (
    <div className="oc-util">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-2">
        <div className="flex flex-wrap">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "font-bold !text-white" : ""}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="oc-util__right shrink-0 pr-2">
          <span aria-hidden>🔍</span>
          <span aria-hidden>⚙</span>
          <select
            className="border border-[#3a5080] bg-[#132a52] px-2 py-1 text-[11px] text-[#b8c5d9]"
            defaultValue="dec"
            onChange={(e) => setOddsFormat(e.target.value === "dec")}
          >
            <option value="dec">Odds decimais</option>
            <option value="frac">Odds fracionárias</option>
          </select>
          <Link href="#">Entrar</Link>
          <Link href="#" className="oc-btn-signup">
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  );
}
