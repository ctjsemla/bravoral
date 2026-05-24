"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LEAGUE_GROUPS } from "@/data/leagues";
import { SidebarFilters } from "@/components/sidebar/SidebarFilters";

export function LeagueSidebar() {
  const pathname = usePathname();

  return (
    <aside className="oc-sidebar">
      <SidebarFilters />
      {LEAGUE_GROUPS.map((g) => (
        <div key={g.label}>
          <p className="bg-[#f0f0f0] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-[#666]">
            {g.label}
          </p>
          {g.leagues.map((l) => {
            const href = `/liga/${l.id}`;
            const active = pathname === href;
            return (
              <Link
                key={l.id}
                href={href}
                className={`oc-league-link ${active ? "active" : ""}`}
              >
                {l.name}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
