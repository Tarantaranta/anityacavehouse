import { kv } from '@vercel/kv';

export interface StoredMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  startTime: string;
  endTime: string;
  language: string;
  messages: StoredMessage[];
  messageCount: number;
  hasTravelPlan: boolean;
  topics: string[];
}

// Her chat oturumu "chat:{id}" key'iyle, indeks ise "chat:index" sorted set'iyle tutulur.
// Score olarak timestamp (ms) kullanılır — zrange ile en yeni → en eski sıralama yapılır.

export async function saveChat(session: ChatSession): Promise<void> {
  await Promise.all([
    kv.set(`chat:${session.id}`, session),
    kv.zadd('chat:index', {
      score: new Date(session.endTime).getTime(),
      member: session.id,
    }),
  ]);
}

export async function getAllChats(): Promise<ChatSession[]> {
  // Newest first: rev:true ile score'a göre azalan sıra
  const ids = await kv.zrange<string[]>('chat:index', 0, -1, { rev: true });
  if (!ids || ids.length === 0) return [];

  const sessions = await Promise.all(
    ids.map((id) => kv.get<ChatSession>(`chat:${id}`))
  );

  return sessions.filter((s): s is ChatSession => s !== null);
}

export async function getChat(id: string): Promise<ChatSession | null> {
  return kv.get<ChatSession>(`chat:${id}`);
}

export function detectTopics(messages: StoredMessage[]): string[] {
  const topics = new Set<string>();
  const allText = messages.map((m) => m.content.toLowerCase()).join(' ');

  if (allText.includes('balon') || allText.includes('balloon') || allText.includes('气球'))
    topics.add('Balon Turu');
  if (allText.includes('suite') || allText.includes('oda') || allText.includes('room') || allText.includes('套房'))
    topics.add('Suite/Oda');
  if (
    allText.includes('gezi plan') ||
    allText.includes('travel plan') ||
    allText.includes('itinerary') ||
    allText.includes('旅游计划')
  )
    topics.add('Gezi Planı');
  if (
    allText.includes('restoran') ||
    allText.includes('restaurant') ||
    allText.includes('yemek') ||
    allText.includes('餐厅')
  )
    topics.add('Restoran');
  if (
    allText.includes('rezerv') ||
    allText.includes('booking') ||
    allText.includes('book') ||
    allText.includes('预订')
  )
    topics.add('Rezervasyon');
  if (allText.includes('atv') || allText.includes('safari') || allText.includes('jeep'))
    topics.add('ATV/Safari');
  if (
    allText.includes('ulaş') ||
    allText.includes('transport') ||
    allText.includes('araç') ||
    allText.includes('transfer') ||
    allText.includes('havalimanı') ||
    allText.includes('airport')
  )
    topics.add('Ulaşım/Transfer');
  if (allText.includes('fiyat') || allText.includes('price') || allText.includes('ücret') || allText.includes('费用'))
    topics.add('Fiyat');
  if (allText.includes('mutfak') || allText.includes('kitchen') || allText.includes('厨房'))
    topics.add('Mutfak');
  if (
    allText.includes('kızıl tur') ||
    allText.includes('red tour') ||
    allText.includes('yeşil tur') ||
    allText.includes('green tour') ||
    allText.includes('mavi tur') ||
    allText.includes('blue tour')
  )
    topics.add('Tur Rotası');

  return Array.from(topics);
}
