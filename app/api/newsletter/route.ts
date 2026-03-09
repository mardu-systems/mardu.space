import "reflect-metadata";
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendNewsletterConfirmationEmail } from '@/lib/newsletter-confirmation';
import type {
  NewsletterErrorResponseDto,
  NewsletterRequestDto,
  NewsletterResponseDto,
} from '@/types/api/newsletter';

const Schema = z.object({
  email: z.email(),
  role: z.string(),
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  company: z.string().trim().optional(),
  token: z.string().optional(),
});

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    const payload: NewsletterErrorResponseDto = { error: 'Invalid payload' };
    return NextResponse.json(payload, { status: 400 });
  }

  const { email, role, token, firstName, lastName, company } = parsed.data;
  const isDev = process.env.NODE_ENV === 'development';
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const shouldVerifyCaptcha = !isDev && Boolean(token && secret);

  if (shouldVerifyCaptcha) {
    const captchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`,
    });
    const captchaJson = await captchaRes.json();
    if (!captchaJson.success) {
      return NextResponse.json({ error: 'Invalid captcha' }, { status: 400 });
    }
  } else if (!isDev && (token || secret)) {
    console.warn('Newsletter captcha check skipped due to partial captcha configuration');
  }

  try {
    const origin = process.env.APP_URL ?? req.headers.get('origin') ?? '';
    const payload: NewsletterRequestDto = {
      email,
      role,
      ...(firstName ? { firstName } : {}),
      ...(lastName ? { lastName } : {}),
      ...(company ? { company } : {}),
      ...(token ? { token } : {}),
    };

    await sendNewsletterConfirmationEmail({
      email: payload.email,
      role: payload.role,
      origin,
      ...(payload.firstName ? { firstName: payload.firstName } : {}),
      ...(payload.lastName ? { lastName: payload.lastName } : {}),
      ...(payload.company ? { company: payload.company } : {}),
    });
  } catch (err) {
    console.error('Failed to send confirmation email', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  const response: NewsletterResponseDto = { ok: true };
  return NextResponse.json(response);
}
