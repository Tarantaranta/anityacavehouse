/**
 * Breadcrumbs Component
 * SEO-friendly breadcrumb navigation with JSON-LD schema
 */

'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { ChevronRight } from 'lucide-react';
import { generateBreadcrumbs } from '@/lib/seo-utils';
import { Locale } from '@/lib/seo-config';
import StructuredData from './StructuredData';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale?: Locale;
  className?: string;
}

export function Breadcrumbs({ items, locale = 'tr', className = '' }: BreadcrumbsProps) {
  const schema = generateBreadcrumbs(items, locale);

  return (
    <>
      <StructuredData data={schema} />
      <nav
        aria-label="Breadcrumb"
        className={`py-4 ${className}`}
      >
        <ol className="flex items-center gap-2 text-sm text-ink-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.url} className="flex items-center gap-2">
                {!isLast ? (
                  <>
                    <Link
                      href={item.url}
                      className="hover:text-ink transition-colors"
                    >
                      {item.name}
                    </Link>
                    <ChevronRight className="h-4 w-4 text-ink-3" />
                  </>
                ) : (
                  <span className="text-ink font-medium" aria-current="page">
                    {item.name}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;
