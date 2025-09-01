import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createToken } from '@/lib/newsletter';
import { renderEmailLayout, sendEmail } from '@/lib/email';

const Schema = z.object({
  email: z.email(),
  role: z.string(),
  token: z.string(),
});

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { email, role, token } = parsed.data;
  const isDev = process.env.NODE_ENV === 'development';
  if (!isDev) {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: 'Missing captcha secret' }, { status: 500 });
    }
    const captchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`,
    });
    const captchaJson = await captchaRes.json();
    if (!captchaJson.success) {
      return NextResponse.json({ error: 'Invalid captcha' }, { status: 400 });
    }
  }

  try {
    const confirmToken = createToken(email, role);
    const origin = process.env.APP_URL ?? req.headers.get('origin') ?? '';
    const confirmUrl = `${origin}/api/newsletter/confirm?token=${encodeURIComponent(confirmToken)}`;
    await sendEmail({
      to: email,
      subject: 'Bitte bestätige deine Newsletter-Anmeldung',
      text: `Bitte bestätige deine Anmeldung indem du auf folgenden Link klickst: ${confirmUrl}`,
      html: renderEmailLayout(
        'Newsletter Anmeldung',
        `<p>Bitte bestätige deine Anmeldung indem du auf folgenden Link klickst:</p><p style="text-align:center;"><a href="${confirmUrl}">Newsletter bestätigen</a></p>`,
      ),
    });
  } catch (err) {
    console.error('Failed to send confirmation email', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
