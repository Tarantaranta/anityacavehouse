"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Positive = moves down, Negative = moves up
  offset?: [string, string];
}

export default function Parallax({
  children,
  className = "",
  speed = 50,
  offset = ["start end", "end start"],
}: ParallaxProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as [string, string],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
