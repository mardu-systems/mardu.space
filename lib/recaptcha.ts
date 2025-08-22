"use client";

import * as React from "react";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";

export function useRecaptcha() {
    const {executeRecaptcha} = useGoogleReCaptcha();

    return React.useCallback(
        async (action: string) => {
            if (!executeRecaptcha) return null;
            return await executeRecaptcha(action);
        },
        [executeRecaptcha],
    );
}
