"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle, Mail, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("order_id") || "";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f0] p-8">
      <div className="w-full max-w-lg rounded-[12px] border border-black/5 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>

        <h1 className="mt-6 text-2xl font-medium tracking-[-0.02em]">Pembayaran Berhasil! 🎉</h1>
        <p className="mt-2 text-sm text-[#1a1a1a]/60">
          Terima kasih! Tim kami sedang memprovisi VPS & OpenClaw untuk kamu.
        </p>

        {orderId && (
          <p className="mt-4 text-xs text-[#1a1a1a]/40">
            Order ID: <span className="font-mono text-[#1a1a1a]/70">{orderId}</span>
          </p>
        )}

        <div className="mt-8 space-y-4 text-left">
          <div className="rounded-[8px] border border-black/5 bg-[#fafaf7] p-4">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#1a1a1a]/50" />
              <div>
                <p className="text-sm font-medium">Cek Email Kamu</p>
                <p className="mt-0.5 text-xs text-[#1a1a1a]/50">
                  Credentials VPS + OpenClaw + panduan setup akan dikirim dalam 5-10 menit. Cek inbox dan folder spam.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[8px] border border-black/5 bg-[#fafaf7] p-4">
            <div className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#1a1a1a]/50" />
              <div>
                <p className="text-sm font-medium">Butuh Bantuan?</p>
                <p className="mt-0.5 text-xs text-[#1a1a1a]/50">
                  Gabung grup Telegram kami untuk support cepat:{" "}
                  <a
                    href="https://t.me/microclaw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0000EE] underline"
                  >
                    t.me/microclaw
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Link
            href="/docs/microclaw"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1a1a1a] text-sm text-white transition hover:bg-[#0000EE]"
          >
            Lihat Panduan Setup <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/products/microclaw"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-black/10 text-sm text-[#1a1a1a] transition hover:bg-black/5"
          >
            Kembali ke MicroClaw
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f5f5f0] p-8">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#1a1a1a] border-t-transparent" />
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
