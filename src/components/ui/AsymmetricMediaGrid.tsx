"use client";

import { motion, useReducedMotion } from "framer-motion";
import ImageCardAdvanced from "./ImageCardAdvanced";

interface MediaItem {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "16/10" | "4/5" | "4/3" | "1/1";
}

interface AsymmetricMediaGridProps {
  primary: MediaItem;
  secondary: MediaItem;
  reverse?: boolean;
}

export default function AsymmetricMediaGrid({
  primary,
  secondary,
  reverse = false,
}: AsymmetricMediaGridProps) {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Primary Image - Larger, wider */}
      <div className={reverse ? "col-span-12 md:col-span-5" : "col-span-12 md:col-span-8"}>
        <ImageCardAdvanced
          src={primary.src}
          alt={primary.alt}
          caption={primary.caption}
          aspect={primary.aspect || "16/10"}
          variant="editorial"
          parallaxStrength={15}
        />
      </div>

      {/* Secondary Image - Smaller, offset */}
      <div className={`col-span-12 md:pt-14 ${reverse ? "col-span-12 md:col-span-7" : "col-span-12 md:col-span-4"}`}>
        <ImageCardAdvanced
          src={secondary.src}
          alt={secondary.alt}
          caption={secondary.caption}
          aspect={secondary.aspect || "4/5"}
          variant="editorial"
          parallaxStrength={25}
        />
      </div>
    </div>
  );
}
