"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [imageLoading, setImageLoading] = useState(true);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    setImageLoading(true);
  }, [current]);

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
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        const dy = e.changedTouches[0].clientY - touchStartY.current;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
          if (dx > 0) onPrev();
          else onNext();
        }
      }}
    >
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
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <svg className="w-8 h-8 text-white/50 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
            </svg>
          </div>
        )}
        <Image
          key={images[current]}
          src={images[current]}
          alt={`${alt} ${current + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 90vw"
          priority
          onLoad={() => setImageLoading(false)}
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
