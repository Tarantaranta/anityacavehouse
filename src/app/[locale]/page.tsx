import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ReviewsSection from '@/components/sections/ReviewsSection';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen flex flex-col font-sans">
        {/* Header - Absolute olarak konumlandırılmalı ki Hero'nun üstüne binsin */}
        <Header />

        {/* Hero Section */}
        <section className="relative h-screen min-h-[700px] w-full overflow-visible z-50">
          {/* Background Image */}
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
          </div>

          {/* Content Container */}
          <div className="relative z-30 h-full flex flex-col justify-between pt-16 md:pt-24 lg:pt-32 pb-12 px-4 container mx-auto">
            
            {/* 1. ÜST BÖLÜM: Slogan */}
            <div className="text-center space-y-2 mt-4 md:mt-8">
                <h1 className="text-white font-playfair uppercase tracking-[0.2em] text-sm md:text-lg lg:text-xl drop-shadow-md font-medium leading-relaxed opacity-90">
                  {t('hero.h1')}
                  <span className="hidden md:inline">. </span> 
                  <span className="block md:inline mt-1 md:mt-0">{t('hero.h2')}</span>
                </h1>
            </div>

            {/* 2. ORTA BÖLÜM: Logo */}
            <div className="flex items-center justify-center -mb-24">
                <div className="relative w-[560px] md:w-[800px] lg:w-[1000px] aspect-video animate-in fade-in duration-1000 zoom-in-95">
                  <Image
                    src="/images/logo.avif"
                    alt="Anıtya Cave House Logo"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
            </div>

            {/* 3. ALT BÖLÜM: Script Yazı, Badge'ler ve Butonlar */}
            <div className="flex flex-col items-center justify-end text-center space-y-2 mb-8 -mt-24 relative z-50">

                {/* Script / Italic Alt Başlık */}
                <div className="text-[#D4AF37] font-serif italic text-xl md:text-3xl lg:text-4xl leading-relaxed drop-shadow-lg max-w-4xl mx-auto px-4">
                  <p>{t('hero.body1')}</p>
                  <p>{t('hero.body2')}</p>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-6 pt-6 relative z-50">
                  <div className="bg-[#D4AF37] text-white px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">⭐</span>
                      <span className="text-lg md:text-xl font-semibold tracking-wide">{t('hero.trust.superhost')}</span>
                    </div>
                  </div>
                  <div className="bg-[#D4AF37] text-white px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">💬</span>
                      <span className="text-lg md:text-xl font-semibold tracking-wide">{t('hero.trust.reviews')}</span>
                    </div>
                  </div>
                </div>

                {/* Butonlar */}
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
            </div>
          </div>
        </section>

        {/* Identity Section */}
        <section className="py-20 md:py-28 bg-stone-50 relative z-0">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-amber-900 mb-6">
                {t('identity.title')}
              </h2>
              <div className="prose prose-xl md:prose-2xl mx-auto text-stone-700 leading-relaxed whitespace-pre-line">
                {t('identity.text')}
              </div>
            </div>
          </div>
        </section>

        {/* Balloon Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/cave-house-cappadocia.avif"
              alt="Hot air balloons view from terrace"
              fill
              className="object-cover object-center"
              sizes="100vw"
              quality={95}
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 drop-shadow-2xl">
                {t('balloon.title')}
              </h2>
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed drop-shadow-xl whitespace-pre-line">
                {t('balloon.text')}
              </p>
            </div>
          </div>
        </section>

        {/* Terrace View Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-amber-900 mb-6">
                {t('terrace.title')}
              </h2>
              <div className="prose prose-xl md:prose-2xl mx-auto text-stone-700 leading-relaxed whitespace-pre-line">
                {t('terrace.text')}
              </div>
            </div>
          </div>
        </section>

        {/* Suite Experience Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/cave-house.avif"
              alt="Independent suite home experience"
              fill
              className="object-cover object-center"
              sizes="100vw"
              quality={95}
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 drop-shadow-2xl">
                {t('suiteExperience.title')}
              </h2>
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed drop-shadow-xl whitespace-pre-line">
                {t('suiteExperience.text')}
              </p>
            </div>
          </div>
        </section>

        {/* Kitchen Section */}
        <section className="py-20 md:py-28 bg-stone-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-amber-900 mb-6">
                {t('kitchen.title')}
              </h2>
              <div className="prose prose-xl md:prose-2xl mx-auto text-stone-700 leading-relaxed whitespace-pre-line">
                {t('kitchen.text')}
              </div>
            </div>
          </div>
        </section>

        {/* Breakfast Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-amber-900 mb-6">
                {t('breakfast.title')}
              </h2>
              <div className="prose prose-xl md:prose-2xl mx-auto text-stone-700 leading-relaxed whitespace-pre-line">
                {t('breakfast.text')}
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 md:py-28 bg-stone-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-amber-900 mb-6">
                {t('location.title')}
              </h2>
              <div className="prose prose-xl md:prose-2xl mx-auto text-stone-700 leading-relaxed whitespace-pre-line">
                {t('location.text')}
              </div>
            </div>
          </div>
        </section>

        <ReviewsSection />

        {/* Final CTA Section */}
        <section className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-20 md:py-28">
          <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold">
              {t('finalCta.title')}
            </h2>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto whitespace-pre-line">
              {t('finalCta.text')}
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-amber-900 hover:bg-amber-50 text-lg px-10 py-6">
              <Link href="/booking">{t('finalCta.cta')}</Link>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
  );
}