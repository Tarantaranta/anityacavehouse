import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { Link } from "@/i18n/routing";

export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date?: string;
  imageSrc: string;
  href: string;
  readText?: string;
}

interface BlogCardProps {
  post: BlogPost;
  delayMs?: number;
}

export default function BlogCard({ post, delayMs = 0 }: BlogCardProps) {
  const { title, excerpt, category, date, imageSrc, href, readText = "Oku →" } = post;

  return (
    <Reveal delayMs={delayMs}>
      <article>
        <Link href={href} className="group block">
          {/* Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-5 relative">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/15 pointer-events-none" />
          </div>

          {/* Meta */}
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-600 mb-2">
            {category}
            {date && (
              <span className="text-neutral-400"> · {date}</span>
            )}
          </p>

          {/* Title */}
          <h2 className="font-serif font-light text-2xl text-neutral-900 tracking-tight leading-snug mb-3 group-hover:text-neutral-600 transition-colors duration-200">
            {title}
          </h2>

          {/* Excerpt */}
          <p className="text-neutral-600 leading-relaxed text-sm mb-4">
            {excerpt}
          </p>

          {/* CTA */}
          <span className="text-sm text-neutral-800 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700 transition-all">
            {readText}
          </span>
        </Link>
      </article>
    </Reveal>
  );
}
