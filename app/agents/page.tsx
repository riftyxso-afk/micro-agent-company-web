"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Brain, FileText, Headphones, Megaphone, Search, Settings, Target, Workflow } from "lucide-react";

const agents = [
  { name: "Atlas", role: "Chief of Staff Agent", icon: Settings, desc: "Plans priorities, coordinates tasks, and keeps execution focused.", output: "Weekly roadmap, daily priorities, meeting notes, execution checklist." },
  { name: "Scout", role: "Research Agent", icon: Search, desc: "Finds market insights, trends, competitors, and user pain points.", output: "Competitor maps, trend reports, persona notes, opportunity briefs." },
  { name: "Nova", role: "Product Agent", icon: Brain, desc: "Turns ideas into roadmap, MVP scope, backlog, and product decisions.", output: "MVP scope, user stories, feature matrix, backlog priorities." },
  { name: "Forge", role: "Builder Agent", icon: Workflow, desc: "Builds landing pages, dashboards, APIs, systems, and workflows.", output: "Landing pages, automations, API routes, dashboards, scripts." },
  { name: "Spark", role: "Content Agent", icon: FileText, desc: "Creates hooks, scripts, captions, campaigns, and content calendars.", output: "Post ideas, video scripts, captions, carousel outlines, calendar." },
  { name: "Echo", role: "Sales Agent", icon: Target, desc: "Creates outreach messages, follow-ups, proposals, and closing scripts.", output: "DM scripts, follow-up emails, proposal drafts, objection handling." },
  { name: "Care", role: "Support Agent", icon: Headphones, desc: "Creates FAQs, tutorials, replies, and feedback summaries.", output: "Help docs, customer replies, feedback tags, tutorial outlines." },
  { name: "Ranker", role: "Visibility Agent", icon: Megaphone, desc: "Helps brands become easier to discover by search engines and AI answers.", output: "SEO briefs, AI citation strategy, topic clusters, mention plans." },
];

export default function AgentsPage() {
  const [active, setActive] = useState(agents[0]);
  const Icon = active.icon;

  return (
    <main className="min-h-screen bg-white text-stone-900 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="font-serif uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[10px] xs:text-[11px] sm:text-[13px] font-bold leading-tight">The Micro Agent Company</Link>
          <nav className="hidden md:flex gap-7 text-[13px] font-medium text-stone-600">
            <Link href="/products" className="hover:text-electric-blue">Products</Link><Link href="/agents" className="text-electric-blue">Agents</Link><Link href="/use-cases" className="hover:text-electric-blue">Use Cases</Link><Link href="/about" className="hover:text-electric-blue">About</Link><Link href="/pricing" className="hover:text-electric-blue">Pricing</Link><Link href="/docs" className="hover:text-electric-blue">Docs</Link>
          </nav>
          <Link href="/start-free-trial" className="hidden sm:inline-flex bg-black text-white text-[12px] font-semibold px-5 py-2 rounded-full hover:bg-electric-blue">Start free trial</Link>
        </div>
      </header>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="max-w-[720px] mb-10 sm:mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-electric-blue mb-4">Agent Team</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight font-normal mb-5">Meet your AI operating team.</h1>
          <p className="text-stone-500 leading-relaxed">Each agent has one clear role, expected output, and workflow. Not random chat. Structured execution.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {agents.map((agent) => {
              const AgentIcon = agent.icon;
              const selected = active.name === agent.name;
              return (
                <button key={agent.name} onClick={() => setActive(agent)} className={`text-left border rounded-xl p-4 sm:p-5 transition-all ${selected ? "border-electric-blue bg-blue-50/40" : "border-stone-200 bg-white hover:border-stone-400"}`}>
                  <AgentIcon className={selected ? "text-electric-blue mb-4" : "text-stone-400 mb-4"} size={22} />
                  <h3 className="font-serif text-xl font-bold">{agent.name}</h3>
                  <p className="text-[12px] text-stone-500 mt-1">{agent.role}</p>
                </button>
              );
            })}
          </div>

          <div className="border border-stone-200 rounded-2xl p-5 sm:p-8 bg-[#FAF9F8] lg:sticky lg:top-24 h-fit">
            <div className="w-12 h-12 rounded-xl border border-stone-200 bg-white flex items-center justify-center mb-6"><Icon className="text-electric-blue" /></div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-stone-400">Active Agent</p>
            <h2 className="font-serif text-3xl sm:text-4xl mt-2 mb-2">{active.name}</h2>
            <p className="text-electric-blue font-semibold text-sm mb-6">{active.role}</p>
            <p className="text-stone-600 leading-relaxed mb-8">{active.desc}</p>
            <div className="bg-white border border-stone-200 rounded-xl p-5 mb-6">
              <p className="text-[11px] uppercase tracking-wider font-bold text-stone-400 mb-2">Typical Output</p>
              <p className="text-sm text-stone-700">{active.output}</p>
            </div>
            <Link href="/start-free-trial" className="inline-flex items-center gap-2 bg-black hover:bg-electric-blue text-white text-sm font-semibold px-6 py-3 rounded-full">Assign this agent <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
