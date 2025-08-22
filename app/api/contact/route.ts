import {NextResponse} from "next/server";
import {z} from "zod";
import {sendContactEmail} from "@/lib/email";

const Schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    company: z.string().optional(),
    message: z.string().optional(),
    config: z.any().optional(),
    token: z.string(),
});

export async function POST(req: Request) {
    const json = await req.json();
    const parsed = Schema.safeParse(json);
    if (!parsed.success) {
        return NextResponse.json({error: "Invalid payload"}, {status: 400});
    }

    try {
        const {token, ...data} = parsed.data;
        const secret = process.env.RECAPTCHA_SECRET_KEY;
        if (!secret) {
            return NextResponse.json({error: "Missing captcha secret"}, {status: 500});
        }
        const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `secret=${secret}&response=${token}`,
        });
        const captchaJson = await captchaRes.json();
        if (!captchaJson.success) {
            return NextResponse.json({error: "Invalid captcha"}, {status: 400});
        }

        await sendContactEmail(data);
        return NextResponse.json({ok: true});
    } catch (err) {
        console.error("Failed to send contact email", err);
        return NextResponse.json({error: "Failed to send email"}, {status: 500});
    }
}
