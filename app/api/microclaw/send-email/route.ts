import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, tierName, tierPrice, vpsIp, gatewayToken } = body;

    if (!email || !name || !tierName || !tierPrice || !vpsIp || !gatewayToken) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    await sendWelcomeEmail({
      email,
      name,
      tierName,
      tierPrice,
      vpsIp,
      gatewayToken,
      dashboardUrl: `${baseUrl}/dashboard/microclaw`,
      docsUrl: `${baseUrl}/docs/microclaw`,
    });

    return NextResponse.json({ message: "Welcome email sent", email });
  } catch (error) {
    console.error("[SEND EMAIL] Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
