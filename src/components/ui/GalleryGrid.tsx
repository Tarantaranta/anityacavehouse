"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ChipFilters from "@/components/ui/ChipFilters";

export interface GalleryImage {
  src: string;
  alt: string;
  tag: string; // canonical English key: "Terrace" | "Interior" | "Kitchen" | "Ortahisar" | "Detail"
}

interface GalleryGridProps {
  images: GalleryImage[];
  locale?: string;
}

// ─── Filter labels per locale ────────────────────────────────────────────────

const FILTER_LABELS: Record<string, Record<string, string>> = {
  tr: {
    all: "Tümü",
    Terrace: "Teras",
    Interior: "İç Mekân",
    Kitchen: "Mutfak",
    Ortahisar: "Ortahisar",
    Detail: "Detay",
    General: "Genel",
    Activities: "Aktiviteler",
  },
  en: {
    all: "All",
    Terrace: "Terrace",
    Interior: "Interior",
    Kitchen: "Kitchen",
    Ortahisar: "Ortahisar",
    Detail: "Detail",
    General: "General",
    Activities: "Activities",
  },
  zh: {
    all: "全部",
    Terrace: "露台",
    Interior: "室内",
    Kitchen: "厨房",
    Ortahisar: "奥塔希萨尔",
    Detail: "细节",
    General: "综合",
    Activities: "活动",
  },
};

const ARIA_LABELS: Record<string, { close: string; prev: string; next: string }> = {
  tr: { close: "Kapat", prev: "Önceki", next: "Sonraki" },
  en: { close: "Close", prev: "Previous", next: "Next" },
  zh: { close: "关闭", prev: "上一张", next: "下一张" },
};

const CANONICAL_TAGS = ["Terrace", "Interior", "Kitchen", "Ortahisar", "Detail", "General", "Activities"];

export default function GalleryGrid({ images, locale = "tr" }: GalleryGridProps) {
  const [activeTag, setActiveTag] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const labels = FILTER_LABELS[locale] ?? FILTER_LABELS.tr;
  const aria = ARIA_LABELS[locale] ?? ARIA_LABELS.tr;

  const filterOptions = [
    { id: "all", label: labels.all },
    ...CANONICAL_TAGS.map((tag) => ({ id: tag, label: labels[tag] ?? tag })),
  ];

  const filtered =
    activeTag === "all" ? images : images.filter((img) => img.tag === activeTag);

  // ESC to close lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) =>
          i !== null ? (i + 1) % filtered.length : null
        );
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i !== null ? (i - 1 + filtered.length) % filtered.length : null
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, filtered.length]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      {/* Filter chips */}
      <ChipFilters
        options={filterOptions}
        active={activeTag}
        onChange={setActiveTag}
        className="mb-10"
      />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filtered.map((img, idx) => (
          <button
            key={`${img.src}-${idx}`}
            onClick={() => setLightboxIndex(idx)}
            className="group relative aspect-[16/9] rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
            aria-label={img.alt}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-10"
          onClick={(e) => {
            if (e.target === lightboxRef.current) setLightboxIndex(null);
          }}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            aria-label={aria.close}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Prev */}
          {filtered.length > 1 && (
            <button
              onClick={() =>
                setLightboxIndex((i) =>
                  i !== null ? (i - 1 + filtered.length) % filtered.length : 0
                )
              }
              className="absolute left-3 md:left-6 text-white/70 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label={aria.prev}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Image */}
          <div className="relative w-full max-w-4xl aspect-[16/9] rounded-xl overflow-hidden">
            <Image
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 80vw"
              priority
            />
          </div>

          {/* Caption */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-wide">
            {filtered[lightboxIndex].alt}
          </p>

          {/* Next */}
          {filtered.length > 1 && (
            <button
              onClick={() =>
                setLightboxIndex((i) =>
                  i !== null ? (i + 1) % filtered.length : 0
                )
              }
              className="absolute right-3 md:right-6 text-white/70 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label={aria.next}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}
