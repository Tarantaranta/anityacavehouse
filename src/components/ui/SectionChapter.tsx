"use client";

import { motion } from "framer-motion";

interface SectionChapterProps {
  number: string;
  label: string;
  align?: "left" | "center";
}

export default function SectionChapter({
  number,
  label,
  align = "left",
}: SectionChapterProps) {
  return (
    <motion.div
      className={`flex items-center gap-4 mb-8 ${align === "center" ? "justify-center" : ""}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Chapter Number */}
      <span className="text-xs md:text-sm font-light text-ink-2 tracking-[0.2em] tabular-nums">
        {number}
      </span>

      {/* Divider Line */}
      <motion.div
        className="h-px bg-line flex-grow max-w-[60px]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
      />

      {/* Chapter Label */}
      <span className="text-xs md:text-sm uppercase tracking-[0.18em] text-ink-2 font-light">
        {label}
      </span>
    </motion.div>
  );
}
