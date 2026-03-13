import { MetadataRoute } from 'next';

const locales = ['tr', 'en', 'zh'] as const;
const baseUrl = 'https://anityacavehouse.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/rooms',
    '/booking',
    '/experiences',
    '/blog',
    '/gallery',
    '/contact',
    '/about',
  ];

  // Blog post slugs
  const blogPosts = [
    'ortahisar-da-sabah-tas-ve-isik',
    'guvercin-vadisi-gun-batimi-yuruyus-rehberi',
    'kapadokya-mutfagi-testi-kebabindan-pottery-sofralar',
    'tuf-tasinin-hikayesi-milyonlarca-yillik-bir-miras',
    'kapadokyada-sicak-hava-balonu-pratik-her-sey',
    'teras-sabahlari-balonlar-ve-sessizlik',
  ];

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

    // Blog posts
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
