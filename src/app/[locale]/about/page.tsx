import Header2026 from "@/components/layout/Header2026";
import { Footer } from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";
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
    tr: 'Hakkımızda – Anitya Cave House Hikayesi | Kapadokya',
    en: 'About Us – Anitya Cave House Story | Cappadocia',
    zh: '关于我们 – Anitya洞穴之家故事 | 卡帕多西亚',
  };
  const descriptions = {
    tr: '400 yılı aşkın geçmişe sahip taş evimizin hikayesi. Ortahisar\'ın tarihi ve Anitya felsefesi.',
    en: 'The story of our 400-year-old stone house. History of Ortahisar and the Anitya philosophy.',
    zh: '我们拥有400多年历史的石头房子的故事。奥塔希萨尔的历史和Anitya哲学。',
  };
  const l = locale as Locale;
  return generatePageMetadata({
    title: titles[l] || titles.tr,
    description: descriptions[l] || descriptions.tr,
    path: '/about',
    locale: l,
  });
}

// ─── Locale-aware content ──────────────────────────────────────────────────

const pageContent = {
  tr: {
    heroLabel: "Ortahisar · Kapadokya",
    heroTitle: "Hakkımızda",
    heroImageAlt: "Anitya Cave House — taş doku ve doğal ışık",
    block1: [
      "Ortahisar, MÖ 1800'lerden bu yana sayısız uygarlığın izini taşır. Hititler, Persler, Romalılar, Bizanslılar, Selçuklular ve Osmanlılar bu coğrafyada yaşadı. Kapadokya'nın volkanik kayaları, sadece jeolojik değil, insani bir hafızayı da saklar.",
      "Anitya Cave House, 400 yılı aşkın geçmişe sahip bu taşın içinde konumlanır. Ancak hikâyesi bundan çok daha eskidir.",
    ],
    poeticLine1: "Kapadokya bir zamanlar denizdi.",
    poeticLine2: "Sonra volkanlar yükseldi.",
    poeticBody:
      "Rüzgâr, su ve ateş milyonlarca yıl boyunca bu toprağı şekillendirdi. Ortaya çıkan kaya kütleleri uzun süre sessizdi. Sahipsizdi. Sonra insanlar geldi. Oydu, yerleşti, barındı, üretti, dua etti, bekledi.",
    block3:
      "Bu taş, kaç kuşak gördü bilmiyoruz. Kaç çocuk burada büyüdü, kaç insan burada uyudu, kaç mevsim geçti — bilmiyoruz. Ama biliyoruz ki her dönem, bu kayaya kendi izini bıraktı.",
    salonLabel: "Salon",
    salonText:
      "Yüzyıllar önce gündelik yaşamın bir parçasıydı. Kayaya oyulmuş raf nişleri, o dönemin izlerini bugün hâlâ fısıldar.",
    bedroomLabel: "Yatak Odası",
    bedroomText:
      "Geçmişte bir ibadet alanıydı. Sessizlik, o dönemden bugüne kalan en belirgin miras.",
    block5:
      "Biz bir doktor ve bir oyuncuyuz. Bu mekânı ilk gördüğümüzde taşın yalnızlığını değil, sürekliliğini hissettik. Köyün ustalarıyla birlikte, yapının özgün dokusunu koruyarak restore ettik. Eklemekten çok ortaya çıkarmayı tercih ettik.",
    anityaLabel: "Anitya",
    anityaTitle: "Anitya kelimesi \u201csüreksizlik\u201d anlamına gelir.",
    anityaItems: ["Hiçbir şey kalıcı değildir.", "Ne uygarlıklar.", "Ne yapılar.", "Ne de biz."],
    closing: [
      "Bu mağara bir zamanlar başka bir hayatın parçasıydı. Sonra başka bir dönemin. Şimdi ise modern dünyanın insanlarını ağırlıyor.",
      "Taş değişmiyor gibi görünür. Ama içinden geçen hayat sürekli değişir.",
    ],
    closingTagline: "Anitya, bu akışın küçük bir durağıdır.",
    chips: ["3 bağımsız suite", "2 mağara · 1 taş", "Özel teras", "Donanımlı mutfak"],
    ctaRooms: "Suitlerimizi Keşfedin",
    ctaContact: "İletişime Geçin",
    stats: [
      { value: "400+", label: "Yıllık taş" },
      { value: "4.9", label: "Airbnb puanı" },
      { value: "12+", label: "Yıllık Superhost" },
      { value: "3", label: "Bağımsız suite" },
    ],
  },
  en: {
    heroLabel: "Ortahisar · Cappadocia",
    heroTitle: "About Us",
    heroImageAlt: "Anitya Cave House — stone texture and natural light",
    block1: [
      "Ortahisar has carried the traces of countless civilizations since 1800 BC. Hittites, Persians, Romans, Byzantines, Seljuks and Ottomans all lived in this geography. Cappadocia's volcanic rocks preserve not just geological, but human memory.",
      "Anitya Cave House is situated within this stone of over 400 years. But its story stretches much further back.",
    ],
    poeticLine1: "Cappadocia was once a sea.",
    poeticLine2: "Then the volcanoes rose.",
    poeticBody:
      "Wind, water and fire shaped this land over millions of years. The rock masses that emerged were long silent. Unclaimed. Then people came. They carved, settled, sheltered, created, prayed, waited.",
    block3:
      "How many generations this stone has seen, we don't know. How many children grew up here, how many people slept here, how many seasons passed — we don't know. But we know that every era left its own mark on this rock.",
    salonLabel: "Living Room",
    salonText:
      "Centuries ago it was part of daily life. The shelf niches carved into the rock still whisper the traces of that era today.",
    bedroomLabel: "Bedroom",
    bedroomText:
      "In the past it was a place of worship. The silence that remains from that era is the most enduring inheritance.",
    block5:
      "We are a doctor and an actress. When we first saw this space we felt not the loneliness of the stone, but its continuity. Together with the village artisans, we restored it while preserving the building's original texture. We preferred to reveal rather than to add.",
    anityaLabel: "Anitya",
    anityaTitle: "The word Anitya means \u201cimpermanence\u201d.",
    anityaItems: ["Nothing is permanent.", "Not civilizations.", "Not buildings.", "Not us."],
    closing: [
      "This cave was once part of another life. Then another era's. Now it welcomes people of the modern world.",
      "The stone seems unchanging. But the life that passes through it changes constantly.",
    ],
    closingTagline: "Anitya is a small stop in this flow.",
    chips: ["3 independent suites", "2 cave · 1 stone", "Private terrace", "Equipped kitchen"],
    ctaRooms: "Explore Our Suites",
    ctaContact: "Get in Touch",
    stats: [
      { value: "400+", label: "Year-old stone" },
      { value: "4.9", label: "Airbnb rating" },
      { value: "12+", label: "Year Superhost" },
      { value: "3", label: "Independent suites" },
    ],
  },
  zh: {
    heroLabel: "奥塔希萨尔 · 卡帕多西亚",
    heroTitle: "关于我们",
    heroImageAlt: "Anitya Cave House — 石头质感与自然采光",
    block1: [
      "奥塔希萨尔自公元前1800年以来承载了无数文明的印记。赫梯人、波斯人、罗马人、拜占庭人、塞尔柱人和奥斯曼人都曾在这片土地上生活。卡帕多西亚的火山岩不仅保存着地质记忆，更留存着人类的记忆。",
      "Anitya Cave House坐落于这座有着400多年历史的石头建筑中。但它的故事可以追溯到更遥远的过去。",
    ],
    poeticLine1: "卡帕多西亚曾经是一片海洋。",
    poeticLine2: "然后火山升起。",
    poeticBody:
      "风、水与火历经数百万年塑造了这片土地。那些涌现出来的岩石长久地保持着沉默，无人问津。然后人类来了。他们凿刻、定居、栖身、创造、祈祷、等待。",
    block3:
      "这块石头见证了多少代人，我们不知道。有多少孩子在这里长大，有多少人在这里入眠，有多少季节流过——我们不知道。但我们知道，每个时代都在这块岩石上留下了自己的印记。",
    salonLabel: "客厅",
    salonText: "数百年前，它是日常生活的一部分。凿入岩石的壁龛至今仍在低语那个时代的印记。",
    bedroomLabel: "卧室",
    bedroomText: "过去这里曾是祈祷之所。那个时代留存至今的寂静是最显著的遗产。",
    block5:
      "我们是一位医生和一位演员。当我们第一次看到这个空间时，我们感受到的不是石头的孤独，而是它的延续性。我们与村里的工匠一起，在保留建筑原始质感的同时进行了修缮。我们更倾向于呈现，而非添加。",
    anityaLabel: "Anitya",
    anityaTitle: "Anitya这个词意为\u201c无常\u201d。",
    anityaItems: ["没有什么是永久的。", "不是文明。", "不是建筑。", "也不是我们。"],
    closing: [
      "这个洞穴曾是另一段生命的一部分。然后是另一个时代。现在它迎接着现代世界的人们。",
      "石头看似不变。但穿越其中的生命却在不断变化。",
    ],
    closingTagline: "Anitya是这条流动中的一个小驿站。",
    chips: ["3个独立套房", "2洞穴·1石屋", "私人露台", "设备齐全的厨房"],
    ctaRooms: "探索我们的套房",
    ctaContact: "联系我们",
    stats: [
      { value: "400+", label: "年历史石头" },
      { value: "4.9", label: "Airbnb评分" },
      { value: "12+", label: "年超赞房东" },
      { value: "3", label: "独立套房" },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const c = pageContent[locale as keyof typeof pageContent] ?? pageContent.tr;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      <Header2026 />

      {/* A0 — Hero */}
      <PageHero
        label={c.heroLabel}
        title={c.heroTitle}
        imageSrc="/images/cappadocia-cave-house.avif"
        imageAlt={c.heroImageAlt}
      />

      {/* A1 — Main content */}
      <SectionShell>
        <div className="max-w-[68ch] mx-auto">
          <div className="bg-white/45 border border-black/5 rounded-2xl p-8 md:p-12">

            {/* Block 1 — History */}
            <div className="space-y-6 mb-14">
              {c.block1.map((para, i) => (
                <Reveal key={i} delayMs={i * 80}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Block 2 — Poetic geology */}
            <div className="border-l-2 border-neutral-300 pl-8 space-y-4 mb-14">
              <Reveal>
                <p className="font-serif text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
                  {c.poeticLine1}
                </p>
              </Reveal>
              <Reveal delayMs={60}>
                <p className="font-serif text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
                  {c.poeticLine2}
                </p>
              </Reveal>
              <Reveal delayMs={120}>
                <p className="text-base text-neutral-600 leading-relaxed mt-4">
                  {c.poeticBody}
                </p>
              </Reveal>
            </div>

            {/* Block 3 — Generations */}
            <div className="space-y-6 mb-14">
              <Reveal>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.block3}
                </p>
              </Reveal>
            </div>

            {/* Block 4 — Rooms */}
            <div className="grid md:grid-cols-2 gap-10 mb-14">
              <Reveal>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                    {c.salonLabel}
                  </p>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    {c.salonText}
                  </p>
                </div>
              </Reveal>
              <Reveal delayMs={80}>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                    {c.bedroomLabel}
                  </p>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    {c.bedroomText}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Divider */}
            <div className="h-px bg-neutral-200 mb-14" />

            {/* Block 5 — Who we are */}
            <div className="space-y-6 mb-14">
              <Reveal>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.block5}
                </p>
              </Reveal>
            </div>

            {/* Block 6 — Anitya meaning */}
            <div className="bg-stone-100/60 rounded-xl px-8 py-10 space-y-5 mb-14">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">
                  {c.anityaLabel}
                </p>
              </Reveal>
              <Reveal delayMs={60}>
                <p className="font-serif text-2xl md:text-3xl font-light text-neutral-800 leading-relaxed">
                  {c.anityaTitle}
                </p>
              </Reveal>
              <Reveal delayMs={120}>
                <div className="space-y-2 text-base text-neutral-600 leading-relaxed">
                  {c.anityaItems.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Block 7 — Closing */}
            <div className="space-y-6">
              {c.closing.map((para, i) => (
                <Reveal key={i} delayMs={i * 60}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {para}
                  </p>
                </Reveal>
              ))}
              <Reveal delayMs={120}>
                <p className="font-serif text-xl md:text-2xl font-light text-neutral-800 leading-relaxed mt-8">
                  {c.closingTagline}
                </p>
              </Reveal>
            </div>

          </div>
        </div>
      </SectionShell>

      {/* A2 — Info chips */}
      <SectionShell className="pt-0 md:pt-0">
        <Reveal>
          <div className="flex flex-wrap gap-3 justify-center">
            {c.chips.map((chip) => (
              <span
                key={chip}
                className="px-5 py-2.5 rounded-full border border-black/10 bg-white/50 text-sm text-neutral-700"
              >
                {chip}
              </span>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      {/* A3 — CTA */}
      <SectionShell className="pt-0 md:pt-0 pb-20 md:pb-28">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/rooms"
              className="px-8 py-3.5 rounded-full bg-neutral-900 text-white text-sm tracking-wide hover:bg-neutral-700 transition-colors duration-300"
            >
              {c.ctaRooms}
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full border border-neutral-900 text-neutral-900 text-sm tracking-wide hover:bg-neutral-900 hover:text-white transition-all duration-300"
            >
              {c.ctaContact}
            </Link>
          </div>
        </Reveal>
      </SectionShell>

      {/* Footer stats bar */}
      <div className="w-full border-t border-black/5 bg-white/40">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {c.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl font-light text-neutral-900">{stat.value}</p>
              <p className="text-xs text-neutral-400 uppercase tracking-[0.18em] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
