"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Match } from "@/types";
import { formatPrice } from "@/lib/format";

const POLL_MS = 60_000;

export function LiveBar() {
  const [live, setLive] = useState<Match[]>([]);

  const load = useCallback(() => {
    fetch("/api/matches?status=live", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: Match[]) => setLive(data))
      .catch(() => setLive([]));
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, POLL_MS);
    return () => clearInterval(t);
  }, [load]);

  if (!live.length) return null;

  return (
    <div className="oc-live-bar">
      <div className="scroll-x">
        <div className="flex w-max items-stretch">
          <div className="flex shrink-0 items-center px-4 text-[10px] font-extrabold uppercase tracking-widest text-[var(--oc-blue-accent)]">
            Ao vivo
          </div>
          {live.map((m) => (
            <Link
              key={m.id}
              href={`/jogo/${m.id}`}
              className="flex shrink-0 items-center gap-3 border-r border-white/15 px-5 py-2.5"
            >
              <span className="text-xs font-bold">
                {m.minute}&apos; {m.home.name}{" "}
                <span className="text-white/50">
                  {m.score?.home}:{m.score?.away}
                </span>{" "}
                {m.away.name}
              </span>
              <span className="font-mono text-[11px] text-[var(--oc-blue-accent)]">
                1 {formatPrice(Math.max(...m.odds.map((o) => o.home)))}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
