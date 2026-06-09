import type {Metadata} from 'next';
import { Inter, Libre_Caslon_Text } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600'],
});

const libreCaslon = Libre_Caslon_Text({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'The Micro Agent Company | AI Agents for Real Work',
  description: 'Work like a real team with AI agents. Custom content, admin, research, sales, support, and growth agents optimized for real businesses.',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${libreCaslon.variable}`}>
      <body suppressHydrationWarning className="antialiased min-h-screen bg-white text-black">
        {children}
      </body>
    </html>
  );
}
