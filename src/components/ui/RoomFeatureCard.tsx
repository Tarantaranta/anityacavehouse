import { Link } from "@/i18n/routing";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";

export interface RoomFeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  capacity: number;
  capacityUnit?: string; // "kişi" | "guests" | "人"
  sizeSqm: string;
  typeLabel?: string;
  detailsHref: string;
  bookingHref: string;
  highlights: string[];
  detailsLabel?: string;
  bookingLabel?: string;
  /** Swap image/content order on md+ */
  reverse?: boolean;
}

export default function RoomFeatureCard({
  title,
  description,
  imageSrc,
  imageAlt,
  capacity,
  capacityUnit = "kişi",
  sizeSqm,
  typeLabel,
  detailsHref,
  bookingHref,
  highlights,
  detailsLabel = "Detaylar",
  bookingLabel = "Rezervasyon",
  reverse = false,
}: RoomFeatureCardProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
      {/* ── Image ── */}
      <div className={reverse ? "md:order-2" : "md:order-1"}>
        <Reveal>
          <ParallaxImage
            src={imageSrc}
            alt={imageAlt}
            className="w-full aspect-[16/9] rounded-2xl"
            strength={14}
          />
        </Reveal>
      </div>

      {/* ── Content ── */}
      <div
        className={[
          "flex flex-col gap-5",
          reverse ? "md:order-1" : "md:order-2",
        ].join(" ")}
      >
        <Reveal delayMs={100}>
          <h2 className="text-2xl md:text-3xl font-serif font-light tracking-tight text-ink leading-snug">
            {title}
          </h2>
        </Reveal>

        <Reveal delayMs={160}>
          <p className="text-sm md:text-base text-neutral-700 leading-relaxed max-w-[60ch]">
            {description}
          </p>
        </Reveal>

        {/* Specs row */}
        <Reveal delayMs={210}>
          <div className="flex items-center gap-3 text-sm text-ink-2">
            <span>
              {capacity} {capacityUnit}
            </span>
            <span className="text-line select-none">·</span>
            <span>{sizeSqm}</span>
            {typeLabel && (
              <>
                <span className="text-line select-none">·</span>
                <span>{typeLabel}</span>
              </>
            )}
          </div>
        </Reveal>

        {/* Selected highlights */}
        <Reveal delayMs={240}>
          <ul className="space-y-2 pt-1">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5 text-sm text-ink-2">
                <span className="w-[5px] h-[5px] rounded-full bg-accent flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* CTA buttons */}
        <Reveal delayMs={280}>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href={bookingHref as `/${string}`}
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              {bookingLabel}
            </Link>
            <Link
              href={detailsHref as `/${string}`}
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/50 px-5 py-3 text-sm font-medium hover:bg-white/70 transition-colors text-ink"
            >
              {detailsLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
