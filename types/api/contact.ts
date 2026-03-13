/**
 * Supported lead sources for `POST /api/contact`.
 * Extend this union whenever a page-specific funnel needs separate attribution.
 */
export type ContactSource = 'contact' | 'wizard' | 'admin-software';

/**
 * DTO for `POST /api/contact`.
 * Carries lead/contact data submitted from the website contact form.
 */
export interface ContactRequestDto {
  name: string;
  email: string;
  company?: string;
  /**
   * Optional phone number normalized to international format (for example `+4915202189213`).
   */
  phone?: string;
  message?: string;
  consent?: boolean;
  newsletterOptIn?: boolean;
  /**
   * Optional lead source so inbound requests can be attributed to a concrete funnel or page.
   */
  source?: ContactSource;
  token?: string;
  config?: unknown;
}

export interface ContactResponseDto {
  ok: true;
}

export interface ContactErrorResponseDto {
  error: string;
  /**
   * Optional validation details keyed by request field.
   */
  details?: Record<string, string[] | undefined>;
}
