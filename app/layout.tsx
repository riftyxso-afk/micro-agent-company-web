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
    default: "The Micro Agent Company | AI Agents for Real Work",
    template: "%s | The Micro Agent Company",
  },
  description:
    "AI agents untuk pebisnis & UMKM Indonesia. Kelola email, content, research, invoice via WhatsApp & Telegram. VPS + OpenClaw managed hosting.",

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
    title: "The Micro Agent Company | AI Agents for Real Work",
    description:
      "AI agents untuk pebisnis & UMKM Indonesia. Kelola email, content, research, invoice via WhatsApp & Telegram.",
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
    title: "The Micro Agent Company | AI Agents for Real Work",
    description:
      "AI agents untuk pebisnis & UMKM Indonesia. Kelola email, content, research, invoice via WhatsApp & Telegram.",
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
                "AI agents untuk pebisnis & UMKM Indonesia. VPS + OpenClaw managed hosting.",
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
              "@type": "SoftwareApplication",
              name: "The Micro Agent Company",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: [
                {
                  "@type": "Offer",
                  name: "Starter",
                  price: "49000",
                  priceCurrency: "IDR",
                  description: "For students, creators, and solo users testing AI workflows.",
                },
                {
                  "@type": "Offer",
                  name: "Growth",
                  price: "149000",
                  priceCurrency: "IDR",
                  description: "For UMKM and creators that need content output every week.",
                },
                {
                  "@type": "Offer",
                  name: "Custom Agent Setup",
                  price: "1490000",
                  priceCurrency: "IDR",
                  description: "For businesses that want custom AI agents and automation.",
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
                  name: "Do I need to know how to code?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Not at all. Our agents are designed for non-technical users. You interact through WhatsApp, Telegram, or dashboard — no coding required.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I cancel anytime?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. All plans are month-to-month with no long-term contracts. You can cancel anytime through your dashboard.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What makes MicroClaw different from ChatGPT or Claude?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "MicroClaw gives you a dedicated AI assistant running on your own VPS with persistent memory, tool access, and channel integrations (WhatsApp, Telegram, Gmail, Calendar). ChatGPT is a shared chat interface.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is my data private?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Your data stays on your own VPS. We never access your files or conversations unless you explicitly request support.",
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
