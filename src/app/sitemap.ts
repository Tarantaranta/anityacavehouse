import { MetadataRoute } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';

const locales = ['tr', 'en', 'zh'] as const;
const baseUrl = 'https://anityacavehouse.com';

// Dynamically get blog post slugs from filesystem
function getBlogPostSlugs(): string[] {
  try {
    const blogDir = join(process.cwd(), 'src/app/[locale]/blog');
    const entries = readdirSync(blogDir, { withFileTypes: true });

    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
  } catch (error) {
    // Fallback to empty array if directory doesn't exist
    console.warn('Blog directory not found, using empty blog posts array');
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/rooms',
    '/booking',
    '/experiences',
    '/activities',
    '/blog',
    '/gallery',
    '/contact',
    '/about',
    '/faq',
  ];

  // Dynamically fetch blog posts
  const blogPosts = getBlogPostSlugs();

  // Room slugs
  const roomSlugs = [
    'anitya-cave-suite',
    'sirahane-cave-suit',
    'dublex-stone-suit',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Main routes for each locale
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : route === '/blog' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route === '/rooms' || route === '/booking' ? 0.9 : 0.8,
        alternates: {
          languages: {
            tr: `${baseUrl}/tr${route}`,
            en: `${baseUrl}/en${route}`,
            zh: `${baseUrl}/zh${route}`,
          },
        },
      });
    });

    // Individual room pages
    roomSlugs.forEach((slug) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/rooms/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
        alternates: {
          languages: {
            tr: `${baseUrl}/tr/rooms/${slug}`,
            en: `${baseUrl}/en/rooms/${slug}`,
            zh: `${baseUrl}/zh/rooms/${slug}`,
          },
        },
      });
    });

    // Blog posts (dynamically generated)
    blogPosts.forEach((slug) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            tr: `${baseUrl}/tr/blog/${slug}`,
            en: `${baseUrl}/en/blog/${slug}`,
            zh: `${baseUrl}/zh/blog/${slug}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
