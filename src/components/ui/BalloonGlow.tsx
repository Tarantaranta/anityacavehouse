"use client";

import { motion } from "framer-motion";

interface BalloonGlowProps {
  color?: string;
  size?: number;
  blur?: number;
  duration?: number;
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

export default function BalloonGlow({
  color = "rgba(251,191,36,0.3)",
  size = 128,
  blur = 30,
  duration = 4,
  position = { top: "25%", right: "25%" },
}: BalloonGlowProps) {
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        ...position,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
