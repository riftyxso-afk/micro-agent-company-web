import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ ok: false, error: "Password is required." }, { status: 400 });
    }

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json({ ok: false, error: "Admin password not configured." }, { status: 500 });
    }

    const ok = password === adminPassword;

    return NextResponse.json({ ok });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message }, { status: 500 });
  }
}
