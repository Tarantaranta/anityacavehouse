import Header2026 from "@/components/layout/Header2026";
import { Footer } from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionShell from "@/components/ui/SectionShell";
import BlogCard, { BlogPost } from "@/components/ui/BlogCard";
import Reveal from "@/components/ui/Reveal";

interface PageProps {
  params: Promise<{ locale: string }>;
}

// ─── Posts per locale ────────────────────────────────────────────────────────

const POSTS: Record<string, BlogPost[]> = {
  tr: [
    {
      title: "Ortahisar'da Sabah: Taş ve Işık",
      excerpt:
        "Güneş henüz kaleyi aşmadan, sokaklar taşın kendi sessizliğiyle konuşur. Ortahisar'ın sabahı yavaş başlar — ve bu yavaşlık bir lütuftur.",
      category: "Ortahisar",
      date: "Ocak 2026",
      imageSrc: "/images/blog-images/1.avif",
      href: "/blog/ortahisar-da-sabah-tas-ve-isik",
    },
    {
      title: "Güvercin Vadisi'nden Gün Batımı: Yürüyüş Rehberi",
      excerpt:
        "Peribacalarının arasından geçen bu rota, Kapadokya'nın en sessiz vadilerinden birini keşfetmenizi sağlar. Doğru zamanda yola çıkmanız için bilmeniz gerekenler.",
      category: "Rotalar",
      date: "Aralık 2025",
      imageSrc: "/images/blog-images/2.avif",
      href: "/blog/guvercin-vadisi-gun-batimi-yuruyus-rehberi",
    },
    {
      title: "Teras Sabahları: Balonlar ve Sessizlik",
      excerpt:
        "Her sabah farklı bir tablo. Anitya'nın terasından izlenen sıcak hava balonları, Kapadokya'nın en unutulmaz anlarından birini sunar.",
      category: "Ortahisar",
      date: "Kasım 2025",
      imageSrc: "/images/blog-images/3.avif",
      href: "/blog/teras-sabahlari-balonlar-ve-sessizlik",
    },
    {
      title: "Kapadokya Mutfağı: Testi Kebabından Pottery Sofralarına",
      excerpt:
        "Bölgenin yemek kültürü, toprağından kadar derindir. Yer altı sığınaklarında pişirilmiş yemeklerden günümüz sofralarına uzanan bir lezzet hikâyesi.",
      category: "Yemek",
      date: "Ekim 2025",
      imageSrc: "/images/blog-images/4.avif",
      href: "/blog/kapadokya-mutfagi-testi-kebabindan-pottery-sofralar",
    },
    {
      title: "Tüf Taşının Hikâyesi: Milyonlarca Yıllık Bir Miras",
      excerpt:
        "Kapadokya'nın kayaları bir zamanlar deniz dibiydi, sonra volkanik kül oldu, ardından rüzgâr onu şekillendirdi. Bu taşların içinde yaşamak, jeolojik zamanla temas kurmaktır.",
      category: "Taşın Hikâyesi",
      date: "Eylül 2025",
      imageSrc: "/images/blog-images/5.avif",
      href: "/blog/tuf-tasinin-hikayesi-milyonlarca-yillik-bir-miras",
    },
    {
      title: "Kapadokya'da Sıcak Hava Balonu: Pratik Her Şey",
      excerpt:
        "Hangi şirket, hangi rota, hangi mevsim, fiyatlar ve sabah 4'te kalkmanın gerçekten değip değmediği — tüm sorularınıza dürüst yanıtlar.",
      category: "İpuçları",
      date: "Ağustos 2025",
      imageSrc: "/images/blog-images/6.avif",
      href: "/blog/kapadokyada-sicak-hava-balonu-pratik-her-sey",
    },
  ],
  en: [
    {
      title: "Morning in Ortahisar: Stone and Light",
      excerpt:
        "Before the sun clears the castle, the streets speak with the stone's own silence. Morning in Ortahisar begins slowly — and that slowness is a gift.",
      category: "Ortahisar",
      date: "January 2026",
      imageSrc: "/images/blog-images/1.avif",
      href: "/blog/ortahisar-da-sabah-tas-ve-isik",
    },
    {
      title: "Sunset from Pigeon Valley: A Walking Guide",
      excerpt:
        "This route through the fairy chimneys lets you discover one of Cappadocia's quietest valleys. Everything you need to know to set out at the right time.",
      category: "Routes",
      date: "December 2025",
      imageSrc: "/images/blog-images/2.avif",
      href: "/blog/guvercin-vadisi-gun-batimi-yuruyus-rehberi",
    },
    {
      title: "Terrace Mornings: Balloons and Silence",
      excerpt:
        "Every morning a different painting. The hot air balloons watched from Anitya's terrace offer one of Cappadocia's most unforgettable moments.",
      category: "Ortahisar",
      date: "November 2025",
      imageSrc: "/images/blog-images/3.avif",
      href: "/blog/teras-sabahlari-balonlar-ve-sessizlik",
    },
    {
      title: "Cappadocia Cuisine: From Testi Kebab to Pottery Tables",
      excerpt:
        "The region's food culture runs as deep as its soil. A culinary story stretching from meals cooked in underground shelters to modern tables.",
      category: "Food",
      date: "October 2025",
      imageSrc: "/images/blog-images/4.avif",
      href: "/blog/kapadokya-mutfagi-testi-kebabindan-pottery-sofralar",
    },
    {
      title: "The Story of Tuff Stone: Millions of Years of Heritage",
      excerpt:
        "Cappadocia's rocks were once the sea floor, then volcanic ash, then shaped by wind. To live within these stones is to touch geological time.",
      category: "Stone Stories",
      date: "September 2025",
      imageSrc: "/images/blog-images/5.avif",
      href: "/blog/tuf-tasinin-hikayesi-milyonlarca-yillik-bir-miras",
    },
    {
      title: "Hot Air Balloon in Cappadocia: Everything You Need to Know",
      excerpt:
        "Which company, which route, which season, prices, and whether waking at 4am is really worth it — honest answers to all your questions.",
      category: "Tips",
      date: "August 2025",
      imageSrc: "/images/blog-images/6.avif",
      href: "/blog/kapadokyada-sicak-hava-balonu-pratik-her-sey",
    },
  ],
  zh: [
    {
      title: "奥塔希萨尔的早晨：石头与光",
      excerpt:
        "在太阳越过城堡之前，街道以石头自身的寂静低语。奥塔希萨尔的早晨缓缓开始——而这种缓慢是一份馈赠。",
      category: "奥塔希萨尔",
      date: "2026年1月",
      imageSrc: "/images/blog-images/1.avif",
      href: "/blog/ortahisar-da-sabah-tas-ve-isik",
    },
    {
      title: "鸽子谷的日落：徒步指南",
      excerpt:
        "穿越仙烟囱的这条路线让您发现卡帕多西亚最安静的山谷之一。在正确时间出发所需了解的一切。",
      category: "路线",
      date: "2025年12月",
      imageSrc: "/images/blog-images/2.avif",
      href: "/blog/guvercin-vadisi-gun-batimi-yuruyus-rehberi",
    },
    {
      title: "露台早晨：气球与寂静",
      excerpt:
        "每个早晨都是不同的画面。从Anitya露台望去的热气球，呈现卡帕多西亚最难忘的时刻之一。",
      category: "奥塔希萨尔",
      date: "2025年11月",
      imageSrc: "/images/blog-images/3.avif",
      href: "/blog/teras-sabahlari-balonlar-ve-sessizlik",
    },
    {
      title: "卡帕多西亚美食：从陶罐烤肉到陶器餐桌",
      excerpt:
        "该地区的饮食文化与其土壤一样深厚。从地下庇护所烹制的食物到现代餐桌的美食故事。",
      category: "美食",
      date: "2025年10月",
      imageSrc: "/images/blog-images/4.avif",
      href: "/blog/kapadokya-mutfagi-testi-kebabindan-pottery-sofralar",
    },
    {
      title: "凝灰岩的故事：数百万年的遗产",
      excerpt:
        "卡帕多西亚的岩石曾是海底，后成为火山灰，再被风塑造。在这些石头中生活，是与地质时间的接触。",
      category: "石头故事",
      date: "2025年9月",
      imageSrc: "/images/blog-images/5.avif",
      href: "/blog/tuf-tasinin-hikayesi-milyonlarca-yillik-bir-miras",
    },
    {
      title: "卡帕多西亚热气球：您需要知道的一切",
      excerpt:
        "选哪家公司、哪条路线、哪个季节、价格，以及凌晨4点起床是否真的值得——对所有问题的诚实回答。",
      category: "小贴士",
      date: "2025年8月",
      imageSrc: "/images/blog-images/6.avif",
      href: "/blog/kapadokyada-sicak-hava-balonu-pratik-her-sey",
    },
  ],
};

// ─── Category chips per locale ───────────────────────────────────────────────

const CATEGORIES: Record<string, string[]> = {
  tr: ["Tümü", "Ortahisar", "Rotalar", "Yemek", "Taşın Hikâyesi", "İpuçları"],
  en: ["All", "Ortahisar", "Routes", "Food", "Stone Stories", "Tips"],
  zh: ["全部", "奥塔希萨尔", "路线", "美食", "石头故事", "小贴士"],
};

// ─── Hero content per locale ─────────────────────────────────────────────────

const heroContent: Record<string, { label: string; title: string; subtitle: string; imageAlt: string; prev: string; next: string; page: string; readText: string }> = {
  tr: {
    label: "Anitya Journal",
    title: "Blog",
    subtitle: "Kapadokya'da ritim, mekân, yürüyüş rotaları, Ortahisar'ın sakin detayları.",
    imageAlt: "Kapadokya teras ve sıcak hava balonları",
    prev: "← Önceki",
    next: "Sonraki →",
    page: "1 / 1",
    readText: "Oku →",
  },
  en: {
    label: "Anitya Journal",
    title: "Blog",
    subtitle: "Rhythm, place, walking routes, and the quiet details of Ortahisar.",
    imageAlt: "Cappadocia terrace and hot air balloons",
    prev: "← Previous",
    next: "Next →",
    page: "1 / 1",
    readText: "Read →",
  },
  zh: {
    label: "Anitya Journal",
    title: "博客",
    subtitle: "节奏、地方、徒步路线，以及奥塔希萨尔的宁静细节。",
    imageAlt: "卡帕多西亚露台与热气球",
    prev: "← 上一页",
    next: "下一页 →",
    page: "1 / 1",
    readText: "阅读 →",
  },
};

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const posts = POSTS[locale] ?? POSTS.tr;
  const categories = CATEGORIES[locale] ?? CATEGORIES.tr;
  const h = heroContent[locale] ?? heroContent.tr;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      <Header2026 />

      {/* B0 — Hero */}
      <PageHero
        label={h.label}
        title={h.title}
        subtitle={h.subtitle}
        imageSrc="/images/cappadocia-balloon-terrace.avif"
        imageAlt={h.imageAlt}
      />

      {/* B1 — Category chips */}
      <SectionShell className="pb-0 md:pb-0">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <span
                key={cat}
                className={`px-4 py-2 rounded-full text-sm border border-black/10 ${
                  i === 0
                    ? "bg-neutral-900 text-white"
                    : "bg-white/50 text-neutral-700"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      {/* B2 — Blog card grid */}
      <SectionShell>
        <div className="grid md:grid-cols-2 gap-12">
          {posts.map((post, i) => (
            <BlogCard
              key={post.title}
              post={{ ...post, readText: h.readText }}
              delayMs={i * 60}
            />
          ))}
        </div>
      </SectionShell>

      {/* B3 — Pagination placeholder */}
      <SectionShell className="pt-0 md:pt-0 pb-20 md:pb-28">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <button
              disabled
              className="px-6 py-2.5 rounded-full border border-black/10 bg-white/50 text-sm text-neutral-400 cursor-default"
            >
              {h.prev}
            </button>
            <span className="text-sm text-neutral-500 px-3">{h.page}</span>
            <button
              disabled
              className="px-6 py-2.5 rounded-full border border-black/10 bg-white/50 text-sm text-neutral-400 cursor-default"
            >
              {h.next}
            </button>
          </div>
        </Reveal>
      </SectionShell>

      <Footer />
    </div>
  );
}
