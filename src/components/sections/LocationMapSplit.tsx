import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import SectionChapter from "@/components/ui/SectionChapter";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { useTranslations, useLocale } from 'next-intl';

const places = [
  {
    nameKey: "place0Name" as const,
    distKey: "place0Distance" as const,
    mapUrl: "https://maps.google.com/?q=Anitya+Cave+House+Ortahisar+Cappadocia",
  },
  {
    nameKey: "place1Name" as const,
    distKey: "place1Distance" as const,
    mapUrl: "https://maps.google.com/?q=Ortahisar+Castle+Cappadocia",
  },
  {
    nameKey: "place2Name" as const,
    distKey: "place2Distance" as const,
    mapUrl: "https://maps.google.com/?q=Goreme+Open+Air+Museum+Cappadocia",
  },
  {
    nameKey: "place3Name" as const,
    distKey: "place3Distance" as const,
    mapUrl: "https://maps.google.com/?q=Red+Valley+Kizilcukur+Cappadocia",
  },
  {
    nameKey: "place4Name" as const,
    distKey: "place4Distance" as const,
    mapUrl: "https://maps.google.com/?q=Three+Beauties+Cappadocia",
  },
  {
    nameKey: "place5Name" as const,
    distKey: "place5Distance" as const,
    mapUrl: "https://maps.google.com/?q=Pancarlik+Valley+Cappadocia",
  },
];

const mapImages: Record<string, string> = {
  tr: "/images/cappadocia-map-turkish.avif",
  zh: "/images/cappadocia-map-chinese.avif",
  en: "/images/cappadocia-map-turkish.avif",
};

export default function LocationMapSplit() {
  const t = useTranslations('location');
  const tChapter = useTranslations('chapters');
  const locale = useLocale();

  const mapSrc = mapImages[locale] ?? mapImages.tr;

  return (
    <Section tone="warm">
      <Container>
        <SectionChapter number="05" label={tChapter('location')} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Sol: fotoğraf + harita (aynı genişlik) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Ortahisar kalesi – ana görsel */}
            <ParallaxImage
              src="/images/cappadocia-ortahisar-castle.avif?v=2"
              alt="Ortahisar Castle Cappadocia"
              strength={12}
              className="w-full aspect-[16/9] rounded-2xl"
            />

            {/* Dile göre harita – aynı oran + köşe */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-black/5 bg-[#F5F1E8]">
              <Image
                src={mapSrc}
                alt="Anitya Cave House location map"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>

            <p className="text-xs text-neutral-600 tracking-wide">
              {t('caption')}
            </p>
          </div>

          {/* Sağ: başlık + açıklama + premium place cards */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide text-ink font-serif">
                {t('title')}
              </h2>
            </Reveal>

            <Reveal delayMs={80}>
              <p className="mt-6 text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
                {t('description')}
              </p>
            </Reveal>

            {/* Premium place cards */}
            <Reveal delayMs={140}>
              <div className="mt-8 grid grid-cols-1 gap-3">
                {places.map(({ nameKey, distKey, mapUrl }) => (
                  <div
                    key={nameKey}
                    className="rounded-2xl border border-black/5 bg-white/50 p-4 flex items-start justify-between gap-4 group hover:bg-white/70 transition-colors duration-200"
                  >
                    <div>
                      <p className="text-sm font-medium text-ink">{t(nameKey)}</p>
                      <p className="text-xs text-ink-2 mt-0.5">{t(distKey)}</p>
                    </div>
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-ink-2 hover:text-ink transition whitespace-nowrap opacity-0 group-hover:opacity-100 underline underline-offset-2 mt-0.5"
                    >
                      {t('openInMaps')}
                    </a>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
