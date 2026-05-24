"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SPORTS = [
  { id: "brasileirao", href: "/liga/serie-a", label: "Brasileirão" },
  { id: "futebol", href: "/", label: "Futebol" },
  { id: "libertadores", href: "/liga/libertadores", label: "Libertadores" },
  { id: "ucl", href: "/liga/ucl", label: "Champions" },
  { id: "premier", href: "/liga/premier", label: "Premier League" },
  { id: "la-liga", href: "/liga/la-liga", label: "La Liga" },
];

export function MainNav({ activeSport }: { activeSport?: string }) {
  const pathname = usePathname();

  return (
    <nav className="oc-mainnav">
      <div className="mx-auto flex max-w-[1600px] items-stretch">
        <Link href="/" className="oc-logo">
          brasil<span style={{ fontWeight: 400 }}>odds</span>
        </Link>
        <div className="scroll-x flex flex-1 items-stretch">
          {SPORTS.map((s) => {
            const active =
              activeSport === s.id ||
              (s.href !== "/" && pathname.startsWith(s.href)) ||
              (s.id === "futebol" && pathname === "/");
            return (
              <Link key={s.id} href={s.href} className={active ? "active" : ""}>
                {s.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-2 px-4 text-white">
          <span className="text-lg">🎫</span>
          <span className="rounded-full bg-[var(--oc-green)] px-1.5 text-[10px] font-bold">
            0
          </span>
        </div>
      </div>
    </nav>
  );
}
