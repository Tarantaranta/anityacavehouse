import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import {
  Montserrat,
  Playfair_Display,
  Cormorant_Garamond,
  Bodoni_Moda,
  Cinzel,
  Libre_Baskerville,
  Crimson_Text,
  Raleway,
  Poppins,
  Inter,
  Outfit
} from "next/font/google";
import "../globals.css";

export const metadata: Metadata = {
  title: 'Anıtya Cave House – Ortahisar Kapadokya Bağımsız Suite Evler',
  description: 'Anitya Cave House, Kapadokya Ortahisar\'da yer alan, ortak alanı olmayan bağımsız mağara ve taş suite evlerden oluşan küçük bir konaklama evidir. Özel teras, donanımlı mutfak ve mahremiyet odaklı tasarım.',
};

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Luxury Serif Fonts
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Modern Sans Fonts
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Parisienne&family=Great+Vibes&family=Allura&family=Satisfy&family=Alex+Brush&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300&family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100&family=Quicksand:wght@300;400;500;600;700&family=Abril+Fatface&family=Yeseva+One&family=Cardo:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`
          ${montserrat.variable}
          ${playfair.variable}
          ${cormorant.variable}
          ${bodoni.variable}
          ${cinzel.variable}
          ${libreBaskerville.variable}
          ${crimsonText.variable}
          ${raleway.variable}
          ${poppins.variable}
          ${inter.variable}
          ${outfit.variable}
          font-sans antialiased
        `}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
