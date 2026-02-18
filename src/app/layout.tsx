import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Anitya Cave House",
    default: "Anitya Cave House - Kapadokya Mağara Otel",
  },
  description:
    "Kapadokya'nın kalbinde otantik mağara ev deneyimi. Göreme'de lüks konaklama.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
