"use client";

import React, { useState } from "react";
import Link from "next/link";

const docsContent = {
  "get-started": { title: "Get Started", subtitle: "Install and run AI agents in your business workflow.", markdown: `### 1. Tell us your problem
Choose content, admin, research, sales, or growth. Different problems require different prompts and model roles.

### 2. Assign the right AI agent
Each agent receives a specific role and output. We use Gemini-3.5-flash for speed/cost, Claude for system schemas, and Ollama for offline privacy.

### 3. Review the result
The founder or user reviews the output before using it. This is not fully autonomous yet; keeping human-in-the-loop ensures 100% quality.

### 4. Execute and improve
The workflow gets better through feedback and repeated use. Add instructions as you notice edge cases.` },
  "white-paper": { title: "White Paper Brief", subtitle: "Why LLMs should finish real work instead of answering questions.", markdown: `### The Micro Agent Thesis
Traditional chatbots like ChatGPT and Claude are conversational interfaces. They wait for prompts, guess answers, and require continuous manual copypasting.

We believe the future belongs to **Micro Agents** — lightweight, single-role entities that run behind automated routes (e.g. n8n pipelines, backend fetch schedules, and serverless scripts).

### Design Philosophy
- **Terse and Targeted:** Less conversational filler, more code, raw tables, and actionable outlines.
- **Human-in-the-loop validation:** Agents handle the first 90% of synthesis, and humans spend 10% polishing.
- **Multi-Model Orchestration:** Use the best engine for the task (Gemini for fast JSON layouts, Claude for system guidelines, Ollama/DeepSeek for local security).` }
};

export default function DocsPage() {
  const [active, setActive] = useState<keyof typeof docsContent>("get-started");

  return (
    <main className="min-h-screen bg-white text-stone-900 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200"><div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3"><Link href="/" className="font-serif uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[10px] sm:text-[13px] font-bold leading-tight">The Micro Agent Company</Link><nav className="hidden md:flex gap-7 text-[13px] font-medium"><Link href="/products" className="hover:text-electric-blue">Products</Link><Link href="/agents" className="hover:text-electric-blue">Agents</Link><Link href="/use-cases" className="hover:text-electric-blue">Use Cases</Link><Link href="/pricing" className="hover:text-electric-blue">Pricing</Link><Link href="/docs" className="text-electric-blue">Docs</Link></nav><Link href="/start-free-trial" className="hidden sm:inline-flex bg-black text-white text-[12px] font-semibold px-5 py-2 rounded-full hover:bg-electric-blue">Start free trial</Link></div></header>
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-12">
        <aside className="space-y-6">
          <div><p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">Documentation</p>
            <nav className="flex flex-col gap-2">
              <button onClick={() => setActive("get-started")} className={`text-left text-sm py-1.5 px-3 rounded-md transition-all cursor-pointer ${active === "get-started" ? "bg-stone-100 text-stone-950 font-semibold" : "text-stone-500 hover:text-stone-900"}`}>Get Started</button>
              <button onClick={() => setActive("white-paper")} className={`text-left text-sm py-1.5 px-3 rounded-md transition-all cursor-pointer ${active === "white-paper" ? "bg-stone-100 text-stone-950 font-semibold" : "text-stone-500 hover:text-stone-900"}`}>White Paper Brief</button>
              <Link href="/docs/microclaw" className="text-left text-sm py-1.5 px-3 rounded-md transition-all text-stone-500 hover:text-stone-900 hover:bg-stone-50">MicroClaw Docs →</Link>
            </nav>
          </div>
        </aside>
        <article className="w-full max-w-[700px] border border-stone-200 rounded-2xl p-5 sm:p-8 bg-[#FAF9F8]"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-electric-blue mb-2">Documentation</p>
          <h1 className="font-serif text-3xl mb-1">{docsContent[active].title}</h1>
          <p className="text-stone-500 text-sm mb-6">{docsContent[active].subtitle}</p>
          <div className="prose prose-stone max-w-none text-[13.5px] leading-relaxed space-y-4">
            {docsContent[active].markdown.split("\n\n").map((chunk, i) => {
              if (chunk.startsWith("###")) { return <h3 key={i} className="font-serif text-xl font-bold mt-6 text-stone-950">{chunk.replace("###", "").trim()}</h3>; }
              if (chunk.startsWith("-")) { return <ul key={i} className="space-y-1.5 pl-4 list-disc">{chunk.split("\n").map(li => <li key={li}>{li.replace("-", "").trim()}</li>)}</ul>; }
              return <p key={i} className="text-stone-600">{chunk}</p>;
            })}
          </div>
        </article>
      </section>
    </main>
  );
}
