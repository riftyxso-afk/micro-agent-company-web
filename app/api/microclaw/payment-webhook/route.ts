import { NextRequest, NextResponse } from "next/server";
import { getPayment, deletePayment } from "@/lib/payment-store";
import { sendWelcomeEmail } from "@/lib/email";

const planNames: Record<string, string> = {
  starter: "Starter",
  pro: "Pro",
  business: "Business",
};

const planPrices: Record<string, number> = {
  starter: 150000,
  pro: 300000,
  business: 500000,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { order_id: orderId, status, amount } = body;

    console.log("[PAYMENT WEBHOOK] Received:", JSON.stringify(body));

    if (status !== "completed") {
      return NextResponse.json({ message: "Ignored non-completed payment" });
    }

    const projectSlug = process.env.PAKASIR_PROJECT;
    if (!projectSlug || body.project !== projectSlug) {
      return NextResponse.json({ error: "Invalid project" }, { status: 400 });
    }

    const payment = getPayment(orderId);
    if (!payment) {
      console.warn(`[PAYMENT WEBHOOK] No pending payment found for order ${orderId}`);
      return NextResponse.json({ error: "Unknown order" }, { status: 404 });
    }

    console.log(`[PAYMENT WEBHOOK] Payment completed: order=${orderId}, amount=${amount}, user=${payment.email}`);

    const userName = payment.name;
    const userEmail = payment.email;
    const plan = payment.plan;
    const tierName = planNames[plan] || plan;
    const tierPrice = `Rp ${(planPrices[plan] || amount).toLocaleString("id-ID")}`;

    const vpsIp = "";
    const gatewayToken = "";

    try {
      const { exec } = await import("child_process");
      const { promisify } = await import("util");
      const execAsync = promisify(exec);

      execAsync(
        `bash "${process.cwd()}/scripts/provision-vps.sh" 2>&1`,
        {
          env: {
            ...process.env,
            USER_EMAIL: userEmail,
            USER_NAME: userName,
            TIER: plan,
          },
          timeout: 5 * 60 * 1000,
        }
      )
        .then(async ({ stdout }) => {
          console.log(`[PROVISION] Completed for ${orderId}.`);

          const ipMatch = stdout.match(/VPS_IP=([0-9.]+)/);
          const tokenMatch = stdout.match(/GATEWAY_TOKEN=(\S+)/);
          const finalIp = ipMatch?.[1] || "";
          const finalToken = tokenMatch?.[1] || "";

          await sendWelcomeEmail({
            email: userEmail,
            name: userName,
            tierName,
            tierPrice,
            vpsIp: finalIp,
            gatewayToken: finalToken,
            dashboardUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/dashboard/microclaw`,
            docsUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/docs/microclaw`,
          });

          deletePayment(orderId);
        })
        .catch((err) => {
          console.error(`[PROVISION] Failed for ${orderId}:`, err.message);
        });
    } catch (execErr) {
      console.error("[PAYMENT WEBHOOK] Trigger provision error:", execErr);
    }

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (supabaseUrl && supabaseKey) {
        const { createClient } = require("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);

        await supabase.from("payments").upsert(
          {
            order_id: orderId,
            email: userEmail,
            name: userName,
            plan,
            amount,
            status: "completed",
            completed_at: body.completed_at || new Date().toISOString(),
          },
          { onConflict: "order_id" }
        );
      }
    } catch (dbErr) {
      console.error("[PAYMENT WEBHOOK] DB error:", dbErr);
    }

    return NextResponse.json({ message: "Webhook processed" });
  } catch (error) {
    console.error("[PAYMENT WEBHOOK] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
