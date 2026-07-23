import fs from "fs";
import path from "path";

export type OrderStatus = "pending" | "confirmed" | "scheduled" | "completed" | "cancelled";

export type PaymentStatus = "unpaid" | "pending" | "paid";

export interface Order {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  business: string;
  service: string;
  budget: string;
  message: string;
  recommendation: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  notes: string;
  resultLink: string;
  resultDescription: string;
  resultTutorial: string;
  dpAmount: string;
  dpStatus: PaymentStatus;
  dpProof: string;
  closingAmount: string;
  closingStatus: PaymentStatus;
  closingProof: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, "[]", "utf-8");
  }
}

function readOrders(): Order[] {
  ensureDataDir();
  const raw = fs.readFileSync(ORDERS_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeOrders(orders: Order[]) {
  ensureDataDir();
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

export function generateOrderId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TMAC-${code}`;
}

export function createOrder(
  data: Omit<Order, "id" | "status" | "createdAt" | "updatedAt" | "notes" | "resultLink" | "resultDescription" | "resultTutorial" | "dpAmount" | "dpStatus" | "dpProof" | "closingAmount" | "closingStatus" | "closingProof"> & { dpAmount?: string; closingAmount?: string }
): Order {
  const orders = readOrders();
  const order: Order = {
    ...data,
    id: generateOrderId(),
    status: "pending",
    notes: "",
    resultLink: "",
    resultDescription: "",
    resultTutorial: "",
    dpAmount: data.dpAmount || "",
    dpStatus: data.dpAmount ? "unpaid" : "unpaid",
    dpProof: "",
    closingAmount: data.closingAmount || "",
    closingStatus: data.closingAmount ? "unpaid" : "unpaid",
    closingProof: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  while (orders.some((o) => o.id === order.id)) {
    order.id = generateOrderId();
  }
  orders.push(order);
  writeOrders(orders);
  return order;
}

export function getAllOrders(): Order[] {
  return readOrders().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getOrderById(id: string): Order | undefined {
  return readOrders().find((o) => o.id === id);
}

export function updateOrderStatus(
  id: string,
  status: OrderStatus,
  notes?: string,
  resultLink?: string,
  resultDescription?: string,
  resultTutorial?: string,
  dpAmount?: string,
  dpStatus?: PaymentStatus,
  dpProof?: string,
  closingAmount?: string,
  closingStatus?: PaymentStatus,
  closingProof?: string
): Order | undefined {
  const orders = readOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return undefined;
  orders[index].status = status;
  orders[index].updatedAt = new Date().toISOString();
  if (notes !== undefined) orders[index].notes = notes;
  if (resultLink !== undefined) orders[index].resultLink = resultLink;
  if (resultDescription !== undefined) orders[index].resultDescription = resultDescription;
  if (resultTutorial !== undefined) orders[index].resultTutorial = resultTutorial;
  if (dpAmount !== undefined) orders[index].dpAmount = dpAmount;
  if (dpStatus !== undefined) orders[index].dpStatus = dpStatus;
  if (dpProof !== undefined) orders[index].dpProof = dpProof;
  if (closingAmount !== undefined) orders[index].closingAmount = closingAmount;
  if (closingStatus !== undefined) orders[index].closingStatus = closingStatus;
  if (closingProof !== undefined) orders[index].closingProof = closingProof;
  writeOrders(orders);
  return orders[index];
}
