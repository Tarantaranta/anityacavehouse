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
  const slug = 'kapadokya-mutfagi-testi-kebabindan-pottery-sofralar';

  const metadata = {
    tr: {
      title: 'Kapadokya Mutfağı: Testi Kebabından Pottery Sofralarına',
      description: 'Kapadokya mutfağının ikonik lezzeti testi kebabı, yeraltı şırahaneleri ve bölgeye özgü üzümler. Toprağın lezzete dönüştüğü mutfak kültürü.',
    },
    en: {
      title: 'Cappadocia Cuisine: From Testi Kebab to Pottery Tables',
      description: 'The iconic testi kebab of Cappadocian cuisine, underground wine cellars, and indigenous grapes. A culinary culture where earth becomes flavor.',
    },
    zh: {
      title: '卡帕多西亚美食：从陶罐烤肉到陶器餐桌',
      description: '卡帕多西亚美食的标志性菜肴陶罐烤肉、地下酒窖和本地葡萄。土地变成美味的烹饪文化。',
    },
  };

  const l = locale as 'tr' | 'en' | 'zh';
  const meta = metadata[l] || metadata.tr;

  return {
    title: meta.title,
    description: meta.description,
    keywords: locale === 'tr'
      ? 'testi kebabı, kapadokya mutfağı, avanos çömlekçilik, kapadokya şarap, yerel lezzetler'
      : locale === 'en'
      ? 'testi kebab, cappadocia cuisine, avanos pottery, cappadocia wine, local flavors'
      : '陶罐烤肉, 卡帕多西亚美食, 阿瓦诺斯陶器, 葡萄酒, 当地美食',

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
      publishedTime: '2025-10-01T00:00:00Z',
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

// ─── Locale-aware content ──────────────────────────────────────────────────

const pageContent = {
  tr: {
    heroLabel: "Yemek · Ekim 2025",
    heroTitle: "Kapadokya Mutfağı: Testi Kebabından Pottery Sofralarına",
    heroImageAlt: "Kapadokya mutfağı ve testi kebabı",
    categoryChip: "Yemek · Ekim 2025",
    intro: [
      "Kapadokya'yı sadece görsel bir şölen olarak düşünmek, bu kadim toprakların bereketine haksızlık olur. Bir restoratör olarak Anitya'nın her taşını yerine koyarken hissettiğim şey, bu coğrafyanın sadece barınmayı değil, beslenmeyi de bir sanata dönüştürdüğüdür.",
      "Kızılırmak'ın (antik Halys) kırmızı alüvyonlu toprağı sadece Avanoslu çömlekçilerin çarkında bir sanat eserine dönüşmez; o toprak, aynı zamanda sofralarımızın lezzet sırrıdır.",
    ],
    s1Label: "İkonik Lezzet",
    s1Title: "Toprağın, Ateşin ve Etin Dansı: Testi Kebabı",
    s1Body: [
      "Kapadokya mutfağının en ikonik lezzeti şüphesiz Testi Kebabı'dır. Ancak bu yemek, sadece bir et yemeği değil, bölgenin jeolojik yapısının mutfağa yansımasıdır. Avanos'un kuzeyindeki köylerden çıkarılan bu özel toprak, ustaların elinde pişirme kaplarına dönüşür.",
      "Testi kebabı, aslında bir nevi antik düdüklü tencere mantığıyla çalışır. Et ve sebzeler, bu toprak kapların içine hapsedilir ve hava almadan, kendi suyuyla, ağır ateşte saatlerce pişer.",
    ],
    pullQuote:
      "Testinin kırıldığı o an, sadece bir sunum şovu değil, toprağın lezzeti ete mühürlediği andır.",
    s2Label: "Mağara Soğukluğu",
    s2Title: "Yeraltındaki Lezzet Mahzenleri",
    s2Body: [
      "Anitya'yı restore ederken, mağara odaların doğal klimatik özelliklerine hayran kaldık. Kapadokya halkı, yüzyıllar boyunca tüf kayaların sağladığı sabit ısıyı (yaz-kış 7-15°C arası) bir avantaj olarak kullanmıştır.",
      "Derinkuyu veya Kaymaklı gibi yeraltı şehirlerini gezerken göreceğiniz şırahaneler, bu halkın sadece saklanmak için değil, üretmek için de yerin altına indiğini kanıtlar. Bu doğal soğuk hava depoları, bölgenin meşhur patateslerini ve limonlarını aylarca taze tutar.",
    ],
    s3Label: "Bağcılık Geleneği",
    s3Title: "Bağların Mirası: Emir ve Dimrit",
    s3Body: [
      "Hititlerden Asur Ticaret Kolonileri çağına kadar uzanan tabletlerde, bu bölgede bağcılığın ve şarap ticaretinin ne denli önemli olduğu yazar. Volkanik tüflü toprak, asma köklerinin derinlere inmesine ve mineralleri emmesine izin verir.",
      "Bölgeye özgü Emir, Dimrit ve Kalecik Karası üzümlerinden üretilen şaraplar, bu mineral zenginliğini kadehlerinize taşır. Anitya'nın terasında gün batımına karşı tadacağınız yerel bir kadeh şarap, binlerce yıllık bir tarım geleneğinin sonucudur.",
    ],
    grapeGrid: [
      {
        label: "Emir Üzümü",
        text: "Kapadokya'ya özgü beyaz üzüm çeşidi. Volkanik toprakta yetişen asmanın mineral yoğunluğunu taşır.",
      },
      {
        label: "Kalecik Karası",
        text: "Türkiye'nin en değerli yerli kırmızı üzüm çeşitlerinden biri. Kadife dokusu ve vişne aromasıyla tanınır.",
      },
    ],
    s4Label: "Anitya'da Sofra",
    s4Title: "Sizin Mutfağınız, Sizin Keşfiniz",
    s4Body: [
      "Anitya Cave House'da konaklarken, sadece bir otel odasında değil, yaşayan bir evin içinde olursunuz. Tasarım anlayışımız gereği sabahları standart bir kahvaltı servisi sunmuyoruz; çünkü sizi bu kadim coğrafyanın sabah telaşına ve yerel lezzet duraklarına davet etmek istiyoruz.",
      "Cave Suite ve taş evlerimizde bulunan tam donanımlı mutfaklar, fırın, ocak ve geniş buzdolapları, yerel pazardan alacağınız taze peynirler, ev yapımı reçeller ve bölgenin meşhur kabak çekirdeği ile kendi \"Anitya Sofranızı\" kurmanıza olanak tanır.",
    ],
    closingLabel: "Davet",
    closingQuote:
      "Sizi, toprağın çömleğe, üzümün şaraba ve mağaranın yuvaya dönüştüğü bu eşsiz lezzet yolculuğuna davet ediyoruz.",
    ctaSuites: "Suitlerimizi Keşfedin",
    ctaBlog: "← Blog\u2019a Dön",
  },

  en: {
    heroLabel: "Food · October 2025",
    heroTitle: "Cappadocia Cuisine: From Testi Kebab to Pottery Tables",
    heroImageAlt: "Cappadocia kitchen and testi kebab",
    categoryChip: "Food · October 2025",
    intro: [
      "To think of Cappadocia only as a visual feast would be to do a disservice to the abundance of this ancient land. As a restorer who placed every stone of Anitya back into its rightful place, what I felt was that this geography had turned not only shelter, but nourishment itself, into a form of art.",
      "The red alluvial soil of the Kızılırmak — the ancient Halys river — does not only become a work of art on the potter's wheel in Avanos; that same earth holds the secret of flavor on our tables.",
    ],
    s1Label: "Iconic Flavor",
    s1Title: "The Dance of Earth, Fire, and Meat: Testi Kebab",
    s1Body: [
      "The most iconic dish of Cappadocian cuisine is undoubtedly Testi Kebab. Yet this is more than a meat dish — it is the geological character of the region reflected in the kitchen. The clay extracted from villages north of Avanos is shaped by master craftsmen into cooking vessels.",
      "Testi kebab works on the logic of an ancient pressure cooker. Meat and vegetables are sealed inside these earthenware jugs — known as \"testi\" in Turkish — and slow-cook for hours in their own juices, untouched by open air, over a low flame. The jug is brought to the table whole and dramatically broken open, releasing the aromas locked inside.",
    ],
    pullQuote:
      "The moment the jug is broken open is not merely a tableside spectacle — it is the instant the earth seals its flavor into the meat.",
    s2Label: "Cave Coolness",
    s2Title: "Underground Flavor Cellars",
    s2Body: [
      "While restoring Anitya, we were struck by the natural climate properties of the cave rooms. For centuries, the people of Cappadocia have used the constant temperature provided by tufa rock — between 7 and 15°C year-round — to their advantage.",
      "The wine cellars you encounter while visiting underground cities such as Derinkuyu or Kaymaklı prove that these people descended beneath the earth not only to hide, but to produce. These natural cold-storage chambers keep the region's celebrated potatoes and lemons fresh for months.",
    ],
    s3Label: "Viticulture Heritage",
    s3Title: "The Legacy of the Vines: Emir and Dimrit",
    s3Body: [
      "Tablets stretching from the Hittites to the age of the Assyrian Trade Colonies record how vitally important viticulture and wine trade were in this region. The volcanic tufa soil allows vine roots to reach deep and absorb a wealth of minerals.",
      "Wines made from the indigenous Emir, Dimrit, and Kalecik Karası grapes carry that mineral richness into your glass. A local glass of wine savored on Anitya's terrace as the sun sets is the product of thousands of years of agricultural tradition.",
    ],
    grapeGrid: [
      {
        label: "Emir",
        text: "A white grape variety indigenous to Cappadocia. It carries the mineral density of vines grown in volcanic soil.",
      },
      {
        label: "Kalecik Karası",
        text: "One of Turkey's most prized native red grape varieties. Known for its velvety texture and cherry aromas.",
      },
    ],
    s4Label: "At the Table in Anitya",
    s4Title: "Your Kitchen, Your Discovery",
    s4Body: [
      "When you stay at Anitya Cave House, you are not in a hotel room — you are inside a living home. By design, we do not offer a standard breakfast service in the mornings; instead, we invite you into the early-morning rhythm of this ancient landscape and its local flavor stops.",
      "The fully equipped kitchens in our Cave Suite and stone houses — with ovens, stovetops, and generous refrigerators — give you everything you need to set your own \"Anitya Table\" with fresh cheeses from the local market, homemade preserves, and the region's celebrated pumpkin seeds.",
    ],
    closingLabel: "Invitation",
    closingQuote:
      "We invite you on this singular culinary journey where earth transforms into pottery, grape into wine, and cave into home.",
    ctaSuites: "Explore Our Suites",
    ctaBlog: "\u2190 Back to Blog",
  },

  zh: {
    heroLabel: "美食 · 2025年10月",
    heroTitle: "卡帕多西亚美食：从陶罐烤肉到陶器餐桌",
    heroImageAlt: "卡帕多西亚厨房与陶罐烤肉",
    categoryChip: "美食 · 2025年10月",
    intro: [
      "若只将卡帕多西亚视为一场视觉盛宴，便是对这片古老土地馈赠的辜负。作为一名修缮者，当我将Anitya的每一块石头归位时，深切感受到这片地域不仅将居所，更将饮食本身升华为一门艺术。",
      "基孜勒河（古称哈利斯河）的红色冲积土壤，不仅在阿瓦诺斯陶工的转盘上化为艺术品；那同一片土壤，也藏着我们餐桌上的风味秘密。",
    ],
    s1Label: "标志性美味",
    s1Title: "泥土、火焰与肉食之舞：陶罐烤肉",
    s1Body: [
      "卡帕多西亚美食中最具代表性的菜肴，无疑是陶罐烤肉（Testi Kebab）。然而这道菜不仅仅是一道肉食——它是这一地区的地质特性在厨房中的映射。从阿瓦诺斯北部村落采挖的特殊黏土，经工匠之手化为烹饪容器。",
      "陶罐烤肉的烹饪原理犹如一只古老的高压锅。肉类与蔬菜被密封在这种土陶罐（土耳其语称为\"testi\"，意为陶罐）中，不接触空气，以小火慢炖数小时，在自身的汤汁中充分入味。陶罐整只端上桌，在宾客面前戏剧性地打碎，密封其中的香气瞬间迸发而出。",
    ],
    pullQuote: "陶罐被打碎的那一刻，不只是一场餐桌表演——那是大地将风味封印入肉的瞬间。",
    s2Label: "洞穴的凉意",
    s2Title: "地下的风味窖藏",
    s2Body: [
      "在修缮Anitya的过程中，我们对洞穴房间天然的气候特性深感叹服。数百年来，卡帕多西亚人充分利用凝灰岩所提供的恒定温度——常年保持在7至15摄氏度之间——将其化为独特的优势。",
      "在参观德林库尤或卡伊马克利等地下城市时，你会看到古老的酿酒窖。这些窖藏证明，这里的人们走入地下，不只是为了藏匿，更是为了生产。这些天然的冷藏空间，使当地著名的土豆和柠檬得以数月保持新鲜。",
    ],
    s3Label: "葡萄种植传统",
    s3Title: "葡萄藤的遗产：Emir与Dimrit",
    s3Body: [
      "从赫梯人到亚述贸易殖民地时代的泥板文书均记载，葡萄种植与葡萄酒贸易在这一地区曾是何等重要的存在。火山凝灰土壤允许藤根深入地层，充分汲取矿物质。",
      "以本土品种Emir、Dimrit和Kalecik Karası酿制的葡萄酒，将这份矿物质的丰富呈现于杯中。在Anitya露台上，于夕阳余晖中品味一杯当地葡萄酒，那是数千年农耕传统的结晶。",
    ],
    grapeGrid: [
      {
        label: "Emir（埃米尔）",
        text: "卡帕多西亚原产白葡萄品种，凝聚了生长于火山土壤中的藤蔓所蕴含的矿物质精华。",
      },
      {
        label: "Kalecik Karası",
        text: "土耳其最珍贵的本土红葡萄品种之一，以丝绒般的质感和樱桃香气著称。",
      },
    ],
    s4Label: "在Anitya的餐桌",
    s4Title: "你的厨房，你的发现",
    s4Body: [
      "入住Anitya Cave House，你不是住在一间酒店客房里，而是置身于一个有生命的家中。遵循我们的设计理念，我们不提供标准早餐服务；我们希望邀请你融入这片古老土地清晨的烟火气，探访当地的风味小店。",
      "我们的洞穴套房和石屋均配备设施齐全的厨房——烤箱、炉灶和宽敞的冰箱，让你可以用从当地集市购得的新鲜奶酪、手工果酱和当地著名的南瓜籽，搭建属于自己的「Anitya餐桌」。",
    ],
    closingLabel: "邀约",
    closingQuote:
      "我们邀请你踏上这段独一无二的美食之旅——在这里，泥土化为陶器，葡萄化为美酒，洞穴化为家园。",
    ctaSuites: "探索我们的套房",
    ctaBlog: "\u2190 返回博客",
  },
};

// ─────────────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: PageProps) {
  const { locale } = await params;
  const c = pageContent[locale as keyof typeof pageContent] ?? pageContent.tr;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      <Header2026 />

      {/* Hero */}
      <PageHero
        label={c.heroLabel}
        title={c.heroTitle}
        imageSrc="/images/blog-images/4.avif"
        imageAlt={c.heroImageAlt}
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
              {c.intro.map((para, i) => (
                <Reveal key={i} delayMs={i * 80}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Section 1 heading */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  {c.s1Label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {c.s1Title}
                </h2>
              </div>
            </Reveal>

            {/* Section 1 body */}
            <div className="space-y-6 mb-10">
              {c.s1Body.map((para, i) => (
                <Reveal key={i} delayMs={i * 80}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {para}
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
                  {c.s2Label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {c.s2Title}
                </h2>
              </div>
            </Reveal>

            {/* Section 2 body */}
            <div className="space-y-6 mb-10">
              {c.s2Body.map((para, i) => (
                <Reveal key={i} delayMs={i * 80}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {para}
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
                  {c.s3Label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {c.s3Title}
                </h2>
              </div>
            </Reveal>

            {/* Section 3 body */}
            <div className="space-y-6 mb-14">
              {c.s3Body.map((para, i) => (
                <Reveal key={i} delayMs={i * 80}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Grape variety info grid */}
            <Reveal delayMs={40}>
              <div className="grid md:grid-cols-2 gap-8 mb-14">
                {c.grapeGrid.map((grape) => (
                  <div key={grape.label} className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                      {grape.label}
                    </p>
                    <p className="text-base text-neutral-600 leading-relaxed">
                      {grape.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Divider */}
            <div className="h-px bg-neutral-200 mb-14" />

            {/* Section 4 heading */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  {c.s4Label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {c.s4Title}
                </h2>
              </div>
            </Reveal>

            {/* Section 4 body */}
            <div className="space-y-6 mb-10">
              {c.s4Body.map((para, i) => (
                <Reveal key={i} delayMs={i * 80}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

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
