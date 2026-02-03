import { NextRequest, NextResponse } from 'next/server';
import { rooms } from '@/data/rooms';
import { generateICalFeed } from '@/lib/calendar';

/**
 * Belirli bir oda için iCal feed'i döndürür
 * Airbnb'ye import edilebilmesi için
 * GET /api/calendar/export/[roomId]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    const { roomId } = await params;

    const room = rooms.find((r) => r.id === roomId);
    if (!room) {
      return NextResponse.json(
        {
          error: 'Room not found',
        },
        { status: 404 }
      );
    }

    // TODO: Veritabanından bu odanın rezervasyonlarını çek
    // Şimdilik boş array döndürüyoruz
    const bookings: any[] = [];

    // Örnek booking yapısı (gerçek veriler veritabanından gelecek):
    // const bookings = await db.booking.findMany({
    //   where: {
    //     roomId: roomId,
    //     status: 'confirmed',
    //   },
    //   select: {
    //     id: true,
    //     checkIn: true,
    //     checkOut: true,
    //     guestName: true,
    //     createdAt: true,
    //   },
    // });

    const icalContent = generateICalFeed(bookings);

    return new NextResponse(icalContent, {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="anitya-cave-house-room-${roomId}.ics"`,
      },
    });
  } catch (error) {
    console.error('iCal export error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate calendar feed',
      },
      { status: 500 }
    );
  }
}
