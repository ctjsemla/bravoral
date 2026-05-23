"use client";

import { motion } from "framer-motion";

export function LiveBadge() {
  return (
    <motion.span
      className="inline-flex items-center gap-1.5 bg-[#E52222] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white"
      animate={{ opacity: [1, 0.85, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
      AO VIVO
    </motion.span>
  );
}
