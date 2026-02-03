import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { PostHogProvider } from '@/components/PostHogProvider';
import { JetBrains_Mono, Inter } from 'next/font/google';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Connor Easton | Software Engineer, Pilot, Tinkerer',
  description: 'Software engineer at Expedia Group. Private pilot. Building things in Seattle.',
  authors: [{ name: 'Connor Easton' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eastonco.net',
    title: 'Connor Easton | Software Engineer, Pilot, Tinkerer',
    description: 'Software engineer at Expedia Group. Private pilot. Building things in Seattle.',
    siteName: 'eastonco.net',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#F5F0E8',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-paper text-ink min-h-screen antialiased font-sans">
        <PostHogProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </PostHogProvider>
      </body>
    </html>
  );
}
