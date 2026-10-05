'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export const SECTIONS = [
  { id: 'top', label: 'Intro' },
  { id: 'now', label: 'Now' },
  { id: 'beliefs', label: 'Beliefs' },
  { id: 'work', label: 'Work' },
  { id: 'lab', label: 'Lab' },
  { id: 'off', label: 'Off the keyboard' },
] as const;

// Top bar and right-hand section rail. Tracks which section is in view.
export default function Chrome() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(SECTIONS.findIndex(s => s.id === entry.target.id));
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 border-b border-[var(--ed-line)] bg-[var(--ed-bg)]/85 backdrop-blur">
        <div className="ed-mono mx-auto flex h-12 max-w-6xl items-center justify-between px-4 text-[var(--ed-muted)] sm:px-8">
          <a href="#top" className="text-[var(--ed-text)] normal-case">
            Connor Easton
          </a>
          <span className="hidden sm:inline">
            <span className="text-[var(--ed-text)]">{pad(active)}</span>
            <span className="text-[var(--ed-faint)]"> / {pad(SECTIONS.length - 1)} · </span>
            {SECTIONS[active].label}
          </span>
          <nav className="flex gap-5">
            <Link href="/blog" className="hover:text-[var(--ed-text)]">
              Writing
            </Link>
            <a href="#now" className="hover:text-[var(--ed-text)]">
              CV&nbsp;/&nbsp;MCP
            </a>
          </nav>
        </div>
      </header>

      <nav
        aria-label="Sections"
        className="fixed top-1/2 right-5 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      >
        {SECTIONS.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            aria-current={i === active ? 'true' : undefined}
            className="group flex items-center justify-end gap-3"
          >
            <span className="ed-mono text-[var(--ed-faint)] opacity-0 transition-opacity group-hover:opacity-100">
              {s.label}
            </span>
            <span
              className={`h-px transition-all ${
                i === active ? 'w-6 bg-[var(--ed-accent)]' : 'w-3 bg-[var(--ed-line-strong)]'
              }`}
            />
          </a>
        ))}
      </nav>
    </>
  );
}
