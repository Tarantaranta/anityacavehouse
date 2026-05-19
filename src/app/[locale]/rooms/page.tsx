import Header2026 from "@/components/layout/Header2026";
import { Footer } from "@/components/layout/Footer";
import { rooms } from "@/data/rooms";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import RoomFeatureCard from "@/components/ui/RoomFeatureCard";
import ReviewSourceNote from "@/components/ui/ReviewSourceNote";
import { Link } from "@/i18n/routing";
import { generatePageMetadata } from '@/lib/seo-utils';
import { Locale } from '@/lib/seo-config';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    tr: 'Suitlerimiz – Mağara ve Taş Suite Evler | Anitya Cave House',
    en: 'Our Suites – Cave & Stone Suite Houses | Anitya Cave House',
    zh: '我们的套房 – 洞穴和石头套房 | Anitya洞穴之家',
  };
  const descriptions = {
    tr: 'Her biri kendine özgü karaktere sahip bağımsız mağara ve taş suite evlerimizi keşfedin. Özel mutfak, teras ve modern konfor.',
    en: 'Discover our independent cave and stone suite houses, each with its own unique character. Private kitchen, terrace, and modern comfort.',
    zh: '探索我们独立的洞穴和石头套房，每间都有独特的个性。私人厨房、露台和现代舒适。',
  };
  const l = locale as Locale;
  return generatePageMetadata({
    title: titles[l] || titles.tr,
    description: descriptions[l] || descriptions.tr,
    path: '/rooms',
    locale: l,
  });
}

// ─── Locale-aware static content ───────────────────────────────────────────

const pageContent = {
  tr: {
    eyebrow: "Ortahisar · Kapadokya",
    h1: "Suitlerimiz",
    description:
      "Kapadokya'nın eşsiz mağara mimarisinde, tamamen bağımsız ve özel suitlerimizde konforun tadını çıkarın.",
    badges: [
      "3 bağımsız suite",
      "2 mağara · 1 taş",
      "Özel giriş",
      "Özel teras",
      "Donanımlı mutfak",
    ],
    trustLabel: "Doğrulanmış misafir güveni",
    stats: [
      { value: "12+", label: "Yıl Superhost" },
      { value: "4.86", label: "Misafir Puanı" },
      { value: "1046+", label: "Doğrulanmış Yorum" },
    ],
    trustNote: "Yüzlerce konaklamadan süzülen ortak cümle: ",
    trustKeywords: "sessizlik, mahremiyet, ev konforu.",
    capacityUnit: "kişi",
    typeLabels: ["Mağara", "Mağara", "Taş"] as string[],
    roomHighlights: [
      [
        "Bağımsız yaşam alanı",
        "Küvetli özel banyo",
        "Donanımlı mutfak",
        "Özel teras",
        "Wi-Fi",
      ],
      [
        "Otantik mağara mimarisi",
        "Donanımlı mutfak",
        "Özel teras",
        "Wi-Fi",
        "Sessizlik",
      ],
      [
        "İki katlı yaşam alanı",
        "Donanımlı mutfak",
        "Özel teras",
        "Wi-Fi",
        "Kapadokya manzarası",
      ],
    ] as string[][],
    detailsLabel: "Detaylar",
    bookingLabel: "Rezervasyon",
    ctaTitle: "Hangi suite'i seçeceğinize karar veremediniz mi?",
    ctaDesc:
      "Size en uygun odayı bulmak için ekibimiz yardımcı olmaktan mutluluk duyar.",
    ctaBtn: "Bize Ulaşın",
  },
  en: {
    eyebrow: "Ortahisar · Cappadocia",
    h1: "Our Suites",
    description:
      "Experience complete independence in our private cave suites, nestled in the unique architecture of Cappadocia.",
    badges: [
      "3 independent suites",
      "2 cave · 1 stone",
      "Private entrance",
      "Private terrace",
      "Equipped kitchen",
    ],
    trustLabel: "Verified guest trust",
    stats: [
      { value: "12+", label: "Year Superhost" },
      { value: "4.86", label: "Guest Rating" },
      { value: "1046+", label: "Verified Reviews" },
    ],
    trustNote: "A phrase distilled from hundreds of stays: ",
    trustKeywords: "silence, privacy, home comfort.",
    capacityUnit: "guests",
    typeLabels: ["Cave", "Cave", "Stone"] as string[],
    roomHighlights: [
      [
        "Independent living space",
        "Private bathroom with bathtub",
        "Equipped kitchen",
        "Private terrace",
        "Wi-Fi",
      ],
      [
        "Authentic cave architecture",
        "Equipped kitchen",
        "Private terrace",
        "Wi-Fi",
        "Silence",
      ],
      [
        "Two-floor living",
        "Equipped kitchen",
        "Private terrace",
        "Wi-Fi",
        "Cappadocia view",
      ],
    ] as string[][],
    detailsLabel: "Details",
    bookingLabel: "Book Now",
    ctaTitle: "Can't decide which suite?",
    ctaDesc:
      "Our team is delighted to help you find the perfect suite for your stay.",
    ctaBtn: "Contact Us",
  },
  zh: {
    eyebrow: "奥塔希萨尔 · 卡帕多西亚",
    h1: "我们的套房",
    description: "在卡帕多西亚独特的洞穴建筑中，享受完全独立的私人套房。",
    badges: [
      "3个独立套房",
      "2洞穴·1石",
      "私人入口",
      "私人露台",
      "设备齐全的厨房",
    ],
    trustLabel: "已验证的客人信任",
    stats: [
      { value: "12+", label: "年超级房东" },
      { value: "4.86", label: "客人评分" },
      { value: "1046+", label: "已验证评论" },
    ],
    trustNote: "从数百次住宿中提炼的共同感受：",
    trustKeywords: "宁静、隐私、家的舒适。",
    capacityUnit: "人",
    typeLabels: ["洞穴", "洞穴", "石屋"] as string[],
    roomHighlights: [
      [
        "独立生活空间",
        "带浴缸的私人浴室",
        "设备齐全的厨房",
        "私人露台",
        "Wi-Fi",
      ],
      ["正宗洞穴建筑", "设备齐全的厨房", "私人露台", "Wi-Fi", "宁静"],
      [
        "两层生活空间",
        "设备齐全的厨房",
        "私人露台",
        "Wi-Fi",
        "卡帕多西亚美景",
      ],
    ] as string[][],
    detailsLabel: "详情",
    bookingLabel: "预订",
    ctaTitle: "无法决定选哪个套房？",
    ctaDesc: "我们的团队很乐意帮助您找到最适合您的套房。",
    ctaBtn: "联系我们",
  },
};

type SupportedLocale = keyof typeof pageContent;

// ───────────────────────────────────────────────────────────────────────────

export default async function RoomsPage({ params }: PageProps) {
  const { locale } = await params;
  const l: SupportedLocale = locale in pageContent
    ? (locale as SupportedLocale)
    : "tr";
  const c = pageContent[l];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header2026 />

      <main className="flex-1">
        {/* ══════════════════════════════════════════════════════════════
            R0 — ROOMS HERO
            Ana sayfanın devamı: bone zemin, serif başlık, ParallaxImage
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-surface pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="max-w-6xl mx-auto px-5 md:px-8">

            {/* Eyebrow + H1 + Description */}
            <div className="mb-10 md:mb-14 space-y-4">
              <Reveal>
                <p className="text-xs tracking-[0.18em] uppercase text-ink-2">
                  {c.eyebrow}
                </p>
              </Reveal>

              <Reveal delayMs={80}>
                <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-ink leading-[1.05]">
                  {c.h1}
                </h1>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="text-base md:text-lg text-ink-2 leading-relaxed max-w-[68ch]">
                  {c.description}
                </p>
              </Reveal>
            </div>

            {/* Sinematik hero görsel */}
            <Reveal delayMs={220}>
              <ParallaxImage
                src="/images/cappadocia-ortahisar-castle.avif"
                alt="Ortahisar Kalesi – Kapadokya"
                className="w-full aspect-[16/9] rounded-2xl"
                strength={16}
                priority
              />
            </Reveal>

            {/* Badge pills */}
            <Reveal delayMs={300}>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {c.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-black/10 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm text-ink-2"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            R1 — TRUST MINI
            TrustBar'ın sade, inline versiyonu; rozet tekrarı yok
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-surface-2 py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <Reveal>
              <p className="text-xs tracking-[0.18em] uppercase text-ink-2 mb-8">
                {c.trustLabel}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              {c.stats.map((stat, i) => (
                <Reveal key={stat.label} delayMs={i * 80}>
                  <div className="rounded-2xl border border-black/5 bg-white/50 p-6">
                    <p className="text-4xl md:text-5xl font-light font-serif text-ink tracking-tight">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm text-ink-2 tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <ReviewSourceNote />

            <Reveal delayMs={200}>
              <p className="border-t border-line pt-6 mt-2 text-ink-2 leading-relaxed text-sm md:text-base">
                {c.trustNote}
                <span className="text-ink italic">{c.trustKeywords}</span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            R2 — ROOMS LIST (Editoryal)
            Her oda: alternatif sol/sağ yerleşim, az metin, güçlü görsel
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-surface py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <div className="space-y-24 md:space-y-32">
              {rooms.map((room, i) => (
                <RoomFeatureCard
                  key={room.id}
                  title={room.name[l]}
                  description={room.description[l]}
                  imageSrc={room.images[0]}
                  imageAlt={room.name[l]}
                  capacity={room.capacity}
                  capacityUnit={c.capacityUnit}
                  sizeSqm={room.size}
                  typeLabel={c.typeLabels[i]}
                  detailsHref={`/rooms/${room.slug}`}
                  bookingHref={`/booking?room=${room.slug}`}
                  highlights={c.roomHighlights[i]}
                  detailsLabel={c.detailsLabel}
                  bookingLabel={c.bookingLabel}
                  reverse={i % 2 === 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            R3 — DECISION CTA
            "Hangi suite'i seçeceğinize karar veremediniz mi?"
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-surface-2 py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <Reveal>
              <div className="rounded-2xl border border-black/5 bg-white/40 p-10 md:p-14">
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-ink leading-snug max-w-2xl">
                  {c.ctaTitle}
                </h2>
                <p className="mt-5 text-base text-ink-2 leading-relaxed max-w-xl">
                  {c.ctaDesc}
                </p>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-7 py-3.5 text-sm font-medium hover:bg-neutral-800 transition-colors"
                  >
                    {c.ctaBtn}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
