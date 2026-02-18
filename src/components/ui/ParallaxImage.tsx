"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  /** How many pixels to shift on full scroll travel (default: 16) */
  strength?: number;
  priority?: boolean;
  sizes?: string;
}

/**
 * Vanilla scroll-based parallax image.
 * Uses requestAnimationFrame + scroll event – no external animation library.
 * Respects prefers-reduced-motion.
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  strength = 16,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    let raf = 0;

    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 = element bottom at viewport top, 1 = element top at viewport bottom
      const progress = 1 - rect.bottom / (vh + rect.height);
      const y = Math.round((progress - 0.5) * strength * 2);
      inner.style.transform = `translate3d(0, ${y}px, 0) scale(1.06)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div
      ref={wrapperRef}
      className={["relative overflow-hidden", className].join(" ")}
    >
      {/* Inner div scales slightly so edges don't show during parallax */}
      <div
        ref={innerRef}
        className="absolute inset-0"
        style={{ transform: "scale(1.06)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes={sizes}
        />
      </div>
      {/* Subtle gradient overlay – adds depth without darkening */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/20" />
    </div>
  );
}
