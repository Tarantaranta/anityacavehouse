"use client";

import { useState } from "react";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";

// ─── Data ──────────────────────────────────────────────────────────────────

type Category = "Macera" | "Gastronomi" | "Tarih" | "Sanat" | "Doğa";

interface Experience {
  id: number;
  title: string;
  category: Category;
  duration: string;
  description: string;
  imageSrc: string;
  highlights: string[];
}

const EXPERIENCES: Experience[] = [
  {
    id: 1,
    title: "Sıcak Hava Balonu Turu",
    category: "Macera",
    duration: "3–4 saat",
    description:
      "Kapadokya'nın eşsiz peribacalarının üzerinde gün doğumuyla birlikte süzülün. Bölgenin kadim dokusunu hiç olmadığı kadar yakından hissedin.",
    imageSrc: "/images/terrace/cappadocia-hot-air-balloon.avif",
    highlights: ["Gün doğumu", "Kuş bakışı manzara"],
  },
  {
    id: 2,
    title: "Kapadokya Şarap Tadımı",
    category: "Gastronomi",
    duration: "2–3 saat",
    description:
      "Bölgenin volkanik toprağında yetişen üzümlerden damıtılan şarapları tarihi bir mahzende keşfedin. Yerel üretici hikâyeleriyle süslü bir tadım deneyimi.",
    imageSrc: "/images/cappadocia-cave-house-kitchen.avif",
    highlights: ["Yerel mahzen", "Volkanik toprak bağları"],
  },
  {
    id: 3,
    title: "Yeraltı Şehri Turu",
    category: "Tarih",
    duration: "2–3 saat",
    description:
      "Derinkuyu ve Kaymaklı'nın katmanlı derinliklerine inin. Binlerce yıl önce oyulmuş bu gizemli dünya, sizi zamanın dışına taşır.",
    imageSrc: "/images/cave-house.avif",
    highlights: ["Rehberli keşif", "8 kat derinlik"],
  },
  {
    id: 4,
    title: "Fotoğraf Safari",
    category: "Sanat",
    duration: "4–5 saat",
    description:
      "Kapadokya'nın en fotojenik vadilerinde, altın ışık ve uzun gölgelerle dolu saatlerde rehberli bir görsel yolculuğa çıkın.",
    imageSrc: "/images/cappadocia-ortahisar-castle.avif",
    highlights: ["Altın saat ışığı", "Gizli rotalar"],
  },
  {
    id: 5,
    title: "Vadi Yürüyüşleri",
    category: "Doğa",
    duration: "3–4 saat",
    description:
      "Güvercinlik, Aşk ve İhlara vadilerinde sessizce yürüyün. Her vadinin kendi rengi, kokusu ve sesi var. Rehbersiz imkânsız anlatılan sırları öğrenin.",
    imageSrc: "/images/cave-house-cappadocia.avif",
    highlights: ["Rehberli yürüyüş", "3 farklı vadi"],
  },
  {
    id: 6,
    title: "ATV Safari",
    category: "Macera",
    duration: "2 saat",
    description:
      "Peribacaları arasında patikaları izleyerek gün batımına doğru tırmanın. Hız değil; özgürlük hissi ön planda.",
    imageSrc: "/images/cappadocia-balloon-terrace.avif",
    highlights: ["Off-road patikalar", "Gün batımı"],
  },
  {
    id: 7,
    title: "Geleneksel Türk Mutfağı",
    category: "Gastronomi",
    duration: "3–4 saat",
    description:
      "Yerel bir mutfakta taze malzemelerle geleneksel yemekler pişirin. Tarif değil; el hafızası ve aile sırrı öğreneceksiniz.",
    imageSrc: "/images/kitchen/cave-house-kitchen.jpg",
    highlights: ["Ev mutfağı", "Yöresel tarifler"],
  },
  {
    id: 8,
    title: "Bisiklet Turları",
    category: "Doğa",
    duration: "3–4 saat",
    description:
      "Kapadokya'nın sakin köy yollarında ve vadileri boyunca uzanan patikalarda bisikletle ilerleyin. Tempo kendinize ait.",
    imageSrc: "/images/cappadocia-cave-house.avif",
    highlights: ["Kendi temponda", "Köy rotaları"],
  },
];

const ALL_CATEGORIES = [
  "Tümü",
  "Macera",
  "Gastronomi",
  "Tarih",
  "Sanat",
  "Doğa",
] as const;

// ─── Component ─────────────────────────────────────────────────────────────

export default function ExperiencesGrid() {
  const [selected, setSelected] = useState<string>("Tümü");

  const filtered =
    selected === "Tümü"
      ? EXPERIENCES
      : EXPERIENCES.filter((e) => e.category === selected);

  return (
    <>
      {/* ── E1: Category Filter ─────────────────────────────────────── */}
      <section className="bg-surface pb-8 md:pb-10">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex flex-wrap gap-2.5">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelected(cat)}
                className={[
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  selected === cat
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "border-black/10 bg-white/50 text-neutral-700 hover:bg-white/80",
                ].join(" ")}
              >
                {cat}
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
              Popüler Deneyimler
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
                        {exp.category}
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
                      Detayları sor →
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
