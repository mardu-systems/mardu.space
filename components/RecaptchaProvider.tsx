"use client";

import * as React from "react";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function RecaptchaProvider({children}: {children: React.ReactNode}) {
    if (!siteKey) return <>{children}</>;
    return (
        <GoogleReCaptchaProvider reCaptchaKey={siteKey} scriptProps={{async: true, defer: true}}>
            {children}
        </GoogleReCaptchaProvider>
    );
}
