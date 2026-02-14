import ical from 'node-ical';
import { format, parseISO } from 'date-fns';

export interface BlockedDate {
  start: Date;
  end: Date;
  summary: string;
  source: 'airbnb' | 'direct';
}

export interface CalendarAvailability {
  roomId: string;
  blockedDates: BlockedDate[];
  lastSynced: Date;
}

/**
 * Airbnb iCal URL'den rezervasyonları çeker ve bloke edilmiş tarihleri döndürür
 */
export async function fetchAirbnbCalendar(icalUrl: string): Promise<BlockedDate[]> {
  try {
    const events = await ical.async.fromURL(icalUrl);
    const blockedDates: BlockedDate[] = [];

    for (const event of Object.values(events)) {
      if (event && event.type === 'VEVENT') {
        // iCal olaylarından rezervasyon bilgilerini çıkar
        const start = event.start;
        const end = event.end;
        const summaryRaw = event.summary;
        const summary = typeof summaryRaw === 'string' ? summaryRaw : (summaryRaw?.val || 'Airbnb Reservation');

        if (start && end) {
          blockedDates.push({
            start: new Date(start),
            end: new Date(end),
            summary,
            source: 'airbnb',
          });
        }
      }
    }

    return blockedDates;
  } catch (error) {
    console.error('Airbnb calendar fetch error:', error);
    throw new Error('Failed to fetch Airbnb calendar');
  }
}

/**
 * Belirli bir tarihin bloke olup olmadığını kontrol eder
 */
export function isDateBlocked(
  date: Date,
  blockedDates: BlockedDate[]
): boolean {
  return blockedDates.some((blocked) => {
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    const blockStart = new Date(blocked.start);
    blockStart.setHours(0, 0, 0, 0);

    const blockEnd = new Date(blocked.end);
    blockEnd.setHours(23, 59, 59, 999);

    return checkDate >= blockStart && checkDate <= blockEnd;
  });
}

/**
 * Tarih aralığının müsait olup olmadığını kontrol eder
 */
export function isDateRangeAvailable(
  checkIn: Date,
  checkOut: Date,
  blockedDates: BlockedDate[]
): boolean {
  const currentDate = new Date(checkIn);
  const endDate = new Date(checkOut);

  while (currentDate < endDate) {
    if (isDateBlocked(currentDate, blockedDates)) {
      return false;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return true;
}

/**
 * Bizim sitemizden yapılan rezervasyonları iCal formatına çevirir
 * Airbnb'ye import edilebilmesi için
 */
export function generateICalFeed(bookings: any[]): string {
  const icalLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Anıtya Cave House//Booking System//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Anıtya Cave House Reservations',
    'X-WR-TIMEZONE:Europe/Istanbul',
  ];

  for (const booking of bookings) {
    const startDate = format(new Date(booking.checkIn), "yyyyMMdd'T'HHmmss");
    const endDate = format(new Date(booking.checkOut), "yyyyMMdd'T'HHmmss");
    const created = format(new Date(booking.createdAt), "yyyyMMdd'T'HHmmss");

    icalLines.push(
      'BEGIN:VEVENT',
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `DTSTAMP:${created}`,
      `UID:${booking.id}@anityacavehouse.com`,
      `CREATED:${created}`,
      `DESCRIPTION:Direct booking via anityacavehouse.com`,
      `LAST-MODIFIED:${created}`,
      `LOCATION:Anıtya Cave House\\, Göreme\\, Cappadocia`,
      `SEQUENCE:0`,
      `STATUS:CONFIRMED`,
      `SUMMARY:Reserved - ${booking.guestName}`,
      `TRANSP:OPAQUE`,
      'END:VEVENT'
    );
  }

  icalLines.push('END:VCALENDAR');
  return icalLines.join('\r\n');
}
