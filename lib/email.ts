export async function sendEmail({subject, text, to}: {subject: string; text: string; to?: string}) {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;
    const recipient = to ?? process.env.EMAIL_TO;

    if (!apiKey || !from || !recipient) {
        throw new Error("Email service not configured");
    }

    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from,
            to: recipient,
            subject,
            text,
        }),
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

    await sendEmail({subject: "New configurator request", text: lines.join("\n\n")});
}
