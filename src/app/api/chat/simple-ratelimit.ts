// Simple in-memory rate limiting with file persistence - NO external services needed
// Sayaçlar disk'te saklanır, server restart sonrası geri yüklenir

import fs from 'fs/promises';
import path from 'path';

interface RateLimitRecord {
  count: number;
  resetTime: number;
  lastMessage: number;
}

// Global hafıza - sunucu çalıştığı sürece tutar
const rateLimits = new Map<string, RateLimitRecord>();
const travelPlans = new Map<string, { count: number; date: string }>();

// Storage file path (Vercel'de /tmp, local'de .data)
const STORAGE_DIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), '.data');
const STORAGE_FILE = path.join(STORAGE_DIR, 'rate-limits.json');

// Ensure storage directory exists
async function ensureStorageDir() {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist, ignore
  }
}

// Load data from disk (server başlarken çağrılır)
async function loadFromDisk() {
  try {
    await ensureStorageDir();
    const data = await fs.readFile(STORAGE_FILE, 'utf-8');
    const saved = JSON.parse(data);

    // Restore rate limits
    if (saved.rateLimits) {
      for (const [ip, record] of Object.entries(saved.rateLimits)) {
        rateLimits.set(ip, record as RateLimitRecord);
      }
    }

    // Restore travel plans
    if (saved.travelPlans) {
      for (const [ip, record] of Object.entries(saved.travelPlans)) {
        travelPlans.set(ip, record as { count: number; date: string });
      }
    }

    console.log(`✅ Loaded rate limits from disk: ${rateLimits.size} IPs, ${travelPlans.size} travel plans`);
  } catch (error) {
    // File doesn't exist yet or parse error - start fresh
    console.log('⚠️ No previous rate limit data found, starting fresh');
  }
}

// Save data to disk (her 30 saniyede bir)
async function saveToDisk() {
  try {
    await ensureStorageDir();

    const data = {
      rateLimits: Object.fromEntries(rateLimits),
      travelPlans: Object.fromEntries(travelPlans),
      timestamp: new Date().toISOString(),
    };

    await fs.writeFile(STORAGE_FILE, JSON.stringify(data, null, 2));
    console.log(`💾 Saved rate limits to disk: ${rateLimits.size} IPs`);
  } catch (error) {
    console.error('❌ Failed to save rate limits:', error);
  }
}

// Initialize - Load from disk on startup
loadFromDisk().catch(console.error);

// Auto-save every 30 seconds
setInterval(() => {
  saveToDisk().catch(console.error);
}, 30000); // 30 seconds

// Save on process exit (graceful shutdown)
if (typeof process !== 'undefined') {
  process.on('SIGTERM', () => {
    console.log('📥 SIGTERM received, saving rate limits...');
    saveToDisk().then(() => process.exit(0));
  });

  process.on('SIGINT', () => {
    console.log('📥 SIGINT received, saving rate limits...');
    saveToDisk().then(() => process.exit(0));
  });
}

export function checkSimpleRateLimit(ip: string): {
  allowed: boolean;
  message?: string;
  remaining?: number;
} {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  // IP için kayıt al veya oluştur
  let record = rateLimits.get(ip);

  // Kayıt yoksa veya zaman aşımı olduysa sıfırla
  if (!record || now > record.resetTime) {
    record = {
      count: 0,
      resetTime: now + oneHour,
      lastMessage: now,
    };
    rateLimits.set(ip, record);
  }

  // Çok hızlı mesaj kontrolü (6 saniyede 10 mesaj = dakikada ~100)
  const timeSinceLastMsg = now - record.lastMessage;
  if (timeSinceLastMsg < 6000 && record.count >= 10) {
    return {
      allowed: false,
      message: 'Çok hızlı mesaj gönderiyorsunuz. Lütfen birkaç saniye bekleyin.',
    };
  }

  // Saatlik limit (100 mesaj/saat)
  if (record.count >= 100) {
    const minutesLeft = Math.ceil((record.resetTime - now) / 60000);
    return {
      allowed: false,
      message: `Saatlik mesaj limitinize ulaştınız. ${minutesLeft} dakika sonra tekrar deneyin.`,
    };
  }

  // Sayacı artır
  record.count++;
  record.lastMessage = now;

  return {
    allowed: true,
    remaining: 100 - record.count,
  };
}

export function checkTravelPlanLimit(ip: string): {
  allowed: boolean;
  count: number;
} {
  const today = new Date().toISOString().split('T')[0];
  const record = travelPlans.get(ip);

  // Farklı gün ise sıfırla
  if (!record || record.date !== today) {
    travelPlans.set(ip, { count: 0, date: today });
    return { allowed: true, count: 0 };
  }

  return {
    allowed: record.count < 2, // Max 2 plan/gün
    count: record.count,
  };
}

export function incrementTravelPlan(ip: string): void {
  const today = new Date().toISOString().split('T')[0];
  const record = travelPlans.get(ip);

  if (!record || record.date !== today) {
    travelPlans.set(ip, { count: 1, date: today });
  } else {
    record.count++;
  }
}

// Cleanup - Eski kayıtları temizle (memory leak önleme)
setInterval(
  () => {
    const now = Date.now();

    // Rate limit kayıtlarını temizle
    for (const [ip, record] of rateLimits.entries()) {
      if (now > record.resetTime + 3600000) {
        // 1 saat sonra bile kullanılmamış ise sil
        rateLimits.delete(ip);
      }
    }

    // Eski günlerin travel plan kayıtlarını temizle
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split('T')[0];

    for (const [ip, record] of travelPlans.entries()) {
      if (record.date < yesterday) {
        travelPlans.delete(ip);
      }
    }
  },
  60 * 60 * 1000
); // Her 1 saatte bir temizlik

// Dev/monitoring için helper
export function getRateLimitStats() {
  return {
    totalIPs: rateLimits.size,
    travelPlansToday: Array.from(travelPlans.values()).reduce(
      (sum, r) => sum + r.count,
      0
    ),
  };
}
