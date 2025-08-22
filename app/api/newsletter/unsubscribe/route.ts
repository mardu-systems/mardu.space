import {NextResponse} from "next/server";
import {removeSubscriber, verifyToken} from "@/lib/newsletter";
import {renderEmailLayout, sendEmail} from "@/lib/email";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const token = searchParams.get("token");
    if (!token) {
        return NextResponse.json({error: "Missing token"}, {status: 400});
    }

    const data = verifyToken(token);
    if (!data || data.role !== "unsubscribe") {
        return NextResponse.json({error: "Invalid token"}, {status: 400});
    }

    await removeSubscriber(data.email);

    try {
        await sendEmail({
            to: data.email,
            subject: "Newsletter Abmeldung",
            text: "Du hast dich erfolgreich vom Newsletter abgemeldet.",
            html: renderEmailLayout(
                "Newsletter Abmeldung",
                "<p>Du hast dich erfolgreich vom Newsletter abgemeldet.</p>"
            ),
        });
    } catch (err) {
        console.error("Failed to send unsubscribe email", err);
    }

    return NextResponse.json({ok: true});
}
