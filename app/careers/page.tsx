"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { ArrowRight, MapPin, Clock, Briefcase, CheckCircle2, X, Upload, Loader2 } from "lucide-react";

const openRoles = [
  {
    title: "AI Visibility Analyst",
    department: "Solutions",
    location: "Remote · Indonesia",
    type: "Full-time",
    description: "Conduct AI Visibility Audits for clients. Analyze brand mentions across ChatGPT, Gemini, Claude, Perplexity. Build AI Readiness Reports.",
    responsibilities: [
      "Run AI Visibility Audits for 5-10 clients/month",
      "Test brand mentions across AI platforms",
      "Analyze competitor AI positioning",
      "Write actionable GEO recommendations",
      "Present findings to clients"
    ],
    requirements: [
      "Fluent English & Indonesian",
      "Experience with SEO or content strategy",
      "Comfortable testing AI platforms",
      "Strong written communication",
      "Detail-oriented"
    ]
  },
  {
    title: "Content Creator (AI Visibility)",
    department: "Content",
    location: "Remote · Indonesia",
    type: "Full-time / Contract",
    description: "Create visual and written content optimized for AI visibility. Produce educational reels, infographics, carousel posts, and short-form videos that explain AI Visibility concepts to Indonesian business owners. Manage our social media presence across LinkedIn, Instagram, TikTok, and YouTube.",
    responsibilities: [
      "Plan & produce 8-12 content pieces/month (reels, carousel, infografis)",
      "Translate AI Visibility concepts into engaging visual content",
      "Manage content calendar across LinkedIn, Instagram, TikTok",
      "Edit short-form video (capcut / premiere pro / da vinci)",
      "Collaborate with writer to repurpose blog → social content",
      "Track engagement metrics and optimize content strategy"
    ],
    requirements: [
      "Portfolio showing visual content work",
      "Experienced with social media management",
      "Can explain technical concepts visually",
      "Basic graphic design (Canva / Figma / Adobe)",
      "Video editing skills (reels, short-form)",
      "Fluent in Indonesian & conversational English"
    ]
  },
  {
    title: "Copywriter (AI Visibility)",
    department: "Content",
    location: "Remote · Indonesia",
    type: "Full-time / Contract",
    description: "Write clear, authoritative copy that helps AI systems understand and recommend our clients' brands. Create website copy, landing pages, case studies, email sequences, and thought leadership articles about AI Visibility and GEO.",
    responsibilities: [
      "Write website copy and landing pages optimized for AI indexing",
      "Produce thought leadership articles about AI Visibility",
      "Create email sequences for outreach and nurture",
      "Write case studies and client success stories",
      "Edit and proofread AI Visibility reports",
      "Develop brand voice guidelines for clients"
    ],
    requirements: [
      "Strong portfolio of written work (EN + ID)",
      "3+ years copywriting or content writing experience",
      "Can write about technical topics in plain language",
      "Understanding of conversion copywriting principles",
      "Experience with long-form content (2,000+ words)",
      "SEO writing experience is a plus"
    ]
  },
  {
    title: "GEO Strategist",
    department: "Solutions",
    location: "Remote · Indonesia",
    type: "Full-time",
    description: "Design and implement Generative Engine Optimization strategies. Help clients improve AI discoverability through content optimization.",
    responsibilities: [
      "Design GEO strategies for clients",
      "Optimize FAQ, product pages, entity data",
      "Build knowledge base structures",
      "Track AI Visibility Score improvements",
      "Advise on content for AI indexing"
    ],
    requirements: [
      "2+ years content strategy or SEO",
      "Understanding of semantic search",
      "Experience with structured data",
      "Strong analytical skills",
      "Client-facing experience"
    ]
  },
  {
    title: "AI Brand Monitoring Engineer",
    department: "Engineering",
    location: "Remote · Indonesia",
    type: "Full-time",
    description: "Build tools to monitor AI Visibility. Automate brand mention tracking across ChatGPT, Gemini, Claude, Perplexity.",
    responsibilities: [
      "Build AI monitoring dashboards",
      "Automate prompt testing across platforms",
      "Track competitor AI mentions",
      "Design alerting systems",
      "API integrations (OpenAI, Anthropic, Google)"
    ],
    requirements: [
      "2+ years backend development",
      "TypeScript/Node.js or Python",
      "Experience with LLM APIs",
      "Database design (PostgreSQL)",
      "Comfortable with async workflows"
    ]
  }
];

const benefits = [
  "Remote-first · kerja dari mana saja",
  "Flexible hours · fokus pada output",
  "Equipment allowance · laptop & setup",
  "Learning budget · courses & books",
  "Health insurance · setelah 3 bulan",
  "Annual retreat · 1x/year team gathering"
];

export default function CareersPage() {
  const { t, locale } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    cvFile: null as File | null,
    portfolioUrl: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openModal = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setFormData({ ...formData, position: roleTitle });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      cvFile: null,
      portfolioUrl: "",
      message: ""
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cvFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitting(false);
    setSubmitted(true);

    // ponytail: email form data to radea@themicroagentcompany.biz.id via API route when backend ready
  };

  return (
    <main className="min-h-screen bg-white text-stone-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="font-serif uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[10px] xs:text-[11px] sm:text-[13px] font-bold leading-tight">
            The Micro Agent Company
          </Link>
          <nav className="hidden md:flex gap-7 text-[13px] font-medium">
            <Link href="/products" className="hover:text-electric-blue">{t("nav.products")}</Link>
            <Link href="/agents" className="hover:text-electric-blue">{t("nav.agents")}</Link>
            <Link href="/use-cases" className="hover:text-electric-blue">{t("nav.useCases")}</Link>
            <Link href="/about" className="hover:text-electric-blue">{t("nav.about")}</Link>
            <Link href="/pricing" className="hover:text-electric-blue">{t("nav.pricing")}</Link>
            <Link href="/docs" className="hover:text-electric-blue">{t("nav.docs")}</Link>
          </nav>
          <Link href="/waitlist" className="hidden sm:inline-flex bg-black text-white text-[12px] font-semibold px-5 py-2 rounded-full hover:bg-electric-blue">
            {t("nav.bookCall")}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-white pointer-events-none" />
        <div className="relative z-10 max-w-[720px] text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-electric-blue mb-4">
            {locale === "id" ? "KARIR" : "CAREERS"}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight font-normal mb-6">
            {locale === "id" ? "Bangun masa depan AI Visibility" : "Build the future of AI Visibility"}
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed max-w-[560px] mx-auto">
            {locale === "id"
              ? "Kami membantu bisnis ditemukan oleh AI. Tim kecil, misi besar. Remote-first, fokus pada impact."
              : "We help businesses get discovered by AI. Small team, big mission. Remote-first, impact-focused."}
          </p>
        </div>
      </section>

      {/* Open Roles */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl leading-tight font-normal mb-4">
            {locale === "id" ? "Posisi terbuka" : "Open positions"}
          </h2>
          <p className="text-stone-500 text-[15px]">
            {locale === "id"
              ? `${openRoles.length} posisi aktif · Remote · Indonesia`
              : `${openRoles.length} active roles · Remote · Indonesia`}
          </p>
        </div>

        <div className="space-y-6">
          {openRoles.map((role) => (
            <article key={role.title} className="border border-stone-200 rounded-xl p-6 sm:p-8 bg-white hover:border-electric-blue transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl leading-tight font-normal mb-2">
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-[13px] text-stone-600">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={14} />
                      {role.department}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {role.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {role.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => openModal(role.title)}
                  className="shrink-0 inline-flex items-center gap-2 bg-black hover:bg-electric-blue text-white text-[13px] font-semibold px-6 py-3 rounded-full transition-colors"
                >
                  {locale === "id" ? "Lamar" : "Apply"}
                  <ArrowRight size={15} />
                </button>
              </div>

              <p className="text-stone-600 leading-relaxed mb-6">
                {role.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3">
                    {locale === "id" ? "TANGGUNG JAWAB" : "RESPONSIBILITIES"}
                  </h4>
                  <ul className="space-y-2">
                    {role.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2 text-[13px] text-stone-700">
                        <CheckCircle2 size={14} className="text-electric-blue shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3">
                    {locale === "id" ? "PERSYARATAN" : "REQUIREMENTS"}
                  </h4>
                  <ul className="space-y-2">
                    {role.requirements.map((item) => (
                      <li key={item} className="flex gap-2 text-[13px] text-stone-700">
                        <CheckCircle2 size={14} className="text-electric-blue shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-stone-50 border-t border-stone-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="font-serif text-3xl sm:text-4xl leading-tight font-normal mb-8 text-center">
            {locale === "id" ? "Benefits" : "Benefits"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex gap-3 items-start p-4 bg-white border border-stone-200 rounded-lg">
                <CheckCircle2 size={18} className="text-electric-blue shrink-0 mt-0.5" />
                <span className="text-[14px] text-stone-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-stone-200">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl leading-tight font-normal mb-4">
            {locale === "id" ? "Tidak menemukan posisi yang cocok?" : "Don't see a role that fits?"}
          </h2>
          <p className="text-stone-500 mb-8">
            {locale === "id"
              ? "Kami selalu mencari builder. Kirim CV dan porto ke email kami."
              : "We're always looking for builders. Send your CV and portfolio to our email."}
          </p>
          <button
            onClick={() => openModal("Open Application")}
            className="inline-flex items-center gap-2 bg-black text-white text-[13px] font-semibold px-8 py-3 rounded-full hover:bg-electric-blue transition-colors"
          >
            {locale === "id" ? "Kirim CV" : "Send CV"}
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-normal">
                  {locale === "id" ? "Lamar Posisi" : "Apply for Position"}
                </h3>
                <p className="text-[13px] text-stone-500 mt-1">{selectedRole}</p>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h4 className="font-serif text-2xl mb-2">
                    {locale === "id" ? "Terima kasih!" : "Thank you!"}
                  </h4>
                  <p className="text-stone-600 text-[14px] mb-6">
                    {locale === "id"
                      ? "Lamaran Anda telah diterima. Kami akan menghubungi Anda segera."
                      : "Your application has been received. We'll contact you soon."}
                  </p>
                  <button
                    onClick={closeModal}
                    className="inline-flex items-center gap-2 bg-black text-white text-[13px] font-semibold px-6 py-2.5 rounded-full hover:bg-electric-blue transition-colors"
                  >
                    {locale === "id" ? "Tutup" : "Close"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-medium text-stone-700 mb-1.5">
                      {locale === "id" ? "Nama Lengkap *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-[14px] focus:outline-none focus:border-electric-blue"
                      placeholder={locale === "id" ? "Nama Anda" : "Your name"}
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-stone-700 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-[14px] focus:outline-none focus:border-electric-blue"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-stone-700 mb-1.5">
                      {locale === "id" ? "Nomor Telepon / WhatsApp *" : "Phone / WhatsApp *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-[14px] focus:outline-none focus:border-electric-blue"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-stone-700 mb-1.5">
                      CV / Resume *
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        required
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-[14px] flex items-center gap-2 bg-stone-50">
                        <Upload size={16} className="text-stone-400" />
                        <span className="text-stone-600">
                          {formData.cvFile ? formData.cvFile.name : (locale === "id" ? "Upload CV (PDF/DOC)" : "Upload CV (PDF/DOC)")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-stone-700 mb-1.5">
                      Portfolio / LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-[14px] focus:outline-none focus:border-electric-blue"
                      placeholder="https://"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-stone-700 mb-1.5">
                      {locale === "id" ? "Pesan (Opsional)" : "Message (Optional)"}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-[14px] focus:outline-none focus:border-electric-blue resize-none"
                      placeholder={locale === "id" ? "Ceritakan sedikit tentang Anda..." : "Tell us a bit about yourself..."}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-black hover:bg-electric-blue disabled:bg-stone-300 text-white text-[14px] font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        {locale === "id" ? "Mengirim..." : "Submitting..."}
                      </>
                    ) : (
                      <>
                        {locale === "id" ? "Kirim Lamaran" : "Submit Application"}
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-stone-400">
                    {locale === "id"
                      ? "Data Anda akan dikirim ke radea@themicroagentcompany.biz.id"
                      : "Your data will be sent to radea@themicroagentcompany.biz.id"}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
