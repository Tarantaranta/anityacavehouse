"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";

interface RevealProps {
  children: React.ReactNode;
  /** Delay in milliseconds (preferred) */
  delayMs?: number;
  /**
   * Delay in seconds – kept for backward compatibility with existing
   * `<Reveal delay={0.06}>` usage. Ignored when `delayMs` is provided.
   */
  delay?: number;
  className?: string;
  /** Adds a slight blur that clears on reveal */
  blur?: boolean;
  /** How many px to slide up from (default: 16) */
  slideDistance?: number;
}

/**
 * Scroll-reveal wrapper using IntersectionObserver + CSS transitions.
 * No external animation library – vanilla React only.
 * Respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delayMs,
  delay = 0,
  className = "",
  blur = false,
  slideDistance = 16,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  const totalDelayMs = delayMs !== undefined ? delayMs : delay * 1000;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (totalDelayMs > 0) {
            setTimeout(() => setShown(true), totalDelayMs);
          } else {
            setShown(true);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [totalDelayMs]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${slideDistance}px)`,
        filter: blur && !shown ? "blur(3px)" : "none",
        transition: "opacity 700ms ease-out, transform 700ms ease-out, filter 600ms ease-out",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
