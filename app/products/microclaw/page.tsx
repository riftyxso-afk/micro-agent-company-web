"use client";

import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, Menu, X, ChevronDown, MessageCircle, Mail, Calendar, BookOpen, DollarSign, Share2, Bot, Zap, Shield, Smartphone, Globe, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import Link from "next/link";

const nav = [
  ["fitur", "#fitur"],
  ["harga", "#harga"],
  ["cara kerja", "#cara-kerja"],
  ["FAQ", "#faq"],
];

const features = [
  {
    icon: MessageCircle,
    title: "Akses via WhatsApp & Telegram",
    desc: "Chat dengan AI assistant kamu langsung dari WhatsApp atau Telegram. Tidak perlu buka app baru.",
  },
  {
    icon: Mail,
    title: "Manajemen Email & Calendar",
    desc: "Agent baca, balas, dan draft email via Gmail. Jadwalkan meeting dan reminder ke Google Calendar.",
  },
  {
    icon: BookOpen,
    title: "Second Brain & Notes",
    desc: "Simpan ide, riset, dan catatan ke Obsidian vault. Semua terstruktur dan bisa dicari kapan saja.",
  },
  {
    icon: DollarSign,
    title: "Invoice & Tracking",
    desc: "Generate invoice sederhana, tracking pembayaran, dan follow-up otomatis ke pelanggan.",
  },
  {
    icon: Share2,
    title: "Konten & Social Media",
    desc: "Ide konten, draft caption, hook video. Terintegrasi dengan SekaliPost untuk auto-schedule.",
  },
  {
    icon: Bot,
    title: "Custom Agent Persona",
    desc: "Minta agent dengan role spesifik — admin, research, content, sales — sesuai kebutuhan bisnis kamu.",
  },
];

const comparisons = [
  { feature: "Harga per bulan", self: "Rp 0 + VPS ~Rp 105rb", clawi: "~Rp 150rb-300rb", clawindo: "Rp 150rb" },
  { feature: "Setup time", self: "3-5 jam manual", clawi: "Instant", clawindo: "5 menit" },
  { feature: "Maintenance", self: "Kamu sendiri", clawi: "Managed", clawindo: "Managed" },
  { feature: "Support language", self: "-", clawi: "English", clawindo: "Bahasa Indonesia" },
  { feature: "Pembayaran", self: "-", clawi: "USD (Stripe)", clawindo: "IDR (Pakasir)" },
  { feature: "Prioritas WhatsApp", self: "Manual setup", clawi: "Basic", clawindo: "✅ Optimized" },
  { feature: "Integrasi lokal", self: "Manual", clawi: "Tidak ada", clawindo: "SekaliPost" },
];

const plans = [
  {
    name: "Starter",
    price: "Rp 150.000",
    period: "/bulan",
    badge: "Untuk pemula",
    best: "Best untuk: Solo freelancer",
    tokens: "50K token/bulan",
    vps: "1 vCPU · 1GB RAM",
    storage: "25GB storage",
    items: [
      "1 AI agent",
      "Telegram bot access",
      "OpenClaw pre-installed",
      "Dokumentasi Bahasa Indonesia",
      "Support via email (48 jam)",
    ],
    cta: "Mulai 7 Hari Trial",
  },
  {
    name: "Pro",
    price: "Rp 300.000",
    period: "/bulan",
    badge: "Terpopuler",
    best: "Best untuk: UMKM & kreator",
    tokens: "150K token/bulan",
    vps: "1 vCPU · 2GB RAM",
    storage: "50GB storage",
    rec: true,
    items: [
      "3 AI agents + routing",
      "Telegram + WhatsApp access",
      "OpenClaw + custom skills",
      "Gmail + Google Calendar integration",
      "Obsidian vault + sync",
      "Support via WhatsApp (24 jam)",
    ],
    cta: "Mulai 7 Hari Trial",
  },
  {
    name: "Business",
    price: "Rp 500.000",
    period: "/bulan",
    badge: "Tim siap",
    best: "Best untuk: Agency & tim kecil",
    tokens: "500K token/bulan",
    vps: "2 vCPU · 2GB RAM",
    storage: "100GB storage",
    items: [
      "5+ AI agents + team sharing",
      "WhatsApp + Telegram + Discord",
      "Custom agent persona",
      "Semua integrasi + API access",
      "Invoice & payment tracking",
      "Priority support + onboarding call",
    ],
    cta: "Mulai 7 Hari Trial",
  },
];

const steps = [
  { num: "01", title: "Pilih Paket", desc: "Pilih tier yang sesuai dengan kebutuhan bisnis kamu." },
  { num: "02", title: "Daftar & Bayar", desc: "Isi form, bayar via QRIS atau Virtual Account (BNI, BRI, BCA, Mandiri)." },
  { num: "03", title: "VPS Auto-Provision", desc: "Sistem kami setup VPS DigitalOcean + install OpenClaw secara otomatis (5-10 menit)." },
  { num: "04", title: "Mulai Chat", desc: "Dapat email credentials + panduan. Connect ke Telegram/WhatsApp, langsung ngobrol dengan agent kamu." },
];

const useCases = [
  {
    role: "UMKM Owner",
    quote: "Agent saya tracking invoice pelanggan dan kirim reminder follow-up penjualan otomatis via WhatsApp.",
  },
  {
    role: "Content Creator",
    quote: "Agent bantu riset trend TikTok, generate caption, dan schedule post ke Instagram.",
  },
  {
    role: "Freelancer",
    quote: "Setiap pagi agent kirim summary email penting dan reminder deadline project.",
  },
  {
    role: "Small Agency",
    quote: "Tim kami share 1 agent untuk track client requests dan generate report mingguan.",
  },
];

const faqs = [
  ["Apa itu MicroClaw?", "MicroClaw adalah layanan hosting OpenClaw di cloud. Kami setup VPS + OpenClaw + Telegram/WhatsApp bot untuk kamu. Kamu tinggal pakai — chat dengan AI assistant seperti ngobrol dengan teman kerja."],
  ["Apa bedanya MicroClaw dengan Clawi.ai?", "MicroClaw dibuat khusus untuk pebisnis Indonesia: support Bahasa Indonesia, harga Rupiah, pembayaran via QRIS & Virtual Account, integrasi dengan SekaliPost, dan optimized untuk WhatsApp."],
  ["Apakah data saya aman?", "Setiap pelanggan punya VPS sendiri yang terisolasi. Data kamu tetap di VPS pribadi, bukan di server bersama. Kami tidak log percakapan kamu."],
  ["Saya tidak bisa technical, apakah bisa?", "Bisa. Semua setup otomatis. Kamu tinggal daftar, bayar, dan dapat email credentials. Connect ke Telegram — langsung bisa chat dengan agent."],
  ["Bisa custom agent untuk kebutuhan spesifik?", "Bisa di tier Business. Request custom agent persona — admin, research, content, sales — kamu tentuin sendiri. Atau request custom skill untuk use case spesifik."],
  ["Kalau VPS down bagaimana?", "Kami monitor 24/7. Ada auto-restart systemd service + DO monitoring. Kalau ada issue, VPS auto restart dalam hitungan menit."],
  ["Bisa upgrade paket?", "Bisa kapan saja. Upgrade otomatis — VPS di-scale, token limit dinaikkan. Pro-rated billing untuk sisa bulan."],
  ["Berapa lama setup-nya?", "5-10 menit setelah pembayaran success. Kamu dapat email langsung begitu VPS dan OpenClaw siap."],
  ["Kalau tidak cocok, bisa refund?", "Ya, 7 hari money-back guarantee. Kami refund full kalau kamu tidak puas dalam 7 hari pertama."],
];

export default function MicroClawPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const params = new URLSearchParams();
    params.set("name", data.get("name") as string);
    params.set("email", data.get("email") as string);
    params.set("whatsapp", (data.get("whatsapp") as string) || "");
    params.set("plan", data.get("plan") as string);
    params.set("bisnis", data.get("bisnis") as string);
    params.set("use_case", data.get("use_case") as string);
    window.location.href = `/products/microclaw/payment?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-[#EDEEF5] text-zinc-900 selection:bg-[#9fff00] selection:text-black [font-family:Inter,system-ui,sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');`}</style>
      <MicroClawNavbar />

      <main>
        {/* ── HERO ── */}
        <section className="relative flex min-h-[100vh] w-full flex-col items-center justify-start overflow-hidden bg-[#EDEEF5]">
          <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full opacity-[0.07]">
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_#0000EE_0%,_transparent_70%)]" />
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-12 gap-x-4 px-8 pt-[140px] md:gap-x-8 md:px-16 md:pt-[160px] lg:px-20">
            <div className="col-span-12 md:col-span-10 md:col-start-2">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mb-4"
              >
                <span className="inline-flex h-7 items-center rounded-full bg-[#0000EE]/10 px-4 text-xs font-medium text-[#0000EE]">
                  Powered by OpenClaw
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[1050px] text-[13vw] font-medium leading-[0.94] tracking-[-0.08em] text-[#1a1a1a] [font-family:Outfit,Inter,sans-serif] sm:text-[10vw] md:text-[86px] lg:text-[112px]"
              >
                <span className="text-[#1a1a1a]">AI Assistant 24/7</span>{" "}
                <span className="text-[#8e8e8e]">di Cloud,</span>
                <br />
                <span className="text-[#8e8e8e]">untuk Bisnis Kamu.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-[560px] text-[15px] leading-[1.5] text-[#8e8e8e]"
              >
                OpenClaw managed hosting untuk pebisnis Indonesia. Setup otomatis,
                akses via WhatsApp/Telegram, integrasi Gmail & Calendar.
                Mulai dari <strong className="text-[#1a1a1a]">Rp 150.000/bulan</strong>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a href="#form"
                  className="inline-flex h-11 items-center rounded-full bg-[#1a1a1a] px-7 text-sm text-white transition hover:-translate-y-[2px] hover:bg-[#0000EE]"
                >
                  Mulai Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="#harga" className="inline-flex h-11 items-center text-sm text-[#1a1a1a]/70 transition hover:text-[#1a1a1a]">
                  Lihat Harga
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 flex flex-wrap items-center gap-6 text-xs text-[#1a1a1a]/50"
              >
                <span className="flex items-center gap-1.5"><Zap size={14} />Setup 5 menit</span>
                <span className="flex items-center gap-1.5"><Smartphone size={14} />WhatsApp + Telegram</span>
                <span className="flex items-center gap-1.5"><Shield size={14} />VPS pribadi</span>
                <span className="flex items-center gap-1.5"><Globe size={14} />Support Bahasa Indonesia</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4 }} className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/50"
          >Masalah</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[700px] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif] sm:text-[52px]"
          >
            AI itu powerful, tapi setup sendiri masih ribet dan mahal.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 grid gap-5 sm:grid-cols-2"
          >
            {[
              "Panjang banget tutorial setup OpenClaw — VPS, Node.js, config, token — bikin pusing non-teknis.",
              "Layanan hosting luar negeri mahal dan pakai USD. Bayar pajak + markup外汇 bikin price jadi gila.",
              "Support English doang. Kalau error, harus Google translate dulu baru bisa cari solusi.",
              "Tools yang ada tidak connect ke ekosistem lokal — pembayaran, WhatsApp, integrasi tools Indonesia.",
            ].map((item) => (
              <div key={item} className="rounded-[12px] border border-black/5 bg-white p-5 shadow-sm">
                <p className="text-sm leading-[1.6] text-[#1a1a1a]">{item}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── FEATURES ── */}
        <section id="fitur" className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4 }} className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/50"
          >Fitur</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[700px] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif] sm:text-[52px]"
          >
            Agent AI yang benar-benar kerja untuk bisnis kamu.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f) => (
              <div key={f.title} className="rounded-[12px] border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-[2px] hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#0000EE]/10">
                  <f.icon size={20} className="text-[#0000EE]" />
                </div>
                <h3 className="mt-5 text-base font-medium">{f.title}</h3>
                <p className="mt-2 text-sm leading-[1.6] text-[#1a1a1a]/70">{f.desc}</p>
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 rounded-[12px] border border-black/5 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-[#0000EE]/10 px-3 py-1.5 text-xs font-medium text-[#0000EE]">Integrasi dengan produk kamu:</span>
              <Link href="/products" className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-medium text-[#1a1a1a]/70 transition hover:bg-[#0000EE]/10 hover:text-[#0000EE]">
                SekaliPost → Content scheduling
              </Link>

            </div>
          </motion.div>
        </section>

        {/* ── COMPARISON ── */}
        <section className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4 }} className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/50"
          >Bandingkan</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[700px] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif] sm:text-[52px]"
          >
            MicroClaw vs Self-Hosted vs Clawi.ai
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 overflow-x-auto"
          >
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-black/10 text-left text-xs font-medium uppercase tracking-[0.08em] text-[#1a1a1a]/50">
                  <th className="py-3 pr-6" />
                  <th className="py-3 pr-6">Self-Hosted</th>
                  <th className="py-3 pr-6">Clawi.ai</th>
                  <th className="py-3 pr-6 text-[#0000EE]">MicroClaw</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <tr key={row.feature} className="border-b border-black/5">
                    <td className="py-3 pr-6 text-sm font-medium">{row.feature}</td>
                    <td className="py-3 pr-6 text-sm text-[#1a1a1a]/60">{row.self}</td>
                    <td className="py-3 pr-6 text-sm text-[#1a1a1a]/60">{row.clawi}</td>
                    <td className="py-3 pr-6 text-sm font-medium text-[#0000EE]">{row.clawindo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </section>

        {/* ── PRICING ── */}
        <section id="harga" className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4 }} className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/50"
          >Harga</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[700px] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif] sm:text-[52px]"
          >
            3 paket sederhana. Pilih yang cocok.
          </motion.h2>
          <p className="mt-4 max-w-[560px] text-sm text-[#1a1a1a]/60">
            Semua paket include: VPS DigitalOcean + OpenClaw pre-installed + setup otomatis + dokumentasi Bahasa Indonesia.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 grid gap-5 lg:grid-cols-3"
          >
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[12px] border p-6 flex flex-col justify-between ${
                  plan.rec
                    ? "border-[#0000EE]/30 bg-white shadow-[rgba(0,0,238,0.08)_0px_8px_24px_0px] ring-1 ring-[#0000EE]/20"
                    : "border-black/5 bg-white shadow-sm"
                }`}
              >
                <div>
                  <span className={`inline-flex h-6 items-center rounded px-2 text-xs ${
                    plan.rec ? "bg-[#0000EE] text-white" : "bg-black/10 text-[#1a1a1a]"
                  }`}>
                    {plan.badge}
                  </span>
                  <h3 className="mt-5 text-2xl font-medium tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif]">{plan.name}</h3>
                  <div className="mt-3">
                    <span className="text-[40px] font-medium leading-[1] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif]">{plan.price}</span>
                    <span className="text-sm text-[#1a1a1a]/50">{plan.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-[#1a1a1a]/70">{plan.best}</p>

                  <div className="mt-5 space-y-2 rounded-[8px] bg-stone-50 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#1a1a1a]/60">AI Tokens</span>
                      <span className="font-medium">{plan.tokens}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#1a1a1a]/60">VPS Spec</span>
                      <span className="font-medium">{plan.vps}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#1a1a1a]/60">Storage</span>
                      <span className="font-medium">{plan.storage}</span>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3 text-sm leading-[1.5]">
                    {plan.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1a1a1a]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={plan.rec ? "#form" : "#form"}
                  className={`mt-6 inline-flex h-11 w-full items-center justify-center rounded-full px-4 text-sm transition hover:-translate-y-[2px] ${
                    plan.rec
                      ? "bg-[#0000EE] text-white hover:bg-[#0000DD]"
                      : "bg-[#1a1a1a] text-white hover:bg-stone-800"
                  }`}
                >
                  {plan.cta} <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </motion.div>
          <p className="mt-6 text-center text-sm text-[#1a1a1a]/50">
            Semua paket include 7 hari free trial. Tidak puas? Uang kembali.
          </p>
        </section>

        {/* ── USE CASES ── */}
        <section className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4 }} className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/50"
          >Use Cases</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[700px] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif] sm:text-[52px]"
          >
            Untuk siapa MicroClaw?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 grid gap-5 sm:grid-cols-2"
          >
            {useCases.map((uc) => (
              <div key={uc.role} className="rounded-[12px] border border-black/5 bg-white p-6 shadow-sm">
                <p className="text-sm leading-[1.6] italic text-[#1a1a1a]/80">&ldquo;{uc.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0000EE]/10 text-xs font-bold text-[#0000EE]">
                    {uc.role.charAt(0)}
                  </div>
                  <span className="text-xs font-medium text-[#1a1a1a]/60">{uc.role}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="cara-kerja" className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4 }} className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/50"
          >Cara Kerja</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[700px] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif] sm:text-[52px]"
          >
            Dari daftar sampai chat dengan agent dalam 10 menit.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step) => (
              <div key={step.num} className="rounded-[12px] border border-black/5 bg-white p-6 shadow-sm">
                <span className="text-3xl font-medium text-[#0000EE]/30 [font-family:Outfit,Inter,sans-serif]">{step.num}</span>
                <h3 className="mt-3 text-base font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-[1.6] text-[#1a1a1a]/70">{step.desc}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4 }} className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/50"
          >FAQ</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[700px] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif] sm:text-[52px]"
          >
            Pertanyaan sebelum mulai.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 grid gap-4 md:grid-cols-2"
          >
            {faqs.map(([q, a]) => (
              <details key={q} className="rounded-[12px] border border-black/5 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer text-sm font-medium leading-[1.3]">{q}</summary>
                <p className="mt-3 text-sm leading-[1.6] text-[#1a1a1a]/70">{a}</p>
              </details>
            ))}
          </motion.div>
        </section>

        {/* ── FORM / SIGNUP ── */}
        <section id="form" className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4 }} className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/50"
          >Daftar</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[700px] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif] sm:text-[52px]"
          >
            Mulai 7 hari free trial. <br />Bayar nanti setelah puas.
          </motion.h2>
          <p className="mt-4 max-w-[480px] text-sm text-[#1a1a1a]/60">
            Isi form di bawah. Kami kirim credentials + panduan dalam 10 menit.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mt-10 rounded-[12px] border border-black/10 bg-white p-8 text-center shadow-sm"
            >
              <p className="text-lg font-medium">Pendaftaran berhasil! 🎉</p>
              <p className="mt-2 text-sm text-[#1a1a1a]/60">
                Kami kirim email dengan credentials VPS + OpenClaw dalam 5-10 menit. Cek inbox kamu!
              </p>
              <p className="mt-1 text-xs text-[#1a1a1a]/40">Tidak terima? Cek folder spam atau hubungi support@microclaw.com</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="mt-10 grid gap-5 rounded-[12px] border border-black/5 bg-white p-8 shadow-sm sm:grid-cols-2"
            >
              <input required name="name" placeholder="Nama lengkap *" className="col-span-full h-11 rounded-[8px] border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#1a1a1a]" />
              <input required name="email" placeholder="Email *" type="email" className="h-11 rounded-[8px] border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#1a1a1a]" />
              <input name="whatsapp" placeholder="Nomor WhatsApp (opsional)" type="tel" className="h-11 rounded-[8px] border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#1a1a1a]" />
              <select name="plan" className="h-11 rounded-[8px] border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#1a1a1a]">
                <option value="">Pilih paket *</option>
                <option value="starter">Starter - Rp 150.000/bln</option>
                <option value="pro">Pro - Rp 300.000/bln (Recommended)</option>
                <option value="business">Business - Rp 500.000/bln</option>
              </select>
              <select name="bisnis" className="h-11 rounded-[8px] border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#1a1a1a]">
                <option value="">Tipe bisnis *</option>
                <option value="umkm">UMKM / Owner</option><option value="creator">Content Creator</option>
                <option value="freelancer">Freelancer</option><option value="agency">Agency</option>
                <option value="solo">Solo founder</option><option value="student">Student / Builder</option><option value="lainnya">Lainnya</option>
              </select>
              <select name="use_case" className="h-11 rounded-[8px] border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#1a1a1a]">
                <option value="">Main use case *</option>
                <option value="admin">Admin / daily ops</option><option value="research">Research</option>
                <option value="content">Content / social media</option><option value="sales">Sales / outreach</option>
                <option value="support">Support / customer care</option><option value="growth">Growth / marketing</option>
                <option value="lainnya">Lainnya</option>
              </select>
              <div className="col-span-full mt-2">
                <button type="submit" className="inline-flex h-11 items-center rounded-full bg-[#1a1a1a] px-8 text-sm text-white transition hover:-translate-y-[2px] hover:bg-[#0000EE]">
                  Lanjut ke Pembayaran <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.form>
          )}
        </section>

        {/* ── FINAL CTA ── */}
        <section className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <div className="rounded-[12px] border border-black/5 bg-white p-10 text-center shadow-sm sm:p-16">
            <h2 className="text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif]">
              AI assistant 24/7 untuk bisnis kamu, <br />siap dalam 10 menit.
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-sm text-[#1a1a1a]/60">
              Setup otomatis. Harga Rupiah. Support Bahasa Indonesia. 7 hari free trial.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#form" className="inline-flex h-11 items-center rounded-full bg-[#1a1a1a] px-8 text-sm text-white transition hover:-translate-y-[2px] hover:bg-[#0000EE]">
                Mulai Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href="#" className="inline-flex h-11 items-center text-sm text-[#1a1a1a]/60 transition hover:text-[#1a1a1a]">
                Lihat Demo (Coming Soon)
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 px-8 py-12 text-center">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-center gap-2 mb-6">
            <ClawIcon className="h-6 w-6 fill-[#1a1a1a]" />
            <span className="text-lg font-medium tracking-[-0.03em] [font-family:Outfit,Inter,sans-serif]">MicroClaw</span>
          </div>
          <p className="text-sm text-[#1a1a1a]/40">Powered by OpenClaw · Part of The Micro Agent Company</p>
          <p className="mt-2 text-xs text-[#1a1a1a]/30">© 2026 The Micro Agent Company, Inc. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-4 text-xs text-[#1a1a1a]/40">
            <a href="#" className="hover:text-[#1a1a1a]">Terms</a>
            <a href="#" className="hover:text-[#1a1a1a]">Privacy</a>
            <a href="#" className="hover:text-[#1a1a1a]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MicroClawNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-gradient-to-b from-[#f1f1f1]/80 to-transparent py-6 backdrop-blur-[2px] md:py-4">
      <div className="mx-auto grid max-w-7xl grid-cols-12 items-center px-6 md:px-8 lg:px-10">
        <Link href="/" className="col-span-6 flex items-center gap-3 md:col-span-3">
          <ClawIcon className="h-8 w-8 fill-[#1a1a1a]" />
          <span className="text-[22px] font-medium tracking-[-0.03em] [font-family:Outfit,Inter,sans-serif]">
            MicroClaw
          </span>
        </Link>

        <nav className="col-span-6 hidden items-center justify-center gap-8 md:col-span-6 md:flex">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="text-[13px] lowercase text-[#1a1a1a]/70 transition hover:text-[#1a1a1a]">
              {label}
            </a>
          ))}
          <Link href="/docs/microclaw" className="text-[13px] lowercase text-[#1a1a1a]/70 transition hover:text-[#1a1a1a]">
            docs
          </Link>
          <Link href="/products" className="text-[13px] lowercase text-[#1a1a1a]/70 transition hover:text-[#1a1a1a]">
            produk lain
          </Link>
        </nav>

        <div className="col-span-6 flex items-center justify-end gap-4 md:col-span-3">
          <Link href="/dashboard/microclaw" className="hidden h-10 items-center rounded-full bg-stone-100 px-4 text-[13px] lowercase text-[#1a1a1a]/60 transition hover:bg-stone-200 md:inline-flex">
            dashboard
          </Link>
          <a href="#form" className="hidden h-10 items-center rounded-full bg-[#1a1a1a] px-5 text-[13px] lowercase text-white transition hover:-translate-y-[2px] hover:bg-[#0000EE] md:inline-flex">
            mulai trial →
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-white/70 shadow-sm md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -18, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -18, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mx-6 mt-4 overflow-hidden rounded-[28px] border border-black/5 bg-white/70 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {nav.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="text-[15px] lowercase text-[#1a1a1a]">
                  {label}
                </a>
              ))}
              <Link href="/products" onClick={() => setOpen(false)} className="text-[15px] lowercase text-[#1a1a1a]">
                produk lain
              </Link>
              <a href="#form" onClick={() => setOpen(false)} className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-[#1a1a1a] px-5 text-[13px] lowercase text-white">
                mulai trial →
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function ClawIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 4c5.8 0 10.5 4.7 10.5 10.5 0 2.8-1.1 5.3-2.9 7.2 2.4-1.4 5.4-1.9 8.2-1.1 5.6 1.5 8.9 7.3 7.4 12.9-1.5 5.6-7.3 8.9-12.9 7.4 2.3 1.5 4.1 3.8 4.8 6.7 1.5 5.6-1.8 11.4-7.4 12.9-5.6 1.5-11.4-1.8-12.9-7.4-.7-2.7-.3-5.5.9-7.8-1.4 2.3-3.7 4-6.5 4.8-5.6 1.5-11.4-1.8-12.9-7.4-1.5-5.6 1.8-11.4 7.4-12.9 2.8-.8 5.6-.3 7.9 1-2.6-1.3-4.7-3.6-5.5-6.7-1.5-5.6 1.8-11.4 7.4-12.9 2.8-.8 5.6-.3 7.8.9C28.6 10.3 27.5 7.7 27.5 5c1.4-.6 2.9-1 4.5-1Z" />
      <path d="M40 28c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8Z" fill="#EDEEF5" />
      <path d="M46 38c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6Z" fill="#EDEEF5" />
      <path d="M18 38c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6Z" fill="#EDEEF5" />
    </svg>
  );
}
