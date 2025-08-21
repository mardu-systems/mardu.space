import crypto from "crypto";

const secret = process.env.NEWSLETTER_SECRET;

if (!secret) {
    throw new Error("Missing newsletter secret");
}
const SECRET = secret;

export function createNewsletterToken(email: string, role: string) {
    const payload = `${email}:${role}`;
    const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
    return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function verifyNewsletterToken(token: string): { email: string; role: string } | null {
    try {
        const decoded = Buffer.from(token, "base64url").toString("utf8");
        const [email, role, sig] = decoded.split(":");
        if (!email || !role || !sig) return null;
        const expected = crypto.createHmac("sha256", SECRET).update(`${email}:${role}`).digest("hex");
        if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
            return null;
        }
        return { email, role };
    } catch {
        return null;
    }
}
