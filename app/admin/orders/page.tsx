"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";
import { CheckCircle, DollarSign, ExternalLink, LayoutDashboard, Loader2, RefreshCw, Search, ShieldCheck, X } from "lucide-react";

interface Order {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  business: string;
  service: string;
  budget: string;
  message: string;
  recommendation: string;
  status: string;
  notes: string;
  resultLink: string;
  resultDescription: string;
  resultTutorial: string;
  createdAt: string;
  updatedAt: string;
  dpAmount: string;
  dpStatus: string;
  dpProof: string;
  closingAmount: string;
  closingStatus: string;
  closingProof: string;
}

const statusLabels: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  scheduled: "Scheduled",
  completed: "Completed",
  cancelled: "Cancelled",
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  scheduled: "bg-indigo-100 text-indigo-700 border-indigo-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [resultForm, setResultForm] = useState<Record<string, { resultLink: string; resultDescription: string; resultTutorial: string }>>({});

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders/list");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    localStorage.setItem("tmc_admin_last_seen", new Date().toISOString());
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const resultData = resultForm[id];
    const payload: any = { id, status: newStatus };
    if (newStatus === "completed" && resultData?.resultLink) {
      payload.resultLink = resultData.resultLink;
      payload.resultDescription = resultData.resultDescription || "";
      payload.resultTutorial = resultData.resultTutorial || "";
    }
    try {
      const res = await fetch("/api/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? data.order : o))
        );
        setResultForm((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }
    } catch (err) {
      console.error("Failed to update order", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const openResultForm = (order: Order) => {
    setResultForm((prev) => ({
      ...prev,
      [order.id]: {
        resultLink: order.resultLink || "",
        resultDescription: order.resultDescription || "",
        resultTutorial: order.resultTutorial || "",
      },
    }));
  };

  const closeResultForm = (id: string) => {
    setResultForm((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleResultChange = (id: string, field: "resultLink" | "resultDescription" | "resultTutorial", value: string) => {
    setResultForm((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminGuard><main className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="font-serif text-2xl font-normal">Admin — Orders</h1>
              <p className="text-stone-500 text-[13px] mt-1">
                {orders.length} {orders.length === 1 ? "order" : "orders"} total
              </p>
            </div>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-[12px] font-semibold text-electric-blue hover:text-stone-900 transition-colors"
            >
              <LayoutDashboard size={14} /> Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ID, name, email..."
                className="w-56 border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-[12px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none bg-white"
              />
            </div>
            <button
              onClick={fetchOrders}
              className="border border-stone-200 bg-white text-stone-600 text-[12px] font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-stone-50 transition-all cursor-pointer"
            >
              <RefreshCw size={14} /> Refresh
            </button>
            <Link
              href="/"
              className="text-[12px] text-stone-500 hover:text-stone-800 underline"
            >
              Back to site
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-24">
            <Loader2 size={32} className="animate-spin text-stone-300 mx-auto mb-4" />
            <p className="text-stone-400 text-[13px]">Loading orders...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-white border border-stone-200 rounded-2xl">
            <p className="text-stone-400 text-[14px]">
              {search ? "No orders match your search." : "No orders yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => {
              const showResultForm = resultForm[order.id] !== undefined;
              return (
                <div key={order.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
                  <div
                    className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-stone-50/50 transition-colors"
                    onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  >
                    <div className="flex items-start sm:items-center gap-4 min-w-0">
                      <span className="font-mono font-bold text-[13px] tracking-wider shrink-0">{order.id}</span>
                      <div className="min-w-0">
                        <p className="font-medium text-stone-800 text-[13px] truncate">{order.name}</p>
                        <p className="text-stone-400 text-[11px] truncate">{order.email}</p>
                      </div>
                      <span className="hidden sm:inline text-stone-300">|</span>
                      <p className="hidden sm:block text-stone-500 text-[12px]">{order.service || "-"}</p>
                      <span className="hidden sm:inline text-stone-300">|</span>
                      <p className="hidden sm:block text-stone-400 text-[11px] whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${statusColors[order.status] || "bg-stone-100 text-stone-600 border-stone-200"}`}>
                        {statusLabels[order.status] || order.status}
                      </span>
                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {order.status !== "completed" ? (
                          <select
                            value={order.status}
                            onChange={(e) => {
                              if (e.target.value === "completed") {
                                openResultForm(order);
                              } else {
                                handleStatusChange(order.id, e.target.value);
                              }
                            }}
                            disabled={updatingId === order.id}
                            className="border border-stone-200 rounded-lg px-2 py-1.5 text-[11px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none bg-white cursor-pointer"
                          >
                            {Object.entries(statusLabels).map(([val, label]) => (
                              <option key={val} value={val}>{label}</option>
                            ))}
                          </select>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); openResultForm(order); }}
                            className="border border-stone-200 text-stone-500 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg hover:bg-stone-50 transition-all cursor-pointer"
                          >
                            Edit Result
                          </button>
                        )}
                        {updatingId === order.id && (
                          <Loader2 size={14} className="animate-spin text-stone-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Summary */}
                  {expandedId === order.id && (
                    <div className="border-t border-stone-100 bg-stone-50/30 px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[12px]">
                        <div>
                          <span className="text-stone-400 font-medium">Order ID</span>
                          <p className="text-stone-800 font-mono font-bold tracking-wider">{order.id}</p>
                        </div>
                        <div>
                          <span className="text-stone-400 font-medium">Name</span>
                          <p className="text-stone-800">{order.name}</p>
                        </div>
                        <div>
                          <span className="text-stone-400 font-medium">Email</span>
                          <p className="text-stone-800">{order.email}</p>
                        </div>
                        <div>
                          <span className="text-stone-400 font-medium">WhatsApp</span>
                          <p className="text-stone-800">{order.whatsapp || "-"}</p>
                        </div>
                        <div>
                          <span className="text-stone-400 font-medium">Business</span>
                          <p className="text-stone-800">{order.business || "-"}</p>
                        </div>
                        <div>
                          <span className="text-stone-400 font-medium">Service</span>
                          <p className="text-stone-800">{order.service || "-"}</p>
                        </div>
                        <div>
                          <span className="text-stone-400 font-medium">Budget</span>
                          <p className="text-stone-800">{order.budget || "-"}</p>
                        </div>
                        <div>
                          <span className="text-stone-400 font-medium">Status</span>
                          <p><span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[order.status] || "bg-stone-100 text-stone-600 border-stone-200"}`}>{statusLabels[order.status] || order.status}</span></p>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-stone-400 font-medium">Created</span>
                          <p className="text-stone-800">{new Date(order.createdAt).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                        </div>
                        {order.message && (
                          <div className="sm:col-span-2">
                            <span className="text-stone-400 font-medium">Message</span>
                            <p className="text-stone-800 whitespace-pre-line">{order.message}</p>
                          </div>
                        )}
                        {order.recommendation && (
                          <div className="sm:col-span-2">
                            <span className="text-stone-400 font-medium">AI Recommendation</span>
                            <p className="text-stone-700 text-[11px] leading-relaxed whitespace-pre-line bg-white border border-stone-200 rounded-lg p-3 mt-1">{order.recommendation}</p>
                          </div>
                        )}
                        {order.notes && (
                          <div className="sm:col-span-2">
                            <span className="text-stone-400 font-medium">Admin Notes</span>
                            <p className="text-stone-800">{order.notes}</p>
                          </div>
                        )}
                        {order.resultDescription && (
                          <div className="sm:col-span-2">
                            <span className="text-stone-400 font-medium">Result</span>
                            <p className="text-stone-800">{order.resultDescription}</p>
                          </div>
                        )}
                        {order.resultLink && (
                          <div className="sm:col-span-2">
                            <span className="text-stone-400 font-medium">Result Link</span>
                            <a href={order.resultLink} target="_blank" rel="noopener noreferrer" className="text-electric-blue hover:underline text-[12px]">{order.resultLink}</a>
                          </div>
                        )}
                        {order.resultTutorial && (
                          <div className="sm:col-span-2">
                            <span className="text-stone-400 font-medium">Tutorial</span>
                            <p className="text-stone-700 text-[11px] leading-relaxed whitespace-pre-line bg-white border border-stone-200 rounded-lg p-3 mt-1">{order.resultTutorial}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Payment Section */}
                  {expandedId === order.id && (
                    <PaymentSection order={order} onUpdate={(updated) => setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)))} />
                  )}

                  {/* Result Form (for completed orders) */}
                  {showResultForm && (
                    <div className="border-t border-green-200 bg-green-50/50 px-5 py-4 space-y-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold text-green-700 uppercase tracking-wider">
                          <CheckCircle size={12} className="inline mr-1" />
                          COMPLETE ORDER RESULT
                        </p>
                        <button onClick={() => closeResultForm(order.id)} className="text-stone-400 hover:text-stone-600 cursor-pointer">
                          <X size={14} />
                        </button>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                          RESULT ACCESS LINK *
                        </label>
                        <input
                          type="url"
                          value={resultForm[order.id]?.resultLink || ""}
                          onChange={(e) => handleResultChange(order.id, "resultLink", e.target.value)}
                          placeholder="https://drive.google.com/..."
                          className="w-full border border-stone-200 rounded-lg px-3 py-2 text-[12px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none bg-white"
                          required
                        />
                        <p className="text-[10px] text-stone-400 mt-1">
                          Link to the delivered result (Google Drive, website, etc.)
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                          RESULT DESCRIPTION
                        </label>
                        <textarea
                          value={resultForm[order.id]?.resultDescription || ""}
                          onChange={(e) => handleResultChange(order.id, "resultDescription", e.target.value)}
                          rows={2}
                          placeholder="Describe what was delivered..."
                          className="w-full border border-stone-200 rounded-lg px-3 py-2 text-[12px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none resize-none bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                          TUTORIAL & CARA PENGGUNAAN
                        </label>
                        <textarea
                          value={resultForm[order.id]?.resultTutorial || ""}
                          onChange={(e) => handleResultChange(order.id, "resultTutorial", e.target.value)}
                          rows={4}
                          placeholder="Step-by-step instructions on how to use the delivered result..."
                          className="w-full border border-stone-200 rounded-lg px-3 py-2 text-[12px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none resize-none bg-white font-mono text-[11px]"
                        />
                        <p className="text-[10px] text-stone-400 mt-1">
                          Tutorial, panduan, atau catatan penggunaan untuk klien (Markdown supported)
                        </p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => closeResultForm(order.id)}
                          className="text-[11px] font-semibold text-stone-500 px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleStatusChange(order.id, "completed")}
                          disabled={updatingId === order.id || !resultForm[order.id]?.resultLink}
                          className="bg-green-600 hover:bg-green-700 disabled:bg-stone-300 text-white text-[11px] font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          {updatingId === order.id ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                          Save & Complete
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Existing result display */}
                  {order.status === "completed" && !showResultForm && (order.resultLink || order.resultDescription || order.resultTutorial) && (
                    <div className="border-t border-stone-100 bg-green-50/30" onClick={(e) => e.stopPropagation()}>
                      <div className="px-5 py-3 flex items-start gap-3">
                        <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                        <div className="text-[12px] text-stone-600 min-w-0">
                          {order.resultDescription && <p className="mb-1">{order.resultDescription}</p>}
                          {order.resultLink && (
                            <a href={order.resultLink} target="_blank" rel="noopener noreferrer" className="text-electric-blue hover:underline inline-flex items-center gap-1">
                              <ExternalLink size={12} /> {order.resultLink}
                            </a>
                          )}
                        </div>
                      </div>
                      {order.resultTutorial && (
                        <details className="border-t border-green-100/50 group">
                          <summary className="px-5 py-2 text-[11px] font-semibold text-stone-500 hover:text-stone-700 cursor-pointer select-none flex items-center gap-1.5">
                            <svg className="w-3 h-3 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            View Tutorial
                          </summary>
                          <div className="px-5 pb-4 pt-2 text-[12px] text-stone-600 leading-relaxed whitespace-pre-line border-t border-green-100/50">
                            {order.resultTutorial}
                          </div>
                        </details>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main></AdminGuard>
  );
}

const payStatus: Record<string, { label: string; color: string }> = {
  unpaid:  { label: "Unpaid", color: "bg-stone-100 text-stone-500 border-stone-200" },
  pending: { label: "Pending Verify", color: "bg-amber-50 text-amber-600 border-amber-200" },
  paid:    { label: "Paid", color: "bg-green-50 text-green-600 border-green-200" },
};

function PaymentSection({ order, onUpdate }: { order: Order; onUpdate: (o: Order) => void }) {
  const [dpAmt, setDpAmt] = useState(order.dpAmount || "");
  const [closingAmt, setClosingAmt] = useState(order.closingAmount || "");
  const [saving, setSaving] = useState(false);

  const saveAmounts = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: order.id, status: order.status, dpAmount: dpAmt, closingAmount: closingAmt }),
      });
      if (res.ok) {
        const data = await res.json();
        onUpdate(data.order);
      }
    } catch (err) {
      console.error("Failed to save payment amounts", err);
    } finally {
      setSaving(false);
    }
  };

  const verifyPayment = async (type: "dp" | "closing") => {
    setSaving(true);
    try {
      const res = await fetch("/api/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: order.id,
          status: order.status,
          ...(type === "dp" ? { dpStatus: "paid" } : { closingStatus: "paid" }),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        onUpdate(data.order);
      }
    } catch (err) {
      console.error("Failed to verify payment", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border-t border-stone-100 px-5 py-4 space-y-4" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center gap-2">
        <DollarSign size={14} className="text-stone-400" />
        <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Payment</p>
      </div>

      {/* DP */}
      <div className="bg-white border border-stone-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-bold uppercase tracking-wider">DP (Down Payment)</p>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${payStatus[order.dpStatus]?.color || ""}`}>
            {payStatus[order.dpStatus]?.label || order.dpStatus}
          </span>
        </div>
        <input
          type="text"
          value={dpAmt}
          onChange={(e) => setDpAmt(e.target.value)}
          placeholder="Rp 500.000"
          className="w-full border border-stone-200 rounded-lg px-3 py-2 text-[12px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none mb-2"
        />
        {order.dpProof && (
          <div className="flex items-center gap-2 mb-2">
            <ExternalLink size={11} className="text-stone-400" />
            <a href={order.dpProof} target="_blank" rel="noopener noreferrer" className="text-[11px] text-electric-blue hover:underline">View Client Proof</a>
          </div>
        )}
        {order.dpStatus === "pending" && (
          <button onClick={() => verifyPayment("dp")} disabled={saving} className="bg-green-600 hover:bg-green-700 text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer disabled:bg-stone-300">
            {saving ? <Loader2 size={10} className="animate-spin" /> : <ShieldCheck size={12} />}
            Verify DP
          </button>
        )}
      </div>

      {/* Closing */}
      <div className="bg-white border border-stone-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-bold uppercase tracking-wider">Pelunasan (Closing)</p>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${payStatus[order.closingStatus]?.color || ""}`}>
            {payStatus[order.closingStatus]?.label || order.closingStatus}
          </span>
        </div>
        <input
          type="text"
          value={closingAmt}
          onChange={(e) => setClosingAmt(e.target.value)}
          placeholder="Rp 500.000"
          className="w-full border border-stone-200 rounded-lg px-3 py-2 text-[12px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none mb-2"
        />
        {order.closingProof && (
          <div className="flex items-center gap-2 mb-2">
            <ExternalLink size={11} className="text-stone-400" />
            <a href={order.closingProof} target="_blank" rel="noopener noreferrer" className="text-[11px] text-electric-blue hover:underline">View Client Proof</a>
          </div>
        )}
        {order.closingStatus === "pending" && (
          <button onClick={() => verifyPayment("closing")} disabled={saving} className="bg-green-600 hover:bg-green-700 text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer disabled:bg-stone-300">
            {saving ? <Loader2 size={10} className="animate-spin" /> : <ShieldCheck size={12} />}
            Verify Closing
          </button>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveAmounts}
          disabled={saving}
          className="bg-pure-black hover:bg-electric-blue disabled:bg-stone-300 text-white text-[11px] font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
        >
          {saving ? <Loader2 size={12} className="animate-spin" /> : null}
          Save Amounts
        </button>
      </div>
    </div>
  );
}
