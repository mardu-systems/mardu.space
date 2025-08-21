import { NextResponse } from "next/server";
import { verifyNewsletterToken } from "@/lib/newsletter";
import { sendEmail } from "@/lib/email";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (!token) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }
    const data = verifyNewsletterToken(token);
    if (!data) {
        return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    try {
        await sendEmail({
            subject: "New newsletter subscriber",
            text: `Email: ${data.email}\nRole: ${data.role}`,
        });
    } catch (err) {
        console.error("Failed to notify subscription", err);
    }

    const redirectUrl = new URL("/newsletter/confirmed", url.origin);
    return NextResponse.redirect(redirectUrl);
}
