import { NextRequest, NextResponse } from "next/server";
import { getOrderById, updateOrderStatus } from "@/lib/orders";
import type { Order } from "@/lib/orders";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, type, proofLink } = body;

    if (!orderId || !type || !proofLink) {
      return NextResponse.json({ error: "orderId, type, and proofLink are required." }, { status: 400 });
    }

    if (type !== "dp" && type !== "closing") {
      return NextResponse.json({ error: "type must be 'dp' or 'closing'." }, { status: 400 });
    }

    const existing = getOrderById(orderId);
    if (!existing) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const amount = type === "dp" ? existing.dpAmount : existing.closingAmount;
    if (!amount) {
      return NextResponse.json({ error: `No ${type === "dp" ? "DP" : "Closing"} amount set for this order.` }, { status: 400 });
    }

    const update: Partial<Order> = {
      status: existing.status,
    };
    if (type === "dp") {
      (update as any).dpProof = proofLink;
      (update as any).dpStatus = "pending";
    } else {
      (update as any).closingProof = proofLink;
      (update as any).closingStatus = "pending";
    }

    const order = updateOrderStatus(
      orderId, existing.status, undefined,
      undefined, undefined, undefined,
      type === "dp" ? undefined : undefined,
      type === "dp" ? "pending" as any : undefined,
      type === "dp" ? proofLink : undefined,
      type === "closing" ? undefined : undefined,
      type === "closing" ? "pending" as any : undefined,
      type === "closing" ? proofLink : undefined,
    );

    if (!order) {
      return NextResponse.json({ error: "Failed to update order." }, { status: 500 });
    }

    return NextResponse.json({ order, message: "Proof submitted. Waiting for admin verification." });
  } catch (error: any) {
    console.error("Submit Proof Error:", error);
    return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
  }
}
