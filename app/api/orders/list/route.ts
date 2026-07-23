import { NextResponse } from "next/server";
import { getAllOrders } from "@/lib/orders";

export async function GET() {
  try {
    const orders = getAllOrders();
    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error("List Orders Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
