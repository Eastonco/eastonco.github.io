'use client';

import { useEffect } from 'react';
import { reportError } from '@/lib/report-error';

// Last-resort boundary for errors in the root layout itself; replaces the whole document.
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    reportError(error, 'global-error', { digest: error.digest });
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          padding: 16,
          margin: 0,
          fontFamily: 'system-ui, sans-serif',
          background: '#0a0a0a',
          color: '#ededed',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: 24, margin: 0 }}>Something broke.</h1>
        <p style={{ opacity: 0.7, margin: 0 }}>It&apos;s been logged.</p>
        {/* Full reload on purpose: the root layout is what failed. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" style={{ color: 'inherit' }}>
          Reload home
        </a>
        {error.digest && (
          <p style={{ fontFamily: 'monospace', fontSize: 12, opacity: 0.5 }}>ref: {error.digest}</p>
        )}
      </body>
    </html>
  );
}
