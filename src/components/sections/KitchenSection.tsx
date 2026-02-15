'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

export default function KitchenSection() {
  const t = useTranslations('home.exclusivity');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
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
                    src="/images/cappadocia-cave-house-kitchen.avif?v=2"
                    alt="Kitchen detail in Anitya Cave House suite"
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
                    src="/images/cave-house-kitchen.avif?v=2"
                    alt="Fully equipped kitchen in Anitya Cave House"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>

              </div>
            </div>

            {/* Right: Scrolling Text Content */}
            <div ref={ref} className="space-y-10">

              {/* Title */}
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-stone-900 leading-relaxed"
                custom={0}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={fadeInVariants}
              >
                {t('kitchenTitle')}
              </motion.h2>

              {/* Main Emphasis */}
              <motion.p
                className="text-2xl md:text-3xl font-light tracking-wide text-neutral-900 leading-snug"
                custom={1}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={fadeInVariants}
              >
                {t('kitchenIntro')}
              </motion.p>

              {/* Freedom Statement */}
              <motion.p
                className="text-xl md:text-2xl font-light text-neutral-800"
                custom={2}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={fadeInVariants}
              >
                {t('kitchenFreedom')}
              </motion.p>

              {/* Body Text */}
              <motion.div
                className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed"
                custom={3}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={fadeInVariants}
              >
                <p>{t('kitchenEquipment')}</p>
                <p>{t('kitchenWelcome')}</p>
                <p>{t('kitchenUseCase')}</p>
              </motion.div>

              {/* Final Brand Statement */}
              <motion.div
                className="pt-8 border-t border-stone-200"
                custom={4}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={fadeInVariants}
              >
                <p className="text-2xl md:text-3xl font-light tracking-wide text-neutral-900 leading-snug">
                  {t('kitchenClosing')}
                </p>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
