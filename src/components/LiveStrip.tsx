"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Match } from "@/types/match";
import { LiveBadge } from "@/components/LiveBadge";

type Props = {
  matches: Match[];
};

function LiveMatchCard({ match }: { match: Match }) {
  const minuteRef = useRef<HTMLSpanElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const [minute, setMinute] = useState(match.minute ?? 0);
  const [score, setScore] = useState(match.score ?? { home: 0, away: 0 });
  const prevScore = useRef(score);

  useEffect(() => {
    const tick = setInterval(() => {
      setMinute((m) => Math.min(m + 1, 90));
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (!minuteRef.current) return;
    gsap.fromTo(
      minuteRef.current,
      { scale: 1.2, opacity: 0.6 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
    );
  }, [minute]);

  useEffect(() => {
    const changed =
      prevScore.current.home !== score.home ||
      prevScore.current.away !== score.away;
    if (changed && scoreRef.current) {
      gsap.fromTo(
        scoreRef.current,
        { backgroundColor: "#E52222", color: "#ffffff" },
        {
          backgroundColor: "transparent",
          color: "#ffffff",
          duration: 0.3,
          ease: "power2.out",
        },
      );
      prevScore.current = score;
    }
  }, [score]);

  useEffect(() => {
    if (!match.score) return;
    const demo = setInterval(() => {
      if (Math.random() > 0.92) {
        setScore((s) => ({
          ...s,
          home: s.home + (Math.random() > 0.5 ? 1 : 0),
        }));
      }
    }, 8000);
    return () => clearInterval(demo);
  }, [match.score]);

  return (
    <article className="flex min-w-[280px] shrink-0 flex-col justify-between border-r border-white/10 px-8 py-8 sm:min-w-[320px]">
      <LiveBadge />
      <div className="mt-8 flex items-end justify-between gap-6">
        <div className="max-w-[55%]">
          <p className="text-sm font-medium text-white/60">{match.league}</p>
          <h3 className="mt-2 text-lg font-semibold leading-tight text-white sm:text-xl">
            {match.homeTeam}
          </h3>
          <p className="mt-1 text-sm text-white/50">vs</p>
          <h3 className="text-lg font-semibold leading-tight text-white sm:text-xl">
            {match.awayTeam}
          </h3>
        </div>
        <div className="text-right">
          <div
            ref={scoreRef}
            className="inline-block px-2 py-1 text-5xl font-bold tabular-nums tracking-tighter text-white sm:text-6xl"
          >
            {score.home}
            <span className="mx-1 text-white/40">:</span>
            {score.away}
          </div>
          <p className="mt-2 text-sm font-medium text-[#E52222]">
            <span ref={minuteRef} className="inline-block tabular-nums">
              {minute}&apos;
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}

export function LiveStrip({ matches }: Props) {
  const live = matches.filter((m) => m.status === "live");

  if (!live.length) return null;

  return (
    <section className="bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-[1600px] px-4 pt-10 sm:px-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
          Canlı
        </p>
        <h2 className="mt-2 max-w-xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-[4.5rem] lg:leading-[1.05]">
          Jogos agora
        </h2>
      </div>
      <div className="mt-10 overflow-x-auto pb-2">
        <div className="flex w-max min-w-full pl-4 sm:pl-8">
          {live.map((m) => (
            <LiveMatchCard key={m.id} match={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
