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
    houseAmenities: { tr: string[]; en: string[]; zh: string[] };
    kitchen: { tr: string[]; en: string[]; zh: string[] };
    guestServices: { tr: string[]; en: string[]; zh: string[] };
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
  airbnbIcalUrl?: string;
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
      tr: '90 metrekare büyüklüğünde, tam donanımlı ve manzaralı teraslı bir mağara ev, rahatlatıcı ve keyifli bir tatil için sunulmaktadır. El yapımı, antika ve geleneksel mobilyalarla döşenmiştir.',
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
      '/images/anitya-cave-suite/1337-d7c0a218-01fe-11f1-996c-36e0ed78b0a9-2.avif',
      '/images/anitya-cave-suite/cahop_3qp.avif',
      '/images/anitya-cave-suite/DSC_5602.avif',
      '/images/anitya-cave-suite/DSC_5583.avif',
      '/images/anitya-cave-suite/DSC_5603.avif',
      '/images/anitya-cave-suite/mix1fq.avif',
      '/images/anitya-cave-suite/bath01qp.avif',
      '/images/anitya-cave-suite/2039102d-9264-4db7-8cc8-a06cb5ad70b9.avif',
    ],
    amenities: {
      houseAmenities: {
        en: [
          'Non-smoking',
          'Free high-speed wireless internet access',
          'Living room',
          'Study table, chair and corner',
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
        tr: [
          'Sigara içilmez',
          'Yüksek hızlı ücretsiz kablosuz internet erişimi',
          'Oturma odası',
          'Çalışma masası, sandalyesi ve köşesi',
          'Mutfak',
          'Düz ekran 3D LED Akıllı TV',
          'Sony Blueray Ev Sinema Sistemi',
          'Merkezi ısıtma',
          'Saç kurutma makinesi',
          'Havlu ve ücretsiz terlikler',
          'Şampuan, Saç Kremi, Sabun',
          'Ücretsiz güvenlik kasası',
          'Ayarlanabilir aydınlatma',
          'Musluk suyu içilebilir',
          'Geniş teras alanı',
        ],
        zh: [
          '禁烟',
          '免费高速无线网络',
          '客厅',
          '书桌、椅子和学习角',
          '厨房',
          '平板3D LED智能电视',
          '索尼蓝光家庭影院系统',
          '中央供暖',
          '吹风机',
          '毛巾和免费拖鞋',
          '洗发水、护发素、肥皂',
          '免费保险箱',
          '可调节照明',
          '自来水可直接饮用',
          '大露台区域',
        ],
      },
      kitchen: {
        en: [
          'Oven',
          'Cooker',
          'Big fridge',
          'Kettle',
          'Coffee Machine',
          'Toaster',
          'All kitchen equipment for cooking and eating',
          'Herbal Teas, Filter Coffee, Turkish coffee, Black Tea, Oil for cooking, Dish Soap, Spices are all available for the use of our guests.',
        ],
        tr: [
          'Fırın',
          'Ocak',
          'Büyük buzdolabı',
          'Su ısıtıcısı',
          'Kahve Makinesi',
          'Ekmek Kızartma Makinesi',
          'Yemek pişirmek ve yemek için tüm mutfak ekipmanları',
          'Bitkisel Çaylar, Filtre Kahve, Türk kahvesi, Siyah Çay, Yemeklik Yağ, Bulaşık Deterjanı, Baharatlar misafirlerimizin kullanımı için mevcuttur.',
        ],
        zh: [
          '烤箱',
          '炉灶',
          '大冰箱',
          '水壶',
          '咖啡机',
          '烤面包机',
          '所有烹饪和用餐厨房设备',
          '草本茶、过滤咖啡、土耳其咖啡、红茶、食用油、洗碗液、香料均可供我们的客人使用。',
        ],
      },
      guestServices: {
        en: [
          'Traditional Turkish Breakfast service is provided',
          'Free wireless internet access in common areas; terraces',
          'Crib, feeding chair provided',
          "Main laundry room for guests' use, with iron and ironing board, laundry hanger",
          'Free sightseeing maps of Cappadocia with guidance',
          'Helping for all needs and arranging, reserving activities in the region.',
        ],
        tr: [
          'Geleneksel Türk Kahvaltısı servisi sunulmaktadır',
          'Ortak alanlarda ücretsiz kablosuz internet erişimi; teraslar',
          'Bebek karyolası, mama sandalyesi sağlanır',
          'Ütü ve ütü masası, çamaşır askısı ile misafirlerin kullanımı için ana çamaşırhane',
          'Rehberlikli ücretsiz Kapadokya gezilecek yerler haritaları',
          'Bölgedeki tüm ihtiyaçlar için yardım, aktivitelerin düzenlenmesi ve rezervasyonu.',
        ],
        zh: [
          '提供传统土耳其早餐服务',
          '公共区域提供免费无线网络；露台',
          '提供婴儿床、喂食椅',
          '供客人使用的主洗衣房，配有熨斗、熨衣板、衣架',
          '免费提供卡帕多西亚观光地图和指导',
          '协助满足所有需求，安排和预订该地区的活动。',
        ],
      },
    },
    specifications: {
      beds: {
        tr: 'Yatak odasında queen size yatak, salonda oturma/yatma için mini mağara alanında çift kişilik yatak ve salonda çift kişilik yatağa dönüştürülebilen kanepe.',
        en: 'Queen bed in the bedroom, a double bed in the mini cave area for sitting/sleeping and a sofa at the saloon convertable into a double bed.',
        zh: '卧室内有大床，迷你洞穴区内有双人床可供坐卧，客厅有可转换为双人床的沙发。',
      },
      house: {
        tr: "Ana yatak odası, TV'li geniş oturma odası, çalışma köşesi, oturma/yatma için mini mağara, yemek masalı mutfak ve bir banyo.",
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
        tr: "Erciyes Dağı'nın (açık havada) ve İshak Kalesi'nin nefes kesici manzarası, Kapadokya manzarası ve Ortahisar köy evleri ile özel oturma alanı ve yemek masası.",
        en: 'A private sitting area and dining table with the breathtaking scenery of Erciyes Mountain (in clear sky) and Ishak Castle with Cappadocia landscape and Ortahisar village houses.',
        zh: '私人休息区和餐桌，可欣赏埃尔吉耶斯山（晴朗天空下）和伊沙克城堡的壮丽景色，以及卡帕多西亚景观和奥塔希萨尔村庄房屋。',
      },
    },
    specialNote: {
      tr: "Anitya Cave House, 7/24 resepsiyon ve restoran hizmeti olmayan özel bir butik oteldir. Personel diğer tüm ihtiyaçlar için hazırdır.",
      en: "Anitya Cave House is a special private boutique hotel which doesn't have 7/24 reception and restaurant service. Staffs are ready to come in all other needs.",
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
      tr: 'Otantik Kapadokya mimarisiy le tasarlanmış, tam donanımlı ve manzaralı teraslı özel mağara süit.',
      en: 'Private cave suite designed with authentic Cappadocian architecture, fully equipped with scenic terrace.',
      zh: '采用正宗卡帕多西亚建筑设计的私人洞穴套房，设施齐全，配有风景露台。',
    },
    shortDescription: {
      tr: 'Otantik mağara süit',
      en: 'Authentic cave suite',
      zh: '正宗洞穴套房',
    },
    capacity: 4,
    size: '65 m²',
    images: [
      '/images/sirahane-cave-suit/156dcea3-c398-401e-b9b0-241a25f92ec5.jpg',
      '/images/sirahane-cave-suit/DSC_6221.avif',
      '/images/sirahane-cave-suit/DSC_6260.avif',
      '/images/sirahane-cave-suit/DSC_6262.avif',
      '/images/sirahane-cave-suit/DSC_6269.avif',
      '/images/sirahane-cave-suit/d3ab2dae-081f-42f7-a9fb-028440e992e8.jpg',
      '/images/sirahane-cave-suit/30b6c518-1b33-4c00-99d7-f24ca38e261e.jpg',
      '/images/sirahane-cave-suit/b95eb669-6e92-4706-ba02-6ca899e8a1dd.jpg',
      '/images/sirahane-cave-suit/1595bd2c-500f-4360-89a4-afd2f21c78f3.jpg',
      '/images/sirahane-cave-suit/ffe59ef3-d4d2-4b25-9165-05e3adc7d765.jpg',
      '/images/sirahane-cave-suit/3de4ed1d-d34b-4fa8-bb05-902c12780e00.jpg',
      '/images/sirahane-cave-suit/c70e13d0-772f-402b-a0e8-960cfb2049b1.jpg',
      '/images/sirahane-cave-suit/28066cac-bb16-49a3-a19d-27ae8a015157.jpg',
      '/images/sirahane-cave-suit/94103ef6-55e0-4d8f-ad83-0c6c9c5fcb29.jpg',
      '/images/sirahane-cave-suit/c23fc9e1-03d8-40a4-b17b-65357d96948d.jpg',
      '/images/sirahane-cave-suit/de6be97b-2ac0-4038-ab4f-3bb58e70c89b.jpg',
      '/images/sirahane-cave-suit/15aaadb4-ba67-4696-9c4c-ab8ce642da77.jpg',
      '/images/sirahane-cave-suit/f38030fa-fc62-401b-bd06-2a57844637a0.jpg',
      '/images/sirahane-cave-suit/b6a10667-f229-4562-aeda-8d8fdf4fe55d.jpg',
      '/images/sirahane-cave-suit/2ff9a700-f57b-4d2f-8329-89400c4393f0.jpg',
      '/images/sirahane-cave-suit/14f4c726-980f-47fa-86dd-657129ce2309.jpg',
    ],
    amenities: {
      houseAmenities: {
        en: [
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
        tr: [
          'Sigara içilmez',
          'Ücretsiz kablosuz internet erişimi',
          'Oturma odası',
          'Çalışma masası ve köşesi',
          'Mutfak',
          'Düz ekran LED TV',
          'Merkezi ısıtma',
          'Saç kurutma makinesi',
          'Havlu ve ücretsiz terlikler',
          'Şampuan, Saç Kremi, Sabun',
          'Ücretsiz güvenlik kasası',
          'Musluk suyu içilebilir',
          'Özel teras',
        ],
        zh: [
          '禁烟',
          '免费无线网络',
          '客厅',
          '书桌和学习角',
          '厨房',
          '平板LED电视',
          '中央供暖',
          '吹风机',
          '毛巾和免费拖鞋',
          '洗发水、护发素、肥皂',
          '免费保险箱',
          '自来水可直接饮用',
          '私人露台',
        ],
      },
      kitchen: {
        en: [
          'Oven',
          'Cooker',
          'Fridge',
          'Kettle',
          'Coffee Machine',
          'All kitchen equipment for cooking and eating',
          'Herbal Teas, Filter Coffee, Turkish coffee, Black Tea, Oil for cooking, Dish Soap, Spices',
        ],
        tr: [
          'Fırın',
          'Ocak',
          'Buzdolabı',
          'Su ısıtıcısı',
          'Kahve Makinesi',
          'Yemek pişirmek ve yemek için tüm mutfak ekipmanları',
          'Bitkisel Çaylar, Filtre Kahve, Türk kahvesi, Siyah Çay, Yemeklik Yağ, Bulaşık Deterjanı, Baharatlar',
        ],
        zh: [
          '烤箱',
          '炉灶',
          '冰箱',
          '水壶',
          '咖啡机',
          '所有烹饪和用餐厨房设备',
          '草本茶、过滤咖啡、土耳其咖啡、红茶、食用油、洗碗液、香料',
        ],
      },
      guestServices: {
        en: [
          'Traditional Turkish Breakfast service is provided',
          'Free wireless internet access in common areas',
          'Crib, feeding chair provided',
          "Main laundry room for guests' use",
          'Free sightseeing maps of Cappadocia with guidance',
          'Helping for all needs and arranging activities in the region',
        ],
        tr: [
          'Geleneksel Türk Kahvaltısı servisi sunulmaktadır',
          'Ortak alanlarda ücretsiz kablosuz internet erişimi',
          'Bebek karyolası, mama sandalyesi sağlanır',
          'Misafirlerin kullanımı için ana çamaşırhane',
          'Rehberlikli ücretsiz Kapadokya gezilecek yerler haritaları',
          'Bölgedeki tüm ihtiyaçlar için yardım, aktivitelerin düzenlenmesi',
        ],
        zh: [
          '提供传统土耳其早餐服务',
          '公共区域提供免费无线网络',
          '提供婴儿床、喂食椅',
          '供客人使用的主洗衣房',
          '免费提供卡帕多西亚观光地图和指导',
          '协助满足所有需求，安排该地区的活动',
        ],
      },
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
      tr: "Anitya Cave House, 7/24 resepsiyon ve restoran hizmeti olmayan özel bir butik oteldir. Personel diğer tüm ihtiyaçlar için hazırdır.",
      en: "Anitya Cave House is a special private boutique hotel which doesn't have 7/24 reception and restaurant service. Staffs are ready to come in all other needs.",
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
      tr: '50 metrekare büyüklüğünde, tam donanımlı ve manzaralı teraslı dubleks taş ev, rahatlatıcı ve keyifli bir tatil için sunulmaktadır.',
      en: 'A duplex stone house of 50 square meter, fully equipped with a scenic terrace is offered for a relaxing and enjoyable vacation.',
      zh: '35平方米的复式石屋，设施齐全，配有风景露台，为您提供轻松愉快的假期。',
    },
    shortDescription: {
      tr: 'Teraslı dubleks taş ev',
      en: 'Duplex stone house with terrace',
      zh: '带露台的复式石屋',
    },
    capacity: 4,
    size: '50 m²',
    images: [
      '/images/dublex-stone-suit/DSC_5695.avif',
      '/images/dublex-stone-suit/DSC_5696.avif',
      '/images/dublex-stone-suit/Adsız tasarım-2.jpg',
      '/images/dublex-stone-suit/Adsız tasarım-3.jpg',
      '/images/dublex-stone-suit/Adsız tasarım-4.jpg',
      '/images/dublex-stone-suit/f24e187a_original.jpg',
      '/images/dublex-stone-suit/4e959b8b-adcb-44cb-acbd-1ff5661c067a.jpeg',
      '/images/dublex-stone-suit/a42533dc-4af8-443d-8b94-e6ea095f0614.jpeg',
      '/images/dublex-stone-suit/replicate-prediction-m7e4pn2gadrne0cwd16b8jb888.avif',
    ],
    amenities: {
      houseAmenities: {
        en: [
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
        tr: [
          'Sigara içilmez',
          'Ücretsiz kablosuz internet erişimi',
          'Oturma odası',
          'Yemek masası ve çalışma masası olarak da kullanılabilir',
          'Mutfak',
          'Düz ekran LED TV',
          'Merkezi ısıtma',
          'Saç kurutma makinesi',
          'Havlu ve ücretsiz terlikler',
          'Şampuan, Saç Kremi, Sabun',
          'Ücretsiz güvenlik kasası',
          'Musluk suyu içilebilir',
          'Geniş teras alanı',
        ],
        zh: [
          '禁烟',
          '免费无线网络',
          '客厅',
          '餐桌，也可用作书桌',
          '厨房',
          '平板LED电视',
          '中央供暖',
          '吹风机',
          '毛巾和免费拖鞋',
          '洗发水、护发素、肥皂',
          '免费保险箱',
          '自来水可直接饮用',
          '大露台区域',
        ],
      },
      kitchen: {
        en: [
          'Cooker',
          'Fridge',
          'Kettle',
          'Coffee Machine',
          'All kitchen equipment for cooking and eating',
          'Herbal Teas, Filter Coffee, Turkish coffee, Black Tea, Oil for cooking, Dish Soap',
          "Spices are all ready for guests' use",
        ],
        tr: [
          'Ocak',
          'Buzdolabı',
          'Su ısıtıcısı',
          'Kahve Makinesi',
          'Yemek pişirmek ve yemek için tüm mutfak ekipmanları',
          'Bitkisel Çaylar, Filtre Kahve, Türk kahvesi, Siyah Çay, Yemeklik Yağ, Bulaşık Deterjanı',
          'Baharatlar misafirlerin kullanımı için hazırdır',
        ],
        zh: [
          '炉灶',
          '冰箱',
          '水壶',
          '咖啡机',
          '所有烹饪和用餐厨房设备',
          '草本茶、过滤咖啡、土耳其咖啡、红茶、食用油、洗碗液',
          '香料均已准备好供客人使用',
        ],
      },
      guestServices: {
        en: [
          'Traditional Turkish Breakfast service is provided',
          'Free wireless internet access in common areas; terraces',
          'Crib, feeding chair provided',
          "Main laundry room for guests' use, with iron and ironing board, laundry hanger",
          'Free sightseeing maps of Cappadocia with guidance',
          'Helping for all needs and arranging, reserving activities in the region.',
        ],
        tr: [
          'Geleneksel Türk Kahvaltısı servisi sunulmaktadır',
          'Ortak alanlarda ücretsiz kablosuz internet erişimi; teraslar',
          'Bebek karyolası, mama sandalyesi sağlanır',
          'Ütü ve ütü masası, çamaşır askısı ile misafirlerin kullanımı için ana çamaşırhane',
          'Rehberlikli ücretsiz Kapadokya gezilecek yerler haritaları',
          'Bölgedeki tüm ihtiyaçlar için yardım, aktivitelerin düzenlenmesi ve rezervasyonu.',
        ],
        zh: [
          '提供传统土耳其早餐服务',
          '公共区域提供免费无线网络；露台',
          '提供婴儿床、喂食椅',
          '供客人使用的主洗衣房，配有熨斗、熨衣板、衣架',
          '免费提供卡帕多西亚观光地图和指导',
          '协助满足所有需求，安排和预订该地区的活动。',
        ],
      },
    },
    specifications: {
      beds: {
        tr: 'Yatak odasında queen size yatak, salonda bir kanepe',
        en: 'Queen bed in the bedroom, a sofa at the saloon',
        zh: '卧室内有大床，客厅有沙发',
      },
      house: {
        tr: "Alt katta yatak odası ve banyo, ana katta TV'li oturma odası, mutfak ve teras.",
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
        tr: "Erciyes Dağı'nın (açık havada) ve İshak Kalesi'nin nefes kesici manzarası, Kapadokya manzarası ve Ortahisar köy evleri ile özel oturma alanı ve yemek masası.",
        en: 'A private sitting area and dining table with the breathtaking scenery of Erciyes Mountain (in clear sky) and Ishak Castle with Cappadocia landscape and Ortahisar village houses.',
        zh: '私人休息区和餐桌，可欣赏埃尔吉耶斯山（晴朗天空下）和伊沙克城堡的壮丽景色，以及卡帕多西亚景观和奥塔希萨尔村庄房屋。',
      },
    },
    specialNote: {
      tr: "Anitya Cave House, 7/24 resepsiyon ve restoran hizmeti olmayan özel bir butik oteldir. Personel diğer tüm ihtiyaçlar için hazırdır.",
      en: "Anitya Cave House is a special private boutique hotel which doesn't have 7/24 reception and restaurant service. Staffs are ready to come in all other needs.",
      zh: 'Anitya Cave House是一家特殊的私人精品酒店，没有7/24前台和餐厅服务。工作人员随时准备满足所有其他需求。',
    },
    featured: true,
    airbnbCalendarId: '3',
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug);
}

export function getFeaturedRooms(): Room[] {
  return rooms.filter((room) => room.featured);
}
