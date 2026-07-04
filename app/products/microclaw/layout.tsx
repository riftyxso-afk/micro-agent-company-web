import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MicroClaw — AI Assistant 24/7 untuk Bisnis & UMKM Indonesia",
  description:
    "OpenClaw managed hosting: AI assistant via WhatsApp & Telegram. Setup otomatis, integrasi Gmail & Calendar, Second Brain. Mulai Rp 150rb/bln.",
  openGraph: {
    title: "MicroClaw — AI Assistant 24/7 untuk Bisnis & UMKM Indonesia",
    description:
      "OpenClaw managed hosting: AI assistant via WhatsApp & Telegram. Setup otomatis, integrasi Gmail & Calendar. Mulai Rp 150rb/bln.",
  },
  twitter: {
    title: "MicroClaw — AI Assistant 24/7 untuk Bisnis & UMKM Indonesia",
    description:
      "OpenClaw managed hosting: AI assistant via WhatsApp & Telegram. Setup otomatis, integrasi Gmail & Calendar. Mulai Rp 150rb/bln.",
  },
};

export default function MicroClawLayout({ children }: { children: React.ReactNode }) {
  return children;
}
