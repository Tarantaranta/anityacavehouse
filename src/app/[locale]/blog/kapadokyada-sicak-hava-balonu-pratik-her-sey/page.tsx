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
  const slug = 'kapadokyada-sicak-hava-balonu-pratik-her-sey';

  const metadata = {
    tr: {
      title: 'Kapadokya\'da Sıcak Hava Balonu: Pratik Her Şey',
      description: 'Kapadokya sıcak hava balonu turu için pratik rehber. Fiyatlar, en iyi şirketler, rezervasyon ipuçları ve bilinmesi gerekenler.',
    },
    en: {
      title: 'Hot Air Balloon in Cappadocia: Practical Everything',
      description: 'Practical guide for Cappadocia hot air balloon tours. Prices, best companies, booking tips and everything you need to know.',
    },
    zh: {
      title: '卡帕多西亚热气球：实用指南',
      description: '卡帕多西亚热气球之旅的实用指南。价格、最佳公司、预订技巧和您需要了解的一切。',
    },
  };

  const l = locale as 'tr' | 'en' | 'zh';
  const meta = metadata[l] || metadata.tr;

  return {
    title: meta.title,
    description: meta.description,
    keywords: locale === 'tr'
      ? 'kapadokya balon, sıcak hava balonu fiyatları, balon turu rezervasyon, kapadokya gezi ipuçları'
      : locale === 'en'
      ? 'cappadocia balloon, hot air balloon prices, balloon tour booking, cappadocia travel tips'
      : '卡帕多西亚热气球, 热气球价格, 热气球旅游预订, 旅游贴士',

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
      publishedTime: '2025-08-01T00:00:00Z',
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
    label: "İpuçları · Ağustos 2025",
    title: "Kapadokya'da Sıcak Hava Balonu: Pratik Her Şey",
    imageAlt: "Kapadokya'da sıcak hava balonları",
    category: "İpuçları",
    date: "Ağustos 2025",
    intro: [
      "Kapadokya'ya gelip de o ikonik balon fotoğraflarına bakıp iç geçirmeyen yoktur. Ancak iş rezervasyon yapmaya gelince kafalar karışır: \"Sabahın köründe kalkmaya değer mi?\", \"Güvenli mi?\", \"Hangi şirket daha iyi?\"...",
      "Bir Kapadokya yerlisi ve Anitya Cave House'un restoratörü olarak, misafirlerimizden en sık duyduğumuz soruları, hiçbir pazarlama süslemesine girmeden, tüm çıplaklığıyla yanıtlamak istiyorum.",
    ],
    sections: [
      {
        label: "Soru 1",
        title: "Sabah 04:00'te Kalkmaya Gerçekten Değer mi?",
        paragraphs: [
          "Kısa cevap: Evet. Uzun cevap: Kesinlikle evet. Sabahın o saatinde, sıcak yatağınızdan — özellikle Anitya'nın taş odalarının huzurundan — kalkmak zor gelebilir. Ancak balonlar, güneş doğarken oluşan termal hava akımlarını kullanmak zorundadır.",
          "Sepete binip yerle bağınız kesildiğinde, güneşin peribacalarını kızıla boyadığı o \"sessizliğe\" yükseldiğinizde, uykusuzluğu tamamen unutacaksınız. Bu, hayatınızda bir, belki iki kez yaşayabileceğiniz bir andır.",
        ],
      },
      {
        label: "Soru 2",
        title: "Hangi Mevsim En İyisi?",
        paragraphs: [
          "Balonlar yılın 12 ayı uçar; tek kriter rüzgardır.",
        ],
      },
      {
        label: "Soru 3",
        title: "Güvenlik ve Şirket Seçimi: Bizim Rolümüz",
        paragraphs: [
          "Kapadokya'da onlarca balon firması var. Ancak hepsi aynı standartta hizmet vermez. Pilotun deneyimi, ekipmanın yeniliği ve sigorta kapsamları hayati önem taşır. Anitya Cave House olarak biz, sadece güvenlik siciline güvendiğimiz ve pilotlarını şahsen tanıdığımız firmalarla iş birliği yapıyoruz.",
        ],
      },
      {
        label: "Soru 4",
        title: "Sepet Tipleri ve Fiyatlar",
        paragraphs: [],
      },
      {
        label: "Soru 5",
        title: "Uçamazsanız Ne Olur?",
        paragraphs: [
          "Balonculuk, Sivil Havacılık Kurumu'nun sıkı denetimi altındadır. Rüzgar limiti aşılırsa uçuşlar iptal edilir; bu sizin güvenliğiniz içindir. Böyle bir durumda ödemeniz kesintisiz iade edilir.",
        ],
      },
    ],
    seasons: [
      {
        name: "İlkbahar & Sonbahar",
        desc: "Hava yumuşaktır, uçuş iptal riski azdır. En popüler ve güvenli dönemlerdir.",
      },
      {
        name: "Kış",
        desc: "Kar altındaki peribacaları büyüleyicidir. Rüzgar ve sis nedeniyle iptal riski daha yüksektir.",
      },
      {
        name: "Yaz",
        desc: "Sabah serinliğinde uçup günün sıcağı bastırmadan otele dönmek için idealdir.",
      },
    ],
    pullQuote:
      "Rezervasyonunuzu bizim üzerimizden yaptığınızda: doğru fiyat/performans, operasyonel takip ve kapıdan kapıya transfer konforu garanti altındadır.",
    baskets: [
      {
        name: "Standart Uçuş",
        desc: "20–28 kişilik sepetler. En ekonomik seçenek, yaklaşık 1 saat uçuş süresi.",
      },
      {
        name: "Konfor Uçuş",
        desc: "16–20 kişilik sepetler. Daha fazla hareket alanı, daha rahat bir deneyim.",
      },
      {
        name: "Deluxe / Özel",
        desc: "Küçük veya özel sepetler. Fotoğraf için en idealdir, 1.5 saate kadar uçuş.",
      },
    ],
    closingLabel: "İptal olursa",
    closingQuote:
      "Üzülmeyin; Anitya Cave House'un terasına çıkın. Erciyes Dağı ve Ortahisar Kalesi manzarası eşliğinde vadilerin sessizliğini dinlemek de Kapadokya'nın en büyük hediyelerinden biridir.",
    final:
      "Eğer uçmaya karar verirseniz, bu organizasyonu bize bırakın. Siz sadece fotoğraf makinenizi hazırlayın ve anın tadını çıkarın. Biz detayları hallederiz.",
    ctaSuites: "Suitlerimizi Keşfedin",
    ctaBlog: "← Blog'a Dön",
  },
  en: {
    label: "Tips · August 2025",
    title: "Hot Air Balloon in Cappadocia: Everything You Need to Know",
    imageAlt: "Hot air balloons over Cappadocia",
    category: "Tips",
    date: "August 2025",
    intro: [
      "No one arrives in Cappadocia and looks at those iconic balloon photographs without a sense of longing. But when it comes to actually booking, the questions pile up: \"Is it really worth waking up at the crack of dawn?\", \"Is it safe?\", \"Which company is better?\"...",
      "As a Cappadocia local and the restorer of Anitya Cave House, I want to answer the questions we hear most often from our guests — honestly, without any marketing gloss.",
    ],
    sections: [
      {
        label: "Question 1",
        title: "Is Waking Up at 4:00 AM Really Worth It?",
        paragraphs: [
          "Short answer: Yes. Long answer: Absolutely yes. At that hour, dragging yourself out of a warm bed — especially from the tranquility of Anitya's stone rooms — can feel like a sacrifice. But balloons must rely on the thermal currents that form as the sun rises.",
          "The moment the basket lifts off and you float up into that \"silence\" while the sun paints the fairy chimneys crimson, every minute of lost sleep is forgotten. This is one of those moments you may experience once, perhaps twice, in a lifetime.",
        ],
      },
      {
        label: "Question 2",
        title: "Which Season Is Best?",
        paragraphs: [
          "Balloons fly all 12 months of the year; the only deciding factor is the wind.",
        ],
      },
      {
        label: "Question 3",
        title: "Safety and Choosing a Company: Our Role",
        paragraphs: [
          "There are dozens of balloon operators in Cappadocia, but they do not all maintain the same standards. The pilot's experience, the age of the equipment and the scope of insurance coverage are all critical. At Anitya Cave House, we partner exclusively with companies whose safety records we trust and whose pilots we know personally.",
        ],
      },
      {
        label: "Question 4",
        title: "Basket Types and Prices",
        paragraphs: [],
      },
      {
        label: "Question 5",
        title: "What If the Flight Is Cancelled?",
        paragraphs: [
          "Ballooning operates under the strict supervision of the Civil Aviation Authority. If wind limits are exceeded, flights are cancelled — this is for your safety. In such a case, your payment is refunded in full.",
        ],
      },
    ],
    seasons: [
      {
        name: "Spring & Autumn",
        desc: "Mild weather, low risk of cancellation. The most popular and reliable periods for flying.",
      },
      {
        name: "Winter",
        desc: "Snow-covered fairy chimneys are magical. Higher cancellation risk due to wind and fog.",
      },
      {
        name: "Summer",
        desc: "Ideal for flying in the cool morning air and returning to the hotel before the midday heat.",
      },
    ],
    pullQuote:
      "When you book through us: the right price-to-value ratio, operational follow-up and door-to-door transfer comfort are all guaranteed.",
    baskets: [
      {
        name: "Standard Flight",
        desc: "Baskets for 20–28 people. The most affordable option, approximately 1 hour of flight time.",
      },
      {
        name: "Comfort Flight",
        desc: "Baskets for 16–20 people. More room to move and a more relaxed overall experience.",
      },
      {
        name: "Deluxe / Private",
        desc: "Small or private baskets. The best choice for photography, with flights of up to 1.5 hours.",
      },
    ],
    closingLabel: "If it is cancelled",
    closingQuote:
      "Do not be discouraged — step out onto the terrace of Anitya Cave House. Listening to the stillness of the valleys with Mount Erciyes and Ortahisar Castle on the horizon is itself one of Cappadocia's greatest gifts.",
    final:
      "If you decide to fly, leave the logistics to us. All you need to do is charge your camera and soak in the moment. We will handle the details.",
    ctaSuites: "Explore Our Suites",
    ctaBlog: "← Back to Blog",
  },
  zh: {
    label: "实用指南 · 2025年8月",
    title: "卡帕多西亚热气球：您需要知道的一切",
    imageAlt: "卡帕多西亚上空的热气球",
    category: "实用指南",
    date: "2025年8月",
    intro: [
      "来到卡帕多西亚，没有人能对那些标志性的热气球照片无动于衷。然而，真正到了预订的时候，问题就来了：\"凌晨就要起床，值得吗？\"\"安全吗？\"\"哪家公司更好？\"……",
      "作为土生土长的卡帕多西亚人，也是 Anitya Cave House 的修缮者，我想毫无保留地回答我们的客人最常提出的问题——不加任何营销包装，只讲实话。",
    ],
    sections: [
      {
        label: "问题 1",
        title: "早上4点起床真的值得吗？",
        paragraphs: [
          "简短的回答：值得。详细的回答：绝对值得。在那个时间点，从温暖的床上起身——尤其是离开 Anitya 石窟房间那份宁静——确实需要一些意志力。但热气球必须借助日出时形成的热气流才能飞行。",
          "当吊篮腾空而起，您随着气球飘入那片\"寂静\"，眼见太阳将仙女烟囱染成赤红，所有的睡意都会瞬间消散。这是一个您一生中或许只能经历一两次的时刻。",
        ],
      },
      {
        label: "问题 2",
        title: "哪个季节最合适？",
        paragraphs: [
          "热气球全年12个月都会飞行，唯一的决定性因素是风况。",
        ],
      },
      {
        label: "问题 3",
        title: "安全与公司选择：我们的角色",
        paragraphs: [
          "卡帕多西亚有数十家热气球运营商，但并非所有公司都维持同等标准。飞行员的经验、设备的新旧程度以及保险覆盖范围都至关重要。Anitya Cave House 只与我们信任其安全记录、且亲自了解其飞行员的公司合作。",
        ],
      },
      {
        label: "问题 4",
        title: "吊篮类型与价格",
        paragraphs: [],
      },
      {
        label: "问题 5",
        title: "如果航班取消怎么办？",
        paragraphs: [
          "热气球飞行受民航局严格监管。若风速超过限制，飞行将被取消——这是为了您的安全。出现此类情况时，您的费用将全额退还。",
        ],
      },
    ],
    seasons: [
      {
        name: "春季 & 秋季",
        desc: "气候温和，取消风险低，是最受欢迎、最安全的飞行时段。",
      },
      {
        name: "冬季",
        desc: "白雪覆盖的仙女烟囱如梦似幻。受风和雾的影响，取消风险较高。",
      },
      {
        name: "夏季",
        desc: "在清爽的清晨飞行，赶在正午酷热来临前返回酒店，非常理想。",
      },
    ],
    pullQuote:
      "通过我们预订时，正确的性价比、全程跟进服务以及门到门接送便利均有保障。",
    baskets: [
      {
        name: "标准飞行",
        desc: "20至28人吊篮，最经济实惠的选择，飞行时间约1小时。",
      },
      {
        name: "舒适飞行",
        desc: "16至20人吊篮，空间更宽裕，体验更从容。",
      },
      {
        name: "豪华 / 专属",
        desc: "小型或私人吊篮，最适合拍摄，飞行时间可达1.5小时。",
      },
    ],
    closingLabel: "如果取消",
    closingQuote:
      "不必沮丧——走上 Anitya Cave House 的露台，伴着埃尔杰斯山和奥尔塔希萨尔城堡的壮丽景色，静静聆听峡谷的寂静，这本身也是卡帕多西亚最珍贵的馈赠之一。",
    final:
      "如果您决定乘坐热气球，把所有安排交给我们。您只需备好相机，尽情享受当下——细节由我们来处理。",
    ctaSuites: "探索我们的套房",
    ctaBlog: "← 返回博客",
  },
} as const;

type Locale = keyof typeof content;

export default async function BlogPostPage({ params }: PageProps) {
  const { locale } = await params;
  const t = content[(locale as Locale) in content ? (locale as Locale) : "tr"];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      <Header2026 />

      {/* Hero */}
      <PageHero
        label={t.label}
        title={t.title}
        imageSrc="/images/blog-images/6.avif"
        imageAlt={t.imageAlt}
      />

      {/* Article body */}
      <SectionShell>
        <div className="max-w-[68ch] mx-auto">
          <div className="bg-white/45 border border-black/5 rounded-2xl p-8 md:p-12">

            {/* Category + date */}
            <Reveal>
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-10">
                {t.category} <span className="text-neutral-300">·</span> {t.date}
              </p>
            </Reveal>

            {/* Intro */}
            <div className="space-y-6 mb-14">
              {t.intro.map((paragraph, i) => (
                <Reveal key={i} delayMs={i === 0 ? 0 : 80}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Section 1 */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  {t.sections[0].label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {t.sections[0].title}
                </h2>
              </div>
            </Reveal>

            <div className="space-y-6 mb-14">
              {t.sections[0].paragraphs.map((paragraph, i) => (
                <Reveal key={i} delayMs={i === 0 ? 0 : 80}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-neutral-200 mb-14" />

            {/* Section 2 */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  {t.sections[1].label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {t.sections[1].title}
                </h2>
              </div>
            </Reveal>

            <div className="space-y-6 mb-10">
              {t.sections[1].paragraphs.map((paragraph, i) => (
                <Reveal key={i}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Season grid */}
            <Reveal delayMs={40}>
              <div className="grid md:grid-cols-3 gap-6 mb-14">
                {t.seasons.map((season, i) => (
                  <div key={i} className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                      {season.name}
                    </p>
                    <p className="text-base text-neutral-600 leading-relaxed">
                      {season.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Divider */}
            <div className="h-px bg-neutral-200 mb-14" />

            {/* Section 3 */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  {t.sections[2].label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {t.sections[2].title}
                </h2>
              </div>
            </Reveal>

            <div className="space-y-6 mb-10">
              {t.sections[2].paragraphs.map((paragraph, i) => (
                <Reveal key={i}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Pull quote */}
            <Reveal delayMs={60}>
              <div className="border-l-2 border-neutral-300 pl-8 mb-10 space-y-3">
                <p className="font-serif text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
                  {t.pullQuote}
                </p>
              </div>
            </Reveal>

            <div className="mb-14" />

            {/* Divider */}
            <div className="h-px bg-neutral-200 mb-14" />

            {/* Section 4 */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  {t.sections[3].label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {t.sections[3].title}
                </h2>
              </div>
            </Reveal>

            {/* Basket grid */}
            <Reveal delayMs={40}>
              <div className="grid md:grid-cols-3 gap-6 mb-14">
                {t.baskets.map((basket, i) => (
                  <div key={i} className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                      {basket.name}
                    </p>
                    <p className="text-base text-neutral-600 leading-relaxed">
                      {basket.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Divider */}
            <div className="h-px bg-neutral-200 mb-14" />

            {/* Section 5 */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  {t.sections[4].label}
                </p>
                <h2 className="font-serif font-light text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
                  {t.sections[4].title}
                </h2>
              </div>
            </Reveal>

            <div className="space-y-6 mb-10">
              {t.sections[4].paragraphs.map((paragraph, i) => (
                <Reveal key={i}>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Closing highlight box */}
            <Reveal>
              <div className="bg-stone-100/60 rounded-xl px-8 py-10 space-y-5 mb-14">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">
                  {t.closingLabel}
                </p>
                <p className="font-serif text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
                  {t.closingQuote}
                </p>
              </div>
            </Reveal>

            {/* Final paragraph */}
            <div className="space-y-6">
              <Reveal>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  {t.final}
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
              {t.ctaSuites}
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3.5 rounded-full border border-neutral-900 text-neutral-900 text-sm tracking-wide hover:bg-neutral-900 hover:text-white transition-all duration-300"
            >
              {t.ctaBlog}
            </Link>
          </div>
        </Reveal>
      </SectionShell>

      <Footer />
    </div>
  );
}
