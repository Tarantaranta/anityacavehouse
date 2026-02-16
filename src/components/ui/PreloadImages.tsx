"use client";

import { useEffect } from "react";

interface PreloadImagesProps {
  images: string[];
}

export default function PreloadImages({ images }: PreloadImagesProps) {
  useEffect(() => {
    // Preload images in the background
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  return null; // This component doesn't render anything
}

// Utility function to preload a single image
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Utility function to preload multiple images
export function preloadImages(images: string[]): Promise<void[]> {
  return Promise.all(images.map(preloadImage));
}
