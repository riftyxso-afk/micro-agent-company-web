"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "saas" | "services">("all");

  const products = [
    {
      id: "microclaw",
      name: "MicroClaw",
      category: "saas",
      tagline: "OpenClaw managed hosting — AI assistant 24/7 via WhatsApp & Telegram.",
      desc: "VPS + OpenClaw pre-installed. Setup otomatis, akses via WhatsApp/Telegram, integrasi Gmail & Calendar. Untuk pebisnis & UMKM Indonesia.",
      badge: "Self-Serve App",
      pricing: "Rp 150.000 / month",
      cta: "Lihat MicroClaw",
      href: "/products/microclaw",
      features: ["WhatsApp & Telegram access", "Manajemen email & calendar", "Second Brain / Obsidian vault", "Invoice & payment tracking", "Integrasi dengan SekaliPost"]
    },
    {
      id: "sekalipost",
      name: "SekaliPost",
      category: "saas",
      tagline: "Content workflow engine for creators and UMKM.",
      desc: "One-click scheduling system. Synthesizes trending niche topics, draft captions, constructs optimal hashtags, and schedules calendars.",
      badge: "Self-Serve App",
      pricing: "Rp 149.000 / month",
      cta: "Try SekaliPost",
      href: "/start-free-trial",
      features: ["Multi-platform scheduling", "AI hooks generator", "Niche trend discovery engine", "Visual workflow planner"]
    },
    {
      id: "growth-agent",
      name: "AI Growth Agent Setup",
      category: "services",
      tagline: "Custom-configured growth pipeline for small teams.",
      desc: "We build and train custom agents focused on content generation, viral video scripts, social captions, and outreach optimization.",
      badge: "Done-With-You Service",
      pricing: "Rp 1.490.000 (One-time Setup)",
      cta: "Book AI Growth Agent",
      href: "/start-free-trial",
      features: ["30 custom niche content ideas", "10 ready-to-record video scripts", "Custom n8n content workflow", "14-day calendar training"]
    },
    {
      id: "admin-agent",
      name: "AI Admin Agent Setup",
      category: "services",
      tagline: "Invoice, report, and back-office automation system.",
      desc: "Connect local lightweight models (Ollama/DeepSeek) or cloud APIs to automate customer follow-ups, invoice audits, and weekly logs.",
      badge: "Done-With-You Service",
      pricing: "Rp 2.490.000 (One-time Setup)",
      cta: "Book AI Admin Agent",
      href: "/start-free-trial",
      features: ["Invoice parsing pipelines", "Auto email responder routes", "Secure local database storage", "Weekly report consolidator"]
    }
  ];

  const filtered = products.filter(p => activeTab === "all" || p.category === activeTab);

  return (
    <div className="font-sans text-stone-900 bg-white min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl border-b border-stone-200/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="font-serif flex flex-col items-start w-max">
            <span className="text-[10px] italic leading-none text-stone-400 font-medium tracking-tight">the</span>
            <span className="text-[14px] uppercase font-bold tracking-[0.2em] text-stone-900 leading-none">Micro Agent</span>
            <span className="text-[14px] uppercase font-bold tracking-[0.2em] text-stone-900 leading-none mt-0.5">Company</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-electric-blue font-bold text-[13px]">Products</Link>
            <Link href="/agents" className="text-stone-600 font-medium text-[13px] hover:text-electric-blue">Agents</Link>
            <Link href="/use-cases" className="text-stone-600 font-medium text-[13px] hover:text-electric-blue">Use Cases</Link>
            <Link href="/pricing" className="text-stone-600 font-medium text-[13px] hover:text-electric-blue">Pricing</Link>
            <Link href="/docs" className="text-stone-600 font-medium text-[13px] hover:text-electric-blue">Docs</Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link href="/sign-in" className="hidden sm:inline-flex text-[12px] font-medium text-stone-800 px-4 py-2 border border-stone-200 rounded-[10px] hover:border-electric-blue transition-all">Sign in</Link>
            <Link href="/start-free-trial" className="text-[11px] sm:text-[12px] font-medium bg-pure-black text-white px-3 sm:px-5 py-2 rounded-full hover:bg-electric-blue transition-all whitespace-nowrap">Start trial</Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-950 mb-4 tracking-tight">
            Products & systems under <br />one micro company.
          </h1>
          <p className="text-stone-500 text-[15px] max-w-[500px] mx-auto leading-relaxed">
            From self-serve creator applications to custom-configured operations setups. Choose the way your team works.
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center mt-8 gap-1.5 bg-stone-100 p-1 rounded-lg w-full sm:w-max mx-auto border border-stone-200">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 text-[11px] sm:text-[12px] font-semibold rounded-md transition-all cursor-pointer ${activeTab === "all" ? "bg-white text-stone-950 shadow-xs" : "text-stone-500 hover:text-stone-900"}`}
            >
              All Offerings
            </button>
            <button
              onClick={() => setActiveTab("saas")}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 text-[11px] sm:text-[12px] font-semibold rounded-md transition-all cursor-pointer ${activeTab === "saas" ? "bg-white text-stone-950 shadow-xs" : "text-stone-500 hover:text-stone-900"}`}
            >
              Self-Serve Apps
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 text-[11px] sm:text-[12px] font-semibold rounded-md transition-all cursor-pointer ${activeTab === "services" ? "bg-white text-stone-950 shadow-xs" : "text-stone-500 hover:text-stone-900"}`}
            >
              Setup Services
            </button>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {filtered.map(p => (
            <div key={p.id} className="border border-stone-200 rounded-xl p-5 sm:p-8 bg-white hover:border-electric-blue transition-all flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-stone-100 text-stone-600 px-2.5 py-1 rounded">
                    {p.badge}
                  </span>
                  <span className="text-sm font-semibold text-stone-900">{p.pricing}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-950 mb-1">{p.name}</h3>
                <p className="text-electric-blue text-[13px] font-medium mb-4">{p.tagline}</p>
                <p className="text-stone-500 text-[13.5px] leading-relaxed mb-6">{p.desc}</p>

                <div className="border-t border-stone-100 pt-6 mb-8">
                  <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">Key Features</p>
                  <ul className="space-y-2.5">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] text-stone-600">
                        <CheckCircle2 size={15} className="text-electric-blue shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href={p.href} className="w-full text-center bg-pure-black hover:bg-electric-blue text-white text-[12px] font-bold py-3 px-5 rounded-lg inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                <span>{p.cta}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-stone-50 py-12 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="font-serif text-stone-900 font-bold uppercase tracking-wider text-[12px]">The Micro Agent Company</p>
          <p className="text-[11px] text-stone-400 font-medium">© 2026 The Micro Agent Company, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
