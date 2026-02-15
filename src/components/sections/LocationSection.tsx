'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

export default function LocationSection() {
  const t = useTranslations('home.exclusivity');
  const locale = useLocale();
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true, amount: 0.3 });

  // Map image based on locale
  const mapImage = locale === 'tr'
    ? '/images/cappadocia-map-turkish.avif'
    : locale === 'zh'
    ? '/images/cappadocia-map-chinese.avif'
    : '/images/cappadocia-map-english.avif';

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

            {/* Left: Sticky Map Image */}
            <div className="relative lg:sticky lg:top-24 lg:self-start h-fit">
              <motion.div
                className="relative w-full aspect-[4/3] group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={mapImage}
                  alt="Cappadocia Ortahisar location map"
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>

            {/* Right: Scrolling Text Content */}
            <div ref={textRef} className="space-y-8">

              {/* Title */}
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-stone-900 leading-relaxed"
                custom={0}
                initial="hidden"
                animate={isTextInView ? 'visible' : 'hidden'}
                variants={fadeInVariants}
              >
                {t('locationTitle')}
              </motion.h2>

              {/* Intro */}
              <motion.div
                className="space-y-5"
                custom={1}
                initial="hidden"
                animate={isTextInView ? 'visible' : 'hidden'}
                variants={fadeInVariants}
              >
                <h3 className="text-2xl md:text-3xl font-light tracking-wide text-neutral-900">
                  {t('locationSubtitle')}
                </h3>
                <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
                  {t('locationIntro')}
                </p>
              </motion.div>

              {/* Locations List */}
              <motion.div
                className="space-y-8 pt-4"
                custom={2}
                initial="hidden"
                animate={isTextInView ? 'visible' : 'hidden'}
                variants={fadeInVariants}
              >
                <div className="space-y-3 border-l-2 border-stone-300 pl-6">
                  <h4 className="text-xl md:text-2xl font-light tracking-wide text-neutral-900">
                    {t('locations.ortahisar.name')}
                  </h4>
                  <p className="text-sm md:text-base text-stone-600 font-medium">
                    {t('locations.ortahisar.distance')}
                  </p>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {t('locations.ortahisar.description')}
                  </p>
                </div>

                <div className="space-y-3 border-l-2 border-stone-300 pl-6">
                  <h4 className="text-xl md:text-2xl font-light tracking-wide text-neutral-900">
                    {t('locations.goreme.name')}
                  </h4>
                  <p className="text-sm md:text-base text-stone-600 font-medium">
                    {t('locations.goreme.distance')}
                  </p>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {t('locations.goreme.description')}
                  </p>
                </div>

                <div className="space-y-3 border-l-2 border-stone-300 pl-6">
                  <h4 className="text-xl md:text-2xl font-light tracking-wide text-neutral-900">
                    {t('locations.redValley.name')}
                  </h4>
                  <p className="text-sm md:text-base text-stone-600 font-medium">
                    {t('locations.redValley.distance')}
                  </p>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {t('locations.redValley.description')}
                  </p>
                </div>

                <div className="space-y-3 border-l-2 border-stone-300 pl-6">
                  <h4 className="text-xl md:text-2xl font-light tracking-wide text-neutral-900">
                    {t('locations.threeBeauties.name')}
                  </h4>
                  <p className="text-sm md:text-base text-stone-600 font-medium">
                    {t('locations.threeBeauties.distance')}
                  </p>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {t('locations.threeBeauties.description')}
                  </p>
                </div>

                <div className="space-y-3 border-l-2 border-stone-300 pl-6">
                  <h4 className="text-xl md:text-2xl font-light tracking-wide text-neutral-900">
                    {t('locations.pancarlik.name')}
                  </h4>
                  <p className="text-sm md:text-base text-stone-600 font-medium">
                    {t('locations.pancarlik.distance')}
                  </p>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {t('locations.pancarlik.description')}
                  </p>
                </div>
              </motion.div>

              {/* Closing Statement */}
              <motion.div
                className="pt-8 border-t border-stone-200"
                custom={3}
                initial="hidden"
                animate={isTextInView ? 'visible' : 'hidden'}
                variants={fadeInVariants}
              >
                <p className="text-2xl md:text-3xl font-light tracking-wide text-neutral-900 leading-snug">
                  {t('locationClosing')}
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
