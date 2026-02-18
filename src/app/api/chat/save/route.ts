import { NextRequest, NextResponse } from 'next/server';
import { saveChat, detectTopics, ChatSession, StoredMessage } from '@/lib/chatStorage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, language, sessionId } = body as {
      messages: StoredMessage[];
      language: string;
      sessionId: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    const hasTravelPlan = messages.some(
      (m) =>
        m.role === 'assistant' &&
        (m.content.includes('GÜN 1') ||
          m.content.includes('Day 1') ||
          m.content.includes('第1天') ||
          m.content.includes('═══ GÜN') ||
          (m.content.includes('KİŞİSEL') && m.content.includes('PLAN')))
    );

    const topics = detectTopics(messages);

    const now = new Date().toISOString();
    const session: ChatSession = {
      id: sessionId,
      startTime: messages[0]?.timestamp || now,
      endTime: now,
      language: language || 'tr',
      messages,
      messageCount: messages.length,
      hasTravelPlan,
      topics,
    };

    saveChat(session);
    return NextResponse.json({ success: true, id: session.id });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Save chat error:', msg);
    return NextResponse.json({ error: 'Failed to save chat' }, { status: 500 });
  }
}
