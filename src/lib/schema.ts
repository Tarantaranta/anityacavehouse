/**
 * Schema.org structured data utilities
 */

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Generate BreadcrumbList schema for SEO
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[], baseUrl: string = 'https://anityacavehouse.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || 'Anitya Cave House',
      url: 'https://anityacavehouse.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Anitya Cave House',
      logo: {
        '@type': 'ImageObject',
        url: 'https://anityacavehouse.com/images/logo.avif',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

/**
 * Generate Product schema for room pages
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string[];
  price?: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock';
  rating?: { value: number; count: number };
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
  };

  if (product.price && product.currency) {
    schema.offers = {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.availability
        ? `https://schema.org/${product.availability}`
        : 'https://schema.org/InStock',
    };
  }

  if (product.rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating.value,
      reviewCount: product.rating.count,
    };
  }

  return schema;
}
