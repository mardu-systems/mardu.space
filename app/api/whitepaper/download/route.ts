import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/newsletter";
import fs from "node:fs";
import path from "node:path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  // 1. Verify Token
  const payload = verifyToken(token);
  
  // We check if payload exists AND if the role matches what we expect
  if (!payload || payload.role !== "whitepaper_download") {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
  }

  // 2. Locate File
  // In a real app, this might be in an S3 bucket or a protected directory
  const filePath = path.join(process.cwd(), "assets/secure/whitepaper_v1.0.pdf");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found on server" }, { status: 404 });
  }

  // 3. Stream File
  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Mardu_space_Whitepaper_2026_v1.0.pdf"',
    },
  });
}
