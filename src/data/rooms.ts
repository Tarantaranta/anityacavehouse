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
  airbnbIcalUrl?: string; // Airbnb'den takvim çekmek için iCal URL
}

export const rooms: Room[] = [
  {
    id: '1',
    slug: 'anitya-cave-house',
    name: {
      tr: 'Anıtya Cave House',
      en: 'Anıtya Cave House',
      zh: 'Anıtya洞穴屋',
    },
    description: {
      tr: 'Kapadokya\'nın eşsiz kayalara oyulmuş mimarisini modern lüks ile birleştiren Anıtya Cave House, unutulmaz bir konaklama deneyimi sunuyor. Orijinal taş duvarlar ve çağdaş tasarım unsurlarının mükemmel uyumunu yaşayın.',
      en: 'Anıtya Cave House combines Cappadocia\'s unique rock-carved architecture with modern luxury, offering an unforgettable accommodation experience. Experience the perfect harmony of original stone walls and contemporary design elements.',
      zh: 'Anıtya洞穴屋将卡帕多西亚独特的岩石雕刻建筑与现代奢华相结合，提供难忘的住宿体验。体验原始石墙与现代设计元素的完美融合。',
    },
    shortDescription: {
      tr: 'Modern konfor ile tarihi dokuyu birleştiren otantik mağara evi',
      en: 'Authentic cave house combining modern comfort with historical texture',
      zh: '结合现代舒适与历史质感的正宗洞穴屋',
    },
    capacity: 2,
    size: 35,
    pricePerNight: 150,
    images: [
      '/images/rooms/anitya-cave-house-1.jpg',
      '/images/rooms/anitya-cave-house-2.jpg',
      '/images/rooms/anitya-cave-house-3.jpg',
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
    airbnbIcalUrl: 'https://www.airbnb.com.tr/calendar/ical/2953140.ics?t=e34ecaef1bfe47aeb7795495699b29ab',
  },
  {
    id: '2',
    slug: 'anitya-cave-house-with-hammam',
    name: {
      tr: 'Anıtya Cave House with Hammam',
      en: 'Anıtya Cave House with Hammam',
      zh: 'Anıtya带土耳其浴室洞穴屋',
    },
    description: {
      tr: 'Geleneksel Türk hamamı ile donatılmış otantik mağara evimiz, Kapadokya\'da benzersiz bir deneyim sunuyor. Tarihi mimarinin atmosferinde modern konforun keyfini çıkarın.',
      en: 'Our authentic cave house equipped with a traditional Turkish hammam offers a unique experience in Cappadocia. Enjoy modern comfort in the atmosphere of historical architecture.',
      zh: '配备传统土耳其浴室的正宗洞穴屋，在卡帕多西亚提供独特体验。在历史建筑氛围中享受现代舒适。',
    },
    shortDescription: {
      tr: 'Geleneksel hamamlı otantik mağara evi',
      en: 'Authentic cave house with traditional hammam',
      zh: '带传统土耳其浴室的正宗洞穴屋',
    },
    capacity: 2,
    size: 40,
    pricePerNight: 180,
    images: [
      '/images/rooms/hammam-1.jpg',
      '/images/rooms/hammam-2.jpg',
    ],
    amenities: [
      'king-bed',
      'wifi',
      'breakfast',
      'hammam',
      'heating',
      'safe',
      'minibar',
    ],
    featured: true,
    airbnbCalendarId: '2',
  },
  {
    id: '3',
    slug: 'anitya-dublex-stone-house',
    name: {
      tr: 'Anıtya Dublex Stone House',
      en: 'Anıtya Dublex Stone House',
      zh: 'Anıtya复式石屋',
    },
    description: {
      tr: 'İki katlı taş ev tasarımıyla geniş aileler ve gruplar için ideal. Geleneksel Kapadokya mimarisi ile modern yaşam alanlarının mükemmel birleşimi. Geniş terasından muhteşem vadi manzarasının tadını çıkarın.',
      en: 'Ideal for large families and groups with its two-story stone house design. Perfect combination of traditional Cappadocia architecture and modern living spaces. Enjoy stunning valley views from the spacious terrace.',
      zh: '采用两层石屋设计，非常适合大家庭和团体。传统卡帕多西亚建筑与现代生活空间的完美结合。从宽敞的露台欣赏壮丽的山谷景色。',
    },
    shortDescription: {
      tr: 'Geniş aileler için iki katlı geleneksel taş ev',
      en: 'Two-story traditional stone house for large families',
      zh: '适合大家庭的两层传统石屋',
    },
    capacity: 6,
    size: 80,
    pricePerNight: 250,
    images: [
      '/images/rooms/dublex-1.jpg',
      '/images/rooms/dublex-2.jpg',
      '/images/rooms/dublex-3.jpg',
      '/images/rooms/dublex-4.jpg',
    ],
    amenities: [
      'two-bedrooms',
      'king-bed',
      'sofa-bed',
      'wifi',
      'breakfast',
      'kitchen',
      'terrace',
      'minibar',
      'safe',
      'heating',
      'fireplace',
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
