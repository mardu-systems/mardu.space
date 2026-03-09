# Contact API

Diese Datei dokumentiert den Kontakt-Endpunkt und den zugehörigen DTO-Vertrag.

## `POST /api/contact`

Quelle: [app/api/contact/route.ts](/Users/lucaschoeneberg/Documents/GitHub/mardu.space/app/api/contact/route.ts)

- Zweck:
  - sendet die Kontaktanfrage per E-Mail
  - validiert Formularfelder serverseitig
  - startet optional einen bestehenden Newsletter-Double-Opt-in
- Bestehende Integrationen:
  - Resend über [lib/email.ts](/Users/lucaschoeneberg/Documents/GitHub/mardu.space/lib/email.ts)
  - Newsletter-DOI über [lib/newsletter-confirmation.ts](/Users/lucaschoeneberg/Documents/GitHub/mardu.space/lib/newsletter-confirmation.ts)

## DTOs

Quelle: [types/api/contact.ts](/Users/lucaschoeneberg/Documents/GitHub/mardu.space/types/api/contact.ts)

```ts
type ContactSource = 'contact' | 'wizard';

interface ContactRequestDto {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  consent?: boolean;
  newsletterOptIn?: boolean;
  source?: ContactSource;
  token?: string;
  config?: unknown;
}

interface ContactResponseDto {
  ok: true;
}

interface ContactErrorResponseDto {
  error: string;
  details?: Record<string, string[] | undefined>;
}
```

## Validierung

- `name`: Pflichtfeld
- `email`: Pflichtfeld, gueltige E-Mail
- `phone`: optional, nur internationales Format, serverseitig normalisiert
- `message`: optional, max. 500 Zeichen
- `newsletterOptIn`: optional, startet bei `true` den bestehenden DOI-Flow
- `token`: optional; reCAPTCHA wird nur geprueft, wenn Token und Secret vollstaendig vorhanden sind

## Fehlerverhalten

- Ungueltige Payload: `400` mit `ContactErrorResponseDto.details`
- Ungueltiges reCAPTCHA: `400`
- Mailversandfehler: `500`
- Newsletter-DOI-Fehler blockieren die Kontaktanfrage nicht; sie werden geloggt
