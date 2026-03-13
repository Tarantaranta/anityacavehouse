import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ChatBot from '@/components/chat/ChatBot';
import ImageProtectionProvider from '@/components/providers/ImageProtectionProvider';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://anityacavehouse.com';

  const metadata = {
    tr: {
      title: 'Anitya Cave House – Ortahisar Kapadokya Bağımsız Mağara ve Taş Suite Evler',
      description: 'Kapadokya Ortahisar\'da yer alan, ortak alanı olmayan bağımsız mağara ve taş suite evlerden oluşan küçük bir konaklama evidir. Özel teras, donanımlı mutfak ve mahremiyet odaklı tasarım.',
    },
    en: {
      title: 'Anitya Cave House – Independent Cave & Stone Suite Houses in Ortahisar, Cappadocia',
      description: 'A boutique accommodation in Ortahisar, Cappadocia, featuring independent cave and stone suite houses with no shared common areas. Private terrace, equipped kitchen, privacy-focused design.',
    },
    zh: {
      title: 'Anitya洞穴之家 – 卡帕多西亚奥塔希萨尔独立洞穴和石头套房',
      description: '位于卡帕多西亚奥塔希萨尔的精品住宿，设有独立的洞穴和石头套房，没有共享公共区域。私人露台、设备齐全的厨房、注重隐私的设计。',
    },
  };

  const currentLocale = locale as 'tr' | 'en' | 'zh';
  const meta = metadata[currentLocale] || metadata.tr;

  return {
    title: {
      template: '%s | Anitya Cave House',
      default: meta.title,
    },
    description: meta.description,

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
      locale: locale,
      alternateLocale: locale === 'tr' ? ['en', 'zh'] : locale === 'en' ? ['tr', 'zh'] : ['tr', 'en'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ImageProtectionProvider>
        <ScrollProgress />
        {children}
        <ChatBot />
      </ImageProtectionProvider>
    </NextIntlClientProvider>
  );
}
