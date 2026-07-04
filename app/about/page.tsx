import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The Micro Agent Company builds AI agents that handle content, admin, research, sales, support, and growth — helping solo founders, freelancers, and small businesses run like a full team.",
  openGraph: {
    title: "About Us | The Micro Agent Company",
    description:
      "AI agents that handle content, admin, research, sales, support, and growth for solo founders, freelancers, and small businesses.",
    url: "https://www.themicroagentcompany.biz.id/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-stone-900 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="font-serif uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[10px] xs:text-[11px] sm:text-[13px] font-bold leading-tight">The Micro Agent Company</Link>
          <nav className="hidden md:flex gap-7 text-[13px] font-medium">
            <Link href="/products" className="hover:text-electric-blue">Products</Link>
            <Link href="/agents" className="hover:text-electric-blue">Agents</Link>
            <Link href="/use-cases" className="hover:text-electric-blue">Use Cases</Link>
            <Link href="/about" className="text-electric-blue">About</Link>
            <Link href="/pricing" className="hover:text-electric-blue">Pricing</Link>
            <Link href="/docs" className="hover:text-electric-blue">Docs</Link>
          </nav>
          <Link href="/start-free-trial" className="hidden sm:inline-flex bg-black text-white text-[12px] font-semibold px-5 py-2 rounded-full hover:bg-electric-blue">Start free trial</Link>
        </div>
      </header>

      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-white pointer-events-none" />
        <div className="relative z-10 max-w-[720px] text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-electric-blue mb-4">About</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight font-normal mb-6">About The Micro Agent Company</h1>
          <p className="text-stone-500 text-lg leading-relaxed max-w-[560px] mx-auto">
            AI agents that handle content, admin, research, sales, support, and growth — helping solo founders, freelancers, and small businesses run like a full team.
          </p>
        </div>
      </section>

      <section className="max-w-[720px] mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="border border-stone-200 rounded-2xl p-8 sm:p-10 bg-[#FAF9F8]">
          <h2 className="font-serif text-2xl sm:text-3xl leading-tight font-normal mb-6">Our Vision</h2>
          <p className="text-stone-600 leading-relaxed text-[15px]">
            To make AI agents as essential to small businesses and independent creators as a spreadsheet or a phone — so anyone can run a business like a full team, without hiring one.
          </p>
        </div>
      </section>

      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="font-serif text-2xl sm:text-3xl leading-tight font-normal mb-6">Our Mission</h2>
          <p className="text-stone-600 leading-relaxed text-[15px]">
            We build simple, affordable AI agents that handle real work — content, admin, research, sales, support, and growth — so freelancers, creators, and UMKM in Indonesia and beyond can focus on what only they can do.
          </p>
        </div>
      </section>

      <section className="max-w-[720px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="font-serif text-2xl sm:text-3xl leading-tight font-normal mb-8">Our Story</h2>
        <div className="prose prose-stone max-w-none prose-p:leading-relaxed prose-p:text-[15px]">
          <p>
            I&apos;m Radea — I Wayan Radea, a freelance web developer based in Bali. Working closely with small business owners and clients, I kept seeing the same thing: people running their own businesses, overwhelmed by everything that comes with it — content, admin, customer follow-ups, research — all while trying to actually grow.
          </p>
          <p>
            Most of them didn&apos;t need a bigger team. They needed the repetitive parts of running a business handled, so they could focus on the parts that actually mattered.
          </p>
          <p>
            That&apos;s why I started The Micro Agent Company. I build AI agents that take on that everyday work — content, admin, research, sales, support, and growth — so business owners can stop drowning in tasks and start focusing on what only they can do.
          </p>
          <p>
            This company exists for every solo founder, freelancer, and small business owner who&apos;s tired of doing it all alone. With the right AI agents, you don&apos;t have to.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-stone-200">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl leading-tight font-normal mb-4">Ready to stop doing it all alone?</h2>
          <p className="text-stone-500 mb-8">Start your 7-day free trial. No credit card required.</p>
          <Link href="/start-free-trial" className="inline-flex bg-black text-white text-[13px] font-semibold px-8 py-3 rounded-full hover:bg-electric-blue transition-colors">
            Start free trial
          </Link>
        </div>
      </section>
    </main>
  );
}
