import { Footer } from '@/components/layout/Footer';
import Header2026 from '@/components/layout/Header2026';
import HeroCinematic2026 from '@/components/sections/HeroCinematic2026';
import TrustBar from '@/components/sections/TrustBar';
import SignatureManifesto from '@/components/sections/SignatureManifesto';
import ManifestoBlock from '@/components/sections/ManifestoBlock';
import NotARoomSticky from '@/components/sections/NotARoomSticky';
import SuitesOverview from '@/components/sections/SuitesOverview';
import KitchenEditorialAdvanced from '@/components/sections/KitchenEditorialAdvanced';
import TerraceCinematicAdvanced from '@/components/sections/TerraceCinematicAdvanced';
import LocationMapSplit from '@/components/sections/LocationMapSplit';
import BreakfastFreedom from '@/components/sections/BreakfastFreedom';
import ReviewsMinimal from '@/components/sections/ReviewsMinimal';
import FinalCTA from '@/components/sections/FinalCTA';
import { SectionDivider } from '@/components/ui/SectionRhythm';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import PreloadImages from '@/components/ui/PreloadImages';
import { Metadata } from 'next';
import { StructuredData } from '@/components/seo';
import { generateHotelSchema, generateLocalBusinessSchema } from '@/lib/seo-utils';
import { Locale } from '@/lib/seo-config';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://anityacavehouse.com';

  const metadata = {
    tr: {
      title: 'Anitya Cave House – Ortahisar Kapadokya Bağımsız Mağara ve Taş Suite Evler',
      description: 'Kapadokya Ortahisar\'da bulunan Anitya Cave House, ortak alanı olmayan bağımsız mağara ve taş suite evlerden oluşur. Özel teras, donanımlı mutfak, mahremiyet odaklı tasarım.',
      keywords: 'kapadokya otelleri, mağara otelleri kapadokya, ortahisar konaklama, bağımsız suite, kapadokya mağara evi, butik otel kapadokya, kapadokya bağımsız oda',
    },
    en: {
      title: 'Anitya Cave House – Independent Cave & Stone Suites in Ortahisar, Cappadocia',
      description: 'Anitya Cave House in Ortahisar, Cappadocia features independent cave and stone suite houses with no shared common areas. Private terrace, equipped kitchen, privacy-focused design.',
      keywords: 'cappadocia hotels, cave hotels cappadocia, ortahisar accommodation, independent suite, cappadocia cave house, boutique hotel cappadocia, private cave house',
    },
    zh: {
      title: 'Anitya洞穴之家 – 卡帕多西亚奥塔希萨尔独立洞穴和石头套房',
      description: '位于卡帕多西亚奥塔希萨尔的Anitya洞穴之家，设有独立的洞穴和石头套房，没有共享公共区域。私人露台、设备齐全的厨房、注重隐私的设计。',
      keywords: '卡帕多西亚酒店, 洞穴酒店, 奥塔希萨尔住宿, 独立套房, 精品酒店, 卡帕多西亚洞穴房',
    },
  };

  const currentLocale = locale as 'tr' | 'en' | 'zh';
  const meta = metadata[currentLocale] || metadata.tr;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,

    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'tr': `${baseUrl}/tr`,
        'en': `${baseUrl}/en`,
        'zh': `${baseUrl}/zh`,
        'x-default': `${baseUrl}/en`,
      },
    },

    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}`,
      siteName: 'Anitya Cave House',
      images: [
        {
          url: `${baseUrl}/images/cappadocia-cave-house.avif`,
          width: 1200,
          height: 630,
          alt: locale === 'tr'
            ? 'Anitya Cave House - Kapadokya Mağara Evi'
            : locale === 'en'
            ? 'Anitya Cave House - Cappadocia Cave Hotel'
            : 'Anitya洞穴之家 - 卡帕多西亚洞穴酒店',
        },
      ],
      locale: locale,
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}/images/cappadocia-cave-house.avif`],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const l = locale as Locale;

  // Generate structured data schemas
  const hotelSchema = generateHotelSchema(l);
  const businessSchema = generateLocalBusinessSchema(l);

  // Preload critical above-the-fold images
  const criticalImages = [
    '/images/cappadocia-cave-house.avif', // Hero image
    '/images/cappadocia-cave-house-kitchen.avif', // Kitchen section
    '/images/cappadocia-ortahisar-castle.avif', // Terrace section
  ];

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col">
        <StructuredData data={[hotelSchema, businessSchema]} />
        <PreloadImages images={criticalImages} />
        <Header2026 />

        <main>
          <HeroCinematic2026 />
          <TrustBar />
          <SignatureManifesto />
          <SectionDivider />
          <ManifestoBlock />
          <SectionDivider />
          <NotARoomSticky />
          <SectionDivider />
          <SuitesOverview />
          <SectionDivider />
          <KitchenEditorialAdvanced />
          <SectionDivider />
          <TerraceCinematicAdvanced />
          <SectionDivider />
          <LocationMapSplit />
          <SectionDivider />
          <BreakfastFreedom />
          <SectionDivider />
          <ReviewsMinimal />
          <FinalCTA />
        </main>

        <Footer />

      </div>
    </SmoothScrollProvider>
  );
}
