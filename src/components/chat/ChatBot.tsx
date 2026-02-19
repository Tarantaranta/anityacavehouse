'use client';

import { useState, useRef, useEffect } from 'react';
import {
  X,
  MessageCircle,
  Send,
  Loader2,
  CalendarDays,
  Maximize2,
  Minimize2,
  MapPin,
  ExternalLink,
  AlertTriangle,
  ChevronUp,
  Sparkles,
  Download,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  role: 'user' | 'assistant';
  content: string;       // stripped text for display
  rawContent?: string;   // original with ---HIZLI_CEVAPLAR--- markers, for API history
  quickReplies?: string[];
}

interface Place {
  id: string;
  emoji: string;
  color: string; // Tailwind bg class for card accent
  name: string;
  category: { tr: string; en: string; zh: string };
  address: string;
  mapsQuery: string; // Google Maps search query
  keywords: string[]; // lowercase keywords to match in AI response
}

// ─── Places Database ──────────────────────────────────────────────────────────

const PLACES: Place[] = [
  // ── Restaurants & Cafes ───────────────────────────────────────────────────
  {
    id: 'narin',
    emoji: '🍽️',
    color: 'bg-amber-500',
    name: 'Narin Restaurant',
    category: { tr: 'Akşam Yemeği • ⭐ Birincil Tavsiye', en: 'Dinner • ⭐ Top Pick', zh: '晚餐 • ⭐ 首选推荐' },
    address: 'Ortahisar, Ürgüp, Nevşehir',
    mapsQuery: 'Narin Restaurant Ortahisar Cappadocia',
    keywords: ['narin', 'narin restaurant'],
  },
  {
    id: 'seten',
    emoji: '🫕',
    color: 'bg-orange-400',
    name: 'Seten Anatolian Cuisine',
    category: { tr: 'Restoran • ~150m (2 dk)', en: 'Restaurant • ~150m (2 min)', zh: '餐厅 • ~150m (2分钟)' },
    address: 'Ortahisar Köyü, Ürgüp',
    mapsQuery: 'Seten Anatolian Cuisine Ortahisar',
    keywords: ['seten', 'seten anatolian'],
  },
  {
    id: 'dibek',
    emoji: '🪔',
    color: 'bg-rose-500',
    name: 'Dibek Restaurant',
    category: { tr: 'Restoran • ~200m (2-3 dk)', en: 'Restaurant • ~200m (2-3 min)', zh: '餐厅 • ~200m (2-3分钟)' },
    address: 'Ortahisar, Ürgüp, Nevşehir',
    mapsQuery: 'Dibek Restaurant Ortahisar Cappadocia',
    keywords: ['dibek', 'dibek restaurant'],
  },
  {
    id: 'aravan',
    emoji: '☀️',
    color: 'bg-yellow-500',
    name: 'Aravan Evi Restaurant',
    category: { tr: 'Serpme Kahvaltı • ~450m (5 dk)', en: 'Turkish Breakfast • ~450m (5 min)', zh: '早餐 • ~450m (5分钟)' },
    address: 'Ortahisar Mahallesi, Ürgüp',
    mapsQuery: 'Aravan Evi Restaurant Ortahisar',
    keywords: ['aravan', 'aravan evi'],
  },
  {
    id: 'ziggys',
    emoji: '☕',
    color: 'bg-stone-500',
    name: "Ziggy's Shoppe & Cafe",
    category: { tr: 'Kafe • ~400m (5 dk)', en: 'Cafe • ~400m (5 min)', zh: '咖啡馆 • ~400m (5分钟)' },
    address: 'Ortahisar, Ürgüp, Nevşehir',
    mapsQuery: "Ziggy's Cafe Ortahisar Cappadocia",
    keywords: ["ziggy", "ziggy's", 'ziggys'],
  },
  {
    id: 'somine',
    emoji: '🌅',
    color: 'bg-purple-500',
    name: 'Şömine Cafe & Restaurant',
    category: { tr: 'Kafe & Restoran • ~500m (6-7 dk)', en: 'Cafe & Restaurant • ~500m (6-7 min)', zh: '咖啡馆餐厅 • ~500m (6-7分钟)' },
    address: 'Ortahisar Merkez, Ürgüp',
    mapsQuery: 'Somine Cafe Restaurant Ortahisar',
    keywords: ['şömine', 'somine', 'şomine'],
  },
  {
    id: 'hanciragan',
    emoji: '🏺',
    color: 'bg-teal-500',
    name: 'Han Çırağan Restaurant',
    category: { tr: 'Geleneksel Mutfak • ~600m (7-8 dk)', en: 'Traditional Kitchen • ~600m (7-8 min)', zh: '传统美食 • ~600m (7-8分钟)' },
    address: 'Ortahisar Merkez, Ürgüp',
    mapsQuery: 'Han Ciragan Restaurant Ortahisar',
    keywords: ['han çırağan', 'çırağan', 'han ciragan'],
  },
  {
    id: 'cappadociancuisine',
    emoji: '🫙',
    color: 'bg-green-600',
    name: 'Cappadocian Cuisine',
    category: { tr: 'Kapadokya Mutfağı • ~400m (5 dk)', en: 'Cappadocian Kitchen • ~400m (5 min)', zh: '卡帕多西亚美食 • ~400m (5分钟)' },
    address: 'Ortahisar, Ürgüp, Nevşehir',
    mapsQuery: 'Cappadocian Cuisine Ortahisar',
    keywords: ['cappadocian cuisine', 'cappadocian'],
  },

  // ── Local Services ────────────────────────────────────────────────────────
  {
    id: 'bim',
    emoji: '🛒',
    color: 'bg-red-500',
    name: 'BİM Market',
    category: { tr: 'Süpermarket • ~8-10 dk yürüyüş', en: 'Supermarket • ~8-10 min walk', zh: '超市 • ~8-10分钟步行' },
    address: 'Ortahisar Merkez, Ürgüp',
    mapsQuery: 'BIM Market Ortahisar Nevsehir',
    keywords: ['bim', 'bim market', 'market', 'süpermarket'],
  },

  // ── Ortahisar ─────────────────────────────────────────────────────────────
  {
    id: 'kale',
    emoji: '🏰',
    color: 'bg-slate-600',
    name: 'Ortahisar Kalesi',
    category: { tr: 'Tarihi Kale • ~2 dk yürüyüş • Ücretsiz Sunset', en: 'Historic Castle • ~2 min walk • Free Sunset View', zh: '历史古堡 • ~2分钟步行 • 免费日落观景' },
    address: 'Ortahisar Kalesi, Ürgüp, Nevşehir',
    mapsQuery: 'Ortahisar Castle Cappadocia',
    keywords: ['ortahisar kalesi', 'ortahisar castle', 'kale', 'castle'],
  },

  // ── Red Tour / Kızıl Tur ──────────────────────────────────────────────────
  {
    id: 'uchisar',
    emoji: '🏔️',
    color: 'bg-stone-600',
    name: 'Uçhisar Kalesi',
    category: { tr: 'Kızıl Tur • ~10 dk sürüş • €5 giriş', en: 'Red Tour • ~10 min drive • €5 entry', zh: '红色之旅 • ~10分钟车程 • 门票€5' },
    address: 'Uçhisar, Nevşehir',
    mapsQuery: 'Uchisar Castle Cappadocia',
    keywords: ['uçhisar', 'uchisar', 'uçhisar kalesi', 'uchisar castle'],
  },
  {
    id: 'goreme',
    emoji: '🗿',
    color: 'bg-amber-700',
    name: 'Göreme Açık Hava Müzesi',
    category: { tr: 'UNESCO • ~7 dk sürüş • €20 giriş', en: 'UNESCO Heritage • ~7 min drive • €20 entry', zh: 'UNESCO遗产 • ~7分钟车程 • 门票€20' },
    address: 'Göreme, Nevşehir',
    mapsQuery: 'Goreme Open Air Museum Cappadocia',
    keywords: ['göreme', 'goreme', 'açık hava müzesi', 'open air museum', 'göreme müzesi'],
  },
  {
    id: 'cavusin',
    emoji: '🏘️',
    color: 'bg-orange-600',
    name: 'Çavuşin Köyü & Kilisesi',
    category: { tr: 'Kızıl Tur • ~15 dk sürüş • Ücretsiz', en: 'Red Tour • ~15 min drive • Free', zh: '红色之旅 • ~15分钟车程 • 免费' },
    address: 'Çavuşin, Avanos, Nevşehir',
    mapsQuery: 'Cavusin Village Cappadocia',
    keywords: ['çavuşin', 'cavusin', 'çavuşin kilisesi'],
  },
  {
    id: 'pasabag',
    emoji: '🍄',
    color: 'bg-lime-600',
    name: 'Paşabağ / Keşişler Vadisi',
    category: { tr: 'Kızıl Tur • ~20 dk sürüş • €5 giriş', en: 'Red Tour • ~20 min drive • €5 entry', zh: '红色之旅 • ~20分钟车程 • 门票€5' },
    address: 'Paşabağ, Avanos, Nevşehir',
    mapsQuery: 'Pasabag Monks Valley Cappadocia',
    keywords: ['paşabağ', 'pasabag', 'peri bacaları', 'keşişler vadisi', 'monks valley', 'fairy chimneys'],
  },
  {
    id: 'zelve',
    emoji: '🏛️',
    color: 'bg-yellow-700',
    name: 'Zelve Açık Hava Müzesi',
    category: { tr: 'Kızıl Tur • ~25 dk sürüş • €15 giriş', en: 'Red Tour • ~25 min drive • €15 entry', zh: '红色之旅 • ~25分钟车程 • 门票€15' },
    address: 'Zelve, Avanos, Nevşehir',
    mapsQuery: 'Zelve Open Air Museum Cappadocia',
    keywords: ['zelve', 'zelve müzesi', 'zelve open air museum'],
  },
  {
    id: 'avanos',
    emoji: '🏺',
    color: 'bg-red-700',
    name: 'Avanos',
    category: { tr: 'Kızıl Tur • ~25 dk sürüş • Çömlekçilik', en: 'Red Tour • ~25 min drive • Pottery', zh: '红色之旅 • ~25分钟车程 • 陶艺' },
    address: 'Avanos, Nevşehir',
    mapsQuery: 'Avanos Pottery Town Cappadocia',
    keywords: ['avanos', 'çömlekçi', 'pottery', 'çömlek'],
  },
  {
    id: 'devrent',
    emoji: '🦒',
    color: 'bg-amber-600',
    name: 'Devrent Vadisi (Hayaller Vadisi)',
    category: { tr: 'Kızıl Tur • ~30 dk sürüş • Ücretsiz', en: 'Red Tour • ~30 min drive • Free', zh: '红色之旅 • ~30分钟车程 • 免费' },
    address: 'Devrent Valley, Avanos, Nevşehir',
    mapsQuery: 'Devrent Valley Imagination Valley Cappadocia',
    keywords: ['devrent', 'devrent vadisi', 'hayaller vadisi', 'imagination valley'],
  },
  {
    id: 'lovevalley',
    emoji: '❤️',
    color: 'bg-pink-500',
    name: 'Love Valley',
    category: { tr: 'Kızıl Tur • ~25 dk sürüş • Ücretsiz', en: 'Red Tour • ~25 min drive • Free', zh: '红色之旅 • ~25分钟车程 • 免费' },
    address: 'Love Valley, Göreme, Nevşehir',
    mapsQuery: 'Love Valley Cappadocia Goreme',
    keywords: ['love valley', 'aşk vadisi', 'love valley cappadocia'],
  },

  // ── Green Tour / Yeşil Tur ────────────────────────────────────────────────
  {
    id: 'derinkuyu',
    emoji: '⛏️',
    color: 'bg-neutral-700',
    name: 'Derinkuyu Yeraltı Şehri',
    category: { tr: 'Yeşil Tur • ~45 dk sürüş • €18 giriş', en: 'Green Tour • ~45 min drive • €18 entry', zh: '绿色之旅 • ~45分钟车程 • 门票€18' },
    address: 'Derinkuyu, Nevşehir',
    mapsQuery: 'Derinkuyu Underground City Cappadocia',
    keywords: ['derinkuyu', 'yeraltı şehri', 'underground city', 'derinkuyu yeraltı'],
  },
  {
    id: 'kaymakli',
    emoji: '🕳️',
    color: 'bg-zinc-600',
    name: 'Kaymaklı Yeraltı Şehri',
    category: { tr: 'Yeşil Tur • ~40 dk sürüş • €18 giriş', en: 'Green Tour • ~40 min drive • €18 entry', zh: '绿色之旅 • ~40分钟车程 • 门票€18' },
    address: 'Kaymaklı, Nevşehir',
    mapsQuery: 'Kaymakli Underground City Cappadocia',
    keywords: ['kaymaklı', 'kaymakli', 'kaymaklı yeraltı'],
  },
  {
    id: 'ihlara',
    emoji: '🌿',
    color: 'bg-emerald-600',
    name: 'Ihlara Vadisi',
    category: { tr: 'Yeşil Tur • ~1 saat sürüş • €10 giriş', en: 'Green Tour • ~1 hr drive • €10 entry', zh: '绿色之旅 • ~1小时车程 • 门票€10' },
    address: 'Ihlara, Aksaray',
    mapsQuery: 'Ihlara Valley Canyon Cappadocia',
    keywords: ['ihlara', 'ihlara vadisi', 'ihlara valley', 'ihlara canyon'],
  },
  {
    id: 'selime',
    emoji: '⛪',
    color: 'bg-sky-700',
    name: 'Selime Manastırı',
    category: { tr: 'Yeşil Tur • ~70 dk sürüş • €8 giriş', en: 'Green Tour • ~70 min drive • €8 entry', zh: '绿色之旅 • ~70分钟车程 • 门票€8' },
    address: 'Selime, Aksaray',
    mapsQuery: 'Selime Monastery Cappadocia',
    keywords: ['selime', 'selime manastırı', 'selime monastery'],
  },
  {
    id: 'pigeonvalley',
    emoji: '🕊️',
    color: 'bg-sky-500',
    name: 'Güvercinlik Vadisi (Pigeon Valley)',
    category: { tr: 'Yeşil Tur • ~10 dk sürüş • Ücretsiz', en: 'Green Tour • ~10 min drive • Free', zh: '绿色之旅 • ~10分钟车程 • 免费' },
    address: 'Pigeon Valley, Uçhisar, Nevşehir',
    mapsQuery: 'Pigeon Valley Uchisar Cappadocia',
    keywords: ['güvercinlik vadisi', 'pigeon valley', 'güvercinlik'],
  },

  // ── Blue Tour / Mavi Tur ──────────────────────────────────────────────────
  {
    id: 'threebeauties',
    emoji: '🌸',
    color: 'bg-rose-400',
    name: 'Üç Güzeller (Three Beauties)',
    category: { tr: 'Mavi Tur • ~8 dk sürüş • Ücretsiz', en: 'Blue Tour • ~8 min drive • Free', zh: '蓝色之旅 • ~8分钟车程 • 免费' },
    address: 'Ürgüp, Nevşehir',
    mapsQuery: 'Three Beauties Urgup Cappadocia',
    keywords: ['üç güzeller', 'three beauties', 'üç güzeller ürgüp'],
  },
  {
    id: 'rosevalley',
    emoji: '🌹',
    color: 'bg-pink-600',
    name: 'Gül Vadisi (Rose Valley)',
    category: { tr: 'Mavi Tur • ~5 dk sürüş • Sunset Noktası', en: 'Blue Tour • ~5 min drive • Best Sunset Spot', zh: '蓝色之旅 • ~5分钟车程 • 最佳日落地点' },
    address: 'Rose Valley, Çavuşin, Nevşehir',
    mapsQuery: 'Rose Valley Cappadocia sunset',
    keywords: ['gül vadisi', 'rose valley', 'gül vadisi kapadokya'],
  },
  {
    id: 'redvalley',
    emoji: '🔴',
    color: 'bg-red-600',
    name: 'Kızılçukur Vadisi (Red Valley)',
    category: { tr: 'Mavi Tur • ~5 dk sürüş • Sunset • Ücretsiz', en: 'Blue Tour • ~5 min drive • Sunset • Free', zh: '蓝色之旅 • ~5分钟车程 • 日落 • 免费' },
    address: 'Red Valley, Ortahisar, Nevşehir',
    mapsQuery: 'Red Valley Kizilcukur Cappadocia',
    keywords: ['kızılçukur', 'kizilcukur', 'red valley', 'kızılçukur vadisi'],
  },
  {
    id: 'mustafapasa',
    emoji: '🏘️',
    color: 'bg-indigo-500',
    name: 'Mustafapaşa (Sinasos)',
    category: { tr: 'Mavi Tur • ~15 dk sürüş • Osmanlı Köyü', en: 'Blue Tour • ~15 min drive • Ottoman Village', zh: '蓝色之旅 • ~15分钟车程 • 奥斯曼村庄' },
    address: 'Mustafapaşa, Ürgüp, Nevşehir',
    mapsQuery: 'Mustafapasa Sinasos Urgup Cappadocia',
    keywords: ['mustafapaşa', 'mustafapasa', 'sinasos'],
  },
  {
    id: 'soganli',
    emoji: '🏔️',
    color: 'bg-teal-700',
    name: 'Soğanlı Vadisi',
    category: { tr: 'Mavi Tur • ~50 dk sürüş • €8 giriş', en: 'Blue Tour • ~50 min drive • €8 entry', zh: '蓝色之旅 • ~50分钟车程 • 门票€8' },
    address: 'Soğanlı, Yeşilhisar, Kayseri',
    mapsQuery: 'Soganli Valley Cappadocia',
    keywords: ['soğanlı', 'soganli', 'soğanlı vadisi'],
  },
  {
    id: 'sobessos',
    emoji: '🏛️',
    color: 'bg-violet-600',
    name: 'Sobessos Antik Kenti',
    category: { tr: 'Mavi Tur • ~35 dk sürüş • Roman Mozaikler', en: 'Blue Tour • ~35 min drive • Roman Mosaics', zh: '蓝色之旅 • ~35分钟车程 • 罗马马赛克' },
    address: 'Sobessos, Şahinefendi, Nevşehir',
    mapsQuery: 'Sobessos Ancient City Cappadocia mosaics',
    keywords: ['sobessos', 'sobessos antik', 'sobessos mozaik'],
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

function detectPlaces(content: string): Place[] {
  const lower = content.toLowerCase();
  return PLACES.filter((p) =>
    p.keywords.some((kw) => lower.includes(kw))
  );
}

function hasBookingIntent(content: string): boolean {
  return /rezervasyon|\/booking|booking sayfas|check-in|check-out|müsaitlik|availability|suite.*book|book.*suite|预订|予約|oda.*rezerv|rezerv.*sayfas|anityacavehouse\.com.*booking/i.test(content);
}

/** Extracts ---HIZLI_CEVAPLAR: A | B | C--- markers and returns clean text + reply options */
function parseQuickReplies(raw: string): { text: string; replies: string[] } {
  const match = raw.match(/---HIZLI_CEVAPLAR:\s*([^\n]+?)---/);
  if (match) {
    const replies = match[1].split('|').map((r) => r.trim()).filter(Boolean);
    const text = raw.replace(/\s*---HIZLI_CEVAPLAR:[^\n]+?---\s*/g, '').trim();
    return { text, replies };
  }
  return { text: raw, replies: [] };
}

// ─── Travel Plan Detection ─────────────────────────────────────────────────────

function isTravelPlan(content: string): boolean {
  return (
    (content.includes('GÜN 1') || content.includes('Day 1') || content.includes('第1天') || content.includes('═══ GÜN')) &&
    (content.includes('SABAH') || content.includes('Morning') || content.includes('早上') || content.includes('KİŞİSEL'))
  );
}

// ─── PDF Generator (print window) ─────────────────────────────────────────────

function generateTravelPlanPDF(content: string, language: string) {
  const titles: Record<string, string> = {
    tr: 'Kişisel Kapadokya Gezi Planınız',
    en: 'Your Personal Cappadocia Travel Plan',
    zh: '您的个人卡帕多西亚旅游计划',
  };
  const title = titles[language] || titles.tr;
  const date = new Date().toLocaleDateString('tr-TR');

  const escaped = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const logoUrl = `${window.location.origin}/images/header-logo.avif`;

  const html = `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; max-width: 780px; margin: 0 auto; padding: 40px 32px; color: #1a1a1a; background: #fff; }
    .header { text-align: center; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 3px solid #b45309; }
    .logo-wrapper { display: inline-block; padding: 14px 32px; margin-bottom: 14px; }
    .logo-img { height: 52px; width: auto; display: block; }
    .logo { font-size: 28px; font-weight: 800; color: #b45309; letter-spacing: -0.5px; }
    .subtitle { color: #6b7280; font-size: 13px; margin-top: 6px; }
    .plan-title { font-size: 20px; font-weight: 700; color: #292524; margin: 24px 0 16px; }
    .content { white-space: pre-wrap; font-size: 14px; line-height: 1.75; color: #374151; font-family: 'Segoe UI', Arial, sans-serif; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px; line-height: 1.8; }
    .footer strong { color: #b45309; }
    @media print {
      body { padding: 20px; }
      .header { break-after: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-wrapper">
      <img src="${logoUrl}" alt="Anitya Cave House" class="logo-img" />
    </div>
    <div class="logo">Anitya Cave House</div>
    <div class="subtitle">Ortahisar, Kapadokya, Türkiye &nbsp;|&nbsp; +90 544 494 68 14 &nbsp;|&nbsp; info@anityacavehouse.com</div>
  </div>
  <div class="plan-title">${title}</div>
  <div class="content">${escaped}</div>
  <div class="footer">
    <p><strong>Anitya Cave House</strong> &mdash; anityacavehouse.com</p>
    <p>📱 WhatsApp: +90 544 494 68 14 &nbsp;&nbsp;✉️ info@anityacavehouse.com</p>
    <p style="margin-top:6px;color:#d1d5db;">${date} tarihinde oluşturuldu</p>
  </div>
  <script>window.onload = function(){ setTimeout(function(){ window.print(); }, 400); };<\/script>
</body>
</html>`;

  const win = window.open('', '_blank', 'width=900,height=700');
  if (win) {
    win.document.write(html);
    win.document.close();
  }
}

// ─── Session ID Generator ──────────────────────────────────────────────────────

function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChatBot() {
  const t = useTranslations('chatbot');
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [externalLink, setExternalLink] = useState<string | null>(null);
  const [showQuickQ, setShowQuickQ] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionIdRef = useRef<string>(generateSessionId());

  // ── Auto-save: call after every AI response ──────────────────────────────────
  const saveConversation = (currentMessages: Message[]) => {
    const storable = currentMessages.map((m) => ({
      role: m.role,
      content: m.rawContent ?? m.content,
      timestamp: new Date().toISOString(),
    }));
    fetch('/api/chat/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: storable,
        language: locale,
        sessionId: sessionIdRef.current,
      }),
    }).catch(() => { /* silent fail — don't interrupt UX */ });
  };

  const quickQuestions = [
    { key: 'q1', icon: '🏠' },
    { key: 'q2', icon: '📍' },
    { key: 'q3', icon: '🎈' },
    { key: 'q4', icon: '🍳' },
    { key: 'q5', icon: '💰' },
    { key: 'q6', icon: '🗺️' },
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMaximized]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: t('welcome') }]);
    }
  }, [isOpen, messages.length, t]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.rawContent ?? m.content,
          })),
          language: locale,
        }),
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      const { text, replies } = parseQuickReplies(data.message);
      const newAssistant: Message = {
        role: 'assistant',
        content: text,
        rawContent: data.message,
        quickReplies: replies.length > 0 ? replies : undefined,
      };
      setMessages((prev) => {
        const updated = [...prev, newAssistant];
        saveConversation(updated);
        return updated;
      });
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: t('error') }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleExternalLink = (url: string) => {
    setExternalLink(url);
  };

  const confirmExternalLink = () => {
    if (externalLink) {
      window.open(externalLink, '_blank', 'noopener,noreferrer');
      setExternalLink(null);
    }
  };

  // i18n
  const bookingLabels: Record<string, string> = {
    tr: 'Rezervasyon Sayfasına Git',
    en: 'Go to Booking Page',
    zh: '前往预订页面',
  };
  const pdfLabels: Record<string, string> = {
    tr: 'Planı PDF olarak indir',
    en: 'Download plan as PDF',
    zh: '下载PDF计划',
  };
  const mapsLabels: Record<string, string> = {
    tr: 'Haritada Gör',
    en: 'View on Map',
    zh: '在地图上查看',
  };
  const externalWarning = {
    tr: { title: 'Siteyi terk ediyorsunuz', body: 'Anitya Cave House sitesinden ayrılarak harici bir sayfaya yönlendiriliyorsunuz.', cancel: 'İptal', confirm: 'Devam Et' },
    en: { title: "You're leaving our site", body: "You'll be redirected to an external page outside Anitya Cave House.", cancel: 'Cancel', confirm: 'Continue' },
    zh: { title: '您即将离开本站', body: '您将被重定向到Anitya Cave House网站以外的外部页面。', cancel: '取消', confirm: '继续' },
  };
  const lang = (locale === 'en' || locale === 'zh') ? locale : 'tr';
  const ew = externalWarning[lang];
  const bookingLabel = bookingLabels[lang];
  const mapsLabel = mapsLabels[lang];

  // Window sizing
  const windowClass = isMaximized
    ? 'fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-full sm:w-[680px] h-full sm:h-[700px] sm:max-h-[90vh] bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200'
    : 'fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200';

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
          aria-label={t('openChat')}
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
        </button>
      )}

      {/* Maximized backdrop */}
      {isOpen && isMaximized && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMaximized(false)}
        />
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={windowClass}>
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-5 py-3.5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-base leading-tight">{t('title')}</h3>
                <p className="text-[11px] text-amber-100">{t('subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Maximize / Minimize toggle */}
              <button
                onClick={() => setIsMaximized((v) => !v)}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                aria-label={isMaximized ? 'Küçült' : 'Büyüt'}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => { setIsOpen(false); setIsMaximized(false); }}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                aria-label={t('closeChat')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div data-lenis-prevent className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
            {messages.map((message, index) => {
              const places = message.role === 'assistant' ? detectPlaces(message.content) : [];
              const showBooking = message.role === 'assistant' && hasBookingIntent(message.content);

              return (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex flex-col gap-2 ${message.role === 'user' ? 'items-end' : 'items-start'} ${isMaximized ? 'max-w-[75%]' : 'max-w-[85%]'}`}>
                    {/* Bubble */}
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-br-md'
                          : 'bg-white text-neutral-800 rounded-bl-md shadow-sm border border-neutral-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>

                    {/* Quick Reply Buttons (AI-generated contextual options) */}
                    {message.role === 'assistant' && message.quickReplies && message.quickReplies.length > 0 && (
                      <div className="flex flex-col gap-1.5 mt-1 w-full">
                        <div className="flex flex-wrap gap-1.5">
                          {message.quickReplies.map((reply, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => sendMessage(reply)}
                              disabled={isLoading}
                              className="px-3 py-1.5 text-xs bg-white border border-amber-300 text-amber-700 rounded-full hover:bg-amber-50 hover:border-amber-400 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                        <p className="text-[10px] text-neutral-400 italic pl-0.5">
                          {t('quickReplyHint')}
                        </p>
                      </div>
                    )}

                    {/* PDF Download button for travel plans */}
                    {message.role === 'assistant' && isTravelPlan(message.content) && (
                      <button
                        type="button"
                        onClick={() => generateTravelPlanPDF(message.content, lang)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors duration-200 shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5 flex-shrink-0" />
                        {pdfLabels[lang]}
                      </button>
                    )}

                    {/* Booking CTA button */}
                    {showBooking && (
                      <a
                        href={`/${locale}/booking`}
                        className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-colors duration-200 shadow-sm"
                      >
                        <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
                        {bookingLabel} →
                      </a>
                    )}

                    {/* Place cards */}
                    {places.length > 0 && (
                      <div className={`w-full grid gap-2 ${places.length > 1 && isMaximized ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {places.map((place) => (
                          <div
                            key={place.id}
                            className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm"
                          >
                            {/* Card color bar */}
                            <div className={`${place.color} h-1.5 w-full`} />
                            <div className="px-3 py-2.5">
                              <div className="flex items-start gap-2 mb-1.5">
                                <span className="text-lg leading-none mt-0.5">{place.emoji}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-neutral-800 leading-tight truncate">
                                    {place.name}
                                  </p>
                                  <p className="text-[10px] text-neutral-500 leading-tight mt-0.5">
                                    {place.category[lang]}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-[10px] text-neutral-500 mb-2">
                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{place.address}</span>
                              </div>
                              <button
                                onClick={() =>
                                  handleExternalLink(
                                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapsQuery)}`
                                  )
                                }
                                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-neutral-900 hover:bg-neutral-700 text-white text-[10px] font-semibold rounded-lg transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {mapsLabel}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-neutral-200">
                  <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Panel */}
          <div className="flex-shrink-0 bg-white border-t border-neutral-200">
            {/* Toggle bar */}
            <button
              type="button"
              onClick={() => setShowQuickQ((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-neutral-50 transition-colors group"
            >
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-500 tracking-wide uppercase group-hover:text-amber-600 transition-colors">
                <Sparkles className="w-3 h-3" />
                {t('quickQuestionsTitle')}
              </span>
              <ChevronUp
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${showQuickQ ? 'rotate-180' : ''}`}
              />
            </button>
            {/* Collapsible questions */}
            {showQuickQ && (
              <div className={`px-3 pb-3 grid gap-1.5 ${isMaximized ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {quickQuestions.map((q) => (
                  <button
                    key={q.key}
                    type="button"
                    onClick={() => {
                      sendMessage(t(`quickQuestions.${q.key}`));
                      setShowQuickQ(false);
                    }}
                    className="text-left px-3 py-2 bg-neutral-50 hover:bg-amber-50 border border-neutral-200 hover:border-amber-300 rounded-lg transition-all duration-150 text-xs group"
                  >
                    <span className="mr-1.5">{q.icon}</span>
                    <span className="text-neutral-700 group-hover:text-amber-700">
                      {t(`quickQuestions.${q.key}`)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-neutral-200 flex-shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('inputPlaceholder')}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50 text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 py-3 bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={t('send')}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* External Link Warning Modal */}
      {externalLink && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setExternalLink(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-neutral-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="font-semibold text-neutral-900 text-base">{ew.title}</h4>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed mb-5">{ew.body}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setExternalLink(null)}
                className="flex-1 py-2.5 px-4 border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-sm font-medium rounded-xl transition-colors"
              >
                {ew.cancel}
              </button>
              <button
                onClick={confirmExternalLink}
                className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                {ew.confirm} <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
