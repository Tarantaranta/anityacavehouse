'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

export default function TerraceSection() {
  const t = useTranslations('home.exclusivity');
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true, amount: 0.3 });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.17, 0.67, 0.83, 0.67] as const,
      },
    }),
  };

  return (
    <section className="relative py-24 md:py-32" style={{ backgroundColor: '#D4C4A8' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">

          {/* Desktop: 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left: Sticky Image Mosaic */}
            <div className="relative lg:sticky lg:top-24 lg:self-start h-fit">
              <div className="space-y-6">

                {/* Small Detail Image (Now on Top) */}
                <motion.div
                  className="relative w-3/4 ml-auto aspect-[16/10] overflow-hidden rounded-sm shadow-md group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src="/images/cappadocia-balloon-terrace.avif?v=2"
                    alt="Hot air balloons view from terrace in Cappadocia"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 75vw, 37.5vw"
                  />
                </motion.div>

                {/* Large Primary Image (Now on Bottom) */}
                <motion.div
                  className="relative w-full aspect-[4/3] overflow-hidden rounded-sm shadow-lg group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src="/images/cappadocia-ortahisar-castle.avif?v=2"
                    alt="Ortahisar Castle view from Anitya Cave House terrace"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>

              </div>
            </div>

            {/* Right: Scrolling Text Content */}
            <div ref={textRef} className="space-y-10">

            {/* Title */}
            <motion.h2
              className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900"
              custom={0}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
              variants={fadeInVariants}
            >
              {t('terraceTitle')}
            </motion.h2>

            {/* Emphasis Line */}
            <motion.p
              className="text-xl md:text-2xl font-light text-neutral-800"
              custom={1}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
              variants={fadeInVariants}
            >
              {t('terraceEmphasis')}
            </motion.p>

            {/* Intro Paragraph */}
            <motion.p
              className="text-base md:text-lg text-neutral-700 leading-relaxed"
              custom={2}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
              variants={fadeInVariants}
            >
              {t('terraceIntro')}
            </motion.p>

            {/* List Label */}
            <motion.p
              className="text-sm uppercase tracking-widest text-stone-500 font-medium"
              custom={3}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
              variants={fadeInVariants}
            >
              {t('terraceListLabel')}
            </motion.p>

            {/* List Items */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-10"
              custom={4}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
              variants={fadeInVariants}
            >
              <div className="flex gap-3 text-base md:text-lg text-neutral-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0"></span>
                <span>{t('terraceList.item1')}</span>
              </div>
              <div className="flex gap-3 text-base md:text-lg text-neutral-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0"></span>
                <span>{t('terraceList.item2')}</span>
              </div>
              <div className="flex gap-3 text-base md:text-lg text-neutral-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0"></span>
                <span>{t('terraceList.item3')}</span>
              </div>
              <div className="flex gap-3 text-base md:text-lg text-neutral-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0"></span>
                <span>{t('terraceList.item4')}</span>
              </div>
              <div className="flex gap-3 text-base md:text-lg text-neutral-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0"></span>
                <span>{t('terraceList.item5')}</span>
              </div>
            </motion.div>

            {/* Balloon Paragraph */}
            <motion.p
              className="text-base md:text-lg text-neutral-700 leading-relaxed"
              custom={5}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
              variants={fadeInVariants}
            >
              {t('terraceBalloon')}
            </motion.p>

            {/* Closing Statement */}
            <motion.div
              className="pt-8 border-t border-stone-200"
              custom={6}
              initial="hidden"
              animate={isTextInView ? 'visible' : 'hidden'}
              variants={fadeInVariants}
            >
              <p className="text-2xl md:text-3xl font-light tracking-wide text-neutral-900 leading-snug">
                {t('terraceClosing')}
              </p>
            </motion.div>

            </div>
            {/* End Right: Scrolling Text Content */}

          </div>
          {/* End Desktop: 2-column layout */}

        </div>
      </div>
    </section>
  );
}
