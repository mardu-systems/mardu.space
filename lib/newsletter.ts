import {createHmac} from "crypto";
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
    return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

export function verifyToken(token: string): { email: string; role: string } | null {
    try {
        const decoded = Buffer.from(token, "base64url").toString("utf8");
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
            update: {},
            create: {
                email: sub.email,
                role: sub.role,
            },
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
        console.error("Failed to remove subscriber", err);
    }
}