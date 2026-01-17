import { createHmac } from "crypto";
import { db } from "./db";
import { Subscriber } from "./entities/Subscriber";

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
        return { email, role };
    } catch {
        return null;
    }
}

export async function saveSubscriber(subData: { email: string; role: string }) {
    try {
        if (!db.isInitialized) await db.initialize();
        const repository = db.getRepository(Subscriber);
        
        let subscriber = await repository.findOneBy({ email: subData.email });
        
        if (subscriber) {
            subscriber.role = subData.role;
            await repository.save(subscriber);
        } else {
            subscriber = repository.create({
                email: subData.email,
                role: subData.role
            });
            await repository.save(subscriber);
        }
    } catch (err) {
        console.error("Failed to save subscriber with TypeORM", err);
    }
}

export async function removeSubscriber(email: string) {
    try {
        if (!db.isInitialized) await db.initialize();
        const repository = db.getRepository(Subscriber);
        await repository.delete({ email });
    } catch (err) {
        console.error("Failed to remove subscriber with TypeORM", err);
    }
}