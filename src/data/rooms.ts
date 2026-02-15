export interface Room {
  id: string;
  slug: string;
  name: {
    tr: string;
    en: string;
    zh: string;
  };
  subtitle: {
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
  size: string; // m²
  pricePerNight?: number;
  images: string[];
  amenities: {
    houseAmenities: string[];
    kitchen: string[];
    guestServices: string[];
  };
  specifications: {
    beds: { tr: string; en: string; zh: string };
    house: { tr: string; en: string; zh: string };
    decoration: { tr: string; en: string; zh: string };
    location: { tr: string; en: string; zh: string };
    bathrooms: { tr: string; en: string; zh: string };
    extraBed: { tr: string; en: string; zh: string };
    terrace: { tr: string; en: string; zh: string };
  };
  specialNote: {
    tr: string;
    en: string;
    zh: string;
  };
  featured: boolean;
  airbnbCalendarId?: string;
  airbnbIcalUrl?: string; // Airbnb'den takvim çekmek için iCal URL
}

export const rooms: Room[] = [
  {
    id: '1',
    slug: 'anitya-cave-suite',
    name: {
      tr: 'Anitya Cave Suite',
      en: 'Anitya Cave Suite',
      zh: 'Anitya 洞穴套房',
    },
    subtitle: {
      tr: 'TERASLI MAĞARA SÜİT',
      en: 'CAVE SUITE WITH TERRACE',
      zh: '带露台的洞穴套房',
    },
    description: {
      tr: '80 metrekare büyüklüğünde, tam donanımlı ve manzaralı teraslı bir mağara ev, rahatlatıcı ve keyifli bir tatil için sunulmaktadır. El yapımı, antika ve geleneksel mobilyalarla döşenmiştir.',
      en: 'A cavehouse of 80 square meter, fully equipped with a scenic terrace is offered for a relaxing and enjoyable vacation. Fully built and decorated with handmade, antique and traditional furnitures.',
      zh: '80平方米的洞穴房，设施齐全，配有风景露台，为您提供轻松愉快的假期。全部采用手工制作的古董和传统家具装饰。',
    },
    shortDescription: {
      tr: 'Antika mobilyalı, tam donanımlı mağara süit',
      en: 'Fully equipped cave suite with antique furniture',
      zh: '配有古董家具的设施齐全的洞穴套房',
    },
    capacity: 6,
    size: '90 m²',
    images: [
      '/images/old-site/rooms/cave.jpg',
      '/images/old-site/rooms/cavesuit1.jpg',
      '/images/old-site/rooms/cavesuit2.jpg',
      '/images/old-site/rooms/cavesuitanaekran.jpg',
      '/images/old-site/rooms/DSC_0654.jpg',
      '/images/old-site/rooms/DSC_3108.jpg',
    ],
    amenities: {
      houseAmenities: [
        'Non-smoking',
        'Free wireless internet access',
        'Living room',
        'Study table and corner',
        'Kitchen',
        'Flat screen 3D LED Smart TV',
        'Sony Blueray Home Theater System',
        'Central heating',
        'Hair dryer',
        'Towels and complimentary slippers',
        'Shampoo, Hair Conditioner, Soap',
        'Free safe deposit box',
        'Controllable lightning',
        'Tap water drinkable',
        'A big terrace area',
      ],
      kitchen: [
        'Oven',
        'Cooker',
        'Big fridge',
        'Kettle',
        'Coffee Machine',
        'Toaster',
        'All kitchen equipment for cooking and eating',
        'Herbal Teas, Filter Coffee, Turkish coffee, Black Tea, Oil for cooking, Dish Soap, Spices are all available for the use of our guests.',
      ],
      guestServices: [
        'Traditional Turkish Breakfast service is provided',
        'Free wireless internet access in common areas; terraces',
        'Crib, feeding chair provided',
        'Main laundry room for guests\' use, with iron and ironing board, laundry hanger',
        'Free sightseeing maps of Cappadocia with guidance',
        'Helping for all needs and arranging, reserving activities in the region.',
      ],
    },
    specifications: {
      beds: {
        tr: 'Yatak odasında queen size yatak, salonda oturma/yatma için mini mağara alanında çift kişilik yatak ve salonda çift kişilik yatağa dönüştürülebilen kanepe.',
        en: 'Queen bed in the bedroom, a double bed in the mini cave area for sitting/sleeping and a sofa at the saloon convertable into a double bed.',
        zh: '卧室内有大床，迷你洞穴区内有双人床可供坐卧，客厅有可转换为双人床的沙发。',
      },
      house: {
        tr: 'Ana yatak odası, TV\'li geniş oturma odası, çalışma köşesi, oturma/yatma için mini mağara, yemek masalı mutfak ve bir banyo.',
        en: 'Master bedroom, large living room with TV, study corner, a minicave for sitting/sleeping, kitchen with dining table and one bathroom.',
        zh: '主卧室、带电视的大客厅、学习角、可供坐卧的迷你洞穴、带餐桌的厨房和一间浴室。',
      },
      decoration: {
        tr: 'El yapımı, antika ve geleneksel mobilyalarla döşenmiştir. Geleneksel Türk halıları rahatlığınız için yerde serilmiştir.',
        en: 'Fully built and decorated with handmade, antique and traditional furniture. The traditional Turkish carpets lay on the ground for your comfort.',
        zh: '全部采用手工制作的古董和传统家具装饰。传统的土耳其地毯铺在地上，为您提供舒适感。',
      },
      location: {
        tr: 'Büyük pencereli ve manzaralı teraslı özel orijinal mağara süit',
        en: 'Private original cave suite with huge windows and scenic terrace',
        zh: '私人原始洞穴套房，配有大窗户和风景露台',
      },
      bathrooms: {
        tr: '24 saat sıcak su ve küvet',
        en: '24 hour hot water with a bathtub',
        zh: '24小时热水和浴缸',
      },
      extraBed: {
        tr: 'Salonda çift kişilik yatağa dönüştürülebilen bir kanepe. Oturma/yatma için mini mağara alanında çift kişilik yatak. Bebek karyolası sağlanır. Salona bir ekstra yatak daha konulabilir.',
        en: 'One sofa, convertible into a double bed in the saloon. A double bed in the mini cave area for sitting/sleeping. Crib provided. One more extra bed can be provided to the saloon.',
        zh: '客厅有可转换为双人床的沙发。迷你洞穴区有双人床可供坐卧。提供婴儿床。客厅可再加一张床。',
      },
      terrace: {
        tr: 'Erciyes Dağı\'nın (açık havada) ve İshak Kalesi\'nin nefes kesici manzarası, Kapadokya manzarası ve Ortahisar köy evleri ile özel oturma alanı ve yemek masası.',
        en: 'A private sitting area and dining table with the breathtaking scenery of Erciyes Mountain (in clear sky) and Ishak Castle with Cappadocia landscape and Ortahisar village houses.',
        zh: '私人休息区和餐桌，可欣赏埃尔吉耶斯山（晴朗天空下）和伊沙克城堡的壮丽景色，以及卡帕多西亚景观和奥塔希萨尔村庄房屋。',
      },
    },
    specialNote: {
      tr: 'Anıtya Cave House, 7/24 resepsiyon ve restoran hizmeti olmayan özel bir butik oteldir. Personel diğer tüm ihtiyaçlar için hazırdır.',
      en: 'Anitya Cave House is a special private boutique hotel which doesn\'t have 7/24 reception and restaurant service. Staffs are ready to come in all other needs.',
      zh: 'Anitya Cave House是一家特殊的私人精品酒店，没有7/24前台和餐厅服务。工作人员随时准备满足所有其他需求。',
    },
    featured: true,
    airbnbCalendarId: '1',
    airbnbIcalUrl: 'https://www.airbnb.com.tr/calendar/ical/2953140.ics?t=e34ecaef1bfe47aeb7795495699b29ab',
  },
  {
    id: '2',
    slug: 'sirahane-cave-suite',
    name: {
      tr: 'Şırahane Cave Suite',
      en: 'Şırahane Cave Suite',
      zh: 'Şırahane 洞穴套房',
    },
    subtitle: {
      tr: 'ŞIRAHANE MAĞARA SÜİT',
      en: 'ŞIRAHANE CAVE SUITE',
      zh: 'ŞIRAHANE 洞穴套房',
    },
    description: {
      tr: 'Otantik Kapadokya mimarisiyle tasarlanmış, tam donanımlı ve manzaralı teraslı özel mağara süit.',
      en: 'Private cave suite designed with authentic Cappadocian architecture, fully equipped with scenic terrace.',
      zh: '采用正宗卡帕多西亚建筑设计的私人洞穴套房，设施齐全，配有风景露台。',
    },
    shortDescription: {
      tr: 'Otantik mağara süit',
      en: 'Authentic cave suite',
      zh: '正宗洞穴套房',
    },
    capacity: 4,
    size: '70 m²',
    images: [],
    amenities: {
      houseAmenities: [
        'Non-smoking',
        'Free wireless internet access',
        'Living room',
        'Study table and corner',
        'Kitchen',
        'Flat screen LED TV',
        'Central heating',
        'Hair dryer',
        'Towels and complimentary slippers',
        'Shampoo, Hair Conditioner, Soap',
        'Free safe deposit box',
        'Tap water drinkable',
        'Private terrace',
      ],
      kitchen: [
        'Oven',
        'Cooker',
        'Fridge',
        'Kettle',
        'Coffee Machine',
        'All kitchen equipment for cooking and eating',
        'Herbal Teas, Filter Coffee, Turkish coffee, Black Tea, Oil for cooking, Dish Soap, Spices',
      ],
      guestServices: [
        'Traditional Turkish Breakfast service is provided',
        'Free wireless internet access in common areas',
        'Crib, feeding chair provided',
        'Main laundry room for guests\' use',
        'Free sightseeing maps of Cappadocia with guidance',
        'Helping for all needs and arranging activities in the region',
      ],
    },
    specifications: {
      beds: {
        tr: 'Yatak odasında queen size yatak, salonda çift kişilik yatağa dönüştürülebilen kanepe',
        en: 'Queen bed in the bedroom, sofa convertible to double bed in living room',
        zh: '卧室内有大床，客厅有可转换为双人床的沙发',
      },
      house: {
        tr: 'Ana yatak odası, oturma odası, mutfak ve banyo',
        en: 'Master bedroom, living room, kitchen and bathroom',
        zh: '主卧室、客厅、厨房和浴室',
      },
      decoration: {
        tr: 'El yapımı, antika ve geleneksel mobilyalarla döşenmiştir',
        en: 'Fully decorated with handmade, antique and traditional furniture',
        zh: '采用手工制作的古董和传统家具装饰',
      },
      location: {
        tr: 'Manzaralı teraslı özel mağara süit',
        en: 'Private cave suite with scenic terrace',
        zh: '配有风景露台的私人洞穴套房',
      },
      bathrooms: {
        tr: '24 saat sıcak su',
        en: '24 hour hot water',
        zh: '24小时热水',
      },
      extraBed: {
        tr: 'Salonda çift kişilik yatağa dönüştürülebilen kanepe. Bebek karyolası sağlanır',
        en: 'Sofa convertible to double bed in living room. Crib provided',
        zh: '客厅有可转换为双人床的沙发。提供婴儿床',
      },
      terrace: {
        tr: 'Kapadokya manzarası ve Ortahisar köy evleri ile özel oturma alanı',
        en: 'Private sitting area with Cappadocia landscape and Ortahisar village houses view',
        zh: '私人休息区，可欣赏卡帕多西亚景观和奥塔希萨尔村庄房屋',
      },
    },
    specialNote: {
      tr: 'Anıtya Cave House, 7/24 resepsiyon ve restoran hizmeti olmayan özel bir butik oteldir. Personel diğer tüm ihtiyaçlar için hazırdır.',
      en: 'Anitya Cave House is a special private boutique hotel which doesn\'t have 7/24 reception and restaurant service. Staffs are ready to come in all other needs.',
      zh: 'Anitya Cave House是一家特殊的私人精品酒店，没有7/24前台和餐厅服务。工作人员随时准备满足所有其他需求。',
    },
    featured: true,
    airbnbCalendarId: '2',
  },
  {
    id: '3',
    slug: 'dublex-stone-suite',
    name: {
      tr: 'Dubleks Taş Süit',
      en: 'Dublex Stone Suite',
      zh: '复式石屋套房',
    },
    subtitle: {
      tr: 'DUBLEKS TAŞ SÜİT',
      en: 'DUPLEX STONE SUITE',
      zh: '复式石屋套房',
    },
    description: {
      tr: '35 metrekare büyüklüğünde, tam donanımlı ve manzaralı teraslı dubleks taş ev, rahatlatıcı ve keyifli bir tatil için sunulmaktadır.',
      en: 'A duplex stone house of 35 square meter, fully equipped with a scenic terrace is offered for a relaxing and enjoyable vacation.',
      zh: '35平方米的复式石屋，设施齐全，配有风景露台，为您提供轻松愉快的假期。',
    },
    shortDescription: {
      tr: 'Teraslı dubleks taş ev',
      en: 'Duplex stone house with terrace',
      zh: '带露台的复式石屋',
    },
    capacity: 4,
    size: '40 m²',
    images: [
      '/images/old-site/rooms/DSC_5601.jpg',
      '/images/old-site/rooms/DSC_5603.jpg',
      '/images/old-site/rooms/DSC_5693.jpg',
      '/images/old-site/rooms/DSC_5695.jpg',
      '/images/old-site/rooms/DSC_5696.jpg',
      '/images/old-site/rooms/DSC_5713.jpg',
    ],
    amenities: {
      houseAmenities: [
        'Non-smoking',
        'Free wireless internet access',
        'Living room',
        'Dining table and can be used as study table as well',
        'Kitchen',
        'Flat screen LED TV',
        'Central heating',
        'Hair dryer',
        'Towels and complimentary slippers',
        'Shampoo, Hair Conditioner, Soap',
        'Free safe deposit box',
        'Tap water drinkable',
        'A big terrace area',
      ],
      kitchen: [
        'Cooker',
        'Fridge',
        'Kettle',
        'Coffee Machine',
        'All kitchen equipment for cooking and eating',
        'Herbal Teas, Filter Coffee, Turkish coffee, Black Tea, Oil for cooking, Dish Soap',
        'Spices are all ready for guests\' use',
      ],
      guestServices: [
        'Traditional Turkish Breakfast service is provided',
        'Free wireless internet access in common areas; terraces',
        'Crib, feeding chair provided',
        'Main laundry room for guests\' use, with iron and ironing board, laundry hanger',
        'Free sightseeing maps of Cappadocia with guidance',
        'Helping for all needs and arranging, reserving activities in the region.',
      ],
    },
    specifications: {
      beds: {
        tr: 'Yatak odasında queen size yatak, salonda bir kanepe',
        en: 'Queen bed in the bedroom, a sofa at the saloon',
        zh: '卧室内有大床，客厅有沙发',
      },
      house: {
        tr: 'Alt katta yatak odası ve banyo, ana katta TV\'li oturma odası, mutfak ve teras.',
        en: 'Bedroom and bathroom at downstairs, Living room with TV, Kitchen and Terrace at main floor.',
        zh: '楼下有卧室和浴室，主楼层有带电视的客厅、厨房和露台。',
      },
      decoration: {
        tr: 'El yapımı, antika ve geleneksel mobilyalarla döşenmiştir. Geleneksel Türk halıları rahatlığınız için yerde serilmiştir.',
        en: 'Fully built and decorated with handmade, antique and traditional furniture. The traditional Turkish carpets lay on the ground for your comfort.',
        zh: '全部采用手工制作的古董和传统家具装饰。传统的土耳其地毯铺在地上，为您提供舒适感。',
      },
      location: {
        tr: 'Çok pencereli ve manzaralı teraslı özel taş dubleks süit.',
        en: 'Private stone duplex suite with many windows and scenic terrace.',
        zh: '私人石质复式套房，配有多个窗户和风景露台。',
      },
      bathrooms: {
        tr: '24 saat sıcak su ve duş.',
        en: '24 hour hot water with shower.',
        zh: '24小时热水和淋浴。',
      },
      extraBed: {
        tr: 'Salonda çift kişilik yatağa dönüştürülebilen bir kanepe. Bebek karyolası sağlanır. Salona bir ekstra yatak daha konulabilir.',
        en: 'One sofa, convertible into a double bed in the saloon. Crib provided. One more extra bed can be provided to the saloon.',
        zh: '客厅有可转换为双人床的沙发。提供婴儿床。客厅可再加一张床。',
      },
      terrace: {
        tr: 'Erciyes Dağı\'nın (açık havada) ve İshak Kalesi\'nin nefes kesici manzarası, Kapadokya manzarası ve Ortahisar köy evleri ile özel oturma alanı ve yemek masası.',
        en: 'A private sitting area and dining table with the breathtaking scenery of Erciyes Mountain (in clear sky) and Ishak Castle with Cappadocia landscape and Ortahisar village houses.',
        zh: '私人休息区和餐桌，可欣赏埃尔吉耶斯山（晴朗天空下）和伊沙克城堡的壮丽景色，以及卡帕多西亚景观和奥塔希萨尔村庄房屋。',
      },
    },
    specialNote: {
      tr: 'Anıtya Cave House, 7/24 resepsiyon ve restoran hizmeti olmayan özel bir butik oteldir. Personel diğer tüm ihtiyaçlar için hazırdır.',
      en: 'Anitya Cave House is a special private boutique hotel which doesn\'t have 7/24 reception and restaurant service. Staffs are ready to come in all other needs.',
      zh: 'Anitya Cave House是一家特殊的私人精品酒店，没有7/24前台和餐厅服务。工作人员随时准备满足所有其他需求。',
    },
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
