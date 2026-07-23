"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";
import { CheckCircle, Clock, ExternalLink, ListOrdered, Loader2, RefreshCw, TrendingUp, Users, XCircle } from "lucide-react";

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
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  scheduled: "bg-indigo-100 text-indigo-700 border-indigo-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [newOrderCount, setNewOrderCount] = useState(0);

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
  }, []);

  useEffect(() => {
    const lastSeen = localStorage.getItem("tmc_admin_last_seen");
    if (!lastSeen) {
      localStorage.setItem("tmc_admin_last_seen", new Date().toISOString());
      setNewOrderCount(0);
      return;
    }
    if (orders.length === 0) {
      setNewOrderCount(0);
      return;
    }
    const cutoff = new Date(lastSeen).getTime();
    const count = orders.filter((o) => new Date(o.createdAt).getTime() > cutoff).length;
    setNewOrderCount(count);
  }, [orders]);

  const markAsSeen = () => {
    localStorage.setItem("tmc_admin_last_seen", new Date().toISOString());
    setNewOrderCount(0);
  };

  const total = orders.length;
  const pending = orders.filter((o) => o.status === "pending").length;
  const completed = orders.filter((o) => o.status === "completed").length;
  const cancelled = orders.filter((o) => o.status === "cancelled").length;
  const inProgress = orders.filter((o) => o.status === "confirmed" || o.status === "scheduled").length;
  const completedOrders = orders.filter((o) => o.status === "completed");
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const serviceCount: Record<string, number> = {};
  orders.forEach((o) => {
    if (o.service) {
      serviceCount[o.service] = (serviceCount[o.service] || 0) + 1;
    }
  });
  const topServices = Object.entries(serviceCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const monthlyData: Record<string, number> = {};
  orders.forEach((o) => {
    const month = new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    monthlyData[month] = (monthlyData[month] || 0) + 1;
  });

  return (
    <AdminGuard><main className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-2xl font-normal">Dashboard</h1>
            <p className="text-stone-500 text-[13px] mt-1">Order results & performance overview</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/orders"
              className="border border-stone-200 bg-white text-stone-600 text-[12px] font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-stone-50 transition-all"
            >
              <ListOrdered size={14} /> All Orders
            </Link>
            <button
              onClick={fetchOrders}
              className="border border-stone-200 bg-white text-stone-600 text-[12px] font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-stone-50 transition-all cursor-pointer"
            >
              <RefreshCw size={14} /> Refresh
            </button>
            <Link href="/" className="text-[12px] text-stone-500 hover:text-stone-800 underline">
              Back to site
            </Link>
          </div>
        </div>

        {newOrderCount > 0 && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
                <span className="text-[14px] font-bold text-blue-600">{newOrderCount}</span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-blue-800">
                  {newOrderCount === 1 ? "1 new order received" : `${newOrderCount} new orders received`}
                </p>
                <Link href="/admin/orders" className="text-[11px] text-blue-600 hover:underline">
                  View orders →
                </Link>
              </div>
            </div>
            <button
              onClick={markAsSeen}
              className="text-blue-400 hover:text-blue-600 text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-100/50 transition-all cursor-pointer shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-24">
            <Loader2 size={32} className="animate-spin text-stone-300 mx-auto mb-4" />
            <p className="text-stone-400 text-[13px]">Loading dashboard...</p>
          </div>
        ) : total === 0 ? (
          <div className="text-center py-24 bg-white border border-stone-200 rounded-2xl">
            <p className="text-stone-400 text-[14px]">No orders yet. Orders will appear here once clients submit the booking form.</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border border-stone-200 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center mb-3">
                  <TrendingUp size={18} className="text-stone-500" />
                </div>
                <p className="text-[28px] font-bold text-stone-900">{total}</p>
                <p className="text-[11px] text-stone-500 font-medium mt-1">Total Orders</p>
              </div>
              <div className="bg-white border border-stone-200 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-3">
                  <Clock size={18} className="text-amber-500" />
                </div>
                <p className="text-[28px] font-bold text-stone-900">{pending}</p>
                <p className="text-[11px] text-stone-500 font-medium mt-1">Pending</p>
              </div>
              <div className="bg-white border border-stone-200 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center mb-3">
                  <CheckCircle size={18} className="text-green-500" />
                </div>
                <p className="text-[28px] font-bold text-stone-900">{completed}</p>
                <p className="text-[11px] text-stone-500 font-medium mt-1">Completed</p>
              </div>
              <div className="bg-white border border-stone-200 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-3">
                  <XCircle size={18} className="text-red-400" />
                </div>
                <p className="text-[28px] font-bold text-stone-900">{cancelled}</p>
                <p className="text-[11px] text-stone-500 font-medium mt-1">Cancelled</p>
              </div>
            </div>

            {/* Completion Rate + Services */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-stone-200 rounded-2xl p-6">
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-4">Completion Rate</p>
                <div className="flex items-end gap-3 mb-3">
                  <p className="text-[36px] font-bold text-stone-900">{completionRate}%</p>
                  <p className="text-[13px] text-stone-500 mb-2">of {total} orders</p>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${completionRate}%` }} />
                </div>
                <p className="text-[11px] text-stone-400 mt-2">
                  {inProgress} orders currently in progress
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl p-6">
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-4">Monthly Orders</p>
                <div className="space-y-2.5">
                  {Object.entries(monthlyData).reverse().slice(0, 6).map(([month, count]) => {
                    const maxCount = Math.max(...Object.values(monthlyData), 1);
                    const pct = (count / maxCount) * 100;
                    return (
                      <div key={month} className="flex items-center gap-3">
                        <p className="text-[11px] text-stone-500 w-14 shrink-0">{month}</p>
                        <div className="flex-1 h-5 bg-stone-100 rounded-full overflow-hidden">
                          <div className="h-full bg-electric-blue rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <p className="text-[12px] font-semibold text-stone-700 w-6 text-right">{count}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl p-6">
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-4">Top Services</p>
                <div className="space-y-3">
                  {topServices.map(([service, count]) => {
                    const maxCount = topServices[0]?.[1] || 1;
                    const pct = (count / maxCount) * 100;
                    return (
                      <div key={service}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[12px] text-stone-700 truncate pr-2">{service}</p>
                          <p className="text-[12px] font-semibold text-stone-500">{count}</p>
                        </div>
                        <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <div className="h-full bg-electric-blue rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Completed Orders with Results */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg font-normal">Completed Orders & Results</h2>
                <p className="text-[12px] text-stone-500">{completedOrders.length} completed</p>
              </div>
              {completedOrders.length === 0 ? (
                <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center">
                  <p className="text-stone-400 text-[14px]">No completed orders yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {completedOrders.map((order) => (
                    <div key={order.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
                      <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                            <CheckCircle size={18} className="text-green-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-[13px] tracking-wider">{order.id}</span>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[order.status]}`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-stone-600 text-[12px] mt-0.5">
                              {order.name} &middot; {order.service || "-"}
                            </p>
                          </div>
                        </div>
                        <p className="text-[11px] text-stone-400 shrink-0">
                          {new Date(order.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      </div>

                      {(order.resultLink || order.resultDescription) && (
                        <div className="border-t border-stone-100 bg-green-50/30 px-5 py-4">
                          {order.resultDescription && (
                            <p className="text-[13px] text-stone-700 leading-relaxed mb-2">{order.resultDescription}</p>
                          )}
                          {order.resultLink && (
                            <a
                              href={order.resultLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-electric-blue hover:text-stone-900 transition-colors"
                            >
                              <ExternalLink size={13} /> View Result
                            </a>
                          )}
                        </div>
                      )}

                      {!order.resultLink && !order.resultDescription && (
                        <div className="border-t border-stone-100 px-5 py-3">
                          <p className="text-[11px] text-stone-400 italic">No result data attached.</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main></AdminGuard>
  );
}
