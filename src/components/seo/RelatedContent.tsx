/**
 * Related Content Component
 * Internal linking component for SEO and user engagement
 */

'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';

export interface RelatedItem {
  title: string;
  excerpt: string;
  href: string;
  image?: string;
  category?: string;
}

interface RelatedContentProps {
  items: RelatedItem[];
  title?: string;
  className?: string;
}

export function RelatedContent({
  items,
  title = 'İlgili İçerikler',
  className = '',
}: RelatedContentProps) {
  if (items.length === 0) return null;

  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-serif font-light text-ink mb-8">
            {title}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <Reveal key={item.href} delayMs={index * 80}>
              <Link href={item.href} className="group">
                <div className="bg-white/50 border border-black/5 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  {item.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {item.category && (
                      <p className="text-xs uppercase tracking-widest text-ink-3 mb-2">
                        {item.category}
                      </p>
                    )}
                    <h3 className="text-lg font-serif font-light text-ink mb-2 group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink-2 line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedContent;
