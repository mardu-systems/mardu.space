import { NextRequest, NextResponse } from "next/server";
import { createToken, saveSubscriber } from "@/lib/newsletter";
import { sendEmail, renderEmailLayout } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    const { email, firstName, lastName } = formData;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Save subscriber locally (acts as our "database" for now)
    await saveSubscriber({ email, role: "whitepaper_requester" });

    // 2. Generate secure token
    // Token valid for the specific action 'whitepaper_download'
    const token = createToken(email, "whitepaper_download");

    // 3. Construct Download Link
    // Assumes the host is available in headers or env, fallback to localhost for dev
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;
    const downloadLink = `${baseUrl}/api/whitepaper/download?token=${token}`;

    // 4. Send Email
    const subject = "Ihr Whitepaper Download Link";
    const name = firstName || "Interessent";
    
    const htmlContent = `
      <p>Hallo ${name},</p>
      <p>vielen Dank für Ihr Interesse an unserem Whitepaper.</p>
      <p>Klicken Sie auf den folgenden Button, um Ihren Download zu starten:</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="${downloadLink}" style="background-color: #F5C842; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Whitepaper herunterladen</a>
      </p>
      <p>Dieser Link ist speziell für Sie generiert und schützt unsere Inhalte.</p>
      <p>Viele Grüße,<br/>Ihr Mardu.space Team</p>
    `;

    await sendEmail({
      to: email,
      subject,
      html: renderEmailLayout(subject, htmlContent),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Whitepaper request error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
