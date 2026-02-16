"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ImageCardAdvanced from "@/components/ui/ImageCardAdvanced";
import { SectionKicker } from "@/components/ui/SectionRhythm";
import BalloonGlow from "@/components/ui/BalloonGlow";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TerraceCinematicAdvanced() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  return (
    <Section tone="base">
      <Container>
        <SectionKicker label="TERAS" title="Günün başladığı yer." />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Terrace Image - Subtle 3D effect */}
          <div className="lg:col-span-7 relative">
            <ImageCardAdvanced
              src="/images/cappadocia-ortahisar-castle.avif"
              alt="Ortahisar skyline view from terrace"
              aspect="4/5"
              caption="Ortahisar silüeti, vadiler, taş evler"
              enable3D={true}
              variant="editorial"
            />

            {/* Ambient light overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-sm"
              style={{
                background: "radial-gradient(circle at 30% 30%, rgba(251,191,36,0.1) 0%, transparent 50%)",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Balloon Image with Parallax + Glow */}
          <div className="lg:col-span-5 lg:pt-16 relative">
            <motion.div
              style={reduce ? undefined : { y }}
              className="relative"
            >
              <motion.div
                style={reduce ? undefined : { scale }}
              >
                <ImageCardAdvanced
                  src="/images/cappadocia-balloon-terrace.avif"
                  alt="Hot air balloons at sunrise"
                  aspect="1/1"
                  caption="Uygun havalarda gün doğumunda balonlar"
                  parallaxStrength={30}
                  variant="editorial"
                />
              </motion.div>

              {/* Animated Balloon Glow Effect */}
              {!reduce && <BalloonGlow />}
            </motion.div>

            {/* Editorial Text */}
            <Reveal delay={0.1}>
              <div className="mt-12 relative">
                {/* Decorative line */}
                <motion.div
                  className="h-px bg-line mb-8"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />

                <p className="text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                  Özel teraslarımızdan Kapadokya'nın kaya dokusu, vadiler ve
                  güvercinlikler, Ortahisar'ın taş evleri ve açık havalarda uzakta
                  Erciyes Dağı görünür.
                </p>

                <motion.p
                  className="mt-6 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Hava koşulları uygun olduğunda, gün doğumunda{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-ink font-medium">sıcak hava balonları</span>
                    <motion.span
                      className="absolute inset-x-0 bottom-0 h-2 bg-amber-200/40"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </span>{" "}
                  ufukta sessizce süzülür.
                </motion.p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-12 text-2xl md:text-3xl font-light tracking-wide text-ink leading-snug max-w-xl font-serif">
                Teras bir manzara noktası değildir.
                <br />
                <span className="text-accent">Günün başladığı yerdir.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
