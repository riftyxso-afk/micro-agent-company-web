"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function CareersPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-white text-stone-900 font-sans">
      <div className="max-w-[600px] mx-auto px-6 py-24 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-electric-blue mb-4">{t("careers.title")}</p>
        <h1 className="font-serif text-4xl sm:text-5xl leading-tight font-normal mb-6">{t("careers.heading")}</h1>
        <p className="text-stone-500 leading-relaxed mb-10">
          {t("careers.description")}
        </p>
        <Link
          href="https://t.me/microclaw"
          className="inline-flex bg-black text-white text-[13px] font-semibold px-8 py-3 rounded-full hover:bg-electric-blue transition-colors"
        >
          {t("careers.contactTelegram")}
        </Link>
      </div>
    </main>
  );
}
