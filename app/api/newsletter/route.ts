import { NextResponse } from "next/server";
import { z } from "zod";

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

    const { token } = parsed.data;
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

    // TODO: handle newsletter subscription with parsed.data.email and parsed.data.role

    return NextResponse.json({ ok: true });
}
