"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

export default function CursorHalo() {
  const reduce = useReducedMotion();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Slower, larger spring for halo effect
  const springConfig = { damping: 30, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (reduce) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 40);
      cursorY.set(e.clientY - 40);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY, reduce]);

  if (reduce) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-20 h-20 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden lg:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
        filter: "blur(8px)",
      }}
    />
  );
}
