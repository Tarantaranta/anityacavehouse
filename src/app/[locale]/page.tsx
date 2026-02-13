import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Editable } from '@/components/dev/VisualEditor';
import ReviewsSection from '@/components/sections/ReviewsSection';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen flex flex-col">
        <Header />

        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] w-full overflow-visible">
          {/* Background Image */}
          <Image
            src="/images/cappadocia-cave-house.avif"
            alt="Anitya Cave House - Independent Suite Homes in Cappadocia"
            fill
            priority
            quality={95}
            className="object-cover object-center"
            sizes="100vw"
          />


          {/* Content */}
          <div className="relative z-30 h-full flex items-center justify-center pt-20 pb-32">
            <div className="container mx-auto px-4">
              <div className="relative text-center max-w-3xl mx-auto">
                {/* Logo */}
                <Editable id="hero-logo" type="element">
                  <div className="flex justify-center -mb-2">
                    <div className="relative inline-block">
                      <Image
                        src="/images/logo.avif"
                        alt="Anıtya Cave House Logo"
                        width={1200}
                        height={912}
                        className="h-[30rem] md:h-[38rem] lg:h-[42rem] w-auto drop-shadow-2xl"
                        priority
                      />
                    </div>
                  </div>
                </Editable>

                {/* Hero Titles */}
                <Editable id="hero-h1" type="text" editableText>
                  <h1 className="text-2xl md:text-4xl font-playfair text-white mb-3 drop-shadow-xl leading-relaxed max-w-4xl mx-auto px-4 font-bold">
                    {t('hero.h1')}
                  </h1>
                </Editable>

                <Editable id="hero-h2" type="text" editableText>
                  <h2 className="text-xl md:text-3xl text-gold font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-lg mb-5">
                    {t('hero.h2')}
                  </h2>
                </Editable>

                {/* Hero Body */}
                <Editable id="hero-body" type="text" editableText>
                  <p className="text-base md:text-lg text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-md font-light mb-6 whitespace-pre-line">
                    {t('hero.body')}
                  </p>
                </Editable>

                {/* Trust Badges */}
                <Editable id="trust-badges" type="element">
                  <div className="flex flex-wrap justify-center gap-3 mb-6">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-amber-900 border-amber-200 backdrop-blur-sm shadow-lg hover:bg-white transition-all"
                    >
                      ⭐ {t('hero.trust.superhost')}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-amber-900 border-amber-200 backdrop-blur-sm shadow-lg hover:bg-white transition-all"
                    >
                      💬 {t('hero.trust.reviews')}
                    </Badge>
                  </div>
                </Editable>

                {/* CTA Buttons */}
                <Editable id="cta-buttons" type="container">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-gold hover:bg-gold/90 text-white text-lg px-10 py-7 shadow-2xl hover:scale-105 transition-all duration-300 font-semibold tracking-wide"
                    >
                      <Link href="/booking">{t('hero.cta.availability')}</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="text-lg px-10 py-7 border-2 border-white text-white hover:bg-white hover:text-amber-900 backdrop-blur-sm bg-white/10 shadow-xl hover:scale-105 transition-all duration-300 font-semibold tracking-wide"
                    >
                      <Link href="/rooms">{t('hero.cta.exploreSuites')}</Link>
                    </Button>
                  </div>
                </Editable>

                {/* Scroll Indicator */}
                <Editable id="scroll-indicator" type="element">
                  <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 rounded-full border-2 border-white/60 flex items-start justify-center p-2">
                      <div className="w-1.5 h-3 bg-white/80 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </Editable>
              </div>
            </div>
          </div>
        </section>

        {/* Identity Section - Not a Hotel */}
        <section className="py-20 md:py-28 bg-stone-50">
          <div className="container mx-auto px-4">
            <Editable id="identity-section" type="container">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-3xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
                  {t('identity.title')}
                </h2>
                <div className="prose prose-lg md:prose-xl mx-auto text-stone-700 leading-relaxed whitespace-pre-line">
                  {t('identity.text')}
                </div>
              </div>
            </Editable>
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
            <Editable id="balloon-section" type="container">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-6 drop-shadow-2xl">
                  {t('balloon.title')}
                </h2>
                <p className="text-lg md:text-xl text-white/95 leading-relaxed drop-shadow-xl whitespace-pre-line">
                  {t('balloon.text')}
                </p>
              </div>
            </Editable>
          </div>
        </section>

        {/* Terrace View Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <Editable id="terrace-section" type="container">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-3xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
                  {t('terrace.title')}
                </h2>
                <div className="prose prose-lg md:prose-xl mx-auto text-stone-700 leading-relaxed whitespace-pre-line">
                  {t('terrace.text')}
                </div>
              </div>
            </Editable>
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
            <Editable id="suite-experience-section" type="container">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-6 drop-shadow-2xl">
                  {t('suiteExperience.title')}
                </h2>
                <p className="text-lg md:text-xl text-white/95 leading-relaxed drop-shadow-xl whitespace-pre-line">
                  {t('suiteExperience.text')}
                </p>
              </div>
            </Editable>
          </div>
        </section>

        {/* Kitchen Section */}
        <section className="py-20 md:py-28 bg-stone-50">
          <div className="container mx-auto px-4">
            <Editable id="kitchen-section" type="container">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-3xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
                  {t('kitchen.title')}
                </h2>
                <div className="prose prose-lg md:prose-xl mx-auto text-stone-700 leading-relaxed whitespace-pre-line">
                  {t('kitchen.text')}
                </div>
              </div>
            </Editable>
          </div>
        </section>

        {/* Breakfast Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <Editable id="breakfast-section" type="container">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-3xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
                  {t('breakfast.title')}
                </h2>
                <div className="prose prose-lg md:prose-xl mx-auto text-stone-700 leading-relaxed whitespace-pre-line">
                  {t('breakfast.text')}
                </div>
              </div>
            </Editable>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 md:py-28 bg-stone-50">
          <div className="container mx-auto px-4">
            <Editable id="location-section" type="container">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-3xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
                  {t('location.title')}
                </h2>
                <div className="prose prose-lg md:prose-xl mx-auto text-stone-700 leading-relaxed whitespace-pre-line">
                  {t('location.text')}
                </div>
              </div>
            </Editable>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsSection />

        {/* Final CTA Section */}
        <section className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-20 md:py-28">
          <Editable id="final-cta-section" type="container">
            <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
              <h2 className="text-3xl md:text-5xl font-playfair font-bold">
                {t('finalCta.title')}
              </h2>
              <p className="text-lg md:text-xl text-amber-100 max-w-2xl mx-auto whitespace-pre-line">
                {t('finalCta.text')}
              </p>
              <Button asChild size="lg" variant="secondary" className="bg-white text-amber-900 hover:bg-amber-50 text-lg px-10 py-6">
                <Link href="/booking">{t('finalCta.cta')}</Link>
              </Button>
            </div>
          </Editable>
        </section>

        <Footer />
      </div>
  );
}
