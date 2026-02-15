import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import ReviewsSection from '@/components/sections/ReviewsSection';
import ExclusivitySection from '@/components/sections/ExclusivitySection';
import HeroSection from '@/components/sections/HeroSection';
import KitchenSection from '@/components/sections/KitchenSection';
import TerraceSection from '@/components/sections/TerraceSection';
import LocationSection from '@/components/sections/LocationSection';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen flex flex-col font-sans">
        {/* Header */}
        <Header />

        {/* Hero Section - Cinematic Crossfade */}
        <HeroSection />

        {/* Exclusivity Section */}
        <ExclusivitySection />

        {/* Kitchen Section - Sticky Image + Scrolling Text */}
        <KitchenSection />

        {/* Terrace Section - Asymmetric Grid + Parallax */}
        <TerraceSection />

        {/* Location Section - Map + Scrolling Text */}
        <LocationSection />

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