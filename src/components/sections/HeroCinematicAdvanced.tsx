"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useState, useRef } from "react";

// Floating Particles Component
function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
      scale: 0.3 + Math.random() * 0.7,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 0.6, 0],
            scale: [p.scale, p.scale * 1.5, p.scale],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Grain Overlay Component
function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
      }}
    />
  );
}

// Word-by-word reveal
function WordReveal({ children, delay = 0 }: { children: string; delay?: number }) {
  const words = children.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.1,
            ease: "easeOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export default function HeroCinematicAdvanced() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = useMemo(
    () => [
      { src: "/images/old-site/gallery/02.jpg", alt: "Anitya Cave House - Ortahisar Cappadocia" },
      { src: "/images/old-site/gallery/03.jpg", alt: "Anitya Cave House - Stone texture and light" },
      { src: "/images/old-site/gallery/08-1.jpg", alt: "Anitya Cave House - Terrace sunrise atmosphere" },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;

    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 12000); // Slower transitions for cinematic feel

    return () => clearInterval(t);
  }, [reduce, paused, slides.length]);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-surface overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y }}
      >
        {reduce ? (
          <Image
            src={slides[0].src}
            alt={slides[0].alt}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>

      {/* Gradient Overlay - Sunrise inspired */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* Ambient Sunrise Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-transparent to-transparent opacity-40" />

      {/* Grain Texture */}
      <GrainOverlay />

      {/* Floating Particles */}
      {!reduce && <FloatingParticles />}

      {/* Content with opacity fade on scroll */}
      <motion.div
        style={reduce ? undefined : { opacity }}
        className="relative z-10"
      >
        <Container className="pt-32 md:pt-40 pb-20">
          {/* Micro tagline */}
          <motion.div
            className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-white/80"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="h-px w-10 bg-white/40" />
            Ortahisar • Independent Suite Homes
          </motion.div>

          {/* Main Headline - Word by word reveal */}
          <h1 className="mt-8 text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-white leading-[1.05] max-w-4xl font-serif">
            <WordReveal delay={0.8}>Aynı güneş.</WordReveal>
            <br />
            <WordReveal delay={1.2}>Aynı taş.</WordReveal>
            <br />
            <WordReveal delay={1.6}>Binlerce yıl.</WordReveal>
          </h1>

          <motion.p
            className="mt-10 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            Kapadokya'nın kalbinde, Ortahisar'da. Otel değil — bağımsız suite evler.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            <a
              href="/tr/booking"
              className="group relative inline-flex items-center justify-center rounded-md bg-white text-ink px-8 py-4 text-sm md:text-base font-medium overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="relative z-10">Rezervasyon</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white to-stone-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="/tr/rooms"
              className="group inline-flex items-center justify-center rounded-md border border-white/70 text-white px-8 py-4 text-sm md:text-base font-medium hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
            >
              Suite Evleri Keşfet
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-20 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          >
            <span className="text-xs tracking-widest text-white/60 uppercase">Scroll</span>
            <motion.div
              className="h-12 w-px bg-white/40"
              animate={{ scaleY: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
