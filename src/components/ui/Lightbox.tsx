"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";

interface LightboxProps {
  images: string[];
  current: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (idx: number) => void;
  alt?: string;
}

export default function Lightbox({
  images,
  current,
  onClose,
  onPrev,
  onNext,
  onGoTo,
  alt = "Suite",
}: LightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/92 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/50 transition"
        aria-label="Kapat"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-xs text-white/50 tracking-widest tabular-nums">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition"
        aria-label="Önceki"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={onNext}
        className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition"
        aria-label="Sonraki"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative z-10 w-full max-w-5xl mx-4 aspect-[4/3]">
        <Image
          key={images[current]}
          src={images[current]}
          alt={`${alt} ${current + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 90vw"
          priority
        />
      </div>

      {/* Dot strip */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onGoTo(idx)}
            className={`rounded-full transition-all ${idx === current ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"}`}
            aria-label={`Fotoğraf ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
