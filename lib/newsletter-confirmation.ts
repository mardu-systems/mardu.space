import { createToken } from '@/lib/newsletter';
import { renderEmailLayout, sendEmail } from '@/lib/email';

type SendNewsletterConfirmationEmailOptions = {
  email: string;
  role: string;
  origin: string;
  firstName?: string;
  lastName?: string;
  company?: string;
};

export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { firstName: 'Interessent', lastName: 'Kontakt' };
  }

  const parts = trimmed.split(/\s+/);
  const firstName = parts.shift() ?? 'Interessent';
  const lastName = parts.join(' ').trim() || 'Kontakt';
  return { firstName, lastName };
}

export async function sendNewsletterConfirmationEmail({
  email,
  role,
  origin,
  firstName,
}: SendNewsletterConfirmationEmailOptions) {
  const confirmToken = createToken(email, role);
  const confirmUrl = `${origin}/api/newsletter/confirm?token=${encodeURIComponent(confirmToken)}`;
  const salutation = firstName?.trim() ? `Hallo ${firstName.trim()},` : 'Hallo,';

  await sendEmail({
    to: email,
    subject: 'Bitte bestätige deine Newsletter-Anmeldung',
    text: `${salutation}\n\nbitte bestätige deine Anmeldung, indem du auf folgenden Link klickst:\n${confirmUrl}`,
    html: renderEmailLayout(
      'Newsletter Anmeldung',
      `<p>${salutation}</p><p>Bitte bestätige deine Anmeldung, indem du auf den folgenden Link klickst:</p><p style="text-align:center;"><a href="${confirmUrl}">Newsletter bestätigen</a></p>`,
    ),
  });
}
