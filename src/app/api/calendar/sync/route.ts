import { NextResponse } from 'next/server';
import { rooms } from '@/data/rooms';
import { fetchAirbnbCalendar } from '@/lib/calendar';

/**
 * Tüm Airbnb takvimlerini senkronize eder
 * GET /api/calendar/sync
 */
export async function GET() {
  try {
    const syncResults = await Promise.all(
      rooms
        .filter((room) => room.airbnbIcalUrl)
        .map(async (room) => {
          try {
            const blockedDates = await fetchAirbnbCalendar(room.airbnbIcalUrl!);
            return {
              roomId: room.id,
              roomName: room.name.en,
              success: true,
              blockedDatesCount: blockedDates.length,
              blockedDates: blockedDates,
              lastSynced: new Date().toISOString(),
            };
          } catch (error) {
            return {
              roomId: room.id,
              roomName: room.name.en,
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            };
          }
        })
    );

    return NextResponse.json({
      success: true,
      syncedAt: new Date().toISOString(),
      rooms: syncResults,
    });
  } catch (error) {
    console.error('Calendar sync error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to sync calendars',
      },
      { status: 500 }
    );
  }
}
