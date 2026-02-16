"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ChapterDividerProps {
  chapter?: string;
  title?: string;
  variant?: "minimal" | "ornate" | "line";
}

export default function ChapterDivider({
  chapter,
  title,
  variant = "minimal",
}: ChapterDividerProps) {
  const reduce = useReducedMotion();

  if (variant === "line") {
    return (
      <div className="relative py-16 md:py-24">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-line to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    );
  }

  if (variant === "ornate") {
    return (
      <div className="relative py-20 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          {chapter && (
            <div className="text-xs tracking-[0.3em] uppercase text-ink-2 font-light">
              {chapter}
            </div>
          )}

          {/* Ornamental element */}
          <div className="flex items-center justify-center gap-4">
            <motion.div
              className="h-px w-12 bg-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-accent"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            />
            <motion.div
              className="h-px w-12 bg-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </div>

          {title && (
            <h3 className="font-serif text-2xl md:text-3xl text-ink font-light tracking-wide">
              {title}
            </h3>
          )}
        </motion.div>
      </div>
    );
  }

  // Minimal variant
  return (
    <div className="relative py-12 md:py-20">
      <motion.div
        className="text-center space-y-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {chapter && (
          <div className="text-xs tracking-[0.25em] uppercase text-ink-2 font-light">
            {chapter}
          </div>
        )}
        {title && (
          <h3 className="font-serif text-xl md:text-2xl text-ink font-light">
            {title}
          </h3>
        )}
      </motion.div>
    </div>
  );
}
