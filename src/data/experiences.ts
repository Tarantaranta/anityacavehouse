// ════════════════════════════════════════════════════════════════════════════
// UNIFIED EXPERIENCES & ACTIVITIES DATA
// Single source of truth for all Cappadocia experiences
// Used by both Experiences page (showcase) and Activities page (booking)
// ════════════════════════════════════════════════════════════════════════════

export type ExperienceCategory =
  | "adventure"
  | "culture"
  | "photo"
  | "nature"
  | "tour"
  | "gastronomy"
  | "history"
  | "art"
  | "wellness"
  | "special"

export interface LocalizedContent {
  title: string
  tagline: string
  description: string
  longDescription?: string
  highlights?: string[]
  idealFor?: string
}

export interface Experience {
  id: string
  category: ExperienceCategory
  duration: string
  image: string

  // Localized content (en required, tr/zh optional)
  content: {
    en: LocalizedContent
    tr?: LocalizedContent
    zh?: LocalizedContent
  }

  // Booking-specific (only for bookable activities)
  bookable?: boolean
  pricing?: {
    price: number | null
    priceNote?: string
    included?: string[]
  }
}

// ════════════════════════════════════════════════════════════════════════════
// ALL EXPERIENCES (Unified Source)
// ════════════════════════════════════════════════════════════════════════════

export const experiences: Experience[] = [
  // BOOKABLE ACTIVITIES (Activities page + Experiences page)
  {
    id: "balloon",
    category: "adventure",
    duration: "3-4 hours",
    image: "/images/activities/balloon.avif",
    bookable: true,
    content: {
      en: {
        title: "Hot Air Balloon",
        tagline: "Sunrise over fairy chimneys",
        description: "Experience Cappadocia's most iconic activity. Float above the valleys as the sun rises, revealing the region's otherworldly landscape from a perspective few will ever forget.",
        longDescription: "Drift above Cappadocia's extraordinary fairy chimneys at sunrise. As the first light touches the valleys, you'll float silently over this ancient landscape, watching the rock formations emerge from shadow. The stillness, the height, and the surreal beauty create a moment that stays with you long after you land.",
        idealFor: "Early risers seeking the quintessential Cappadocia moment",
        highlights: ["Sunrise flight over fairy chimneys", "UNESCO landscape from above", "Flight certificate included"],
      },
      tr: {
        title: "Sıcak Hava Balonu",
        tagline: "Peribacalarının üzerinde gün doğumu",
        description: "Kapadokya'nın en ikonik deneyimi. Güneş doğarken vadilerin üzerinde süzülün ve bu eşsiz coğrafyayı unutulmaz bir perspektiften görün.",
        longDescription: "Gün doğumuyla birlikte Kapadokya'nın olağanüstü peribacalarının üzerinde süzülün. İlk ışık vadilere değerken, bu kadim manzaranın üzerinde sessizce yükselin. Kaya oluşumlarının gölgeden çıkışını izleyin. Durgunluk, yükseklik ve gerçeküstü güzellik, iniş yaptıktan çok sonra bile sizinle kalacak bir an yaratır.",
        idealFor: "Erken kalkan ve Kapadokya'nın özünü arayan gezginler",
        highlights: ["Peribacaları üzerinde gün doğumu uçuşu", "UNESCO manzarasını havadan izleme", "Uçuş sertifikası dahil"],
      },
    },
    pricing: {
      price: 250,
      priceNote: "Premium operators · Fixed price",
      included: ["Hotel pickup & drop-off", "Light breakfast", "Flight certificate", "Insurance"],
    },
  },

  {
    id: "red-tour",
    category: "tour",
    duration: "Full day (9am-5pm)",
    image: "/images/activities/red-tour.avif",
    bookable: true,
    content: {
      en: {
        title: "Red Tour",
        tagline: "Essential Cappadocia highlights",
        description: "Visit the region's most celebrated sites: Göreme Open-Air Museum, Devrent Valley, Paşabağ, and Avanos pottery workshops. Perfect for first-time visitors wanting comprehensive coverage.",
        longDescription: "The Red Tour covers Cappadocia's northern highlights: the UNESCO-listed Göreme Open-Air Museum with its Byzantine frescoes, the otherworldly Devrent Valley, the iconic fairy chimneys of Paşabağ, and the traditional pottery workshops of Avanos. A thorough introduction to the region's history, geology, and craftsmanship.",
        idealFor: "First-time visitors wanting comprehensive valley coverage",
        highlights: ["Göreme Open-Air Museum", "Paşabağ fairy chimneys", "Avanos pottery workshop"],
      },
      tr: {
        title: "Kızıl Tur",
        tagline: "Kapadokya'nın temel noktaları",
        description: "Bölgenin en bilinen yerlerini keşfedin: Göreme Açık Hava Müzesi, Devrent Vadisi, Paşabağ ve Avanos çömlek atölyeleri. İlk ziyaretinizde kapsamlı bir gezi için ideal.",
        longDescription: "Kızıl Tur, Kapadokya'nın kuzey rotasını kapsar: UNESCO listesindeki Göreme Açık Hava Müzesi'nin Bizans freskleri, dünya dışı Devrent Vadisi, Paşabağ'ın ikonik peribacaları ve Avanos'un geleneksel çömlek atölyeleri. Bölgenin tarihine, jeolojisine ve el sanatlarına kapsamlı bir giriş.",
        idealFor: "İlk kez gelen ve vadileri eksiksiz görmek isteyen gezginler",
        highlights: ["Göreme Açık Hava Müzesi", "Paşabağ peribacaları", "Avanos çömlek atölyesi"],
      },
    },
    pricing: {
      price: null,
      priceNote: "Group €40 · Private €180",
      included: ["Licensed guide", "Lunch", "Museum entries", "Transportation"],
    },
  },

  {
    id: "green-tour",
    category: "tour",
    duration: "Full day (9am-5pm)",
    image: "/images/activities/green-tour.avif",
    bookable: true,
    content: {
      en: {
        title: "Green Tour",
        tagline: "Hidden valleys and underground cities",
        description: "Journey beyond the central valleys to Derinkuyu Underground City, Ihlara Valley hiking, and Selime Monastery. A more adventurous, less-crowded alternative to the Red Tour.",
        longDescription: "The Green Tour ventures south into Cappadocia's quieter corners: descend into the depths of Derinkuyu Underground City, hike through the lush Ihlara Valley alongside a river, and explore the rock-carved Selime Monastery. This route offers a more contemplative pace and fewer crowds.",
        idealFor: "Travelers seeking quieter trails and underground exploration",
        highlights: ["Derinkuyu Underground City", "Ihlara Valley hiking", "Selime Monastery"],
      },
      tr: {
        title: "Yeşil Tur",
        tagline: "Gizli vadiler ve yeraltı şehirleri",
        description: "Merkezi vadilerin ötesine gidin: Derinkuyu Yeraltı Şehri, Ihlara Vadisi yürüyüşü ve Selime Manastırı. Kızıl Tur'a göre daha macera dolu ve sakin bir alternatif.",
        longDescription: "Yeşil Tur, Kapadokya'nın güney rotasında daha sessiz köşelere uzanır: Derinkuyu Yeraltı Şehri'nin derinliklerine inin, nehir kenarında Ihlara Vadisi'nde yürüyün ve kayalara oyulmuş Selime Manastırı'nı keşfedin. Bu rota, daha sakin bir tempo ve daha az kalabalık sunar.",
        idealFor: "Sakin patikalar ve yeraltı keşfi arayanlar",
        highlights: ["Derinkuyu Yeraltı Şehri", "Ihlara Vadisi yürüyüşü", "Selime Manastırı"],
      },
    },
    pricing: {
      price: null,
      priceNote: "Group €40 · Private €195",
      included: ["Licensed guide", "Lunch", "All entries", "Transportation"],
    },
  },

  {
    id: "blue-tour",
    category: "tour",
    duration: "Full day (9am-5pm)",
    image: "/images/activities/blue-tour.avif",
    bookable: true,
    content: {
      en: {
        title: "Blue Tour",
        tagline: "Peaceful valleys and village life",
        description: "Explore the lesser-known corners: Mustafapaşa village, Soğanlı Valley, and traditional carpet workshops. A slower-paced journey through authentic Cappadocian village culture.",
        longDescription: "The Route of Silence. The Blue Tour takes you to Cappadocia's hidden valleys and authentic village life: the Greek-heritage village of Mustafapaşa, the untouched Soğanlı Valley with its rock churches, and traditional carpet weaving workshops. A peaceful, off-the-beaten-path experience.",
        idealFor: "Culture seekers wanting off-the-beaten-path authenticity",
        highlights: ["Mustafapaşa village", "Soğanlı Valley", "Carpet workshops"],
      },
      tr: {
        title: "Mavi Tur",
        tagline: "Sakin vadiler ve köy yaşamı",
        description: "Az bilinen köşeleri keşfedin: Mustafapaşa köyü, Soğanlı Vadisi ve geleneksel halı atölyeleri. Otantik Kapadokya köy kültürüne yavaş tempolu bir yolculuk.",
        longDescription: "Sessizliğin Rotası. Mavi Tur sizi Kapadokya'nın gizli vadilerine ve otantik köy yaşamına götürür: Rum mirasını taşıyan Mustafapaşa köyü, kaya kiliseleriyle el değmemiş Soğanlı Vadisi ve geleneksel halı dokuma atölyeleri. Turistik rotalardan uzak, huzurlu bir deneyim.",
        idealFor: "Sıradan güzergahlardan uzak, özgün kültür arayanlar",
        highlights: ["Mustafapaşa köyü", "Soğanlı Vadisi", "Halı atölyeleri"],
      },
    },
    pricing: {
      price: 180,
      priceNote: "Private tour only",
      included: ["Private guide", "Lunch", "Village visits", "Transportation"],
    },
  },

  {
    id: "atv-sunset",
    category: "adventure",
    duration: "2 hours",
    image: "/images/activities/atv-turu.avif",
    bookable: true,
    content: {
      en: {
        title: "ATV Sunset Ride",
        tagline: "Golden hour through the valleys",
        description: "Navigate the valleys on an ATV quad bike as the sun sets, painting the rock formations in warm hues. An exhilarating way to explore independently while catching the day's most beautiful light.",
        longDescription: "Follow the trails between fairy chimneys toward sunset. Not about speed — it's the feeling of freedom as you navigate the valleys on your own quad bike, watching the rock formations glow golden in the fading light. An active, independent way to experience the landscape.",
        idealFor: "Adventure seekers wanting freedom and movement at golden hour",
        highlights: ["Sunset timing through valleys", "Independent exploration", "Panoramic viewpoints"],
      },
      tr: {
        title: "ATV Gün Batımı Turu",
        tagline: "Vadilerde altın saat",
        description: "Güneş batarken ATV ile vadilerde gezinin, kaya oluşumları sıcak tonlara bürünsün. Günün en güzel ışığında bağımsız keşif yapmanın heyecan verici yolu.",
        longDescription: "Peribacaları arasındaki patikalardan gün batımına doğru ilerleyin. Hız değil, özgürlük hissi — kendi ATV'nizle vadilerde dolaşırken, kaya oluşumlarının solan ışıkta altın renge bürünmesini izleyin. Manzarayı aktif ve bağımsız bir şekilde deneyimleme fırsatı.",
        idealFor: "Altın saatte özgürlük ve hareket arayan maceracılar",
        highlights: ["Vadilerde gün batımı zamanlaması", "Bağımsız keşif", "Panoramik bakış noktaları"],
      },
    },
    pricing: {
      price: 35,
      priceNote: "Per person · 2 hours",
      included: ["ATV quad bike", "Safety equipment", "Guide leader", "Sunset viewpoint stop"],
    },
  },

  {
    id: "dervishes",
    category: "culture",
    duration: "1 hour",
    image: "/images/activities/whirling-dervishes.avif",
    bookable: true,
    content: {
      en: {
        title: "Whirling Dervishes",
        tagline: "Sacred Sufi meditation ceremony",
        description: "Witness the mesmerizing sema ceremony, a 700-year-old spiritual practice of the Mevlevi Order. The whirling dance represents a mystical journey toward spiritual perfection.",
        longDescription: "Sema is a living prayer of the Mevlevi tradition. Between spinning white robes and the breath of the ney, you witness a moment where time stands still. This is not performance — it is a meditative practice refined over seven centuries, expressing the soul's journey toward the divine.",
        idealFor: "Those drawn to spiritual traditions and meditative experiences",
        highlights: ["700-year-old Mevlevi ceremony", "Traditional venue", "Cultural context"],
      },
      tr: {
        title: "Semazen Gösterisi",
        tagline: "Kutsal tasavvuf meditasyon töreni",
        description: "700 yıllık Mevlevi geleneğinin büyüleyici sema törenine tanık olun. Dönen dans, manevi mükemmelliğe doğru mistik bir yolculuğu temsil eder.",
        longDescription: "Sema, Mevlevi geleneğinin yaşayan duasıdır. Dönen beyaz elbiseler ve ney'in nefesi arasında, zamanın durduğu bir ana tanık olursunuz. Bu bir gösteri değil — yedi yüzyıldır arınan, ruhun ilahiye yolculuğunu ifade eden bir meditasyon pratiğidir.",
        idealFor: "Manevi geleneklere ve meditatif deneyimlere ilgi duyanlar",
        highlights: ["700 yıllık Mevlevi töreni", "Geleneksel mekan", "Kültürel bağlam"],
      },
    },
    pricing: {
      price: 20,
      priceNote: "Evening performance",
      included: ["Reserved seating", "Traditional venue", "Cultural context explanation"],
    },
  },

  {
    id: "turkish-night",
    category: "culture",
    duration: "3 hours",
    image: "/images/activities/turkish-night.avif",
    bookable: true,
    content: {
      en: {
        title: "Turkish Night Dinner Show",
        tagline: "Folklore, feast, and celebration",
        description: "An evening of traditional Turkish cuisine paired with live folk dances from across Anatolia. Belly dancing, whirling, and regional performances in a festive, celebratory atmosphere.",
        longDescription: "An Anatolian Night. Step into an evening accompanied by local musicians and colorful folk dances. Table, music, and dance — all three together. A celebratory gathering featuring traditional Turkish cuisine, unlimited drinks, and performances from different regions of Turkey.",
        idealFor: "Groups and social travelers wanting festive cultural immersion",
        highlights: ["Multi-course Turkish dinner", "Folk dances from Anatolia", "Unlimited local drinks"],
      },
      tr: {
        title: "Türk Gecesi Yemek ve Gösteri",
        tagline: "Folklor, şölen ve kutlama",
        description: "Anadolu'nun farklı bölgelerinden canlı halk danslarıyla eşleştirilmiş geleneksel Türk mutfağının tadını çıkarın. Şenlikli, kutlama havasında göbek dansı, semazen ve bölgesel gösteriler.",
        longDescription: "Bir Anadolu Gecesi. Yerel müzisyenler ve renkli halk danslarının eşlik ettiği bir akşama adım atın. Sofra, müzik ve dans — üçü bir arada. Geleneksel Türk mutfağı, sınırsız içecekler ve Türkiye'nin farklı bölgelerinden gösteriler içeren şenlikli bir buluşma.",
        idealFor: "Şenlikli kültür deneyimi isteyen gruplar ve sosyal gezginler",
        highlights: ["Çok çeşitli Türk yemekleri", "Anadolu halk dansları", "Sınırsız yerel içecekler"],
      },
    },
    pricing: {
      price: 50,
      priceNote: "Includes dinner & unlimited drinks",
      included: ["Multi-course dinner", "Unlimited local wine & beer", "Live folk performances", "Hotel pickup & drop-off"],
    },
  },

  {
    id: "classic-car",
    category: "photo",
    duration: "2 hours",
    image: "/images/activities/Vintage Classic Car & Balloon Photoshoot.avif",
    bookable: true,
    content: {
      en: {
        title: "Classic Car Photo Ride",
        tagline: "Vintage charm meets iconic landscapes",
        description: "Tour the valleys in a beautifully restored classic car, stopping at photogenic viewpoints. Your guide doubles as photographer, capturing professional-quality images against Cappadocia's dreamlike backdrop.",
        longDescription: "Beneath a balloon drifting over Cappadocia's ancient sky, a restored vintage car waits. You'll tour scenic viewpoints in this classic automobile while your guide captures professional photos. The combination of vintage aesthetics and Cappadocia's timeless landscape creates magazine-worthy images.",
        idealFor: "Couples and photographers seeking magazine-worthy memories",
        highlights: ["Restored classic car", "Professional photography", "60+ edited photos"],
      },
      tr: {
        title: "Klasik Araba Fotoğraf Turu",
        tagline: "Vintage zarafet ikonik manzarayla buluşuyor",
        description: "Restore edilmiş klasik bir arabayla vadileri gezin, fotoğrafik bakış noktalarında durun. Rehberiniz aynı zamanda fotoğrafçınız, Kapadokya'nın rüya gibi dekorunda profesyonel kalitede görüntüler yakalar.",
        longDescription: "Kapadokya'nın kadim göğünde süzülen bir balonun altında, restore edilmiş vintage bir araba sizi bekliyor. Bu klasik otomobille manzaralı noktaları gezerken, rehberiniz profesyonel fotoğraflar çeker. Vintage estetik ve Kapadokya'nın zamansız manzarası birleşince dergi kalitesinde görüntüler ortaya çıkar.",
        idealFor: "Dergi kalitesinde anılar arayan çiftler ve fotoğrafçılar",
        highlights: ["Restore klasik araba", "Profesyonel fotoğrafçılık", "60+ düzenlenmiş fotoğraf"],
      },
    },
    pricing: {
      price: 100,
      priceNote: "Private 2-hour session",
      included: ["Classic car rental", "Driver/photographer", "Multiple scenic stops", "60+ edited digital photos"],
    },
  },

  {
    id: "jeep-safari",
    category: "adventure",
    duration: "2.5 hours",
    image: "/images/activities/jeep-safari.avif",
    bookable: true,
    content: {
      en: {
        title: "Jeep Safari Adventure",
        tagline: "Off-road exploration of hidden trails",
        description: "Venture off paved roads in a rugged 4x4 jeep, accessing remote valleys and panoramic viewpoints unreachable by tour buses. Sunrise or sunset departures available for optimal light.",
        longDescription: "Explore Cappadocia's rugged terrain and hidden spots in 4×4 vehicles. The hard-to-reach valleys become accessible this way. An active, adventurous route through remote areas where most tours never venture, with sunrise or sunset timing for dramatic lighting.",
        idealFor: "Active travelers wanting adrenaline and unexplored perspectives",
        highlights: ["4x4 off-road access", "Remote valley viewpoints", "Sunrise/sunset options"],
      },
      tr: {
        title: "Jeep Safari Macerası",
        tagline: "Gizli patikalarda arazi keşfi",
        description: "Sağlam 4x4 jeep ile asfalt yolların dışına çıkın, tur otobüslerinin ulaşamadığı uzak vadilere ve panoramik bakış noktalarına erişin. Optimal ışık için gün doğumu veya batımı kalkışları mevcut.",
        longDescription: "Kapadokya'nın engebeli arazisini ve gizli noktalarını 4×4 araçlarla keşfedin. Ulaşılması zor vadiler bu şekilde erişilebilir hale gelir. Çoğu turun asla gitmediği uzak bölgelerde aktif, maceralı bir rota, dramatik ışık için gün doğumu veya batımı zamanlamasıyla.",
        idealFor: "Adrenalin ve keşfedilmemiş perspektifler isteyen aktif gezginler",
        highlights: ["4x4 arazi erişimi", "Uzak vadi bakış noktaları", "Gün doğumu/batımı seçenekleri"],
      },
    },
    pricing: {
      price: 100,
      priceNote: "Per person · 4-6 guests per jeep",
      included: ["Open-top jeep", "Expert driver/guide", "Remote valley access", "Panoramic viewpoint stops"],
    },
  },

  {
    id: "horseback",
    category: "nature",
    duration: "2 hours",
    image: "/images/activities/horseback-riding.avif",
    bookable: true,
    content: {
      en: {
        title: "Horseback Valley Ride",
        tagline: "Ancient travel, modern serenity",
        description: "Explore the valleys the way locals did centuries ago — on horseback. A gentle, peaceful ride through quiet trails, connecting with Cappadocia's landscape at a contemplative pace.",
        longDescription: "Feel these ancient lands the same way as those who first crossed them. On horseback, you move through the valleys at a contemplative pace, connecting with the landscape in the most timeless way possible. A gentle, grounding experience far from the roads.",
        idealFor: "Nature lovers seeking quiet, grounded exploration",
        highlights: ["Well-trained horses", "Valley trails", "Peaceful pace"],
      },
      tr: {
        title: "Ata Binerek Vadi Gezisi",
        tagline: "Kadim seyahat, modern huzur",
        description: "Vadileri yüzyıllar önce yerlilerin yaptığı gibi keşfedin — at sırtında. Sessiz patikalarda nazik, huzurlu bir yolculuk, Kapadokya manzarasıyla tefekkür dolu bir tempoda buluşma.",
        longDescription: "Bu kadim toprakları, ilk geçenlerin hissettiği gibi hissedin. At sırtında vadilerde tefekkür dolu bir tempoda ilerlersiniz, manzarayla en zamansız şekilde bağlantı kurarsınız. Yollardan uzak, nazik ve topraklayıcı bir deneyim.",
        idealFor: "Sakin, topraklayıcı keşif arayan doğa severler",
        highlights: ["Eğitimli atlar", "Vadi patikalari", "Huzurlu tempo"],
      },
    },
    pricing: {
      price: 40,
      priceNote: "2-hour guided ride",
      included: ["Well-trained horses", "Experienced guide", "Valley trails", "Safety equipment"],
    },
  },

  // SHOWCASE-ONLY EXPERIENCES (Experiences page only, not bookable via Activities page)
  {
    id: "wine-tasting",
    category: "gastronomy",
    duration: "2-3 hours",
    image: "/images/activities/sarap-tadim.avif",
    bookable: false,
    content: {
      en: {
        title: "Cappadocia Wine Tasting",
        tagline: "Ancient vineyards, modern vintages",
        description: "Taste wines from Cappadocia's volcanic soil terroir at local wineries. The region has produced wine for over 4,000 years.",
        longDescription: "Cappadocia's volcanic soil has nurtured vineyards for millennia. Visit local wineries to taste indigenous grape varieties like Emir and Kalecik Karası, learning how the unique terroir shapes each vintage. A journey through ancient winemaking traditions in a modern context.",
        highlights: ["Indigenous grape varieties", "Volcanic terroir", "Historic wine caves"],
      },
    },
  },

  {
    id: "underground-city",
    category: "history",
    duration: "2-3 hours",
    image: "/images/activities/yeralti-sehri.avif",
    bookable: false,
    content: {
      en: {
        title: "Underground City Tour",
        tagline: "Subterranean refuge of ancient civilizations",
        description: "Descend into one of Cappadocia's remarkable underground cities, carved 8-10 levels deep into soft volcanic rock.",
        longDescription: "Descend into Derinkuyu or Kaymaklı — multi-level underground cities that once sheltered thousands. These subterranean labyrinths include living quarters, storage rooms, churches, and even wine presses, all carved entirely from rock. A testament to human ingenuity and survival.",
        highlights: ["8-10 underground levels", "Ancient ventilation systems", "Rock-carved churches"],
      },
    },
  },

  {
    id: "photography-safari",
    category: "art",
    duration: "4-5 hours",
    image: "/images/activities/foto-safari.avif",
    bookable: false,
    content: {
      en: {
        title: "Photography Safari",
        tagline: "Capture Cappadocia's golden hours",
        description: "Guided photo tour to the region's most photogenic spots during optimal lighting. Perfect for serious photographers and enthusiasts.",
        longDescription: "A dedicated photography tour timed for sunrise or sunset, visiting the most dramatic viewpoints and hidden compositions. Your guide knows the light, the angles, and the moments. Bring your camera and leave with extraordinary images.",
        highlights: ["Sunrise/sunset timing", "Hidden viewpoints", "Photography guidance"],
      },
    },
  },

  {
    id: "valley-hikes",
    category: "nature",
    duration: "3-4 hours",
    image: "/images/activities/vadi-yuruyusu.avif",
    bookable: false,
    content: {
      en: {
        title: "Valley Hikes",
        tagline: "On foot through fairy chimney valleys",
        description: "Hike through Rose Valley, Love Valley, or Pigeon Valley on guided trails through Cappadocia's most scenic routes.",
        longDescription: "Walk through Rose Valley's pink-hued rock formations, Love Valley's distinctive geology, or Pigeon Valley's historic dovecotes. These guided hikes reveal details invisible from vehicles — hidden cave churches, ancient carvings, and the quiet beauty of the valleys.",
        highlights: ["Rose, Love, or Pigeon Valley", "Cave churches", "Moderate hiking"],
      },
    },
  },

  {
    id: "turkish-cooking",
    category: "gastronomy",
    duration: "3-4 hours",
    image: "/images/activities/geleneksek-turk-mutfagi.avif",
    bookable: false,
    content: {
      en: {
        title: "Traditional Turkish Cooking",
        tagline: "Master Anatolian home cuisine",
        description: "Learn to prepare authentic Turkish dishes in a local home kitchen. Cook, eat, and take recipes home.",
        longDescription: "Join a local family's kitchen to learn traditional Anatolian cooking. Prepare dishes like gözleme, mantı, and testi kebab using techniques passed through generations. A hands-on cultural exchange ending with a shared meal.",
        highlights: ["Home kitchen setting", "Traditional recipes", "Shared meal"],
      },
    },
  },

  {
    id: "cycling-tours",
    category: "nature",
    duration: "3-4 hours",
    image: "/images/activities/bisiklet-turu.avif",
    bookable: false,
    content: {
      en: {
        title: "Cycling Tours",
        tagline: "Pedal through ancient valleys",
        description: "Explore Cappadocia by bicycle on quiet valley routes. A refreshing, active way to cover more ground than hiking.",
        longDescription: "Cycle through the valleys on dedicated routes that reveal Cappadocia's landscape at a perfect pace — faster than walking, slower than driving. Feel the terrain, breathe the air, and stop wherever curiosity calls.",
        highlights: ["Valley cycling routes", "E-bikes available", "Moderate difficulty"],
      },
    },
  },

  {
    id: "pottery-workshop",
    category: "art",
    duration: "2 hours",
    image: "/images/activities/pottery.avif",
    bookable: false,
    content: {
      en: {
        title: "Pottery Workshop - Avanos",
        tagline: "Shape clay on the potter's wheel",
        description: "Try your hand at traditional pottery-making in Avanos, famous for its red clay from the Kızılırmak River.",
        longDescription: "Avanos has been a pottery center for over 4,000 years. Learn the basics of wheel-throwing from local artisans, working with the region's distinctive red clay. Create your own piece to take home as a tangible memory.",
        highlights: ["Potter's wheel experience", "Local red clay", "Take home creation"],
      },
    },
  },

  {
    id: "turkish-hammam",
    category: "wellness",
    duration: "1.5 hours",
    image: "/images/activities/turkish-hammam.avif",
    bookable: false,
    content: {
      en: {
        title: "Turkish Hammam Experience",
        tagline: "Traditional bath ritual",
        description: "Experience the centuries-old Turkish bath tradition with steam, scrub, foam massage, and relaxation.",
        longDescription: "The hammam ritual is both cleansing and meditative. In heated marble chambers, experience the traditional sequence: steam, exfoliation scrub, foam massage, and cool-down. A practice refined over centuries.",
        highlights: ["Traditional marble hammam", "Foam massage", "Full relaxation"],
      },
    },
  },
]

// ════════════════════════════════════════════════════════════════════════════
// HELPER EXPORTS
// ════════════════════════════════════════════════════════════════════════════

// All bookable activities (for Activities page)
export const bookableExperiences = experiences.filter(exp => exp.bookable === true)

// Get experience by ID
export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find(exp => exp.id === id)
}

// Get experiences by category
export const getExperiencesByCategory = (category: ExperienceCategory): Experience[] => {
  return experiences.filter(exp => exp.category === category)
}

// Get localized content
export const getLocalizedContent = (
  experience: Experience,
  locale: "en" | "tr" | "zh" = "en"
): LocalizedContent => {
  return experience.content[locale] || experience.content.en
}
