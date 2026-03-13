import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/data/',
          '/images/old-site/', // Old unused images - prevent indexing
        ],
      },
      // Special rules for Baidu (Chinese market optimization)
      {
        userAgent: 'Baiduspider',
        allow: '/zh/',
        crawlDelay: 1,
      },
      // Yandex optimization (Turkish/Russian market)
      {
        userAgent: 'Yandex',
        allow: '/',
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://anityacavehouse.com/sitemap.xml',
  };
}
