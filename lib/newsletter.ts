import { createHmac } from "crypto";
import { prisma } from "@/lib/prisma";

function getSecret() {
    const secret = process.env.NEWSLETTER_SECRET;
    if (!secret) {
        throw new Error("Missing newsletter secret");
    }
    return secret;
}

export function createToken(email: string, role: string): string {
    const payload = `${email}:${role}`;
    const signature = createHmac("sha256", getSecret()).update(payload).digest("hex");
    const base64 = Buffer.from(`${payload}:${signature}`).toString("base64");
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function verifyToken(token: string): { email: string; role: string } | null {
    try {
        let base64 = token.replace(/-/g, "+").replace(/_/g, "/");
        const pad = base64.length % 4;
        if (pad) {
            base64 += new Array(5 - pad).join("=");
        }
        const decoded = Buffer.from(base64, "base64").toString("utf8");
        const [email, role, signature] = decoded.split(":");
        const expected = createHmac("sha256", getSecret()).update(`${email}:${role}`).digest("hex");
        if (signature !== expected) return null;
        return {email, role};
    } catch {
        return null;
    }
}

export async function saveSubscriber(sub: { email: string; role: string }) {
    try {
        await prisma.subscriber.upsert({
            where: { email: sub.email },
            update: { role: sub.role },
            create: { email: sub.email, role: sub.role },
        });
    } catch (err) {
        console.error("Failed to save subscriber", err);
    }
}

export async function removeSubscriber(email: string) {
    try {
        await prisma.subscriber.delete({
            where: { email },
        });
    } catch (err) {
        // Ignore if not found, but log other errors
        // Prisma throws P2025 if record not found, which is fine to ignore here if we want idempotent delete
        // But for debugging, we can log it lightly or check code
        console.error("Failed to remove subscriber", err);
    }
}
