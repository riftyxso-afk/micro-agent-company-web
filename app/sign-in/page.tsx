"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck, Sparkles } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setLoading(true);
    // TODO: connect auth provider / Supabase magic link.
    await new Promise(r => setTimeout(r, 900));
    setSent(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-white font-sans text-stone-900 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-top bg-cover bg-no-repeat opacity-70 pointer-events-none"
        style={{ backgroundImage: "url('/pricing.png')" }}
      />
      <div className="absolute inset-0 z-0 bg-white/60 pointer-events-none" />

      <header className="relative z-10 border-b border-stone-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="font-serif uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[10px] xs:text-[11px] sm:text-[13px] font-bold leading-tight">The Micro Agent Company</Link>
          <Link href="/start-free-trial" className="hidden sm:inline-flex text-[12px] font-semibold bg-black text-white px-5 py-2 rounded-full hover:bg-electric-blue transition-colors">Start free trial</Link>
        </div>
      </header>

      <section className="relative z-10 max-w-[580px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={30} className="text-electric-blue" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-electric-blue mb-4">Sign in</p>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight font-normal mb-3">Access your agent workspace.</h1>
          <p className="text-stone-600 text-[14px] leading-relaxed font-medium">Use your email to request a secure magic link for your Micro Agent dashboard.</p>
        </div>

        {sent ? (
          <div className="border border-stone-200 rounded-2xl p-6 sm:p-10 text-center bg-white/90 backdrop-blur-sm shadow-sm">
            <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={30} className="text-green-600" />
            </div>
            <h2 className="font-serif text-2xl mb-3">Check your email.</h2>
            <p className="text-stone-500 text-[14px] mb-2">Magic link request received for <span className="font-semibold text-stone-800">{email}</span>.</p>
            <p className="text-stone-400 text-[12px]">Auth provider integration can be connected later.</p>
            <Link href="/" className="inline-block mt-6 text-[13px] font-bold text-electric-blue underline underline-offset-4">Back to homepage</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-2xl p-5 sm:p-8 shadow-sm">
            <div>
              <label className="text-[11px] font-bold tracking-wider uppercase text-stone-400 mb-1.5 block">Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-stone-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none bg-white"
                placeholder="you@example.com"
              />
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 flex gap-3">
              <Sparkles size={18} className="text-electric-blue shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-semibold text-stone-800 mb-1">Secure magic link</p>
                <p className="text-[12px] leading-relaxed text-stone-500">No password needed. Sign-in flow ready for Supabase or other auth provider.</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email.includes("@")}
              className="w-full bg-black hover:bg-electric-blue disabled:bg-stone-300 text-white text-sm font-semibold py-3.5 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</> : <>Continue <ArrowRight size={15} /></>}
            </button>

            <p className="text-[11px] text-center text-stone-400">
              No account yet? <Link href="/start-free-trial" className="text-electric-blue font-bold">Start free trial</Link>
            </p>
          </form>
        )}
      </section>
    </main>
  );
}
