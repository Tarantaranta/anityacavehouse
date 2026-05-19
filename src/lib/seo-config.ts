/**
 * Global SEO Configuration
 * Centralized SEO settings for Anitya Cave House
 */

export const siteConfig = {
  name: 'Anitya Cave House',
  baseUrl: 'https://anityacavehouse.com',
  defaultLocale: 'tr',
  locales: ['tr', 'en', 'zh'] as const,

  business: {
    name: 'Anitya Cave House',
    legalName: 'Anitya Cave House Otel',
    telephone: '+90 384 343 3181',
    email: 'info@anityacavehouse.com',
    address: {
      streetAddress: 'Ortahisar, Nevşehir',
      addressLocality: 'Ortahisar',
      addressRegion: 'Nevşehir',
      postalCode: '50650',
      addressCountry: 'TR',
    },
    geo: {
      latitude: 38.6405,
      longitude: 34.8563,
    },
    priceRange: '€€€',
    starRating: 5,
    aggregateRating: {
      ratingValue: 4.95,
      reviewCount: 287,
      bestRating: 5,
      worstRating: 1,
    },
  },

  social: {
    instagram: 'https://www.instagram.com/anityacavehouse',
    facebook: 'https://www.facebook.com/anityacavehouse',
    airbnb: 'https://www.airbnb.com/users/show/12345678',
  },

  images: {
    logo: '/images/cappadocia-cave-house.avif',
    ogDefault: '/images/cappadocia-cave-house.avif',
  },

  keywords: {
    tr: [
      'kapadokya otelleri',
      'mağara otelleri kapadokya',
      'ortahisar konaklama',
      'bağımsız suite',
      'kapadokya mağara evi',
      'butik otel kapadokya',
      'kapadokya bağımsız oda',
      'ortahisar otelleri',
      'kapadokya taş ev',
      'kapadokya özel oda',
    ],
    en: [
      'cappadocia hotels',
      'cave hotels cappadocia',
      'ortahisar accommodation',
      'independent suite',
      'cappadocia cave house',
      'boutique hotel cappadocia',
      'private cave house',
      'ortahisar hotels',
      'cappadocia stone house',
      'cappadocia private room',
    ],
    zh: [
      '卡帕多西亚酒店',
      '洞穴酒店',
      '奥塔希萨尔住宿',
      '独立套房',
      '精品酒店',
      '卡帕多西亚洞穴房',
      '私人洞穴房',
      '奥塔希萨尔酒店',
      '卡帕多西亚石头房',
    ],
  },

  metadata: {
    tr: {
      home: {
        title: 'Anitya Cave House – Ortahisar Kapadokya Bağımsız Mağara ve Taş Suite Evler',
        description: 'Kapadokya Ortahisar\'da bulunan Anitya Cave House, ortak alanı olmayan bağımsız mağara ve taş suite evlerden oluşur. Özel teras, donanımlı mutfak, mahremiyet odaklı tasarım.',
      },
      rooms: {
        title: 'Suitlerimiz – Mağara ve Taş Suite Evler | Anitya Cave House',
        description: 'Her biri kendine özgü karaktere sahip bağımsız mağara ve taş suite evlerimizi keşfedin. Özel mutfak, teras ve modern konfor.',
      },
      booking: {
        title: 'Rezervasyon – Anitya Cave House Kapadokya',
        description: 'Anitya Cave House\'da bağımsız suite evinizi rezerve edin. Direkt rezervasyon avantajları ve en iyi fiyat garantisi.',
      },
      blog: {
        title: 'Blog – Kapadokya Rehberi | Anitya Cave House',
        description: 'Kapadokya\'da ritim, mekân, yürüyüş rotaları, Ortahisar\'ın sakin detayları. Yerel rehber ve ipuçları.',
      },
    },
    en: {
      home: {
        title: 'Anitya Cave House – Independent Cave & Stone Suites in Ortahisar, Cappadocia',
        description: 'Anitya Cave House in Ortahisar, Cappadocia features independent cave and stone suite houses with no shared common areas. Private terrace, equipped kitchen, privacy-focused design.',
      },
      rooms: {
        title: 'Our Suites – Cave & Stone Suite Houses | Anitya Cave House',
        description: 'Discover our independent cave and stone suite houses, each with its own unique character. Private kitchen, terrace, and modern comfort.',
      },
      booking: {
        title: 'Booking – Anitya Cave House Cappadocia',
        description: 'Reserve your independent suite house at Anitya Cave House. Direct booking benefits and best price guarantee.',
      },
      blog: {
        title: 'Blog – Cappadocia Guide | Anitya Cave House',
        description: 'Rhythm, place, walking routes, and the quiet details of Ortahisar. Local guide and tips.',
      },
    },
    zh: {
      home: {
        title: 'Anitya洞穴之家 – 卡帕多西亚奥塔希萨尔独立洞穴和石头套房',
        description: '位于卡帕多西亚奥塔希萨尔的Anitya洞穴之家，设有独立的洞穴和石头套房，没有共享公共区域。私人露台、设备齐全的厨房、注重隐私的设计。',
      },
      rooms: {
        title: '我们的套房 – 洞穴和石头套房 | Anitya洞穴之家',
        description: '探索我们独立的洞穴和石头套房，每间都有独特的个性。私人厨房、露台和现代舒适。',
      },
      booking: {
        title: '预订 – Anitya洞穴之家卡帕多西亚',
        description: '在Anitya洞穴之家预订您的独立套房。直接预订优势和最优价格保证。',
      },
      blog: {
        title: '博客 – 卡帕多西亚指南 | Anitya洞穴之家',
        description: '节奏、地方、徒步路线，以及奥塔希萨尔的宁静细节。本地指南和建议。',
      },
    },
  },
} as const;

export type Locale = typeof siteConfig.locales[number];
