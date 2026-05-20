import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo-utils';
import { Locale, siteConfig } from '@/lib/seo-config';
import { StructuredData } from '@/components/seo';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;

  const titles = {
    tr: 'Kapadokya Aktiviteleri ve Turlar – En İyi Fiyatlar | Anitya',
    en: 'Cappadocia Activities & Tours – Best Prices | Anitya',
    zh: '卡帕多西亚活动和旅游 – 最优惠价格 | Anitya',
  };

  const descriptions = {
    tr: '12+ yıldır Kapadokya\'nın en güvenilir aktivite ve tur rezervasyonları. Balon turu, özel turlar, vadilerde yürüyüş. Airbnb Superhost güvencesiyle 1000+ misafir deneyimi.',
    en: '12+ years of Cappadocia\'s most trusted activity and tour bookings. Balloon tours, private tours, valley hikes. Airbnb Superhost guarantee with 1000+ guest experiences.',
    zh: '12年以上卡帕多西亚最值得信赖的活动和旅游预订。热气球之旅、私人旅游、山谷徒步。Airbnb超赞房东保证，拥有1000+客人体验。',
  };

  const keywords = {
    tr: [
      'kapadokya balon turu',
      'kapadokya balon fiyatları',
      'kapadokya özel tur',
      'kapadokya aktiviteleri',
      'kapadokya turları',
      'kapadokya gezi programı',
      'ortahisar turlar',
      'kapadokya yeşil tur',
      'kapadokya kırmızı tur',
      'kapadokya atv turu',
      'kapadokya at turu',
      'kapadokya vadileri',
      'kapadokya gezilecek yerler',
      'kapado kya tur rehberi',
    ],
    en: [
      'cappadocia balloon tour',
      'cappadocia balloon prices',
      'cappadocia private tour',
      'cappadocia activities',
      'cappadocia tours',
      'cappadocia itinerary',
      'ortahisar tours',
      'cappadocia green tour',
      'cappadocia red tour',
      'cappadocia atv tour',
      'cappadocia horse riding',
      'cappadocia valleys',
      'things to do cappadocia',
      'cappadocia tour guide',
    ],
    zh: [
      '卡帕多西亚热气球之旅',
      '卡帕多西亚热气球价格',
      '卡帕多西亚私人旅游',
      '卡帕多西亚活动',
      '卡帕多西亚旅游',
      '卡帕多西亚行程',
      '奥塔希萨尔旅游',
      '卡帕多西亚绿线',
      '卡帕多西亚红线',
      '卡帕多西亚ATV',
      '卡帕多西亚骑马',
      '卡帕多西亚山谷',
      '卡帕多西亚景点',
    ],
  };

  return generatePageMetadata({
    title: titles[l],
    description: descriptions[l],
    keywords: keywords[l],
    path: '/activities',
    locale: l,
    images: [{
      url: `${siteConfig.baseUrl}/images/cappadocia-balloon-terrace.avif`,
      width: 1200,
      height: 630,
      alt: locale === 'tr'
        ? 'Kapadokya Balon Turu - Anitya'
        : locale === 'en'
        ? 'Cappadocia Balloon Tour - Anitya'
        : '卡帕多西亚热气球之旅 - Anitya',
    }],
  });
}

export default async function ActivitiesLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // TourOperator Schema
  const tourOperatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristInformationCenter',
    '@id': `${siteConfig.baseUrl}/#activities`,
    name: 'Anitya Cave House - Cappadocia Activities',
    description: locale === 'tr'
      ? '12+ yıldır Kapadokya aktivite ve tur rezervasyonları'
      : locale === 'en'
      ? '12+ years of Cappadocia activity and tour bookings'
      : '12年以上卡帕多西亚活动和旅游预订',
    url: `${siteConfig.baseUrl}/${locale}/activities`,
    telephone: siteConfig.business.telephone,
    email: siteConfig.business.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.business.address.addressLocality,
      addressRegion: siteConfig.business.address.addressRegion,
      addressCountry: siteConfig.business.address.addressCountry,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.business.aggregateRating.ratingValue,
      reviewCount: siteConfig.business.aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    priceRange: '€€',
  };

  // Service offerings
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Tour Operator',
    provider: {
      '@type': 'Organization',
      name: 'Anitya Cave House',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: siteConfig.business.aggregateRating.ratingValue,
        reviewCount: siteConfig.business.aggregateRating.reviewCount,
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Cappadocia',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cappadocia Activities',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: locale === 'tr' ? 'Balon Turu' : locale === 'en' ? 'Balloon Tour' : '热气球之旅',
            description: locale === 'tr'
              ? 'Kapadokya sıcak hava balonu turu'
              : locale === 'en'
              ? 'Cappadocia hot air balloon tour'
              : '卡帕多西亚热气球之旅',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: locale === 'tr' ? 'Özel Turlar' : locale === 'en' ? 'Private Tours' : '私人旅游',
          },
        },
      ],
    },
  };

  return (
    <>
      <StructuredData data={[tourOperatorSchema, serviceSchema]} />
      {children}
    </>
  );
}
