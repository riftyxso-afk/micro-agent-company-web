import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dokumentasi MicroClaw — Panduan Setup & Integrasi",
  description:
    "Panduan lengkap MicroClaw: setup Telegram bot, koneksi WhatsApp, integrasi Gmail, Google Calendar, Obsidian, dan pengelolaan API keys.",
  robots: { index: true, follow: true },
};

export default function DocsMicroClawLayout({ children }: { children: React.ReactNode }) {
  return children;
}
