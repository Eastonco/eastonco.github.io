import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { PostHogProvider } from '@/components/PostHogProvider';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const dm = DM_Sans({ subsets: ['latin'], variable: '--font-body' });


export const metadata: Metadata = {
  title: 'Connor Easton | Personal Website',
  description: 'Designer, developer, and creative technologist',
  authors: [{ name: 'Connor Easton' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourwebsite.com',
    title: 'Connor Easton | Personal Website',
    description: 'Designer, developer, and creative technologist',
    siteName: 'eastonco.net',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bricolage.variable} ${dm.variable}`}>
      <body
        className='bg-background text-foreground min-h-screen antialiased'
      >
        <PostHogProvider>
            {children}
          <Analytics />
          <SpeedInsights />
        </PostHogProvider>
      </body>
    </html>
  );
}
