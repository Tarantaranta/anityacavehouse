import Header2026 from "@/components/layout/Header2026";
import { Footer } from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionShell from "@/components/ui/SectionShell";
import GalleryGrid, { GalleryImage } from "@/components/ui/GalleryGrid";
import Reveal from "@/components/ui/Reveal";
import { Link } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

// ─── Gallery images (canonical English tags for GalleryGrid filtering) ────────

const GALLERY_IMAGES: GalleryImage[] = [
  // Terrace
  {
    src: "/images/terrace/cappadocia-balloon-terrace.avif",
    alt: "Anitya terrace — Cappadocia balloon and panorama",
    tag: "Terrace",
  },
  {
    src: "/images/terrace/cappadocia-hot-air-balloon.avif",
    alt: "Hot air balloon, Ortahisar silhouette",
    tag: "Terrace",
  },
  {
    src: "/images/cappadocia-balloon-terrace.avif",
    alt: "Terrace and Cappadocia skyline",
    tag: "Terrace",
  },
  // Kitchen
  {
    src: "/images/kitchen/cave-suit-kitchen.avif",
    alt: "Anitya suite kitchen — fully equipped",
    tag: "Kitchen",
  },
  {
    src: "/images/kitchen/cave-house-kitchen.jpg",
    alt: "Cave house kitchen details",
    tag: "Kitchen",
  },
  {
    src: "/images/cave-house-kitchen.avif",
    alt: "Stone wall kitchen, natural light",
    tag: "Kitchen",
  },
  // Interior
  {
    src: "/images/cappadocia-cave-house.avif",
    alt: "Anitya Cave Suite — main living area",
    tag: "Interior",
  },
  {
    src: "/images/anitya-cave-suite/DSC_5583.avif",
    alt: "Anitya Cave Suite — bedroom",
    tag: "Interior",
  },
  {
    src: "/images/anitya-cave-suite/DSC_5602.avif",
    alt: "Anitya Cave Suite — sitting area",
    tag: "Interior",
  },
  {
    src: "/images/anitya-cave-suite/tmpnxcvbn0s.png.avif",
    alt: "Anitya Cave Suite — interior detail",
    tag: "Interior",
  },
  {
    src: "/images/sirahane-cave-suit/DSC_6221.avif",
    alt: "Şırahane Cave Suite — interior",
    tag: "Interior",
  },
  {
    src: "/images/sirahane-cave-suit/14f4c726-980f-47fa-86dd-657129ce2309.jpg",
    alt: "Şırahane Suite — authentic cave details",
    tag: "Interior",
  },
  {
    src: "/images/dublex-stone-suit/DSC_5695.avif",
    alt: "Dublex Stone Suite — two-floor living",
    tag: "Interior",
  },
  {
    src: "/images/dublex-stone-suit/4e959b8b-adcb-44cb-acbd-1ff5661c067a.jpeg",
    alt: "Dublex Stone Suite — stone texture",
    tag: "Interior",
  },
  // Ortahisar
  {
    src: "/images/cappadocia-ortahisar-castle.avif",
    alt: "Ortahisar Castle — sunset silhouette",
    tag: "Ortahisar",
  },
  {
    src: "/images/cave-house-cappadocia.avif",
    alt: "Cappadocia cave houses — Ortahisar",
    tag: "Ortahisar",
  },
  // Detail
  {
    src: "/images/sirahane-cave-suit/156dcea3-c398-401e-b9b0-241a25f92ec5.jpg",
    alt: "Şırahane — rock-carved shelf detail",
    tag: "Detail",
  },
  {
    src: "/images/sirahane-cave-suit/30b6c518-1b33-4c00-99d7-f24ca38e261e.jpg",
    alt: "Stone arch and natural texture",
    tag: "Detail",
  },
  // General
  { src: "/images/blog-images/1.avif", alt: "Anitya Cave House", tag: "General" },
  { src: "/images/blog-images/2.avif", alt: "Anitya Cave House", tag: "General" },
  { src: "/images/blog-images/3.avif", alt: "Anitya Cave House", tag: "General" },
  { src: "/images/blog-images/4.avif", alt: "Anitya Cave House", tag: "General" },
  { src: "/images/blog-images/5.avif", alt: "Anitya Cave House", tag: "General" },
  { src: "/images/blog-images/6.avif", alt: "Anitya Cave House", tag: "General" },
  // Activities
  { src: "/images/activities/balloon.avif", alt: "Hot Air Balloon Ride — Cappadocia", tag: "Activities" },
  { src: "/images/activities/balloon-2.avif", alt: "Sunrise / Sunset Panorama Transfer", tag: "Activities" },
  { src: "/images/activities/atv-turu.avif", alt: "ATV Safari — Fairy chimneys", tag: "Activities" },
  { src: "/images/activities/bisiklet-turu.avif", alt: "Cycling Tours — Cappadocia", tag: "Activities" },
  { src: "/images/activities/blue-tour.avif", alt: "Blue Tour — Hidden Valleys & Ihlara", tag: "Activities" },
  { src: "/images/activities/foto-safari.avif", alt: "Photography Safari — Golden Hour", tag: "Activities" },
  { src: "/images/activities/geleneksek-turk-mutfagi.avif", alt: "Traditional Turkish Cooking", tag: "Activities" },
  { src: "/images/activities/green-tour.avif", alt: "Green Tour — South Cappadocia", tag: "Activities" },
  { src: "/images/activities/horseback-riding.avif", alt: "Horseback Riding — Fairy Chimneys", tag: "Activities" },
  { src: "/images/activities/jeep-safari.avif", alt: "Jeep Safari — Off-road Cappadocia", tag: "Activities" },
  { src: "/images/activities/main-activities-pic.avif", alt: "Cappadocia Activities", tag: "Activities" },
  { src: "/images/activities/pottery.avif", alt: "Pottery Workshop — Avanos", tag: "Activities" },
  { src: "/images/activities/private-tour.avif", alt: "Private Custom Tour — Cappadocia", tag: "Activities" },
  { src: "/images/activities/red-tour.avif", alt: "Red Tour — North Cappadocia", tag: "Activities" },
  { src: "/images/activities/sarap-tadim.avif", alt: "Cappadocia Wine Tasting", tag: "Activities" },
  { src: "/images/activities/turkish-hammam.avif", alt: "Turkish Hammam Experience", tag: "Activities" },
  { src: "/images/activities/turkish-night.avif", alt: "Turkish Night — Folk Dances", tag: "Activities" },
  { src: "/images/activities/vadi-yuruyusu.avif", alt: "Valley Hikes — Cappadocia", tag: "Activities" },
  { src: "/images/activities/whirling-dervishes.avif", alt: "Whirling Dervishes Ceremony", tag: "Activities" },
  { src: "/images/activities/yeralti-sehri.avif", alt: "Underground City Tour", tag: "Activities" },
  { src: "/images/activities/Vintage%20Classic%20Car%20%26%20Balloon%20Photoshoot.avif", alt: "Vintage Classic Car & Balloon Photoshoot", tag: "Activities" },
];

// ─── Locale-aware content ──────────────────────────────────────────────────

const pageContent = {
  tr: {
    heroLabel: "Ortahisar · Kapadokya",
    heroTitle: "Galeri",
    heroSubtitle: "Taşın dokusu, ışık, teras ve Ortahisar silüeti. Anitya'nın gün içindeki ritmi.",
    heroImageAlt: "Ortahisar kalesi ve Kapadokya manzarası",
    instagramEyebrow: "Güncel kareler",
    instagramTitle: "Daha fazla fotoğraf için",
    instagramDesc: "Güncel fotoğraflar ve misafirlerimizin paylaşımları için Instagram'da Anitya.",
    instagramCta: "@anityacavehouse",
  },
  en: {
    heroLabel: "Ortahisar · Cappadocia",
    heroTitle: "Gallery",
    heroSubtitle: "Stone texture, light, terrace and Ortahisar silhouette. The daily rhythm of Anitya.",
    heroImageAlt: "Ortahisar castle and Cappadocia view",
    instagramEyebrow: "Latest shots",
    instagramTitle: "For more photos",
    instagramDesc: "Follow Anitya on Instagram for the latest photos and guest shares.",
    instagramCta: "@anityacavehouse",
  },
  zh: {
    heroLabel: "奥塔希萨尔 · 卡帕多西亚",
    heroTitle: "画廊",
    heroSubtitle: "石头的质感、光线、露台与奥塔希萨尔的轮廓。Anitya的日常节奏。",
    heroImageAlt: "奥塔希萨尔城堡与卡帕多西亚风景",
    instagramEyebrow: "最新照片",
    instagramTitle: "更多照片请关注",
    instagramDesc: "在Instagram上关注Anitya，获取最新照片和客人分享。",
    instagramCta: "@anityacavehouse",
  },
};

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;
  const c = pageContent[locale as keyof typeof pageContent] ?? pageContent.tr;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      <Header2026 />

      {/* G0 — Hero */}
      <PageHero
        label={c.heroLabel}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        imageSrc="/images/cave-house.avif"
        imageAlt={c.heroImageAlt}
      />

      {/* G1 + G2 — Filters + Grid */}
      <SectionShell>
        <GalleryGrid images={GALLERY_IMAGES} locale={locale} />
      </SectionShell>

      {/* G3 — Instagram CTA */}
      <SectionShell className="pt-0 md:pt-0 pb-20 md:pb-28">
        <Reveal>
          <div className="bg-white/40 border border-black/5 rounded-2xl p-10 text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-500 mb-4">
              {c.instagramEyebrow}
            </p>
            <p className="font-serif font-light text-2xl md:text-3xl text-neutral-900 mb-4">
              {c.instagramTitle}
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8 max-w-[50ch] mx-auto">
              {c.instagramDesc}
            </p>
            <a
              href="https://instagram.com/anityacavehouse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-neutral-900 text-neutral-900 px-7 py-3 rounded-full text-sm tracking-wide hover:bg-neutral-900 hover:text-white transition-all duration-300"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              {c.instagramCta}
            </a>
          </div>
        </Reveal>
      </SectionShell>

      <Footer />
    </div>
  );
}
