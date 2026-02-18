'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden z-50">
      {/* Static Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cappadocia-cave-house.avif"
          alt="Anitya Cave House - Independent Suite Homes in Cappadocia"
          fill
          priority
          quality={95}
          className="object-cover object-center brightness-75 contrast-110"
          sizes="100vw"
        />

        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-30 h-full flex flex-col justify-between pt-16 md:pt-24 lg:pt-32 pb-12 px-4 container mx-auto">

        {/* Top: Slogan */}
        <motion.div
          className="text-center space-y-2 mt-4 md:mt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-white font-playfair uppercase tracking-[0.2em] text-sm md:text-lg lg:text-xl drop-shadow-md font-medium leading-relaxed opacity-90">
            {t('hero.h1')}
            <span className="hidden md:inline">. </span>
            <span className="block md:inline mt-1 md:mt-0">{t('hero.h2')}</span>
          </h1>
        </motion.div>

        {/* Middle: Logo */}
        <motion.div
          className="flex items-center justify-center -mb-24"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative w-[560px] md:w-[800px] lg:w-[1000px] aspect-video">
            <Image
              src="/images/logo.avif"
              alt="Anitya Cave House Logo"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>

        {/* Bottom: Script Text, Badges and Buttons */}
        <motion.div
          className="flex flex-col items-center justify-end text-center space-y-2 mb-8 -mt-24 relative z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {/* Script/Italic Subtitle */}
          <div className="text-[#D4AF37] font-serif italic text-xl md:text-3xl lg:text-4xl leading-relaxed drop-shadow-lg max-w-4xl mx-auto px-4">
            <p>{t('hero.body1')}</p>
            <p>{t('hero.body2')}</p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-6 relative z-50">
            <Link href="#reviews">
              <motion.div
                className="px-8 py-4 rounded-2xl bg-white/20 backdrop-blur-sm text-white cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">⭐</span>
                  <span className="text-lg md:text-xl font-semibold tracking-wide drop-shadow-lg">{t('hero.trust.superhost')}</span>
                </div>
              </motion.div>
            </Link>
            <Link href="#reviews">
              <motion.div
                className="px-8 py-4 rounded-2xl bg-white/20 backdrop-blur-sm text-white cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">💬</span>
                  <span className="text-lg md:text-xl font-semibold tracking-wide drop-shadow-lg">{t('hero.trust.reviews')}</span>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-6 mt-8 relative z-50">
            <Button
              asChild
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#B5952F] text-white text-base md:text-lg px-8 py-6 rounded-full shadow-xl hover:scale-105 transition-all duration-300 font-semibold tracking-wide border-none"
            >
              <Link href="/booking">{t('hero.cta.availability')}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white/80 bg-transparent hover:bg-white/10 text-white text-base md:text-lg px-8 py-6 rounded-full backdrop-blur-sm shadow-lg hover:scale-105 transition-all duration-300 font-semibold tracking-wide"
            >
              <Link href="/rooms">{t('hero.cta.exploreSuites')}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
