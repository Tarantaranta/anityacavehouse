import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ChatBot from '@/components/chat/ChatBot';

export const metadata: Metadata = {
  title: 'Anitya Cave House – Ortahisar Kapadokya Bağımsız Suite Evler',
  description: 'Anitya Cave House, Kapadokya Ortahisar\'da yer alan, ortak alanı olmayan bağımsız mağara ve taş suite evlerden oluşan küçük bir konaklama evidir. Özel teras, donanımlı mutfak ve mahremiyet odaklı tasarım.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
      <ScrollProgress />
      {children}
      <ChatBot />
    </NextIntlClientProvider>
  );
}
