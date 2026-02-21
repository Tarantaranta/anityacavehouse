# 🏗️ ANITYA CAVE HOUSE - SITE SPECIFICATIONS
**Gelecek Projelerde Kullanılacak Teknik Özellikler ve Implementasyonlar**

Son Güncelleme: 2026-02-21
Proje: Anitya Cave House (Next.js 15 + TypeScript)

---

## 📋 İÇİNDEKİLER

1. [Vercel Entegrasyonları](#1-vercel-entegrasyonları)
2. [Spam ve Rate Limiting Koruması](#2-spam-ve-rate-limiting-koruması)
3. [AI Chatbot Sistemi](#3-ai-chatbot-sistemi)
4. [Görsel Optimizasyonu](#4-görsel-optimizasyonu)
5. [Deployment Checklist](#5-deployment-checklist)
6. [Gelecek Projeler için Kopyalanacak Dosyalar](#6-gelecek-projeler-için-kopyalanacak-dosyalar)

---

## 1. VERCEL ENTEGRASYONLARI

### 1.1 Sentry (Hata Tracking) ✅

**Ne işe yarar:** Sitedeki hataları otomatik yakala ve bildirim gönder

**Kurulum:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Dosyalar:**
- `sentry.server.config.ts` - Server-side error tracking
- `sentry.edge.config.ts` - Edge runtime tracking
- `src/instrumentation.ts` - Server init
- `src/instrumentation-client.ts` - Client init
- `src/app/global-error.tsx` - Global error boundary

**Optimizasyonlar (Production):**
```typescript
// sentry.server.config.ts ve instrumentation-client.ts
Sentry.init({
  dsn: "YOUR_SENTRY_DSN",

  // Production'da %10, dev'de %100 tracking
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,

  // Environment tagging
  environment: process.env.NODE_ENV || 'development',

  // GDPR uyumlu - kişisel veri gönderme
  sendDefaultPii: false,

  // Gereksiz hatalar filtrelendi
  ignoreErrors: [
    'Non-Error promise rejection captured',
    'ResizeObserver loop limit exceeded',
    'cancelled',
    'Network request failed',
    'Load failed',
    'undefined is not an object (evaluating \'a.L\')', // Ad blockers
  ],
});
```

**next.config.ts entegrasyonu:**
```typescript
import { withSentryConfig } from '@sentry/nextjs';

export default withSentryConfig(nextConfig, {
  org: "your-org",
  project: "your-project",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  automaticVercelMonitors: true,

  webpack: {
    treeshake: {
      removeDebugLogging: true, // Bundle size küçült
    },
  },
});
```

**Free Tier:**
- 5,000 errors/month
- 10,000 performance traces/month
- Email alerts

---

### 1.2 Vercel Web Analytics ✅

**Ne işe yarar:** Kaç kişi geldi, nereden geldi, hangi sayfalara baktı (GDPR uyumlu)

**Kurulum:**
```bash
# Vercel Dashboard → Analytics → Enable
# Otomatik aktif (ekstra kurulum yok)
```

**Özellikler:**
- ✅ Unlimited pageviews
- ✅ Tamamen ücretsiz
- ✅ GDPR uyumlu (cookie yok)
- ✅ Real-time tracking

**Dashboard:** https://vercel.com/dashboard/analytics

---

### 1.3 Vercel Speed Insights (Opsiyonel) 🔄

**Ne işe yarar:** Site hızını ölçer (Core Web Vitals)

**Kurulum:**
```bash
npm install @vercel/speed-insights
```

**Entegrasyon:**
```typescript
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

**Free Tier:**
- 2,500 measurements/month
- Real User Monitoring (RUM)

---

## 2. SPAM VE RATE LIMITING KORUMASI

### 2.1 File-Based Rate Limiting ✅

**Özellikler:**
- ✅ Harici servis YOK (Redis, Upstash vs. gereksiz)
- ✅ Disk persistence (server restart'ta kaybolmaz)
- ✅ Sıfır maliyet
- ✅ Vercel uyumlu

**Dosya:** `src/app/api/chat/simple-ratelimit.ts`

**Limitler:**
```typescript
RATE_LIMITS = {
  messagesPerMinute: 10,      // Dakikada max 10 mesaj
  messagesPerHour: 100,        // Saatte max 100 mesaj
  travelPlansPerDay: 2,        // Günde max 2 gezi planı
  travelPlanMessages: 25,      // Bir plan için max 25 mesaj
}
```

**Nasıl Çalışır:**
```
1. Server Başlarken:
   └─ loadFromDisk() → .data/rate-limits.json'dan sayaçları yükle

2. Çalışırken:
   └─ Her 30 saniyede saveToDisk() → Sayaçları kaydet

3. Server Kapanırken:
   └─ SIGTERM/SIGINT → Son kez kaydet ve kapat
```

**Storage Lokasyonları:**
- Development: `.data/rate-limits.json` (local)
- Production (Vercel): `/tmp/rate-limits.json` (instance bazlı)

**Implementation:**
```typescript
// src/app/api/chat/simple-ratelimit.ts
import fs from 'fs/promises';
import path from 'path';

const STORAGE_DIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), '.data');
const STORAGE_FILE = path.join(STORAGE_DIR, 'rate-limits.json');

// Load on startup
loadFromDisk().catch(console.error);

// Auto-save every 30 seconds
setInterval(() => {
  saveToDisk().catch(console.error);
}, 30000);

// Save on graceful shutdown
process.on('SIGTERM', () => saveToDisk().then(() => process.exit(0)));
process.on('SIGINT', () => saveToDisk().then(() => process.exit(0)));

export function checkSimpleRateLimit(ip: string) {
  // Dakikada 10, saatte 100 mesaj kontrolü
  // Return: { allowed: boolean, message?: string }
}
```

**Chat API Entegrasyonu:**
```typescript
// src/app/api/chat/route.ts
import { checkSimpleRateLimit } from './simple-ratelimit';

export async function POST(req: NextRequest) {
  const clientIP = req.headers.get('x-forwarded-for') ||
                   req.headers.get('x-real-ip') ||
                   'unknown';

  const rateLimitResult = checkSimpleRateLimit(clientIP);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: rateLimitResult.message },
      { status: 429 }
    );
  }

  // ... normal chat işlemi
}
```

**Monitoring API:**
```typescript
// src/app/api/chat/stats/route.ts
import { getRateLimitStats } from '../simple-ratelimit';

export async function GET() {
  const stats = getRateLimitStats();

  return NextResponse.json({
    activeIPs: stats.totalIPs,
    travelPlansToday: stats.travelPlansToday,
    timestamp: new Date().toISOString(),
  });
}

// Usage: http://localhost:3000/api/chat/stats
```

**.gitignore:**
```gitignore
.data/
rate-limits.json
```

---

## 3. AI CHATBOT SİSTEMİ

### 3.1 OpenAI Entegrasyonu ✅

**Dosya:** `src/app/api/chat/route.ts`

**Token Limiti:**
```typescript
const completion = await openai.chat.completions.create({
  model: process.env.OPENAI_MODEL || 'gpt-4o',
  messages: [...],
  temperature: 0.7,
  max_tokens: 3000, // Gezi planları için yeterli (önceden 500'dü - YETERSİZ!)
});
```

**Neden 3000?**
- 500 token = ~375 kelime (1-2 günlük plan)
- 3000 token = ~2250 kelime (4-7 günlük detaylı plan) ✅

---

### 3.2 System Prompt Yapısı

**Temel Bileşenler:**
```typescript
const systemPrompt = `
Sen [SİTE_ADI]'nin asistanısın.

## KAPSAM VE SINIRLAMA - KRİTİK KURALLAR

### SADECE CEVAPLA:
- [SİTE_KONUSU] ile ilgili sorular
- [FİRMA/KİŞİ] hakkında sorular
- [KAPSAM_ÖRNEKLER]

### CEVAPLAMA (Kibarca reddet):
- Genel bilgi soruları
- Güncel haberler, döviz kurları
- Yaratıcı içerik (şiir, hikaye)
- [KAPSAM_DIŞI_ÖRNEKLER]

### KAPSAM DIŞI SORU GELDİĞİNDE:
"Üzgünüm, ben [SİTE]'nin asistanıyım ve sadece [KONU] hakkında yardımcı olabilirim."

---

## BİLGİ TABANI
\${KNOWLEDGE_BASE}

---

## YANIT KURALLARI:
1. Kısa ve öz (max 150 kelime, gezi planı hariç)
2. Liste, emoji, ünlem işareti KULLANMA
3. Teknik terim kullanma
4. Reklam yapma, övme
5. Kesin vaatler verme
`;
```

**Anitya Cave House Örneği:**
```typescript
// Tam implementation için bkz: src/app/api/chat/route.ts (lines 758-1004)

const ANITYA_KNOWLEDGE = `
# SUITE'LER
- Anitya Cave Suite: 2 kişi, teras, jacuzzi, 120€/gece
- Şırahane Cave Suite: 2 kişi, şarap mahzeni temalı, 110€/gece
- Dublex Stone Suite: 4 kişi, iki katlı, 140€/gece

# AKTIVITELER
- Balon Turu: 200-250€, sabah 05:00
- ATV Safari: 30€/kişi, 2 saat
- Vadiler: Güvercinlik, Aşk, Kılıçlar (ücretsiz yürüyüş)

# RESTORANLAR
- Seten Restaurant (10 dk): Testi Kebabı ⭐⭐⭐
- Dibek (15 dk): Pottery Kebab ⭐⭐⭐⭐
...
`;
```

---

### 3.3 Chatbot Frontend

**Dosya:** `src/components/chat/ChatBot.tsx`

**Özellikler:**
```typescript
// Gezi Planı Tespiti
function isTravelPlan(content: string): boolean {
  return (
    (content.includes('GÜN 1') || content.includes('Day 1') ||
     content.includes('第1天') || content.includes('═══ GÜN')) &&
    (content.includes('SABAH') || content.includes('Morning') ||
     content.includes('早上') || content.includes('KİŞİSEL'))
  );
}

// PDF Export
function generateTravelPlanPDF(content: string, language: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          .logo-wrapper { /* ARKA PLAN YOK (önceden #C8BEAF vardı) */ }
          /* ... PDF styles */
        </style>
      </head>
      <body>
        <div class="logo-wrapper">
          <img src="/images/header-logo.avif" />
        </div>
        ${content}
      </body>
    </html>
  `;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.print();
}
```

**Chat Kaydı (Email):**
```typescript
// src/app/api/chat/save/route.ts
// Konuşmaları email ile info@anityacavehouse.com'a gönder
// Nodemailer + Gmail SMTP kullanıyor
```

---

## 4. GÖRSEL OPTİMİZASYONU

### 4.1 Next.js Image Config ✅

**Dosya:** `next.config.ts`

```typescript
export default {
  images: {
    formats: ['image/avif', 'image/webp'],

    // Quality seviyeleri (DEĞİŞTİRİLDİ!)
    qualities: [75, 85, 90, 95, 100], // 100 eklendi

    localPatterns: [
      { pathname: '/images/**' }
    ],

    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.airbnb.com' },
    ],
  },
};
```

**Neden 100 eklendi?**
- Önceden maksimum 95'ti
- Hero section için quality={100} kullanıyoruz
- Mobilde keskin görünsün diye

---

### 4.2 Hero Image Optimizasyonu ✅

**Dosya:** `src/components/sections/HeroCinematic2026.tsx`

**Öncesi:**
```typescript
<Image
  src="/images/cappadocia-cave-house.avif"
  quality={95}  // DÜŞÜK
  sizes="100vw"  // GENERIC
/>
```

**Sonrası:**
```typescript
<Image
  src="/images/cappadocia-cave-house.avif"
  quality={100}  // MAKSIMUM KALITE
  sizes="(max-width: 768px) 100vw, (max-width: 1920px) 100vw, 2048px"  // RESPONSIVE
  priority  // LCP için öncelik
/>
```

**Kaynak Görsel:**
- Çözünürlük: 6480 x 2960 pixels (6K!)
- Dosya Boyutu: 529KB (AVIF compressed)
- Format: AVIF (modern, küçük boyut)

---

## 5. DEPLOYMENT CHECKLIST

### 5.1 Environment Variables (.env.local)

```bash
# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o

# Sentry
SENTRY_AUTH_TOKEN=sntrys_...
NEXT_PUBLIC_SENTRY_DSN=https://...

# Email (Chat kayıtları için)
EMAIL_USER=info@anityacavehouse.com
EMAIL_PASS=...

# Rate Limiting (opsiyonel, default'lar kullanılır)
ENABLE_RATE_LIMITING=true
RATE_LIMIT_PER_MINUTE=10
RATE_LIMIT_PER_HOUR=100
```

### 5.2 Vercel Dashboard Ayarları

```
1. Project Settings → Environment Variables
   └─ .env.local'deki tüm değişkenleri ekle

2. Analytics → Enable Web Analytics

3. Storage (İleride gerekirse):
   └─ Vercel KV veya Postgres oluştur

4. Cron Jobs (İleride gerekirse):
   └─ Rate limit cleanup için daily cron
```

### 5.3 Pre-Deployment Tests

```bash
# 1. Build test
npm run build

# 2. Sentry test
# http://localhost:3000/sentry-example-page

# 3. Chat test (spam koruması)
# 15 mesaj gönder, 11.den sonra bloklanmalı

# 4. Stats endpoint
# http://localhost:3000/api/chat/stats

# 5. Image quality kontrol
# Hero section mobilde net mi?
```

---

## 6. GELECEK PROJELER İÇİN KOPYALANACAK DOSYALAR

### 6.1 Doğrudan Kopyalanabilir Dosyalar

```
✅ src/app/api/chat/simple-ratelimit.ts
   └─ Rate limiting logic (değişiklik gerektirmez)

✅ src/app/api/chat/stats/route.ts
   └─ Monitoring API (değişiklik gerektirmez)

✅ sentry.server.config.ts
   └─ DSN değiştir

✅ src/instrumentation-client.ts
   └─ DSN değiştir

✅ sentry.edge.config.ts
   └─ DSN değiştir

✅ src/instrumentation.ts
   └─ Değişiklik gerektirmez

✅ src/app/global-error.tsx
   └─ Değişiklik gerektirmez
```

### 6.2 Özelleştirilmesi Gereken Dosyalar

```
🔧 src/app/api/chat/route.ts
   └─ KNOWLEDGE_BASE'i güncelle
   └─ System prompt'u özelleştir
   └─ Site adı, konu, kapsam değiştir

🔧 src/components/chat/ChatBot.tsx
   └─ PDF template'i özelleştir (logo, bilgiler)
   └─ Dil desteği ekle/çıkar

🔧 next.config.ts
   └─ Sentry org/project değiştir
   └─ Image remotePatterns ekle/çıkar

🔧 .gitignore
   └─ .data/ ekle (zaten var olabilir)
```

### 6.3 Package.json Dependencies

```json
{
  "dependencies": {
    "@sentry/nextjs": "^9.x",
    "@vercel/speed-insights": "^1.x",  // Opsiyonel
    "openai": "^4.x",
    "nodemailer": "^6.x"  // Email için
  }
}
```

---

## 7. GELECEK İYİLEŞTİRMELER (Opsiyonel)

### 7.1 İleride Eklenebilir

```
🔮 Vercel Cron Jobs
   └─ Rate limit cleanup (günlük)
   └─ Eski kayıtları temizle

🔮 Vercel Blob
   └─ Gezi planı PDF'lerini sakla
   └─ Chat transcripts yedekle

🔮 Cloudflare
   └─ CDN + DDoS koruması
   └─ Free SSL

🔮 Checkly
   └─ Uptime monitoring
   └─ Free tier: 5 checks

🔮 Machine Learning Spam Detection
   └─ Turso (serverless SQLite)
   └─ Abuse pattern learning
```

### 7.2 Şimdilik Gereksiz Olanlar

```
❌ Vercel KV / Redis
   └─ File-based yeterli (mevcut çözüm)

❌ Vercel Postgres
   └─ Chat için gereksiz (stateless)

❌ Session Replay (Sentry)
   └─ Privacy concerns + maliyet

❌ CAPTCHA
   └─ Rate limiting yeterli (şimdilik)
```

---

## 8. PERFORMANS METRIKLERI

### 8.1 Hedefler

```
Core Web Vitals:
- LCP (Largest Contentful Paint): <2.5s ✅
- FID (First Input Delay): <100ms ✅
- CLS (Cumulative Layout Shift): <0.1 ✅

Lighthouse Score:
- Performance: 90+ ✅
- Accessibility: 95+ ✅
- Best Practices: 95+ ✅
- SEO: 100 ✅
```

### 8.2 Optimizasyonlar Yapıldı

```
✅ Hero image: quality=100, responsive sizes
✅ AVIF format (6K resolution, 529KB)
✅ Priority loading (LCP için)
✅ Sentry bundle treeshaking
✅ Rate limiting (server load)
```

---

## 9. MALİYET HESABI (Free Tier)

```
Sentry:           $0 (5K errors/month)
Vercel Analytics: $0 (unlimited)
Speed Insights:   $0 (2.5K/month)
Rate Limiting:    $0 (file-based)
Vercel Hosting:   $0 (Hobby plan)
OpenAI:           $5-20/ay (kullanıma göre)

TOPLAM: ~$5-20/ay
```

---

## 10. SUPPORT ve DOKÜMANTASYON

### 10.1 Önemli Linkler

```
Sentry Dashboard:
https://sentry.io/organizations/anityacavehouse/

Vercel Dashboard:
https://vercel.com/dashboard

OpenAI Usage:
https://platform.openai.com/usage

Next.js Image Docs:
https://nextjs.org/docs/app/api-reference/components/image
```

### 10.2 Trouble Shooting

```
Problem: "Image quality not configured"
Çözüm: rm -rf .next && npm run dev

Problem: "Sentry not tracking errors"
Çözüm: Check DSN in config files

Problem: "Rate limit not persisting"
Çözüm: Check .data/ folder permissions

Problem: "Chat plan truncated"
Çözüm: max_tokens >= 3000 olmalı
```

---

## 11. ÖZET: YENİ PROJE İÇİN ADIMLAR

### 1️⃣ Hazırlık
```bash
npx create-next-app@latest my-project
cd my-project
```

### 2️⃣ Dependencies Yükle
```bash
npm install @sentry/nextjs openai nodemailer
npm install @vercel/speed-insights  # Opsiyonel
```

### 3️⃣ Dosyaları Kopyala
```bash
# Anitya Cave House'dan kopyala:
cp -r src/app/api/chat/simple-ratelimit.ts ./src/app/api/chat/
cp -r src/app/api/chat/stats ./src/app/api/chat/
cp sentry*.ts ./
cp src/instrumentation*.ts ./src/
cp src/app/global-error.tsx ./src/app/
```

### 4️⃣ Sentry Kur
```bash
npx @sentry/wizard@latest -i nextjs
# DSN'i güncelle
```

### 5️⃣ Özelleştir
```typescript
// src/app/api/chat/route.ts
const KNOWLEDGE_BASE = `
  [YENİ PROJENİN BİLGİLERİ]
`;

const systemPrompt = `
  Sen [YENİ SİTE]'nin asistanısın...
`;
```

### 6️⃣ Test ve Deploy
```bash
npm run build
npm run dev
# Test et
git push  # Vercel otomatik deploy
```

---

## 12. NOTLAR VE İPUÇLARI

```
💡 Rate limiting dosyası kalıcı olsun istersen:
   → Turso (serverless SQLite) kullan
   → Ama şimdilik file-based yeterli

💡 Çok fazla trafik gelirse (1000+ concurrent users):
   → Vercel KV'ye geç
   → Ya da Cloudflare Workers KV

💡 Chat log'larını saklamak istersen:
   → Vercel Blob kullan
   → Ya da Supabase (PostgreSQL)

💡 GDPR compliance için:
   → sendDefaultPii: false (Sentry)
   → Email kayıtlarında consent al
   → Cookie banner ekle

💡 Multi-language support için:
   → next-intl kullanılıyor (mevcut)
   → Chatbot system prompt'u dile göre değiştir
```

---

## 13. VERSION HISTORY

```
v1.0 (2026-02-21) - İlk versiyon
├─ Sentry entegrasyonu
├─ File-based rate limiting
├─ OpenAI chatbot (max_tokens: 3000)
├─ Hero image optimization (quality: 100)
├─ PDF export (logo background fixed)
└─ Vercel Analytics
```

---

**© 2026 Anitya Cave House - Technical Specifications**
Bu doküman gelecek projelerde template olarak kullanılabilir.
