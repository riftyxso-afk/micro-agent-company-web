"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Store, User, GraduationCap, Briefcase, Lightbulb, Building2 } from "lucide-react";

const useCases = [
  { icon: Store, name: "UMKM", desc: "Post consistent content, manage invoices, and reply to customer messages automatically.", needs: ["Content scheduling with SekaliPost", "Invoice automation via AI Admin Agent", "WhatsApp promo templates"] },
  { icon: User, name: "Creators", desc: "Generate hooks, scripts, captions, and carousel outlines in one workflow.", needs: ["AI hooks & caption generator", "14-day content calendar", "Viral script templates"] },
  { icon: Briefcase, name: "Freelancers", desc: "Win proposals with researched outreach and automate follow-ups.", needs: ["Client outreach sequences", "Proposal draft generation", "Invoice follow-up automation"] },
  { icon: GraduationCap, name: "Students", desc: "Organize research with Scout agent and accelerate study workflows.", needs: ["Literature review assistant", "Study note summarizer", "Research organization tools"] },
  { icon: Lightbulb, name: "Solo founders", desc: "Operate as a full team with agent roles for product, content, sales, and growth.", needs: ["Full agent team (Atlas → Ranker)", "Growth pipeline automation", "Customer feedback parsing"] },
  { icon: Building2, name: "Small agencies", desc: "Scale output across clients without hiring more people.", needs: ["Multi-client content calendars", "Proposal & pitch automation", "Competitor tracking per niche"] },
];

export default function UseCasesPage() {
  const [focused, setFocused] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white text-stone-900 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="font-serif uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[10px] xs:text-[11px] sm:text-[13px] font-bold leading-tight">The Micro Agent Company</Link>
          <nav className="hidden md:flex gap-7 text-[13px] font-medium">
            <Link href="/products" className="hover:text-electric-blue">Products</Link>
            <Link href="/agents" className="hover:text-electric-blue">Agents</Link>
            <Link href="/use-cases" className="text-electric-blue">Use Cases</Link>
            <Link href="/pricing" className="hover:text-electric-blue">Pricing</Link>
            <Link href="/docs" className="hover:text-electric-blue">Docs</Link>
          </nav>
          <Link href="/start-free-trial" className="hidden sm:inline-flex bg-black text-white text-[12px] font-semibold px-5 py-2 rounded-full hover:bg-electric-blue">Start free trial</Link>
        </div>
      </header>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="max-w-[640px] mb-10 sm:mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-electric-blue mb-4">Use Cases</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight font-normal mb-5">Built for small teams to produce like big ones.</h1>
          <p className="text-stone-500 leading-relaxed">One-person show or ten-person team — the agent structure scales to your real workload.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            const isFocused = focused === i;
            return (
              <div key={uc.name}
                onMouseEnter={() => setFocused(i)}
                onMouseLeave={() => setFocused(null)}
                onClick={() => setFocused(isFocused ? null : i)}
                className={`border rounded-2xl p-5 sm:p-7 transition-all cursor-pointer ${isFocused ? "border-electric-blue bg-blue-50/20 shadow-sm" : "border-stone-200 bg-white hover:border-stone-400"}`}
              >
                <Icon size={28} className={isFocused ? "text-electric-blue mb-5" : "text-stone-400 mb-5"} />
                <h3 className="font-serif text-xl font-bold mb-2">{uc.name}</h3>
                <p className="text-stone-500 text-[13px] leading-relaxed mb-4">{uc.desc}</p>
                {isFocused && (
                  <ul className="space-y-1.5 border-t border-stone-200 pt-4">
                    {uc.needs.map((n) => <li key={n} className="text-[12.5px] text-stone-600 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-electric-blue" />{n}</li>)}
                  </ul>
                )}
                <Link href="/start-free-trial" className={`inline-flex items-center gap-1 mt-4 text-[12px] font-bold transition-all ${isFocused ? "text-electric-blue" : "text-stone-500"}`}>
                  Start with {uc.name} <ArrowRight size={13} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
