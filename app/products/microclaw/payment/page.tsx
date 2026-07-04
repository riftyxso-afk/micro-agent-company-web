"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Check, Copy, ArrowLeft, ExternalLink, Clock, Shield, DollarSign } from "lucide-react";
import Link from "next/link";

const planPrices: Record<string, { label: string; price: number }> = {
  starter: { label: "Starter", price: 150000 },
  pro: { label: "Pro", price: 300000 },
  business: { label: "Business", price: 500000 },
};

function PaymentContent() {
  const params = useSearchParams();
  const name = params.get("name") || "";
  const email = params.get("email") || "";
  const planKey = params.get("plan") || "";

  const [orderId, setOrderId] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const plan = planPrices[planKey] || planPrices.pro;

  useEffect(() => {
    if (!name || !email || !planKey) {
      setError("Data pendaftaran tidak lengkap. Silakan daftar dari halaman utama.");
      setLoading(false);
      return;
    }

    const tid = "MC-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
    setOrderId(tid);

    fetch("/api/microclaw/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        plan: planKey,
        amount: plan.price,
        order_id: tid,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.payment_url) {
          setPaymentUrl(data.payment_url);
        } else {
          setError(data.error || "Gagal membuat pembayaran.");
        }
      })
      .catch(() => setError("Gagal terhubung ke server."))
      .finally(() => setLoading(false));
  }, [name, email, planKey, plan.price]);

  if (!name || !email || !planKey) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f0] p-8">
        <div className="max-w-md rounded-[12px] border border-black/10 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-medium text-red-600">Data tidak lengkap</p>
          <p className="mt-2 text-sm text-[#1a1a1a]/60">{error}</p>
          <Link
            href="/products/microclaw#form"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-[#1a1a1a] px-6 text-sm text-white transition hover:bg-[#0000EE]"
          >
            Kembali ke Pendaftaran
          </Link>
        </div>
      </main>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f0]">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:px-8 sm:py-24">
        <Link
          href="/products/microclaw#form"
          className="mb-8 inline-flex items-center gap-1 text-sm text-[#1a1a1a]/50 transition hover:text-[#1a1a1a]"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Link>

        <div className="rounded-[12px] border border-black/5 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <DollarSign className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <h1 className="text-xl font-medium tracking-[-0.02em]">Pembayaran MicroClaw</h1>
              <p className="text-sm text-[#1a1a1a]/50">Selesaikan pembayaran untuk mengaktifkan layanan</p>
            </div>
          </div>

          <div className="mt-8 rounded-[8px] border border-black/5 bg-[#fafaf7] p-5">
            <div className="flex items-center justify-between border-b border-black/5 pb-3">
              <span className="text-sm text-[#1a1a1a]/60">Paket</span>
              <span className="font-medium">{plan.label}</span>
            </div>
            <div className="flex items-center justify-between border-b border-black/5 py-3">
              <span className="text-sm text-[#1a1a1a]/60">Nama</span>
              <span>{name}</span>
            </div>
            <div className="flex items-center justify-between border-b border-black/5 py-3">
              <span className="text-sm text-[#1a1a1a]/60">Email</span>
              <span>{email}</span>
            </div>
            <div className="flex items-center justify-between pt-3">
              <span className="text-sm text-[#1a1a1a]/60">Order ID</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-sm text-[#0000EE] transition hover:text-[#0000CC]"
              >
                {orderId.slice(0, 16)}...
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-[8px] border border-black/5 bg-[#fafaf7] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#1a1a1a]/60">Total Pembayaran</span>
              <span className="text-2xl font-semibold tracking-[-0.02em]">
                Rp {plan.price.toLocaleString("id-ID")}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#1a1a1a]/40">Sudah termasuk PPN</p>
          </div>

          {error && (
            <div className="mt-4 rounded-[8px] border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
          )}

          <div className="mt-8">
            {loading ? (
              <div className="flex items-center justify-center gap-3 py-6">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#1a1a1a] border-t-transparent" />
                <span className="text-sm text-[#1a1a1a]/60">Menyiapkan halaman pembayaran...</span>
              </div>
            ) : paymentUrl ? (
              <a
                href={paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1a1a1a] text-sm text-white transition hover:bg-[#0000EE]"
              >
                Bayar Sekarang <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>

          <div className="mt-6 space-y-3 rounded-[8px] border border-black/5 bg-blue-50/50 p-4">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Pembayaran Aman</p>
                <p className="text-xs text-blue-700/70">
                  Diproses oleh Pakasir — support QRIS, Virtual Account BCA/BNI/BRI/Mandiri, dan metode lainnya
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Aktivasi Otomatis</p>
                <p className="text-xs text-blue-700/70">
                  VPS & OpenClaw akan diprovisi otomatis begitu pembayaran dikonfirmasi. Dapat email credentials dalam 5-10 menit.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[#1a1a1a]/30">
          Dengan melanjutkan, kamu menyetujui{" "}
          <Link href="/terms" className="underline transition hover:text-[#1a1a1a]/60">Syarat & Ketentuan</Link> dan{" "}
          <Link href="/privacy" className="underline transition hover:text-[#1a1a1a]/60">Kebijakan Privasi</Link>.
        </p>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f5f5f0] p-8">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#1a1a1a] border-t-transparent" />
        </main>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
