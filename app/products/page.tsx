"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ProductsPage() {
  const products = [
    {
      id: "visibility-audit",
      name: "AI Visibility Audit",
      category: "saas",
      tagline: "Discover how AI platforms see your business.",
      desc: "Understand how leading AI platforms interpret your business. Receive a comprehensive AI Visibility report, competitor comparison, and practical recommendations.",
      badge: "Core Solution",
      pricing: "Rp150.000 / Audit",
      cta: "Book an Audit",
      href: "/start-free-trial",
      features: ["AI Visibility Analysis", "Brand Mention Analysis", "AI Search Testing", "Competitor Benchmark", "AI Readiness Score", "Action Plan"]
    },
    {
      id: "readiness-assessment",
      name: "AI Readiness Assessment",
      category: "saas",
      tagline: "Evaluate your readiness for AI discovery.",
      desc: "Evaluate whether your website, content, and digital presence are ready for AI-powered discovery and recommendation systems.",
      badge: "Assessment",
      pricing: "Rp149.000 / Assessment",
      cta: "Start Assessment",
      href: "/start-free-trial",
      features: ["Website Evaluation", "Content Assessment", "Structured Data Review", "Entity Consistency Check", "Knowledge Coverage Analysis"]
    },
    {
      id: "geo-strategy",
      name: "GEO Strategy",
      category: "services",
      tagline: "Optimize how AI references your brand.",
      desc: "A tailored Generative Engine Optimization roadmap designed to improve how AI understands and references your business over time.",
      badge: "Strategic Solution",
      pricing: "Rp1.490.000",
      cta: "Book Strategy Session",
      href: "/start-free-trial",
      features: ["GEO Roadmap", "Homepage Optimization", "FAQ Strategy", "Product & Service Pages", "Knowledge Base Planning", "Entity Optimization"]
    },
    {
      id: "brand-monitoring",
      name: "AI Brand Monitoring",
      category: "services",
      tagline: "Track your AI Visibility over time.",
      desc: "Monitor your AI Visibility with recurring reports, competitor tracking, prompt monitoring, and continuous strategic recommendations.",
      badge: "Ongoing Solution",
      pricing: "Rp2.490.000 / Month",
      cta: "Start Monitoring",
      href: "/start-free-trial",
      features: ["AI Visibility Score", "Competitor Monitoring", "Prompt Tracking", "Monthly Reports", "Continuous Recommendations"]
    }
  ];

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
            <Link href="/products" className="text-electric-blue font-bold text-[13px]">Solutions</Link>
            <Link href="/agents" className="text-stone-600 font-medium text-[13px] hover:text-electric-blue">How It Works</Link>
            <Link href="/use-cases" className="text-stone-600 font-medium text-[13px] hover:text-electric-blue">Use Cases</Link>
            <Link href="/about" className="text-stone-600 font-medium text-[13px] hover:text-electric-blue">About</Link>
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
            Solutions
          </h1>
          <p className="text-stone-500 text-[15px] max-w-[500px] mx-auto leading-relaxed">
            Helping businesses become discoverable in the AI era. Our solutions help AI platforms better understand your business through AI Visibility analysis, structured information, and Generative Engine Optimization (GEO).
          </p>
        </div>

        {/* Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {products.map(p => (
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
                  <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">Included</p>
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
