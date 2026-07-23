"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Store, User, GraduationCap, Briefcase, Lightbulb, Building2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const useCaseKeys = [
  { icon: Store, key: "umkm" },
  { icon: User, key: "creators" },
  { icon: Briefcase, key: "freelancers" },
  { icon: GraduationCap, key: "students" },
  { icon: Lightbulb, key: "soloFounders" },
  { icon: Building2, key: "smallAgencies" },
];

export default function UseCasesPage() {
  const { t } = useTranslation();
  const [focused, setFocused] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white text-stone-900 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="font-serif uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[10px] xs:text-[11px] sm:text-[13px] font-bold leading-tight">The Micro Agent Company</Link>
          <nav className="hidden md:flex gap-7 text-[13px] font-medium">
            <Link href="/products" className="hover:text-electric-blue">{t("nav.products")}</Link>
            <Link href="/agents" className="hover:text-electric-blue">{t("nav.agents")}</Link>
            <Link href="/use-cases" className="text-electric-blue">{t("nav.useCases")}</Link>
            <Link href="/about" className="hover:text-electric-blue">{t("nav.about")}</Link>
            <Link href="/pricing" className="hover:text-electric-blue">{t("nav.pricing")}</Link>
            <Link href="/docs" className="hover:text-electric-blue">{t("nav.docs")}</Link>
          </nav>
          <Link href="/waitlist" className="hidden sm:inline-flex bg-black text-white text-[12px] font-semibold px-5 py-2 rounded-full hover:bg-electric-blue">{t("nav.bookCall")}</Link>
        </div>
      </header>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="max-w-[640px] mb-10 sm:mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-electric-blue mb-4">{t("useCases.title")}</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight font-normal mb-5">{t("useCases.heading")}</h1>
          <p className="text-stone-500 leading-relaxed">{t("useCases.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {useCaseKeys.map((uc, i) => {
            const Icon = uc.icon;
            const isFocused = focused === i;
            return (
              <div key={uc.key}
                onMouseEnter={() => setFocused(i)}
                onMouseLeave={() => setFocused(null)}
                onClick={() => setFocused(isFocused ? null : i)}
                className={`border rounded-2xl p-5 sm:p-7 transition-all cursor-pointer ${isFocused ? "border-electric-blue bg-blue-50/20 shadow-sm" : "border-stone-200 bg-white hover:border-stone-400"}`}
              >
                <Icon size={28} className={isFocused ? "text-electric-blue mb-5" : "text-stone-400 mb-5"} />
                <h3 className="font-serif text-xl font-bold mb-2">{t(`useCases.${uc.key}`)}</h3>
                <p className="text-stone-500 text-[13px] leading-relaxed mb-4">{t(`useCases.${uc.key}Desc`)}</p>
                {isFocused && (
                  <ul className="space-y-1.5 border-t border-stone-200 pt-4">
                    {[1, 2, 3].map((n) => <li key={n} className="text-[12.5px] text-stone-600 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-electric-blue" />{t(`useCases.${uc.key}Need${n}`)}</li>)}
                  </ul>
                )}
                <Link href="/waitlist" className={`inline-flex items-center gap-1 mt-4 text-[12px] font-bold transition-all ${isFocused ? "text-electric-blue" : "text-stone-500"}`}>
                  {t("useCases.startWith", { name: t(`useCases.${uc.key}`) })} <ArrowRight size={13} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}