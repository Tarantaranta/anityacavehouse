# SEO Optimization Guide - Anitya Cave House

Bu belge, Anitya Cave House web sitesi için uygulanan kapsamlı SEO iyileştirmelerini açıklar.

## 📋 Uygulanan İyileştirmeler

### 1. **SEO Altyapı ve Utility'ler**

#### Yeni Dosyalar:
- [`src/lib/seo-config.ts`](src/lib/seo-config.ts) - Global SEO konfigürasyonu
- [`src/lib/seo-utils.ts`](src/lib/seo-utils.ts) - SEO helper fonksiyonları

**Özellikler:**
- Merkezi SEO konfigürasyonu (business info, keywords, metadata)
- Metadata generator fonksiyonları
- Schema.org yapıları için helper'lar
- Çok dilli destek (TR, EN, ZH)
- Image alt text generator

### 2. **Schema.org Structured Data**

#### Yeni Bileşenler:
- [`src/components/seo/StructuredData.tsx`](src/components/seo/StructuredData.tsx) - JSON-LD renderer
- [`src/components/seo/Breadcrumbs.tsx`](src/components/seo/Breadcrumbs.tsx) - SEO-friendly breadcrumbs

**Eklenen Schema Türleri:**
- ✅ `Hotel` schema (ana sayfa)
- ✅ `LocalBusiness` / `LodgingBusiness` schema (ana sayfa)
- ✅ `HotelRoom` schema (oda sayfaları)
- ✅ `AggregateRating` schema (oda sayfaları + ana sayfa)
- ✅ `FAQPage` schema (SSS sayfası)
- ✅ `Article` schema (blog yazıları)
- ✅ `BreadcrumbList` schema (tüm sayfalarda)

### 3. **Sayfa İyileştirmeleri**

#### Ana Sayfa ([`src/app/[locale]/page.tsx`](src/app/[locale]/page.tsx))
- ✅ Hotel + LocalBusiness schema eklendi
- ✅ Gelişmiş metadata yapısı
- ✅ OpenGraph ve Twitter Cards

#### FAQ Sayfası ([`src/app/[locale]/faq/page.tsx`](src/app/[locale]/faq/page.tsx))
- ✅ FAQPage schema eklendi
- ✅ Breadcrumbs navigasyonu
- ✅ Kategorize edilmiş SSS'ler

#### Blog Sayfaları
- ✅ Article schema eklendi
- ✅ Breadcrumbs navigasyonu
- ✅ Author ve publisher bilgileri
- ✅ PublishedTime ve modifiedTime

#### Oda Sayfaları ([`src/app/[locale]/rooms/[slug]/page.tsx`](src/app/[locale]/rooms/[slug]/page.tsx))
- ✅ HotelRoom schema eklendi
- ✅ AggregateRating eklendi
- ✅ Breadcrumbs navigasyonu
- ✅ Amenity features detayları

### 4. **Internal Linking**

#### Yeni Bileşen:
- [`src/components/seo/RelatedContent.tsx`](src/components/seo/RelatedContent.tsx)

**Özellikler:**
- İlgili içerik önerileri
- Internal linking yapısı
- Görsel destekli içerik kartları
- Kategori bazlı filtreleme

**Kullanım Örneği:**
```tsx
import { RelatedContent } from '@/components/seo';

<RelatedContent
  title="İlgili İçerikler"
  items={[
    {
      title: "Ortahisar'da Sabah",
      excerpt: "Güneş henüz kaleyi aşmadan...",
      href: "/blog/ortahisar-sabah",
      image: "/images/blog-1.avif",
      category: "Ortahisar"
    }
  ]}
/>
```

### 5. **Sitemap İyileştirmeleri**

#### Güncellenen Dosya:
- [`src/app/sitemap.ts`](src/app/sitemap.ts)

**İyileştirmeler:**
- ✅ Gerçek dosya değişiklik tarihleri (`lastModified`)
- ✅ Optimize edilmiş `priority` değerleri
- ✅ İyileştirilmiş `changeFrequency`
- ✅ Dinamik blog post discovery
- ✅ Hreflang alternates

**Priority Yapısı:**
- Ana sayfa: 1.0
- Oda ve rezervasyon sayfaları: 0.9
- Blog ana sayfa: 0.8
- Blog yazıları: 0.75
- Diğer sayfalar: 0.7

### 6. **SEO Audit Script**

#### Yeni Script:
- [`scripts/seo-audit.ts`](scripts/seo-audit.ts)

**Kontrol Edilen Alanlar:**
- ✅ Metadata varlığı (title, description, openGraph)
- ✅ Structured data kontrolü
- ✅ Image alt text kontrolü
- ✅ Heading hierarchy
- ✅ Canonical URL'ler

**Kullanım:**
```bash
npm run seo:audit
```

**Çıktı Örneği:**
```
🚀 Starting SEO Audit...
═══════════════════════════════════

🔍 Checking metadata...
🔍 Checking structured data...
🔍 Checking image alt text...
🔍 Checking heading hierarchy...
🔍 Checking canonical URLs...

═══════════════════════════════════

📊 Audit Results:

❌ Errors: 0
⚠️  Warnings: 2
ℹ️  Info: 1

✅ No critical errors found.
```

## 🎯 SEO Hedefleri ve Metrikler

### Teknik SEO
- [x] Valid HTML5 ve semantic markup
- [x] Proper heading hierarchy (h1-h6)
- [x] Alt text on all images
- [x] Canonical URLs
- [x] XML Sitemap
- [x] robots.txt optimization
- [x] Structured data (Schema.org)
- [x] Mobile-friendly design
- [x] Page speed optimization (AVIF, lazy loading)

### İçerik SEO
- [x] Unique titles and descriptions
- [x] Keyword optimization (TR, EN, ZH)
- [x] Internal linking structure
- [x] Blog content (6 yazı)
- [x] FAQ page
- [x] Multilingual support (3 dil)

### Off-Page SEO
- [x] Social media meta tags (OpenGraph, Twitter Cards)
- [x] Rich snippets (Hotel, Reviews, FAQ)
- [x] Local business information
- [x] Geographic coordinates

## 🚀 Kullanım Kılavuzu

### Yeni Sayfa Oluştururken

```tsx
import { generatePageMetadata } from '@/lib/seo-utils';
import { Breadcrumbs, StructuredData } from '@/components/seo';
import { Locale } from '@/lib/seo-config';

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;

  return generatePageMetadata({
    title: 'Sayfa Başlığı',
    description: 'Sayfa açıklaması',
    path: '/yeni-sayfa',
    locale: locale as Locale,
  });
}

export default async function NewPage({ params }: PageProps) {
  const { locale } = await params;
  const schema = { /* schema.org verisi */ };

  return (
    <>
      <StructuredData data={schema} />
      <Breadcrumbs items={breadcrumbItems} locale={locale as Locale} />
      {/* Sayfa içeriği */}
    </>
  );
}
```

### Schema Ekleme

```tsx
import {
  generateHotelSchema,
  generateLocalBusinessSchema,
  generateFAQSchema,
  generateArticleSchema,
} from '@/lib/seo-utils';

// Hotel schema
const hotelSchema = generateHotelSchema('tr');

// Article schema
const articleSchema = generateArticleSchema({
  headline: 'Makale Başlığı',
  description: 'Makale açıklaması',
  image: '/images/article.avif',
  datePublished: '2026-01-15',
  locale: 'tr',
  slug: 'makale-slug',
});

<StructuredData data={[hotelSchema, articleSchema]} />
```

### Breadcrumbs Ekleme

```tsx
<Breadcrumbs
  items={[
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Makale Başlığı', url: '/blog/makale' },
  ]}
  locale="tr"
/>
```

## 📊 Google Search Console İzleme

### Önemli Metrikler:
1. **Core Web Vitals**
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)
   - CLS (Cumulative Layout Shift)

2. **Indexing Status**
   - Sitemap coverage
   - Mobile usability
   - Page experience

3. **Rich Results**
   - Hotel rich results
   - FAQ rich results
   - Article rich results
   - Breadcrumb rich results

### Test Araçları:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

## 🔧 Bakım ve Güncelleme

### Düzenli Kontroller:
- [ ] Aylık SEO audit (`npm run seo:audit`)
- [ ] Sitemap güncelliği kontrolü
- [ ] Schema.org güncellemeleri
- [ ] Broken link kontrolü
- [ ] Core Web Vitals izleme

### SEO Config Güncelleme:
[`src/lib/seo-config.ts`](src/lib/seo-config.ts) dosyasından:
- Business bilgileri
- Rating/review sayıları
- Keywords
- Social media linkleri

## 📈 Beklenen Sonuçlar

### Kısa Vadede (1-3 ay):
- ✅ Google Search Console'da tüm sayfaların indexlenmesi
- ✅ Rich results görünümü (Hotel, FAQ, Article)
- ✅ Improved click-through rates (CTR)
- ✅ Better mobile usability scores

### Orta Vadede (3-6 ay):
- 🎯 Artırılmış organic traffic (%30-50)
- 🎯 İyileştirilmiş anahtar kelime sıralamaları
- 🎯 Daha fazla featured snippet
- 🎯 Lokal arama sıralamasında yükseliş

### Uzun Vadede (6-12 ay):
- 🎯 Domain authority artışı
- 🎯 Backlink sayısında artış
- 🎯 Brand search artışı
- 🎯 Conversion rate optimization (CRO)

## 🤝 Destek ve Yardım

SEO ile ilgili sorularınız için:
- SEO audit script'ini çalıştırın
- Schema validator kullanın
- Google Search Console'u kontrol edin

---

**Son Güncelleme:** 2026-05-19
**Versiyon:** 1.0.0
**Hazırlayan:** Claude SEO Ekibi
