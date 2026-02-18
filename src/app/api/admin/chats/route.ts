import { NextRequest, NextResponse } from 'next/server';
import { getAllChats, getChat } from '@/lib/chatStorage';

const ADMIN_PASSWORD = '!Anitya@2014-';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('x-admin-password');
  if (auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get('id');
  if (id) {
    const chat = getChat(id);
    return chat
      ? NextResponse.json(chat)
      : NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const chats = getAllChats();
  return NextResponse.json(chats);
}
