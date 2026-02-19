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

          {/* Social & Badges */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('followUs')}</h4>
            <div className="flex flex-wrap gap-3">

              {/* Instagram */}
              <a href="https://instagram.com/anityacavehouse" target="_blank" rel="noopener noreferrer"
                 className="group relative" aria-label="Instagram">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-amber-400 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                  <Instagram className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-stone-800 border border-stone-700 text-stone-300 text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  Instagram
                </span>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com/anityacavehouse" target="_blank" rel="noopener noreferrer"
                 className="group relative" aria-label="Facebook">
                <div className="h-7 w-7 rounded-full bg-[#1877F2] flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                  <Facebook className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-stone-800 border border-stone-700 text-stone-300 text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  Facebook
                </span>
              </a>

              {/* TripAdvisor */}
              <a href="https://www.tripadvisor.com/Hotel_Review-g642050-d30600700-Reviews-Anitya_Cave_House-Ortahisar_Nevsehir_Province_Central_Anatolia.html"
                 target="_blank" rel="noopener noreferrer" className="group relative" aria-label="TripAdvisor">
                <TripAdvisorIcon className="h-7 w-7 transition-transform duration-200 group-hover:scale-110" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-stone-800 border border-stone-700 text-stone-300 text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  TripAdvisor
                </span>
              </a>

              {/* Airbnb Superhost */}
              <a href="https://www.airbnb.com/users/show/583936259" target="_blank" rel="noopener noreferrer"
                 className="group relative" aria-label="Airbnb Superhost">
                <div className="h-7 w-7 rounded-full overflow-hidden transition-transform duration-200 group-hover:scale-110">
                  <Image src="/images/Ekran Resmi 2026-02-19 01.01.16.png" alt="Airbnb" width={28} height={28} className="h-full w-full object-cover" />
                </div>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-stone-800 border border-stone-700 text-stone-300 text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  Airbnb · ★ {t('airbnbSuperhost')}
                </span>
              </a>

              {/* Yeşil Yıldız */}
              <div className="group relative cursor-default">
                <YesilYildizIcon className="h-7 w-7 transition-transform duration-200 group-hover:scale-110" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-stone-800 border border-stone-700 text-stone-300 text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  {t('sustainabilityTitle')}
                </span>
              </div>

              {/* T.C. Kültür ve Turizm Bakanlığı */}
              <div className="group relative cursor-default">
                <div className="h-7 w-7 rounded-full overflow-hidden bg-white transition-transform duration-200 group-hover:scale-110">
                  <Image src="/images/Ekran Resmi 2026-02-19 00.46.49.png" alt="T.C. Kültür ve Turizm Bakanlığı" width={28} height={28} className="h-full w-full object-cover" />
                </div>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-stone-800 border border-stone-700 text-stone-300 text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  {t('tourismTitle')}
                </span>
              </div>

            </div>
          </div>
        </div>

        <Separator className="my-8 bg-stone-700" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          {/* Designed by Qiboo Studio — footer sol */}
          <a
            href="https://qiboo.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
            aria-label="Qiboo Studio — Web Design & Development"
          >
            <span className="text-[10px] uppercase tracking-widest text-stone-600 group-hover:text-stone-400 transition-colors select-none">
              Designed by
            </span>
            <div className="w-[20px] h-[20px] rounded-md overflow-hidden bg-white flex-shrink-0 opacity-85 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
              <Image
                src="/images/qiboo-logo.png"
                alt="Qiboo Studio icon"
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[12px] font-semibold tracking-wide bg-gradient-to-r from-orange-400 via-red-500 to-rose-600 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:via-red-400 group-hover:to-rose-400 transition-all duration-300">
              Qiboo Studio
            </span>
          </a>

          <p className="text-stone-500">
            © {currentYear} Anitya Cave House. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
