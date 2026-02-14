import { NextRequest, NextResponse } from 'next/server';
import { rooms } from '@/data/rooms';
import { fetchAirbnbCalendar, isDateRangeAvailable, type BlockedDate } from '@/lib/calendar';

/**
 * Oda müsaitlik durumunu kontrol eder
 * GET /api/calendar/availability?roomId=1&checkIn=2026-03-01&checkOut=2026-03-05
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const roomId = searchParams.get('roomId');
    const checkInStr = searchParams.get('checkIn');
    const checkOutStr = searchParams.get('checkOut');

    if (!roomId || !checkInStr || !checkOutStr) {
      return NextResponse.json(
        {
          error: 'Missing required parameters: roomId, checkIn, checkOut',
        },
        { status: 400 }
      );
    }

    const room = rooms.find((r) => r.id === roomId);
    if (!room) {
      return NextResponse.json(
        {
          error: 'Room not found',
        },
        { status: 404 }
      );
    }

    const checkIn = new Date(checkInStr);
    const checkOut = new Date(checkOutStr);

    // Airbnb takvimini çek (eğer varsa)
    let blockedDates: BlockedDate[] = [];
    if (room.airbnbIcalUrl) {
      try {
        blockedDates = await fetchAirbnbCalendar(room.airbnbIcalUrl);
      } catch (error) {
        console.error('Failed to fetch Airbnb calendar:', error);
        // Devam et, sadece uyarı ver
      }
    }

    // TODO: Veritabanından kendi rezervasyonlarımızı da çek ve ekle
    // const directBookings = await getDirectBookings(roomId);
    // blockedDates = [...blockedDates, ...directBookings];

    const isAvailable = isDateRangeAvailable(checkIn, checkOut, blockedDates);

    return NextResponse.json({
      roomId: room.id,
      roomName: room.name.en,
      checkIn: checkInStr,
      checkOut: checkOutStr,
      isAvailable,
      blockedDates: blockedDates.map((bd) => ({
        start: bd.start.toISOString(),
        end: bd.end.toISOString(),
        source: bd.source,
      })),
    });
  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      {
        error: 'Failed to check availability',
      },
      { status: 500 }
    );
  }
}
