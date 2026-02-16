"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function ImageCard({
  src,
  alt,
  caption,
  priority = false,
  aspect = "4/5",
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  aspect?: "4/5" | "16/10" | "1/1" | "4/3";
  className?: string;
}) {
  const reduce = useReducedMotion();

  const aspectClass =
    aspect === "16/10"
      ? "aspect-[16/10]"
      : aspect === "1/1"
      ? "aspect-square"
      : aspect === "4/3"
      ? "aspect-[4/3]"
      : "aspect-[4/5]";

  if (reduce) {
    return (
      <figure className={`relative overflow-hidden rounded-sm shadow-soft ${aspectClass} ${className}`}>
        <Image src={src} alt={alt} fill priority={priority} className="object-cover" />
        {caption ? (
          <figcaption className="absolute inset-x-0 bottom-0 bg-black/35 text-white text-sm px-4 py-3">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <motion.figure
      className={`group relative overflow-hidden rounded-sm shadow-soft ${aspectClass} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image src={src} alt={alt} fill priority={priority} className="object-cover" />
      </motion.div>

      {/* ultra subtle vignette for luxury readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-70" />

      {/* optional grain (very subtle) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />

      {caption ? (
        <motion.figcaption
          className="absolute inset-x-0 bottom-0 px-5 py-4 text-white"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="text-sm md:text-base font-light tracking-wide">
            {caption}
          </div>
        </motion.figcaption>
      ) : null}
    </motion.figure>
  );
}
