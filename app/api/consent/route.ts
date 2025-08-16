import { NextResponse } from "next/server";
import {getConsent} from "@/lib/consent";


export async function GET() {
    return NextResponse.json(getConsent());
}