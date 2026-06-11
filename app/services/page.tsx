"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CalendarCheck,
  Check,
  Cloud,
  Code2,
  Database,
  FileText,
  GitBranch,
  MessageCircle,
  Newspaper,
  Radar,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  WalletCards,
} from "lucide-react";

const whatsapp =
  "https://wa.me/6281234567890?text=Saya%20mau%20setup%20The%20Micro%20Agent%20VPS";

const nav = [
  ["Solusi", "#solusi"],
  ["Agent", "#agent"],
  ["Paket", "#paket"],
  ["Cara kerja", "#cara-kerja"],
  ["FAQ", "#faq"],
];

const problems = [
  "Ribet setup VPS sendiri",
  "Bingung install OpenClaw/Hermes",
  "Persona dan memory agent tidak rapi",
  "AI SaaS mahal dan data tersebar",
];

const solution = [
  "VPS configured",
  "OpenClaw/Hermes installed",
  "9router model provider",
  "Telegram micro-agents",
  "Shared memory",
  "Second Brain / Obsidian-ready",
  "Automation workflows",
];

const agents = [
  ["Laufey", "Main", "Command hub untuk semua agent.", Bot],
  ["Atlas", "Planner", "Rencana harian, prioritas, dan follow-up.", CalendarCheck],
  ["Scout", "Research", "News, market, kompetitor, dan insight.", Newspaper],
  ["Forge", "Coding", "Code, debug, deploy, dan cek service.", Code2],
  ["Nimbus", "Context", "Weather, lokasi, dan konteks harian.", Cloud],
  ["Spark", "Content", "Ide konten, script, caption, dan hook.", Sparkles],
  ["Echo", "Outreach", "Follow-up, sales note, dan pipeline.", MessageCircle],
  ["Ranker", "Visibility", "SEO, AI visibility, dan positioning.", Radar],
  ["Ledger", "Finance", "Revenue, biaya, dan laporan cashflow.", WalletCards],
] as const;

const plans = [
  {
    name: "Starter Agent",
    price: "Rp70.000",
    week: "Rp20.000/week",
    label: "Affordable entry",
    accent: true,
    best: "Best for solo users",
    items: ["1 AI agent", "VPS + OpenClaw/Hermes setup", "Telegram bot", "Basic persona + memory", "Basic second brain folder"],
  },
  {
    name: "Founder Agent",
    price: "Rp175.000",
    week: "Rp50.000/week",
    label: "Recommended",
    recommended: true,
    best: "Best for solo founders",
    items: ["3 agents + main bot", "Full persona per agent", "Second Brain + GitHub sync", "1 automation workflow", "2 revisions/month"],
  },
  {
    name: "Business Stack",
    price: "Rp350.000",
    week: "Rp100.000/week",
    label: "Team stack",
    best: "Best for small businesses",
    items: ["5–7 agents", "Group topic routing", "Obsidian-ready second brain", "Mission control dashboard", "3 automation workflows", "Priority support"],
  },
  {
    name: "Custom / Retainer",
    price: "Rp500.000+",
    week: "Rp150.000+/week",
    label: "Custom ops",
    best: "Best for advanced workflows",
    items: ["Custom agents", "API integrations", "Advanced automation", "Full maintenance", "VIP support"],
  },
];

const steps = [
  "Kamu pilih paket",
  "Kami setup VPS + OpenClaw/Hermes",
  "Kami buat agent, persona, memory, dan Telegram bot",
  "Kami test semua agent",
  "Kamu mulai pakai tim AI pribadi",
];

const useCases = [
  ["Daily planning", CalendarCheck],
  ["Research market/news", Newspaper],
  ["Content ideas and scripts", FileText],
  ["Coding support", Code2],
  ["Outreach and follow-up", MessageCircle],
  ["Finance tracking", WalletCards],
  ["Second brain / knowledge base", BrainCircuit],
  ["Business reports", Server],
] as const;

const tech = ["Ubuntu VPS", "OpenClaw / Hermes", "9router / COMBO-WOMBO", "Telegram Bot API", "GitHub private repo", "Obsidian", "systemd 24/7 service"];

const faqs = [
  ["Apa itu OpenClaw/Hermes?", "Runtime untuk menjalankan agent pribadi, memory, tool, automation, dan komunikasi via bot."],
  ["Apakah saya perlu ngerti Linux?", "Tidak. Kami setup, test, dan beri cara pakai ringkas."],
  ["Apakah VPS termasuk?", "Bisa pakai VPS kamu sendiri atau kami bantu rekomendasi VPS murah."],
  ["Bisa pakai Telegram?", "Bisa. Bot Telegram adalah interface utama yang paling praktis."],
  ["Bisa tambah agent?", "Bisa. Paket bisa naik kapan saja sesuai kebutuhan."],
  ["Bisa sync ke Obsidian?", "Bisa. Kami siapkan folder second brain yang Obsidian-ready."],
  ["Apakah data saya aman?", "Stack berjalan di VPS kamu. Token diamankan, config bisa dibackup, dan akses tidak dibuka sembarangan."],
  ["Kalau agent error bagaimana?", "Kami cek log, service, token, routing, dan restart/hardening sesuai paket support."],
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F8] text-black">
      <nav className="border-b border-[#E5E5E5] bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-0">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#0000EE] text-white">
              <Terminal className="h-5 w-5" />
            </span>
            <span className="font-serif text-xl leading-none">The Micro Agent Company</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} className="border-b-2 border-transparent py-2 text-xs text-black hover:border-[#0000EE] hover:text-[#0000EE]">
                {label}
              </Link>
            ))}
          </div>
          <Link href={whatsapp} className="hidden h-11 items-center rounded-full bg-[#0000EE] px-4 text-xs text-white hover:bg-[#0023EC] sm:inline-flex">
            Mulai setup
          </Link>
        </div>
      </nav>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-[60px] lg:grid-cols-[1.05fr_.95fr] lg:px-0 lg:py-20">
          <div>
            <div className="mb-6 inline-flex h-6 items-center rounded bg-[#F89104] px-2 text-xs text-white">
              Private VPS · Telegram Bot · Second Brain · 9router/COMBO-WOMBO
            </div>
            <h1 className="font-serif text-[44px] font-normal leading-[1.2] tracking-normal sm:text-[56px]">
              <TypewriterText
                texts={[
                  "Tim AI Agent Pribadi, Jalan 24/7 di VPS Kamu",
                  "VPS AI Agent, Siap Kerja dari Telegram",
                  "OpenClaw/Hermes Setup, Memory, dan Automation",
                  "Private AI Team untuk Founder dan UMKM",
                ]}
              />
            </h1>
            <p className="mt-6 max-w-[640px] font-serif text-[28px] leading-[42px] text-[#333333]">
              Setup VPS AI agent 24/7: bot Telegram, memory, dashboard, dan automation siap pakai.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton>Mulai dari Rp70k/bulan</PrimaryButton>
              <SecondaryButton href="#paket">Lihat Paket</SecondaryButton>
            </div>
          </div>

          <div className="border border-[#E5E5E5] bg-[#FFFCFC] p-6 lg:p-10">
            <div className="mb-6 flex items-center justify-between border-b border-[#E5E5E5] pb-4">
              <span className="font-serif text-xl">Private AI OS</span>
              <span className="rounded bg-[#0000EE] px-2 py-1 text-xs text-white">LIVE</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              {["laufey route task", "atlas plan day", "scout scan market", "forge deploy check", "memory sync second-brain"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-[10px] border border-[#E5E5E5] bg-white p-4 shadow-[rgba(0,0,0,0.05)_0px_2px_8px_0px]">
                  <span>$ {item}</span>
                  <Check className="h-4 w-4 text-[#0000EE]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section id="problem" label="Problem" title="Setup AI agent sendiri terlalu banyak titik gagal.">
        <Grid4>{problems.map((item) => <Card key={item} icon={ShieldCheck} title={item} />)}</Grid4>
      </Section>

      <Section id="solusi" label="Solution" title="The Micro Agent VPS memberi kamu private AI operating system.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solution.map((item) => <Card key={item} icon={Check} title={item} />)}
        </div>
      </Section>

      <Section id="agent" label="Agent team" title="Agent kecil, peran jelas, kerja harian lebih ringan.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map(([name, role, desc, Icon]) => (
            <article key={name} className="rounded-[10px] border border-[#E5E5E5] bg-white p-6 shadow-[rgba(0,0,0,0.05)_0px_2px_8px_0px]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-[28px] leading-[42px]">{name}</h3>
                  <p className="text-xs text-[#0000EE]">{role}</p>
                </div>
                <Icon className="h-6 w-6 text-[#F89104]" />
              </div>
              <p className="mt-4 text-sm leading-6 text-[#333333]">{desc}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="paket" label="Pricing" title="Mulai kecil, upgrade saat workflow sudah terbukti.">
        <div className="grid gap-4 lg:grid-cols-4">
          {plans.map((plan) => (
            <article key={plan.name} className={`rounded-[10px] border p-6 ${plan.recommended ? "border-[#0000EE] bg-white shadow-[rgba(0,0,238,0.12)_0px_8px_24px_0px]" : plan.accent ? "border-[#F89104] bg-[#FFFAF5]" : "border-[#E5E5E5] bg-white shadow-[rgba(0,0,0,0.05)_0px_2px_8px_0px]"}`}>
              <span className={`inline-flex h-6 items-center rounded px-2 text-xs text-white ${plan.recommended ? "bg-[#0000EE]" : plan.accent ? "bg-[#F89104]" : "bg-[#737373]"}`}>{plan.label}</span>
              <h3 className="mt-6 font-serif text-[28px] leading-[42px]">{plan.name}</h3>
              <p className="mt-4 font-serif text-[46px] leading-[1.1]">{plan.price}</p>
              <p className="mt-1 text-xs text-[#737373]">{plan.week} · {plan.best}</p>
              <ul className="mt-6 space-y-3 text-sm leading-6">
                {plan.items.map((item) => <li key={item} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-[#0000EE]" />{item}</li>)}
              </ul>
              <Link href={whatsapp} className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#0000EE] px-4 text-xs text-white hover:bg-[#0023EC]">
                Pilih paket
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section id="cara-kerja" label="How it works" title="Lima langkah sampai agent kamu siap dipakai.">
        <ol className="grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step} className="rounded-[10px] border border-[#E5E5E5] bg-white p-6">
              <span className="text-xs text-[#0000EE]">0{index + 1}</span>
              <p className="mt-4 font-serif text-xl leading-6">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="use-cases" label="Use cases" title="Bukan cuma chat. Ini operasional harian.">
        <Grid4>{useCases.map(([item, Icon]) => <Card key={item} icon={Icon} title={item} />)}</Grid4>
      </Section>

      <Section id="tech" label="Tech stack" title="Stack terbuka, bisa diaudit, dan kamu punya akses.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tech.map((item) => <div key={item} className="rounded-[10px] border border-[#E5E5E5] bg-white p-6 text-sm shadow-[rgba(0,0,0,0.05)_0px_2px_8px_0px]">{item}</div>)}
        </div>
      </Section>

      <Section id="security" label="Security" title="Ownership dan keamanan bukan addon.">
        <div className="grid gap-4 md:grid-cols-3">
          <Card icon={Database} title="Runs on your own VPS. You own your data." />
          <Card icon={GitBranch} title="Config backup dan GitHub private repo tersedia." />
          <Card icon={ShieldCheck} title="Bot tokens secured, 9router protected, no unnecessary SaaS lock-in." />
        </div>
      </Section>

      <Section id="faq" label="FAQ" title="Pertanyaan sebelum setup.">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map(([q, a]) => (
            <details key={q} className="rounded-[10px] border border-[#E5E5E5] bg-white p-6 shadow-[rgba(0,0,0,0.05)_0px_2px_8px_0px]">
              <summary className="cursor-pointer font-serif text-xl">{q}</summary>
              <p className="mt-4 text-sm leading-6 text-[#333333]">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-0">
          <div className="max-w-[780px]">
            <span className="inline-flex h-6 items-center rounded bg-[#F89104] px-2 text-xs text-white">Ready this week</span>
            <h2 className="mt-6 font-serif text-[52px] leading-[62.4px]">Bangun tim AI agent pribadi kamu minggu ini.</h2>
            <p className="mt-6 text-sm leading-6 text-white/75">Mulai dari Starter Agent. Naikkan ke Founder atau Business Stack ketika workflow kamu sudah jalan.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton>Mulai Setup Sekarang</PrimaryButton>
              <SecondaryButton href={whatsapp}>Konsultasi Paket</SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E5E5E5] bg-white px-6 py-8 text-center text-xs text-[#737373]">
        The Micro Agent Company · Managed AI agent VPS stack
      </footer>
    </main>
  );
}

function TypewriterText({ texts }: { texts: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const currentText = texts[textIndex] ?? texts[0] ?? "";

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasStarted(true);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted || texts.length === 0) return;

    let index = 0;
    let deleting = false;
    let timeout: number;

    const tick = () => {
      const nextText = texts[textIndex] ?? "";

      if (!deleting) {
        index += 1;
        setDisplayed(nextText.slice(0, index));

        if (index >= nextText.length) {
          deleting = true;
          timeout = window.setTimeout(tick, 1300);
          return;
        }

        timeout = window.setTimeout(tick, 34);
        return;
      }

      index -= 1;
      setDisplayed(nextText.slice(0, index));

      if (index <= 0) {
        setTextIndex((current) => (current + 1) % texts.length);
        return;
      }

      timeout = window.setTimeout(tick, 18);
    };

    setDisplayed("");
    timeout = window.setTimeout(tick, 160);
    return () => window.clearTimeout(timeout);
  }, [hasStarted, textIndex, texts]);

  return (
    <span ref={ref} aria-label={currentText} className="inline-block min-h-[2.4em] sm:min-h-[2.4em]">
      <span aria-hidden="true">{displayed}</span>
      <span aria-hidden="true" className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] animate-pulse bg-[#0000EE]" />
    </span>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <Link href={whatsapp} className="inline-flex h-11 items-center justify-center rounded-full bg-[#0000EE] px-4 text-xs text-white hover:bg-[#0023EC] active:bg-black">
      {children}<ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  );
}

function SecondaryButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link href={href} className="inline-flex h-[34px] items-center justify-center rounded-[10px] bg-white px-[10px] text-xs text-[#0000EE] shadow-[rgba(0,0,0,0.1)_0px_1px_4px_0px] hover:bg-[#FAF9F8]">
      {children}
    </Link>
  );
}

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-[1200px] px-6 py-[60px] lg:px-0 lg:py-20"
    >
      <motion.p
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-xs text-[#0000EE]"
      >
        {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 max-w-[860px] font-serif text-[40px] font-normal leading-[1.2] sm:text-[52px] sm:leading-[62.4px]"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

function Grid4({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div>;
}

function Card({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, borderColor: "#0000EE" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[10px] border border-[#E5E5E5] bg-white p-6 shadow-[rgba(0,0,0,0.05)_0px_2px_8px_0px]"
    >
      <Icon className="h-6 w-6 text-[#0000EE]" />
      <p className="mt-6 text-sm leading-6 text-black">{title}</p>
    </motion.article>
  );
}
