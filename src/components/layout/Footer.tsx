import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-playfair font-bold text-white mb-4">
              Anitya Cave House
            </h3>
            <p className="text-sm leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-amber-400 transition-colors">
                  {tNav('rooms')}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-400 transition-colors">
                  {tNav('gallery')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400 transition-colors">
                  {tNav('blog')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('contactInfo')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Ortahisar, Nevşehir, Türkiye</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+905363021102" className="hover:text-amber-400 transition-colors">
                  +90 536 302 11 02
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a
                  href="mailto:info@anityacavehouse.com"
                  className="hover:text-amber-400 transition-colors"
                >
                  info@anityacavehouse.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('followUs')}</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com/anityacavehouse"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/anityacavehouse"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-2 text-sm">{t('newsletter')}</h5>
              <p className="text-xs mb-3">{t('newsletterText')}</p>
              {/* Newsletter form will be added later */}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-stone-700" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>
            © {currentYear} Anitya Cave House. {t('rights')}
          </p>
          <p className="text-stone-500 mt-2 md:mt-0">
            Built with Next.js 15 & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
