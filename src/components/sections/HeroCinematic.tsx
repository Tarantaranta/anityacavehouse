"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function HeroCinematic() {
  const reduce = useReducedMotion();

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
    }, 10000); // 10s

    return () => clearInterval(t);
  }, [reduce, paused, slides.length]);

  return (
    <section
      className="relative min-h-[88vh] bg-surface overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background media */}
      <div className="absolute inset-0">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            >
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                priority={index === 0}
                className="object-cover"
              />
              {/* micro cinematic zoom */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.02 }}
                animate={{ scale: 1.06 }}
                transition={{ duration: 10, ease: "linear" }}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <Container className="relative z-10 pt-24 md:pt-32 pb-16">
        {/* Micro tagline */}
        <div className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-white/80">
          <span className="h-px w-10 bg-white/40" />
          Ortahisar • Independent Suite Homes
        </div>

        <h1 className="mt-6 text-4xl md:text-6xl font-light tracking-wide text-white leading-[1.05] max-w-3xl font-serif">
          Aynı güneş.
          <br />
          Aynı taş.
          <br />
          Binlerce yıl.
        </h1>

        <p className="mt-8 text-base md:text-lg text-white/90 max-w-2xl leading-relaxed">
          Kapadokya'nın kalbinde, Ortahisar'da. Otel değil — bağımsız suite evler.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/tr/booking"
            className="inline-flex items-center justify-center rounded-md bg-white text-ink px-6 py-3 text-sm md:text-base font-medium hover:bg-white/90 transition"
          >
            Rezervasyon
          </a>
          <a
            href="/tr/rooms"
            className="inline-flex items-center justify-center rounded-md border border-white/70 text-white px-6 py-3 text-sm md:text-base font-medium hover:bg-white/10 transition"
          >
            Suite Evleri Keşfet
          </a>
        </div>

        {/* subtle indicator */}
        <div className="mt-16 h-10 flex items-end">
          <div className="h-10 w-px bg-white/50" />
        </div>
      </Container>
    </section>
  );
}
