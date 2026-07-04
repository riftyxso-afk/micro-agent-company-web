import { NextRequest, NextResponse } from "next/server";
import { storePayment } from "@/lib/payment-store";

const PAKASIR_BASE = "https://app.pakasir.com";

const planTiers: Record<string, { slug: string; price: number }> = {
  starter: { slug: "starter", price: 150000 },
  pro: { slug: "pro", price: 300000 },
  business: { slug: "business", price: 500000 },
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, plan, amount, order_id } = await request.json();

    if (!name || !email || !plan || !amount || !order_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const projectSlug = process.env.PAKASIR_PROJECT;
    const apiKey = process.env.PAKASIR_API_KEY;

    if (!projectSlug || !apiKey) {
      return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
    }

    const tier = planTiers[plan as string];
    if (!tier) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    storePayment({ orderId: order_id, name, email, plan, amount, createdAt: new Date().toISOString() });

    const successRedirect = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/products/microclaw/payment/success?order_id=${order_id}`;

    const paymentUrl = `${PAKASIR_BASE}/pay/${projectSlug}/${amount}?order_id=${order_id}&redirect=${encodeURIComponent(successRedirect)}`;

    return NextResponse.json({ payment_url: paymentUrl, order_id });
  } catch (error) {
    console.error("[CREATE PAYMENT] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
