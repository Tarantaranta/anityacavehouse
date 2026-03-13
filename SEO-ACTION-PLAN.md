# 🎯 Anitya Cave House - Kapsamlı SEO Eylem Planı
**3 Dil için SEO Optimizasyonu: TR | EN | ZH**

Analiz Tarihi: 13 Mart 2026
Site: anityacavehouse.com
Framework: Next.js 16 App Router + next-intl

---

## 📊 Yönetici Özeti

**Mevcut Durum:** Site teknik olarak sağlam bir temele sahip (Next.js 16, modern stack) ancak SEO açısından **kritik eksiklikler** mevcut.

**Ana Sorunlar:**
- ❌ Sitemap yok
- ❌ robots.txt yok
- ❌ Hreflang etiketleri yok (3 dil için KRİTİK!)
- ❌ Çoğu sayfada metadata yok
- ❌ Schema.org structured data yok
- ⚠️ 261MB kullanılmayan eski site görselleri

**Potansiyel Etki:** Bu eksiklikler giderildiğinde:
- Google/Baidu/Yandex'te daha iyi indexleme
- Çok dilli aramalarda doğru dil versiyonunun gösterilmesi
- Organik trafikte %150-300 artış potansiyeli
- Rich snippets ile CTR artışı

---

## 🚨 KRİTİK ÖNCELİK (Hemen Yapılmalı)

### 1. Sitemap Oluşturma (⏱ 30 dakika)

**Sorun:** Sitemap yok, Google tüm sayfaları keşfedemiyor.

**Çözüm:** `src/app/sitemap.ts` dosyası oluştur

```typescript
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

  // Blog posts
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

  // Main routes
  locales.forEach(locale => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            tr: `${baseUrl}/tr${route}`,
            en: `${baseUrl}/en${route}`,
            zh: `${baseUrl}/zh${route}`,
          }
        }
      });
    });

    // Rooms
    roomSlugs.forEach(slug => {
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
          }
        }
      });
    });

    // Blog posts
    blogPosts.forEach(slug => {
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
          }
        }
      });
    });
  });

  return sitemapEntries;
}
```

**Test:** `https://anityacavehouse.com/sitemap.xml`

---

### 2. robots.txt Oluşturma (⏱ 5 dakika)

**Çözüm:** `src/app/robots.ts` dosyası oluştur

```typescript
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
          '/images/old-site/', // 261MB eski görseller indexlenmesin
        ],
      },
      // Baidu için özel (Çince pazar)
      {
        userAgent: 'Baiduspider',
        allow: '/zh/',
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://anityacavehouse.com/sitemap.xml',
  };
}
```

---

### 3. Hreflang Implementasyonu (⏱ 1 saat)

**Sorun:** Google her dil için hangi sayfayı göstereceğini bilmiyor. Türkiye'den arayan kullanıcıya İngilizce sayfa, Çin'den arayana Türkçe sayfa gösterilebiliyor.

**Çözüm:** Root layout'a hreflang ekle

**Dosya:** `src/app/[locale]/layout.tsx`

```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ChatBot from '@/components/chat/ChatBot';
import ImageProtectionProvider from '@/components/providers/ImageProtectionProvider';

// 🆕 Hreflang metadata generator
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://anityacavehouse.com';

  // Her sayfa için pathname al (usePathname kullanamayız, server component)
  // Alternatif: pathname'i dynamic olarak al

  return {
    title: {
      template: '%s | Anitya Cave House',
      default: locale === 'tr'
        ? 'Anitya Cave House – Ortahisar Kapadokya Bağımsız Suite Evler'
        : locale === 'en'
        ? 'Anitya Cave House – Independent Suite Houses in Ortahisar, Cappadocia'
        : 'Anitya洞穴之家 - 卡帕多西亚奥塔希萨尔独立套房',
    },
    description: locale === 'tr'
      ? 'Anitya Cave House, Kapadokya Ortahisar\'da yer alan, ortak alanı olmayan bağımsız mağara ve taş suite evlerden oluşan küçük bir konaklama evidir.'
      : locale === 'en'
      ? 'Anitya Cave House is a boutique accommodation in Ortahisar, Cappadocia, featuring independent cave and stone suite houses with no shared common areas.'
      : 'Anitya洞穴之家是位于卡帕多西亚奥塔希萨尔的精品住宿，设有独立的洞穴和石头套房，没有共享公共区域。',

    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'tr': `${baseUrl}/tr`,
        'en': `${baseUrl}/en`,
        'zh': `${baseUrl}/zh`,
        'x-default': `${baseUrl}/en`, // Fallback for unknown regions
      },
    },

    openGraph: {
      locale: locale,
      alternateLocale: locale === 'tr' ? ['en', 'zh'] : locale === 'en' ? ['tr', 'zh'] : ['tr', 'en'],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ImageProtectionProvider>
        <ScrollProgress />
        {children}
        <ChatBot />
      </ImageProtectionProvider>
    </NextIntlClientProvider>
  );
}
```

**Not:** Her sayfa için dynamic hreflang gerekiyor. Bunu middleware veya her sayfa metadata'sında eklemen gerekecek.

---

### 4. Ana Sayfalar için Metadata (⏱ 2 saat)

**Sorun:** Ana sayfa, oda detayları, blog yazıları metadata export etmiyor.

#### 4.1 Ana Sayfa Metadata

**Dosya:** `src/app/[locale]/page.tsx`

Dosyanın en başına ekle:

```typescript
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://anityacavehouse.com';

  const metadata = {
    tr: {
      title: 'Anitya Cave House – Ortahisar Kapadokya Bağımsız Mağara ve Taş Suite Evler',
      description: 'Kapadokya Ortahisar\'da bulunan Anitya Cave House, ortak alanı olmayan bağımsız mağara ve taş suite evlerden oluşur. Özel teras, donanımlı mutfak, mahremiyet odaklı tasarım.',
      keywords: 'kapadokya otelleri, mağara otelleri kapadokya, ortahisar konaklama, bağımsız suite, kapadokya mağara evi, butik otel kapadokya',
    },
    en: {
      title: 'Anitya Cave House – Independent Cave & Stone Suites in Ortahisar, Cappadocia',
      description: 'Anitya Cave House in Ortahisar, Cappadocia features independent cave and stone suite houses with no shared common areas. Private terrace, equipped kitchen, privacy-focused design.',
      keywords: 'cappadocia hotels, cave hotels cappadocia, ortahisar accommodation, independent suite, cappadocia cave house, boutique hotel cappadocia',
    },
    zh: {
      title: 'Anitya洞穴之家 – 卡帕多西亚奥塔希萨尔独立洞穴和石头套房',
      description: '位于卡帕多西亚奥塔希萨尔的Anitya洞穴之家，设有独立的洞穴和石头套房，没有共享公共区域。私人露台、设备齐全的厨房、注重隐私的设计。',
      keywords: '卡帕多西亚酒店, 洞穴酒店, 奥塔希萨尔住宿, 独立套房, 精品酒店',
    },
  };

  const currentLocale = locale as 'tr' | 'en' | 'zh';
  const meta = metadata[currentLocale];

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,

    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'tr': `${baseUrl}/tr`,
        'en': `${baseUrl}/en`,
        'zh': `${baseUrl}/zh`,
        'x-default': `${baseUrl}/en`,
      },
    },

    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}`,
      siteName: 'Anitya Cave House',
      images: [
        {
          url: `${baseUrl}/images/cappadocia-cave-house.avif`,
          width: 1200,
          height: 630,
          alt: locale === 'tr'
            ? 'Anitya Cave House - Kapadokya Mağara Evi'
            : locale === 'en'
            ? 'Anitya Cave House - Cappadocia Cave Hotel'
            : 'Anitya洞穴之家',
        },
      ],
      locale: locale,
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}/images/cappadocia-cave-house.avif`],
    },
  };
}

// Mevcut HomePage componenti devam eder...
export default function HomePage() {
  // ...
}
```

#### 4.2 Oda Detay Sayfası Metadata

**Dosya:** `src/app/[locale]/rooms/[slug]/page.tsx`

generateStaticParams fonksiyonundan sonra ekle:

```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) return {};

  const l = locale as 'tr' | 'en' | 'zh';
  const name = room.name[l];
  const description = room.shortDescription[l];
  const baseUrl = 'https://anityacavehouse.com';

  return {
    title: `${name} | Anitya Cave House`,
    description: description,

    alternates: {
      canonical: `${baseUrl}/${locale}/rooms/${slug}`,
      languages: {
        'tr': `${baseUrl}/tr/rooms/${slug}`,
        'en': `${baseUrl}/en/rooms/${slug}`,
        'zh': `${baseUrl}/zh/rooms/${slug}`,
        'x-default': `${baseUrl}/en/rooms/${slug}`,
      },
    },

    openGraph: {
      title: name,
      description: description,
      url: `${baseUrl}/${locale}/rooms/${slug}`,
      images: room.images && room.images.length > 0 ? [
        {
          url: `${baseUrl}${room.images[0]}`,
          width: 1200,
          height: 630,
          alt: name,
        },
      ] : [],
      locale: locale,
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: name,
      description: description,
      images: room.images && room.images.length > 0 ? [`${baseUrl}${room.images[0]}`] : [],
    },
  };
}
```

#### 4.3 Blog Sayfaları için Metadata Template

Her blog sayfasına metadata ekle. Örnek:

**Dosya:** `src/app/[locale]/blog/kapadokya-mutfagi-testi-kebabindan-pottery-sofralar/page.tsx`

```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://anityacavehouse.com';
  const slug = 'kapadokya-mutfagi-testi-kebabindan-pottery-sofralar';

  const metadata = {
    tr: {
      title: 'Kapadokya Mutfağı: Testi Kebabından Pottery Sofralarına',
      description: 'Kapadokya mutfağının ikonik lezzeti testi kebabı, yeraltı şırahaneleri ve bölgeye özgü Emir, Dimrit üzümleri. Toprağın lezzete dönüştüğü mutfak kültürü.',
    },
    en: {
      title: 'Cappadocia Cuisine: From Testi Kebab to Pottery Tables',
      description: 'The iconic testi kebab of Cappadocian cuisine, underground wine cellars, and indigenous Emir and Dimrit grapes. A culinary culture where earth becomes flavor.',
    },
    zh: {
      title: '卡帕多西亚美食：从陶罐烤肉到陶器餐桌',
      description: '卡帕多西亚美食的标志性菜肴陶罐烤肉、地下酒窖和本地Emir、Dimrit葡萄。土地变成美味的烹饪文化。',
    },
  };

  const l = locale as 'tr' | 'en' | 'zh';
  const meta = metadata[l];

  return {
    title: meta.title,
    description: meta.description,

    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${slug}`,
      languages: {
        'tr': `${baseUrl}/tr/blog/${slug}`,
        'en': `${baseUrl}/en/blog/${slug}`,
        'zh': `${baseUrl}/zh/blog/${slug}`,
        'x-default': `${baseUrl}/en/blog/${slug}`,
      },
    },

    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/blog/${slug}`,
      type: 'article',
      publishedTime: '2025-10-01T00:00:00Z',
      authors: ['Anitya Cave House'],
      locale: locale,
    },
  };
}
```

---

### 5. Schema.org Structured Data (⏱ 1.5 saat)

**Sorun:** Google Rich Snippets gösteremiyor (yıldız puanları, fiyat, konum vb.)

**Çözüm:** JSON-LD structured data ekle

#### 5.1 Organization Schema (Root Layout)

**Dosya:** `src/app/layout.tsx`

body tag'inin içine ekle:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      '@id': 'https://anityacavehouse.com',
      name: 'Anitya Cave House',
      alternateName: 'Anitya洞穴之家',
      description: 'Independent cave and stone suite houses in Ortahisar, Cappadocia with private terraces and equipped kitchens.',
      url: 'https://anityacavehouse.com',
      telephone: '+90-XXX-XXX-XXXX', // Gerçek telefon ekle
      email: 'info@anityacavehouse.com', // Gerçek email ekle
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ortahisar', // Tam adres ekle
        addressLocality: 'Ortahisar',
        addressRegion: 'Nevşehir',
        postalCode: '50650',
        addressCountry: 'TR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '38.6392', // Gerçek koordinatlar
        longitude: '34.8596',
      },
      image: [
        'https://anityacavehouse.com/images/cappadocia-cave-house.avif',
        'https://anityacavehouse.com/images/anitya-cave-suite/hero.jpg',
      ],
      priceRange: '$$', // Fiyat aralığına göre ayarla
      starRating: {
        '@type': 'Rating',
        ratingValue: '5.0', // Gerçek rating
        bestRating: '5',
      },
      amenityFeature: [
        {
          '@type': 'LocationFeatureSpecification',
          name: 'Private Terrace',
          value: true,
        },
        {
          '@type': 'LocationFeatureSpecification',
          name: 'Full Kitchen',
          value: true,
        },
        {
          '@type': 'LocationFeatureSpecification',
          name: 'Cave Architecture',
          value: true,
        },
      ],
      sameAs: [
        'https://www.airbnb.com/users/show/XXXXX', // Gerçek linkler
        'https://www.instagram.com/anityacavehouse',
        'https://www.facebook.com/anityacavehouse',
      ],
    }),
  }}
/>
```

#### 5.2 Hotel Room Schema (Oda Detay Sayfaları)

Her oda sayfasına ekle:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HotelRoom',
      name: name, // room.name[locale]
      description: description,
      image: room.images,
      bed: {
        '@type': 'BedDetails',
        numberOfBeds: 1, // Odaya göre ayarla
        typeOfBed: 'King',
      },
      occupancy: {
        '@type': 'QuantitativeValue',
        maxValue: room.capacity,
      },
      amenityFeature: [
        {
          '@type': 'LocationFeatureSpecification',
          name: 'Private Bathroom',
          value: true,
        },
        // Diğer amenities buraya
      ],
    }),
  }}
/>
```

#### 5.3 Breadcrumb Schema

Tüm sayfalara breadcrumb ekle:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `https://anityacavehouse.com/${locale}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Rooms',
          item: `https://anityacavehouse.com/${locale}/rooms`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: room.name[locale],
          item: `https://anityacavehouse.com/${locale}/rooms/${slug}`,
        },
      ],
    }),
  }}
/>
```

---

## 🔥 YÜKSEK ÖNCELİK (1 Hafta İçinde)

### 6. Performans Optimizasyonları

#### 6.1 Eski Görselleri Temizle (⏱ 15 dakika)

```bash
# 261MB kullanılmayan görselleri sil
rm -rf public/images/old-site/
```

#### 6.2 Image Optimization Audit

**Mevcut Durum:** ✅ Next.js Image component kullanılıyor (31 yerde)

**İyileştirmeler:**
- AVIF formatı öncelikli (zaten var ✅)
- Lazy loading (Next.js otomatik ✅)
- `priority` prop'u hero görsellerine ekle
- `sizes` attribute'unu optimize et

**Örnek:**

```typescript
<Image
  src="/images/hero.avif"
  alt="Anitya Cave House"
  fill
  priority // Hero görseli için
  sizes="100vw"
  quality={90}
/>
```

#### 6.3 Font Optimization

**Mevcut:** Google Fonts (Inter, Cormorant Garamond) + `display: swap` ✅

**İyileştirme:** Preconnect ekle

`src/app/layout.tsx` head'e:

```typescript
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

#### 6.4 Third-Party Script Optimization

**Mevcut:** Sentry, Google Analytics

**İyileştirme:** Next.js Script component kullan

```typescript
import Script from 'next/script';

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
  strategy="afterInteractive" // veya "lazyOnload"
/>
```

---

### 7. Content Optimization

#### 7.1 Alt Text Audit

**Tüm görsellere** anlamlı alt text ekle:

```typescript
// ❌ Kötü
<Image src="/room.jpg" alt="room" />

// ✅ İyi (Türkçe)
<Image src="/room.jpg" alt="Anitya Cave Suite - Kapadokya mağara oda iç görünümü" />

// ✅ İyi (İngilizce)
<Image src="/room.jpg" alt="Anitya Cave Suite - Interior view of Cappadocia cave room" />

// ✅ İyi (Çince)
<Image src="/room.jpg" alt="Anitya洞穴套房 - 卡帕多西亚洞穴房间内部视图" />
```

#### 7.2 Heading Hierarchy Audit

Her sayfada:
- 1 adet H1 (sayfa başlığı)
- Mantıklı H2, H3 hiyerarşisi
- Anahtar kelimeleri doğal şekilde ekle

**Örnek (Ana Sayfa):**

```
H1: Anitya Cave House – Kapadokya'da Bağımsız Mağara Evleri
  H2: Ortahisar'da Benzersiz Konaklama Deneyimi
    H3: Özel Teraslı Mağara Suitleri
    H3: Tam Donanımlı Mutfak
  H2: Suitlerimiz
    H3: Anitya Cave Suite
    H3: Şırahane Cave Suit
    H3: Dublex Stone Suit
```

---

### 8. Anahtar Kelime Optimizasyonu

#### 8.1 Türkçe Anahtar Kelimeler

**Ana Kelimeler:**
- kapadokya otelleri
- mağara otelleri kapadokya
- ortahisar konaklama
- kapadokya bağımsız oda
- kapadokya boutique otel

**Long-tail:**
- kapadokya'da özel teraslı mağara evi
- ortahisar mutfaklı konaklama
- kapadokya mahremiyet odaklı otel
- kapadokya'da airbnb superhost

**Yerleştir:**
- Title tag: ✅
- Meta description: ✅
- H1: ✅
- İlk paragraf: İlk 100 kelimede
- URL: `/tr/magara-otelleri` gibi URL'ler ekle

#### 8.2 İngilizce Anahtar Kelimeler

**Ana Kelimeler:**
- cappadocia hotels
- cave hotels cappadocia
- ortahisar accommodation
- cappadocia cave house
- boutique hotel cappadocia

**Long-tail:**
- private terrace cave house cappadocia
- cappadocia accommodation with kitchen
- privacy-focused hotel cappadocia
- best cave hotels in ortahisar

#### 8.3 Çince Anahtar Kelimeler (卡帕多西亚)

**研究建议:**
- 卡帕多西亚酒店 (Cappadocia hotels)
- 洞穴酒店 (Cave hotels)
- 精品酒店 (Boutique hotel)
- 土耳其住宿 (Turkey accommodation)
- 热气球 (Hot air balloon) - 相关内容

**Baidu Optimization:**
- Meta keywords tag kullan (Baidu için hala önemli)
- Simplified Chinese kullan (繁体中文 değil)
- ICP lisansı gerekebilir (Çin pazarına ciddi girişte)

---

### 9. Blog SEO Strategy

#### 9.1 Mevcut Blog İçerikleri

✅ Kaliteli, uzun-form içerikler mevcut:
- Ortahisar'da Sabah: Taş ve Işık
- Güvercin Vadisi Gün Batımı Yürüyüş Rehberi
- Kapadokya Mutfağı
- Tüf Taşının Hikayesi
- Sıcak Hava Balonu Rehberi
- Teras Sabahları

**İyileştirmeler:**
1. Her blog'a metadata ekle (Öncelik 4.3'te)
2. İç bağlantılar ekle (blog → rooms, experiences)
3. CTA ekle ("Rezervasyon Yap", "Suitlerimizi Keşfedin")

#### 9.2 Yeni Blog Konuları (İçerik Takvimi)

**Türkçe:**
- "Kapadokya'da Nerede Kalınır: Göreme mi Ortahisar mı?"
- "Mağara Evlerinde Kalmanın 10 Faydası"
- "Kapadokya'da Saklanacak Yerler: Kalabalıktan Uzak"
- "Anitya'da Bir Gün: Sabahtan Akşama Deneyim"

**İngilizce:**
- "Where to Stay in Cappadocia: Goreme vs Ortahisar"
- "10 Benefits of Staying in Cave Hotels"
- "Hidden Gems in Cappadocia: Beyond the Crowds"
- "A Day at Anitya: From Sunrise to Sunset"

**Çince:**
- "卡帕多西亚住宿指南：格雷梅还是奥塔希萨尔？"
- "洞穴酒店住宿的10大好处"
- "卡帕多西亚隐藏的宝藏"

#### 9.3 Topic Clusters (Pillar Pages)

**Pillar Page 1:** "Kapadokya Konaklama Rehberi"
- Cluster: Nerede kalınır, Mağara otelleri, Boutique oteller, Ortahisar rehberi

**Pillar Page 2:** "Kapadokya Deneyimleri"
- Cluster: Balon turları, Yürüyüş rotaları, Yerel mutfak, Mağara şehirleri

---

## ⚙️ ORTA ÖNCELİK (1 Ay İçinde)

### 10. Technical SEO İyileştirmeleri

#### 10.1 Canonical URLs

Her sayfaya canonical tag ekle (metadata içinde zaten var, kontrol et):

```typescript
alternates: {
  canonical: `https://anityacavehouse.com/${locale}/page`,
}
```

#### 10.2 XML Sitemap Enhancement

Sitemap'e son düzenleme tarihi ekle:

```typescript
lastModified: new Date('2026-03-13'), // Gerçek tarihler
```

#### 10.3 Internal Linking Strategy

**Öncelikli Linkler:**
- Ana sayfa → Rooms (her suite)
- Ana sayfa → Blog (son 3 post)
- Blog posts → Related rooms
- Rooms → Booking
- Her sayfa → Contact

**Anchor Text Optimization:**
```typescript
// ❌ Kötü
<Link href="/rooms">Buraya tıklayın</Link>

// ✅ İyi
<Link href="/rooms">Kapadokya mağara oda seçeneklerimizi keşfedin</Link>
```

#### 10.4 404 Page Optimization

Custom 404 sayfası oluştur:
- Arama kutusu
- Popüler sayfalar listesi
- Ana sayfaya dönüş linki

---

### 11. Local SEO (Yerel Arama Optimizasyonu)

#### 11.1 Google Business Profile

**Yapılacaklar:**
1. Google Business Profile oluştur/güncelle
2. Kategori: "Otel", "Boutique Otel", "Mağara Oteli"
3. Tüm bilgileri ekle (adres, telefon, website, çalışma saatleri)
4. Fotoğraflar ekle (min. 10 adet yüksek kalite)
5. Müşteri yorumlarını teşvik et
6. Yorumlara yanıt ver (TR/EN/ZH)

#### 11.2 Local Citations

**Listelenmesi Gereken Platformlar:**
- TripAdvisor ✅ (muhtemelen var)
- Booking.com
- Hotels.com
- Expedia
- Yelp
- Foursquare

**NAP Consistency:** (Name, Address, Phone)
Tüm platformlarda tam olarak aynı bilgiler olmalı.

#### 11.3 Bölgesel Anahtar Kelimeler

**Eklenmesi Gerekenler:**
- Ortahisar (✅ var)
- Göreme yakını
- Uçhisar yakını
- Ürgüp yakını
- Nevşehir otelleri

---

### 12. Uluslararası SEO

#### 12.1 Çin Pazarı (Baidu SEO)

**Özel Optimizasyonlar:**
1. Baidu Webmaster Tools'a kayıt
2. Baidu Analytics ekle
3. Simplified Chinese kullan
4. Meta keywords tag ekle (Baidu için)
5. Yavaş crawl rate (robots.txt'te crawlDelay: 1)

**Hosting:** Çin'de sunucu gerekebilir (hız için)

**Social:** WeChat, Weibo linkler ekle

#### 12.2 Yandex (Türkiye/Rusya)

**Optimizasyonlar:**
1. Yandex Webmaster Tools'a kayıt
2. Yandex Metrica ekle
3. Rusça içerik eklemeyi düşün (potansiyel pazar)

---

## 📈 DÜŞÜK ÖNCELİK (Sürekli İyileştirme)

### 13. User Experience (UX) SEO Factors

#### 13.1 Core Web Vitals Monitoring

**Araçlar:**
- Google PageSpeed Insights
- Lighthouse
- Chrome DevTools

**Hedefler:**
- LCP: < 2.5s
- FID/INP: < 200ms
- CLS: < 0.1

**İzleme:** Aylık rapor oluştur

#### 13.2 Mobile Optimization

**Kontroller:**
- Responsive tasarım ✅
- Touch target sizes (min. 48x48px)
- Mobile viewport ✅
- Mobile-first indexing ready

#### 13.3 Accessibility (a11y)

**SEO İçin Önemli:**
- Alt text'ler ✅
- ARIA labels
- Semantic HTML
- Keyboard navigation
- Contrast ratios

**Araç:** WAVE, axe DevTools

---

### 14. Analytics & Tracking

#### 14.1 Google Search Console

**Setup:**
1. Domain property ekle
2. Sitemap submit et
3. Hreflang hatalarını izle
4. Core Web Vitals raporu
5. Index coverage raporu

#### 14.2 Google Analytics 4

**Mevcut:** ✅ Google Analytics var

**Ekstra Tracking:**
- Event tracking: CTA clicks, booking starts
- Conversion goals: Booking completed, Contact form
- Language distribution
- User flow analysis

#### 14.3 Heatmap & Session Recording

**Araçlar:**
- Hotjar
- Microsoft Clarity (ücretsiz)

**Amaç:** Kullanıcı davranışını anla, CTR artır

---

### 15. Link Building Strategy

#### 15.1 İç Linkler (Internal Links)

**Yapılacaklar:**
- Blog posts arası linkler
- Room pages → Related experiences
- Footer: Sitemap linki

#### 15.2 Dış Linkler (Backlinks)

**Stratejiler:**
1. **Guest Blogging:**
   - Seyahat blogları
   - Türkiye turizm siteleri
   - Mimarlık/restorasyon blogları

2. **PR:**
   - Basın bültenleri
   - Yerel medya
   - Turizm dergileri

3. **Partnerships:**
   - Tur operatörleri
   - Yerel işletmeler (restoranlar, turlar)
   - Balon şirketleri

4. **Social Media:**
   - Instagram: #cappadocia #cavehotel
   - Pinterest: Konaklama panoları
   - WeChat: Çin pazarı için

---

## 🎯 Ölçülebilir Hedefler (KPI)

### 3 Ay Sonra:
- ✅ Sitemap indexlenmiş
- ✅ Hreflang hataları 0
- 📈 Organik trafik +50%
- 📈 Blog sayfası görüntülemeleri +100%
- ⭐ Google Business Profile: 4.5+ rating, 20+ yorumlar

### 6 Ay Sonra:
- 📈 Organik trafik +150%
- 🏆 "kapadokya mağara oteli" için ilk 5 (TR)
- 🏆 "cave hotels cappadocia" için ilk 10 (EN)
- 📱 %60+ mobil trafik
- 💰 Organik rezervasyonlar +200%

### 12 Ay Sonra:
- 🏆 "ortahisar konaklama" için #1 (TR)
- 🏆 "boutique cave hotel cappadocia" için ilk 5 (EN)
- 🌏 Çin pazarından trafik %10+
- 📈 Toplam organik trafik +300%
- 💎 Domain Authority: 40+

---

## 🛠️ Araçlar & Kaynaklar

### SEO Araçları:
- **Google Search Console** (ücretsiz, zorunlu)
- **Google Analytics 4** (ücretsiz, mevcut)
- **Google PageSpeed Insights** (ücretsiz)
- **Ahrefs** veya **SEMrush** (ücretli, opsiyonel)
- **Screaming Frog** (ücretsiz/ücretli)

### Çok Dilli SEO:
- **Google Translate** (otomatik değil, kalite kontrolü için)
- **DeepL** (daha iyi çeviri kalitesi)
- **Yandex Webmaster**
- **Baidu Webmaster Tools**

### Monitoring:
- **Uptime Robot** (site uptime)
- **GTmetrix** (performans)
- **Microsoft Clarity** (heatmaps, ücretsiz)

---

## ✅ Hızlı Başlangıç Checklist

**Bugün Yapılabilecekler (2-3 saat):**
- [ ] `src/app/sitemap.ts` oluştur ve deploy et
- [ ] `src/app/robots.ts` oluştur ve deploy et
- [ ] Ana sayfa metadata'sını ekle
- [ ] Google Search Console'a siteyi ekle

**Bu Hafta (10 saat):**
- [ ] Tüm sayfalar için metadata ekle (Home, Rooms, Blog)
- [ ] Hreflang implementasyonu
- [ ] Schema.org JSON-LD ekle (Organization, HotelRoom)
- [ ] Alt text'leri güncelle
- [ ] Eski görselleri sil (261MB)

**Bu Ay (20 saat):**
- [ ] Blog içerik takvimi oluştur
- [ ] 3 yeni blog yazısı (TR/EN/ZH)
- [ ] Google Business Profile optimize et
- [ ] Internal linking stratejisini uygula
- [ ] Performance optimizasyonları

---

## 📞 Destek & Danışmanlık

Bu eylem planını uygulamak için:
1. **Kendi başına:** Yukarıdaki kod örneklerini kopyala-yapıştır
2. **Yardımla:** Her madde için detaylı implementasyon talimatları iste
3. **Otomatik:** SEO automation script'leri oluşturabilirim

**Soru/Sorun:** Her zaman detaylı açıklama isteyebilirsin!

---

**Hazırlayan:** Claude Opus 4.6 SEO Analysis Team
**Tarih:** 13 Mart 2026
**Versiyon:** 1.0

🚀 Başarılar! Bu planı uyguladığında organik trafiğinde ciddi artış göreceksin.
