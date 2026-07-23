"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function AnimatedPrice({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [glitching, setGlitching] = useState(true);

  useEffect(() => {
    setGlitching(true);
    setDisplayValue(0);

    const duration = 850;
    const start = performance.now();

    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setDisplayValue(value);
        window.setTimeout(() => setGlitching(false), 180);
      }
    };

    const raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span className="relative inline-block">
      <span className="font-serif text-3xl sm:text-4xl tracking-[-0.04em]">
        {formatRupiah(displayValue)}{suffix}
      </span>
      {glitching && (
        <span className="price-particles" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => (
            <span key={index} className={`price-particle particle-${index + 1}`} />
          ))}
        </span>
      )}
    </span>
  );
}

export default function PricingPage() {
  const { t } = useTranslation();
  const [annual, setAnnual] = useState(false);
  const [billingPulse, setBillingPulse] = useState(0);

  const plans = useMemo(() => [
    {
      nameKey: "starter",
      priceValue: annual ? 390000 : 49000,
      period: annual ? "/ year" : "/ month",
      cta: t("pricingPage.starterCta"),
      trial: t("pricingPage.starterNote"),
      features: [
        "7-day free trial before billing",
        "10 AI content checks / day",
        "Basic prompt templates",
        "Email support"
      ]
    },
    {
      nameKey: "growth",
      priceValue: annual ? 1190000 : 149000,
      period: annual ? "/ year" : "/ month",
      cta: t("pricingPage.growthCta"),
      highlight: true,
      savings: annual ? t("pricingPage.saveYearly") : t("pricingPage.popular"),
      features: [
        "SekaliPost workflow",
        "30 content ideas / month",
        "Caption + hashtag generator",
        "14-day calendar builder",
        "WhatsApp promo templates"
      ]
    },
    {
      nameKey: "custom",
      priceValue: 1490000,
      priceSuffix: "+",
      period: " setup",
      cta: t("pricingPage.customCta"),
      features: [
        "AI Growth Agent setup",
        "AI Admin Agent setup",
        "Custom prompt workflow",
        "Simple usage guide",
        "Founder onboarding call"
      ]
    },
  ], [annual, t]);

  const switchBilling = (nextAnnual: boolean) => {
    if (nextAnnual === annual) return;
    setAnnual(nextAnnual);
    setBillingPulse((value) => value + 1);
  };

  return (
    <main className="min-h-screen bg-white text-stone-900 font-sans relative overflow-hidden">
      <style jsx global>{`
        .price-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .price-particle {
          position: absolute;
          width: 5px;
          height: 5px;
          background-color: #000000;
          border-radius: 9999px;
          opacity: 0;
          transform: scale(0.3);
        }

        .price-particle.particle-1 { top: 20%; left: 10%; animation: particleBurst 0.6s 0.05s ease-out forwards; }
        .price-particle.particle-2 { top: 30%; left: 80%; animation: particleBurst 0.6s 0.01s ease-out forwards; }
        .price-particle.particle-3 { top: 70%; left: 30%; animation: particleBurst 0.6s 0.12s ease-out forwards; }
        .price-particle.particle-4 { top: 80%; left: 70%; animation: particleBurst 0.6s 0.08s ease-out forwards; }
        .price-particle.particle-5 { top: 10%; left: 50%; animation: particleBurst 0.6s 0.03s ease-out forwards; }
        .price-particle.particle-6 { top: 90%; left: 45%; animation: particleBurst 0.6s 0.15s ease-out forwards; }
        .price-particle.particle-7 { top: 40%; left: 15%; animation: particleBurst 0.6s 0.09s ease-out forwards; }
        .price-particle.particle-8 { top: 60%; left: 85%; animation: particleBurst 0.6s 0.02s ease-out forwards; }
        .price-particle.particle-9 { top: 15%; left: 75%; animation: particleBurst 0.6s 0.07s ease-out forwards; }
        .price-particle.particle-10 { top: 85%; left: 20%; animation: particleBurst 0.6s 0.11s ease-out forwards; }
        .price-particle.particle-11 { top: 50%; left: 5%; animation: particleBurst 0.6s 0.14s ease-out forwards; }
        .price-particle.particle-12 { top: 45%; left: 95%; animation: particleBurst 0.6s 0.06s ease-out forwards; }

        @keyframes particleBurst {
          0% {
            opacity: 0.85;
            transform: scale(1) translate(0, 0);
          }
          100% {
            opacity: 0;
            transform: scale(0.1) translate(var(--x, 15px), var(--y, -15px));
          }
        }

        .price-particle:nth-child(2n) { --x: -25px; --y: 10px; }
        .price-particle:nth-child(3n) { --x: 18px; --y: -25px; }
        .price-particle:nth-child(4n) { --x: -12px; --y: -18px; }
        .price-particle:nth-child(5n) { --x: 22px; --y: 20px; }

        .billing-pulse {
          animation: billingPulse 0.55s ease-out;
        }

        @keyframes billingPulse {
          0% { transform: scale(0.98); opacity: 0.55; }
          65% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div
        className="absolute inset-0 z-0 bg-top bg-cover bg-no-repeat opacity-70 pointer-events-none"
        style={{
          backgroundImage: "url('/pricing.png')"
        }}
      />
      <div className="absolute inset-0 z-0 bg-white/55 pointer-events-none" />

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="font-serif uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[10px] xs:text-[11px] sm:text-[13px] font-bold leading-tight">The Micro Agent Company</Link>
          <nav className="hidden md:flex gap-7 text-[13px] font-medium">
            <Link href="/products" className="hover:text-electric-blue">{t("nav.products")}</Link>
            <Link href="/agents" className="hover:text-electric-blue">{t("nav.agents")}</Link>
            <Link href="/use-cases" className="hover:text-electric-blue">{t("nav.useCases")}</Link>
            <Link href="/about" className="hover:text-electric-blue">{t("nav.about")}</Link>
            <Link href="/pricing" className="text-electric-blue">{t("nav.pricing")}</Link>
            <Link href="/docs" className="hover:text-electric-blue">{t("nav.docs")}</Link>
          </nav>
          <Link href="/waitlist" className="hidden sm:inline-flex bg-black text-white text-[12px] font-semibold px-5 py-2 rounded-full hover:bg-electric-blue transition-colors">{t("nav.bookCall")}</Link>
        </div>
      </header>

      <section className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="text-center max-w-[720px] mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-electric-blue mb-4">{t("pricingPage.title")}</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight mb-5">{t("pricingPage.heading")}</h1>
          <p className="text-stone-600 leading-relaxed font-medium">{t("pricingPage.subtitle")}</p>
          <div className="mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white/95 border border-stone-300 rounded-full p-1.5 shadow-sm backdrop-blur-sm">
            <button onClick={() => switchBilling(false)} className={`flex-1 sm:flex-none px-5 py-2.5 rounded-full text-[12px] font-bold transition-all ${!annual ? "bg-black shadow-sm text-white" : "text-stone-700 hover:text-stone-950 hover:bg-stone-100"}`}>{t("pricingPage.monthly")}</button>
            <button onClick={() => switchBilling(true)} className={`flex-1 sm:flex-none px-5 py-2.5 rounded-full text-[12px] font-bold transition-all ${annual ? "bg-black shadow-sm text-white" : "text-stone-700 hover:text-stone-950 hover:bg-stone-100"}`}>{t("pricingPage.yearly")}</button>
          </div>
        </div>

        <div key={billingPulse} className="billing-pulse grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {plans.map((plan) => (
            <div key={plan.nameKey} className={`relative border rounded-2xl p-5 sm:p-7 transition-all ${plan.highlight ? "border-electric-blue bg-blue-50/20 shadow-sm" : "border-stone-200 bg-white hover:border-stone-400"}`}>
              {plan.trial && (
                <div className="mb-4 sm:mb-0 sm:absolute sm:right-5 sm:top-5 inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-warm-orange">
                  <Sparkles size={12} /> {t("pricingPage.7days")}
                </div>
              )}
              {plan.savings && (
                <div className="mb-4 sm:mb-0 sm:absolute sm:right-5 sm:top-5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-electric-blue">
                  {plan.savings}
                </div>
              )}

              <p className="font-serif text-2xl font-bold mb-2 pr-0 sm:pr-28">{t(`pricingPage.${plan.nameKey}`)}</p>
              <p className="text-stone-500 text-sm leading-relaxed min-h-[58px]">{t(`pricingPage.${plan.nameKey}Desc`)}</p>

              <div className="my-6 sm:my-8 min-h-[52px] flex flex-wrap items-end gap-1.5">
                <AnimatedPrice value={plan.priceValue} suffix={plan.priceSuffix} />
                <span className="text-stone-400 text-sm pb-1">{plan.period}</span>
              </div>

              {plan.trial && (
                <div className="mb-5 rounded-xl border border-orange-200 bg-orange-50/70 p-3 text-[12.5px] font-medium text-stone-700">
                  {t("pricingPage.starter")} mulai dengan <span className="font-bold text-warm-orange">free trial 7 hari</span>. Tidak perlu bayar saat mulai validasi.
                </div>
              )}

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-stone-600">
                    <CheckCircle2 size={16} className="text-electric-blue shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/start-free-trial" className={`w-full inline-flex justify-center items-center gap-2 rounded-full py-3 text-sm font-semibold transition-colors ${plan.highlight ? "bg-electric-blue text-white hover:bg-black" : "bg-black text-white hover:bg-electric-blue"}`}>
                {plan.cta}<ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
