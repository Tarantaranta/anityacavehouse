import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { headers } from "next/headers";
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

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-surface text-ink antialiased">{children}</body>
    </html>
  );
}
