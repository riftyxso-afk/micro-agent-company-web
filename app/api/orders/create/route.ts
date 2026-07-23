import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";

async function notifyAdmin(order: {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  business: string;
  service: string;
  budget: string;
  message: string;
  recommendation: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.log("[ADMIN NOTIFY] No ADMIN_EMAIL set. Skipping notification.");
    return;
  }

  const smtpPass = process.env.MICROCLAW_SMTP_PASS;
  if (!smtpPass) {
    console.log("[ADMIN NOTIFY] No SMTP configured. Order summary:");
    console.log(JSON.stringify(order, null, 2));
    return;
  }

  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: process.env.MICROCLAW_SMTP_SERVER || "smtp.sendgrid.net",
      port: parseInt(process.env.MICROCLAW_SMTP_PORT || "587", 10),
      secure: parseInt(process.env.MICROCLAW_SMTP_PORT || "587", 10) === 465,
      auth: {
        user: process.env.MICROCLAW_SMTP_USER || "apikey",
        pass: smtpPass,
      },
    });

    const summary = `
ORDER BARU — ${order.id}

Nama: ${order.name}
Email: ${order.email}
WhatsApp: ${order.whatsapp || "-"}
Bisnis: ${order.business || "-"}
Layanan: ${order.service || "-"}
Budget: ${order.budget || "-"}
Pesan: ${order.message || "-"}

Link Admin: ${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/admin/orders
`.trim();

    await transporter.sendMail({
      from: `"TMAC Orders" <${process.env.MICROCLAW_FROM || "noreply@microclaw.com"}>`,
      to: adminEmail,
      subject: `[TMAC] Order Baru — ${order.id} — ${order.name}`,
      text: summary,
    });

    console.log("[ADMIN NOTIFY] Email sent to", adminEmail);
  } catch (err) {
    console.error("[ADMIN NOTIFY] Failed to send email:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, whatsapp, business, service, budget, message, recommendation, dpAmount, closingAmount } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const order = createOrder({
      name,
      email,
      whatsapp: whatsapp || "",
      business: business || "",
      service: service || "",
      budget: budget || "",
      message: message || "",
      recommendation: recommendation || "",
      dpAmount: dpAmount || "",
      closingAmount: closingAmount || "",
    });

    notifyAdmin(order);

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error("Create Order Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
