"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle, Sparkles } from "lucide-react";

export default function StartFreeTrial() {
  const [form, setForm] = useState({ name: "", contact: "", role: "", need: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const needs = ["Content", "Admin", "Research", "Sales", "Growth", "Website / Automation"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.need) return;
    setLoading(true);
    // TODO: Integrate with Supabase / Tally / Google Form
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-white font-sans text-stone-900">
      <header className="border-b border-stone-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="font-serif uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[10px] xs:text-[11px] sm:text-[13px] font-bold leading-tight">The Micro Agent Company</Link>
        </div>
      </header>

      <section className="max-w-[580px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight font-normal mb-3">Start with AI agents.</h1>
          <p className="text-stone-500 text-[14px] leading-relaxed">Tell us what you need help with. We'll set up the right agent workflow for you.</p>
        </div>

        {submitted ? (
          <div className="border border-stone-200 rounded-2xl p-6 sm:p-10 text-center bg-[#FAF9F8]">
            <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6"><CheckCircle size={30} className="text-green-600" /></div>
            <h2 className="font-serif text-2xl mb-3">Thank you.</h2>
            <p className="text-stone-500 text-[14px] mb-2">Your request has been received. We will contact you soon with your agent setup details.</p>
            <Link href="/" className="inline-block mt-6 text-[13px] font-bold text-electric-blue underline underline-offset-4">Back to homepage</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-[11px] font-bold tracking-wider uppercase text-stone-400 mb-1.5 block">Name *</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-stone-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none" placeholder="Your name" /></div>
              <div><label className="text-[11px] font-bold tracking-wider uppercase text-stone-400 mb-1.5 block">Email or WhatsApp *</label>
                <input required value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} className="w-full border border-stone-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none" placeholder="email@example.com / +62..." /></div>
            </div>
            <div><label className="text-[11px] font-bold tracking-wider uppercase text-stone-400 mb-1.5 block">Role / Business</label>
              <input value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full border border-stone-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none" placeholder="e.g. Solo founder, creator, UMKM owner" /></div>
            <div><label className="text-[11px] font-bold tracking-wider uppercase text-stone-400 mb-1.5 block">What do you need help with? *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {needs.map(n => <button type="button" key={n} onClick={() => setForm({...form, need: n})} className={`text-left text-sm px-3.5 py-2.5 border rounded-lg transition-all cursor-pointer ${form.need === n ? "border-electric-blue bg-blue-50/50 text-electric-blue font-semibold" : "border-stone-200 text-stone-600 hover:border-stone-400"}`}>{n}</button>)}
              </div>
            </div>
            <button type="submit" disabled={loading || !form.name || !form.contact || !form.need}
              className="w-full bg-black hover:bg-electric-blue disabled:bg-stone-300 text-white text-sm font-semibold py-3.5 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer">
              {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</> : <><Sparkles size={16} /> Join Waitlist</>}
            </button>
            <p className="text-[11px] text-center text-stone-400">Limited early beta for first users. Free during trial.</p>
          </form>
        )}
      </section>
    </main>
  );
}
