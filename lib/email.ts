export async function sendEmail({
    subject,
    text,
    html,
    to,
    replyTo,
}: {
    subject: string;
    text?: string;
    html?: string;
    to?: string;
    replyTo?: string | string[];
}) {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;
    const recipient = to ?? process.env.EMAIL_TO;

    if (!apiKey || !from || !recipient) {
        throw new Error("Email service not configured");
    }

    const body: Record<string, unknown> = {
        from,
        to: recipient,
        subject,
    };

    if (text) body.text = text;
    if (html) body.html = html;
    if (replyTo) body.reply_to = replyTo;

    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to send email: ${res.status} ${errText}`);
    }
}

export async function sendContactEmail(data: {
    name: string;
    email: string;
    company?: string;
    message?: string;
    config?: unknown;
}) {
    const lines = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.company ? `Company: ${data.company}` : "",
        data.message ? `Message: ${data.message}` : "",
        data.config ? `Config:\n${JSON.stringify(data.config, null, 2)}` : "",
    ].filter(Boolean);

    await sendEmail({
        subject: "New configurator request",
        text: lines.join("\n\n"),
        replyTo: data.email,
    });
}
