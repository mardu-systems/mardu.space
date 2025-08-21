import { NextResponse } from "next/server";
import { verifyToken, saveSubscriber, createToken } from "@/lib/newsletter";
import { sendEmail, renderEmailLayout } from "@/lib/email";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    if (!token) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const data = verifyToken(token);
    if (!data) {
        return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    await saveSubscriber(data);

    try {
        const origin = process.env.APP_URL ?? req.headers.get("origin") ?? "";
        const unsubscribeToken = createToken(data.email, "unsubscribe");
        const unsubscribeUrl = `${origin}/api/newsletter/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
        await sendEmail({
            to: data.email,
            subject: "Newsletter Anmeldung bestätigt",
            text: `Vielen Dank für deine Bestätigung! Wenn du den Newsletter nicht mehr erhalten möchtest, kannst du dich hier abmelden: ${unsubscribeUrl}`,
            html: renderEmailLayout(
                "Newsletter Anmeldung bestätigt",
                `<p>Vielen Dank für deine Bestätigung!</p><p>Wenn du den Newsletter nicht mehr erhalten möchtest, kannst du dich <a href="${unsubscribeUrl}">hier abmelden</a>.</p>`
            ),
        });
    } catch (err) {
        console.error("Failed to send confirmation email", err);
    }

    return NextResponse.json({ ok: true });
}
