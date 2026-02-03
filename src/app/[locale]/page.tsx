import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-amber-100 text-amber-900 border-amber-200">
              ⭐ Airbnb Superhost
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-amber-900 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" className="bg-amber-700 hover:bg-amber-800 text-lg px-8 py-6">
                <Link href="/booking">{t('hero.cta')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-amber-700 text-amber-900 hover:bg-amber-50">
                <Link href="/rooms">Odalarımızı Görüntüle</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-amber-900 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Kapadokya'nın eşsiz atmosferinde, modern konforu tarihi dokuyla birleştiriyoruz
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['authentic', 'location', 'superhost', 'luxury'].map((feature) => (
            <Card key={feature} className="border-amber-100 hover:border-amber-300 transition-all hover:shadow-xl group">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">
                  {feature === 'authentic' && '🏛️'}
                  {feature === 'location' && '📍'}
                  {feature === 'superhost' && '⭐'}
                  {feature === 'luxury' && '✨'}
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-3 group-hover:text-amber-700 transition-colors">
                  {t(`features.${feature}.title`)}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {t(`features.${feature}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold">
            {t('cta.title')}
          </h2>
          <p className="text-lg md:text-xl text-amber-100 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-amber-900 hover:bg-amber-50 text-lg px-10 py-6">
            <Link href="/booking">{t('cta.button')}</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
