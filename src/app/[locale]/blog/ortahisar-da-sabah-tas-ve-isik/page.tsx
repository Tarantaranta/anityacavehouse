import Header2026 from "@/components/layout/Header2026";
import { Footer } from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";
import { Link } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const content = {
  tr: {
    heroLabel: "Ortahisar · Ocak 2026",
    heroTitle: "Ortahisar'da Sabah, Taş ve Işık",
    heroAlt: "Ortahisar Kalesi sabah ışığında",
    categoryChip: "Ortahisar · Ocak 2026",

    intro1:
      "Güneş henüz kaleyi aşmadan, sokaklar taşın kendi sessizliğiyle konuşur. Ortahisar'ın sabahı yavaş başlar — ve bu yavaşlık bir lütuftur.",
    intro2:
      "Bir hekim ve sanatçı olarak yıllarımı bu taşlara dokunarak, onların dilini çözmeye çalışarak geçirdim. Kapadokya'nın kalbinde, milyonlarca yıl önce Erciyes Dağı'nın öfkesiyle püskürttüğü lavların ve küllerin sıkışmasıyla oluşan bu coğrafya, sabahın ilk ışıklarıyla bambaşka bir kimliğe bürünür.",
    intro3:
      "Ufukta beliren güneş, önce vadilerin yumuşak tüf kayalarını kızıla ve pembeye boyar, ardından Ortahisar Kalesi'nin o heybetli siluetini aydınlatır.",

    section1Label: "Taşın Hafızası",
    section1Title: "Anitya'nın Ruhu",
    section1Body1Before: "Biz Anitya Cave House'u restore ederken, sadece bir otel inşa etmedik; taşın hafızasını gün yüzüne çıkardık. Sanskritçe'de \"geçicilik\" anlamına gelen",
    section1Body1After: ", hayattaki her şeyin sürekli bir akış ve değişim içinde olduğunu fısıldar bize.",
    section1Body2:
      "Ancak bu geçicilik içinde kalıcı olan tek şey, taşın hissettirdiği o kadim huzurdur.",

    pullQuote:
      "Sabah terasımıza çıktığınızda, karşınızda tüm bu jeolojik masalın yaratıcısı olan Erciyes Dağı'nı selamlayan o nefes kesici manzarayı görürsünüz.",

    continuation1:
      "Havasıyla temas ettiğinde sertleşen ama özünde işlenmeye müsait olan bu volkanik kayalar, Hititlerden Osmanlı'ya kadar sayısız medeniyete \"yuva\" olmuştur. Odanızda uyandığınızda hissettiğiniz o derin sessizlik ve güven duygusu, yüzyıllar önce bu mağaralara sığınan insanların hissettiği duyguyla aynıdır.",
    continuation2:
      "Çünkü tüf kayalar, yazın serin kışın sıcak tutan doğal yalıtımıyla insanı bir ana kucağı gibi sarar.",

    section2Label: "Kapadokya",
    section2Title: "Ortahisar: Kapadokya'nın En Saf Hali",
    section2Body1:
      "Göreme veya Ürgüp'ün kalabalığından uzakta, Ortahisar \"Orta Kale\" anlamına gelen ismiyle bölgenin stratejik merkezinde ama bir o kadar da kendi halinde, bozulmamış bir kasabadır.",
    section2Body2:
      "Burada sabah yürüyüşüne çıktığınızda, Balkan Deresi'ne inen patikalarda veya Kızılçukur Vadisi'nin girişinde, doğanın ve tarihin iç içe geçtiği o eşsiz dokuyu hissedersiniz.",

    infoGrid1Label: "Kızılçukur Vadisi",
    infoGrid1Body:
      "Peribacaları arasında yürürken, volkanik kayaların binlerce yıllık sessizliğine ortak olursunuz.",
    infoGrid2Label: "Ortahisar Kalesi",
    infoGrid2Body:
      "Kaleye tırmanarak vadilerin üzerinden gün doğumunu izlemek, Kapadokya'nın en saf anlarından biridir.",

    closingBoxLabel: "Sokak aralarında",
    closingBoxQuote:
      "Taş evlerin avlularından yükselen taze ekmek kokusu ve köy halkının samimi selamı size \"gerçek\" Kapadokya'yı yaşatır.",

    final1:
      "Taş, ışık ve tarih... Anitya Cave House'da bir sabah, sadece güne başlamak değil, milyonlarca yıllık bir hikâyenin parçası olmaktır.",
    final2:
      "Sizi, bu sessizliği dinlemeye ve taşın bilgeliğine kulak vermeye davet ediyoruz.",

    ctaSuites: "Suitlerimizi Keşfedin",
    ctaBlog: "← Blog'a Dön",
  },

  en: {
    heroLabel: "Ortahisar · January 2026",
    heroTitle: "Morning in Ortahisar: Stone and Light",
    heroAlt: "Ortahisar Castle in the morning light",
    categoryChip: "Ortahisar · January 2026",

    intro1:
      "Before the sun clears the castle, the streets speak in the quiet language of stone. Morning in Ortahisar begins slowly — and that slowness is a gift.",
    intro2:
      "As a physician and artist, I have spent years touching these stones, trying to decipher their language. At the heart of Cappadocia, this landscape — formed millions of years ago when Mount Erciyes hurled its lava and ash into the world — takes on an entirely different identity in the first light of dawn.",
    intro3:
      "The sun rising on the horizon first paints the soft tuff rocks of the valleys in crimson and rose, then illuminates the imposing silhouette of Ortahisar Castle.",

    section1Label: "The Memory of Stone",
    section1Title: "The Soul of Anitya",
    section1Body1Before:
      "When we restored Anitya Cave House, we did not merely build a hotel; we brought the memory of stone to light. Meaning \"impermanence\" in Sanskrit,",
    section1Body1After:
      "whispers to us that everything in life flows and changes without cease.",
    section1Body2:
      "Yet within that impermanence, the one constant is the ancient calm that stone imparts.",

    pullQuote:
      "When you step onto our morning terrace, you are greeted by a breathtaking view of Mount Erciyes — the very architect of this geological story.",

    continuation1:
      "These volcanic rocks, which harden upon contact with air yet remain workable at their core, have sheltered countless civilisations from the Hittites to the Ottomans. The deep silence and sense of security you feel upon waking in your room is the same feeling experienced by those who once took refuge in these very caves centuries ago.",
    continuation2:
      "For tuff rock, with its natural insulation that keeps spaces cool in summer and warm in winter, envelops the human spirit like a mother's embrace.",

    section2Label: "Cappadocia",
    section2Title: "Ortahisar: Cappadocia at Its Most Authentic",
    section2Body1:
      "Far from the crowds of Göreme or Ürgüp, Ortahisar — whose name means \"Middle Fortress\" — occupies the strategic heart of the region while remaining an unspoiled, unhurried town entirely its own.",
    section2Body2:
      "When you set out for a morning walk here, along the trails descending to Balkan Stream or at the entrance of Kızılçukur Valley, you feel the singular texture of nature and history woven together.",

    infoGrid1Label: "Kızılçukur Valley",
    infoGrid1Body:
      "Walking among the fairy chimneys, you become a companion to the millennia of silence held within the volcanic rock.",
    infoGrid2Label: "Ortahisar Castle",
    infoGrid2Body:
      "Climbing the castle to watch sunrise over the valleys is among the most pure and unhurried moments Cappadocia has to offer.",

    closingBoxLabel: "Between the alleyways",
    closingBoxQuote:
      "The scent of fresh bread rising from the courtyards of stone houses and the sincere greetings of the village people offer you the \"real\" Cappadocia.",

    final1:
      "Stone, light, and history… A morning at Anitya Cave House is not merely the start of a day — it is becoming part of a story millions of years in the making.",
    final2:
      "We invite you to listen to this silence and to heed the wisdom of the stone.",

    ctaSuites: "Explore Our Suites",
    ctaBlog: "← Back to Blog",
  },

  zh: {
    heroLabel: "奥塔希萨尔 · 2026年1月",
    heroTitle: "奥塔希萨尔的早晨：石头与光",
    heroAlt: "晨光中的奥塔希萨尔城堡",
    categoryChip: "奥塔希萨尔 · 2026年1月",

    intro1:
      "在阳光越过城堡之前，街道已在石头的静默中低语。奥塔希萨尔的早晨缓缓展开——而这份缓慢，正是一种恩典。",
    intro2:
      "作为一名医者与艺术家，我用数年光阴触摸这些石头，试图破译它们的语言。在卡帕多西亚的心脏地带，这片土地形成于数百万年前埃尔吉耶斯山的熔岩与火山灰的积压之中，在清晨第一缕曙光的映照下，呈现出截然不同的面貌。",
    intro3:
      "地平线上升起的太阳，先将山谷中柔软的凝灰岩染成绛红与玫瑰色，再将奥塔希萨尔城堡那巍峨的轮廓逐一点亮。",

    section1Label: "石头的记忆",
    section1Title: "阿尼提亚的灵魂",
    section1Body1Before:
      "修复阿尼提亚洞穴旅舍时，我们所做的不仅是建造一座旅馆，更是将石头所承载的记忆重新带回世间。",
    section1Body1After:
      "在梵文中意为\"无常\"，它轻声提醒我们：世间万物皆在永恒的流动与变化之中。",
    section1Body2:
      "然而，在这无常之中，唯有石头赋予人的那份古朴宁静，亘古长存。",

    pullQuote:
      "当您踏上我们的晨间露台，眼前便是令人屏息的壮阔景象——那是埃尔吉耶斯山，这一切地质传奇的缔造者，正以沉默迎候您的到来。",

    continuation1:
      "这些与空气接触便趋于坚硬、而内里仍可雕凿的火山岩，从赫梯人到奥斯曼人，为无数文明提供过栖身之所。您在客房中醒来时所感受到的那份深沉静谧与安然笃定，与数百年前躲入这些洞穴的人们所体验到的，别无二致。",
    continuation2:
      "正因如此，凝灰岩以其天然的隔热性能——夏凉冬暖——将每一位到来者轻柔地包裹，宛如母亲的怀抱。",

    section2Label: "卡帕多西亚",
    section2Title: "奥塔希萨尔：卡帕多西亚最纯粹的面貌",
    section2Body1:
      "远离格雷梅或于尔居普的喧嚣，奥塔希萨尔——其名意为\"中央要塞\"——占据着这一地区的战略核心，却同时保有一种不被打扰的、属于自己的古朴气质。",
    section2Body2:
      "当您在清晨踏步于此，沿着通往巴尔干溪的山间小径，或在克孜勒丘库尔山谷的入口处驻足，您将感受到自然与历史在此交织缠绕所形成的那份独一无二的肌理。",

    infoGrid1Label: "克孜勒丘库尔山谷",
    infoGrid1Body:
      "漫步于精灵烟囱之间，您将成为火山岩数千年沉默的见证者与同伴。",
    infoGrid2Label: "奥塔希萨尔城堡",
    infoGrid2Body:
      "攀上城堡，俯瞰山谷，静待日出——这是卡帕多西亚所能给予的最纯粹的时刻之一。",

    closingBoxLabel: "穿行于小巷之间",
    closingBoxQuote:
      "从石砌庭院中飘来的新鲜面包香气，以及村民们真挚的问候，让您得以触碰\"真实\"的卡帕多西亚。",

    final1:
      "石头、光与历史……在阿尼提亚洞穴旅舍的一个清晨，不仅仅是一天的开始，更是成为一段绵延数百万年故事的一部分。",
    final2: "我们诚邀您，来聆听这份静默，倾听石头所蕴藏的智慧。",

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
        imageSrc="/images/blog-images/1.avif"
        imageAlt={c.heroAlt}
      />

      {/* Article body */}
      <SectionShell>
        <div className="max-w-[68ch] mx-auto">
          <div className="bg-white/45 border border-black/5 rounded-2xl p-8 md:p-12">

            {/* Category + date */}
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
                  {c.intro1}
                </p>
              </Reveal>
              <Reveal delayMs={80}>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.intro2}
                </p>
              </Reveal>
              <Reveal delayMs={160}>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.intro3}
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
                  {c.section1Body1Before}{" "}
                  <em>Anitya</em>
                  {c.section1Body1After}
                </p>
              </Reveal>
              <Reveal delayMs={80}>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.section1Body2}
                </p>
              </Reveal>
            </div>

            {/* Pull quote */}
            <Reveal delayMs={60}>
              <div className="border-l-2 border-neutral-300 pl-8 mb-14 space-y-3">
                <p className="font-serif text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
                  {c.pullQuote}
                </p>
              </div>
            </Reveal>

            {/* Section 1 continuation */}
            <div className="space-y-6 mb-14">
              <Reveal>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.continuation1}
                </p>
              </Reveal>
              <Reveal delayMs={80}>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.continuation2}
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
                  {c.section2Body1}
                </p>
              </Reveal>
              <Reveal delayMs={80}>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.section2Body2}
                </p>
              </Reveal>
            </div>

            {/* Info grid */}
            <Reveal delayMs={40}>
              <div className="grid md:grid-cols-2 gap-8 mb-14">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                    {c.infoGrid1Label}
                  </p>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    {c.infoGrid1Body}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                    {c.infoGrid2Label}
                  </p>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    {c.infoGrid2Body}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Closing highlight box */}
            <Reveal>
              <div className="bg-stone-100/60 rounded-xl px-8 py-10 space-y-5 mb-14">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">
                  {c.closingBoxLabel}
                </p>
                <p className="font-serif text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
                  {c.closingBoxQuote}
                </p>
              </div>
            </Reveal>

            {/* Final paragraphs */}
            <div className="space-y-6">
              <Reveal>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {c.final1}
                </p>
              </Reveal>
              <Reveal delayMs={80}>
                <p className="font-serif text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
                  {c.final2}
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
