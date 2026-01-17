import { NextResponse } from 'next/server';
import { z } from 'zod';
import { listPreorders, savePreorder } from '@/lib/preorder';
import { renderEmailLayout, sendEmail } from '@/lib/email';

const Schema = z.object({
  email: z.string().email(),
});

export async function GET() {
  const preorders = await listPreorders();
  return NextResponse.json(preorders);
}

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { email } = parsed.data;
  await savePreorder(email);

  try {
    await sendEmail({
      subject: 'Neue Preorder-Anfrage',
      text: `Email: ${email}`,
      html: renderEmailLayout(
        'Neue Preorder-Anfrage',
        `<p><strong>${email}</strong> m&ouml;chte vorbestellen.</p>`,
      ),
    });
  } catch (err) {
    console.error('Failed to send preorder email', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
