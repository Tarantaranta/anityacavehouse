# ANITYA CAVE HOUSE - PROJECT TODO LIST

**Proje Başlangıç:** 3 Şubat 2026
**Hedef URL:** https://anityacavehouse.com
**Platform:** Next.js 15 + TypeScript + Tailwind CSS
**Diller:** Türkçe, İngilizce, Çince

---

## 🎯 FAZ 1: TEMEL KURULUM (Hafta 1-2)

### 1.1 Proje İnşası
- [ ] Next.js 15 projesi oluştur (App Router)
- [ ] TypeScript konfigürasyonu
- [ ] ESLint + Prettier setup
- [ ] Git repository başlat
- [ ] Temel klasör yapısını oluştur

### 1.2 UI Framework
- [ ] Tailwind CSS kurulumu ve konfigürasyon
- [ ] Shadcn/ui installation
- [ ] Temel UI componentleri ekle:
  - [ ] Button
  - [ ] Card
  - [ ] Input
  - [ ] Select
  - [ ] Dialog/Modal
  - [ ] Calendar
  - [ ] Tabs
- [ ] Font ayarları (Inter, Playfair Display?)
- [ ] Renk paleti tanımla (brand colors)

### 1.3 Çoklu Dil Desteği
- [ ] next-intl kurulumu
- [ ] Dil yapısı oluştur (`/[locale]`)
- [ ] Dil seçici component
- [ ] Translation dosyaları:
  - [ ] `messages/tr.json`
  - [ ] `messages/en.json`
  - [ ] `messages/zh.json`
- [ ] Middleware konfigürasyonu

### 1.4 Layout & Navigation
- [ ] Root layout oluştur
- [ ] Header component:
  - [ ] Logo
  - [ ] Ana menü
  - [ ] Dil seçici
  - [ ] "Rezervasyon Yap" CTA button
  - [ ] Mobil hamburger menu
- [ ] Footer component:
  - [ ] İletişim bilgileri
  - [ ] Sosyal medya linkler
  - [ ] Sitemap links
  - [ ] Copyright
- [ ] Loading states
- [ ] Error boundaries

### 1.5 Resim Migrasyonu
- [ ] Eski siteden resimleri kopyala
- [ ] Resimleri kategorize et (logo, rooms, gallery, slider)
- [ ] WebP/AVIF formatına dönüştür
- [ ] Responsive boyutlar oluştur
- [ ] `public/images/` yapısını organize et
- [ ] Image config (next.config.js)

---

## 🏠 FAZ 2: ANA SAYFALAR (Hafta 3-4)

### 2.1 Ana Sayfa (/)
- [ ] Hero Section:
  - [ ] Full-screen slider (Swiper.js)
  - [ ] Overlay text + CTA
  - [ ] Animasyonlar (Framer Motion)
- [ ] Quick Booking Widget (sticky)
- [ ] Features Section:
  - [ ] Mağara oda özellikleri
  - [ ] Airbnb Superhost badge
  - [ ] Lokasyon avantajları
- [ ] Rooms Preview (3 oda kartı)
- [ ] Testimonials Slider
- [ ] Instagram Feed Integration
- [ ] CTA Section (Rezervasyon)

### 2.2 Odalar Sayfası (/rooms)
- [ ] Oda listesi grid layout
- [ ] Room Card component:
  - [ ] Fotoğraf carousel
  - [ ] Oda adı ve açıklaması
  - [ ] Özellikler (iconlar)
  - [ ] Fiyat bilgisi
  - [ ] "Detaylar" ve "Rezervasyon" buttons
- [ ] Filtreleme (kapasite, fiyat)
- [ ] Sıralama (fiyat, popülerlik)

### 2.3 Oda Detay (/rooms/[slug])
- [ ] Hero image gallery (lightbox)
- [ ] Oda bilgileri:
  - [ ] Açıklama (TR/EN/ZH)
  - [ ] Özellikler listesi
  - [ ] Kapasite bilgileri
  - [ ] Oda boyutu
- [ ] Availability Calendar (Airbnb sync)
- [ ] Rezervasyon formu (sidebar)
- [ ] 360° Virtual Tour (opsiyonel)
- [ ] Reviews section
- [ ] Related rooms

### 2.4 Galeri (/gallery)
- [ ] Masonry layout veya Grid
- [ ] Kategori filtreleri:
  - [ ] Odalar
  - [ ] Genel alanlar
  - [ ] Manzara
  - [ ] Kahvaltı
- [ ] Lightbox/Modal view
- [ ] Lazy loading
- [ ] Infinite scroll veya pagination

### 2.5 Hakkımızda (/about)
- [ ] Otel hikayesi
- [ ] Team/sahipler bilgisi
- [ ] Mağara evler hakkında
- [ ] Lokasyon bilgisi
- [ ] Awards & Certifications
- [ ] Video tanıtım (YouTube embed)

### 2.6 İletişim (/contact)
- [ ] İletişim formu (React Hook Form)
- [ ] İletişim bilgileri:
  - [ ] Adres
  - [ ] Telefon
  - [ ] Email
  - [ ] WhatsApp link
- [ ] Google Maps embed
- [ ] Sosyal medya linkler
- [ ] Form validasyon
- [ ] Email notification setup (Resend veya Nodemailer)

---

## 💳 FAZ 3: REZERVASYON SİSTEMİ (Hafta 5-6)

### 3.1 Database Setup
- [ ] Supabase projesi oluştur (veya PostgreSQL)
- [ ] Prisma kurulumu
- [ ] Schema tasarımı:
  - [ ] `Room` model
  - [ ] `Booking` model
  - [ ] `Customer` model
  - [ ] `Payment` model
  - [ ] `AirbnbCalendar` model
- [ ] Migrations oluştur
- [ ] Seed data (odalar)

### 3.2 Airbnb Entegrasyonu (3 Takvim)
- [ ] iCal parser library kurulumu
- [ ] Airbnb iCal URL'lerini environment variables'a ekle:
  - [ ] `AIRBNB_CALENDAR_1_URL`
  - [ ] `AIRBNB_CALENDAR_2_URL`
  - [ ] `AIRBNB_CALENDAR_3_URL`
- [ ] iCal sync API route (`/api/airbnb/sync`)
- [ ] Cron job setup (15 dakikada bir sync)
- [ ] Database'e blocked dates kaydet
- [ ] Availability checker function
- [ ] Manuel sync trigger (admin panel)

### 3.3 Rezervasyon Formu
- [ ] Date range picker component:
  - [ ] Check-in / Check-out seçimi
  - [ ] Blocked dates gösterimi
  - [ ] Minimum konaklama süresi (2 gece?)
- [ ] Oda seçimi (multi-room support?)
- [ ] Misafir sayısı seçimi
- [ ] Müşteri bilgileri formu:
  - [ ] Ad Soyad
  - [ ] Email
  - [ ] Telefon
  - [ ] Ülke
  - [ ] Özel istekler
- [ ] Fiyat hesaplama (dinamik)
- [ ] Form validasyon
- [ ] Preview/Özet ekranı

### 3.4 Ödeme Sistemi
- [ ] iyzico hesabı aç
- [ ] iyzico SDK kurulumu
- [ ] Payment API route (`/api/payment/initialize`)
- [ ] 3D Secure flow:
  - [ ] TR kredi kartları → iyzico
  - [ ] Yurtdışı kartlar → Airbnb redirect veya Stripe
- [ ] Webhook handler (`/api/payment/callback`)
- [ ] Ödeme başarılı/başarısız sayfaları
- [ ] Güvenlik (HTTPS, rate limiting)
- [ ] KVKK/GDPR uyumluluk

### 3.5 Rezervasyon Yönetimi
- [ ] Rezervasyon onay email:
  - [ ] Müşteriye onay
  - [ ] Admin'e bildirim
- [ ] Rezervasyon detayları sayfası
- [ ] Invoice/Fatura oluşturma (PDF)
- [ ] Rezervasyon iptali (email link)
- [ ] Airbnb'ye manuel blok ekleme talimatı

### 3.6 Admin Panel (Basit)
- [ ] Auth sistemi (NextAuth.js)
- [ ] Dashboard:
  - [ ] Yeni rezervasyonlar
  - [ ] Bugünün check-in/out'ları
  - [ ] Revenue özeti
- [ ] Rezervasyon listesi (tablo)
- [ ] Rezervasyon detayları
- [ ] Calendar view (tüm odalar)
- [ ] Manuel rezervasyon ekleme

---

## 📝 FAZ 4: BLOG & SEO (Hafta 7-8)

### 4.1 Blog Sistemi
- [ ] MDX kurulumu (@next/mdx)
- [ ] Blog post structure:
  - [ ] `/content/blog/tr/`
  - [ ] `/content/blog/en/`
  - [ ] `/content/blog/zh/`
- [ ] Blog listing page (`/blog`)
- [ ] Blog post page (`/blog/[slug]`)
- [ ] Post components:
  - [ ] Featured image
  - [ ] Author info
  - [ ] Reading time
  - [ ] Tags
  - [ ] Share buttons
  - [ ] Related posts
- [ ] Search functionality (Algolia veya local search)

### 4.2 İçerik Yazımı (İlk 10 Blog)
- [ ] **TR Blog Posts:**
  - [ ] "Kapadokya'da Mağara Evlerde Kalmanın 10 Avantajı"
  - [ ] "Kapadokya'ya Nasıl Gidilir? Ulaşım Rehberi 2026"
  - [ ] "Kapadokya'da 3 Gün: Mükemmel Seyahat Rotası"
  - [ ] "Kapadokya'nın En İyi Fotoğraf Noktaları"
- [ ] **EN Blog Posts:**
  - [ ] "Why Stay in a Cave Hotel in Cappadocia?"
  - [ ] "Complete Guide to Cappadocia Hot Air Balloon Tours"
  - [ ] "Best Time to Visit Cappadocia: Seasonal Guide"
  - [ ] "Cappadocia Photography Guide: Best Spots"
- [ ] **ZH Blog Posts:**
  - [ ] "为什么选择卡帕多西亚洞穴酒店？" (Why choose Cappadocia cave hotels?)
  - [ ] "卡帕多西亚热气球完全指南" (Complete guide to hot air balloons)

### 4.3 SEO Optimizasyonu
- [ ] Next.js Metadata API setup
- [ ] Dynamic meta tags (title, description)
- [ ] Open Graph tags (Facebook/Twitter cards)
- [ ] hreflang tags (TR/EN/ZH alternates)
- [ ] Canonical URLs
- [ ] robots.txt oluştur
- [ ] sitemap.xml (next-sitemap):
  - [ ] Tüm sayfalar
  - [ ] Blog posts
  - [ ] Odalar
  - [ ] Çoklu dil URLs

### 4.4 Schema.org Structured Data
- [ ] Hotel Schema:
  - [ ] Name, description, image
  - [ ] Address, geo coordinates
  - [ ] Star rating, price range
  - [ ] Amenities
- [ ] LocalBusiness Schema
- [ ] Review/Rating Schema (Google reviews aggregate)
- [ ] FAQPage Schema
- [ ] BreadcrumbList Schema
- [ ] ImageObject Schema (galeri)

### 4.5 Performance Optimization
- [ ] Next.js Image optimization audit
- [ ] Lazy loading components
- [ ] Code splitting (dynamic imports)
- [ ] Font optimization (next/font)
- [ ] Bundle size analysis (next-bundle-analyzer)
- [ ] Core Web Vitals optimization:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
- [ ] Lighthouse CI setup

---

## 📊 FAZ 5: ANALYTICS & MARKETING (Hafta 9-10)

### 5.1 Analytics Setup
- [ ] Google Analytics 4:
  - [ ] Tracking ID ekle
  - [ ] Custom events (rezervasyon, ödeme)
  - [ ] E-commerce tracking
- [ ] Google Tag Manager:
  - [ ] Container kurulumu
  - [ ] Facebook Pixel
  - [ ] Instagram Pixel
- [ ] Vercel Analytics
- [ ] Hotjar (heatmaps, recordings)
- [ ] Cookie consent banner (KVKK/GDPR)

### 5.2 Search Console & SEO Tools
- [ ] Google Search Console:
  - [ ] Domain verify
  - [ ] Sitemap submit
  - [ ] Mobile usability check
- [ ] Google My Business:
  - [ ] Otel bilgileri güncelle
  - [ ] Fotoğraflar yükle
  - [ ] Reviews yönetimi
- [ ] Bing Webmaster Tools
- [ ] Baidu Webmaster (Çin pazarı için)

### 5.3 Social Media Integration
- [ ] Instagram feed widget (homepage)
- [ ] Facebook page plugin
- [ ] WhatsApp Business button (floating)
- [ ] Social share buttons (her sayfa)
- [ ] Open Graph images (auto-generate)

### 5.4 Email Marketing
- [ ] Newsletter signup form (footer)
- [ ] Welcome email serisi
- [ ] Abandoned booking email
- [ ] Post-stay email (review request)
- [ ] Mailchimp veya Resend integration

### 5.5 Conversion Optimization
- [ ] A/B testing setup (Vercel A/B Testing)
- [ ] Exit-intent popup (özel teklifler)
- [ ] Urgency indicators ("Sadece 2 oda kaldı!")
- [ ] Trust badges (SSL, Airbnb Superhost)
- [ ] Live chat/Chatbot (Tawk.to veya Crisp)

---

## 🚀 FAZ 6: DEPLOY & LAUNCH (Hafta 10)

### 6.1 Production Setup
- [ ] Vercel projesi oluştur
- [ ] Environment variables tanımla:
  - [ ] Database URLs
  - [ ] API keys (iyzico, Airbnb, etc.)
  - [ ] Email credentials
  - [ ] Analytics IDs
- [ ] Custom domain bağla (anityacavehouse.com)
- [ ] SSL sertifikası (otomatik via Vercel)
- [ ] CDN konfigürasyonu

### 6.2 Testing & QA
- [ ] Cross-browser testing:
  - [ ] Chrome
  - [ ] Safari
  - [ ] Firefox
  - [ ] Edge
- [ ] Mobile testing:
  - [ ] iOS Safari
  - [ ] Android Chrome
  - [ ] Tablet görünümler
- [ ] Functionality testing:
  - [ ] Rezervasyon akışı (end-to-end)
  - [ ] Ödeme (test kartları)
  - [ ] Email notifications
  - [ ] Dil değişimi
- [ ] Accessibility audit (WCAG)
- [ ] Security audit

### 6.3 Monitoring & Backup
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Error tracking (Sentry)
- [ ] Database backups (otomatik)
- [ ] Log management
- [ ] Performance monitoring (Vercel Analytics)

### 6.4 Launch Checklist
- [ ] 301 redirects (eski site → yeni site)
- [ ] Google Analytics verify
- [ ] Search Console verify
- [ ] Test tüm formlar (contact, booking)
- [ ] Test tüm diller (TR/EN/ZH)
- [ ] Social media duyuruları
- [ ] Email listesine duyuru
- [ ] Press release (opsiyonel)

---

## 🔄 FAZ 7: POST-LAUNCH (Devam Eden)

### 7.1 İçerik Genişletme
- [ ] Ayda 4 yeni blog yazısı
- [ ] Seasonal content (bayram, yaz/kış)
- [ ] Guest blog posts (backlink)
- [ ] Video content (YouTube)
- [ ] Instagram Reels

### 7.2 SEO Geliştirme
- [ ] Keyword ranking takibi
- [ ] Backlink building stratejisi
- [ ] Competitor analysis
- [ ] On-page SEO iyileştirmeleri
- [ ] Technical SEO audits (aylık)

### 7.3 Marketing Campaigns
- [ ] Google Hotel Ads campaign
- [ ] Meta Ads (Facebook/Instagram)
- [ ] Google Search Ads (brand protection)
- [ ] Influencer partnerships
- [ ] TripAdvisor optimization

### 7.4 Feature Additions
- [ ] Loyalty program
- [ ] Gift cards/vouchers
- [ ] Package deals (balon + konaklama)
- [ ] Virtual concierge (WhatsApp bot)
- [ ] Mobile app (opsiyonel)

---

## 📋 TEKNIK REQ & DEPENDENCIES

### Core
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "typescript": "^5.4.0",
  "tailwindcss": "^3.4.0"
}
```

### UI
- shadcn/ui
- framer-motion
- swiper (slider)
- react-photo-album (gallery)
- yet-another-react-lightbox

### Forms & Validation
- react-hook-form
- zod
- date-fns veya dayjs

### Database & ORM
- @prisma/client
- @supabase/supabase-js (opsiyonel)

### Auth
- next-auth

### Payment
- iyzico (API)
- stripe (opsiyonel, yurtdışı)

### Localization
- next-intl

### Email
- @react-email/components
- resend veya nodemailer

### Analytics
- @vercel/analytics
- react-ga4

### SEO
- next-sitemap
- next-seo (opsiyonel)

### Development
- eslint
- prettier
- husky (git hooks)

---

## 🎨 DESIGN TOKENS

### Colors (Önerilen - değiştirilebilir)
```css
--primary: #8B7355 (toprak/mağara)
--secondary: #D4A574 (altın)
--accent: #E8D7C3 (kum)
--dark: #2C2416
--light: #F9F7F4
```

### Typography
- Headings: Playfair Display veya Cormorant
- Body: Inter veya Poppins
- Accent: Montserrat

---

## 📞 KEY CONTACTS & CREDENTIALS

- **iyzico:** [Hesap açılacak]
- **Airbnb iCal URLs:** [3 adet URL]
- **Domain:** anityacavehouse.com
- **Email:** info@anityacavehouse.com
- **Hosting:** Vercel
- **Database:** Supabase

---

## 🏁 SUCCESS METRICS

### Launch Targets (İlk 3 Ay)
- [ ] Google ilk sayfa (10 anahtar kelime)
- [ ] 1000+ aylık ziyaretçi
- [ ] %3+ conversion rate (booking/visit)
- [ ] <2s sayfa yükleme süresi
- [ ] 90+ Lighthouse score
- [ ] 50+ direct bookings/ay

### SEO Targets (6 Ay)
- [ ] "kapadokya mağara otel" → Top 3
- [ ] "cappadocia cave hotel" → Top 5
- [ ] Domain Authority 30+
- [ ] 100+ backlinks
- [ ] Featured snippets (3+)

---

**Last Updated:** 3 Şubat 2026
**Project Status:** Planning → Development → Testing → Launch → Optimization

**Not:** Bu liste canlı bir dokümandır. İlerledikçe güncellenecektir.
