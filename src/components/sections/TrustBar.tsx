"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";
import ReviewSourceNote from "@/components/ui/ReviewSourceNote";

export default function TrustBar() {
  const t = useTranslations("trustBar");
  const reduce = useReducedMotion();

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  return (
    <div className="bg-surface-2">
      <Container className="py-14 md:py-20">
        {/* Eyebrow */}
        <Reveal>
          <p className="text-xs tracking-[0.18em] uppercase text-ink-2 mb-10">
            {t("label")}
          </p>
        </Reveal>

        {/* 3 stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-black/5 bg-white/50 p-6 md:p-8"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            >
              <p className="text-4xl md:text-5xl font-light font-serif text-ink tracking-tight">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-ink-2 tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Kaynak + kanıt cümlesi */}
        <ReviewSourceNote />

        <Reveal delayMs={200}>
          <p className="border-t border-line pt-6 mt-2 text-ink-2 leading-relaxed">
            {t("description")}{" "}
            <span className="text-ink italic">{t("keywords")}</span>.
          </p>
        </Reveal>
      </Container>
    </div>
  );
}
