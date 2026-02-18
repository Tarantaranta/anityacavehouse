import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";

interface PageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
}

/**
 * Shared page hero used across /gallery, /blog, /about, /contact.
 * Server component – imports client components (ParallaxImage, Reveal).
 */
export default function PageHero({
  label,
  title,
  subtitle,
  imageSrc,
  imageAlt,
}: PageHeroProps) {
  return (
    <section className="pt-28 md:pt-36">
      {/* Text row */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 pb-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-neutral-500 mb-4">
            {label}
          </p>
        </Reveal>
        <Reveal delayMs={80}>
          <h1 className="font-serif font-light text-4xl md:text-6xl text-neutral-900 tracking-tight leading-tight mb-5">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delayMs={160}>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-[62ch]">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>

      {/* Hero image */}
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="aspect-[16/9] rounded-2xl overflow-hidden">
          <ParallaxImage
            src={imageSrc}
            alt={imageAlt}
            strength={16}
            priority
            className="w-full h-full"
            sizes="(max-width: 768px) 100vw, 1152px"
          />
        </div>
      </div>
    </section>
  );
}
