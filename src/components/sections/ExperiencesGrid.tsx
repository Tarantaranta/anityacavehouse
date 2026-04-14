"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import { experiences as unifiedExperiences, getLocalizedContent } from "@/data/experiences";

// ─── Types ───────────────────────────────────────────────────────────────────

type CategoryKey =
  | "all"
  | "adventure"
  | "gastronomy"
  | "history"
  | "art"
  | "nature"
  | "special"
  | "wellness";

interface Experience {
  id: number;
  title: string;
  categoryKey: Exclude<CategoryKey, "all">;
  duration: string;
  description: string;
  longDescription?: string;
  imageSrc: string;
  highlights: string[];
}

// ─── Labels ──────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, Record<CategoryKey, string>> = {
  tr: {
    all: "Tümü",
    adventure: "Macera",
    gastronomy: "Gastronomi",
    history: "Tarih",
    art: "Sanat",
    nature: "Doğa",
    special: "Özel",
    wellness: "Wellness",
  },
  en: {
    all: "All",
    adventure: "Adventure",
    gastronomy: "Gastronomy",
    history: "History",
    art: "Art",
    nature: "Nature",
    special: "Special",
    wellness: "Wellness",
  },
  zh: {
    all: "全部",
    adventure: "探险",
    gastronomy: "美食",
    history: "历史",
    art: "艺术",
    nature: "自然",
    special: "定制",
    wellness: "健康",
  },
};

const CATEGORY_KEYS: CategoryKey[] = [
  "all",
  "adventure",
  "gastronomy",
  "history",
  "art",
  "nature",
  "special",
  "wellness",
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

const MODAL_CLOSE: Record<string, string> = {
  tr: "Kapat",
  en: "Close",
  zh: "关闭",
};

const MODAL_CONTACT: Record<string, string> = {
  tr: "WhatsApp ile bilgi al",
  en: "Get info on WhatsApp",
  zh: "通过WhatsApp咨询",
};

const MODAL_NAV: Record<string, { prev: string; next: string }> = {
  tr: { prev: "Önceki", next: "Sonraki" },
  en: { prev: "Previous", next: "Next" },
  zh: { prev: "上一个", next: "下一个" },
};

// ─── Experiences data ─────────────────────────────────────────────────────────
// Now sourced from unified experiences.ts with locale-based transformation

// Category mapping from unified -> ExperiencesGrid format
const CATEGORY_MAP: Record<string, Exclude<CategoryKey, "all">> = {
  adventure: "adventure",
  culture: "art",
  photo: "special",
  nature: "nature",
  tour: "history",
  wellness: "wellness",
  gastronomy: "gastronomy",
}

// Transform unified experiences into locale-based arrays
const EXPERIENCES: Record<string, Experience[]> = {
  tr: unifiedExperiences.map((exp, idx) => {
    const content = getLocalizedContent(exp, "tr")
    return {
      id: idx + 1,
      title: content.title,
      categoryKey: CATEGORY_MAP[exp.category] || "adventure",
      duration: exp.duration,
      description: content.description,
      longDescription: content.longDescription,
      imageSrc: exp.image,
      highlights: content.highlights,
    }
  }),

  en: unifiedExperiences.map((exp, idx) => {
    const content = getLocalizedContent(exp, "en")
    return {
      id: idx + 1,
      title: content.title,
      categoryKey: CATEGORY_MAP[exp.category] || "adventure",
      duration: exp.duration,
      description: content.description,
      longDescription: content.longDescription,
      imageSrc: exp.image,
      highlights: content.highlights,
    }
  }),

  zh: unifiedExperiences.map((exp, idx) => {
    const content = getLocalizedContent(exp, "zh")
    return {
      id: idx + 1,
      title: content.title,
      categoryKey: CATEGORY_MAP[exp.category] || "adventure",
      duration: exp.duration,
      description: content.description,
      longDescription: content.longDescription,
      imageSrc: exp.image,
      highlights: content.highlights,
    }
  }),
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function ExperiencesGrid({ locale = "tr" }: { locale?: string }) {
  const [selectedKey, setSelectedKey] = useState<CategoryKey>("all");
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const labels = CATEGORY_LABELS[locale] ?? CATEGORY_LABELS.tr;
  const experiences = EXPERIENCES[locale] ?? EXPERIENCES.tr;
  const gridTitle = GRID_TITLE[locale] ?? GRID_TITLE.tr;
  const ctaLabel = CTA_LABEL[locale] ?? CTA_LABEL.tr;
  const modalClose = MODAL_CLOSE[locale] ?? MODAL_CLOSE.tr;
  const modalContact = MODAL_CONTACT[locale] ?? MODAL_CONTACT.tr;
  const modalNav = MODAL_NAV[locale] ?? MODAL_NAV.tr;

  const filtered =
    selectedKey === "all"
      ? experiences
      : experiences.filter((e) => e.categoryKey === selectedKey);

  // Keyboard navigation for modal
  useEffect(() => {
    if (modalIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalIndex(null);
      if (e.key === "ArrowRight")
        setModalIndex((i) => (i !== null ? (i + 1) % filtered.length : 0));
      if (e.key === "ArrowLeft")
        setModalIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalIndex, filtered.length]);

  // Body scroll lock when modal is open
  useEffect(() => {
    document.body.style.overflow = modalIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalIndex]);

  return (
    <>
      {/* ── E1: Category Filter ──────────────────────────────────────── */}
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

      {/* ── E2: Experience Cards ─────────────────────────────────────── */}
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
                <article
                  className="rounded-2xl border border-black/5 bg-white/45 overflow-hidden group cursor-pointer"
                  onClick={() => setModalIndex(i)}
                >
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

                    {/* Short description — always shown on card */}
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

                    {/* CTA */}
                    <a
                      href="#planlama"
                      onClick={(e) => e.stopPropagation()}
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

      {/* ── Modal ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalIndex !== null && (() => {
          const exp = filtered[modalIndex];
          if (!exp) return null;
          const hasPrev = filtered.length > 1;
          const hasNext = filtered.length > 1;
          return (
            <motion.div
              key="modal-backdrop"
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setModalIndex(null)}
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
                touchStartY.current = e.touches[0].clientY;
              }}
              onTouchEnd={(e) => {
                const dx = e.changedTouches[0].clientX - touchStartX.current;
                const dy = e.changedTouches[0].clientY - touchStartY.current;
                if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                  if (dx > 0)
                    setModalIndex((i) => i !== null ? (i - 1 + filtered.length) % filtered.length : 0);
                  else
                    setModalIndex((i) => i !== null ? (i + 1) % filtered.length : 0);
                }
              }}
            >
              <motion.div
                className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-white sm:rounded-2xl shadow-2xl"
                initial={{ scale: 0.9, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setModalIndex(null)}
                  aria-label={modalClose}
                  className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth={2} strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Modal image */}
                <div className="relative w-full aspect-[16/9] bg-stone-200 overflow-hidden sm:rounded-t-2xl">
                  <ParallaxImage
                    src={exp.imageSrc}
                    alt={exp.title}
                    className="absolute inset-0 w-full h-full"
                    strength={8}
                  />
                  {/* Prev / Next arrows on image */}
                  {hasPrev && (
                    <button
                      type="button"
                      aria-label={modalNav.prev}
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalIndex((i) => i !== null ? (i - 1 + filtered.length) % filtered.length : 0);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                  {hasNext && (
                    <button
                      type="button"
                      aria-label={modalNav.next}
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalIndex((i) => i !== null ? (i + 1) % filtered.length : 0);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>

                {/* Modal content */}
                <div className="p-6 md:p-8">
                  {/* Category + Duration + Counter */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-xs tracking-[0.12em] uppercase text-neutral-500">
                      {labels[exp.categoryKey as CategoryKey]}
                    </span>
                    <span className="text-neutral-300 select-none">·</span>
                    <span className="text-xs text-neutral-500">{exp.duration}</span>
                    <span className="ml-auto text-xs text-neutral-400 tabular-nums">
                      {modalIndex + 1} / {filtered.length}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-serif font-light tracking-tight text-ink mb-6 leading-snug">
                    {exp.title}
                  </h2>

                  {/* Description paragraphs */}
                  <div className="space-y-4 mb-8">
                    {(exp.longDescription ?? exp.description)
                      .split("\n\n")
                      .map((para: string, idx: number) => (
                        <p
                          key={idx}
                          className={
                            idx === 0
                              ? "text-base font-medium text-ink leading-relaxed"
                              : "text-sm text-neutral-700 leading-relaxed"
                          }
                        >
                          {para}
                        </p>
                      ))}
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/905444946814"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.526 5.847L0 24l6.353-1.497A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.37l-.36-.213-3.728.878.944-3.637-.234-.373A9.818 9.818 0 0112 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.421-4.398 9.818-9.818 9.818z" />
                    </svg>
                    {modalContact}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </>
  );
}
