import { NextRequest, NextResponse } from 'next/server';
import { getAllChats, getChat } from '@/lib/chatStorage';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const auth = req.headers.get('x-admin-password');

  if (!adminPassword || auth !== adminPassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get('id');
  if (id) {
    const chat = await getChat(id);
    return chat
      ? NextResponse.json(chat)
      : NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const chats = await getAllChats();
  return NextResponse.json(chats);
}
