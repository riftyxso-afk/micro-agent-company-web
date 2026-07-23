import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus, type OrderStatus, type PaymentStatus } from "@/lib/orders";

const VALID_STATUSES: OrderStatus[] = ["pending", "confirmed", "scheduled", "completed", "cancelled"];
const VALID_PAYMENT_STATUSES: PaymentStatus[] = ["unpaid", "pending", "paid"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id, status, notes,
      resultLink, resultDescription, resultTutorial,
      dpAmount, dpStatus, dpProof,
      closingAmount, closingStatus, closingProof,
    } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Order ID and status are required." }, { status: 400 });
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    if (dpStatus && !VALID_PAYMENT_STATUSES.includes(dpStatus)) {
      return NextResponse.json({ error: "Invalid dpStatus value." }, { status: 400 });
    }
    if (closingStatus && !VALID_PAYMENT_STATUSES.includes(closingStatus)) {
      return NextResponse.json({ error: "Invalid closingStatus value." }, { status: 400 });
    }

    const order = updateOrderStatus(
      id, status, notes,
      resultLink, resultDescription, resultTutorial,
      dpAmount, dpStatus, dpProof,
      closingAmount, closingStatus, closingProof
    );
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error("Update Order Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
