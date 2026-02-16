import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import {
  Inter,
  Cormorant_Garamond,
} from "next/font/google";
import ScrollProgress from '@/components/ui/ScrollProgress';
import "../globals.css";

export const metadata: Metadata = {
  title: 'Anıtya Cave House – Ortahisar Kapadokya Bağımsız Suite Evler',
  description: 'Anitya Cave House, Kapadokya Ortahisar\'da yer alan, ortak alanı olmayan bağımsız mağara ve taş suite evlerden oluşan küçük bir konaklama evidir. Özel teras, donanımlı mutfak ve mahremiyet odaklı tasarım.',
};

// 2026 Design System Fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

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

  // Ensure that the incoming locale is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-surface text-ink antialiased">
        <ScrollProgress />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
