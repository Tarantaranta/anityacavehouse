import { NextResponse } from 'next/server';
import { getRateLimitStats } from '../simple-ratelimit';

// Development/monitoring için rate limit istatistikleri
export async function GET() {
  try {
    const stats = getRateLimitStats();

    return NextResponse.json({
      success: true,
      stats: {
        activeIPs: stats.totalIPs,
        travelPlansToday: stats.travelPlansToday,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Stats unavailable' },
      { status: 500 }
    );
  }
}
