import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | Anıtya Cave House",
    default: "Anıtya Cave House - Kapadokya Mağara Otel",
  },
  description:
    "Kapadokya'nın kalbinde otantik mağara ev deneyimi. Göreme'de lüks konaklama.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return children;
}
