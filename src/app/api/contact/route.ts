import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, locale } = body;

    // Configure transporter — replace with real credentials in .env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const isAr = locale === 'ar';
    const subject = isAr
      ? `طلب استشارة جديد من ${name}`
      : `New Consultation Request from ${name}`;

    await transporter.sendMail({
      from: `"B&M Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'info@brandandmore.ae',
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; border-radius: 12px;">
          <div style="background: #0B2240; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #C5A880; margin: 0; font-size: 24px;">B&M – Brand & More</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 13px;">New Contact Form Submission</p>
          </div>
          <div style="background: white; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              ${[
                ['Name / Company', name],
                ['Phone', phone],
                ['Email', email || 'Not provided'],
                ['Service Requested', service || 'Not specified'],
                ['Language', locale === 'ar' ? 'Arabic' : 'English'],
              ].map(([label, value]) => `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #334155; width: 35%;">${label}</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">${value}</td>
                </tr>
              `).join('')}
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #C5A880;">
              <p style="font-weight: 600; color: #334155; margin: 0 0 8px;">Message:</p>
              <p style="color: #64748b; margin: 0; line-height: 1.6;">${message}</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
