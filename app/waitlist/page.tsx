"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Menu, X, Check, ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

const whatsapp =
  "https://wa.me/6281234567890?text=Saya%20mau%20join%20waitlist%20The%20Micro%20Agent%20VPS";

const nav = [
  ["agent", "#agent"],
  ["paket", "#paket"],
  ["cara kerja", "#cara-kerja"],
  ["FAQ", "#faq"],
];

const painPoints = [
  "Bingung setup AI agent sendiri — VPS, OpenClaw, token, config terlalu teknis.",
  "AI tools SaaS mahal dan tidak private — data tetap di platform orang.",
  "Ide, chat, riset, dan kerjaan tidak masuk second brain.",
  "Kerja repetitive makan waktu — planning, konten, outreach bisa diotomasi.",
];

const solutions = [
  "VPS siap pakai",
  "OpenClaw/Hermes installed",
  "9router/COMBO-WOMBO",
  "Telegram micro-agents",
  "Persona + memory",
  "Second Brain / Obsidian-ready vault",
  "Automation workflow",
];

const agents = [
  ["Laufey", "Main Assistant", "Hub utama, command center, dan routing antar agent."],
  ["Atlas", "Daily Planner", "Task, jadwal, reminder, dan daily plan."],
  ["Scout", "Research Agent", "News, market research, dan trend watch."],
  ["Forge", "Coding Agent", "Script, website, automation, dan debugging."],
  ["Spark", "Content Agent", "Ide konten, hook, script, dan caption."],
  ["Echo", "Marketing Agent", "Outreach, sales copy, dan campaign."],
  ["Nimbus", "Weather Agent", "Cuaca, lokasi, dan konteks harian."],
  ["Ledger", "Finance Agent", "Expense, revenue, invoice, dan report."],
] as const;

const plans = [
  { name: "Starter Agent", monthly: "Rp70.000", weekly: "Rp20.000/minggu", badge: "Affordable entry", best: "Best for solo users",
    items: ["1 AI agent", "VPS + OpenClaw/Hermes setup", "Telegram bot", "Basic persona + memory", "Basic second brain folder"],
    cta: "Join Starter Waitlist" },
  { name: "Founder Agent", monthly: "Rp175.000", weekly: "Rp50.000/minggu", badge: "Recommended", best: "Best for solo founders", rec: true,
    items: ["3 agents + main bot", "Full persona per agent", "Second Brain + GitHub sync", "1 automation workflow", "2 revisions/month"],
    cta: "Join Founder Waitlist" },
  { name: "Business Stack", monthly: "Rp350.000", weekly: "Rp100.000/minggu", badge: "Team ready", best: "Best for small businesses",
    items: ["5–7 agents", "Group topic routing", "Obsidian-ready second brain", "Mission control dashboard", "3 automation workflows", "Priority support"],
    cta: "Join Business Waitlist" },
  { name: "Custom / Retainer", monthly: "Rp500.000+", weekly: "Rp150.000+/minggu", badge: "VIP ops", best: "Best for custom workflows",
    items: ["Custom agents", "API integrations", "Advanced automation", "Full maintenance", "VIP support"],
    cta: "Discuss Custom Setup" },
];

const steps = ["Pilih paket", "Isi waitlist", "Kami hubungi via WhatsApp", "VPS + OpenClaw disiapkan", "Agent, persona, memori diuji", "Kamu mulai pakai"];

const useCases = [
  "Daily planner", "Research", "Content", "Coding",
  "Outreach / sales", "Finance", "Customer support", "Second brain",
];

const faqs = [
  ["Apa itu The Micro Agent VPS?", "Layanan setup tim AI agent pribadi di VPS kamu. Termasuk OpenClaw/Hermes, Telegram bot, persona, memory, dan second brain."],
  ["Apakah VPS termasuk harga?", "Tergantung paket. Bisa pakai VPS sendiri atau kami bantu rekomendasi VPS murah."],
  ["Apakah saya perlu ngerti Linux?", "Tidak. Setup teknis kami bantu."],
  ["Bisa pakai Telegram?", "Ya. Agent bisa diakses lewat bot Telegram direct atau group topic."],
  ["Bisa sync ke Obsidian?", "Ya. Second brain siap dengan GitHub private repo + Obsidian Git."],
  ["Bisa tambah agent nanti?", "Bisa. Agent baru ditambah kapan saja."],
  ["Apakah data saya aman?", "Data utama jalan di VPS kamu sendiri. Token dan config disimpan hati-hati."],
  ["Kapan saya bisa mulai?", "Umumnya 1–3 hari tergantung paket dan akses yang tersedia."],
  ["Apa beda ini dengan ChatGPT biasa?", "ChatGPT satu chatbot. The Micro Agent VPS adalah sistem agent pribadi dengan memory, persona, automation, dan akses via Telegram."],
];

export default function WaitlistPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#EDEEF5] text-zinc-900 selection:bg-[#9fff00] selection:text-black [font-family:Inter,system-ui,sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');`}</style>
      <WaitlistNavbar />

      <main>
        <section className="relative flex min-h-[110vh] w-full flex-col items-center justify-start overflow-hidden bg-[#EDEEF5] sm:min-h-[140vh]">
          <div className="pointer-events-none absolute left-0 top-[15vh] z-0 h-[95vh] w-full sm:top-[20vh] sm:h-[120vh]">
            <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-100"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4"
            />
            <div className="absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-[#EDEEF5] to-transparent sm:h-32" />
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-12 gap-x-4 px-8 pt-[150px] md:gap-x-8 md:px-16 md:pt-[180px] lg:px-20">
            <div className="col-span-12 md:col-span-10 md:col-start-2">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[1050px] text-[13vw] font-medium leading-[0.94] tracking-[-0.08em] text-[#1a1a1a] [font-family:Outfit,Inter,sans-serif] sm:text-[10vw] md:text-[86px] lg:text-[112px]"
              >
                <span className="text-[#1a1a1a]">Tim AI Agent Pribadi,</span>{" "}
                <span className="text-[#8e8e8e]">Jalan 24/7</span>
                <br />
                <span className="text-[#8e8e8e]">di VPS Kamu.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-[560px] text-[15px] leading-[1.5] text-[#8e8e8e]"
              >
                Kami setup OpenClaw/Hermes, 9router, Telegram bot, persona, memory, dan second brain
                supaya kamu punya tim AI kecil yang bantu kerja harian.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a href="#form"
                  className="inline-flex h-11 items-center rounded-full bg-[#1a1a1a] px-7 text-sm text-white transition hover:-translate-y-[2px]"
                >
                  Gabung Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="#paket" className="inline-flex h-11 items-center text-sm text-[#1a1a1a]/70 transition hover:text-[#1a1a1a]">
                  Lihat Paket
                </a>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-8 left-8 z-20 text-[11px] text-[#1a1a1a]/50 md:left-10">
            Private VPS · Telegram Bot · Second Brain · 9router/COMBO-WOMBO
          </div>
          <div className="absolute bottom-8 right-8 z-20 text-[11px] text-[#1a1a1a]/50 md:right-10">
            Rp70k/bulan start
          </div>
        </section>

        <section id="problem" className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4 }} className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/50"
          >Problem</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[700px] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif] sm:text-[52px]"
          >
            AI agent kuat, tapi setup sendiri masih ribet.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 grid gap-5 sm:grid-cols-2"
          >
            {painPoints.map((item) => (
              <div key={item} className="rounded-[12px] border border-black/5 bg-white p-5 shadow-sm">
                <p className="text-sm leading-[1.6] text-[#1a1a1a]">{item}</p>
              </div>
            ))}
          </motion.div>
        </section>

        <section id="solusi" className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4 }} className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/50"
          >Solution</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[700px] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif] sm:text-[52px]"
          >
            Kami ubah VPS kamu jadi AI operating system pribadi.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {solutions.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-[10px] border border-black/5 bg-white p-4 shadow-sm">
                <Check className="h-4 w-4 shrink-0 text-[#1a1a1a]" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </motion.div>
        </section>

        <section id="agent" className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4 }} className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/50"
          >Agent team</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[700px] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif] sm:text-[52px]"
          >
            Satu VPS, banyak peran kerja.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {agents.map(([name, role, desc]) => (
              <div key={name} className="rounded-[12px] border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-[2px] hover:shadow-md">
                <h3 className="text-2xl font-medium tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif]">{name}</h3>
                <p className="mt-1 text-sm text-[#1a1a1a]/60">{role}</p>
                <p className="mt-3 text-sm leading-[1.6] text-[#1a1a1a]/80">{desc}</p>
              </div>
            ))}
          </motion.div>
        </section>

        <section id="paket" className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4 }} className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/50"
          >Pricing</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[700px] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif] sm:text-[52px]"
          >
            Mulai kecil, upgrade saat workflow sudah terbukti.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 grid gap-4 lg:grid-cols-4"
          >
            {plans.map((plan) => (
              <div key={plan.name} className={`rounded-[12px] border p-6 ${plan.rec ? "border-black/20 bg-white shadow-[rgba(0,0,0,0.08)_0px_8px_24px_0px]" : "border-black/5 bg-white shadow-sm"}`}>
                <span className={`inline-flex h-6 items-center rounded px-2 text-xs ${plan.rec ? "bg-[#1a1a1a] text-white" : "bg-black/10 text-[#1a1a1a]"}`}>
                  {plan.badge}
                </span>
                <h3 className="mt-5 text-2xl font-medium tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif]">{plan.name}</h3>
                <p className="mt-4 text-[40px] font-medium leading-[1] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif]">{plan.monthly}</p>
                <p className="mt-1 text-sm text-[#1a1a1a]/50">{plan.weekly}</p>
                <p className="mt-2 text-sm text-[#1a1a1a]/70">{plan.best}</p>
                <ul className="mt-5 space-y-3 text-sm leading-[1.5]">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1a1a1a]" />{item}</li>
                  ))}
                </ul>
                <a href={whatsapp} className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#1a1a1a] px-4 text-sm text-white transition hover:-translate-y-[2px]">
                  {plan.cta}
                </a>
              </div>
            ))}
          </motion.div>
          <p className="mt-8 text-center text-sm text-[#1a1a1a]/50">
            Early waitlist members get priority setup + launch discount.
          </p>
        </section>

        <section id="cara-kerja" className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4 }} className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/50"
          >How it works</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[700px] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif] sm:text-[52px]"
          >
            Dari VPS kosong jadi tim AI pribadi.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {steps.map((step, index) => (
              <div key={step} className="rounded-[12px] border border-black/5 bg-white p-5 shadow-sm">
                <span className="text-xs font-medium text-[#1a1a1a]/40">0{index + 1}</span>
                <p className="mt-3 text-base font-medium leading-[1.3]">{step}</p>
              </div>
            ))}
          </motion.div>
        </section>

        <section id="form" className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4 }} className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/50"
          >Join waitlist</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[700px] text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif] sm:text-[52px]"
          >
            Gabung waitlist. 1 agent dulu.
          </motion.h2>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mt-10 rounded-[12px] border border-black/10 bg-white p-8 text-center shadow-sm"
            >
              <p className="text-lg font-medium">Kamu masuk waitlist.</p>
              <p className="mt-2 text-sm text-[#1a1a1a]/60">Kami hubungi via WhatsApp dalam 1-2 hari.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="mt-10 grid gap-5 rounded-[12px] border border-black/5 bg-white p-8 shadow-sm sm:grid-cols-2"
            >
              <input required placeholder="Nama *" className="col-span-full h-11 rounded-[8px] border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#1a1a1a]" />
              <input required placeholder="WhatsApp *" type="tel" className="h-11 rounded-[8px] border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#1a1a1a]" />
              <input placeholder="Email (opsional)" type="email" className="h-11 rounded-[8px] border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#1a1a1a]" />
              <select className="h-11 rounded-[8px] border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#1a1a1a]">
                <option value="">Business type *</option>
                <option>Solo founder</option><option>Creator</option><option>UMKM</option>
                <option>Freelancer</option><option>Agency</option><option>Student / builder</option><option>Other</option>
              </select>
              <select className="h-11 rounded-[8px] border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#1a1a1a]">
                <option value="">Budget *</option>
                <option>Rp70k/bulan</option><option>Rp175k/bulan</option>
                <option>Rp350k/bulan</option><option>Rp500k+/bulan</option><option>Belum tahu</option>
              </select>
              <select className="h-11 rounded-[8px] border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#1a1a1a]">
                <option value="">Main use case *</option>
                {useCases.map((u) => <option key={u}>{u}</option>)}
              </select>
              <select className="h-11 rounded-[8px] border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#1a1a1a]">
                <option value="">Ready to buy? *</option>
                <option>Sekarang</option><option>Minggu ini</option><option>Bulan ini</option><option>Cuma lihat-lihat</option>
              </select>
              <div className="col-span-full mt-2">
                <button type="submit" className="inline-flex h-11 items-center rounded-full bg-[#1a1a1a] px-8 text-sm text-white transition hover:-translate-y-[2px]">
                  Gabung Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                {/* TODO: connect to Tally, Google Sheets, Supabase, or API route. */}
              </div>
            </motion.form>
          )}
        </section>

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
            Pertanyaan sebelum join waitlist.
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

        <section className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-32 lg:px-20">
          <div className="rounded-[12px] border border-black/5 bg-white p-10 text-center shadow-sm sm:p-16">
            <h2 className="text-[40px] font-medium leading-[1.05] tracking-[-0.04em] [font-family:Outfit,Inter,sans-serif]">
              Bangun tim AI agent pribadi kamu minggu ini.
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-sm text-[#1a1a1a]/60">
              Mulai kecil. 1 agent dulu. Kalau cocok, tambah jadi tim digital penuh.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#form" className="inline-flex h-11 items-center rounded-full bg-[#1a1a1a] px-8 text-sm text-white transition hover:-translate-y-[2px]">
                Gabung Waitlist Sekarang <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href={whatsapp} className="inline-flex h-11 items-center text-sm text-[#1a1a1a]/60 transition hover:text-[#1a1a1a]">
                Konsultasi Paket
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 px-8 py-8 text-center text-sm text-[#1a1a1a]/40">
        The Micro Agent Company · Managed AI agent VPS stack
      </footer>
    </div>
  );
}

function WaitlistNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-gradient-to-b from-[#f1f1f1]/80 to-transparent py-6 backdrop-blur-[2px] md:py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-12 items-center px-6 md:px-8 lg:px-10">
        <a href="#top" className="col-span-6 flex items-center gap-3 md:col-span-3">
          <FlowerIcon className="h-8 w-8 fill-[#1a1a1a]" />
          <span className="text-[22px] font-medium tracking-[-0.03em] [font-family:Outfit,Inter,sans-serif]">
           The Micro Agent Co
          </span>
        </a>

        <nav className="col-span-6 hidden items-center justify-center gap-8 md:col-span-6 md:flex">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="text-[13px] lowercase text-[#1a1a1a]/70 transition hover:text-[#1a1a1a]">
              {label}
            </a>
          ))}
        </nav>

        <div className="col-span-6 flex items-center justify-end gap-4 md:col-span-3">
          <a href="#form" className="hidden h-10 items-center rounded-full bg-[#1a1a1a] px-5 text-[13px] lowercase text-white transition hover:-translate-y-[2px] md:inline-flex">
            gabung waitlist →
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
              <a href="#form" onClick={() => setOpen(false)} className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-[#1a1a1a] px-5 text-[13px] lowercase text-white">
                gabung waitlist →
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function FlowerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 4c5.8 0 10.5 4.7 10.5 10.5 0 2.8-1.1 5.3-2.9 7.2 2.4-1.4 5.4-1.9 8.2-1.1 5.6 1.5 8.9 7.3 7.4 12.9-1.5 5.6-7.3 8.9-12.9 7.4 2.3 1.5 4.1 3.8 4.8 6.7 1.5 5.6-1.8 11.4-7.4 12.9-5.6 1.5-11.4-1.8-12.9-7.4-.7-2.7-.3-5.5.9-7.8-1.4 2.3-3.7 4-6.5 4.8-5.6 1.5-11.4-1.8-12.9-7.4-1.5-5.6 1.8-11.4 7.4-12.9 2.8-.8 5.6-.3 7.9 1-2.6-1.3-4.7-3.6-5.5-6.7-1.5-5.6 1.8-11.4 7.4-12.9 2.8-.8 5.6-.3 7.8.9C28.6 10.3 27.5 7.7 27.5 5c1.4-.6 2.9-1 4.5-1Z" />
      <circle cx="32" cy="32" r="7" fill="#EDEEF5" />
    </svg>
  );
}
