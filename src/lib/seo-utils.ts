/**
 * SEO Utility Functions
 * Helper functions for generating metadata, schemas, and SEO tags
 */

import { Metadata } from 'next';
import { siteConfig, Locale } from './seo-config';

/**
 * Generate metadata for pages
 */
export function generatePageMetadata({
  title,
  description,
  keywords,
  path = '',
  locale = 'tr' as Locale,
  images,
  type = 'website' as 'website' | 'article',
  publishedTime,
  modifiedTime,
  authors,
}: {
  title: string;
  description: string;
  keywords?: string | string[];
  path?: string;
  locale?: Locale;
  images?: { url: string; width?: number; height?: number; alt?: string }[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}): Metadata {
  const url = `${siteConfig.baseUrl}/${locale}${path}`;
  const defaultImages = images || [
    {
      url: `${siteConfig.baseUrl}${siteConfig.images.ogDefault}`,
      width: 1200,
      height: 630,
      alt: siteConfig.name,
    },
  ];

  const keywordsArray = Array.isArray(keywords)
    ? keywords
    : keywords
    ? [keywords]
    : siteConfig.keywords[locale];

  const metadata: Metadata = {
    title,
    description,
    keywords: keywordsArray.join(', '),

    alternates: {
      canonical: url,
      languages: {
        'tr': `${siteConfig.baseUrl}/tr${path}`,
        'en': `${siteConfig.baseUrl}/en${path}`,
        'zh': `${siteConfig.baseUrl}/zh${path}`,
        'x-default': `${siteConfig.baseUrl}/en${path}`,
      },
    },

    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: defaultImages,
      locale,
      type,
      ...(type === 'article' && publishedTime && { publishedTime }),
      ...(type === 'article' && modifiedTime && { modifiedTime }),
      ...(type === 'article' && authors && { authors }),
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: defaultImages.map(img => img.url),
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}

/**
 * Generate breadcrumb data
 */
export function generateBreadcrumbs(
  items: { name: string; url: string }[],
  locale: Locale = 'tr'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.baseUrl}/${locale}${item.url}`,
    })),
  };
}

/**
 * Generate Hotel schema
 */
export function generateHotelSchema(locale: Locale = 'tr') {
  const { business } = siteConfig;

  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': `${siteConfig.baseUrl}/#hotel`,
    name: business.name,
    description: siteConfig.metadata[locale].home.description,
    image: `${siteConfig.baseUrl}${siteConfig.images.logo}`,
    telephone: business.telephone,
    email: business.email,
    url: siteConfig.baseUrl,
    priceRange: business.priceRange,
    starRating: {
      '@type': 'Rating',
      ratingValue: business.starRating,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.aggregateRating.ratingValue,
      reviewCount: business.aggregateRating.reviewCount,
      bestRating: business.aggregateRating.bestRating,
      worstRating: business.aggregateRating.worstRating,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    sameAs: Object.values(siteConfig.social),
  };
}

/**
 * Generate LocalBusiness schema
 */
export function generateLocalBusinessSchema(locale: Locale = 'tr') {
  const { business } = siteConfig;

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${siteConfig.baseUrl}/#business`,
    name: business.name,
    legalName: business.legalName,
    description: siteConfig.metadata[locale].home.description,
    image: `${siteConfig.baseUrl}${siteConfig.images.logo}`,
    telephone: business.telephone,
    email: business.email,
    url: siteConfig.baseUrl,
    priceRange: business.priceRange,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.aggregateRating.ratingValue,
      reviewCount: business.aggregateRating.reviewCount,
      bestRating: business.aggregateRating.bestRating,
      worstRating: business.aggregateRating.worstRating,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kitchen', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Private Terrace', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Hot Air Balloon View', value: true },
    ],
    sameAs: Object.values(siteConfig.social),
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Review schema
 */
export function generateReviewSchema(reviews: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}[]) {
  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
  }));
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  locale = 'tr' as Locale,
  slug,
}: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  locale?: Locale;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: `${siteConfig.baseUrl}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: authorName || siteConfig.name,
      url: siteConfig.baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.baseUrl}${siteConfig.images.logo}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.baseUrl}/${locale}/blog/${slug}`,
    },
    inLanguage: locale,
  };
}

/**
 * Generate image alt text helper
 */
export function generateImageAlt({
  subject,
  location = 'Anitya Cave House, Ortahisar, Cappadocia',
  locale = 'tr' as Locale,
}: {
  subject: string;
  location?: string;
  locale?: Locale;
}) {
  const templates = {
    tr: `${subject} - ${location}`,
    en: `${subject} - ${location}`,
    zh: `${subject} - ${location}`,
  };

  return templates[locale];
}

/**
 * Optimize keywords for locale
 */
export function getLocalizedKeywords(
  customKeywords: string[],
  locale: Locale = 'tr'
): string[] {
  return [...customKeywords, ...siteConfig.keywords[locale]];
}
