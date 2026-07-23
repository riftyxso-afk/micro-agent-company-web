"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function HiringBanner() {
  const { t } = useTranslation();

  return (
    <section aria-label={t("hiring.badge")} className="relative bg-white border-b border-stone-100">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[45%_55%] min-h-[70vh]">
        <div className="relative px-6 sm:px-10 lg:px-14 py-14 lg:py-16 flex flex-col justify-center">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.15]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative z-10 max-w-[480px]">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-stone-100 border border-stone-200 rounded-full px-3 py-1 text-[11px] font-semibold text-stone-600">
                <span className="inline-block w-2 h-2 rounded-full bg-orange-400" />
                {t("hiring.badge")}
              </span>
              <Link
                href="/careers"
                className="inline-flex items-center gap-1 text-[12px] font-medium text-stone-500 hover:text-electric-blue transition-colors"
              >
                {t("hiring.seeOpenRoles")}
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight font-bold text-stone-950 mb-4">
              {t("hiring.heading")}
            </h2>

            <p className="text-stone-500 text-[14px] sm:text-[15px] leading-relaxed">
              {t("hiring.description")}
            </p>
          </div>
        </div>

        <div className="relative min-h-[40vh] lg:min-h-full bg-stone-100 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-stone-200 border border-stone-300 flex items-center justify-center">
                <svg className="w-10 h-10 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <p className="text-stone-400 text-[12px] font-medium">{t("hiring.photoComing")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
