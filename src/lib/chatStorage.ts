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
