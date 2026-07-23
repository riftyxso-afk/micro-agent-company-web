"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Camera, CheckCircle, FileText, Globe, Loader2, Mail, Menu, MessageSquare, Monitor, Palette, Phone, Search, Send, Share2, Sparkles, TrendingUp, User, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const services = [
  { id: "website", icon: Monitor, labelId: "Pembuatan Website / Landing Page", labelEn: "Website / Landing Page Creation" },
  { id: "foto-video", icon: Camera, labelId: "Foto & Video Produk / Brand", labelEn: "Product & Brand Photo & Video" },
  { id: "iklan", icon: TrendingUp, labelId: "Jasa Iklan (Meta/Google/TikTok)", labelEn: "Ad Management (Meta/Google/TikTok)" },
  { id: "sosmed", icon: Share2, labelId: "Manajemen Social Media", labelEn: "Social Media Management" },
  { id: "branding", icon: Palette, labelId: "Branding & Desain Grafis", labelEn: "Branding & Graphic Design" },
  { id: "copywriting", icon: FileText, labelId: "Copywriting & Konten", labelEn: "Copywriting & Content" },
  { id: "seo", icon: Search, labelId: "SEO & Optimasi Website", labelEn: "SEO & Website Optimization" },
];

function ServiceCard({
  service,
  selected,
  onSelect,
  locale,
}: {
  service: typeof services[0];
  selected: boolean;
  onSelect: (id: string) => void;
  locale: string;
}) {
  const Icon = service.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(service.id)}
      className={`relative w-full text-left border-2 rounded-xl p-4 sm:p-5 transition-all cursor-pointer ${
        selected
          ? "border-electric-blue bg-blue-50/40 shadow-sm"
          : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-xs"
      }`}
    >
      {selected && (
        <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-electric-blue flex items-center justify-center">
          <CheckCircle size={14} className="text-white" />
        </div>
      )}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all ${
        selected ? "bg-electric-blue text-white" : "bg-stone-100 text-stone-500"
      }`}>
        <Icon size={20} />
      </div>
      <p className={`text-[13px] font-semibold leading-snug transition-all ${
        selected ? "text-electric-blue" : "text-stone-800"
      }`}>
        {locale === "id" ? service.labelId : service.labelEn}
      </p>
    </button>
  );
}

export default function BookACallPage() {
  const { t, locale, setLocale } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    business: "",
    help: "",
    budget: "",
    message: "",
  });

  const [recommendation, setRecommendation] = useState("");
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [recommendationError, setRecommendationError] = useState("");
  const [aiPrice, setAiPrice] = useState("");
  const [aiPriceUsed, setAiPriceUsed] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [dpAmount, setDpAmount] = useState("");
  const [closingAmount, setClosingAmount] = useState("");

  const parsePrice = (s: string): number => {
    const digits = s.replace(/[^0-9]/g, "");
    return digits ? parseInt(digits, 10) : 0;
  };

  const formatPrice = (n: number): string => {
    return `Rp ${n.toLocaleString("id-ID")}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const selectService = (id: string) => {
    setForm({ ...form, help: form.help === id ? "" : id });
  };

  const generateRecommendation = async () => {
    setLoadingRecommendation(true);
    setRecommendation("");
    setRecommendationError("");
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          business: form.business,
          service: locale === "id" ? services.find((s) => s.id === form.help)?.labelId : services.find((s) => s.id === form.help)?.labelEn,
          budget: form.budget,
          message: form.message,
          locale,
        }),
      });
      if (!res.ok) {
        throw new Error("Gagal mendapat rekomendasi. Coba lagi.");
      }
      const data = await res.json();
      setRecommendation(data.text);
      const priceMatch = data.text.match(/Rp\s*[\d.]+(?:\s*-\s*Rp\s*[\d.]+)?/);
      if (priceMatch) {
        setAiPrice(priceMatch[0]);
        setAiPriceUsed(false);
      }
    } catch (err: any) {
      setRecommendationError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoadingRecommendation(false);
    }
  };

  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!submitted) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const totalPrice = aiPriceUsed ? parsePrice(aiPrice) : parsePrice(form.budget);
    const dp = totalPrice > 0 ? formatPrice(Math.round(totalPrice / 2)) : "";
    const closing = totalPrice > 0 ? formatPrice(Math.ceil(totalPrice / 2)) : "";
    setDpAmount(dp);
    setClosingAmount(closing);
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          business: form.business,
          service: locale === "id" ? services.find((s) => s.id === form.help)?.labelId : services.find((s) => s.id === form.help)?.labelEn,
          budget: aiPriceUsed ? `${form.budget} (AI: ${aiPrice})` : form.budget,
          message: form.message,
          recommendation,
          dpAmount: dp,
          closingAmount: closing,
        }),
      });
      if (!res.ok) throw new Error("Gagal membuat pesanan");
      const data = await res.json();
      setOrderId(data.order.id);
    } catch (err: any) {
      console.error("Create order error:", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-white text-stone-900 font-sans">
        <div className="max-w-[900px] mx-auto px-6 py-16 sm:py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal mb-3">
            {locale === "id" ? "Pesanmu Terkirim! 🎉" : "Your Request is Sent! 🎉"}
          </h1>

          {orderId && (
            <div className="inline-flex flex-col items-center bg-stone-50 border border-stone-200 rounded-xl px-8 py-5 mb-4">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                {locale === "id" ? "ORDER ID KAMU" : "YOUR ORDER ID"}
              </p>
              <p className="font-mono text-[22px] font-bold tracking-wider text-stone-900">{orderId}</p>
              <Link
                href={`/track?id=${orderId}`}
                className="text-[11px] text-electric-blue hover:text-stone-900 underline mt-1"
              >
                {locale === "id" ? "Lacak status pesanan →" : "Track order status →"}
              </Link>
            </div>
          )}

          {(dpAmount || closingAmount) && orderId && (
            <div className="inline-flex flex-col bg-blue-50 border border-blue-200 rounded-xl px-6 py-4 mb-6 text-left w-full max-w-[400px] mx-auto">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3">
                {locale === "id" ? "INFO PEMBAYARAN" : "PAYMENT INFO"}
              </p>
              {dpAmount && (
                <div className="flex justify-between items-center text-[13px] mb-1.5">
                  <span className="text-stone-600">{locale === "id" ? "DP (50%)" : "Down Payment (50%)"}</span>
                  <span className="font-semibold text-stone-900">{dpAmount}</span>
                </div>
              )}
              {closingAmount && (
                <div className="flex justify-between items-center text-[13px] mb-3">
                  <span className="text-stone-600">{locale === "id" ? "Pelunasan (50%)" : "Closing (50%)"}</span>
                  <span className="font-semibold text-stone-900">{closingAmount}</span>
                </div>
              )}
              <Link
                href={`/payment/${orderId}`}
                className="inline-flex items-center justify-center gap-1.5 bg-electric-blue text-white text-[11px] font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-all"
              >
                <span>{locale === "id" ? "Bayar Sekarang" : "Pay Now"}</span>
                <ArrowRight size={13} />
              </Link>
              <p className="text-[10px] text-stone-400 mt-2 text-center">
                {locale === "id"
                  ? "Transfer ke rekening yang akan diinfokan admin. Upload bukti transfer di halaman pembayaran."
                  : "Transfer to the account provided by admin. Upload your proof of transfer on the payment page."}
              </p>
            </div>
          )}

          <p className="text-stone-500 text-[15px] leading-relaxed mb-10 max-w-[520px] mx-auto">
            {locale === "id"
              ? "Sekarang, pilih waktu yang cocok untuk call 30 menit via Google Meet."
              : "Now, pick a time that works for you for a 30-min call via Google Meet."}
          </p>

          <div
            ref={calendlyRef}
            className="calendly-inline-widget mx-auto rounded-xl overflow-hidden border border-stone-200"
            data-url={`https://calendly.com/radzfoundation/new-meeting?name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}&hide_landing_page_details=1`}
            style={{ minWidth: 320, height: 650 }}
          />

          <p className="text-[12px] text-stone-400 mt-6">
            {locale === "id" ? "Kalau tidak muncul, buka langsung:" : "If it doesn't appear, open directly:"}{" "}
            <a
              href={`https://calendly.com/radzfoundation/new-meeting?name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-blue underline hover:text-stone-900"
            >
              calendly.com/radzfoundation/new-meeting
            </a>
          </p>

          <Link
            href="/"
            className="inline-flex mt-8 bg-black text-white text-[13px] font-semibold px-8 py-3 rounded-full hover:bg-electric-blue transition-all"
          >
            {locale === "id" ? "Kembali ke Beranda" : "Back to Home"}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-stone-900 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl border-b border-stone-200/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="font-serif flex items-center gap-2 sm:gap-3 min-w-0">
            <img src="/logo.svg" alt="The Micro Agent Company" className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-lg" />
            <span className="flex flex-col items-start min-w-0">
              <span className="text-[9px] sm:text-[10px] italic leading-none text-stone-400 font-medium tracking-tight">{t("nav.the")}</span>
              <span className="text-[11px] sm:text-[14px] uppercase font-bold tracking-[0.14em] sm:tracking-[0.2em] text-stone-900 leading-none">{t("nav.microAgent")}</span>
              <span className="text-[11px] sm:text-[14px] uppercase font-bold tracking-[0.14em] sm:tracking-[0.2em] text-stone-900 leading-none mt-0.5">{t("nav.company")}</span>
            </span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-1 border border-stone-200 rounded-[10px] px-2 py-1.5">
              <button onClick={() => setLocale("id")} className={`text-[11px] font-medium px-1.5 py-0.5 rounded transition-all ${locale === "id" ? "bg-pure-black text-white" : "text-stone-500 hover:text-stone-800"}`}>ID</button>
              <span className="text-stone-300 text-[10px]">|</span>
              <button onClick={() => setLocale("en")} className={`text-[11px] font-medium px-1.5 py-0.5 rounded transition-all ${locale === "en" ? "bg-pure-black text-white" : "text-stone-500 hover:text-stone-800"}`}>EN</button>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-stone-700 p-1">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-stone-200 py-4 px-6 space-y-3">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-stone-700 font-medium text-[14px]">{locale === "id" ? "Beranda" : "Home"}</Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="block text-stone-700 font-medium text-[14px]">{t("nav.products")}</Link>
            <Link href="/agents" onClick={() => setMobileMenuOpen(false)} className="block text-stone-700 font-medium text-[14px]">{t("nav.agents")}</Link>
            <div className="flex items-center space-x-2 pt-2 border-t border-stone-100">
              <button onClick={() => { setLocale("id"); setMobileMenuOpen(false); }} className={`text-[12px] font-medium px-3 py-1 rounded ${locale === "id" ? "bg-pure-black text-white" : "text-stone-500 border border-stone-200"}`}>ID</button>
              <button onClick={() => { setLocale("en"); setMobileMenuOpen(false); }} className={`text-[12px] font-medium px-3 py-1 rounded ${locale === "en" ? "bg-pure-black text-white" : "text-stone-500 border border-stone-200"}`}>EN</button>
            </div>
          </div>
        )}
      </nav>

      <section className="pt-24 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Left: Info */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-[11px] font-semibold font-sans tracking-wide mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
              {locale === "id" ? "KONSULTASI GRATIS" : "FREE CONSULTATION"}
            </div>
            <h1 className="font-serif text-[36px] sm:text-[48px] leading-[1.1] font-normal mb-5">
              {locale === "id" ? "Book a Call dengan Tim Kami" : "Book a Call with Our Team"}
            </h1>
            <p className="text-stone-500 text-[15px] leading-relaxed mb-8">
              {locale === "id"
                ? "Dari pembuatan website, foto & video, iklan, branding, sampai copywriting — semua kebutuhan digital bisnismu."
                : "From website creation, photo & video, ads, branding, to copywriting — all your digital business needs."}
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Calendar size={18} className="text-electric-blue" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-stone-900">
                    {locale === "id" ? "30 Menit Call via Google Meet" : "30-Min Call via Google Meet"}
                  </p>
                  <p className="text-[12px] text-stone-500">
                    {locale === "id" ? "Diskusi kebutuhan digital & demo solusi." : "Discuss digital needs & demo solutions."}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <MessageSquare size={18} className="text-electric-blue" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-stone-900">
                    {locale === "id" ? "Konsultasi Gratis" : "Free Consultation"}
                  </p>
                  <p className="text-[12px] text-stone-500">
                    {locale === "id" ? "Website, foto & video, iklan, branding — semua ada." : "Website, photo & video, ads, branding — everything."}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Sparkles size={18} className="text-electric-blue" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-stone-900">
                    {locale === "id" ? "Rekomendasi & Custom Quote" : "Recommendation & Custom Quote"}
                  </p>
                  <p className="text-[12px] text-stone-500">
                    {locale === "id" ? "Dapatkan paket sesuai kebutuhan & budget bisnismu." : "Get a package tailored to your needs & budget."}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-stone-200 pt-8">
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                {locale === "id" ? "Lebih suka chat?" : "Prefer to chat?"}
              </p>
              <a
                href="https://t.me/microclaw"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-electric-blue hover:text-stone-900 transition-colors"
              >
                <Send size={14} />
                Telegram: @microclaw
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            {/* Steps indicator */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all ${step >= s ? "bg-pure-black text-white" : "bg-stone-100 text-stone-400"}`}>
                    {step > s ? <CheckCircle size={16} className="text-white" /> : s}
                  </div>
                  {s < 3 && <div className={`w-12 sm:w-20 h-0.5 mx-1 transition-all ${step > s ? "bg-pure-black" : "bg-stone-200"}`} />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="font-serif text-xl font-normal mb-1">
                    {locale === "id" ? "Data Diri" : "Your Details"}
                  </h2>
                  <p className="text-stone-400 text-[13px] mb-4">
                    {locale === "id" ? "Biar kami tahu cara menghubungi kamu." : "So we know how to reach you."}
                  </p>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                      {locale === "id" ? "Nama Lengkap *" : "Full Name *"}
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder={locale === "id" ? "Nama kamu" : "Your name"}
                        className="w-full border border-stone-200 rounded-lg pl-9 pr-3 py-2.5 text-[13px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="email@example.com"
                        className="w-full border border-stone-200 rounded-lg pl-9 pr-3 py-2.5 text-[13px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                      WhatsApp
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="tel"
                        name="whatsapp"
                        value={form.whatsapp}
                        onChange={handleChange}
                        placeholder="+62 812-xxxx-xxxx"
                        className="w-full border border-stone-200 rounded-lg pl-9 pr-3 py-2.5 text-[13px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!form.name || !form.email}
                    className="w-full bg-pure-black hover:bg-electric-blue disabled:bg-stone-300 text-white text-[13px] font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {locale === "id" ? "Lanjut" : "Next"} <ArrowRight size={15} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="font-serif text-xl font-normal mb-1">
                    {locale === "id" ? "Pilih Layanan" : "Choose a Service"}
                  </h2>
                  <p className="text-stone-400 text-[13px] mb-4">
                    {locale === "id" ? "Pilih salah satu jasa yang kamu butuhkan." : "Select the service you need."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((svc) => (
                      <ServiceCard
                        key={svc.id}
                        service={svc}
                        selected={form.help === svc.id}
                        onSelect={selectService}
                        locale={locale}
                      />
                    ))}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                      {locale === "id" ? "Nama Bisnis / Usaha" : "Business Name"}
                    </label>
                    <input
                      type="text"
                      name="business"
                      value={form.business}
                      onChange={handleChange}
                      placeholder={locale === "id" ? "e.g. Warung Sejahtera" : "e.g. Acme Corp"}
                      className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-[13px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                      {locale === "id" ? "Estimasi Budget" : "Estimated Budget"}
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-[13px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none bg-white"
                    >
                      <option value="">{locale === "id" ? "Pilih..." : "Select..."}</option>
                      <option value="<150k">{"< Rp 150.000"}</option>
                      <option value="150k-300k">{"Rp 150.000 - Rp 300.000"}</option>
                      <option value="300k-500k">{"Rp 300.000 - Rp 500.000"}</option>
                      <option value="500k-1m">{"Rp 500.000 - Rp 1.000.000"}</option>
                      <option value=">1m">{"> Rp 1.000.000"}</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border border-stone-200 text-stone-600 text-[13px] font-semibold py-3 rounded-full hover:bg-stone-50 transition-all cursor-pointer"
                    >
                      {locale === "id" ? "Kembali" : "Back"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!form.help}
                      className="flex-1 bg-pure-black hover:bg-electric-blue disabled:bg-stone-300 text-white text-[13px] font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      {locale === "id" ? "Lanjut" : "Next"} <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="font-serif text-xl font-normal mb-1">
                    {locale === "id" ? "Pesan Tambahan" : "Additional Notes"}
                  </h2>
                  <p className="text-stone-400 text-[13px] mb-4">
                    {locale === "id" ? "Ada yang mau ditambahkan? (opsional)" : "Anything else to add? (optional)"}
                  </p>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                      {locale === "id" ? "Pesan" : "Message"}
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder={locale === "id" ? "Ceritakan lebih detail tentang kebutuhan kamu..." : "Tell us more about your needs..."}
                      className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-[13px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue outline-none resize-none"
                    />
                  </div>

                  {/* AI Recommendation */}
                  <div className="border-t border-stone-100 pt-5">
                    <button
                      type="button"
                      onClick={generateRecommendation}
                      disabled={loadingRecommendation}
                      className="w-full bg-gradient-to-r from-electric-blue to-blue-600 text-white text-[13px] font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer"
                    >
                      {loadingRecommendation ? (
                        <><Loader2 size={15} className="animate-spin" /> {locale === "id" ? "Menganalisis..." : "Analyzing..."}</>
                      ) : (
                        <><Sparkles size={15} /> {locale === "id" ? "Generate Rekomendasi AI" : "Generate AI Recommendation"}</>
                      )}
                    </button>

                    {recommendation && (
                      <div className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles size={16} className="text-electric-blue" />
                          <p className="text-[12px] font-bold text-electric-blue uppercase tracking-wider">
                            {locale === "id" ? "REKOMENDASI AI UNTUKMU" : "AI RECOMMENDATION FOR YOU"}
                          </p>
                        </div>
                        <div className="text-[13px] text-stone-700 leading-relaxed whitespace-pre-line">
                          {recommendation}
                        </div>
                        {aiPrice && !aiPriceUsed && (
                          <button
                            type="button"
                            onClick={() => setAiPriceUsed(true)}
                            className="mt-3 w-full bg-green-50 border border-green-200 hover:bg-green-100 text-green-700 text-[12px] font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                          >
                            <CheckCircle size={14} />
                            {locale === "id" ? `Gunakan harga ${aiPrice}` : `Use price ${aiPrice}`}
                          </button>
                        )}
                      </div>
                    )}

                    {recommendationError && (
                      <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-4">
                        <p className="text-[12px] text-red-600">{recommendationError}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
                    <p className="text-[12px] font-semibold text-stone-700">
                      {locale === "id" ? "Ringkasan" : "Summary"}
                    </p>
                    <div className="text-[12px] text-stone-500 space-y-1">
                      <p><span className="text-stone-400">{locale === "id" ? "Nama:" : "Name:"}</span> {form.name}</p>
                      <p><span className="text-stone-400">Email:</span> {form.email}</p>
                      {form.whatsapp && <p><span className="text-stone-400">WhatsApp:</span> {form.whatsapp}</p>}
                      <p><span className="text-stone-400">{locale === "id" ? "Layanan:" : "Service:"}</span> {locale === "id" ? services.find((s) => s.id === form.help)?.labelId : services.find((s) => s.id === form.help)?.labelEn}</p>
                      {aiPriceUsed && aiPrice && <p><span className="text-stone-400">{locale === "id" ? "Harga AI:" : "AI Price:"}</span> <span className="text-green-600 font-semibold">{aiPrice}</span></p>}
                      {form.budget && <p><span className="text-stone-400">{locale === "id" ? "Budget:" : "Budget:"}</span> {form.budget}</p>}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 border border-stone-200 text-stone-600 text-[13px] font-semibold py-3 rounded-full hover:bg-stone-50 transition-all cursor-pointer"
                    >
                      {locale === "id" ? "Kembali" : "Back"}
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-pure-black hover:bg-electric-blue disabled:bg-stone-300 text-white text-[13px] font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      {submitting ? (
                        <><Loader2 size={15} className="animate-spin" /> {locale === "id" ? "Memproses..." : "Processing..."}</>
                      ) : (
                        <><Send size={14} /> {locale === "id" ? "Kirim & Book Call" : "Send & Book Call"}</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-[#fafafa] py-8 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-medium text-stone-500">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-4 text-[11px] text-stone-500">
            <Link href="/" className="hover:text-stone-800 transition-colors">
              {locale === "id" ? "Beranda" : "Home"}
            </Link>
            <Link href="/products" className="hover:text-stone-800 transition-colors">{t("nav.products")}</Link>
            <Link href="/docs" className="hover:text-stone-800 transition-colors">{t("nav.docs")}</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
