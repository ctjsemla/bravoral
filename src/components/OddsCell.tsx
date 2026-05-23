"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  bookmaker: string;
  home: number;
  draw: number;
  away: number;
  updatedAt: string;
  bestHome: number;
  bestDraw: number;
  bestAway: number;
};

function OddValue({
  label,
  value,
  isBest,
}: {
  label: string;
  value: number;
  isBest: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[10px] font-medium text-[#6B7280]">{label}</span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -6, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`text-sm font-semibold tabular-nums text-[#0A0A0A] ${
            isBest ? "underline decoration-[#E52222] decoration-2 underline-offset-4" : ""
          }`}
        >
          {value.toFixed(2)}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function OddsCell({
  bookmaker,
  home,
  draw,
  away,
  updatedAt,
  bestHome,
  bestDraw,
  bestAway,
}: Props) {
  const updated = new Date(updatedAt).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex min-w-[100px] shrink-0 flex-col gap-2 border-l border-[#E5E7EB] px-4 py-3 first:border-l-0">
            <span className="text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
              {bookmaker}
            </span>
            <div className="flex justify-between gap-2">
              <OddValue label="1" value={home} isBest={home >= bestHome} />
              <OddValue label="X" value={draw} isBest={draw >= bestDraw} />
              <OddValue label="2" value={away} isBest={away >= bestAway} />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>Atualizado às {updated}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
