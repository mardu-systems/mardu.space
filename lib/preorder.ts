import { prisma } from "@/lib/prisma";

export async function savePreorder(email: string) {
    try {
        await prisma.preorder.upsert({
            where: { email },
            update: {},
            create: { email },
        });
    } catch (err) {
        console.error("Failed to save preorder", err);
    }
}

export async function listPreorders(): Promise<string[]> {
    try {
        const preorders = await prisma.preorder.findMany({
            select: { email: true }
        });
        return preorders.map(p => p.email);
    } catch {
        return [];
    }
}