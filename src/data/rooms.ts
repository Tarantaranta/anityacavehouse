export interface Room {
  id: string;
  slug: string;
  name: {
    tr: string;
    en: string;
    zh: string;
  };
  description: {
    tr: string;
    en: string;
    zh: string;
  };
  shortDescription: {
    tr: string;
    en: string;
    zh: string;
  };
  capacity: number;
  size: number; // m²
  pricePerNight: number;
  images: string[];
  amenities: string[];
  featured: boolean;
  airbnbCalendarId?: string;
}

export const rooms: Room[] = [
  {
    id: '1',
    slug: 'deluxe-cave-suite',
    name: {
      tr: 'Deluxe Mağara Süit',
      en: 'Deluxe Cave Suite',
      zh: '豪华洞穴套房',
    },
    description: {
      tr: 'Kapadokya\'nın eşsiz kayalara oyulmuş mimarisini modern lüks ile birleştiren Deluxe Mağara Süit\'imiz, unutulmaz bir konaklama deneyimi sunuyor. Orijinal taş duvarlar ve çağdaş tasarım unsurlarının mükemmel uyumunu yaşayın.',
      en: 'Our Deluxe Cave Suite combines Cappadocia\'s unique rock-carved architecture with modern luxury, offering an unforgettable accommodation experience. Experience the perfect harmony of original stone walls and contemporary design elements.',
      zh: '我们的豪华洞穴套房将卡帕多西亚独特的岩石雕刻建筑与现代奢华相结合，提供难忘的住宿体验。体验原始石墙与现代设计元素的完美融合。',
    },
    shortDescription: {
      tr: 'Modern konfor ile tarihi dokuyu birleştiren lüks süit',
      en: 'Luxury suite combining modern comfort with historical texture',
      zh: '结合现代舒适与历史质感的豪华套房',
    },
    capacity: 2,
    size: 35,
    pricePerNight: 150,
    images: [
      '/images/rooms/deluxe-1.jpg',
      '/images/rooms/deluxe-2.jpg',
      '/images/rooms/deluxe-3.jpg',
    ],
    amenities: [
      'king-bed',
      'wifi',
      'breakfast',
      'jacuzzi',
      'balcony',
      'minibar',
      'safe',
      'heating',
    ],
    featured: true,
    airbnbCalendarId: '1',
  },
  {
    id: '2',
    slug: 'standard-cave-room',
    name: {
      tr: 'Standart Mağara Oda',
      en: 'Standard Cave Room',
      zh: '标准洞穴房',
    },
    description: {
      tr: 'Kapadokya\'nın geleneksel mağara mimarisini deneyimleyin. Rahat ve konforlu Standart Mağara Odamız, bütçe dostu fiyatlarla otantik bir konaklama sunuyor.',
      en: 'Experience Cappadocia\'s traditional cave architecture. Our comfortable and cozy Standard Cave Room offers authentic accommodation at budget-friendly prices.',
      zh: '体验卡帕多西亚的传统洞穴建筑。我们舒适温馨的标准洞穴房以实惠的价格提供正宗的住宿。',
    },
    shortDescription: {
      tr: 'Rahat ve otantik, bütçe dostu mağara oda',
      en: 'Comfortable and authentic, budget-friendly cave room',
      zh: '舒适正宗的经济型洞穴房',
    },
    capacity: 2,
    size: 25,
    pricePerNight: 100,
    images: [
      '/images/rooms/standard-1.jpg',
      '/images/rooms/standard-2.jpg',
    ],
    amenities: [
      'double-bed',
      'wifi',
      'breakfast',
      'heating',
      'safe',
    ],
    featured: false,
    airbnbCalendarId: '2',
  },
  {
    id: '3',
    slug: 'family-cave-suite',
    name: {
      tr: 'Aile Mağara Süit',
      en: 'Family Cave Suite',
      zh: '家庭洞穴套房',
    },
    description: {
      tr: 'Aileniz için özel tasarlanmış geniş ve konforlu mağara süit. İki ayrı yatak odası ve geniş oturma alanı ile ailenizle birlikte unutulmaz anılar biriktirin.',
      en: 'Spacious and comfortable cave suite specially designed for your family. Create unforgettable memories with your family with two separate bedrooms and a large living area.',
      zh: '专为您的家庭设计的宽敞舒适洞穴套房。两间独立卧室和宽敞的起居区，与家人共创难忘回忆。',
    },
    shortDescription: {
      tr: 'Aileniz için geniş ve konforlu süit',
      en: 'Spacious and comfortable suite for your family',
      zh: '适合家庭的宽敞舒适套房',
    },
    capacity: 4,
    size: 50,
    pricePerNight: 200,
    images: [
      '/images/rooms/family-1.jpg',
      '/images/rooms/family-2.jpg',
      '/images/rooms/family-3.jpg',
      '/images/rooms/family-4.jpg',
    ],
    amenities: [
      'two-bedrooms',
      'king-bed',
      'sofa-bed',
      'wifi',
      'breakfast',
      'kitchen',
      'balcony',
      'minibar',
      'safe',
      'heating',
    ],
    featured: true,
    airbnbCalendarId: '3',
  },
];

export function getRoomBySlug(slug: string, locale: string = 'tr'): Room | undefined {
  return rooms.find((room) => room.slug === slug);
}

export function getFeaturedRooms(): Room[] {
  return rooms.filter((room) => room.featured);
}
