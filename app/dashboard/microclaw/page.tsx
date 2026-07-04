"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Key, MessageCircle, Share2, CreditCard, Settings as SettingsIcon,
  ChevronRight, Save, Eye, EyeOff, Check, Copy, RefreshCw,
  Bot, Phone, Globe, Mail, Calendar, BookOpen, ExternalLink,
  Activity, Cpu, HardDrive, Wifi,
} from "lucide-react";

type Tab = "overview" | "api-keys" | "channels" | "integrations" | "subscription" | "settings";

const tabs: { id: Tab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "api-keys", label: "API Keys", icon: Key },
  { id: "channels", label: "Channels", icon: MessageCircle },
  { id: "integrations", label: "Integrations", icon: Share2 },
  { id: "subscription", label: "Subscription", icon: CreditCard },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

export default function MicroClawDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen bg-[#EDEEF5] text-zinc-900 selection:bg-[#9fff00] selection:text-black [font-family:Inter,system-ui,sans-serif]">
      <DashboardNavbar />

      <div className="mx-auto flex max-w-7xl px-4 pt-20 pb-12 md:px-6 lg:px-8">
        {/* ── Sidebar ── */}
        <aside className="hidden w-60 shrink-0 md:block">
          <nav className="fixed top-20 flex flex-col gap-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-2.5 rounded-[10px] px-4 py-2.5 text-left text-sm transition-all cursor-pointer ${
                    activeTab === t.id
                      ? "bg-[#1a1a1a] text-white font-medium"
                      : "text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:bg-white/50"
                  }`}
                >
                  <Icon size={16} />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── Mobile tabs ── */}
        <div className="mb-6 flex w-full gap-1 overflow-x-auto pb-2 md:hidden">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === t.id
                    ? "bg-[#1a1a1a] text-white"
                    : "bg-white text-[#1a1a1a]/60 border border-black/5"
                }`}
              >
                <span className="inline mr-1.5"><Icon size={14} /></span>
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ── Main content ── */}
        <main className="min-w-0 flex-1 md:pl-8">
          {activeTab === "overview" && <Overview />}
          {activeTab === "api-keys" && <ApiKeys />}
          {activeTab === "channels" && <Channels />}
          {activeTab === "integrations" && <Integrations />}
          {activeTab === "subscription" && <Subscription />}
          {activeTab === "settings" && <Settings />}
        </main>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR
   ════════════════════════════════════════════════════ */
function DashboardNavbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-black/5 bg-white/80 py-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <ClawIcon className="h-7 w-7 fill-[#1a1a1a]" />
          <span className="text-lg font-medium tracking-[-0.03em] [font-family:Outfit,Inter,sans-serif]">MicroClaw</span>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="/products/microclaw#form"
            className="hidden h-8 items-center rounded-full bg-[#0000EE]/10 px-4 text-xs font-medium text-[#0000EE] transition hover:bg-[#0000EE]/20 sm:inline-flex"
          >
            Upgrade Plan
          </a>
          <a
            href="/sign-in"
            className="inline-flex h-8 items-center rounded-full bg-[#1a1a1a] px-4 text-xs font-medium text-white transition hover:bg-stone-800"
          >
            Sign Out
          </a>
        </div>
      </div>
    </header>
  );
}

/* ════════════════════════════════════════════════════
   OVERVIEW
   ════════════════════════════════════════════════════ */
function Overview() {
  const [telegramToken, setTelegramToken] = useState("");
  const [telegramStatus, setTelegramStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [savedTelegram, setSavedTelegram] = useState(false);

  const handleTelegramSave = () => {
    if (!telegramToken.trim()) return;
    setTelegramStatus("testing");
    setTimeout(() => {
      setTelegramStatus("success");
      setSavedTelegram(true);
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-2xl font-medium tracking-[-0.03em] [font-family:Outfit,Inter,sans-serif]">Dashboard</h1>
      <p className="mt-1 text-sm text-[#1a1a1a]/60">Your MicroClaw AI assistant is running.</p>

      {/* Status card */}
      <div className="mt-6 rounded-[12px] border border-black/5 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </span>
          <div>
            <p className="text-sm font-medium">Agent Online</p>
            <p className="text-xs text-[#1a1a1a]/50">Gateway aktif — VPS Singapore</p>
          </div>
          <a
            href="http://203.0.113.10:3000"
            target="_blank"
            className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-full bg-stone-100 px-4 text-xs font-medium text-[#1a1a1a]/70 transition hover:bg-stone-200"
          >
            Buka Gateway <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Stats grid */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "AI Tokens Used", value: "12,450 / 150,000", icon: Activity, sub: "8% bulan ini" },
          { label: "Messages Today", value: "47", icon: MessageCircle, sub: "+12 dari kemarin" },
          { label: "VPS Uptime", value: "99.8%", icon: Cpu, sub: "14 hari 6 jam" },
          { label: "Storage Used", value: "4.2 / 50 GB", icon: HardDrive, sub: "8.4%" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-[12px] border border-black/5 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Icon size={14} className="text-[#1a1a1a]/40" />
                <span className="text-xs text-[#1a1a1a]/50">{s.label}</span>
              </div>
              <p className="mt-2 text-xl font-medium tracking-[-0.03em] [font-family:Outfit,Inter,sans-serif]">{s.value}</p>
              <p className="mt-0.5 text-xs text-[#1a1a1a]/40">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-sm font-medium">Quick Actions</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Connect Telegram — interactive */}
          <div className="rounded-[12px] border border-black/5 bg-white p-5 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#0000EE]/10">
              <MessageCircle size={16} className="text-[#0000EE]" />
            </div>
            <p className="mt-3 text-sm font-medium">Connect Telegram</p>
            <p className="mt-0.5 text-xs text-[#1a1a1a]/50">
              {savedTelegram ? "Bot token tersimpan!" : "Masukkan token bot Telegram kamu"}
            </p>

            {!savedTelegram ? (
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  value={telegramToken}
                  onChange={(e) => { setTelegramToken(e.target.value); setTelegramStatus("idle"); }}
                  placeholder="7276822776:AAEq5o..."
                  className="w-full rounded-[8px] border border-black/10 bg-white px-3 py-2 text-xs outline-none transition focus:border-[#0000EE]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleTelegramSave}
                    disabled={!telegramToken.trim() || telegramStatus === "testing"}
                    className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#1a1a1a] px-4 text-xs font-medium text-white transition hover:bg-[#0000EE] disabled:opacity-40"
                  >
                    {telegramStatus === "testing" ? (
                      <><RefreshCw size={12} className="animate-spin" /> Testing...</>
                    ) : (
                      <><Check size={12} /> Simpan Token</>
                    )}
                  </button>
                  <a
                    href="/docs/microclaw"
                    target="_blank"
                    className="inline-flex h-8 items-center gap-1 rounded-full bg-stone-100 px-3 text-xs text-[#1a1a1a]/60 transition hover:bg-stone-200"
                  >
                    Panduan <ExternalLink size={10} />
                  </a>
                </div>
                {telegramStatus === "success" && (
                  <p className="text-xs text-green-600">✓ Bot terverifikasi! Chat sekarang di Telegram.</p>
                )}
                {telegramStatus === "error" && (
                  <p className="text-xs text-red-500">Token tidak valid. Coba lagi.</p>
                )}
              </div>
            ) : (
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">Connected</span>
                <button
                  onClick={() => { setSavedTelegram(false); setTelegramToken(""); setTelegramStatus("idle"); }}
                  className="text-xs text-[#1a1a1a]/40 underline transition hover:text-[#1a1a1a]/70"
                >
                  Ganti
                </button>
              </div>
            )}
          </div>

          {/* Add API Key */}
          <button
            onClick={() => {}}
            className="rounded-[12px] border border-black/5 bg-white p-5 text-left shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#0000EE]/10">
              <Key size={16} className="text-[#0000EE]" />
            </div>
            <p className="mt-3 text-sm font-medium">Add API Key</p>
            <p className="mt-0.5 text-xs text-[#1a1a1a]/50">Connect Gemini or OpenAI</p>
          </button>

          {/* View Setup Docs */}
          <a
            href="/docs/microclaw"
            className="rounded-[12px] border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#0000EE]/10">
              <BookOpen size={16} className="text-[#0000EE]" />
            </div>
            <p className="mt-3 text-sm font-medium">View Setup Docs</p>
            <p className="mt-0.5 text-xs text-[#1a1a1a]/50">Telegram, Gmail & more guides</p>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   API KEYS
   ════════════════════════════════════════════════════ */
function ApiKeys() {
  const [keys, setKeys] = useState<Record<string, string>>({
    gemini: "AIzaSyD...xK3J",
    openai: "",
    anthropic: "",
  });
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  const providers = [
    {
      id: "gemini",
      name: "Google Gemini",
      icon: "✦",
      desc: "Model default MicroClaw. Gratis quota 60 request/menit.",
      placeholder: "AIzaSy...",
      docUrl: "https://aistudio.google.com/app/apikey",
    },
    {
      id: "openai",
      name: "OpenAI",
      icon: "◆",
      desc: "GPT-4o, GPT-4o-mini. Perlu billing aktif.",
      placeholder: "sk-proj-...",
      docUrl: "https://platform.openai.com/api-keys",
    },
    {
      id: "anthropic",
      name: "Anthropic Claude",
      icon: "◇",
      desc: "Claude 3.5 Sonnet / Haiku. Model grading tinggi.",
      placeholder: "sk-ant-...",
      docUrl: "https://console.anthropic.com/",
    },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleVisible = (id: string) => {
    setVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <h1 className="text-2xl font-medium tracking-[-0.03em] [font-family:Outfit,Inter,sans-serif]">API Keys</h1>
      <p className="mt-1 text-sm text-[#1a1a1a]/60">
        Connect model providers. Kosongkan untuk pakai default MicroClaw.
      </p>

      <div className="mt-6 space-y-4">
        {providers.map((p) => (
          <div key={p.id} className="rounded-[12px] border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#0000EE]/10 text-sm font-bold text-[#0000EE]">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium">{p.name}</h3>
                  <p className="mt-0.5 text-xs text-[#1a1a1a]/50">{p.desc}</p>
                </div>
              </div>
              <a
                href={p.docUrl}
                target="_blank"
                className="inline-flex h-7 items-center gap-1 rounded-full bg-stone-100 px-3 text-xs text-[#1a1a1a]/60 transition hover:bg-stone-200"
              >
                Get Key <ExternalLink size={10} />
              </a>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type={visible[p.id] ? "text" : "password"}
                  value={keys[p.id]}
                  onChange={(e) => setKeys((prev) => ({ ...prev, [p.id]: e.target.value }))}
                  placeholder={p.placeholder}
                  className="h-10 w-full rounded-[8px] border border-black/10 bg-white px-3 pr-10 text-sm outline-none transition focus:border-[#1a1a1a]"
                />
                <button
                  onClick={() => toggleVisible(p.id)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#1a1a1a]/40 transition hover:text-[#1a1a1a] cursor-pointer"
                >
                  {visible[p.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(keys[p.id])}
                className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-black/10 text-[#1a1a1a]/40 transition hover:text-[#1a1a1a] hover:bg-stone-50 cursor-pointer"
              >
                <Copy size={15} />
              </button>
            </div>

            {keys[p.id] && (
              <div className="mt-3 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-xs text-green-700">Key active — model {p.id} available</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-[#1a1a1a] px-6 text-sm font-medium text-white transition hover:bg-stone-800 cursor-pointer"
      >
        <Save size={15} />
        {saved ? "Saved!" : "Save API Keys"}
      </button>

      <p className="mt-4 rounded-[10px] border border-blue-100 bg-blue-50/60 p-4 text-xs text-[#1a1a1a]/60">
        <strong>Note:</strong> API keys disimpan encrypted di server MicroClaw dan diteruskan ke OpenClaw Gateway kamu.
        Kami tidak menyimpan plaintext keys di database.
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   CHANNELS
   ════════════════════════════════════════════════════ */
function Channels() {
  const [telegramToken, setTelegramToken] = useState("7234567890:AAH...");
  const [telegramConnected, setTelegramConnected] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [discordToken, setDiscordToken] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-medium tracking-[-0.03em] [font-family:Outfit,Inter,sans-serif]">Channels</h1>
      <p className="mt-1 text-sm text-[#1a1a1a]/60">Connect messaging platforms to your AI agent.</p>

      <div className="mt-6 space-y-4">
        {/* Telegram */}
        <div className="rounded-[12px] border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#0088cc]/10">
                <MessageCircle size={20} className="text-[#0088cc]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">Telegram</h3>
                  {telegramConnected && (
                    <span className="inline-flex h-5 items-center rounded-full bg-green-100 px-2 text-xs font-medium text-green-700">
                      Connected
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-[#1a1a1a]/50">
                  Bot token dari @BotFather. Agent bisa di-DM atau group chat.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="password"
              value={telegramToken}
              onChange={(e) => setTelegramToken(e.target.value)}
              placeholder="7234567890:AAH..."
              className="h-10 flex-1 rounded-[8px] border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-[#1a1a1a]"
            />
            <button className="inline-flex h-10 items-center gap-1.5 rounded-[8px] bg-[#1a1a1a] px-4 text-xs font-medium text-white transition hover:bg-stone-800 cursor-pointer">
              <RefreshCw size={13} />
              Test
            </button>
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-[#1a1a1a]/50">
            <a href="https://t.me/BotFather" target="_blank" className="flex items-center gap-1 text-[#0088cc] hover:underline">
              Get token from @BotFather <ExternalLink size={10} />
            </a>
            <a href="/docs/microclaw/telegram" className="flex items-center gap-1 hover:text-[#1a1a1a]">
              Setup guide <ChevronRight size={12} />
            </a>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="rounded-[12px] border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#25D366]/10">
                <Phone size={20} className="text-[#25D366]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">WhatsApp</h3>
                  <span className="inline-flex h-5 items-center rounded-full bg-amber-100 px-2 text-xs font-medium text-amber-700">
                    Coming Soon
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[#1a1a1a]/50">
                  WhatsApp Business API. Biaya tambahan Rp 50.000/bulan.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 opacity-50">
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="+6281234567890"
              disabled
              className="h-10 flex-1 rounded-[8px] border border-black/10 bg-stone-50 px-3 text-sm outline-none"
            />
            <button disabled className="inline-flex h-10 items-center gap-1.5 rounded-[8px] bg-stone-200 px-4 text-xs font-medium text-stone-400 cursor-not-allowed">
              Connect
            </button>
          </div>
          <p className="mt-2 text-xs text-[#1a1a1a]/40">WhatsApp integration akan aktif Q4 2026.</p>
        </div>

        {/* Discord */}
        <div className="rounded-[12px] border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#5865F2]/10">
                <Bot size={20} className="text-[#5865F2]" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Discord</h3>
                <p className="mt-0.5 text-xs text-[#1a1a1a]/50">
                  Bot token dari Discord Developer Portal.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="password"
              value={discordToken}
              onChange={(e) => setDiscordToken(e.target.value)}
              placeholder="MTEx... (bot token)"
              className="h-10 flex-1 rounded-[8px] border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-[#1a1a1a]"
            />
            <button className="inline-flex h-10 items-center gap-1.5 rounded-[8px] bg-stone-100 px-4 text-xs font-medium text-[#1a1a1a]/60 transition hover:bg-stone-200 cursor-pointer">
              Save
            </button>
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-[#1a1a1a]/50">
            <a href="https://discord.com/developers/applications" target="_blank" className="flex items-center gap-1 text-[#5865F2] hover:underline">
              Discord Developer Portal <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-[#1a1a1a] px-6 text-sm font-medium text-white transition hover:bg-stone-800 cursor-pointer">
        <Save size={15} />
        Save All Channels
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   INTEGRATIONS
   ════════════════════════════════════════════════════ */
function Integrations() {
  const integrations = [
    {
      name: "Gmail",
      icon: Mail,
      desc: "Baca, balas, draft email. Agent bisa manage inbox kamu.",
      status: "Connected",
      color: "#EA4335",
    },
    {
      name: "Google Calendar",
      icon: Calendar,
      desc: "Schedule meeting, set reminder, cek jadwal harian.",
      status: "Not Connected",
      color: "#4285F4",
    },
    {
      name: "Obsidian",
      icon: BookOpen,
      desc: "Auto-save chat & notes ke Obsidian vault. Sync via GitHub.",
      status: "Connected",
      color: "#7C3AED",
    },
    {
      name: "SekaliPost",
      icon: Share2,
      desc: "Generate konten → approve → auto-schedule ke sosial media.",
      status: "Available",
      color: "#0000EE",
    },

  ];

  return (
    <div>
      <h1 className="text-2xl font-medium tracking-[-0.03em] [font-family:Outfit,Inter,sans-serif]">Integrations</h1>
      <p className="mt-1 text-sm text-[#1a1a1a]/60">Connect tools your agent can use.</p>

      <div className="mt-6 space-y-3">
        {integrations.map((int) => {
          const Icon = int.icon;
          const isConnected = int.status === "Connected";
          return (
            <div key={int.name} className="rounded-[12px] border border-black/5 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-[10px]"
                  style={{ backgroundColor: `${int.color}15` }}
                >
                  <Icon size={20} style={{ color: int.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium">{int.name}</h3>
                    <span
                      className={`inline-flex h-5 items-center rounded-full px-2 text-xs font-medium ${
                        isConnected
                          ? "bg-green-100 text-green-700"
                          : int.status === "Available"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {int.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#1a1a1a]/50">{int.desc}</p>
                </div>
                {!isConnected && (
                  <button
                    className={`inline-flex h-8 items-center rounded-full px-4 text-xs font-medium transition cursor-pointer ${
                      int.status === "Available"
                        ? "bg-[#0000EE]/10 text-[#0000EE] hover:bg-[#0000EE]/20"
                        : "bg-stone-100 text-[#1a1a1a]/60 hover:bg-stone-200"
                    }`}
                  >
                    {int.status === "Available" ? "Enable" : "Connect"}
                  </button>
                )}
                {isConnected && (
                  <button className="inline-flex h-8 items-center rounded-full bg-stone-100 px-4 text-xs font-medium text-[#1a1a1a]/60 transition hover:bg-stone-200 cursor-pointer">
                    Configure
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   SUBSCRIPTION
   ════════════════════════════════════════════════════ */
function Subscription() {
  return (
    <div>
      <h1 className="text-2xl font-medium tracking-[-0.03em] [font-family:Outfit,Inter,sans-serif]">Subscription</h1>
      <p className="mt-1 text-sm text-[#1a1a1a]/60">Manage your plan and billing.</p>

      {/* Current plan */}
      <div className="mt-6 rounded-[12px] border border-[#0000EE]/20 bg-white p-6 shadow-sm ring-1 ring-[#0000EE]/10">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex h-6 items-center rounded-full bg-[#0000EE] px-2.5 text-xs font-medium text-white">
              Pro Plan
            </span>
            <h2 className="mt-4 text-2xl font-medium tracking-[-0.03em] [font-family:Outfit,Inter,sans-serif]">
              Rp 300.000
              <span className="text-base font-normal text-[#1a1a1a]/50">/bulan</span>
            </h2>
            <p className="mt-1 text-xs text-[#1a1a1a]/50">Tagihan berikutnya: 15 Agustus 2026</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex h-9 items-center rounded-full border border-black/10 px-4 text-xs font-medium text-[#1a1a1a]/70 transition hover:bg-stone-50 cursor-pointer">
              Change Plan
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 border-t border-black/5 pt-6 sm:grid-cols-3">
          {[
            { label: "VPS Spec", value: "1 vCPU · 2GB RAM" },
            { label: "Storage", value: "50GB / 50GB" },
            { label: "AI Tokens", value: "12,450 / 150,000" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-xs text-[#1a1a1a]/50">{s.label}</p>
              <p className="mt-1 text-sm font-medium">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Billing history */}
      <div className="mt-6">
        <h3 className="text-sm font-medium">Billing History</h3>
        <div className="mt-3 rounded-[12px] border border-black/5 bg-white shadow-sm">
          {[
            { date: "15 Jun 2026", amount: "Rp 300.000", status: "Paid" },
            { date: "15 Mei 2026", amount: "Rp 300.000", status: "Paid" },
            { date: "15 Apr 2026", amount: "Rp 150.000", status: "Paid" },
          ].map((b) => (
            <div key={b.date} className="flex items-center justify-between border-b border-black/5 px-6 py-3.5 last:border-0">
              <span className="text-sm">{b.date}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{b.amount}</span>
                <span className="inline-flex h-6 items-center rounded-full bg-green-100 px-2.5 text-xs font-medium text-green-700">
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   SETTINGS
   ════════════════════════════════════════════════════ */
function Settings() {
  const [copyText, setCopyText] = useState("Copy");
  const vpsInfo = {
    ip: "203.0.113.10",
    user: "root",
    sshCommand: "ssh -i ~/.ssh/microclaw.pem root@203.0.113.10",
    gatewayUrl: "http://203.0.113.10:3000",
    region: "Singapore (sgp1)",
    os: "Ubuntu 24.04 LTS",
    openclawVersion: "v2026.6.15",
    model: "google/gemini-2.0-flash",
  };

  return (
    <div>
      <h1 className="text-2xl font-medium tracking-[-0.03em] [font-family:Outfit,Inter,sans-serif]">Settings</h1>
      <p className="mt-1 text-sm text-[#1a1a1a]/60">VPS & server information.</p>

      {/* VPS Info */}
      <div className="mt-6 rounded-[12px] border border-black/5 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-medium">VPS Information</h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            { label: "IP Address", value: vpsInfo.ip },
            { label: "Region", value: vpsInfo.region },
            { label: "OS", value: vpsInfo.os },
            { label: "OpenClaw Version", value: vpsInfo.openclawVersion },
            { label: "Active Model", value: vpsInfo.model },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-xs text-[#1a1a1a/50]">{s.label}</p>
              <p className="mt-0.5 text-sm font-medium">{s.value}</p>
            </div>
          ))}
        </div>

        {/* SSH Command */}
        <div className="mt-5 rounded-[10px] bg-stone-50 p-4">
          <p className="text-xs text-[#1a1a1a/50]">SSH Access</p>
          <div className="mt-1 flex items-center gap-2">
            <code className="flex-1 truncate rounded-[6px] bg-white px-3 py-2 text-xs font-mono border border-black/5">
              {vpsInfo.sshCommand}
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(vpsInfo.sshCommand);
                setCopyText("Copied!");
                setTimeout(() => setCopyText("Copy"), 2000);
              }}
              className="inline-flex h-8 items-center gap-1 rounded-[6px] bg-[#1a1a1a] px-3 text-xs font-medium text-white transition hover:bg-stone-800 cursor-pointer"
            >
              <Copy size={12} />
              {copyText}
            </button>
          </div>
        </div>

        {/* Gateway URL */}
        <div className="mt-3 rounded-[10px] bg-stone-50 p-4">
          <p className="text-xs text-[#1a1a1a/50]">OpenClaw Gateway URL</p>
          <div className="mt-1 flex items-center gap-2">
            <code className="flex-1 truncate rounded-[6px] bg-white px-3 py-2 text-xs font-mono border border-black/5">
              {vpsInfo.gatewayUrl}
            </code>
            <a
              href={vpsInfo.gatewayUrl}
              target="_blank"
              className="inline-flex h-8 items-center gap-1 rounded-[6px] bg-[#0000EE] px-3 text-xs font-medium text-white transition hover:bg-[#0000DD]"
            >
              Open <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="mt-6 rounded-[12px] border border-red-200 bg-red-50/50 p-6 shadow-sm">
        <h3 className="text-sm font-medium text-red-800">Danger Zone</h3>
        <p className="mt-1 text-xs text-red-700/60">
          Restart atau rebuild VPS. Data akan hilang jika rebuild tanpa backup.
        </p>
        <div className="mt-4 flex gap-3">
          <button className="inline-flex h-9 items-center rounded-full border border-red-200 bg-white px-5 text-xs font-medium text-red-700 transition hover:bg-red-50 cursor-pointer">
            Restart VPS
          </button>
          <button className="inline-flex h-9 items-center rounded-full bg-red-600 px-5 text-xs font-medium text-white transition hover:bg-red-700 cursor-pointer">
            Rebuild VPS
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   CLAW ICON
   ════════════════════════════════════════════════════ */
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
