export type NewsletterSignupRole = 'newsletter' | 'whitepaper';

/**
 * DTO for `POST /api/newsletter`.
 * Starts the double-opt-in flow for newsletter or whitepaper signups.
 */
export interface NewsletterRequestDto {
  email: string;
  role: NewsletterSignupRole | string;
  firstName?: string;
  lastName?: string;
  company?: string;
  token?: string;
}

export interface NewsletterResponseDto {
  ok: true;
}

export interface NewsletterErrorResponseDto {
  error: string;
}
