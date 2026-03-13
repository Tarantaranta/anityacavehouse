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
  const slug = 'teras-sabahlari-balonlar-ve-sessizlik';

  const metadata = {
    tr: {
      title: 'Teras Sabahları: Balonlar ve Sessizlik',
      description: 'Anitya\'nın terasında balon gösterisini izlemek. Kapadokya\'da sabahın büyüsü, sessizlik ve uçan renkli balonlar.',
    },
    en: {
      title: 'Terrace Mornings: Balloons and Silence',
      description: 'Watching the balloon show from Anitya\'s terrace. The magic of morning in Cappadocia, silence and flying colorful balloons.',
    },
    zh: {
      title: '露台的早晨：气球与寂静',
      description: '从Anitya的露台观看气球表演。卡帕多西亚早晨的魔力、宁静和飞翔的彩色气球。',
    },
  };

  const l = locale as 'tr' | 'en' | 'zh';
  const meta = metadata[l] || metadata.tr;

  return {
    title: meta.title,
    description: meta.description,
    keywords: locale === 'tr'
      ? 'kapadokya balonu, teras manzarası, ortahisar, sabah deneyimi, balon izleme'
      : locale === 'en'
      ? 'cappadocia balloon, terrace view, ortahisar, morning experience, balloon watching'
      : '卡帕多西亚气球, 露台景观, 奥塔希萨尔, 早晨体验, 观看气球',

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
      publishedTime: '2025-11-01T00:00:00Z',
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
    heroLabel: "Ortahisar · Kasım 2025",
    heroTitle: "Teras Sabahları: Balonlar ve Sessizlik",
    imageAlt: "Anitya terasından Kapadokya balonları",
    chipLabel: "Ortahisar · Kasım 2025",
    intro: [
      "Kapadokya'da sabah, güneşten önce uyanır. Anitya Cave House'un terasına adım attığınızda, sizi önce derin bir sessizlik, ardından gökyüzünde beliren renkli bir şölen karşılar.",
      "Bir restoratör olarak bu evi tasarlarken en büyük hayalimiz, misafirlerimizin bu terasta durup, zamanın ve coğrafyanın akışına şahitlik etmeleriydi.",
    ],
    section1: {
      label: "Gökyüzü Koreografisi",
      title: "Gökyüzünde Dans Eden Devler",
      paragraphs: [
        "Sabahın ilk ışıklarıyla birlikte, Göreme vadilerinden havalanan yüzlerce sıcak hava balonu, gökyüzünü yavaşça kaplamaya başlar. Anitya, Ortahisar Kalesi ve Erciyes Dağı'na bakan konumuyla bu manzarayı en geniş perspektiften izleyebileceğiniz nadir noktalardan biridir.",
        "Balonlar, peribacalarının arasından süzülüp yükselirken, siz elinizde kahvenizle bu sessiz koreografiyi izlersiniz.",
      ],
    },
    pullQuote:
      "Ortahisar, Göreme'nin kalabalığından uzakta olduğu için buradaki sabahlar telaşsızdır. Balonların \"fısss\" sesi rüzgarla size taşınırken, karşınızda tüm heybetiyle duran Ortahisar Kalesi ve heybetli Erciyes Dağı, milyonlarca yıllık bir hikayeyi fısıldar.",
    section2: {
      label: "Felsefe",
      title: "Anitya: Geçiciliğin Güzelliği",
      paragraphs: [
        <>
          İsmimiz olan <em>Anitya</em>, Sanskritçe&apos;de &ldquo;geçicilik&rdquo; anlamına gelir; hayatta hiçbir şeyin sabit olmadığını, her şeyin bir akış halinde olduğunu hatırlatır.
        </>,
        "Terasımızdan balonları izlerken bu felsefeyi derinden hissedersiniz. O an gökyüzünde süzülen görüntü bir daha asla birebir aynı şekilde tekrarlanmayacak — sadece o ana özel, geçici ama kusursuz bir tablodur.",
      ],
    },
    section3: {
      label: "Teras Ritüeli",
      title: "Güne Başlarken",
      paragraphs: [
        "Bu görsel şölen sona erdiğinde, terasımızdaki masanızda yöresel lezzetlerle hazırlanan kahvaltınız sizi bekler. Güvercinlik Vadisi'ne ve köy evlerine bakan bu alanda, taşın serinliği ve güneşin sıcaklığı birbirine karışır.",
      ],
    },
    closingBox: {
      label: "Davet",
      quote:
        "Sizi, sadece bir manzarayı izlemeye değil, Anitya'nın terasında o \"an\"ın bir parçası olmaya davet ediyoruz. Çünkü Kapadokya'yı anlamak, onun sessizliğini dinlemekle başlar.",
    },
    ctaSuites: "Suitlerimizi Keşfedin",
    ctaBlog: "← Blog'a Dön",
  },

  en: {
    heroLabel: "Ortahisar · November 2025",
    heroTitle: "Terrace Mornings: Balloons and Silence",
    imageAlt: "Hot air balloons over Cappadocia seen from the Anitya terrace",
    chipLabel: "Ortahisar · November 2025",
    intro: [
      "In Cappadocia, morning wakes before the sun. The moment you step onto the terrace of Anitya Cave House, a deep and unhurried silence greets you — and then, one by one, the sky begins to fill with colour.",
      "When we restored this house, our greatest hope was that our guests would stand here and bear witness to the quiet passage of time and landscape.",
    ],
    section1: {
      label: "A Choreography of the Sky",
      title: "Giants Dancing in the Air",
      paragraphs: [
        "With the first light of morning, hundreds of hot air balloons lift from the valleys of Göreme and slowly lay claim to the sky. Facing Ortahisar Castle and Mount Erciyes, Anitya occupies one of the rare vantage points from which this scene can be taken in at its fullest breadth.",
        "As the balloons drift and rise through the fairy chimneys below, you stand with your coffee and watch — a silent witness to a choreography that belongs to no one and to everyone.",
      ],
    },
    pullQuote:
      "Because Ortahisar sits apart from the bustle of Göreme, mornings here carry no urgency. The soft hiss of the balloons drifts to you on the breeze, while Ortahisar Castle and the great mass of Mount Erciyes stand opposite, whispering a story millions of years in the making.",
    section2: {
      label: "Philosophy",
      title: "Anitya: The Beauty of Impermanence",
      paragraphs: [
        <>
          Our name, <em>Anitya</em>, comes from Sanskrit and means &ldquo;impermanence&rdquo; — a quiet reminder that nothing in life is fixed, that everything exists in a state of flow.
        </>,
        "Watching the balloons from our terrace, you feel this philosophy in your bones. The tableau suspended in the sky at that precise moment will never be replicated exactly — it belongs only to that instant, fleeting and yet utterly complete.",
      ],
    },
    section3: {
      label: "The Terrace Ritual",
      title: "Beginning the Day",
      paragraphs: [
        "When the aerial spectacle draws to a close, breakfast awaits you at your terrace table — a spread of local flavours prepared with care. Overlooking Pigeon Valley and the village rooftops, the cool of the stone and the warmth of the rising sun meet here in quiet equilibrium.",
      ],
    },
    closingBox: {
      label: "An Invitation",
      quote:
        "We invite you not merely to observe a view, but to become part of the moment itself — here, on the terrace of Anitya. For understanding Cappadocia begins with learning to listen to its silence.",
    },
    ctaSuites: "Explore Our Suites",
    ctaBlog: "← Back to Blog",
  },

  zh: {
    heroLabel: "奥尔塔希萨尔 · 2025年11月",
    heroTitle: "露台早晨：气球与寂静",
    imageAlt: "从Anitya露台望去的卡帕多西亚热气球",
    chipLabel: "奥尔塔希萨尔 · 2025年11月",
    intro: [
      "在卡帕多西亚，黎明先于太阳而醒。当你踏上Anitya Cave House的露台，迎接你的先是一片深邃的寂静，而后，天空中一点一点地绽放出缤纷的色彩。",
      "我们修复这座老宅时，最深切的期望便是：愿每一位来宾都能在这片露台上驻足，亲历时间与大地无声流淌的姿态。",
    ],
    section1: {
      label: "天空的编舞",
      title: "翱翔苍穹的巨人们",
      paragraphs: [
        "晨光初破，数百只热气球从格雷梅山谷徐徐升起，将天幕缓缓铺满。Anitya正对奥尔塔希萨尔城堡与埃尔吉亚斯山，是极少数能以最宽广视野俯瞰这一奇景的地方之一。",
        "气球在仙人烟囱之间轻盈穿行、缓缓上升，而你端着咖啡，静静注视着这场无声的编舞——你是这一刻唯一的见证者。",
      ],
    },
    pullQuote:
      "奥尔塔希萨尔远离格雷梅的喧嚣，这里的清晨从容而不慌乱。气球轻柔的\"嘶嘶\"声随风飘来，对面巍然矗立的奥尔塔希萨尔城堡与雄浑的埃尔吉亚斯山，低语着数百万年的故事。",
    section2: {
      label: "哲学",
      title: "Anitya：无常之美",
      paragraphs: [
        <>
          我们的名字 <em>Anitya</em>，源自梵语，意为&ldquo;无常&rdquo;——轻柔地提醒着我们：生命中没有什么是永恒不变的，万物皆在流动之中。
        </>,
        "在露台上凝望气球时，你会从内心深处感受到这份哲学。此刻悬浮于天空的画面，永远不会以完全相同的方式重现——它只属于这一瞬间，短暂却浑然完美。",
      ],
    },
    section3: {
      label: "露台仪式",
      title: "开启新的一天",
      paragraphs: [
        "当天空的盛景渐渐落幕，露台上的桌边早已为你备好早餐——以当地风味精心准备的一桌美食。俯瞰鸽子谷与村落屋顶，石材的清凉与初升太阳的暖意在此悄然交融。",
      ],
    },
    closingBox: {
      label: "邀请",
      quote:
        "我们邀请你，不仅仅是来欣赏一道风景，更是来成为这一刻的一部分——就在Anitya的露台上。因为理解卡帕多西亚，始于学会聆听它的寂静。",
    },
    ctaSuites: "探索我们的套房",
    ctaBlog: "← 返回博客",
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { locale } = await params;
  const c = content[locale as keyof typeof content] ?? content.tr;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      <Header2026 />

      {/* Hero */}
      <PageHero
        label={c.heroLabel}
        title={c.heroTitle}
        imageSrc="/images/anitya-cave-suite/tmpnxcvbn0s.png.avif"
        imageAlt={c.imageAlt}
      />

      {/* Article body */}
      <SectionShell>
        <div className="max-w-[68ch] mx-auto">
          <div className="bg-white/45 border border-black/5 rounded-2xl p-8 md:p-12">

            {/* Category chip */}
            <Reveal>
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-10">
                {c.chipLabel}
              </p>
            </Reveal>

            {/* Intro */}
            <div className="space-y-6 mb-14">
              {c.intro.map((paragraph, i) => (
                <Reveal key={i} delayMs={i === 0 ? 0 : 80}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Section 1 heading */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  {c.section1.label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {c.section1.title}
                </h2>
              </div>
            </Reveal>

            {/* Section 1 content */}
            <div className="space-y-6 mb-10">
              {c.section1.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delayMs={i === 0 ? 0 : 80}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Pull quote */}
            <Reveal delayMs={60}>
              <div className="border-l-2 border-neutral-300 pl-8 mb-14 space-y-3">
                <p className="font-serif text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
                  {c.pullQuote}
                </p>
              </div>
            </Reveal>

            {/* Divider */}
            <div className="h-px bg-neutral-200 mb-14" />

            {/* Section 2 heading */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  {c.section2.label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {c.section2.title}
                </h2>
              </div>
            </Reveal>

            {/* Section 2 content */}
            <div className="space-y-6 mb-10">
              {c.section2.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delayMs={i === 0 ? 0 : 80}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-neutral-200 mb-14" />

            {/* Section 3 heading */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  {c.section3.label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {c.section3.title}
                </h2>
              </div>
            </Reveal>

            {/* Section 3 content */}
            <div className="space-y-6 mb-10">
              {c.section3.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delayMs={i === 0 ? 0 : 80}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Closing emphasis box */}
            <Reveal>
              <div className="bg-stone-100/60 rounded-xl px-8 py-10 space-y-5 mb-14">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">
                  {c.closingBox.label}
                </p>
                <p className="font-serif text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
                  {c.closingBox.quote}
                </p>
              </div>
            </Reveal>

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
