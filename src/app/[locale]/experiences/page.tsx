import Header2026 from "@/components/layout/Header2026";
import { Footer } from "@/components/layout/Footer";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import ExperiencesGrid from "@/components/sections/ExperiencesGrid";
import { generatePageMetadata } from '@/lib/seo-utils';
import { Locale } from '@/lib/seo-config';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    tr: 'Kapadokya Deneyimleri – Aktiviteler ve Rotalar | Anitya',
    en: 'Cappadocia Experiences – Activities and Routes | Anitya',
    zh: '卡帕多西亚体验 – 活动和路线 | Anitya',
  };
  const descriptions = {
    tr: 'Kapadokya\'da yapılacaklar: Balon turu, vadilerde yürüyüş, yerel mutfak, tarihi yerler.',
    en: 'Things to do in Cappadocia: Balloon tour, valley hikes, local cuisine, historical sites.',
    zh: '在卡帕多西亚要做的事情：热气球之旅、山谷徒步、当地美食、历史遗迹。',
  };
  const l = locale as Locale;
  return generatePageMetadata({
    title: titles[l] || titles.tr,
    description: descriptions[l] || descriptions.tr,
    path: '/experiences',
    locale: l,
  });
}

const pageContent = {
  tr: {
    eyebrow: "Ortahisar · Kapadokya",
    h1: "Kapadokya Deneyimleri",
    description:
      "Kapadokya'nın büyüsünü keşfetmek için özenle seçilmiş aktiviteler ve rotalar. Her deneyim, bölgenin eşsiz kültürünü ve doğal güzelliklerini yakından tanımanızı sağlar.",
    imageAlt: "Kapadokya – Ortahisar manzarası",
    badges: ["Sakin tempo", "Yerel rehberler", "Özenle seçilmiş rotalar", "Size göre plan"],
    rhythmEyebrow: "Ritim",
    rhythmH2: "Deneyimler, programa değil size uyar.",
    rhythmBody:
      "Bazı sabahlar erken başlar — balonun sepetiyle birlikte güneşle yükselirsiniz. Bazı günler sadece yürümek, bir vadiyi sessizce dinlemek istersiniz. Bazı akşamlar ise masada uzun süre oturmak, yerel bir şarabı yavaş içmek. Burada her ikisi de mümkün. Konaklamanız boyunca sizin için bir program hazırlayabiliriz — ya da sadece haritayı uzatıp yolunuzu kendiniz çizebilirsiniz.",
    planEyebrow: "Planlama",
    planH2: "Deneyimlerinizi birlikte planlayalım.",
    planBody:
      "Anitya Cave House olarak yerel rehberler ve tur operatörleriyle yakın ilişkideyiz. Size en uygun programı oluşturmak için bize yazın; balondan bisiklete, mahzenden mutfağa kadar her şeyi ayarlayalım.",
    whatsappCta: "WhatsApp ile yazın",
  },
  en: {
    eyebrow: "Ortahisar · Cappadocia",
    h1: "Cappadocia Experiences",
    description:
      "Carefully curated activities and routes to discover the magic of Cappadocia. Each experience brings you closer to the region's unique culture and natural beauty.",
    imageAlt: "Cappadocia – Ortahisar view",
    badges: ["Relaxed pace", "Local guides", "Curated routes", "Tailored to you"],
    rhythmEyebrow: "Rhythm",
    rhythmH2: "Experiences adapt to you, not a schedule.",
    rhythmBody:
      "Some mornings begin early — you rise with the sun in a balloon basket. Some days you just want to walk, to quietly listen to a valley. Some evenings call for sitting long at the table, slowly sipping local wine. Both are possible here. We can arrange a program for you throughout your stay — or simply hand you a map and let you draw your own route.",
    planEyebrow: "Planning",
    planH2: "Let's plan your experiences together.",
    planBody:
      "At Anitya Cave House we maintain close relationships with local guides and tour operators. Write to us to create the right program for you — from balloons to bicycles, from cellars to kitchens, we can arrange it all.",
    whatsappCta: "Write via WhatsApp",
  },
  zh: {
    eyebrow: "奥塔希萨尔 · 卡帕多西亚",
    h1: "卡帕多西亚体验",
    description:
      "精心挑选的活动与路线，带您发现卡帕多西亚的魔力。每一次体验都让您更亲近这片土地独特的文化与自然之美。",
    imageAlt: "卡帕多西亚 – 奥塔希萨尔风景",
    badges: ["悠闲节奏", "本地向导", "精选路线", "量身定制"],
    rhythmEyebrow: "节奏",
    rhythmH2: "体验因您而定，而非日程。",
    rhythmBody:
      "有些清晨早早开始——您随着气球升起，与太阳一同升腾。有些日子您只想漫步，静静聆听山谷的声音。有些傍晚则适合长坐桌前，慢慢品味本地佳酿。这里两者皆可。我们可以为您在整个行程中安排计划——或者只需递上一张地图，让您自己描绘路线。",
    planEyebrow: "规划",
    planH2: "让我们共同规划您的体验。",
    planBody:
      "在Anitya Cave House，我们与当地向导和旅行运营商保持着密切关系。请写信告诉我们，为您量身打造最合适的行程——从热气球到骑行，从酒窖到厨房，我们可以安排一切。",
    whatsappCta: "通过WhatsApp联系我们",
  },
};

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = pageContent[locale as keyof typeof pageContent] ?? pageContent.tr;

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header2026 />

      <main className="flex-1">
        {/* ══════════════════════════════════════════════════════════════
            E0 — EXPERIENCES HERO
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-surface pt-28 pb-10 md:pt-36 md:pb-12">
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

            {/* Hero image */}
            <Reveal delayMs={220}>
              <ParallaxImage
                src="/images/activities/main-activities-pic.avif"
                alt={c.imageAlt}
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
                    className="rounded-full border border-black/10 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm text-neutral-800"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            E1 + E2 — Category filter + Experience cards (Client)
        ══════════════════════════════════════════════════════════════ */}
        <ExperiencesGrid locale={locale} />

        {/* ══════════════════════════════════════════════════════════════
            E3 — MINI MANIFESTO
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-surface-2 py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <Reveal>
              <div className="rounded-2xl border border-black/5 bg-white/40 p-8 md:p-12">
                <Reveal delayMs={60}>
                  <p className="text-xs tracking-[0.18em] uppercase text-ink-2 mb-5">
                    {c.rhythmEyebrow}
                  </p>
                </Reveal>

                <Reveal delayMs={120}>
                  <h2 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-ink leading-snug max-w-xl mb-6">
                    {c.rhythmH2}
                  </h2>
                </Reveal>

                <Reveal delayMs={180}>
                  <p className="text-base text-ink-2 leading-relaxed max-w-2xl">
                    {c.rhythmBody}
                  </p>
                </Reveal>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            E4 — PLANNING CTA
        ══════════════════════════════════════════════════════════════ */}
        <section id="planlama" className="bg-surface py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <Reveal>
              <p className="text-xs tracking-[0.18em] uppercase text-ink-2 mb-6">
                {c.planEyebrow}
              </p>
            </Reveal>

            <Reveal delayMs={80}>
              <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-ink leading-[1.05] max-w-2xl mb-6">
                {c.planH2}
              </h2>
            </Reveal>

            <Reveal delayMs={140}>
              <p className="text-base md:text-lg text-ink-2 leading-relaxed max-w-2xl mb-10">
                {c.planBody}
              </p>
            </Reveal>

            <Reveal delayMs={200}>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* WhatsApp – primary */}
                <a
                  href="https://wa.me/905444946814"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current flex-shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.526 5.847L0 24l6.353-1.497A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.37l-.36-.213-3.728.878.944-3.637-.234-.373A9.818 9.818 0 0112 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.421-4.398 9.818-9.818 9.818z" />
                  </svg>
                  {c.whatsappCta}
                </a>

                {/* Email – secondary */}
                <a
                  href="mailto:info@anityacavehouse.com"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/50 px-6 py-3 text-sm font-medium hover:bg-white/70 transition-colors text-ink"
                >
                  info@anityacavehouse.com
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
