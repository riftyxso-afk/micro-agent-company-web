"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle, Clock, Download, Loader2, Search, XCircle, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const statusConfig: Record<string, { labelId: string; labelEn: string; color: string; index: number }> = {
  pending:    { labelId: "Menunggu Diproses", labelEn: "Pending",          color: "bg-amber-400",           index: 0 },
  confirmed:  { labelId: "Dikonfirmasi",      labelEn: "Confirmed",        color: "bg-blue-500",            index: 1 },
  scheduled:  { labelId: "Jadwal Ditentukan", labelEn: "Scheduled",        color: "bg-electric-blue",       index: 2 },
  completed:  { labelId: "Selesai",           labelEn: "Completed",        color: "bg-green-500",           index: 3 },
  cancelled:  { labelId: "Dibatalkan",        labelEn: "Cancelled",        color: "bg-red-400",             index: -1 },
};

const steps = ["pending", "confirmed", "scheduled", "completed"] as const;

export default function TrackPage() {
  const { t, locale, setLocale } = useTranslation();
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = orderId.trim().toUpperCase();
    if (!id) return;
    setLoading(true);
    setError("");
    setOrder(null);
    setSearched(true);
    try {
      const res = await fetch(`/api/orders/track?id=${encodeURIComponent(id)}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Order not found");
      }
      const data = await res.json();
      setOrder(data.order);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  const currentIndex = order ? (statusConfig[order.status]?.index ?? -1) : -1;
  const isCancelled = order?.status === "cancelled";

  return (
    <main className="min-h-screen bg-white text-stone-900 font-sans">
      <nav className="border-b border-stone-200 bg-white/60 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="font-serif flex items-center gap-2 sm:gap-3">
            <img src="/logo.svg" alt="The Micro Agent Company" className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-lg" />
            <span className="flex flex-col items-start">
              <span className="text-[9px] sm:text-[10px] italic leading-none text-stone-400 font-medium tracking-tight">{t("nav.the")}</span>
              <span className="text-[11px] sm:text-[14px] uppercase font-bold tracking-[0.14em] sm:tracking-[0.2em] text-stone-900 leading-none">{t("nav.microAgent")}</span>
              <span className="text-[11px] sm:text-[14px] uppercase font-bold tracking-[0.14em] sm:tracking-[0.2em] text-stone-900 leading-none mt-0.5">{t("nav.company")}</span>
            </span>
          </Link>
          <div className="flex items-center space-x-1 border border-stone-200 rounded-[10px] px-2 py-1.5">
            <button onClick={() => setLocale("id")} className={`text-[11px] font-medium px-1.5 py-0.5 rounded transition-all ${locale === "id" ? "bg-pure-black text-white" : "text-stone-500 hover:text-stone-800"}`}>ID</button>
            <span className="text-stone-300 text-[10px]">|</span>
            <button onClick={() => setLocale("en")} className={`text-[11px] font-medium px-1.5 py-0.5 rounded transition-all ${locale === "en" ? "bg-pure-black text-white" : "text-stone-500 hover:text-stone-800"}`}>EN</button>
          </div>
        </div>
      </nav>

      <section className="max-w-[640px] mx-auto px-6 py-16 sm:py-24">
        <div className="text-center mb-10">
          <h1 className="font-serif text-[32px] sm:text-[40px] font-normal mb-3">
            {locale === "id" ? "Lacak Pesanan" : "Track Your Order"}
          </h1>
          <p className="text-stone-500 text-[15px]">
            {locale === "id"
              ? "Masukkan Order ID yang kamu dapatkan setelah booking."
              : "Enter the Order ID you received after booking."}
          </p>
        </div>

        <form onSubmit={handleTrack} className="flex gap-3 mb-10">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value.toUpperCase())}
            placeholder="TMAC-XXXXXX"
            className="flex-1 border border-stone-200 rounded-lg px-4 py-3 text-[14px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none uppercase tracking-wider font-mono"
          />
          <button
            type="submit"
            disabled={loading || !orderId.trim()}
            className="bg-pure-black hover:bg-electric-blue disabled:bg-stone-300 text-white text-[13px] font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all cursor-pointer"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            {locale === "id" ? "Cari" : "Search"}
          </button>
        </form>

        {loading && (
          <div className="text-center py-12">
            <Loader2 size={32} className="animate-spin text-stone-300 mx-auto mb-4" />
            <p className="text-stone-400 text-[13px]">{locale === "id" ? "Mencari..." : "Searching..."}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center">
            <XCircle size={32} className="text-red-400 mx-auto mb-3" />
            <p className="text-red-600 text-[14px] font-medium">{error}</p>
            {searched && (
              <p className="text-stone-400 text-[12px] mt-2">
                {locale === "id"
                  ? "Pastikan Order ID yang dimasukkan benar."
                  : "Make sure the Order ID is correct."}
              </p>
            )}
          </div>
        )}

        {order && !loading && (
          <div className="space-y-8">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                    {locale === "id" ? "ORDER ID" : "ORDER ID"}
                  </p>
                  <p className="font-mono text-[18px] font-bold tracking-wider text-stone-900">{order.id}</p>
                </div>
                <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${
                  order.status === "cancelled" ? "bg-red-50 text-red-500" :
                  order.status === "completed" ? "bg-green-50 text-green-600" :
                  order.status === "pending" ? "bg-amber-50 text-amber-600" :
                  order.status === "scheduled" ? "bg-blue-50 text-electric-blue" :
                  "bg-blue-50 text-blue-600"
                }`}>
                  {locale === "id" ? statusConfig[order.status]?.labelId : statusConfig[order.status]?.labelEn}
                </span>
              </div>

              <div className="border-t border-stone-200 pt-5">
                {isCancelled ? (
                  <div className="flex items-center gap-3 text-red-500 py-4">
                    <XCircle size={20} />
                    <p className="text-[14px] font-medium">
                      {locale === "id" ? "Pesanan ini telah dibatalkan." : "This order has been cancelled."}
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-stone-200" />
                    <div className="space-y-6">
                      {steps.map((s, i) => {
                        const cfg = statusConfig[s];
                        const active = currentIndex >= i;
                        return (
                          <div key={s} className="flex items-start gap-4">
                            <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                              active ? cfg.color + " text-white" : "bg-stone-100 text-stone-400"
                            }`}>
                              {active ? <CheckCircle size={14} /> : <div className="w-2 h-2 rounded-full bg-stone-300" />}
                            </div>
                            <div className="pt-0.5">
                              <p className={`text-[13px] font-semibold ${active ? "text-stone-900" : "text-stone-400"}`}>
                                {locale === "id" ? cfg.labelId : cfg.labelEn}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">
                {locale === "id" ? "DETAIL PESANAN" : "ORDER DETAILS"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[13px]">
                <div>
                  <span className="text-stone-400">{locale === "id" ? "Nama:" : "Name:"}</span>
                  <p className="font-medium text-stone-800">{order.name}</p>
                </div>
                <div>
                  <span className="text-stone-400">Email:</span>
                  <p className="font-medium text-stone-800">{order.email}</p>
                </div>
                {order.whatsapp && (
                  <div>
                    <span className="text-stone-400">WhatsApp:</span>
                    <p className="font-medium text-stone-800">{order.whatsapp}</p>
                  </div>
                )}
                {order.business && (
                  <div>
                    <span className="text-stone-400">{locale === "id" ? "Bisnis:" : "Business:"}</span>
                    <p className="font-medium text-stone-800">{order.business}</p>
                  </div>
                )}
                <div>
                  <span className="text-stone-400">{locale === "id" ? "Layanan:" : "Service:"}</span>
                  <p className="font-medium text-stone-800">{order.service}</p>
                </div>
                {order.budget && (
                  <div>
                    <span className="text-stone-400">{locale === "id" ? "Budget:" : "Budget:"}</span>
                    <p className="font-medium text-stone-800">{order.budget}</p>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <span className="text-stone-400">{locale === "id" ? "Tanggal:" : "Date:"}</span>
                  <p className="font-medium text-stone-800">{new Date(order.createdAt).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                </div>
                {order.message && (
                  <div className="sm:col-span-2">
                    <span className="text-stone-400">{locale === "id" ? "Pesan:" : "Message:"}</span>
                    <p className="font-medium text-stone-800">{order.message}</p>
                  </div>
                )}
                {order.notes && (
                  <div className="sm:col-span-2">
                    <span className="text-stone-400">{locale === "id" ? "Catatan Admin:" : "Admin Notes:"}</span>
                    <p className="font-medium text-stone-800">{order.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {order.status === "completed" && (order.resultLink || order.resultDescription || order.resultTutorial) && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 sm:p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 border border-green-200 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-green-600" />
                </div>
                <h3 className="font-serif text-xl font-normal mb-2">
                  {locale === "id" ? "Pesanan Selesai! 🎉" : "Order Complete! 🎉"}
                </h3>
                {order.resultDescription && (
                  <p className="text-[13px] text-stone-600 leading-relaxed mb-5 max-w-[480px] mx-auto">
                    {order.resultDescription}
                  </p>
                )}
                {order.resultLink && (
                  <a
                    href={order.resultLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-8 py-3 rounded-full transition-all"
                  >
                    <Download size={16} />
                    {locale === "id" ? "Akses Hasil Order" : "Access Your Result"}
                  </a>
                )}
                {order.resultTutorial && (
                  <div className="mt-6 text-left bg-white/60 border border-green-200 rounded-xl p-5">
                    <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {locale === "id" ? "TUTORIAL & CARA PENGGUNAAN" : "TUTORIAL & HOW TO USE"}
                    </p>
                    <div className="text-[13px] text-stone-700 leading-relaxed whitespace-pre-line">
                      {order.resultTutorial}
                    </div>
                  </div>
                )}
              </div>
            )}

            {order.recommendation && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 sm:p-8">
                <p className="text-[10px] font-bold text-electric-blue uppercase tracking-widest mb-3">
                  {locale === "id" ? "REKOMENDASI AI" : "AI RECOMMENDATION"}
                </p>
                <div className="text-[13px] text-stone-700 leading-relaxed whitespace-pre-line">
                  {order.recommendation}
                </div>
              </div>
            )}

            <div className="text-center">
              <Link
                href="/book-a-call"
                className="inline-flex bg-black text-white text-[13px] font-semibold px-8 py-3 rounded-full hover:bg-electric-blue transition-all"
              >
                {locale === "id" ? "Booking Lagi" : "Book Again"}
              </Link>
            </div>
          </div>
        )}

        {!loading && !order && !searched && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-stone-400" />
            </div>
            <p className="text-stone-400 text-[14px]">
              {locale === "id"
                ? "Masukkan Order ID di atas untuk melacak status pesanan."
                : "Enter your Order ID above to track your order status."}
            </p>
          </div>
        )}
      </section>

      <footer className="border-t border-stone-200 bg-[#fafafa] py-8 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-medium text-stone-500">{t("footer.copyright")}</p>
          <div className="flex items-center gap-4 text-[11px] text-stone-500">
            <Link href="/" className="hover:text-stone-800 transition-colors">{locale === "id" ? "Beranda" : "Home"}</Link>
            <Link href="/book-a-call" className="hover:text-stone-800 transition-colors">{locale === "id" ? "Booking" : "Book a Call"}</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
