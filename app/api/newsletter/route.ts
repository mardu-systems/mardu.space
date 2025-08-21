import { NextResponse } from "next/server";
import { z } from "zod";
import { createNewsletterToken } from "@/lib/newsletter";
import { sendEmail } from "@/lib/email";

const Schema = z.object({
    email: z.string().email(),
    role: z.string(),
    token: z.string(),
});

export async function POST(req: Request) {
    const json = await req.json();
    const parsed = Schema.safeParse(json);
    if (!parsed.success) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { token, email, role } = parsed.data;
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
        return NextResponse.json({ error: "Missing captcha secret" }, { status: 500 });
    }
    const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secret}&response=${token}`,
    });
    const captchaJson = await captchaRes.json();
    if (!captchaJson.success) {
        return NextResponse.json({ error: "Invalid captcha" }, { status: 400 });
    }

    try {
        const confirmToken = createNewsletterToken(email, role);
        const baseUrl = new URL(req.url).origin;
        const confirmUrl = `${baseUrl}/api/newsletter/confirm?token=${confirmToken}`;

        await sendEmail({
            to: email,
            subject: "Bitte bestätige deine Newsletter-Anmeldung",
            text: `Bitte bestätige deine Anmeldung: ${confirmUrl}`,
            html: `<p>Bitte bestätige deine Anmeldung:</p><p><a href="${confirmUrl}">${confirmUrl}</a></p>`,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Failed to send confirmation email", err);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
