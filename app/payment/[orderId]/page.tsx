"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle, Clock, ExternalLink, Loader2, Upload, XCircle } from "lucide-react";

interface Order {
  id: string;
  name: string;
  email: string;
  business: string;
  service: string;
  dpAmount: string;
  dpStatus: string;
  dpProof: string;
  closingAmount: string;
  closingStatus: string;
  closingProof: string;
}

const payStatus: Record<string, { label: string; color: string }> = {
  unpaid:  { label: "Belum Dibayar", color: "bg-stone-100 text-stone-500 border-stone-200" },
  pending: { label: "Menunggu Verifikasi", color: "bg-amber-50 text-amber-600 border-amber-200" },
  paid:    { label: "Lunas", color: "bg-green-50 text-green-600 border-green-200" },
};

export default function PaymentPage() {
  const params = useParams();
  const orderId = (params?.orderId as string) || "";

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [proofType, setProofType] = useState<"dp" | "closing" | null>(null);
  const [proofLink, setProofLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!orderId) return;
    fetch(`/api/orders/track?id=${encodeURIComponent(orderId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.order) setOrder(data.order);
        else setError("Order not found.");
      })
      .catch(() => setError("Failed to load order."))
      .finally(() => setLoading(false));
  }, [orderId]);

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofType || !proofLink) return;
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/payment/submit-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, type: proofType, proofLink }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal submit");
      setOrder(data.order);
      setSuccess(
        proofType === "dp"
          ? "Bukti DP terkirim. Admin akan verifikasi segera."
          : "Bukti Pelunasan terkirim. Admin akan verifikasi segera."
      );
      setProofType(null);
      setProofLink("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-stone-300" />
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
        <div className="text-center">
          <XCircle size={40} className="text-red-400 mx-auto mb-4" />
          <p className="text-stone-600 text-[15px]">{error}</p>
          <Link href="/" className="text-electric-blue text-[13px] hover:underline mt-4 inline-block">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <div className="max-w-[640px] mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-lg font-normal text-stone-900 inline-flex items-center gap-2 mb-4">
            <img src="/logo.svg" alt="" className="h-7 w-7 rounded" />
            The Micro Agent Company
          </Link>
          <h1 className="font-serif text-2xl font-normal mt-2">Payment</h1>
          <p className="font-mono text-[13px] text-stone-400 tracking-wider mt-1">{order?.id}</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-6">
          <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">Order Summary</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[13px]">
            <p className="text-stone-500">Name</p>
            <p className="font-medium text-right">{order?.name}</p>
            <p className="text-stone-500">Service</p>
            <p className="font-medium text-right">{order?.service || "-"}</p>
            <p className="text-stone-500">Business</p>
            <p className="font-medium text-right">{order?.business || "-"}</p>
          </div>
        </div>

        {/* DP Section */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden mb-4">
          <div className="px-6 py-5 flex items-center justify-between border-b border-stone-100">
            <div>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">DP</p>
              <p className="text-[20px] font-bold mt-1">{order?.dpAmount || "-"}</p>
            </div>
            <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${order ? payStatus[order.dpStatus]?.color : ""}`}>
              {order ? payStatus[order.dpStatus]?.label : ""}
            </span>
          </div>

          {order?.dpProof && (
            <div className="px-6 py-3 bg-stone-50/50 flex items-center gap-2 text-[12px] text-stone-500">
              <ExternalLink size={12} />
              <a href={order.dpProof} target="_blank" rel="noopener noreferrer" className="text-electric-blue hover:underline">View Proof</a>
            </div>
          )}

          {order?.dpAmount && order.dpStatus !== "paid" && (
            <div className="px-6 py-4 border-t border-stone-100">
              {proofType === "dp" ? (
                <form onSubmit={handleSubmitProof} className="space-y-3">
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider">Link Bukti Transfer DP</label>
                  <input
                    type="url"
                    value={proofLink}
                    onChange={(e) => setProofLink(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    required
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-[12px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none"
                  />
                  <div className="flex gap-2">
                    <button type="button" onClick={() => { setProofType(null); setProofLink(""); }} className="text-[11px] font-semibold text-stone-500 px-3 py-2 rounded-lg hover:bg-stone-100 transition-all cursor-pointer">Cancel</button>
                    <button type="submit" disabled={submitting} className="bg-pure-black hover:bg-electric-blue disabled:bg-stone-300 text-white text-[11px] font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer">
                      {submitting ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <button onClick={() => setProofType("dp")} className="w-full border border-stone-200 text-stone-600 text-[12px] font-semibold py-2.5 rounded-lg hover:bg-stone-50 transition-all cursor-pointer">
                  Upload Bukti Transfer DP
                </button>
              )}
            </div>
          )}
        </div>

        {/* Closing Section */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden mb-6">
          <div className="px-6 py-5 flex items-center justify-between border-b border-stone-100">
            <div>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Pelunasan</p>
              <p className="text-[20px] font-bold mt-1">{order?.closingAmount || "-"}</p>
            </div>
            <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${order ? payStatus[order.closingStatus]?.color : ""}`}>
              {order ? payStatus[order.closingStatus]?.label : ""}
            </span>
          </div>

          {order?.closingProof && (
            <div className="px-6 py-3 bg-stone-50/50 flex items-center gap-2 text-[12px] text-stone-500">
              <ExternalLink size={12} />
              <a href={order.closingProof} target="_blank" rel="noopener noreferrer" className="text-electric-blue hover:underline">View Proof</a>
            </div>
          )}

          {order?.closingAmount && order.closingStatus !== "paid" && (
            <div className="px-6 py-4 border-t border-stone-100">
              {proofType === "closing" ? (
                <form onSubmit={handleSubmitProof} className="space-y-3">
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider">Link Bukti Transfer Pelunasan</label>
                  <input
                    type="url"
                    value={proofLink}
                    onChange={(e) => setProofLink(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    required
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-[12px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none"
                  />
                  <div className="flex gap-2">
                    <button type="button" onClick={() => { setProofType(null); setProofLink(""); }} className="text-[11px] font-semibold text-stone-500 px-3 py-2 rounded-lg hover:bg-stone-100 transition-all cursor-pointer">Cancel</button>
                    <button type="submit" disabled={submitting} className="bg-pure-black hover:bg-electric-blue disabled:bg-stone-300 text-white text-[11px] font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer">
                      {submitting ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <button onClick={() => setProofType("closing")} className="w-full border border-stone-200 text-stone-600 text-[12px] font-semibold py-2.5 rounded-lg hover:bg-stone-50 transition-all cursor-pointer">
                  Upload Bukti Transfer Pelunasan
                </button>
              )}
            </div>
          )}
        </div>

        {error && <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4 text-[12px] text-red-600">{error}</div>}
        {success && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4 flex items-start gap-3">
            <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
            <p className="text-[12px] text-green-700">{success}</p>
          </div>
        )}

        <div className="text-center">
          <Link href={`/track?id=${orderId}`} className="text-[12px] text-electric-blue hover:underline">Track Order Status →</Link>
        </div>
      </div>
    </main>
  );
}
