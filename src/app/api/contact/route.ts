import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, checkIn, checkOut } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Ad, e-posta ve mesaj alanları zorunludur.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const dateSection = checkIn && checkOut
      ? `
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;width:120px;">Giriş tarihi</td>
          <td style="padding:8px 0;color:#111827;font-size:13px;">${checkIn}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;">Çıkış tarihi</td>
          <td style="padding:8px 0;color:#111827;font-size:13px;">${checkOut}</td>
        </tr>`
      : '';

    const html = `
      <!DOCTYPE html>
      <html lang="tr">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
      <body style="margin:0;padding:0;background:#f5f1e8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

              <!-- Header -->
              <tr>
                <td style="background:#1c1917;padding:32px 40px;border-radius:12px 12px 0 0;">
                  <p style="margin:0;color:#d6d3d1;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Anitya Cave House</p>
                  <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:400;">Yeni İletişim Mesajı</h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="background:#ffffff;padding:40px;border-radius:0 0 12px 12px;border:1px solid #e7e5e4;border-top:none;">

                  <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #f3f4f6;margin-bottom:28px;padding-bottom:28px;">
                    <tr>
                      <td style="padding:8px 0;color:#6b7280;font-size:13px;width:120px;">Ad Soyad</td>
                      <td style="padding:8px 0;color:#111827;font-size:13px;font-weight:600;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b7280;font-size:13px;">E-posta</td>
                      <td style="padding:8px 0;color:#111827;font-size:13px;">
                        <a href="mailto:${email}" style="color:#92400e;text-decoration:none;">${email}</a>
                      </td>
                    </tr>
                    ${dateSection}
                  </table>

                  <p style="margin:0 0 8px;color:#6b7280;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Mesaj</p>
                  <div style="background:#fafaf9;border:1px solid #e7e5e4;border-radius:8px;padding:20px;">
                    <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">${message.replace(/\n/g, '<br>')}</p>
                  </div>

                  <div style="margin-top:32px;padding-top:24px;border-top:1px solid #f3f4f6;">
                    <a href="mailto:${email}?subject=Re: Anitya Cave House - İletişim"
                       style="display:inline-block;padding:12px 28px;background:#1c1917;color:#ffffff;font-size:13px;letter-spacing:1px;text-decoration:none;border-radius:100px;">
                      Yanıtla →
                    </a>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:24px 0;text-align:center;">
                  <p style="margin:0;color:#9ca3af;font-size:11px;">
                    Bu e-posta anityacavehouse.com iletişim formundan gönderildi.
                  </p>
                </td>
              </tr>

            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Anitya Cave House" <${process.env.GMAIL_USER}>`,
      to: 'info@anityacavehouse.com',
      replyTo: email,
      subject: `İletişim Formu: ${name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
