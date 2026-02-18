"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function HeroCinematicTR() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax values
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const maskOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0.3, 0.5, 0.7]);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Layer - Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: reduce ? 0 : bgY }}
      >
        <Image
          src="/images/cappadocia-cave-house.avif"
          alt="Anitya Cave House - Terrace sunrise atmosphere"
          fill
          className="object-cover object-center"
          priority
          quality={95}
          sizes="100vw"
        />
      </motion.div>

      {/* Cinematic Mask - Dark gradient from bottom */}
      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        style={{ opacity: reduce ? 0.3 : maskOpacity }}
      />

      {/* Stone Blur Overlay - Subtle texture */}
      <div className="absolute inset-0 z-20 backdrop-blur-[0.5px] bg-ink/5" />

      {/* Fine Grain */}
      <div
        className="absolute inset-0 z-30 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content - Fades on scroll */}
      <motion.div
        className="relative z-40 h-full flex flex-col items-center justify-center text-center px-6"
        style={{
          y: reduce ? 0 : contentY,
          opacity: reduce ? 1 : contentOpacity,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.p
            className="text-white/70 text-sm tracking-[0.3em] uppercase mb-6 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Ortahisar • Kapadokya
          </motion.p>

          {/* Main Heading - Word by word reveal */}
          <h1 className="font-serif text-white mb-8">
            <motion.span
              className="block text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Aynı güneş.
            </motion.span>
            <motion.span
              className="block text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Aynı taş.
            </motion.span>
            <motion.span
              className="block text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
              Binlerce yıl.
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            Kapadokya'nın kalbinde, Ortahisar'da.
            <br className="hidden md:block" />{" "}
            Otel değil — bağımsız suite evler.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12"
          >
            <a
              href="/tr/rooms"
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <span className="font-light tracking-wide">Suite Evleri Keşfedin</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.8,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
        >
          <div className="flex flex-col items-center gap-3 text-white/60">
            <span className="text-xs tracking-[0.2em] uppercase font-light">Keşfet</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Ambient glow - subtle sunrise effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-500/5 via-transparent to-transparent z-20 pointer-events-none" />
    </section>
  );
}
