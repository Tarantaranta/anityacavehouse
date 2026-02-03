import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function HomePage() {
  const t = useTranslations('home');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100">
      {/* Temporary Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-playfair font-bold text-amber-900">
              Anıtya Cave House
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="hover:text-amber-700">{tNav('home')}</Link>
              <Link href="/rooms" className="hover:text-amber-700">{tNav('rooms')}</Link>
              <Link href="/gallery" className="hover:text-amber-700">{tNav('gallery')}</Link>
              <Link href="/blog" className="hover:text-amber-700">{tNav('blog')}</Link>
              <Link href="/contact" className="hover:text-amber-700">{tNav('contact')}</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-amber-900 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-stone-600">
            {t('hero.subtitle')}
          </p>
          <div className="pt-4">
            <Link
              href="/booking"
              className="inline-block bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-800 transition-colors"
            >
              {t('hero.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-playfair font-bold text-center text-amber-900 mb-12">
          {t('features.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {['authentic', 'location', 'superhost', 'luxury'].map((feature) => (
            <div key={feature} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-amber-900 mb-3">
                {t(`features.${feature}.title`)}
              </h3>
              <p className="text-stone-600">
                {t(`features.${feature}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-900 text-white py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl font-playfair font-bold">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-amber-100">
            {t('cta.subtitle')}
          </p>
          <Link
            href="/booking"
            className="inline-block bg-white text-amber-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-50 transition-colors"
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>

      {/* Temporary Footer */}
      <footer className="bg-stone-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-stone-300">
            © 2026 Anıtya Cave House. {tCommon('welcome')}
          </p>
        </div>
      </footer>
    </div>
  );
}
