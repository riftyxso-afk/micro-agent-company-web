import type { Metadata, Viewport } from "next";
import { Inter, Libre_Caslon_Text, Outfit } from "next/font/google";
import "./globals.css";
import LanguageProviderWrapper from "@/components/LanguageProviderWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://www.themicroagentcompany.biz.id";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a1a",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Micro Agent Company | AI Visibility untuk Bisnis",
    template: "%s | The Micro Agent Company",
  },
  description:
    "The Micro Agent Company membantu bisnis meningkatkan AI Visibility agar ChatGPT, Gemini, Claude, Perplexity, dan AI masa depan bisa memahami dan merekomendasikan brand Anda dengan akurat. Layanan: AI Visibility Audit, AI Readiness Assessment, GEO Strategy, AI Brand Monitoring.",

  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },

  verification: {
    google: "t6Gi0bVdrU_yFNJLUKmdmxLOg0jqL_QCCNjszbLZd9w",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "The Micro Agent Company",
    title: "The Micro Agent Company | AI Visibility untuk Bisnis",
    description:
      "Meningkatkan AI Visibility bisnis Anda — audit, assessment, strategi GEO, dan monitoring agar AI merekomendasikan brand Anda.",
    url: siteUrl,
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "The Micro Agent Company",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "The Micro Agent Company | AI Visibility untuk Bisnis",
    description:
      "Meningkatkan AI Visibility bisnis Anda — audit, assessment, strategi GEO, dan monitoring agar AI merekomendasikan brand Anda.",
    images: ["/hero.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  authors: [{ name: "The Micro Agent Company" }],
  creator: "The Micro Agent Company",
  publisher: "The Micro Agent Company",

  category: "technology",

  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${libreCaslon.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The Micro Agent Company",
              url: siteUrl,
              logo: `${siteUrl}/logo.svg`,
              description:
                "The Micro Agent Company membantu bisnis meningkatkan AI Visibility agar AI platform seperti ChatGPT, Gemini, Claude, Perplexity dapat memahami dan merekomendasikan brand mereka.",
              founder: {
                "@type": "Person",
                name: "I Wayan Radea",
              },
              foundingDate: "2025",
              sameAs: [
                "https://t.me/microclaw",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  availableLanguage: ["Indonesian", "English"],
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "AI Visibility Audit",
              provider: {
                "@type": "Organization",
                name: "The Micro Agent Company",
                url: siteUrl,
              },
              areaServed: "ID",
              description: "Analisis lengkap bagaimana AI saat ini melihat, memahami, dan merekomendasikan brand Anda — termasuk brand visibility analysis, AI search testing, competitor comparison, AI Readiness Score, dan rekomendasi aksi.",
              offers: [
                {
                  "@type": "Offer",
                  name: "AI Visibility Audit",
                  price: "150000",
                  priceCurrency: "IDR",
                  description: "Analisis brand visibility, AI search testing, competitor comparison, AI Readiness Score",
                },
                {
                  "@type": "Offer",
                  name: "AI Readiness Assessment",
                  price: "149000",
                  priceCurrency: "IDR",
                  description: "Evaluasi kesiapan bisnis untuk AI search — struktur data, kualitas konten, entity consistency",
                },
                {
                  "@type": "Offer",
                  name: "GEO Strategy",
                  price: "1490000",
                  priceCurrency: "IDR",
                  description: "Strategi roadmap Generative Engine Optimization untuk meningkatkan AI Visibility",
                },
                {
                  "@type": "Offer",
                  name: "AI Brand Monitoring",
                  price: "2490000",
                  priceCurrency: "IDR",
                  description: "Pemantauan berkelanjutan AI Visibility Score, competitor tracking, prompt monitoring",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Apa itu AI Visibility?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "AI Visibility adalah seberapa baik AI seperti ChatGPT, Gemini, Claude, dan Perplexity dapat memahami, merekomendasikan, dan merujuk brand Anda ketika pengguna bertanya. Ini mencakup optimasi konten publik, struktur data, entity consistency, dan sumber referensi yang digunakan AI.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Platform AI apa saja yang didukung?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Kami mengoptimasi visibilitas di semua ekosistem AI utama termasuk ChatGPT, Google Gemini, Anthropic Claude, Perplexity, Microsoft Copilot, dan model open-source seperti Llama dan Mistral.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Apakah saya perlu mengubah produk untuk memulai?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tidak. Optimasi dilakukan pada konten publik, direktori industri, dokumentasi, dan sumber referensi online yang digunakan AI untuk membangun pengetahuannya tentang brand Anda.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Apa bedanya dengan SEO?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "SEO berfokus pada peringkat tautan di halaman hasil pencarian (SERP). AI Visibility berfokus pada relevansi semantik — membuat brand Anda menjadi rekomendasi teks definitif yang langsung disebut AI dalam jawabannya. SEO untuk mesin pencari, AI Visibility untuk mesin AI.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen bg-white text-black font-sans">
        <LanguageProviderWrapper>{children}</LanguageProviderWrapper>
      </body>
    </html>
  );
}