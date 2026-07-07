'use client';

import { useState } from 'react';
import Link from 'next/link';

const LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Work', href: '/#work' },
  { label: 'Contact', href: '/#contact' },
  { label: 'MCP', href: '/#mcp' },
  { label: 'Blog', href: '/blog' },
];

const divider = (extraClass?: string) => (
  <div
    className={extraClass}
    style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }}
  />
);

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="fr-navbar"
        style={{
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 101,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          background: 'rgba(10,10,14,0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14,
          padding: '6px 10px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 17,
            fontWeight: 700,
            color: '#F2F2F5',
            padding: '4px 10px',
            marginRight: 4,
          }}
        >
          @eastonco
        </span>

        {/* Desktop links */}
        {divider('fr-nav-desktop')}
        {LINKS.map((l) => (
          <Link key={l.label} href={l.href} className="fr-nav fr-nav-desktop">
            {l.label}
          </Link>
        ))}

        {/* Mobile hamburger */}
        <button
          type="button"
          className="fr-nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="fr-nav-menu">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="fr-nav" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
