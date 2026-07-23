"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Brain, FileText, Headphones, Megaphone, Search, Settings, Target, Workflow } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const agentKeys = [
  { key: "atlas", icon: Settings },
  { key: "scout", icon: Search },
  { key: "nova", icon: Brain },
  { key: "forge", icon: Workflow },
  { key: "spark", icon: FileText },
  { key: "echo", icon: Target },
  { key: "care", icon: Headphones },
  { key: "ranker", icon: Megaphone },
];

export default function AgentsPage() {
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState(agentKeys[0].key);

  const active = agentKeys.find((a) => a.key === activeKey)!;
  const Icon = active.icon;

  return (
    <main className="min-h-screen bg-white text-stone-900 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="font-serif uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[10px] xs:text-[11px] sm:text-[13px] font-bold leading-tight">The Micro Agent Company</Link>
          <nav className="hidden md:flex gap-7 text-[13px] font-medium text-stone-600">
            <Link href="/products" className="hover:text-electric-blue">{t("nav.products")}</Link><Link href="/agents" className="text-electric-blue">{t("nav.agents")}</Link><Link href="/use-cases" className="hover:text-electric-blue">{t("nav.useCases")}</Link><Link href="/about" className="hover:text-electric-blue">{t("nav.about")}</Link><Link href="/pricing" className="hover:text-electric-blue">{t("nav.pricing")}</Link><Link href="/docs" className="hover:text-electric-blue">{t("nav.docs")}</Link>
          </nav>
          <Link href="/waitlist" className="hidden sm:inline-flex bg-black text-white text-[12px] font-semibold px-5 py-2 rounded-full hover:bg-electric-blue">{t("nav.bookCall")}</Link>
        </div>
      </header>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="max-w-[720px] mb-10 sm:mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-electric-blue mb-4">{t("agentsPage.title")}</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight font-normal mb-5">{t("agentsPage.heading")}</h1>
          <p className="text-stone-500 leading-relaxed">{t("agentsPage.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {agentKeys.map((agent) => {
              const AgentIcon = agent.icon;
              const selected = activeKey === agent.key;
              return (
                <button key={agent.key} onClick={() => setActiveKey(agent.key)} className={`text-left border rounded-xl p-4 sm:p-5 transition-all ${selected ? "border-electric-blue bg-blue-50/40" : "border-stone-200 bg-white hover:border-stone-400"}`}>
                  <AgentIcon className={selected ? "text-electric-blue mb-4" : "text-stone-400 mb-4"} size={22} />
                  <h3 className="font-serif text-xl font-bold">{t(`agent.${agent.key}`)}</h3>
                  <p className="text-[12px] text-stone-500 mt-1">{t(`agent.${agent.key}Role`)}</p>
                </button>
              );
            })}
          </div>

          <div className="border border-stone-200 rounded-2xl p-5 sm:p-8 bg-[#FAF9F8] lg:sticky lg:top-24 h-fit">
            <div className="w-12 h-12 rounded-xl border border-stone-200 bg-white flex items-center justify-center mb-6"><Icon className="text-electric-blue" /></div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-stone-400">{t("agentsPage.activeAgent")}</p>
            <h2 className="font-serif text-3xl sm:text-4xl mt-2 mb-2">{t(`agent.${activeKey}`)}</h2>
            <p className="text-electric-blue font-semibold text-sm mb-6">{t(`agent.${activeKey}Role`)}</p>
            <p className="text-stone-600 leading-relaxed mb-8">{t(`agent.${activeKey}Desc`)}</p>
            <div className="bg-white border border-stone-200 rounded-xl p-5 mb-6">
              <p className="text-[11px] uppercase tracking-wider font-bold text-stone-400 mb-2">{t("agentsPage.typicalOutput")}</p>
              <p className="text-sm text-stone-700">{t(`agent.${activeKey}Output`)}</p>
            </div>
            <Link href="/waitlist" className="inline-flex items-center gap-2 bg-black hover:bg-electric-blue text-white text-sm font-semibold px-6 py-3 rounded-full">{t("agentsPage.assign")} <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}