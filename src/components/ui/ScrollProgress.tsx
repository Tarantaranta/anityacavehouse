"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  if (reduce) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[90] h-[2px] origin-left bg-ink/70"
      style={{ scaleX }}
    />
  );
}
