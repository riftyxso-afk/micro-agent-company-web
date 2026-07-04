import type { Metadata, Viewport } from "next";
import { Inter, Libre_Caslon_Text, Outfit } from "next/font/google";
import "./globals.css";

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

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://the-micro-agent-company.vercel.app";

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
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen bg-white text-black font-sans">
        {children}
      </body>
    </html>
  );
}
