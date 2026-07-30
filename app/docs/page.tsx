"use client";

import React, { useState } from "react";
import Link from "next/link";

const docsContent = {
  "get-started": {
    title: "Get Started",
    subtitle: "Panduan lengkap meningkatkan AI Visibility bisnis Anda.",
    markdown: `### 1. Book an AI Visibility Audit

Langkah pertama untuk mengetahui seberapa baik AI memahami brand Anda.

Kami scan mention brand Anda di ChatGPT, Gemini, Claude, dan Perplexity. Identifikasi pertanyaan AI yang relevan dengan produk atau jasa Anda. Bandingkan visibilitas dengan kompetitor. Hitung AI Readiness Score. Berikan rekomendasi aksi prioritas.

Output: Laporan AI Visibility + AI Readiness Score + Peta Kompetitor + Rekomendasi.

### 2. AI Readiness Assessment

Evaluasi kesiapan bisnis Anda untuk era AI search.

Website Analysis: Apakah website Anda mudah di-crawl oleh AI? Content Quality: Apakah konten Anda menjawab pertanyaan yang dicari pengguna? Structured Data: Apakah schema markup terpasang dengan benar? Entity Consistency: Apakah entity bisnis Anda konsisten di seluruh web? Knowledge Coverage: Apakah informasi bisnis Anda lengkap di direktori online?

Output: Skor readiness per kategori + daftar perbaikan prioritas.

### 3. Implement GEO Strategy

Strategi Generative Engine Optimization untuk meningkatkan probabilitas AI merekomendasikan brand Anda.

Homepage Optimization: Pastikan homepage Anda jelas menjelaskan siapa Anda, apa yang Anda lakukan, dan siapa target pasar Anda dalam bahasa yang mudah dipahami AI.

FAQ Strategy: Buat FAQ yang menjawab pertanyaan spesifik yang sering ditanyakan pengguna ke AI. Gunakan format tanya-jawab yang terstruktur.

Product Page Optimization: Deskripsi produk yang kaya entity, mencakup fitur, manfaat, use case, dan perbandingan.

Entity Optimization: Pastikan entity bisnis Anda (nama, alamat, kontak, industri) konsisten di seluruh platform.

Knowledge Base: Bangun knowledge base yang menjadi sumber referensi utama AI tentang bisnis Anda.

Output: Roadmap optimasi + konten yang sudah dioptimasi.

### 4. AI Brand Monitoring

Pemantauan berkelanjutan terhadap AI Visibility bisnis Anda.

AI Visibility Score: Skor yang menunjukkan seberapa baik AI melihat brand Anda. Competitor Movement: Perubahan posisi kompetitor di AI search. Prompt Monitoring: Pantau prompt tertentu untuk melihat bagaimana AI merespon. Mention Trends: Tren sebutan brand Anda di berbagai platform AI.

Output: Dashboard AI Visibility + Weekly Report + Alert Perubahan.

### 5. Optimasi & Iterasi

AI Visibility bukan proyek sekali jalan. AI models terus diperbarui, dan kompetitor juga berubah.

Monthly review: Evaluasi perubahan AI Visibility Score. Content refresh: Update konten berdasarkan perubahan algoritma AI. Strategy adjustment: Sesuaikan strategi berdasarkan data monitoring. Competitor response: Respon terhadap perubahan posisi kompetitor.`
  },
  "white-paper": {
    title: "AI Visibility",
    subtitle: "White Paper Brief — Why businesses must optimize for AI recommendation engines.",
    markdown: `## The AI Visibility Thesis

The way people find information is fundamentally changing. Instead of browsing search results and clicking links, users now ask AI directly:

"What's the best CRM for a small business?" "Recommend a budget graphic design tool." "Which Indonesian UMKM platform has the best reviews?"

When AI answers these questions, only a handful of businesses get mentioned — and that mention is often the only answer the user sees.

### The Problem

Most businesses are invisible to AI. Not because they're bad at what they do, but because AI doesn't have the right information about them.

Traditional SEO optimizes for search engines — keywords, backlinks, page rank.

AI Visibility optimizes for AI engines — semantic relevance, entity consistency, structured knowledge.

### Why This Matters Now

1. AI adoption is accelerating. ChatGPT reached 100M users in 2 months. Google, Microsoft, and Apple are embedding AI into every product. Users are forming the habit of asking AI first.

2. AI gives only one answer. Unlike search results with 10 blue links, AI typically gives one synthesized answer. If your business isn't in that answer, you don't exist to the user.

3. It's getting harder to break in. As AI models are updated less frequently and knowledge bases become static, businesses that establish AI Visibility early have a structural advantage.

### The Four Pillars of AI Visibility

#### 1. Content & Information Architecture
AI understands your business through the content it can access. Clear homepage copy that explains who you serve and what you do. FAQ pages that answer specific questions in natural language. Product descriptions rich with entities (features, pricing, use cases). Blog posts that demonstrate authority in your space.

#### 2. Entity Optimization
AI builds knowledge graphs from entities — people, places, organizations, products. Consistent NAP (Name, Address, Phone) across all platforms. Google Knowledge Graph presence. Wikipedia and industry directory listings. Structured data markup (Schema.org, JSON-LD).

#### 3. Structured Data & Semantic Markup
Schema markup helps AI understand your content's meaning. Organization schema with logo, social links, contact info. Product/Service schemas with pricing, availability, reviews. FAQ schemas for Q&A visibility. Article/BlogPost schema for content.

#### 4. Knowledge Coverage
AI needs multiple trusted sources to verify information. Industry directories and review platforms (G2, Capterra, Google Business). Official documentation and knowledge bases. Community mentions (forums, social media, discussion threads). Third-party articles and press coverage.

### Our Methodology

Phase 1: Audit. Test brand mentions across 4+ AI platforms. Identify gaps in AI's understanding. Measure against competitors.

Phase 2: Strategy. Map target queries. Prioritize content and entity gaps. Create optimization roadmap.

Phase 3: Implementation. Optimize content, structured data, entity consistency. Build knowledge base. Monitor changes.

Phase 4: Monitor & Iterate. Track AI Visibility Score. Respond to competitor moves. Refresh content based on AI model updates.

### The Difference: AI Visibility vs SEO

| | SEO | AI Visibility |
|---|---|---|
| Goal | Rank links on SERP | Get cited in AI answers |
| Medium | Keywords, backlinks | Semantic relevance, entities |
| Audience | Google bots | AI language models |
| Format | 10 blue links | 1 synthesized answer |
| Success | Page 1 ranking | Mention in AI response |
| Duration | Months to rank | 1-2 weeks to see change |

### Why Now?

The businesses that establish AI Visibility today will be the ones AI recommends tomorrow. As AI becomes the default interface for information, being invisible to AI means being invisible to your customers.

The Micro Agent Company helps businesses prepare for this shift — not through guarantees or hype, but through structured audits, strategic optimization, and continuous monitoring.

---

You optimized for user experience. Now optimize for AI Visibility.`
  }
};

export default function DocsPage() {
  const [active, setActive] = useState<keyof typeof docsContent>("get-started");

  return (
    <main className="min-h-screen bg-white text-stone-900 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200"><div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3"><Link href="/" className="font-serif uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[10px] sm:text-[13px] font-bold leading-tight">The Micro Agent Company</Link><nav className="hidden md:flex gap-7 text-[13px] font-medium"><Link href="/products" className="hover:text-electric-blue">Solutions</Link><Link href="/agents" className="hover:text-electric-blue">How It Works</Link><Link href="/use-cases" className="hover:text-electric-blue">Use Cases</Link><Link href="/about" className="hover:text-electric-blue">About</Link><Link href="/pricing" className="hover:text-electric-blue">Pricing</Link><Link href="/docs" className="text-electric-blue">Docs</Link></nav><Link href="/book-a-call" className="hidden sm:inline-flex bg-black text-white text-[12px] font-semibold px-5 py-2 rounded-full hover:bg-electric-blue">Book a Call</Link></div></header>
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-12">
        <aside className="space-y-6">
          <div><p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">Documentation</p>
            <nav className="flex flex-col gap-2">
              <button onClick={() => setActive("get-started")} className={`text-left text-sm py-1.5 px-3 rounded-md transition-all cursor-pointer ${active === "get-started" ? "bg-stone-100 text-stone-950 font-semibold" : "text-stone-500 hover:text-stone-900"}`}>Get Started</button>
              <button onClick={() => setActive("white-paper")} className={`text-left text-sm py-1.5 px-3 rounded-md transition-all cursor-pointer ${active === "white-paper" ? "bg-stone-100 text-stone-950 font-semibold" : "text-stone-500 hover:text-stone-900"}`}>AI Visibility White Paper</button>
              <Link href="/docs/microclaw" className="text-left text-sm py-1.5 px-3 rounded-md transition-all text-stone-500 hover:text-stone-900 hover:bg-stone-50">MicroClaw Docs →</Link>
            </nav>
          </div>
        </aside>
        <article className="w-full max-w-[700px] border border-stone-200 rounded-2xl p-5 sm:p-8 bg-[#FAF9F8]"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-electric-blue mb-2">Documentation</p>
          <h1 className="font-serif text-3xl mb-1">{docsContent[active].title}</h1>
          <p className="text-stone-500 text-sm mb-6">{docsContent[active].subtitle}</p>
          <div className="prose prose-stone max-w-none text-[13.5px] leading-relaxed space-y-4">
            {docsContent[active].markdown.split("\n\n").map((chunk, i) => {
              if (chunk.startsWith("####")) {
                return <h4 key={i} className="font-sans font-bold text-stone-800 text-[13px] mt-5 mb-1 uppercase tracking-wider">{chunk.replace("####", "").trim()}</h4>;
              }
              if (chunk.startsWith("###")) {
                return <h3 key={i} className="font-serif text-xl font-bold mt-6 mb-2 text-stone-950">{chunk.replace("###", "").trim()}</h3>;
              }
              if (chunk.startsWith("##")) {
                return <h2 key={i} className="font-serif text-2xl font-bold mt-8 mb-3 text-stone-950">{chunk.replace("##", "").trim()}</h2>;
              }
              if (chunk.startsWith("|")) {
                const lines = chunk.split("\n").filter(l => l.trim());
                const headers = lines[0].split("|").filter(h => h.trim());
                if (headers.length && lines.length >= 3) {
                  return <div key={i} className="overflow-x-auto my-6"><table className="w-full text-[13px] border-collapse"><thead><tr>{headers.map((h, j) => <th key={j} className="text-left px-3 py-2.5 font-bold text-stone-900 bg-stone-100 border border-stone-200">{h.trim()}</th>)}</tr></thead><tbody>{lines.slice(2).filter(l => l.includes("|")).map((row, j) => <tr key={j}>{row.split("|").filter(c => c.trim()).map((c, k) => <td key={k} className="px-3 py-2.5 border border-stone-200 text-stone-600">{c.trim()}</td>)}</tr>)}</tbody></table></div>;
                }
              }
              return <p key={i} className="text-stone-600">{chunk}</p>;
            })}
          </div>
        </article>
      </section>
    </main>
  );
}
