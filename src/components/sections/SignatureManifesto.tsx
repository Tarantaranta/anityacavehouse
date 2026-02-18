"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionChapter from "@/components/ui/SectionChapter";
import { useTranslations } from 'next-intl';

export default function SignatureManifesto() {
  const t = useTranslations('signatureManifesto');
  const tChapter = useTranslations('chapters');
  const reduce = useReducedMotion();

  return (
    <div className="bg-surface">
      <Container className="py-14">
        <SectionChapter number="01" label={tChapter('manifesto')} />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <motion.p
              className="text-2xl md:text-3xl font-light tracking-wide text-ink font-serif leading-snug"
              initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              {t('line1')}
              <br />
              {t('line2')}
            </motion.p>
          </div>

          <div className="md:col-span-5">
            <motion.p
              className="text-ink-2 leading-relaxed"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              {t('description')}
            </motion.p>

            <motion.div
              className="mt-6 flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-ink-2"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.span
                className="h-px bg-line"
                initial={reduce ? false : { width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              />
              {t('tagline')}
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}
