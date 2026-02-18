/**
 * ReviewSourceNote
 * ─────────────────────────────────────────────────────────────
 * Minimal, premium "verified via Airbnb" note.
 * One line. Monochrome. No marketing language.
 * ─────────────────────────────────────────────────────────────
 */

interface ReviewSourceNoteProps {
  href?: string;
  className?: string;
  /** Show Airbnb bélo icon (default: true) */
  showIcon?: boolean;
  /** Override the note text */
  text?: string;
  /** Override the link label */
  linkLabel?: string;
}

/** Simplified Airbnb bélo mark – single-color inline SVG */
function AirbnbBelo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 1C8.14 1 5 4.09 5 7.9c0 2.1.9 3.9 2.3 5.9l4.7 7.4 4.7-7.4C18.1 11.8 19 10 19 7.9 19 4.09 15.86 1 12 1zm0 9.8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  );
}

export default function ReviewSourceNote({
  href = "https://www.airbnb.com/rooms/2953140",
  className = "",
  showIcon = true,
  text = "Veriler Airbnb üzerinden doğrulanmıştır",
  linkLabel = "Yorumları gör →",
}: ReviewSourceNoteProps) {
  return (
    <div
      className={[
        "mt-6 flex flex-wrap items-center gap-2 text-xs tracking-wide text-neutral-500",
        className,
      ].join(" ")}
    >
      {showIcon && (
        <AirbnbBelo className="h-3.5 w-3.5 shrink-0 opacity-70" />
      )}
      <span>{text}</span>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 underline underline-offset-4 hover:text-neutral-800 transition-colors"
        >
          {linkLabel}
        </a>
      )}
    </div>
  );
}
