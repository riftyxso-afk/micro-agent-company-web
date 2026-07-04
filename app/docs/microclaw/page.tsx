"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check, Terminal, Smartphone, Globe, ExternalLink } from "lucide-react";

type DocId =
  | "get-started"
  | "telegram"
  | "whatsapp"
  | "gmail"
  | "google-calendar"
  | "obsidian"
  | "api-keys"
  | "vps-access"
  | "faq";

interface DocPage {
  title: string;
  subtitle: string;
  sections: { heading: string; content: string }[];
}

const docs: Record<DocId, DocPage> = {
  "get-started": {
    title: "Getting Started",
    subtitle: "Mulai pakai MicroClaw dalam 10 menit.",
    sections: [
      {
        heading: "Apa itu MicroClaw?",
        content: `MicroClaw adalah layanan hosting OpenClaw di cloud. Kami setup VPS DigitalOcean + OpenClaw + messaging channel (Telegram/WhatsApp) untuk kamu. Kamu tinggal chat dengan AI assistant seperti ngobrol dengan teman kerja.`,
      },
      {
        heading: "Yang Kamu Dapatkan",
        content: `✅ VPS pribadi (DigitalOcean)\n✅ OpenClaw pre-installed & configured\n✅ Gateway dengan auth token\n✅ Agent persona (selalu respond Bahasa Indonesia)\n✅ Telegram bot akses\n✅ Integrasi Gmail, Calendar, Obsidian\n✅ Support Bahasa Indonesia`,
      },
      {
        heading: "1. Daftar & Bayar",
        content: `Pilih paket di halaman MicroClaw (Starter/Pro/Business). Bayar via Midtrans (VA, e-wallet, atau kartu kredit). Selesai bayar, sistem kami auto-provision VPS — sekitar 5-10 menit.`,
      },
      {
        heading: "2. Cek Email",
        content: `Kamu akan terima email berisi:\n- IP Address & SSH key\n- Gateway URL & auth token\n- Panduan setup Telegram\n\nSimpan credentials ini dengan aman.`,
      },
      {
        heading: "3. Connect ke Telegram",
        content: `Ikuti panduan di menu "Telegram Setup" untuk menghubungkan bot Telegram. Setelah selesai, kamu bisa langsung chat dengan agent kamu di Telegram.`,
      },
      {
        heading: "4. Mulai Chat",
        content: `Coba kirim pesan pertama:\n\n"Halo, perkenalkan dirimu" — agent akan merespon dengan perkenalan\n\n"Buatkan daily plan untuk hari ini" — agent akan bantu planning\n\n"Check email saya" — agent akan akses Gmail (perlu setup integrasi)`,
      },
    ],
  },
  telegram: {
    title: "Telegram Setup",
    subtitle: "Hubungkan MicroClaw ke Telegram dalam 5 menit.",
    sections: [
      {
        heading: "1. Buat Bot Telegram",
        content: `Buka @BotFather di Telegram:\nt.me/BotFather\n\nKirim perintah:\n/newbot\n\nIkuti instruksi:\n- Masukkan nama bot (contoh: "Asisten Saya")\n- Masukkan username bot (contoh: @asisten_saya_bot)\n\nSetelah selesai, BotFather akan kirim BOT TOKEN.\nContoh: 7234567890:AAH...simpan token ini.`,
      },
      {
        heading: "2. Masukkan Token ke Dashboard",
        content: `Buka dashboard MicroClaw:\n/dashboard/microclaw\n\nKlik tab "Channels"\n\nPaste BOT TOKEN ke field Telegram\n\nKlik "Save"\n\nKlik "Test" untuk verifikasi koneksi.`,
      },
      {
        heading: "3. Kirim Pesan ke Bot",
        content: `Buka Telegram, cari username bot kamu.\n\nKlik "Start" atau kirim "/start"\n\nBot akan merespon dengan pesan sambutan.\n\nSekarang kamu bisa chat dengan AI assistant!`,
      },
      {
        heading: "Tips Penggunaan",
        content: `💬 Bisa chat DM langsung dengan bot\n\n👥 Tambahkan bot ke group chat — agent bisa bantu semua anggota group\n\n🔒 DM Policy default: "pairing" — hanya kamu yang bisa chat. Kalau ingin open untuk publik, ubah di config OpenClaw.`,
      },
    ],
  },
  whatsapp: {
    title: "WhatsApp Setup",
    subtitle: "Hubungkan MicroClaw ke WhatsApp (Coming Soon).",
    sections: [
      {
        heading: "Status: Coming Soon",
        content: `Fitur WhatsApp sedang dalam pengembangan. Kami menggunakan WhatsApp Business API untuk koneksi yang stabil dan aman.`,
      },
      {
        heading: "Yang Perlu Disiapkan",
        content: `📱 Nomor WhatsApp khusus untuk bisnis (bukan nomor pribadi)\n\n📧 WhatsApp Business Account (WABA) — kami bantu registrasi\n\n💳 Biaya tambahan Rp 50.000/bulan untuk API usage\n\n⏳ Estimasi ready: Q4 2026`,
      },
      {
        heading: "Sementara Ini",
        content: `Gunakan Telegram sebagai channel utama. Semua fitur yang sama bisa diakses via Telegram.\n\nKalau kamu butuh WhatsApp mendesak, hubungi kami di support untuk prioritas akses beta.`,
      },
    ],
  },
  gmail: {
    title: "Gmail Integration",
    subtitle: "Agent bisa baca, balas, dan draft email.",
    sections: [
      {
        heading: "1. Buka Google Cloud Console",
        content: `Buka https://console.cloud.google.com\n\nBuat project baru (atau pilih existing)\n\nCari "Gmail API" → Enable\n\nCari "Google Calendar API" → Enable (untuk Calendar integration)`,
      },
      {
        heading: "2. Buat OAuth 2.0 Credentials",
        content: `Google Cloud Console → APIs & Services → Credentials\n\nKlik "Create Credentials" → "OAuth client ID"\n\nApplication type: "Desktop application"\n\nName: "MicroClaw"\n\nSetelah jadi, download JSON credentials.\n\nSimpan Client ID dan Client Secret.`,
      },
      {
        heading: "3. Set Redirect URI",
        content: `Di halaman OAuth consent screen → Authorized redirect URIs:\nhttp://localhost:3000/oauth/gmail/callback\n\n(Ganti dengan Gateway URL kamu kalau sudah production)`,
      },
      {
        heading: "4. Konfigurasi di OpenClaw",
        content: `Akses Gateway OpenClaw kamu:\nhttp://[IP_VPS]:3000\n\nLogin dengan auth token\n\nMasuk ke menu Integrations → Gmail\n\nPaste Client ID & Client Secret\n\nIkuti OAuth flow untuk authorize akun Gmail kamu.`,
      },
      {
        heading: "Perintah yang Bisa Dicoba",
        content: `"Cek email terbaru saya"\n"Baca email dari [nama]"\n"Balas email [subject] dengan..."\n"Draft email untuk [email] tentang..."\n"Ringkas inbox hari ini"`,
      },
    ],
  },
  "google-calendar": {
    title: "Google Calendar Integration",
    subtitle: "Jadwal, reminder, dan cek kesibukan.",
    sections: [
      {
        heading: "Setup",
        content: `Google Calendar sudah ter-enable saat setup Gmail. Pastikan Google Calendar API sudah enable di Google Cloud Console (lihat panduan Gmail step 1).`,
      },
      {
        heading: "OAuth Flow",
        content: `Sama dengan Gmail — kamu perlu authorize Calendar scope saat OAuth.\n\nKalau sudah authorize Gmail, tambahkan scope Calendar:\nhttps://www.googleapis.com/auth/calendar`,
      },
      {
        heading: "Perintah yang Bisa Dicoba",
        content: `"Apa jadwal saya hari ini?"\n"Buat meeting besok jam 10 pagi tentang..."\n"Reminder saya meeting jam 2 siang"\n"Cek apakah saya ada jadwal Jumat jam 3?"\n"Undang [nama] ke meeting [judul]"`,
      },
    ],
  },
  obsidian: {
    title: "Obsidian / Second Brain",
    subtitle: "Auto-sync catatan ke Obsidian vault.",
    sections: [
      {
        heading: "Cara Kerja",
        content: `Agent kamu bisa menyimpan ringkasan chat, ide, riset, dan catatan penting langsung ke folder Obsidian vault kamu. Terintegrasi via GitHub private repo.`,
      },
      {
        heading: "1. Buat GitHub Private Repo",
        content: `Buka https://github.com/new\n\nBuat repo private: "second-brain"\n\nInit dengan README (optional)\n\nClone repo ke VPS:\n\nssh root@[IP_VPS]\ngit clone https://github.com/[username]/second-brain.git ~/.openclaw/workspace/second-brain`,
      },
      {
        heading: "2. Setup di Obsidian",
        content: `Buka Obsidian → Settings → Community plugins → Turn on\n\nCari plugin: "Obsidian Git"\n\nInstall & enable\n\nPaste URL repo GitHub kamu\n\nSet auto-commit/auto-sync: 5 menit`,
      },
      {
        heading: "3. Akses di Dashboard",
        content: `Buka dashboard MicroClaw → Integrations → Obsidian\n\nConfigure: folder path, nama vault\n\nPastikan sync aktif.`,
      },
      {
        heading: "Perintah yang Bisa Dicoba",
        content: `"Simpan ide konten ini ke second brain"\n"Buat summary meeting hari ini di folder Notes"\n"Cari catatan tentang [topik] di vault saya"\n"Buat daily note untuk hari ini"`,
      },
    ],
  },
  "api-keys": {
    title: "API Keys & Model Provider",
    subtitle: "Ganti atau tambah model AI provider.",
    sections: [
      {
        heading: "Model Default",
        content: `MicroClaw menggunakan Google Gemini 2.0 Flash sebagai default model. Model ini gratis dan cepat — cocok untuk 95% kebutuhan.\n\nTidak perlu API key untuk pakai Gemini; kami berikan default key di paket kamu.`,
      },
      {
        heading: "Ganti Model / Tambah Provider",
        content: `Buka dashboard MicroClaw → tab "API Keys"\n\nKamu bisa menambahkan API key untuk:\n\n🔷 OpenAI (GPT-4o, GPT-4o-mini)\n🔶 Anthropic (Claude 3.5 Sonnet/Haiku)\n🟢 Google Gemini (ganti key bawaan)\n\nSetelah save, sistem akan update config OpenClaw di VPS kamu (max 5 menit).`,
      },
      {
        heading: "Dimana Dapat API Key?",
        content: `🔹 Gemini: https://aistudio.google.com/app/apikey\n🔹 OpenAI: https://platform.openai.com/api-keys\n🔹 Anthropic: https://console.anthropic.com/\n\nBuat akun, buat API key, copy paste ke dashboard.`,
      },
      {
        heading: "Keamanan",
        content: `API keys disimpan encrypted di server MicroClaw dan diteruskan ke Gateway OpenClaw kamu. Kami tidak menyimpan plaintext keys di database.\n\nKalau ada key bocor, segera revoke dari provider dashboard dan update key baru di dashboard MicroClaw.`,
      },
    ],
  },
  "vps-access": {
    title: "VPS Access & SSH",
    subtitle: "Akses langsung ke VPS kalau perlu.",
    sections: [
      {
        heading: "SSH Access",
        content: `Kamu bisa SSH langsung ke VPS:\n\nssh -i ~/.ssh/microclaw.pem root@[IP_VPS]\n\nAtau lihat detail di dashboard MicroClaw → Settings.`,
      },
      {
        heading: "OpenClaw Gateway",
        content: `Gateway bisa diakses via browser:\nhttp://[IP_VPS]:3000\n\nLogin pakai auth token (lihat di Settings dashboard).\n\nDari sini kamu bisa:\n- Monitoring real-time\n- View logs\n- Update config\n- Manage skills`,
      },
      {
        heading: "Restart & Rebuild",
        content: `Dari dashboard Settings → Danger Zone:\n\n🔄 Restart VPS — semua service restart, data aman\n⚠️ Rebuild VPS — reset ke fresh Ubuntu 24.04 + install ulang OpenClaw (data backup dulu!)`,
      },
    ],
  },
  faq: {
    title: "FAQ",
    subtitle: "Pertanyaan umum tentang MicroClaw.",
    sections: [
      {
        heading: "Apa bedanya MicroClaw dengan self-hosted OpenClaw?",
        content: `Kalau self-hosted, kamu harus:\n- Bikin akun VPS sendiri\n- Install Linux & OpenClaw manual\n- Setup firewall, security\n- Maintenance sendiri\n\nMicroClaw melakukan semua itu untuk kamu. Tinggal daftar, bayar, dan pakai.`,
      },
      {
        heading: "Apa bedanya MicroClaw dengan Clawi.ai?",
        content: `MicroClaw dibuat khusus untuk pebisnis Indonesia:\n- Bahasa Indonesia support\n- Harga Rupiah (pembayaran via Midtrans)\n- Integrasi dengan SekaliPost\n- Prioritas WhatsApp & Telegram\n- Support WhatsApp/Telegram dalam Bahasa Indonesia`,
      },
      {
        heading: "Apakah data saya aman?",
        content: `Setiap pelanggan punya VPS sendiri (bukan shared hosting). Data kamu tetap di VPS pribadi. Kami tidak log percakapan kamu. Kami juga tidak akses VPS kamu tanpa izin.`,
      },
      {
        heading: "Saya tidak bisa coding / Linux, apakah bisa pakai?",
        content: `Sangat bisa. Semua setup otomatis. Kamu tinggal:\n1. Daftar & bayar\n2. Dapat email credentials\n3. Connect Telegram — langsung chat dengan agent`,
      },
      {
        heading: "Bisa custom agent persona?",
        content: `Bisa di paket Business. Request agent dengan role spesifik:\n- Admin agent (manage email, invoice, scheduling)\n- Content agent (research, draft, social media)\n- Sales agent (track leads, follow-up)\n- Research agent (market research, competitor analysis)`,
      },
      {
        heading: "Bisa minta refund?",
        content: `Ya! 7 hari money-back guarantee. Tidak puas dalam 7 hari pertama? Kami refund full.`,
      },
    ],
  },
};

const sidebarItems: { id: DocId; label: string }[] = [
  { id: "get-started", label: "Getting Started" },
  { id: "telegram", label: "Telegram Setup" },
  { id: "whatsapp", label: "WhatsApp (Coming Soon)" },
  { id: "gmail", label: "Gmail Integration" },
  { id: "google-calendar", label: "Google Calendar" },
  { id: "obsidian", label: "Obsidian / Second Brain" },
  { id: "api-keys", label: "API Keys" },
  { id: "vps-access", label: "VPS Access" },
  { id: "faq", label: "FAQ" },
];

export default function MicroClawDocsPage() {
  const [active, setActive] = useState<DocId>("get-started");
  const [copied, setCopied] = useState<string | null>(null);

  const page = docs[active];

  return (
    <div className="min-h-screen bg-[#EDEEF5] text-zinc-900 selection:bg-[#9fff00] selection:text-black [font-family:Inter,system-ui,sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');`}</style>

      {/* Navbar */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-black/5 bg-white/80 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <ClawIcon className="h-7 w-7 fill-[#1a1a1a]" />
            <span className="text-lg font-medium tracking-[-0.03em] [font-family:Outfit,Inter,sans-serif]">MicroClaw Docs</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/microclaw"
              className="hidden h-8 items-center rounded-full bg-stone-100 px-4 text-xs font-medium text-[#1a1a1a]/60 transition hover:bg-stone-200 sm:inline-flex"
            >
              Dashboard
            </Link>
            <a
              href="/products/microclaw#form"
              className="inline-flex h-8 items-center rounded-full bg-[#1a1a1a] px-4 text-xs font-medium text-white transition hover:bg-stone-800"
            >
              Free Trial <ArrowRight className="ml-1.5 h-3 w-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="mx-auto flex max-w-7xl px-4 pt-20 pb-16 md:px-6 lg:px-8">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="fixed top-20 flex flex-col gap-0.5">
            <p className="mb-3 px-3 text-xs font-medium uppercase tracking-[0.1em] text-[#1a1a1a]/40">
              Panduan MicroClaw
            </p>
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`rounded-[8px] px-3 py-2 text-left text-sm transition-all cursor-pointer ${
                  active === item.id
                    ? "bg-[#1a1a1a] text-white font-medium"
                    : "text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:bg-white/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tabs */}
        <div className="mb-6 flex w-full gap-1.5 overflow-x-auto pb-2 md:hidden">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                active === item.id
                  ? "bg-[#1a1a1a] text-white"
                  : "bg-white text-[#1a1a1a]/60 border border-black/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <main className="min-w-0 flex-1 md:pl-10">
          <article className="max-w-[720px]">
            <span className="inline-flex h-6 items-center rounded-full bg-[#0000EE]/10 px-3 text-xs font-medium text-[#0000EE]">
              Documentation
            </span>
            <h1 className="mt-4 text-3xl font-medium tracking-[-0.03em] [font-family:Outfit,Inter,sans-serif] sm:text-4xl">
              {page.title}
            </h1>
            <p className="mt-2 text-sm text-[#1a1a1a]/60">{page.subtitle}</p>

            <div className="mt-8 space-y-8">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-lg font-medium tracking-[-0.02em] [font-family:Outfit,Inter,sans-serif]">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.content.split("\n\n").map((block, i) => {
                      if (block.startsWith("```")) {
                        const code = block.replace(/```(\w+)?\n?/, "").replace(/\n?```$/, "");
                        return (
                          <div key={i} className="group relative">
                            <div className="overflow-x-auto rounded-[10px] border border-black/10 bg-stone-900 p-4">
                              <pre className="text-sm leading-relaxed text-green-400 font-mono whitespace-pre-wrap">{code}</pre>
                            </div>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(code);
                                setCopied(code);
                                setTimeout(() => setCopied(null), 2000);
                              }}
                              className="absolute right-2 top-2 inline-flex h-7 items-center gap-1 rounded-[6px] bg-white/10 px-2 text-xs text-white/60 opacity-0 transition hover:bg-white/20 group-hover:opacity-100 cursor-pointer"
                            >
                              {copied === code ? <Check size={12} /> : <Copy size={12} />}
                              {copied === code ? "Copied!" : "Copy"}
                            </button>
                          </div>
                        );
                      }
                      if (block.startsWith("- ")) {
                        return (
                          <ul key={i} className="space-y-1.5 pl-5">
                            {block.split("\n").map((li, j) => (
                              <li key={j} className="list-disc text-sm leading-relaxed text-[#1a1a1a]/70">
                                {li.replace(/^[-•]\s*/, "").trim()}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (block.startsWith("🔹") || block.startsWith("🔶") || block.startsWith("🟢") || block.startsWith("💬") || block.startsWith("👥") || block.startsWith("🔒") || block.startsWith("✅") || block.startsWith("📱") || block.startsWith("📧") || block.startsWith("💳") || block.startsWith("⏳") || block.startsWith("🔄") || block.startsWith("⚠️")) {
                        return (
                          <div key={i} className="flex gap-2 text-sm leading-relaxed text-[#1a1a1a]/70">
                            <span className="shrink-0">{block.split(" ")[0]}</span>
                            <span>{block.slice(block.indexOf(" ") + 1)}</span>
                          </div>
                        );
                      }
                      return (
                        <p key={i} className="text-sm leading-relaxed text-[#1a1a1a]/70 whitespace-pre-wrap">
                          {block}
                        </p>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="mt-12 flex items-center justify-between border-t border-black/5 pt-8">
              <div />
              <button
                onClick={() => {
                  const idx = sidebarItems.findIndex((s) => s.id === active);
                  if (idx < sidebarItems.length - 1) setActive(sidebarItems[idx + 1].id);
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#1a1a1a] px-5 text-xs font-medium text-white transition hover:bg-stone-800 cursor-pointer"
              >
                Next: {sidebarItems[sidebarItems.findIndex((s) => s.id === active) + 1]?.label || ""}
                <ArrowRight size={12} />
              </button>
            </div>
          </article>
        </main>
      </div>

      <footer className="border-t border-black/5 px-8 py-8 text-center text-xs text-[#1a1a1a]/40">
        MicroClaw Docs — Part of The Micro Agent Company
      </footer>
    </div>
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
