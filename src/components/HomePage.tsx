"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LEAGUES, mockMatches } from "@/data/mock-matches";
import type { Match } from "@/types/match";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LiveStrip } from "@/components/LiveStrip";
import { LeagueFilter } from "@/components/LeagueFilter";
import { MatchRow } from "@/components/MatchRow";
import { MatchDetailModal } from "@/components/MatchDetailModal";
import { bookmakers } from "@/data/mock-matches";

export function HomePage() {
  const [activeLeague, setActiveLeague] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!activeLeague) return mockMatches;
    return mockMatches.filter((m) => m.league === activeLeague);
  }, [activeLeague]);

  const handleSelectMatch = (match: Match) => {
    setSelectedMatch(match);
    setModalOpen(true);
  };

  return (
    <>
      <Header
        leagues={LEAGUES}
        selectedLeague={activeLeague}
        onLeagueChange={setActiveLeague}
      />

      <main>
        <LiveStrip matches={mockMatches} />

        <section className="mx-auto max-w-[1600px] px-4 pt-24 sm:px-8">
          <div className="max-w-2xl">
            <h1 className="text-[3rem] font-bold leading-[1.05] tracking-tight text-[#0A0A0A] sm:text-6xl lg:text-[4.5rem]">
              Compare odds do futebol brasileiro
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#6B7280]">
              Bet365, Betano, Sportingbet e mais — lado a lado, em tempo real.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-[1600px] px-4 sm:px-8">
          <LeagueFilter
            leagues={LEAGUES}
            active={activeLeague}
            onChange={setActiveLeague}
          />
        </section>

        <section className="mx-auto mt-16 max-w-[1600px] sm:mt-20">
          <div className="hidden border-b border-[#E5E7EB] px-8 pb-3 lg:grid lg:grid-cols-[42%_1fr]">
            <span className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
              Partida
            </span>
            <div className="flex overflow-hidden">
              {bookmakers.map((b) => (
                <span
                  key={b}
                  className="min-w-[100px] flex-1 border-l border-[#E5E7EB] px-4 text-xs font-medium uppercase tracking-wide text-[#6B7280] first:border-l-0"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.04 } },
            }}
          >
            {filtered.map((match) => (
              <motion.div
                key={match.id}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.25, ease: "easeOut" },
                  },
                }}
              >
                <MatchRow match={match} onSelect={handleSelectMatch} />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="px-8 py-16 text-center text-[#6B7280]">
              Nenhuma partida nesta liga.
            </p>
          )}
        </section>
      </main>

      <Footer />

      <MatchDetailModal
        match={selectedMatch}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
