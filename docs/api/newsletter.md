# Newsletter API

Diese Datei dokumentiert den Start des bestehenden Newsletter- und Whitepaper-Double-Opt-in-Flows.

## `POST /api/newsletter`

Quelle: [app/api/newsletter/route.ts](/Users/lucaschoeneberg/Documents/GitHub/mardu.space/app/api/newsletter/route.ts)

- Zweck:
  - startet den Double-Opt-in fuer Newsletter- oder Whitepaper-Anmeldungen
  - versendet die Bestaetigungs-E-Mail ueber bestehende Mail-Utilities

## DTOs

Quelle: [types/api/newsletter.ts](/Users/lucaschoeneberg/Documents/GitHub/mardu.space/types/api/newsletter.ts)

```ts
type NewsletterSignupRole = 'newsletter' | 'whitepaper';

interface NewsletterRequestDto {
  email: string;
  role: NewsletterSignupRole | string;
  firstName?: string;
  lastName?: string;
  company?: string;
  token?: string;
}

interface NewsletterResponseDto {
  ok: true;
}

interface NewsletterErrorResponseDto {
  error: string;
}
```

## Validierung und Verhalten

- `email`: Pflichtfeld
- `role`: Pflichtfeld
- `firstName`, `lastName`, `company`: optional fuer Personalisierung
- `token`: optional; reCAPTCHA wird nur geprueft, wenn Token und Secret vorhanden sind

## Zugehoerige Folge-Endpunkte

- `GET /api/newsletter/confirm`
- `GET /api/newsletter/unsubscribe`

Diese Endpunkte verwenden den bereits bestehenden Token-Flow aus [lib/newsletter.ts](/Users/lucaschoeneberg/Documents/GitHub/mardu.space/lib/newsletter.ts).
