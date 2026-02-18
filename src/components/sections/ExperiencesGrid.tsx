"use client";

import { useState } from "react";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";

// ─── Types ──────────────────────────────────────────────────────────────────

type CategoryKey = "all" | "adventure" | "gastronomy" | "history" | "art" | "nature";

interface Experience {
  id: number;
  title: string;
  categoryKey: Exclude<CategoryKey, "all">;
  duration: string;
  description: string;
  imageSrc: string;
  highlights: string[];
}

// ─── Category labels ─────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, Record<CategoryKey, string>> = {
  tr: {
    all: "Tümü",
    adventure: "Macera",
    gastronomy: "Gastronomi",
    history: "Tarih",
    art: "Sanat",
    nature: "Doğa",
  },
  en: {
    all: "All",
    adventure: "Adventure",
    gastronomy: "Gastronomy",
    history: "History",
    art: "Art",
    nature: "Nature",
  },
  zh: {
    all: "全部",
    adventure: "探险",
    gastronomy: "美食",
    history: "历史",
    art: "艺术",
    nature: "自然",
  },
};

const CATEGORY_KEYS: CategoryKey[] = [
  "all",
  "adventure",
  "gastronomy",
  "history",
  "art",
  "nature",
];

const GRID_TITLE: Record<string, string> = {
  tr: "Popüler Deneyimler",
  en: "Popular Experiences",
  zh: "热门体验",
};

const CTA_LABEL: Record<string, string> = {
  tr: "Detayları sor →",
  en: "Ask for details →",
  zh: "询问详情 →",
};

// ─── Experiences data ────────────────────────────────────────────────────────

const EXPERIENCES: Record<string, Experience[]> = {
  tr: [
    {
      id: 1,
      title: "Sıcak Hava Balonu Turu",
      categoryKey: "adventure",
      duration: "3–4 saat",
      description:
        "Kapadokya'nın eşsiz peribacalarının üzerinde gün doğumuyla birlikte süzülün. Bölgenin kadim dokusunu hiç olmadığı kadar yakından hissedin.",
      imageSrc: "/images/terrace/cappadocia-hot-air-balloon.avif",
      highlights: ["Gün doğumu", "Kuş bakışı manzara"],
    },
    {
      id: 2,
      title: "Kapadokya Şarap Tadımı",
      categoryKey: "gastronomy",
      duration: "2–3 saat",
      description:
        "Bölgenin volkanik toprağında yetişen üzümlerden damıtılan şarapları tarihi bir mahzende keşfedin. Yerel üretici hikâyeleriyle süslü bir tadım deneyimi.",
      imageSrc: "/images/cappadocia-cave-house-kitchen.avif",
      highlights: ["Yerel mahzen", "Volkanik toprak bağları"],
    },
    {
      id: 3,
      title: "Yeraltı Şehri Turu",
      categoryKey: "history",
      duration: "2–3 saat",
      description:
        "Derinkuyu ve Kaymaklı'nın katmanlı derinliklerine inin. Binlerce yıl önce oyulmuş bu gizemli dünya, sizi zamanın dışına taşır.",
      imageSrc: "/images/cave-house.avif",
      highlights: ["Rehberli keşif", "8 kat derinlik"],
    },
    {
      id: 4,
      title: "Fotoğraf Safari",
      categoryKey: "art",
      duration: "4–5 saat",
      description:
        "Kapadokya'nın en fotojenik vadilerinde, altın ışık ve uzun gölgelerle dolu saatlerde rehberli bir görsel yolculuğa çıkın.",
      imageSrc: "/images/cappadocia-ortahisar-castle.avif",
      highlights: ["Altın saat ışığı", "Gizli rotalar"],
    },
    {
      id: 5,
      title: "Vadi Yürüyüşleri",
      categoryKey: "nature",
      duration: "3–4 saat",
      description:
        "Güvercinlik, Aşk ve İhlara vadilerinde sessizce yürüyün. Her vadinin kendi rengi, kokusu ve sesi var. Rehbersiz imkânsız anlatılan sırları öğrenin.",
      imageSrc: "/images/cave-house-cappadocia.avif",
      highlights: ["Rehberli yürüyüş", "3 farklı vadi"],
    },
    {
      id: 6,
      title: "ATV Safari",
      categoryKey: "adventure",
      duration: "2 saat",
      description:
        "Peribacaları arasında patikaları izleyerek gün batımına doğru tırmanın. Hız değil; özgürlük hissi ön planda.",
      imageSrc: "/images/cappadocia-balloon-terrace.avif",
      highlights: ["Off-road patikalar", "Gün batımı"],
    },
    {
      id: 7,
      title: "Geleneksel Türk Mutfağı",
      categoryKey: "gastronomy",
      duration: "3–4 saat",
      description:
        "Yerel bir mutfakta taze malzemelerle geleneksel yemekler pişirin. Tarif değil; el hafızası ve aile sırrı öğreneceksiniz.",
      imageSrc: "/images/kitchen/cave-house-kitchen.jpg",
      highlights: ["Ev mutfağı", "Yöresel tarifler"],
    },
    {
      id: 8,
      title: "Bisiklet Turları",
      categoryKey: "nature",
      duration: "3–4 saat",
      description:
        "Kapadokya'nın sakin köy yollarında ve vadileri boyunca uzanan patikalarda bisikletle ilerleyin. Tempo kendinize ait.",
      imageSrc: "/images/cappadocia-cave-house.avif",
      highlights: ["Kendi temponda", "Köy rotaları"],
    },
  ],
  en: [
    {
      id: 1,
      title: "Hot Air Balloon Ride",
      categoryKey: "adventure",
      duration: "3–4 hours",
      description:
        "Drift above Cappadocia's extraordinary fairy chimneys at sunrise. Feel the ancient landscape in a way that nothing else can offer.",
      imageSrc: "/images/terrace/cappadocia-hot-air-balloon.avif",
      highlights: ["Sunrise flight", "Bird's-eye panorama"],
    },
    {
      id: 2,
      title: "Cappadocia Wine Tasting",
      categoryKey: "gastronomy",
      duration: "2–3 hours",
      description:
        "Discover wines crafted from grapes grown in the region's volcanic soil, tasted in a historic cellar with stories from local producers.",
      imageSrc: "/images/cappadocia-cave-house-kitchen.avif",
      highlights: ["Historic cellar", "Volcanic vineyard"],
    },
    {
      id: 3,
      title: "Underground City Tour",
      categoryKey: "history",
      duration: "2–3 hours",
      description:
        "Descend into the layered depths of Derinkuyu and Kaymaklı. This mysterious world, carved thousands of years ago, transports you beyond time.",
      imageSrc: "/images/cave-house.avif",
      highlights: ["Guided exploration", "8 levels deep"],
    },
    {
      id: 4,
      title: "Photography Safari",
      categoryKey: "art",
      duration: "4–5 hours",
      description:
        "A guided visual journey through Cappadocia's most photogenic valleys during golden hour — long shadows, warm light, hidden angles.",
      imageSrc: "/images/cappadocia-ortahisar-castle.avif",
      highlights: ["Golden hour light", "Hidden routes"],
    },
    {
      id: 5,
      title: "Valley Hikes",
      categoryKey: "nature",
      duration: "3–4 hours",
      description:
        "Walk silently through Pigeon, Love and Ihlara valleys. Each has its own colour, scent and sound. Learn the secrets impossible to describe without a guide.",
      imageSrc: "/images/cave-house-cappadocia.avif",
      highlights: ["Guided walk", "3 distinct valleys"],
    },
    {
      id: 6,
      title: "ATV Safari",
      categoryKey: "adventure",
      duration: "2 hours",
      description:
        "Follow the trails between fairy chimneys toward sunset. Not about speed — it's the feeling of freedom that leads the way.",
      imageSrc: "/images/cappadocia-balloon-terrace.avif",
      highlights: ["Off-road trails", "Sunset views"],
    },
    {
      id: 7,
      title: "Traditional Turkish Cooking",
      categoryKey: "gastronomy",
      duration: "3–4 hours",
      description:
        "Cook traditional dishes with fresh local ingredients in a family kitchen. You won't learn a recipe — you'll learn muscle memory and family secrets.",
      imageSrc: "/images/kitchen/cave-house-kitchen.jpg",
      highlights: ["Home kitchen", "Regional recipes"],
    },
    {
      id: 8,
      title: "Cycling Tours",
      categoryKey: "nature",
      duration: "3–4 hours",
      description:
        "Cycle along Cappadocia's quiet village roads and valley trails. Set your own tempo — the landscape does the rest.",
      imageSrc: "/images/cappadocia-cave-house.avif",
      highlights: ["Your own pace", "Village routes"],
    },
  ],
  zh: [
    {
      id: 1,
      title: "热气球之旅",
      categoryKey: "adventure",
      duration: "3–4小时",
      description:
        "在日出时分飘浮于卡帕多西亚独特的仙烟囱之上，以前所未有的方式感受这片古老大地的神奇。",
      imageSrc: "/images/terrace/cappadocia-hot-air-balloon.avif",
      highlights: ["日出飞行", "鸟瞰全景"],
    },
    {
      id: 2,
      title: "卡帕多西亚品酒",
      categoryKey: "gastronomy",
      duration: "2–3小时",
      description:
        "在历史悠久的酒窖中品尝由该地区火山土壤中生长的葡萄酿制的美酒，聆听本地酿酒师的故事。",
      imageSrc: "/images/cappadocia-cave-house-kitchen.avif",
      highlights: ["历史酒窖", "火山葡萄园"],
    },
    {
      id: 3,
      title: "地下城市之旅",
      categoryKey: "history",
      duration: "2–3小时",
      description:
        "深入德林库尤和卡伊马克勒的层层地底。这个数千年前雕凿而成的神秘世界，将带您穿越时空。",
      imageSrc: "/images/cave-house.avif",
      highlights: ["向导探索", "8层深处"],
    },
    {
      id: 4,
      title: "摄影探索之旅",
      categoryKey: "art",
      duration: "4–5小时",
      description:
        "在黄金时段，跟随向导穿越卡帕多西亚最上镜的山谷——长长的阴影、温暖的光线、隐秘的角度。",
      imageSrc: "/images/cappadocia-ortahisar-castle.avif",
      highlights: ["黄金时光", "隐秘路线"],
    },
    {
      id: 5,
      title: "山谷徒步",
      categoryKey: "nature",
      duration: "3–4小时",
      description:
        "静静地穿越鸽子谷、爱之谷和伊赫拉拉谷。每个山谷都有自己的色彩、香气和声音。",
      imageSrc: "/images/cave-house-cappadocia.avif",
      highlights: ["向导陪同", "3条不同山谷"],
    },
    {
      id: 6,
      title: "ATV越野探险",
      categoryKey: "adventure",
      duration: "2小时",
      description:
        "沿着仙烟囱之间的小径驶向日落。不在于速度——自由的感觉才是主角。",
      imageSrc: "/images/cappadocia-balloon-terrace.avif",
      highlights: ["越野小径", "日落美景"],
    },
    {
      id: 7,
      title: "传统土耳其烹饪",
      categoryKey: "gastronomy",
      duration: "3–4小时",
      description:
        "在家庭厨房里用新鲜本地食材烹制传统菜肴。您学到的不只是食谱——而是手艺和家传秘方。",
      imageSrc: "/images/kitchen/cave-house-kitchen.jpg",
      highlights: ["家庭厨房", "地区特色菜谱"],
    },
    {
      id: 8,
      title: "骑行之旅",
      categoryKey: "nature",
      duration: "3–4小时",
      description:
        "沿着卡帕多西亚宁静的村庄道路和山谷小径骑行。按自己的节奏出发——风景会为您做好其余的一切。",
      imageSrc: "/images/cappadocia-cave-house.avif",
      highlights: ["自定节奏", "乡村路线"],
    },
  ],
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function ExperiencesGrid({ locale = "tr" }: { locale?: string }) {
  const [selectedKey, setSelectedKey] = useState<CategoryKey>("all");

  const labels = CATEGORY_LABELS[locale] ?? CATEGORY_LABELS.tr;
  const experiences = EXPERIENCES[locale] ?? EXPERIENCES.tr;
  const gridTitle = GRID_TITLE[locale] ?? GRID_TITLE.tr;
  const ctaLabel = CTA_LABEL[locale] ?? CTA_LABEL.tr;

  const filtered =
    selectedKey === "all"
      ? experiences
      : experiences.filter((e) => e.categoryKey === selectedKey);

  return (
    <>
      {/* ── E1: Category Filter ─────────────────────────────────────── */}
      <section className="bg-surface pb-8 md:pb-10">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex flex-wrap gap-2.5">
            {CATEGORY_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedKey(key)}
                className={[
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  selectedKey === key
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "border-black/10 bg-white/50 text-neutral-700 hover:bg-white/80",
                ].join(" ")}
              >
                {labels[key]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── E2: Experiences Cards ───────────────────────────────────── */}
      <section className="bg-surface pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-serif font-light tracking-tight text-ink mb-10 md:mb-12">
              {gridTitle}
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {filtered.map((exp, i) => (
              <Reveal key={exp.id} delayMs={i * 70}>
                <article className="rounded-2xl border border-black/5 bg-white/45 overflow-hidden group">
                  {/* Image */}
                  <div className="relative w-full aspect-[16/9] bg-stone-200 overflow-hidden">
                    <ParallaxImage
                      src={exp.imageSrc}
                      alt={exp.title}
                      className="absolute inset-0 w-full h-full"
                      strength={12}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category + Duration */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="text-xs tracking-[0.12em] uppercase text-neutral-500">
                        {labels[exp.categoryKey]}
                      </span>
                      <span className="text-neutral-300 select-none">·</span>
                      <span className="text-xs text-neutral-500">
                        {exp.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-serif font-light tracking-tight text-ink mb-3 leading-snug">
                      {exp.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-neutral-700 leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    {/* Highlight pills */}
                    {exp.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {exp.highlights.map((h) => (
                          <span
                            key={h}
                            className="rounded-full border border-black/8 bg-white/70 px-3 py-1 text-xs text-neutral-600"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Soft CTA – anchor to planning section */}
                    <a
                      href="#planlama"
                      className="text-sm text-neutral-500 hover:text-ink transition-colors"
                    >
                      {ctaLabel}
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
