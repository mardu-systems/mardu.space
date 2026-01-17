import { NextResponse } from 'next/server';
import { createToken, saveSubscriber, verifyToken } from '@/lib/newsletter';
import { renderEmailLayout, sendEmail } from '@/lib/email';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const data = verifyToken(token);
  if (!data) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  await saveSubscriber(data);

  try {
    const origin = process.env.APP_URL ?? req.headers.get('origin') ?? '';
    
    // Fallunterscheidung: Whitepaper vs. normaler Newsletter
    if (data.role === 'whitepaper') {
      const downloadToken = createToken(data.email, 'whitepaper_download');
      const downloadUrl = `${origin}/api/whitepaper/download?token=${encodeURIComponent(downloadToken)}`;
      
      await sendEmail({
        to: data.email,
        subject: 'Ihr Whitepaper Download',
        text: `Vielen Dank für Ihre Bestätigung! Hier ist Ihr persönlicher Download-Link für das Whitepaper: ${downloadUrl}`,
        html: renderEmailLayout(
          'Ihr Whitepaper',
          `<p>Vielen Dank für Ihre Bestätigung!</p>
           <p>Sie können das Whitepaper jetzt über den folgenden Link herunterladen:</p>
           <p style="text-align:center; margin: 24px 0;">
             <a href="${downloadUrl}" style="display:inline-block; background-color:#FFB703; color:#000; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold;">
               Whitepaper herunterladen
             </a>
           </p>
           <p>Dieser Link ist Ihr dauerhafter Zugang zum Whitepaper.</p>`
        ),
      });

      return NextResponse.redirect(new URL(`/whitepaper/success?token=${encodeURIComponent(downloadToken)}`, req.url));
    } else {
      // Standard Newsletter Bestätigung
      const unsubscribeToken = createToken(data.email, 'unsubscribe');
      const unsubscribeUrl = `${origin}/api/newsletter/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
      await sendEmail({
        to: data.email,
        subject: 'Newsletter Anmeldung bestätigt',
        text: `Vielen Dank für deine Bestätigung! Wenn du den Newsletter nicht mehr erhalten möchtest, kannst du dich hier abmelden: ${unsubscribeUrl}`,
        html: renderEmailLayout(
          'Newsletter Anmeldung bestätigt',
          `<p>Vielen Dank für deine Bestätigung!</p><p>Wenn du den Newsletter nicht mehr erhalten möchtest, kannst du dich <a href="${unsubscribeUrl}">hier abmelden</a>.</p>`,
        ),
      });

      return NextResponse.redirect(new URL('/newsletter/success', req.url));
    }
  } catch (err) {
    console.error('Failed to send confirmation email', err);
    // Even on email failure, we confirmed the user, so redirect to success (or maybe error page? defaulting to success for better UX as sub is saved)
    return NextResponse.redirect(new URL('/newsletter/success', req.url));
  }
}
