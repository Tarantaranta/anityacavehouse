"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  blur = false,
  slideDistance = 10,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  blur?: boolean;
  slideDistance?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: slideDistance,
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
