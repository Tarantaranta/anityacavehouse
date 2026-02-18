import { ReactNode } from "react";

interface ContactCardProps {
  title: string;
  detail: string;
  subDetail?: string;
  href: string;
  linkLabel?: string;
  icon: ReactNode;
}

/**
 * Single contact channel card.
 * rounded-2xl border-black/5 bg-white/50 – matches the interior page design system.
 */
export default function ContactCard({
  title,
  detail,
  subDetail,
  href,
  linkLabel,
  icon,
}: ContactCardProps) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white/50 p-8 flex flex-col gap-4">
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center text-neutral-600">
        {icon}
      </div>

      {/* Content */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
          {title}
        </p>
        <a
          href={href}
          className="text-neutral-900 font-light text-lg hover:text-neutral-600 transition-colors duration-200 leading-snug block"
        >
          {linkLabel ?? detail}
        </a>
        {subDetail && (
          <p className="text-sm text-neutral-500 mt-1">{subDetail}</p>
        )}
      </div>
    </div>
  );
}
