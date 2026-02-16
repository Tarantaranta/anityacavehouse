"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef, MouseEvent, ReactNode } from "react";

interface TiltProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glareEffect?: boolean;
}

export default function Tilt({
  children,
  className = "",
  tiltStrength = 10,
  glareEffect = false,
}: TiltProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltStrength, -tiltStrength]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltStrength, tiltStrength]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glareEffect && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-sm"
          style={{
            background: `radial-gradient(circle at ${useTransform(
              mouseXSpring,
              [-0.5, 0.5],
              ["0%", "100%"]
            )}% ${useTransform(
              mouseYSpring,
              [-0.5, 0.5],
              ["0%", "100%"]
            )}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
            opacity: useTransform(
              [mouseXSpring, mouseYSpring],
              ([x, y]: number[]) => {
                const distance = Math.sqrt(x * x + y * y);
                return distance > 0.1 ? 0.4 : 0;
              }
            ),
          }}
        />
      )}
    </motion.div>
  );
}
