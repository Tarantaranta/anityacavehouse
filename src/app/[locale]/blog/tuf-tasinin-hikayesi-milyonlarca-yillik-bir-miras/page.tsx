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
  const slug = 'tuf-tasinin-hikayesi-milyonlarca-yillik-bir-miras';

  const metadata = {
    tr: {
      title: 'Tüf Taşının Hikâyesi: Milyonlarca Yıllık Bir Miras',
      description: 'Kapadokya\'nın tüf taşları Erciyes\'in volkanik külleriyle oluştu. Milyonlarca yıllık jeolojik sürecin ve medeniyetlerin mirası.',
    },
    en: {
      title: 'The Story of Tufa Stone: A Million-Year Legacy',
      description: 'Cappadocia\'s tufa rocks formed from volcanic ash of Erciyes. A legacy of millions of years of geological process and civilizations.',
    },
    zh: {
      title: '凝灰岩的故事：数百万年的遗产',
      description: '卡帕多西亚的凝灰岩由埃尔吉耶火山灰形成。数百万年地质过程和文明的遗产。',
    },
  };

  const l = locale as 'tr' | 'en' | 'zh';
  const meta = metadata[l] || metadata.tr;

  return {
    title: meta.title,
    description: meta.description,
    keywords: locale === 'tr'
      ? 'tüf taşı, kapadokya jeolojisi, volkanik kayalar, erciyes, peribacaları'
      : locale === 'en'
      ? 'tufa stone, cappadocia geology, volcanic rocks, erciyes, fairy chimneys'
      : '凝灰岩, 卡帕多西亚地质, 火山岩, 仙人烟囱',

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
      publishedTime: '2025-09-01T00:00:00Z',
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
    heroLabel: "Taşın Hikâyesi · Eylül 2025",
    heroTitle: "Tüf Taşının Hikâyesi: Milyonlarca Yıllık Bir Miras",
    heroAlt: "Kapadokya tüf kaya oluşumları",
    categoryChip: "Taşın Hikâyesi · Eylül 2025",

    intro:
      "Anitya Cave House'un bir odasında uyandığınızda, aslında sadece bir odada değil, milyonlarca yıl süren bir jeolojik anın içinde uyanırsınız. Bir restoratör olarak duvarlara her dokunuşumda hissettiğim o ürpertiyi, misafirlerimizin de hissetmesini isterim. Çünkü bu doku, insanlık tarihinden çok daha eskiye, ateşin ve suyun dansına dayanır.",

    section1Label: "Denizden Ateşe",
    section1Title: "Kapadokya'nın Doğuşu",
    section1p1:
      "İnanması güç olsa da, şu an üzerinde yürüdüğümüz, vadilerini izlediğimiz bu topraklar milyonlarca yıl önce bir iç denizdi. Toros Dağları'nın yükselmesiyle sıkışan Anadolu plakası, yerin derinliklerindeki öfkeyi yüzeye çıkardı. Ufukta gördüğünüz o vakur devler; Erciyes, Hasandağı ve Güllüdağ, bir zamanlar bu coğrafyanın en hırçın sanatçılarıydı.",
    section1p2:
      "Milyonlarca yıl boyunca bu yanardağlar, bölgeye lav ve — daha da önemlisi — yoğun volkanik kül (tüf) püskürttü. Gökyüzünü karartan bu küller, zamanla yere inerek sıkıştı ve bugün \"tüf\" dediğimiz o yumuşak, işlenebilir ama bir o kadar da dirençli kayaç yapısını oluşturdu.",

    section2Label: "Rüzgârın ve Suyun Sabrı",
    section2Title: "Peribacalarının Doğuşu",
    section2p1:
      "Volkanlar sustuğunda, sahneye rüzgâr ve yağmur çıktı. Kızılırmak (antik Halys) ve sel suları, bu yumuşak tüf tabakasını milyonlarca yıl boyunca aşındırdı. Sert bazalt kayaların altındaki yumuşak tüfü korumasıyla, bugün hayranlıkla izlediğimiz peribacaları — yani doğanın heykelleri — ortaya çıktı.",

    section3Label: "Nefes Alan Duvarlar",
    section3Title: "Tüfün Mühendislik Harikası",
    section3p1:
      "Biz Anitya'yı restore ederken, bu taşın mühendislik harikası özelliklerine bir kez daha hayran kaldık. Kapadokya tüfü, ocaktan ilk çıkarıldığında veya ilk oyulduğunda yumuşaktır; işlenmesi kolaydır. Ancak hava ile temas ettiğinde oksitlenerek sertleşir ve inanılmaz bir dayanıklılığa kavuşur.",
    section3p2:
      "Anitya'daki odanızda klimaya ihtiyaç duymamanızın sebebi, bu taşın \"nefes alan\" yapısıdır. Volkanik gözenekler sayesinde tüf kayalar, mükemmel bir ısı yalıtımı sağlar. Dışarısı kavurucu sıcakken içerisi serin (yazın ortalama 15°C), dışarısı kar altındayken içerisi ılıktır. Bu, binlerce yıl önce Hititlerin, Romalıların ve ilk Hıristiyanların neden yerin altına ve kayaların içine sığındığının en bilimsel cevabıdır.",

    section4Label: "Taşın Rengi",
    section4Title: "Yoşa",
    section4p1:
      "Odanızın duvarlarında veya Ortahisar'ın vadilerinde göreceğiniz kızıl, pembe ve hardal tonları birer tesadüf değildir. Bu renkler, toprağın içindeki demir oksitten gelir. Bölge halkı ve Avanoslu çömlekçiler, yüzyıllardır \"Yoşa\" adını verdikleri bu kızıl toprağı hem seramiklerinde hem de kiliselerin fresklerinde boya olarak kullanmıştır.",

    final:
      "Anitya Cave House'da konaklamak, betonarme bir yapının soğukluğundan uzaklaşıp, doğanın milyonlarca yılda pişirdiği, rüzgârla yonttuğu ve insanın el iziyle şekillendirdiği yaşayan bir organizmanın parçası olmaktır. Burada, taşın sessiz bilgeliğine kulak verin. Size anlatacak milyonlarca yıllık bir hikâyesi var.",

    ctaSuites: "Suitlerimizi Keşfedin",
    ctaBlog: "← Blog'a Dön",
  },

  en: {
    heroLabel: "Stone Stories · September 2025",
    heroTitle: "The Story of Tuff Stone: Millions of Years of Heritage",
    heroAlt: "Cappadocia tuff rock formations",
    categoryChip: "Stone Stories · September 2025",

    intro:
      "When you wake in one of Anitya Cave House's rooms, you are not simply waking in a room — you are waking inside a geological moment that has lasted millions of years. As a restorer, I felt a quiet shiver every time I touched these walls, and I wish for our guests to feel it too. For this texture reaches far beyond human history, back to the very dance of fire and water.",

    section1Label: "From Sea to Fire",
    section1Title: "The Birth of Cappadocia",
    section1p1:
      "It is difficult to believe, yet the ground beneath our feet — these valleys we gaze across today — was an inland sea millions of years ago. As the Taurus Mountains rose and the Anatolian plate compressed, the fury buried deep within the earth found its way to the surface. The majestic giants visible on the horizon — Erciyes, Hasan Mountain, and Güllüdağ — were once the wildest artists this landscape had ever known.",
    section1p2:
      "For millions of years, these volcanoes expelled lava and — more significantly — dense volcanic ash across the region. Darkening the sky as they fell, these particles slowly settled and compressed over time, forming the soft, workable yet remarkably resilient rock we call tuff today.",

    section2Label: "The Patience of Wind and Water",
    section2Title: "The Birth of the Fairy Chimneys",
    section2p1:
      "When the volcanoes fell silent, wind and rain took the stage. The Kızılırmak River — the ancient Halys — and floodwaters eroded this soft tuff layer over millions of years. Where harder basalt caps protected the softer tuff below, the fairy chimneys emerged — nature's own sculptures — standing in silent wonder as we admire them today.",

    section3Label: "Breathing Walls",
    section3Title: "The Engineering Marvel of Tuff",
    section3p1:
      "Restoring Anitya, we were once again struck by the extraordinary engineering properties of this stone. Cappadocian tuff is soft when first quarried or carved — easy to work. But upon contact with air it oxidises and hardens, acquiring a remarkable durability.",
    section3p2:
      "The reason your room at Anitya requires no air conditioning lies in the stone's \"breathing\" structure. Thanks to its volcanic pores, tuff provides superb thermal insulation. When it is sweltering outside, the interior stays cool — around 15°C in summer; when snow blankets the landscape, the interior remains warm. This is the most scientific answer to why the Hittites, Romans, and early Christians sought shelter underground and within the rock thousands of years ago.",

    section4Label: "The Colour of Stone",
    section4Title: "Yoşa",
    section4p1:
      "The crimson, pink, and mustard tones you will notice on your room's walls, or in the valleys of Ortahisar, are no accident. These colours come from the iron oxide within the earth. For centuries, the local people and the potters of Avanos have used this red clay — which they call Yoşa — as a pigment in their ceramics and in the frescoes of their churches.",

    final:
      "To stay at Anitya Cave House is to step away from the coldness of reinforced concrete and to become part of a living organism — one that nature fired over millions of years, carved by wind, and shaped by the mark of human hands. Listen here to the quiet wisdom of the stone. It has a story millions of years in the telling.",

    ctaSuites: "Explore Our Suites",
    ctaBlog: "← Back to Blog",
  },

  zh: {
    heroLabel: "石头故事 · 2025年9月",
    heroTitle: "凝灰岩的故事：数百万年的遗产",
    heroAlt: "卡帕多西亚凝灰岩地貌",
    categoryChip: "石头故事 · 2025年9月",

    intro:
      "当您在阿尼提亚洞穴旅舍的某间客房中醒来，您醒来的地方并非只是一间普通的房间——而是一个延续了数百万年的地质瞬间的内部。作为修复者，每次触碰这些墙壁时，我都会感到一阵难以言说的震颤；我希望我们的客人也能感受到这一切。因为这种质地所承载的，远比人类历史更为久远，它可以追溯到火与水共舞的太古时代。",

    section1Label: "从海洋到烈火",
    section1Title: "卡帕多西亚的诞生",
    section1p1:
      "这令人难以置信，然而我们今日所踏足、所凝望的这片土地，数百万年前曾是一片内陆海。随着托罗斯山脉的隆起，安纳托利亚板块受到挤压，深埋于大地之中的烈焰终于冲破地表。地平线上那些巍然矗立的伟岸身影——埃尔吉耶斯山、哈桑山与居吕达格——曾是这片土地上最狂野的艺术家。",
    section1p2:
      "数百万年间，这些火山向这一地区喷涌出熔岩，更重要的是，喷涌出大量的火山灰。遮天蔽日的火山灰缓缓落下，随着岁月流逝逐渐压缩，最终形成了我们今日所称的\"凝灰岩\"——那种柔软、易于雕凿，却又出人意料地坚韧的岩石。",

    section2Label: "风与水的耐心",
    section2Title: "精灵烟囱的诞生",
    section2p1:
      "当火山归于沉寂，风与雨接过了舞台。克孜勒依尔马克河——古代的哈利斯河——以及洪水，历经数百万年不断侵蚀着这层柔软的凝灰岩。在坚硬玄武岩帽岩的庇护下，其下的软质凝灰岩得以留存，由此诞生了我们今日赞叹的精灵烟囱——大自然自己雕刻的塑像，在风中静默伫立。",

    section3Label: "会呼吸的墙壁",
    section3Title: "凝灰岩的工程奇迹",
    section3p1:
      "修复阿尼提亚的过程中，我们再次为这种石头卓越的工程特性所折服。卡帕多西亚的凝灰岩在最初被开采或雕凿时质地柔软，易于加工。然而一旦与空气接触，它便开始氧化硬化，获得令人惊叹的耐久性。",
    section3p2:
      "阿尼提亚的客房无需空调，原因正在于这种石头的\"呼吸\"结构。得益于火山气孔，凝灰岩提供了出色的热绝缘性能。室外烈日炎炎时，室内依然清凉（夏季平均约15摄氏度）；室外白雪皑皑时，室内仍然温暖如春。这正是数千年前赫梯人、罗马人与早期基督徒选择在地下与岩石内部寻求庇护的最科学答案。",

    section4Label: "石头的颜色",
    section4Title: "约沙",
    section4p1:
      "您在客房墙壁上或奥塔希萨尔山谷中所见的那些绛红、粉红与芥黄色调，绝非偶然。这些颜色来自土壤中的氧化铁。数百年来，当地居民与阿瓦诺斯的陶艺工匠一直将这种被称为\"约沙\"（Yoşa）的红土用作颜料，无论是在陶瓷制品还是教堂壁画中，皆有其身影。",

    final:
      "在阿尼提亚洞穴旅舍留宿，是从钢筋混凝土的冰冷中抽身而出，成为一个活着的有机体的一部分——那个有机体由大自然历经数百万年烧制而成，经由风的雕凿，再由人类的双手赋予最终的形态。在这里，请倾听石头的沉静智慧。它有一个绵延数百万年的故事，等待着向您娓娓道来。",

    ctaSuites: "探索我们的套房",
    ctaBlog: "← 返回博客",
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { locale } = await params;
  const c = content[locale as keyof typeof content] ?? content.tr;
  const baseUrl = 'https://anityacavehouse.com';
  const slug = 'tuf-tasinin-hikayesi-milyonlarca-yillik-bir-miras';

  const metadata = {
    tr: { title: 'Tüf Taşının Hikâyesi: Milyonlarca Yıllık Bir Miras', author: 'Anitya Cave House' },
    en: { title: 'The Story of Tufa Stone: A Million-Year Legacy', author: 'Anitya Cave House' },
    zh: { title: '凝灰岩的故事：数百万年的遗产', author: 'Anitya Cave House' },
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
            datePublished: '2025-09-01T00:00:00Z',
            dateModified: '2025-09-01T00:00:00Z',
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
        imageSrc="/images/blog-images/5.avif"
        imageAlt={c.heroAlt}
      />

      {/* Article body */}
      <SectionShell>
        <div className="max-w-[68ch] mx-auto">
          <div className="bg-white/45 border border-black/5 rounded-2xl p-8 md:p-12">

            {/* Category chip */}
            <Reveal>
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-10">
                {c.categoryChip.split(" · ")[0]}{" "}
                <span className="text-neutral-300">·</span>{" "}
                {c.categoryChip.split(" · ")[1]}
              </p>
            </Reveal>

            {/* Intro */}
            <div className="space-y-6 mb-14">
              <Reveal>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.intro}
                </p>
              </Reveal>
            </div>

            {/* Section 1 */}
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

            <div className="space-y-6 mb-14">
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

            {/* Divider */}
            <div className="h-px bg-neutral-200 mb-14" />

            {/* Section 2 */}
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

            <div className="space-y-6 mb-14">
              <Reveal>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.section2p1}
                </p>
              </Reveal>
            </div>

            {/* Divider */}
            <div className="h-px bg-neutral-200 mb-14" />

            {/* Section 3 */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  {c.section3Label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {c.section3Title}
                </h2>
              </div>
            </Reveal>

            <div className="space-y-6 mb-14">
              <Reveal>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.section3p1}
                </p>
              </Reveal>
              <Reveal delayMs={80}>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.section3p2}
                </p>
              </Reveal>
            </div>

            {/* Divider */}
            <div className="h-px bg-neutral-200 mb-14" />

            {/* Section 4 */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  {c.section4Label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {c.section4Title}
                </h2>
              </div>
            </Reveal>

            <div className="space-y-6 mb-14">
              <Reveal>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.section4p1}
                </p>
              </Reveal>
            </div>

            {/* Closing */}
            <Reveal>
              <div className="bg-stone-100/60 rounded-xl px-8 py-10">
                <p className="font-serif text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
                  {c.final}
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
