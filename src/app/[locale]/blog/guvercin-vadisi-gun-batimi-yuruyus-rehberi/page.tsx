import Header2026 from "@/components/layout/Header2026";
import { Footer } from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";
import { Link } from "@/i18n/routing";
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://anityacavehouse.com';
  const slug = 'guvercin-vadisi-gun-batimi-yuruyus-rehberi';

  const metadata = {
    tr: {
      title: 'Güvercin Vadisi\'nden Gün Batımı: Yürüyüş Rehberi',
      description: 'Ortahisar yakınındaki Güvercinlik Vadisi, peribacaları ve meyve bahçeleri arasında eşsiz bir yürüyüş rotası sunar. Gün batımı rehberi.',
    },
    en: {
      title: 'Sunset from Pigeon Valley: Hiking Guide',
      description: 'Pigeon Valley near Ortahisar offers a unique hiking route among fairy chimneys and orchards. Sunset hiking guide.',
    },
    zh: {
      title: '鸽子谷日落：徒步指南',
      description: '奥塔希萨尔附近的鸽子谷，在仙人烟囱和果园之间提供独特的徒步路线。日落徒步指南。',
    },
  };

  const l = locale as 'tr' | 'en' | 'zh';
  const meta = metadata[l] || metadata.tr;

  return {
    title: meta.title,
    description: meta.description,
    keywords: locale === 'tr'
      ? 'güvercin vadisi, kapadokya yürüyüş, ortahisar yürüyüş rotaları, kapadokya gün batımı, peribacaları'
      : locale === 'en'
      ? 'pigeon valley, cappadocia hiking, ortahisar hiking routes, cappadocia sunset, fairy chimneys'
      : '鸽子谷, 卡帕多西亚徒步, 奥塔希萨尔徒步路线, 日落, 仙人烟囱',

    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${slug}`,
      languages: {
        'tr': `${baseUrl}/tr/blog/${slug}`,
        'en': `${baseUrl}/en/blog/${slug}`,
        'zh': `${baseUrl}/zh/blog/${slug}`,
        'x-default': `${baseUrl}/en/blog/${slug}`,
      },
    },

    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/blog/${slug}`,
      type: 'article',
      publishedTime: '2025-12-01T00:00:00Z',
      authors: ['Anitya Cave House'],
      locale: locale,
    },

    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

const content = {
  tr: {
    heroLabel: "Rotalar · Aralık 2025",
    heroTitle: "Güvercin Vadisi'nden Gün Batımı: Yürüyüş Rehberi",
    imageAlt: "Kapadokya peribacaları ve vadi manzarası",
    categoryChip: "Rotalar · Aralık 2025",
    intro1:
      "Kapadokya'nın kalbi Ortahisar'da, Anitya Cave House'un terasından veya salonundan baktığınızda karşınızda uzanan o derin boşluk ve vadiler, sadece bir manzara değil, binlerce yıllık bir tarım ve yaşam kültürüdür.",
    intro2:
      "Misafirlerimize her zaman söylediğim gibi; bu coğrafyayı anlamanın en iyi yolu, onu uzaktan izlemek değil, bizzat tüf kayaların tozuna karışarak içinde yürümektir. Ortahisar'ın hemen yakınındaki Güvercinlik Vadisi, doğa tutkunları için peribacaları, kayalık oluşumlar ve meyve bahçeleri arasında harika bir yürüyüş rotası sunar.",
    section1Label: "Tarihin İzleri",
    section1Title: "Neden \"Güvercin\" Vadisi?",
    section1p1:
      "Bu vadiye adım attığınızda, kayaların yüksek kısımlarına oyulmuş küçük pencereler dikkatinizi çekecektir. Bir restoratör olarak bu yapıların mimari zekasına hayranlık duymamak elde değil.",
    section1p2:
      "Yüzyıllar boyunca bölge halkı, tarımda verimi artırmak ve bağlarını bereketlendirmek için güvercin gübresine ihtiyaç duymuş ve vadilerin dik yamaçlarına bu etkileyici yuvaları oymuştur.",
    pullQuote: "\"Güvercin yuvası olmayan adama gelin vermezler.\"",
    pullQuoteAttrib: "— Yöresel deyiş",
    section1p3:
      "Yürüyüşünüz sırasında dikkatli bakarsanız, bu yuvaların girişlerinde sansar gibi yırtıcıları uzak tutmak için yapılmış özel boyamaları ve mimari detayları görebilirsiniz. Bu süslemelerde kullanılan kırmızı aşı boyası (yoşa), antik çağlardan beri bölgeye özgü bir gelenektir.",
    section2Label: "En Doğru Zaman",
    section2Title: "Gün Batımını Yakalamak",
    section2p1:
      "Yürüyüş için en doğru zaman, güneşin etkisini yavaşça azalttığı ikindi vaktidir. Güneş alçalırken vadi yamaçları altın sarısından kızıla dönen bir renk şöleni sunar.",
    section2p2:
      "Bu rota sadece görsel bir şölen değil, aynı zamanda Ortahisar'ın tarihi mekânları ve doğal güzellikleriyle iç içe geçen, doğayla bütünleşebileceğiniz sessiz bir kaçıştır.",
    infoGrid: [
      {
        label: "En İyi Vakit",
        text: "İkindi — gün batımından 2 saat önce yola çıkmak, ışığı en verimli şekilde yakalamanızı sağlar.",
      },
      {
        label: "Başlangıç Noktası",
        text: "Ortahisar Kalesi çıkışı — Anitya Cave House'dan yürüyerek 5 dakika mesafededir.",
      },
    ],
    closingLabel: "Dönüşte",
    closingQuote:
      "Rotanızı tamamlayıp Anitya Cave House'a döndüğünüzde, günün yorgunluğunu milyonlarca yıllık jeolojik enerjiyi saklayan mağara odanızda veya Erciyes Dağı'na karşı terasımızda atabilirsiniz.",
    finalLine:
      "Sizi, taşın hafızasında bir yolculuğa, Güvercin Vadisi'nin sessizliğine bekliyoruz.",
    ctaSuites: "Suitlerimizi Keşfedin",
    ctaBlog: "← Blog'a Dön",
  },

  en: {
    heroLabel: "Routes · December 2025",
    heroTitle: "Sunset from Pigeon Valley: A Walking Guide",
    imageAlt: "Cappadocia fairy chimneys and valley panorama",
    categoryChip: "Routes · December 2025",
    intro1:
      "From the terrace or living room of Anitya Cave House in Ortahisar — the very heart of Cappadocia — the deep hollows and valleys stretching out before you are not merely a view. They are a living record of thousands of years of farming and human culture.",
    intro2:
      "As I always tell our guests: the best way to truly understand this landscape is not to observe it from a distance but to step inside it — to breathe the dust of the tuff rock and walk among the formations themselves. Pigeon Valley, just a short distance from Ortahisar, offers nature lovers a remarkable hiking route winding through fairy chimneys, rocky outcrops and ancient orchards.",
    section1Label: "Traces of History",
    section1Title: "Why \"Pigeon\" Valley?",
    section1p1:
      "The moment you enter the valley, small windows carved high into the cliff faces will catch your eye. As a restorer, it is impossible not to marvel at the architectural ingenuity behind these structures.",
    section1p2:
      "For centuries, the local people depended on pigeon droppings to enrich their soil and bless their vineyards. To secure that vital resource, they carved these remarkable dovecotes into the steep valley walls — a practical art that endures to this day.",
    pullQuote:
      "\"They won't give a bride to a man without a pigeon coop.\"",
    pullQuoteAttrib: "— Local proverb",
    section1p3:
      "If you look closely as you walk, you will notice intricate painted patterns and architectural details at the entrance of each dovecote — designed to keep predators such as martens at bay. The deep red ochre pigment used in these decorations, known locally as yoşa, is a tradition unique to this region that stretches back to antiquity.",
    section2Label: "Perfect Timing",
    section2Title: "Catching the Sunset",
    section2p1:
      "The ideal time to set out is the late afternoon, when the sun begins to soften and lose its midday intensity. As it descends, the valley slopes erupt in a pageant of colour — shifting from burnished gold to deep amber and finally to crimson.",
    section2p2:
      "This route is more than a visual spectacle. It is a quiet escape woven into the historic landmarks and natural beauty of Ortahisar — a place where you can shed the noise of everyday life and feel genuinely at one with the landscape.",
    infoGrid: [
      {
        label: "Best Time",
        text: "Late afternoon — setting off around two hours before sunset lets you make the most of the golden light.",
      },
      {
        label: "Starting Point",
        text: "The exit of Ortahisar Castle — just a five-minute walk from Anitya Cave House.",
      },
    ],
    closingLabel: "On Your Return",
    closingQuote:
      "When you complete the route and return to Anitya Cave House, you can shed the day's tiredness in your cave room — which holds within it millions of years of geological energy — or simply sit on our terrace and watch the last light fade behind Mount Erciyes.",
    finalLine:
      "We look forward to welcoming you on a journey through the memory of stone and into the silence of Pigeon Valley.",
    ctaSuites: "Explore Our Suites",
    ctaBlog: "← Back to Blog",
  },

  zh: {
    heroLabel: "路线 · 2025年12月",
    heroTitle: "鸽子谷的日落：徒步指南",
    imageAlt: "卡帕多西亚仙烟囱与山谷全景",
    categoryChip: "路线 · 2025年12月",
    intro1:
      "从奥尔塔希萨尔——卡帕多西亚的心脏地带——Anitya Cave House的露台或客厅望出去，眼前那片深邃的沟壑与山谷，远不止是一幅风景。它们是数千年农耕文明与人类生活方式的活态见证。",
    intro2:
      "正如我常对住客们所说：真正了解这片土地的最佳方式，不是远远地观望，而是亲身走进去——让凝灰岩的尘土沾上鞋底，在那些地貌奇观之间穿行。紧邻奥尔塔希萨尔的鸽子谷，为热爱自然的旅人献上一条穿越仙烟囱、岩石地貌与古老果园的绝美徒步路线。",
    section1Label: "历史的印记",
    section1Title: "为何叫\"鸽子\"谷？",
    section1p1:
      "踏入山谷的那一刻，高悬于崖壁之上的小窗口会立刻吸引你的目光。作为一名修复师，面对这些建筑杰作所蕴含的匠心与智慧，几乎无法不动容。",
    section1p2:
      "数百年来，当地人依赖鸽粪来肥沃土地、滋养葡萄园。为了守住这份不可或缺的资源，他们将这些令人叹为观止的鸽舍凿入陡峭的谷壁之中——一种融实用与艺术于一体的传统，延续至今。",
    pullQuote: "\"没有鸽舍的男人娶不到新娘。\"",
    pullQuoteAttrib: "— 当地谚语",
    section1p3:
      "徒步途中若仔细观察，会在每处鸽舍入口发现精心绘制的图案与建筑细节——那是用来阻挡貂等天敌的巧思之作。这些装饰所用的深红色赭石颜料，当地称为yoşa，是一项自古代便流传至今、独属于这片土地的传统。",
    section2Label: "最佳时机",
    section2Title: "追赶日落",
    section2p1:
      "出发的最佳时机是午后，此时阳光开始变得柔和，失去正午的炽烈。随着太阳渐渐西沉，谷壁上演一场色彩的盛宴——从灿烂的金黄，渐变为深沉的琥珀，最终燃烧成赤红。",
    section2p2:
      "这条路线不仅仅是视觉上的盛宴。它是一段静谧的出走，与奥尔塔希萨尔的历史遗迹和自然之美相互交融——在这里，你可以卸下日常生活的喧嚣，真正与大地融为一体。",
    infoGrid: [
      {
        label: "最佳时段",
        text: "傍晚时分——在日落前约两小时出发，可以最充分地享受金色的光线。",
      },
      {
        label: "出发地点",
        text: "奥尔塔希萨尔城堡出口——距Anitya Cave House步行仅需5分钟。",
      },
    ],
    closingLabel: "归途",
    closingQuote:
      "当你完成这段路线、回到Anitya Cave House时，可以在那间储存着数百万年地质能量的洞穴客房里卸下一天的疲惫，或是坐在露台上，望着最后的余晖在埃尔吉耶斯山背后缓缓熄灭。",
    finalLine:
      "我们期待在这里迎接你——踏上一段穿越岩石记忆的旅程，走入鸽子谷永恒的静默之中。",
    ctaSuites: "探索我们的套房",
    ctaBlog: "← 返回博客",
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { locale } = await params;
  const c = content[locale as keyof typeof content] ?? content.tr;
  const baseUrl = 'https://anityacavehouse.com';
  const slug = 'guvercin-vadisi-gun-batimi-yuruyus-rehberi';

  const metadata = {
    tr: { title: 'Güvercin Vadisi\'nden Gün Batımı: Yürüyüş Rehberi', author: 'Anitya Cave House' },
    en: { title: 'Sunset from Pigeon Valley: Hiking Guide', author: 'Anitya Cave House' },
    zh: { title: '鸽子谷日落：徒步指南', author: 'Anitya Cave House' },
  };
  const meta = metadata[locale as keyof typeof metadata] || metadata.tr;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: meta.title,
            author: { '@type': 'Organization', name: meta.author },
            publisher: { '@type': 'Organization', name: 'Anitya Cave House', logo: { '@type': 'ImageObject', url: `${baseUrl}/images/cappadocia-cave-house.avif` } },
            datePublished: '2025-12-01T00:00:00Z',
            dateModified: '2025-12-01T00:00:00Z',
            url: `${baseUrl}/${locale}/blog/${slug}`,
            inLanguage: locale,
          }),
        }}
      />
      <Header2026 />

      {/* Hero */}
      <PageHero
        label={c.heroLabel}
        title={c.heroTitle}
        imageSrc="/images/blog-images/2.avif"
        imageAlt={c.imageAlt}
      />

      {/* Article body */}
      <SectionShell>
        <div className="max-w-[68ch] mx-auto">
          <div className="bg-white/45 border border-black/5 rounded-2xl p-8 md:p-12">

            {/* Category + date */}
            <Reveal>
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-10">
                {c.categoryChip}
              </p>
            </Reveal>

            {/* Intro */}
            <div className="space-y-6 mb-14">
              <Reveal>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.intro1}
                </p>
              </Reveal>
              <Reveal delayMs={80}>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.intro2}
                </p>
              </Reveal>
            </div>

            {/* Section 1 heading */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  {c.section1Label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {c.section1Title}
                </h2>
              </div>
            </Reveal>

            {/* Section 1 body */}
            <div className="space-y-6 mb-10">
              <Reveal>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.section1p1}
                </p>
              </Reveal>
              <Reveal delayMs={80}>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.section1p2}
                </p>
              </Reveal>
            </div>

            {/* Pull quote */}
            <Reveal delayMs={60}>
              <div className="border-l-2 border-neutral-300 pl-8 mb-10 space-y-3">
                <p className="font-serif text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
                  {c.pullQuote}
                </p>
                <p className="text-sm text-neutral-500">{c.pullQuoteAttrib}</p>
              </div>
            </Reveal>

            {/* Section 1 continued */}
            <div className="space-y-6 mb-14">
              <Reveal>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.section1p3}
                </p>
              </Reveal>
            </div>

            {/* Divider */}
            <div className="h-px bg-neutral-200 mb-14" />

            {/* Section 2 heading */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  {c.section2Label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {c.section2Title}
                </h2>
              </div>
            </Reveal>

            {/* Section 2 body */}
            <div className="space-y-6 mb-10">
              <Reveal>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.section2p1}
                </p>
              </Reveal>
              <Reveal delayMs={80}>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.section2p2}
                </p>
              </Reveal>
            </div>

            {/* Practical info grid */}
            <Reveal delayMs={40}>
              <div className="grid md:grid-cols-2 gap-8 mb-14">
                {c.infoGrid.map((item) => (
                  <div key={item.label} className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                      {item.label}
                    </p>
                    <p className="text-base text-neutral-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Closing highlight box */}
            <Reveal>
              <div className="bg-stone-100/60 rounded-xl px-8 py-10 space-y-5 mb-14">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">
                  {c.closingLabel}
                </p>
                <p className="font-serif text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
                  {c.closingQuote}
                </p>
              </div>
            </Reveal>

            {/* Final line */}
            <div className="space-y-6">
              <Reveal>
                <p className="font-serif text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
                  {c.finalLine}
                </p>
              </Reveal>
            </div>

          </div>
        </div>
      </SectionShell>

      {/* CTA */}
      <SectionShell className="pt-0 md:pt-0 pb-20 md:pb-28">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/rooms"
              className="px-8 py-3.5 rounded-full bg-neutral-900 text-white text-sm tracking-wide hover:bg-neutral-700 transition-colors duration-300"
            >
              {c.ctaSuites}
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3.5 rounded-full border border-neutral-900 text-neutral-900 text-sm tracking-wide hover:bg-neutral-900 hover:text-white transition-all duration-300"
            >
              {c.ctaBlog}
            </Link>
          </div>
        </Reveal>
      </SectionShell>

      <Footer />
    </div>
  );
}
