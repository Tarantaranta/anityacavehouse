"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ImageCard from "@/components/ui/ImageCard";
import { SectionKicker } from "@/components/ui/SectionRhythm";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TerraceCinematic() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 14]);

  return (
    <Section tone="base">
      <Container>
        <SectionKicker label="TERRACE" title="Günün başladığı yer." />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Big landscape-ish anchor */}
          <div className="lg:col-span-7">
            <ImageCard
              src="/images/old-site/gallery/08-2.jpg"
              alt="Ortahisar skyline view from terrace"
              aspect="4/5"
              caption="Ortahisar silüeti, vadiler, taş evler"
            />
          </div>

          {/* Floating square with parallax */}
          <div className="lg:col-span-5 lg:pt-16">
            <motion.div style={reduce ? undefined : { y }}>
              <ImageCard
                src="/images/old-site/gallery/07.jpg"
                alt="Hot air balloons at sunrise"
                aspect="1/1"
                caption="Uygun havalarda gün doğumunda balonlar"
              />
            </motion.div>

            <Reveal delay={0.08}>
              <p className="mt-10 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl border-l border-line pl-6">
                Özel teraslarımızdan Kapadokya'nın kaya dokusu, vadiler ve
                güvercinlikler, Ortahisar'ın taş evleri ve açık havalarda uzakta
                Erciyes Dağı görünür. Hava koşulları uygun olduğunda, gün
                doğumunda sıcak hava balonları ufukta sessizce süzülür.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-10 text-2xl md:text-3xl font-light tracking-wide text-ink leading-snug max-w-xl font-serif">
                Teras bir manzara noktası değildir.
                <br />
                Günün başladığı yerdir.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
