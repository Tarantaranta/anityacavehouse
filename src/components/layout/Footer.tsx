import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

/**
 * TripAdvisor owl icon — iki büyük yuvarlak göz (binoküler baykuş),
 * TripAdvisor marka rengi #34E0A1 arka plan, gerçek logo stili.
 */
const TripAdvisorIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Yeşil arka plan */}
    <circle cx="50" cy="50" r="49" fill="#34E0A1" />
    {/* Sol kulak tüyü */}
    <polygon points="24,46 33,26 43,43" fill="#00b890" />
    {/* Sağ kulak tüyü */}
    <polygon points="76,46 67,26 57,43" fill="#00b890" />
    {/* Sol göz — dış beyaz */}
    <circle cx="34" cy="57" r="21" fill="white" />
    {/* Sağ göz — dış beyaz */}
    <circle cx="66" cy="57" r="21" fill="white" />
    {/* Sol göz — koyu iris */}
    <circle cx="34" cy="57" r="12" fill="#1d3c45" />
    {/* Sağ göz — koyu iris */}
    <circle cx="66" cy="57" r="12" fill="#1d3c45" />
    {/* Sol göz parlaması */}
    <circle cx="40" cy="51" r="5" fill="white" />
    {/* Sağ göz parlaması */}
    <circle cx="72" cy="51" r="5" fill="white" />
    {/* Gaga */}
    <polygon points="43,75 50,83 57,75" fill="#e8830a" />
  </svg>
);

/**
 * Yeşil Yıldız rozeti — T.C. Çevre, Şehircilik ve İklim Değişikliği
 * Bakanlığı'nın sürdürülebilirlik sertifikası.
 * Beyaz arka plan, yeşil 5 köşeli yıldız içinde yaprak motifi.
 */
const YesilYildizIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Beyaz çember arka plan, yeşil kenarlık */}
    <circle cx="50" cy="50" r="49" fill="#f7faf5" />
    <circle cx="50" cy="50" r="49" fill="none" stroke="#2a7a2a" strokeWidth="3" />
    {/* 5 köşeli yıldız — köşeler: dış r=40, iç r=17 */}
    <polygon
      points="50,10 60.6,37.5 90.5,37.5 67.6,55.5 76.2,83 50,65 23.8,83 32.4,55.5 9.5,37.5 39.4,37.5"
      fill="#2a7a2a"
    />
    {/* Yıldız içinde yaprak */}
    <path
      d="M50 26 C44 34 41 42 41 50 C41 56 44 60 50 57 C56 60 59 56 59 50 C59 42 56 34 50 26 Z"
      fill="white"
    />
    {/* Yaprak damarı */}
    <line x1="50" y1="26" x2="50" y2="60" stroke="#2a7a2a" strokeWidth="1.8" />
    <line x1="50" y1="38" x2="44" y2="44" stroke="#2a7a2a" strokeWidth="1.2" />
    <line x1="50" y1="38" x2="56" y2="44" stroke="#2a7a2a" strokeWidth="1.2" />
    <line x1="50" y1="48" x2="44" y2="53" stroke="#2a7a2a" strokeWidth="1.2" />
    <line x1="50" y1="48" x2="56" y2="53" stroke="#2a7a2a" strokeWidth="1.2" />
  </svg>
);



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
                <span>Ortahisar, ÜRGÜP, Nevşehir, Türkiye</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+905354946814" className="hover:text-amber-400 transition-colors">
                  +90 535 494 68 14
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
                aria-label="Instagram"
                className="hover:text-amber-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/anityacavehouse"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-amber-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.tripadvisor.com/Hotel_Review-g642050-d30600700-Reviews-Anitya_Cave_House-Ortahisar_Nevsehir_Province_Central_Anatolia.html"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TripAdvisor"
                className="hover:opacity-80 transition-opacity"
              >
                <TripAdvisorIcon className="h-5 w-5" />
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

        {/* Certifications & Badges */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-stone-500 text-center mb-6">
            {t('certifications')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">

            {/* TripAdvisor */}
            <a
              href="https://www.tripadvisor.com/Hotel_Review-g642050-d30600700-Reviews-Anitya_Cave_House-Ortahisar_Nevsehir_Province_Central_Anatolia.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
              aria-label="TripAdvisor"
            >
              <TripAdvisorIcon className="h-12 w-12 flex-shrink-0" />
              <div>
                <p className="text-[11px] text-stone-500 leading-tight">Reviews on</p>
                <p className="text-sm font-semibold text-white group-hover:text-[#34E0A1] transition-colors leading-tight">
                  TripAdvisor
                </p>
              </div>
            </a>

            <span className="text-stone-700 text-2xl hidden md:block select-none">|</span>

            {/* Instagram */}
            <a
              href="https://instagram.com/anityacavehouse"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
              aria-label="Instagram"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-amber-400 flex items-center justify-center flex-shrink-0">
                <Instagram className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-[11px] text-stone-500 leading-tight">Follow us on</p>
                <p className="text-sm font-semibold text-white group-hover:text-pink-400 transition-colors leading-tight">
                  Instagram
                </p>
              </div>
            </a>

            <span className="text-stone-700 text-2xl hidden md:block select-none">|</span>

            {/* T.C. Çevre ve Şehircilik Bakanlığı – Sürdürülebilirlik */}
            <div className="flex items-center gap-3">
              <YesilYildizIcon className="h-12 w-12 flex-shrink-0" />
              <div>
                <p className="text-[11px] text-stone-500 leading-tight">{t('sustainabilityBy')}</p>
                <p className="text-sm font-semibold text-white leading-tight">
                  {t('sustainabilityTitle')}
                </p>
              </div>
            </div>

            <span className="text-stone-700 text-2xl hidden md:block select-none">|</span>

            {/* T.C. Kültür ve Turizm Bakanlığı */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 bg-white">
                <Image
                  src="/images/Ekran Resmi 2026-02-19 00.46.49.png"
                  alt="T.C. Kültür ve Turizm Bakanlığı"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[11px] text-stone-500 leading-tight">{t('tourismBy')}</p>
                <p className="text-sm font-semibold text-white leading-tight">
                  {t('tourismTitle')}
                </p>
                <p className="text-[11px] text-amber-500 leading-tight mt-0.5">
                  {t('tourismSince')}
                </p>
              </div>
            </div>

            <span className="text-stone-700 text-2xl hidden md:block select-none">|</span>

            {/* Airbnb Superhost */}
            <a
              href="https://www.airbnb.com/users/show/583936259"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
              aria-label="Airbnb Superhost"
            >
              <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/Ekran Resmi 2026-02-19 01.01.16.png"
                  alt="Airbnb"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[11px] text-stone-500 leading-tight">{t('airbnbBookOn')}</p>
                <p className="text-sm font-semibold text-white group-hover:text-[#FF5A5F] transition-colors leading-tight">
                  Airbnb
                </p>
                <p className="text-[11px] text-amber-400 font-semibold leading-tight mt-0.5">
                  ★ {t('airbnbSuperhost')}
                </p>
              </div>
            </a>

          </div>
        </div>

        <Separator className="mb-8 bg-stone-700" />

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
