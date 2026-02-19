"use client";

import Image from "next/image";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";

export default function ImageCardAdvanced({
  src,
  alt,
  caption,
  priority = false,
  aspect = "4/5",
  className = "",
  parallaxStrength = 20,
  enable3D = false,
  variant = "default",
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  aspect?: "4/5" | "16/10" | "1/1" | "4/3" | "3/4" | "21/9";
  className?: string;
  parallaxStrength?: number;
  enable3D?: boolean;
  variant?: "default" | "editorial";
  objectPosition?: string;
}) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!enable3D || reduce || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
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

  const aspectClass =
    aspect === "16/10"
      ? "aspect-[16/10]"
      : aspect === "1/1"
      ? "aspect-square"
      : aspect === "4/3"
      ? "aspect-[4/3]"
      : aspect === "3/4"
      ? "aspect-[3/4]"
      : aspect === "21/9"
      ? "aspect-[21/9]"
      : "aspect-[4/5]";

  const isEditorial = variant === "editorial";

  if (reduce) {
    return (
      <figure className={`relative overflow-hidden rounded-sm shadow-soft ${aspectClass} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          quality={85}
        />
        {caption ? (
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent text-white text-sm px-5 py-4">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <motion.figure
      ref={cardRef}
      className={`group relative overflow-hidden rounded-sm shadow-soft ${aspectClass} ${className}`}
      style={
        enable3D
          ? {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
          : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: parallaxStrength }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          quality={85}
        />
      </motion.div>

      {/* Depth Shadow Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10 pointer-events-none" />

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-60" />

      {/* Film grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 pointer-events-none"
        transition={{ duration: 0.4 }}
      />

      {/* Caption with reveal */}
      {caption ? (
        <motion.figcaption
          className={
            isEditorial
              ? "absolute -bottom-8 left-0 right-0 px-2 py-3 text-ink"
              : "absolute inset-x-0 bottom-0 px-6 py-5 text-white"
          }
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className={
              isEditorial
                ? "text-xs md:text-sm font-light tracking-[0.05em] opacity-60"
                : "text-sm md:text-base font-light tracking-wide drop-shadow-lg"
            }
          >
            {caption}
          </div>
        </motion.figcaption>
      ) : null}
    </motion.figure>
  );
}
