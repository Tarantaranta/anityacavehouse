"use client";

import { useRef, useEffect } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import SectionChapter from "@/components/ui/SectionChapter";
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function BreakfastFreedom() {
  const t = useTranslations('breakfast');
  const tChapter = useTranslations('chapters');
  const reduce = useReducedMotion();

  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slow motion playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  // Scroll-based fade in / fade out
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const videoOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.85, 1],
    [0, 1, 1, 0]
  );

  return (
    <Section tone="base">
      <Container>
        <SectionChapter number="06" label={tChapter('morningRhythm')} />

        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Text column */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide text-ink font-serif">
                {t('title')}
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-8 text-2xl md:text-3xl font-light text-ink leading-snug max-w-2xl font-serif whitespace-pre-line">
                {t('tagline')}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 text-base md:text-lg text-ink-2 leading-relaxed max-w-3xl border-l border-line pl-6">
                {t('description')}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-10 text-2xl md:text-3xl font-light tracking-wide text-ink max-w-3xl font-serif">
                {t('closing')}
              </p>
            </Reveal>
          </div>

          {/* Video column */}
          <div className="lg:col-span-5 lg:pt-6">
            <motion.div
              className="relative w-full aspect-[4/5] overflow-hidden rounded-sm shadow-soft"
              style={reduce ? undefined : { opacity: videoOpacity }}
            >
              {/* Top + bottom gradient vignette */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-surface to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none" />

              <video
                ref={videoRef}
                src="/videos/coffee.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
