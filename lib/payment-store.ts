import fs from "fs";
import path from "path";

export interface PendingPayment {
  orderId: string;
  name: string;
  email: string;
  plan: string;
  amount: number;
  createdAt: string;
}

const STORE_DIR = path.join(process.cwd(), ".payment-store");

function ensureDir() {
  if (!fs.existsSync(STORE_DIR)) {
    fs.mkdirSync(STORE_DIR, { recursive: true });
  }
}

function filePath(orderId: string): string {
  return path.join(STORE_DIR, `${orderId.replace(/[^a-zA-Z0-9_-]/g, "")}.json`);
}

export function storePayment(data: PendingPayment): void {
  ensureDir();
  fs.writeFileSync(filePath(data.orderId), JSON.stringify(data, null, 2));
}

export function getPayment(orderId: string): PendingPayment | null {
  ensureDir();
  const fp = filePath(orderId);
  if (!fs.existsSync(fp)) return null;
  try {
    return JSON.parse(fs.readFileSync(fp, "utf-8"));
  } catch {
    return null;
  }
}

export function deletePayment(orderId: string): void {
  const fp = filePath(orderId);
  if (fs.existsSync(fp)) fs.unlinkSync(fp);
}
