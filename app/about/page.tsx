"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-white text-stone-900 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="font-serif uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[10px] xs:text-[11px] sm:text-[13px] font-bold leading-tight">The Micro Agent Company</Link>
          <nav className="hidden md:flex gap-7 text-[13px] font-medium">
            <Link href="/products" className="hover:text-electric-blue">{t("nav.products")}</Link>
            <Link href="/agents" className="hover:text-electric-blue">{t("nav.agents")}</Link>
            <Link href="/use-cases" className="hover:text-electric-blue">{t("nav.useCases")}</Link>
            <Link href="/about" className="text-electric-blue">{t("nav.about")}</Link>
            <Link href="/pricing" className="hover:text-electric-blue">{t("nav.pricing")}</Link>
            <Link href="/docs" className="hover:text-electric-blue">{t("nav.docs")}</Link>
          </nav>
          <Link href="/waitlist" className="hidden sm:inline-flex bg-black text-white text-[12px] font-semibold px-5 py-2 rounded-full hover:bg-electric-blue">{t("nav.bookCall")}</Link>
        </div>
      </header>

      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-white pointer-events-none" />
        <div className="relative z-10 max-w-[720px] text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-electric-blue mb-4">{t("about.title")}</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight font-normal mb-6">{t("about.heading")}</h1>
          <p className="text-stone-500 text-lg leading-relaxed max-w-[560px] mx-auto">
            {t("about.description")}
          </p>
        </div>
      </section>

      <section className="max-w-[720px] mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="border border-stone-200 rounded-2xl p-8 sm:p-10 bg-[#FAF9F8]">
          <h2 className="font-serif text-2xl sm:text-3xl leading-tight font-normal mb-6">{t("about.vision")}</h2>
          <p className="text-stone-600 leading-relaxed text-[15px]">
            {t("about.visionText")}
          </p>
        </div>
      </section>

      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="font-serif text-2xl sm:text-3xl leading-tight font-normal mb-6">{t("about.mission")}</h2>
          <p className="text-stone-600 leading-relaxed text-[15px]">
            {t("about.missionText")}
          </p>
        </div>
      </section>

      <section className="max-w-[720px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="font-serif text-2xl sm:text-3xl leading-tight font-normal mb-8">{t("about.story")}</h2>
        <div className="prose prose-stone max-w-none prose-p:leading-relaxed prose-p:text-[15px]">
          <p>{t("about.storyP1")}</p>
          <p>{t("about.storyP2")}</p>
          <p>{t("about.storyP3")}</p>
          <p>{t("about.storyP4")}</p>
        </div>
      </section>

      <section className="bg-white border-t border-stone-200">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl leading-tight font-normal mb-4">{t("about.ctaTitle")}</h2>
          <p className="text-stone-500 mb-8">{t("about.ctaSubtitle")}</p>
          <Link href="/waitlist" className="inline-flex bg-black text-white text-[13px] font-semibold px-8 py-3 rounded-full hover:bg-electric-blue transition-colors">
            {t("about.ctaButton")}
          </Link>
        </div>
      </section>
    </main>
  );
}
