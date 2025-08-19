import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/email";

const Schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    company: z.string().optional(),
    message: z.string().optional(),
    config: z.any().optional(),
});

export async function POST(req: Request) {
    const json = await req.json();
    const parsed = Schema.safeParse(json);
    if (!parsed.success) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true });
}
