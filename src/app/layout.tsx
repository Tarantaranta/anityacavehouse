import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { headers } from "next/headers";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { WebmasterTracking } from "@/components/analytics/WebmasterTracking";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Anitya Cave House",
    default: "Anitya Cave House – Ortahisar Kapadokya Bağımsız Suite Evler",
  },
  description:
    "Anitya Cave House, Kapadokya Ortahisar'da yer alan, ortak alanı olmayan bağımsız mağara ve taş suite evlerden oluşan küçük bir konaklama evidir.",
};

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get("x-next-intl-locale") ?? "tr";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-surface text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['LodgingBusiness', 'LocalBusiness'],
              '@id': 'https://anityacavehouse.com',
              name: 'Anitya Cave House',
              alternateName: 'Anitya洞穴之家',
              description: 'Independent cave and stone suite houses in Ortahisar, Cappadocia with private terraces and equipped kitchens.',
              url: 'https://anityacavehouse.com',
              telephone: '+905354946814',
              email: 'info@anityacavehouse.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Ortahisar Mahallesi',
                addressLocality: 'Ortahisar',
                addressRegion: 'Nevşehir',
                postalCode: '50650',
                addressCountry: 'TR',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 38.6392,
                longitude: 34.8596,
              },
              image: [
                'https://anityacavehouse.com/images/cappadocia-cave-house.avif',
                'https://anityacavehouse.com/images/anitya-cave-suite/hero.jpg',
              ],
              priceRange: '$$',
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '00:00',
                closes: '23:59',
              },
              sameAs: [
                'https://instagram.com/anityacavehouse',
                'https://facebook.com/anityacavehouse',
                'https://www.tripadvisor.com/Hotel_Review-g642050-d30600700-Reviews-Anitya_Cave_House-Ortahisar_Nevsehir_Province_Central_Anatolia.html',
              ],
              amenityFeature: [
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Private Terrace',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Full Kitchen',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Cave Architecture',
                  value: true,
                },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.86',
                reviewCount: '1046',
                bestRating: '5',
                worstRating: '1',
              },
            }),
          }}
        />
        {children}
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <WebmasterTracking />
        <Analytics />
      </body>
    </html>
  );
}
