"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

interface RoomGalleryProps {
  images: string[];
  alt: string;
}

export default function RoomGallery({ images, alt }: RoomGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (idx: number) => setLightboxIndex(idx);
  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
  const next = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length));

  if (!images || images.length === 0) return null;

  const [hero, ...rest] = images;

  return (
    <>
      {/* Hero + first 4 thumbnails */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Main image */}
        <button
          type="button"
          onClick={() => open(0)}
          className="relative h-96 md:h-[520px] bg-stone-200 rounded-lg overflow-hidden group focus:outline-none"
          aria-label={`${alt} - Ana fotoğraf`}
        >
          <Image
            src={hero}
            alt={`${alt} - Main`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </button>

        {/* Thumbnail grid (first 4 of rest) */}
        <div className="grid grid-cols-2 gap-4">
          {rest.slice(0, 4).map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => open(i + 1)}
              className="relative h-44 md:h-[252px] bg-stone-200 rounded-lg overflow-hidden group focus:outline-none"
              aria-label={`${alt} - Fotoğraf ${i + 2}`}
            >
              <Image
                src={src}
                alt={`${alt} - ${i + 2}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 50vw, 25vw"
                quality={85}
              />
              {/* "Tümünü gör" overlay on the last visible thumbnail if there are more */}
              {i === 3 && rest.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-sm font-light tracking-wider">
                    +{rest.length - 4} fotoğraf
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* All thumbnails strip (images 5+) */}
      {rest.length > 4 && (
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {rest.slice(4).map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => open(i + 5)}
              className="relative aspect-square bg-stone-200 rounded overflow-hidden group focus:outline-none"
              aria-label={`${alt} - Fotoğraf ${i + 6}`}
            >
              <Image
                src={src}
                alt={`${alt} - ${i + 6}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 25vw, 12vw"
                quality={85}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          current={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
          onGoTo={setLightboxIndex}
          alt={alt}
        />
      )}
    </>
  );
}
