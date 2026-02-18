# Anitya Cave House - Official Website

Modern, çok dilli (TR/EN/ZH) Next.js 15 tabanlı Kapadokya mağara otel web sitesi.

## 🏗️ Teknoloji Stack

- **Framework:** Next.js 15 (App Router, React Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + Shadcn/ui
- **Animations:** Framer Motion
- **Internationalization:** next-intl (Türkçe, İngilizce, Çince)
- **Forms:** React Hook Form + Zod
- **Database:** PostgreSQL + Prisma ORM
- **Payment:** iyzico (TR), Stripe (International)
- **Booking:** Airbnb iCal Integration
- **Deployment:** Vercel

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js >= 20.9.0
- npm veya yarn
- PostgreSQL (production için)

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Environment variables ayarla
cp .env.example .env.local
# .env.local dosyasını düzenle

# Development sunucusunu başlat
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini aç.

## 📁 Proje Yapısı

```
anityacavehouse/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Çoklu dil route'ları
│   │   │   ├── page.tsx       # Ana sayfa
│   │   │   ├── rooms/         # Odalar
│   │   │   ├── booking/       # Rezervasyon
│   │   │   ├── gallery/       # Galeri
│   │   │   ├── blog/          # Blog
│   │   │   └── contact/       # İletişim
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # Shadcn components
│   │   ├── layout/            # Layout components
│   │   └── sections/          # Homepage sections
│   ├── i18n/                  # i18n konfigürasyonu
│   ├── lib/                   # Utilities
│   └── middleware.ts          # i18n middleware
├── messages/                  # Translation dosyaları
│   ├── tr.json
│   ├── en.json
│   └── zh.json
├── public/                    # Static assets
├── prisma/                    # Database schema
└── anitya_old_website_files/  # Eski site içerikleri (referans)
```

## 🌍 Çoklu Dil Desteği

Site 3 dilde desteklenmektedir:

- 🇹🇷 Türkçe (varsayılan): `/tr/*`
- 🇬🇧 İngilizce: `/en/*`
- 🇨🇳 Çince: `/zh/*`

Translation dosyaları `messages/` klasöründe bulunur.

## 🎨 Shadcn/ui Componentleri

Temel UI componentlerini eklemek için:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add calendar
# ... daha fazlası
```

## 📅 Airbnb Entegrasyonu

3 ayrı Airbnb takvimi iCal formatında senkronize edilir:

1. Oda 1: `AIRBNB_CALENDAR_1_URL`
2. Oda 2: `AIRBNB_CALENDAR_2_URL`
3. Oda 3: `AIRBNB_CALENDAR_3_URL`

Senkronizasyon her 15 dakikada bir otomatik olarak çalışır.

## 💳 Ödeme Sistemi

- **Yurt İçi (TR):** iyzico 3D Secure
- **Yurt Dışı:** Airbnb'ye yönlendirme veya Stripe

## 🔒 Güvenlik

- PCI-DSS Level 1 compliant (iyzico)
- SSL/TLS (Vercel otomatik)
- KVKK ve GDPR uyumlu
- Rate limiting
- Environment variables

## 📊 SEO Optimizasyonu

- Next.js Metadata API
- Dynamic sitemap.xml
- Schema.org JSON-LD
- hreflang tags (çoklu dil)
- Open Graph tags
- Core Web Vitals optimization

## 🧪 Komutlar

```bash
# Development
npm run dev

# Production build
npm run build

# Production başlat
npm run start

# Linting
npm run lint

# Prisma
npx prisma generate       # Generate client
npx prisma migrate dev    # Run migrations
npx prisma studio         # Database GUI
```

## 📝 TODO Listesi

Detaylı proje görevleri için [TODO.md](./TODO.md) dosyasına bakın.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'feat: Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

© 2026 Anitya Cave House. Tüm hakları saklıdır.

## 📞 İletişim

- **Website:** https://anityacavehouse.com
- **Email:** info@anityacavehouse.com
- **Airbnb:** [Anitya Cave House](https://www.airbnb.com/...)
- **Instagram:** [@anityacavehouse](https://instagram.com/anityacavehouse)

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [next-intl](https://next-intl.dev/)
- [Vercel](https://vercel.com/)

---

**Proje Durumu:** 🚧 Geliştirme Aşamasında

**Son Güncelleme:** 3 Şubat 2026
