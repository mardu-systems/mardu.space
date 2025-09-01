'use client';

import * as React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const isDev = process.env.NODE_ENV === 'development';

export default function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  if (isDev || !siteKey) return <>{children}</>;
  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey} scriptProps={{ async: true, defer: true }}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
