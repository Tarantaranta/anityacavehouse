# 🏨 ANITYA CAVE HOUSE CHATBOT RULES & ANTI-SPAM
**Kapsamlı Chatbot Kuralları ve Spam Koruması**

---

## 📋 İÇİNDEKİLER

1. [Site Konfigürasyonu](#1-site-konfigürasyonu)
2. [Kapsam ve Sınırlama Kuralları](#2-kapsam-ve-sınırlama-kuralları)
3. [Bilgi Kaynakları](#3-bilgi-kaynakları)
4. [Yanıt Verme Kuralları](#4-yanıt-verme-kuralları)
5. [Spam ve Kötüye Kullanım Koruması](#5-spam-ve-kötüye-kullanım-koruması)
6. [Implementation Guide](#6-implementation-guide)
7. [Test Senaryoları](#7-test-senaryoları)

---

## 1. SİTE KONFIGÜRASYONU

### Temel Bilgiler
```typescript
const SITE_CONFIG = {
  name: "Anitya Cave House",
  topic: "Kapadokya'da butik mağara otel, konaklama, geziler ve bölgesel aktiviteler",
  company: "Anitya Cave House",
  location: "Ortahisar, Kapadokya, Türkiye",

  scopeExamples: [
    "Suite'ler ve oda tipleri",
    "Fiyatlar ve rezervasyon",
    "Kapadokya gezi planları (kişiselleştirilmiş)",
    "Bölgedeki aktiviteler (balon turu, ATV, at safari, vadi yürüyüşleri)",
    "Restoran ve yemek önerileri",
    "Ulaşım ve transfer hizmetleri",
    "Kapadokya tarihi ve kültürü",
    "Yerel turlar (Kızıl Tur, Yeşil Tur, Mavi Tur)",
    "Otelin tesisleri (teras, kahvaltı, mutfak)",
    "Check-in/out saatleri ve politikalar"
  ],

  outOfScopeExamples: [
    "Güncel haberler, siyaset, spor",
    "Döviz kurları, borsa",
    "Genel bilgi soruları (ünlü kişiler, matematik, bilim)",
    "Yaratıcı içerik üretme (şiir, hikaye, makale)",
    "Programlama, teknoloji",
    "Türkiye'nin başka bölgeleri (İstanbul, Antalya vb. - sadece ulaşım bağlamı dışında)",
    "Günlük sohbet, eğlence"
  ]
};
```

---

## 2. KAPSAM VE SINIRLAMA KURALLARI

### ✅ SADECE CEVAPLA

#### Kategori 1: Otel ve Konaklama
- Suite özellikleri, kapasiteler, fiyatlar
- Rezervasyon süreci ve şartlar
- Otel tesisleri (teras, mutfak, kahvaltı)
- Check-in/out saatleri
- İptal politikaları
- Özel istekler (balayı, doğum günü)

#### Kategori 2: Kapadokya Gezileri ve Aktiviteler
- Kişiselleştirilmiş gezi planı oluşturma (2-7 gün)
- Balon turları (şirketler, fiyatlar, süreç)
- Vadiler (Güvercinlik, Aşk, Kılıçlar, Kızıl, Pasabag)
- Müzeler (Göreme Açık Hava Müzesi, yeraltı şehirleri)
- ATV, at safari, bisiklet turları
- Tur rotaları (Kızıl, Yeşil, Mavi Tur)

#### Kategori 3: Yemek ve İçecek
- Yakın restoranlar (Seten, Dibek, Nazar Börek)
- Yerel mutfak önerileri (Testi Kebabı, Pottery Kebab)
- Kahvaltı seçenekleri
- Şarap mahzenleri (Turasan, Kocabağ)

#### Kategori 4: Ulaşım
- Havaalanı transferi (Kayseri, Nevşehir)
- Araç kiralama önerileri
- Bölge içi ulaşım
- Otopark imkanları

#### Kategori 5: Bölgesel Bilgiler
- Kapadokya tarihi ve coğrafyası
- Tüf taşı ve jeolojik yapı
- Ortahisar kalesi
- Yerel kültür ve gelenekler

### ❌ CEVAPLAMA (Kibarca Reddet)

#### Standart Red Mesajları (Her seferinde varyasyon kullan)

**Versiyon 1:**
```
"Üzgünüm, ben Anitya Cave House'un asistanıyım ve sadece otelimiz ve Kapadokya gezileri hakkında yardımcı olabilirim. Suite'lerimiz, rezervasyon, gezi planları veya bölgedeki aktiviteler hakkında bir sorunuz varsa size yardımcı olmaktan memnuniyet duyarım."
```

**Versiyon 2:**
```
"Maalesef bu konuda size yardımcı olamam. Ben Kapadokya'da konaklama ve geziler konusunda bilgi veriyorum. Otelimiz veya bölgedeki deneyimler hakkında merak ettiğiniz bir şey varsa sorabilirsiniz."
```

**Versiyon 3:**
```
"Bu soru benim uzmanlık alanımın dışında. Size Anitya Cave House, suite'lerimiz, Kapadokya'daki aktiviteler ve kişiselleştirilmiş gezi planları konusunda yardımcı olabilirim."
```

#### Özel Durum Red Mesajları

**Başka bölge/şehir sorulduğunda:**
```
"Ben özellikle Kapadokya ve Ortahisar bölgesi konusunda uzmanım. İstanbul/Antalya/[diğer şehir] için genel bilgi veremem, ancak bu bölgelerden Kapadokya'ya nasıl ulaşabileceğiniz konusunda yardımcı olabilirim."
```

**Muhabbet/sohbet denemesi:**
```
"Size Kapadokya'daki deneyiminizi en iyi şekilde planlamanızda yardımcı olmak için buradayım. Gezi planı, aktiviteler veya otelimiz hakkında bir sorunuz var mı?"
```

**Yaratıcı içerik talebi:**
```
"Yaratıcı içerik üretemiyorum, ancak Kapadokya'da unutulmaz bir deneyim planlamanıza yardımcı olabilirim. Mesela sizin için kişiselleştirilmiş bir gezi planı oluşturabilirim."
```

---

## 3. BİLGİ KAYNAKLARI

### 3.1 Temel Bilgi Tabanı (Static - Hafızada)

Current implementation'daki `ANITYA_KNOWLEDGE` constant'ı kullan:
- Suite detayları (Anitya Cave, Şırahane Cave, Dublex Stone)
- Restoran listesi ve konumları
- Aktivite fiyatları ve programları
- Tur rotaları (Red/Green/Blue)
- Transfer bilgileri
- İletişim ve lokasyon

**Token Büyüklüğü:** ~15-20K tokens

### 3.2 Dynamic Sayfa Fetch (On-Demand)

Kullanıcı spesifik detay istediğinde:

**Mevcut Sayfalar:**
```typescript
const AVAILABLE_PAGES = [
  { url: "/tr", title: "Ana Sayfa (TR)" },
  { url: "/en", title: "Home (EN)" },
  { url: "/zh", title: "首页 (ZH)" },
  { url: "/tr/rooms", title: "Suite'ler" },
  { url: "/tr/gallery", title: "Galeri" },
  { url: "/tr/experiences", title: "Deneyimler" },
  { url: "/tr/about", title: "Hakkımızda" },
  { url: "/tr/contact", title: "İletişim" },
  { url: "/tr/blog", title: "Blog Ana Sayfa" },
  { url: "/tr/blog/kapadokyada-sicak-hava-balonu-pratik-her-sey", title: "Balon Rehberi" },
  { url: "/tr/blog/guvercin-vadisi-gun-batimi-yuruyus-rehberi", title: "Güvercinlik Vadisi Rehberi" },
  { url: "/tr/blog/kapadokya-mutfagi-testi-kebabindan-pottery-sofralar", title: "Kapadokya Mutfağı" },
  { url: "/tr/blog/tuf-tasinin-hikayesi-milyonlarca-yillik-bir-miras", title: "Tüf Taşı Hikayesi" },
  { url: "/tr/blog/ortahisar-da-sabah-tas-ve-isik", title: "Ortahisar Sabah Rehberi" },
  { url: "/tr/blog/teras-sabahlari-balonlar-ve-sessizlik", title: "Teras Sabahları" },
];
```

**Fetch Tetikleyicileri:**
- "X sayfasında ne yazıyor?"
- "Y makalesi hakkında detaylı bilgi"
- "Blog yazınızda Z hakkında ne diyorsunuz?"
- "Hakkımızda sayfanızı görebilir miyim?"

---

## 4. YANIT VERME KURALLARI

### 4.1 YAPIT KURALLARI

#### ✅ YAP:
1. **Doğal ve samimi** konuş (robot gibi değil)
2. **Kısa ve öz** yanıtlar ver (max 150 kelime, gezi planı hariç)
3. **Kaynağı belirt** ("Balon Rehberi makalemizde belirtildiği gibi...")
4. **Dil adaptasyonu** - Kullanıcının dilinde yanıt ver
5. **Çözüm odaklı** - Sadece bilgi değil, öneri de sun

#### ❌ YAPMA:
1. **Liste, emoji, ünlem işareti KULLANMA** (doğal cümleler)
2. **Teknik jargon kullanma** (herkesin anlayacağı dil)
3. **Reklam yapma** ("En iyi otel!", "Müthiş deneyim!")
4. **Kesin vaatler verme** ("Kesinlikle", "Garanti")
5. **Fazla detaya girme** (kullanıcı sormadıysa)

### 4.2 Yanıt Yapısı

```
[SORU ALGILA] → [KAPSAM KONTROL] → [BİLGİ TOPLA] → [YANIT OLUŞTURMa YANITI VER]
```

**Örnek Akış:**

```
Kullanıcı: "Balon turu ne kadar?"

1. Kapsam: ✅ (Aktiviteler kategorisi)
2. Bilgi: ANITYA_KNOWLEDGE → "balloon_tours" → prices
3. Yanıt: "Kapadokya'da balon turları genellikle 200-250€ arasında değişiyor.
          Standart turlar sabah 05:00-06:00 arası başlar ve yaklaşık 1 saat sürer.
          İsteğiniz olursa sizin için rezervasyon yapabiliriz."
```

### 4.3 Özel Senaryo: Gezi Planı Oluşturma

**Akış:**
1. 9 kişiselleştirme sorusu (mevcut sistem)
2. Her soruya göre plan oluştur
3. Plan'ı PDF olarak sun

**Token Kullanımı:** ~20 mesaj × 500 token = ~10K token (kabul edilebilir)

**Özel Kural:**
- Gezi planı oluşturma sırasında spam limitlerini esnet
- Session başına max 1 gezi planı (abuse önleme)
- Plan tamamlandıktan sonra "Yeni plan için sayfayı yenileyin" mesajı

---

## 5. SPAM VE KÖTÜYE KULLANIM KORUMASI

### 5.1 Rate Limiting Stratejisi

#### Seviye 1: IP-Based Rate Limiting (Basit)

```typescript
// Limits
const RATE_LIMITS = {
  // Genel kullanıcılar
  general: {
    messagesPerMinute: 10,      // Dakikada max 10 mesaj
    messagesPerHour: 100,        // Saatte max 100 mesaj
    messagesPerDay: 500,         // Günde max 500 mesaj
  },

  // Gezi planı aktif ise (session tracking)
  travelPlanMode: {
    messagesPerMinute: 5,        // Yavaşlat ama engellenme
    messagesPerSession: 25,      // Bir plan için max 25 mesaj
    plansPerDay: 2,              // Günde max 2 gezi planı
  },

  // Abuse detection sonrası
  restricted: {
    messagesPerMinute: 2,
    messagesPerHour: 20,
    messagesPerDay: 50,
  }
};
```

#### Seviye 2: Session-Based Tracking (Orta)

```typescript
interface ChatSession {
  sessionId: string;
  ip: string;
  fingerprint?: string;        // Browser fingerprint (optional)
  messageCount: number;
  travelPlansCreated: number;
  firstMessageAt: Date;
  lastMessageAt: Date;
  isInTravelPlanMode: boolean;
  abuseScore: number;          // 0-100, 100 = confirmed abuse
}

// Abuse score hesaplama
function calculateAbuseScore(session: ChatSession): number {
  let score = 0;

  // Aynı mesajı tekrar tekrar gönderme
  if (hasDuplicateMessages(session)) score += 20;

  // Çok hızlı mesajlaşma (bot benzeri)
  if (averageTimeBetweenMessages(session) < 2000) score += 30; // 2 saniyeden hızlı

  // Kapsam dışı soru oranı yüksek
  if (outOfScopeRatio(session) > 0.5) score += 15;

  // Gezi planı başlatıp bırakma (resource waste)
  if (incompleteTravelPlans(session) > 2) score += 25;

  // Random/nonsense mesajlar
  if (hasGibberishMessages(session)) score += 30;

  return Math.min(score, 100);
}
```

#### Seviye 3: Redis-Based Distributed Rate Limiting (Production)

```typescript
// Redis keys
const REDIS_KEYS = {
  messageCount: (ip: string, timeWindow: string) =>
    `ratelimit:${ip}:${timeWindow}`,

  travelPlanCount: (ip: string) =>
    `travelplan:${ip}:${getTodayKey()}`,

  abuseScore: (ip: string) =>
    `abuse:${ip}`,

  blacklist: (ip: string) =>
    `blacklist:${ip}`,
};

// Implementation
async function checkRateLimit(ip: string, redis: Redis): Promise<boolean> {
  const minute = await redis.incr(REDIS_KEYS.messageCount(ip, 'minute'));
  await redis.expire(REDIS_KEYS.messageCount(ip, 'minute'), 60);

  if (minute > RATE_LIMITS.general.messagesPerMinute) {
    return false; // Rate limit exceeded
  }

  const hour = await redis.incr(REDIS_KEYS.messageCount(ip, 'hour'));
  await redis.expire(REDIS_KEYS.messageCount(ip, 'hour'), 3600);

  if (hour > RATE_LIMITS.general.messagesPerHour) {
    return false;
  }

  return true;
}
```

### 5.2 Gezi Planı İçin Özel Koruma

```typescript
interface TravelPlanSession {
  sessionId: string;
  ip: string;
  questionsAnswered: number;   // 9 sorudan kaçı cevaplanmış
  planGenerated: boolean;       // Plan oluşturuldu mu?
  startedAt: Date;
  completedAt?: Date;
  messagesDuringPlan: number;
}

async function handleTravelPlanMessage(
  session: TravelPlanSession,
  message: string
): Promise<{ allowed: boolean; reason?: string }> {

  // Max mesaj kontrolü
  if (session.messagesDuringPlan >= 25) {
    return {
      allowed: false,
      reason: "Gezi planı oluşturma için maksimum mesaj sayısına ulaştınız. Lütfen sayfayı yenileyerek yeni bir plan başlatın."
    };
  }

  // Timeout kontrolü (30 dakika)
  const elapsed = Date.now() - session.startedAt.getTime();
  if (elapsed > 30 * 60 * 1000) {
    return {
      allowed: false,
      reason: "Gezi planı oturumunuz zaman aşımına uğradı. Lütfen sayfayı yenileyerek yeni bir plan başlatın."
    };
  }

  // Günlük plan limiti
  const plansToday = await getPlansCreatedToday(session.ip);
  if (plansToday >= 2 && !session.planGenerated) {
    return {
      allowed: false,
      reason: "Bugün için maksimum gezi planı sayısına ulaştınız (2 plan). Yarın tekrar deneyebilirsiniz."
    };
  }

  return { allowed: true };
}
```

### 5.3 CAPTCHA Entegrasyonu

```typescript
// Trigger CAPTCHA if:
const CAPTCHA_TRIGGERS = {
  messagesPerMinute: 8,         // Dakikada 8 mesajdan fazla
  abuseScore: 40,               // Abuse score 40'ın üstünde
  suspiciousPattern: true,      // Şüpheli pattern tespit edildi
  travelPlanAttempts: 2,        // 2. gezi planı denemesinde
};

// Google reCAPTCHA v3
async function verifyCaptcha(token: string): Promise<boolean> {
  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
    }
  );

  const data = await response.json();
  return data.success && data.score > 0.5; // 0.5+ = human
}
```

### 5.4 Honeypot ve Bot Detection

```typescript
// Frontend honeypot (invisible field)
<input
  type="text"
  name="website"
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>

// Backend check
if (req.body.website) {
  // Bot detected (humans won't fill this)
  await blacklistIP(clientIP);
  return res.status(403).json({ error: 'Forbidden' });
}

// Timing analysis (bots are too fast)
const timeSincePageLoad = Date.now() - req.body.pageLoadTime;
if (timeSincePageLoad < 3000) {
  // Too fast, likely bot
  abuseScore += 30;
}
```

### 5.5 User Feedback Error Messages

```typescript
const ERROR_MESSAGES = {
  rateLimitMinute: {
    tr: "Çok hızlı mesaj gönderiyorsunuz. Lütfen birkaç saniye bekleyip tekrar deneyin.",
    en: "You're sending messages too quickly. Please wait a few seconds and try again.",
    zh: "您发送消息的速度太快了。请稍等几秒钟后再试。"
  },

  rateLimitHour: {
    tr: "Saatlik mesaj limitinize ulaştınız. Lütfen bir süre sonra tekrar deneyin.",
    en: "You've reached your hourly message limit. Please try again later.",
    zh: "您已达到每小时消息限制。请稍后再试。"
  },

  rateLimitDay: {
    tr: "Günlük mesaj limitinize ulaştınız. Yarın tekrar hoş geldiniz!",
    en: "You've reached your daily message limit. Come back tomorrow!",
    zh: "您已达到每日消息限制。明天再来吧！"
  },

  travelPlanLimit: {
    tr: "Bugün için maksimum gezi planı sayısına ulaştınız (2 plan). Yarın yeni bir plan oluşturabilirsiniz.",
    en: "You've reached the maximum number of travel plans for today (2 plans). You can create a new plan tomorrow.",
    zh: "您已达到今天的最大旅行计划数（2个计划）。明天可以创建新计划。"
  },

  suspiciousActivity: {
    tr: "Şüpheli aktivite tespit edildi. Lütfen robot olmadığınızı doğrulayın.",
    en: "Suspicious activity detected. Please verify you're not a robot.",
    zh: "检测到可疑活动。请验证您不是机器人。"
  }
};
```

---

## 6. IMPLEMENTATION GUIDE

### 6.1 Dosya Yapısı

```
src/
├── app/
│   └── api/
│       ├── chat/
│       │   ├── route.ts              # Ana chat endpoint
│       │   ├── ratelimit.ts          # Rate limiting logic
│       │   └── spam-detection.ts     # Spam detection
│       └── chat-session/
│           ├── start/route.ts        # Session başlatma
│           └── validate/route.ts     # Session validation
├── lib/
│   ├── redis.ts                      # Redis client
│   ├── chatbot-rules.ts              # Bu dosyadaki kurallar
│   └── abuse-detection.ts            # Abuse detection utils
└── components/
    └── chat/
        ├── ChatBot.tsx               # Mevcut component
        ├── RateLimitWarning.tsx      # Rate limit uyarısı
        └── CaptchaModal.tsx          # CAPTCHA modal
```

### 6.2 Environment Variables

```bash
# .env.local
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o

# Redis (Upstash or local)
REDIS_URL=redis://localhost:6379
REDIS_TOKEN=...

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET=6Lc...

# Rate Limiting
ENABLE_RATE_LIMITING=true
ENABLE_CAPTCHA=true
ENABLE_ABUSE_DETECTION=true

# Monitoring
SENTRY_DSN=https://...
```

### 6.3 Core Implementation

#### Step 1: Chat API with Rules (`src/app/api/chat/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { checkRateLimit, incrementMessageCount } from './ratelimit';
import { detectAbuse, updateAbuseScore } from './spam-detection';
import { ANITYA_CHATBOT_RULES } from '@/lib/chatbot-rules';

export async function POST(req: NextRequest) {
  const clientIP = req.headers.get('x-forwarded-for') || 'unknown';

  try {
    // 1. Rate Limit Check
    const rateLimitResult = await checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: rateLimitResult.message },
        { status: 429 }
      );
    }

    const { messages, sessionId, captchaToken } = await req.json();

    // 2. Abuse Detection
    const abuseResult = await detectAbuse(clientIP, messages);
    if (abuseResult.score > 60) {
      // Require CAPTCHA
      if (!captchaToken) {
        return NextResponse.json(
          { requireCaptcha: true },
          { status: 403 }
        );
      }

      const captchaValid = await verifyCaptcha(captchaToken);
      if (!captchaValid) {
        return NextResponse.json(
          { error: 'CAPTCHA doğrulaması başarısız' },
          { status: 403 }
        );
      }
    }

    // 3. OpenAI Call with Rules
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: ANITYA_CHATBOT_RULES.systemPrompt,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const assistantMessage = completion.choices[0].message;

    // 4. Update counters
    await incrementMessageCount(clientIP);
    await updateAbuseScore(clientIP, messages, assistantMessage);

    return NextResponse.json({
      message: assistantMessage.content,
      usage: completion.usage,
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Chat service error' },
      { status: 500 }
    );
  }
}
```

#### Step 2: Rate Limiting (`src/app/api/chat/ratelimit.ts`)

```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

interface RateLimitResult {
  allowed: boolean;
  message?: string;
  remaining?: number;
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  if (process.env.ENABLE_RATE_LIMITING !== 'true') {
    return { allowed: true };
  }

  // Check minute limit
  const minuteKey = `ratelimit:${ip}:minute:${getCurrentMinute()}`;
  const minuteCount = await redis.incr(minuteKey);
  await redis.expire(minuteKey, 60);

  if (minuteCount > 10) {
    return {
      allowed: false,
      message: 'Çok hızlı mesaj gönderiyorsunuz. Lütfen birkaç saniye bekleyin.',
    };
  }

  // Check hour limit
  const hourKey = `ratelimit:${ip}:hour:${getCurrentHour()}`;
  const hourCount = await redis.incr(hourKey);
  await redis.expire(hourKey, 3600);

  if (hourCount > 100) {
    return {
      allowed: false,
      message: 'Saatlik mesaj limitinize ulaştınız. Lütfen daha sonra tekrar deneyin.',
    };
  }

  // Check travel plan limit
  const planKey = `travelplan:${ip}:${getTodayKey()}`;
  const planCount = await redis.get(planKey) || 0;

  if (planCount >= 2) {
    // Allow continued conversation but warn
    return {
      allowed: true,
      remaining: 0,
    };
  }

  return { allowed: true, remaining: 100 - hourCount };
}

export async function incrementMessageCount(ip: string): Promise<void> {
  const key = `messages:${ip}:${getTodayKey()}`;
  await redis.incr(key);
  await redis.expire(key, 86400); // 24 hours
}

// Helper functions
function getCurrentMinute(): string {
  return Math.floor(Date.now() / 60000).toString();
}

function getCurrentHour(): string {
  return Math.floor(Date.now() / 3600000).toString();
}

function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}
```

#### Step 3: Spam Detection (`src/app/api/chat/spam-detection.ts`)

```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

interface AbuseResult {
  score: number;
  reasons: string[];
}

export async function detectAbuse(
  ip: string,
  messages: any[]
): Promise<AbuseResult> {
  if (process.env.ENABLE_ABUSE_DETECTION !== 'true') {
    return { score: 0, reasons: [] };
  }

  let score = 0;
  const reasons: string[] = [];

  // 1. Check for duplicate messages
  const lastMessages = messages.slice(-5);
  const uniqueMessages = new Set(lastMessages.map(m => m.content));
  if (uniqueMessages.size < lastMessages.length / 2) {
    score += 25;
    reasons.push('Duplicate messages detected');
  }

  // 2. Check for gibberish
  const lastUserMessage = messages[messages.length - 1]?.content || '';
  if (isGibberish(lastUserMessage)) {
    score += 30;
    reasons.push('Gibberish content');
  }

  // 3. Check message frequency
  const recentMessageCount = await redis.get(`ratelimit:${ip}:minute:${getCurrentMinute()}`);
  if (recentMessageCount && recentMessageCount > 8) {
    score += 20;
    reasons.push('High frequency messaging');
  }

  // 4. Check out-of-scope ratio
  const outOfScopeKey = `outofscope:${ip}`;
  const outOfScopeCount = await redis.get(outOfScopeKey) || 0;
  const totalCount = await redis.get(`messages:${ip}:${getTodayKey()}`) || 1;

  if (outOfScopeCount / totalCount > 0.6) {
    score += 15;
    reasons.push('High out-of-scope ratio');
  }

  // Store score
  await redis.set(`abuse:${ip}`, score, { ex: 3600 });

  return { score, reasons };
}

export async function updateAbuseScore(
  ip: string,
  messages: any[],
  response: any
): Promise<void> {
  // Track if response was out-of-scope
  const responseContent = response.content || '';

  if (
    responseContent.includes('Üzgünüm') &&
    responseContent.includes('yardımcı olamam')
  ) {
    // Out-of-scope response
    const key = `outofscope:${ip}`;
    await redis.incr(key);
    await redis.expire(key, 86400);
  }
}

// Helper function
function isGibberish(text: string): boolean {
  // Very basic gibberish detection
  const words = text.split(/\s+/);
  if (words.length < 2) return false;

  const vowelRatio = (text.match(/[aeiouöüı]/gi) || []).length / text.length;
  if (vowelRatio < 0.2 || vowelRatio > 0.8) return true;

  // Check for repeated characters
  if (/(.)\1{4,}/.test(text)) return true;

  return false;
}

function getCurrentMinute(): string {
  return Math.floor(Date.now() / 60000).toString();
}

function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}
```

#### Step 4: Chatbot Rules (`src/lib/chatbot-rules.ts`)

```typescript
export const ANITYA_CHATBOT_RULES = {
  systemPrompt: `
Sen Anitya Cave House'un asistanısın.

## KAPSAM VE SINIRLAMA - KRİTİK KURALLAR

### SADECE CEVAPLA:
- Kapadokya'da konaklama, suite'ler ve otelle ilgili sorular
- Anitya Cave House hakkında sorular
- Kapadokya gezi planları, aktiviteler, turlar
- Bölgedeki restoranlar, ulaşım, transfer
- Balon turu, ATV, at safari, vadi yürüyüşleri
- Yerel kültür, tarih, Ortahisar kalesi
- Rezervasyon, fiyatlar, check-in/out

### CEVAPLAMA (Kibarca reddet ve yönlendir):
- Genel bilgi soruları (ünlü kişiler, tarih, bilim, matematik)
- Güncel haberler, döviz kurları, borsa, spor
- Yaratıcı içerik üretme (şiir, hikaye, makale)
- Programlama, teknoloji
- Türkiye'nin başka bölgeleri (sadece ulaşım bağlamı dışında)
- Günlük sohbet, eğlence, muhabbet

### KAPSAM DIŞI SORU GELDİĞİNDE:
Nazikçe şöyle yanıt ver (her seferinde biraz farklı ifade et):

"Üzgünüm, ben Anitya Cave House'un asistanıyım ve sadece otelimiz ve Kapadokya gezileri hakkında yardımcı olabilirim. Suite'lerimiz, rezervasyon, gezi planları veya bölgedeki aktiviteler hakkında bir sorunuz varsa size yardımcı olmaktan memnuniyet duyarım."

## YANIT VERME KURALLARI:

1. **Kısa ve öz** yanıtlar ver (max 150 kelime, gezi planı hariç)
2. **Liste, emoji, ünlem işareti KULLANMA** - doğal cümleler kullan
3. **Teknik terim kullanma** - herkesin anlayacağı dille konuş
4. **Reklam yapma, övme** - sadece bilgilendirici ol
5. **Kesin vaatler verme** - "garanti", "kesinlikle" gibi kelimeler kullanma
6. **Muhabbet yapma** - sadece konu hakkında yardımcı ol

## BİLGİ KAYNAKLARI:

Aşağıdaki bilgi bankasında tüm temel bilgiler var. Bu bilgileri kullanarak misafirlere yardımcı ol:

${ANITYA_KNOWLEDGE}

Kullanıcı spesifik bir sayfa hakkında detay istediğinde, temel bilgi yeterli değilse veya blog makalesi sorulduğunda fetch_page_content fonksiyonunu kullanabilirsin.
`,

  availablePages: [
    { url: "/tr", title: "Ana Sayfa (TR)" },
    { url: "/tr/rooms", title: "Suite'ler" },
    { url: "/tr/gallery", title: "Galeri" },
    { url: "/tr/experiences", title: "Deneyimler" },
    { url: "/tr/about", title: "Hakkımızda" },
    { url: "/tr/contact", title: "İletişim" },
    { url: "/tr/blog/kapadokyada-sicak-hava-balonu-pratik-her-sey", title: "Balon Rehberi" },
    { url: "/tr/blog/guvercin-vadisi-gun-batimi-yuruyus-rehberi", title: "Güvercinlik Vadisi" },
    { url: "/tr/blog/kapadokya-mutfagi-testi-kebabindan-pottery-sofralar", title: "Kapadokya Mutfağı" },
    // ... diğer sayfalar
  ],
};

// ANITYA_KNOWLEDGE'i mevcut route.ts'den import et
```

### 6.4 Frontend Integration (ChatBot.tsx)

```typescript
// src/components/chat/ChatBot.tsx

// Add to existing component
const [rateLimitWarning, setRateLimitWarning] = useState<string | null>(null);
const [showCaptcha, setShowCaptcha] = useState(false);
const [captchaToken, setCaptchaToken] = useState<string | null>(null);

// Modify sendMessage function
const sendMessage = async (content: string) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [...messages, { role: 'user', content }],
        sessionId,
        captchaToken,
      }),
    });

    if (response.status === 429) {
      const data = await response.json();
      setRateLimitWarning(data.error);
      return;
    }

    if (response.status === 403) {
      const data = await response.json();
      if (data.requireCaptcha) {
        setShowCaptcha(true);
        return;
      }
    }

    const data = await response.json();

    // ... rest of existing logic

  } catch (error) {
    console.error('Send message error:', error);
  }
};

// Add CAPTCHA modal component
{showCaptcha && (
  <CaptchaModal
    onVerify={(token) => {
      setCaptchaToken(token);
      setShowCaptcha(false);
      // Retry last message
    }}
    onCancel={() => setShowCaptcha(false)}
  />
)}

// Add rate limit warning
{rateLimitWarning && (
  <div className="rate-limit-warning">
    {rateLimitWarning}
  </div>
)}
```

---

## 7. TEST SENARYOLARI

### 7.1 Kapsam Testi

```typescript
// Test cases
const TEST_CASES = [
  {
    input: "Trump kaç yaşında?",
    expected: "Üzgünüm, ben Anitya Cave House'un asistanıyım...",
    category: "Out of scope - General knowledge"
  },
  {
    input: "Balon turu ne kadar?",
    expected: "Kapadokya'da balon turları genellikle 200-250€...",
    category: "In scope - Activity"
  },
  {
    input: "Bana bir şiir yaz",
    expected: "Üzgünüm, yaratıcı içerik üretemiyorum...",
    category: "Out of scope - Creative content"
  },
  {
    input: "Suite'leriniz hakkında bilgi verir misiniz?",
    expected: "[Suite detayları...]",
    category: "In scope - Accommodation"
  },
  {
    input: "Nasılsın?",
    expected: "Size Kapadokya'daki deneyiminizi...",
    category: "Out of scope - Small talk"
  },
  {
    input: "Göreme Açık Hava Müzesi hakkında bilgi",
    expected: "[Müze hakkında detaylı bilgi...]",
    category: "In scope - Attraction"
  },
];
```

### 7.2 Rate Limit Testi

```bash
# Dakika limiti testi (10 mesaj/dakika)
for i in {1..15}; do
  curl -X POST http://localhost:3000/api/chat \
    -H "Content-Type: application/json" \
    -H "X-Forwarded-For: 192.168.1.100" \
    -d '{"messages":[{"role":"user","content":"test"}]}'
  sleep 1
done

# Beklenen: 11. mesajdan sonra 429 hatası
```

### 7.3 Abuse Detection Testi

```typescript
// Duplicate message test
const duplicateTest = async () => {
  const messages = Array(10).fill({ role: 'user', content: 'test test test' });
  // Expected: Abuse score increase, possibly CAPTCHA
};

// Gibberish test
const gibberishTest = async () => {
  const gibberish = 'asdfkjh qweklrjh zxcmvn';
  // Expected: Abuse score increase
};

// High frequency test
const highFrequencyTest = async () => {
  for (let i = 0; i < 20; i++) {
    await sendMessage(`message ${i}`);
    await sleep(500); // 500ms = very fast
  }
  // Expected: Abuse score increase, rate limit
};
```

### 7.4 Travel Plan Limit Testi

```typescript
// Create 3 travel plans in a day
const travelPlanLimitTest = async () => {
  // Plan 1 - Should succeed
  await createTravelPlan();

  // Plan 2 - Should succeed
  await createTravelPlan();

  // Plan 3 - Should fail with limit error
  const result = await createTravelPlan();
  // Expected: "Bugün için maksimum gezi planı sayısına ulaştınız"
};
```

---

## 8. MONITORING VE ANALİZ

### 8.1 Metrics to Track

```typescript
// Redis'te saklanacak metriks
const METRICS = {
  totalMessages: 'metrics:total_messages',
  outOfScopeMessages: 'metrics:out_of_scope',
  travelPlansCreated: 'metrics:travel_plans',
  rateLimitHits: 'metrics:rate_limit_hits',
  captchaRequired: 'metrics:captcha_required',
  abuseDetected: 'metrics:abuse_detected',
  topQuestions: 'metrics:top_questions', // Sorted set
};

// Daily reporting
async function getDailyReport(): Promise<Report> {
  const today = getTodayKey();

  return {
    totalMessages: await redis.get(`${METRICS.totalMessages}:${today}`),
    outOfScope: await redis.get(`${METRICS.outOfScopeMessages}:${today}`),
    travelPlans: await redis.get(`${METRICS.travelPlansCreated}:${today}`),
    rateLimitHits: await redis.get(`${METRICS.rateLimitHits}:${today}`),
    topQuestions: await redis.zrange(`${METRICS.topQuestions}:${today}`, 0, 10, {
      rev: true,
      withScores: true,
    }),
  };
}
```

### 8.2 Logging

```typescript
// Winston logger
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/chat-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/chat-combined.log' }),
  ],
});

// Log important events
logger.info('Chat message', {
  ip: clientIP,
  messageLength: content.length,
  isInScope: true,
  responseTime: Date.now() - startTime,
});

logger.warn('Rate limit hit', {
  ip: clientIP,
  limit: 'minute',
  count: 15,
});

logger.error('Abuse detected', {
  ip: clientIP,
  score: 75,
  reasons: ['duplicate', 'high frequency'],
});
```

---

## 9. DEĞERLENDİRME VE İYİLEŞTİRME

### 9.1 Haftalık Review

**Kontrol Edilecekler:**
- [ ] Kapsam dışı soruları doğru tespit ediyor mu?
- [ ] Gezi planı oluşturma düzgün çalışıyor mu?
- [ ] Rate limit'ler çok sıkı mı, çok gevşek mi?
- [ ] Meşru kullanıcılar engellenmiş mi?
- [ ] Abuse detection yanlış pozitif veriyor mu?

### 9.2 İyileştirme Önerileri

**Kısa Vadeli (1 ay):**
1. A/B test farklı rate limit değerleri
2. CAPTCHA threshold'u optimize et
3. Out-of-scope detection accuracy'i artır
4. Kullanıcı geri bildirimlerini topla

**Orta Vadeli (3 ay):**
1. Machine learning ile abuse detection
2. Konuşma kalitesi analizi
3. Otomatik kural güncellemeleri
4. Multi-language spam detection

**Uzun Vadeli (6+ ay):**
1. Kişiselleştirilmiş limitler (returning users için)
2. Gelişmiş bot detection (ML-based)
3. Predictive abuse prevention
4. Real-time dashboard ve alerts

---

## 10. ÖZET: QUICK START CHECKLİST

### Deployment Öncesi

- [ ] `ANITYA_CHATBOT_RULES` system prompt güncellendi
- [ ] Rate limiting constants belirlendi
- [ ] Redis/Upstash kuruldu ve test edildi
- [ ] Environment variables ayarlandı
- [ ] CAPTCHA keys alındı (Google reCAPTCHA)
- [ ] Abuse detection thresholds test edildi
- [ ] Frontend rate limit warnings eklendi
- [ ] Logging ve monitoring kuruldu
- [ ] Test scenarios çalıştırıldı

### İlk Gün Monitoring

- [ ] Rate limit hits sayısını kontrol et
- [ ] Abuse detection accuracy'i kontrol et
- [ ] CAPTCHA trigger rate'i kontrol et
- [ ] User complaints var mı?
- [ ] Performance impact ölçüldü mü?

---

## 11. KAYNAKLAR VE REFERANSLAR

- **OpenAI Function Calling:** https://platform.openai.com/docs/guides/function-calling
- **Upstash Redis:** https://upstash.com/docs/redis
- **Google reCAPTCHA:** https://www.google.com/recaptcha/admin
- **Rate Limiting Strategies:** https://cloud.google.com/architecture/rate-limiting-strategies-techniques
- **Bot Detection Best Practices:** https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks

---

**Son Güncelleme:** 2026-02-19
**Versiyon:** 1.0
**Maintainer:** Anitya Cave House Development Team
**License:** Proprietary
