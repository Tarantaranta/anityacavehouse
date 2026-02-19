import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { detectTopics, StoredMessage } from '@/lib/chatStorage';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildTranscriptHtml(
  messages: StoredMessage[],
  language: string,
  topics: string[],
  hasTravelPlan: boolean,
  startTime: string,
  endTime: string
): string {
  const messageBubbles = messages
    .map((m) => {
      const isUser = m.role === 'user';
      const bubbleAlign = isUser ? 'right' : 'left';
      const bubbleBg = isUser ? '#1c1917' : '#f5f1e8';
      const bubbleColor = isUser ? '#ffffff' : '#374151';
      const bubbleBorder = isUser ? 'none' : '1px solid #e7e5e4';
      const label = isUser ? 'Ziyaretçi' : 'Anitya AI';
      const labelColor = isUser ? '#d6d3d1' : '#9ca3af';
      const content = m.content.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');

      return `
        <tr>
          <td style="padding:6px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="text-align:${bubbleAlign};">
                  <p style="margin:0 0 4px;color:${labelColor};font-size:11px;letter-spacing:1px;text-transform:uppercase;">${label} · ${formatDate(m.timestamp)}</p>
                  <div style="display:inline-block;max-width:80%;background:${bubbleBg};color:${bubbleColor};border:${bubbleBorder};border-radius:12px;padding:12px 16px;font-size:13px;line-height:1.6;text-align:left;">
                    ${content}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;
    })
    .join('');

  const topicBadges = topics.length
    ? topics
        .map(
          (t) =>
            `<span style="display:inline-block;margin:2px 4px;padding:3px 10px;background:#f5f1e8;border:1px solid #e7e5e4;border-radius:100px;font-size:11px;color:#78716c;">${t}</span>`
        )
        .join('')
    : '<span style="font-size:12px;color:#9ca3af;">—</span>';

  const languageLabel: Record<string, string> = { tr: 'Türkçe', en: 'English', zh: '中文' };

  return `
    <!DOCTYPE html>
    <html lang="tr">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f5f1e8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
        <tr><td align="center">
          <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;">

            <!-- Header -->
            <tr>
              <td style="background:#1c1917;padding:32px 40px;border-radius:12px 12px 0 0;">
                <p style="margin:0;color:#d6d3d1;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Anitya Cave House</p>
                <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:400;">Chat Konuşması${hasTravelPlan ? ' · Gezi Planı İçeriyor' : ''}</h1>
              </td>
            </tr>

            <!-- Meta -->
            <tr>
              <td style="background:#ffffff;padding:24px 40px;border-left:1px solid #e7e5e4;border-right:1px solid #e7e5e4;border-bottom:1px solid #f3f4f6;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:6px 0;color:#6b7280;font-size:12px;width:140px;">Başlangıç</td>
                    <td style="padding:6px 0;color:#111827;font-size:12px;">${formatDate(startTime)}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#6b7280;font-size:12px;">Bitiş</td>
                    <td style="padding:6px 0;color:#111827;font-size:12px;">${formatDate(endTime)}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#6b7280;font-size:12px;">Dil</td>
                    <td style="padding:6px 0;color:#111827;font-size:12px;">${languageLabel[language] ?? language}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#6b7280;font-size:12px;">Mesaj sayısı</td>
                    <td style="padding:6px 0;color:#111827;font-size:12px;">${messages.length}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0 6px;color:#6b7280;font-size:12px;vertical-align:top;">Konular</td>
                    <td style="padding:10px 0 6px;">${topicBadges}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Transcript -->
            <tr>
              <td style="background:#ffffff;padding:24px 40px 40px;border-radius:0 0 12px 12px;border:1px solid #e7e5e4;border-top:none;">
                <p style="margin:0 0 20px;color:#6b7280;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Konuşma Transkripti</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${messageBubbles}
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px 0;text-align:center;">
                <p style="margin:0;color:#9ca3af;font-size:11px;">
                  Bu e-posta anityacavehouse.com chat sisteminden otomatik gönderildi.
                </p>
              </td>
            </tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}

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
    const startTime = messages[0]?.timestamp || now;
    const lang = language || 'tr';

    const html = buildTranscriptHtml(messages, lang, topics, hasTravelPlan, startTime, now);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const topicSummary = topics.length ? ` [${topics.join(', ')}]` : '';
    const travelFlag = hasTravelPlan ? ' 🗺' : '';

    await transporter.sendMail({
      from: `"Anitya Chat" <${process.env.GMAIL_USER}>`,
      to: 'info@anityacavehouse.com',
      subject: `Chat Konuşması${travelFlag}${topicSummary} · ${new Date(now).toLocaleDateString('tr-TR')}`,
      html,
    });

    return NextResponse.json({ success: true, id: sessionId });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Save chat error:', msg);
    return NextResponse.json({ error: 'Failed to save chat' }, { status: 500 });
  }
}
