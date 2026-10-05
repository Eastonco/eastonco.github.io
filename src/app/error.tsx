'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { reportError } from '@/lib/report-error';

// Error boundary for every route below the root layout.
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError(error, 'error-boundary', { digest: error.digest });
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold">Something broke.</h1>
      <p className="opacity-70">It&apos;s been logged. Try again, or head back home.</p>
      <div className="flex gap-3">
        <button onClick={reset} className="rounded-full border px-5 py-2">
          Try again
        </button>
        <Link href="/" className="rounded-full border px-5 py-2">
          Home
        </Link>
      </div>
      {error.digest && <p className="font-mono text-xs opacity-50">ref: {error.digest}</p>}
    </main>
  );
}
