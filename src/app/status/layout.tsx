import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connor Easton Status',
  description: 'Current status of Connor Easton systems and services.',
  robots: 'noindex',
};

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return children;
}
