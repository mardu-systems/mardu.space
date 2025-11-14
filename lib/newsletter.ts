import {createHmac} from "crypto";
import {promises as fs} from "node:fs";
import path from "node:path";

import {dataPath} from "@/lib/data-dir";

const SUBSCRIBERS_FILE = dataPath("newsletter.json");

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
        let subs: { email: string; role: string }[] = [];
        try {
            const data = await fs.readFile(SUBSCRIBERS_FILE, "utf8");
            subs = JSON.parse(data);
        } catch {
        }
        if (!subs.find((s) => s.email === sub.email)) {
            subs.push(sub);
            await fs.mkdir(path.dirname(SUBSCRIBERS_FILE), {recursive: true});
            await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subs, null, 2));
        }
    } catch (err) {
        console.error("Failed to save subscriber", err);
    }
}

export async function removeSubscriber(email: string) {
    try {
        const data = await fs.readFile(SUBSCRIBERS_FILE, "utf8");
        const subs: { email: string; role: string }[] = JSON.parse(data);
        const filtered = subs.filter((s) => s.email !== email);
        await fs.mkdir(path.dirname(SUBSCRIBERS_FILE), {recursive: true});
        await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(filtered, null, 2));
    } catch (err) {
        console.error("Failed to remove subscriber", err);
    }
}
