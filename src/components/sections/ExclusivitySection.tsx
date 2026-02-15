'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Link } from '@/i18n/routing';

export default function ExclusivitySection() {
  const t = useTranslations('home.exclusivity');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
    <section
      className="relative py-24 md:py-32 z-10"
      style={{ backgroundColor: '#D4C4A8' }}
    >
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
                    src="/images/cave-house.avif?v=2"
                    alt="Cave house detail in Cappadocia"
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
                    src="/images/cave-house-cappadocia.avif?v=2"
                    alt="Anitya Cave House independent suite homes"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>

              </div>
            </div>

            {/* Right: Text Content */}
            <div ref={ref} className="space-y-12">

            {/* Heading */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-stone-900 leading-relaxed"
              custom={0}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInVariants}
            >
              {t('heading')}
            </motion.h2>

            {/* Description Paragraph */}
            <motion.p
              className="text-lg md:text-xl text-neutral-700 leading-relaxed max-w-3xl"
              custom={1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInVariants}
            >
              {t('description')}
            </motion.p>

            {/* Two Column Layout */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 pt-4"
              custom={2}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInVariants}
            >

              {/* Left Column - Suite Types */}
              <div className="space-y-3">
                <h3 className="text-sm uppercase tracking-widest text-stone-500 font-medium mb-6">
                  {t('suiteTypesTitle')}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-neutral-700">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0"></span>
                    <Link href="/rooms/anitya-cave-suite" className="text-base md:text-lg hover:text-amber-900 transition-colors underline">
                      {t('suiteTypes.anitya')}
                    </Link>
                  </li>
                  <li className="flex items-start gap-3 text-neutral-700">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0"></span>
                    <Link href="/rooms/sirahane-cave-suite" className="text-base md:text-lg hover:text-amber-900 transition-colors underline">
                      {t('suiteTypes.sirahane')}
                    </Link>
                  </li>
                  <li className="flex items-start gap-3 text-neutral-700">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0"></span>
                    <Link href="/rooms/dublex-stone-suite" className="text-base md:text-lg hover:text-amber-900 transition-colors underline">
                      {t('suiteTypes.duplex')}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Right Column - Features */}
              <div className="space-y-3">
                <h3 className="text-sm uppercase tracking-widest text-stone-500 font-medium mb-6">
                  {t('featuresTitle')}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-neutral-700">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0"></span>
                    <span className="text-base md:text-lg">{t('features.entrance')}</span>
                  </li>
                  <li className="flex items-start gap-3 text-neutral-700">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0"></span>
                    <span className="text-base md:text-lg">{t('features.terrace')}</span>
                  </li>
                  <li className="flex items-start gap-3 text-neutral-700">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0"></span>
                    <span className="text-base md:text-lg">{t('features.kitchen')}</span>
                  </li>
                  <li className="flex items-start gap-3 text-neutral-700">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0"></span>
                    <span className="text-base md:text-lg">{t('features.living')}</span>
                  </li>
                </ul>
              </div>

            </motion.div>

            {/* Closing Statement */}
            <motion.div
              className="pt-8 border-t border-stone-200"
              custom={3}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInVariants}
            >
              <p className="text-lg md:text-xl text-neutral-800 italic font-light leading-relaxed">
                {t('closing')}
              </p>
            </motion.div>

            </div>
            {/* End Right: Text Content */}

          </div>
          {/* End Desktop: 2-column layout */}

        </div>
      </div>
    </section>
  );
}
