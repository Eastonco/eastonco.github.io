'use client';

import { useState } from 'react';
import { GREEN } from '@/lib/framer-tokens';
import { trackMouse } from './trackMouse';

const MCP_URL = 'https://eastonco.net/api/mcp';
const CLI = `claude mcp add --transport http eastonco ${MCP_URL}`;

export default function MCPSection() {
  const [copied, setCopied] = useState('');

  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <section
      id="mcp"
      style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 100px', position: 'relative', zIndex: 1 }}
    >
      <span data-reveal className="fr-label" style={{ display: 'block', marginBottom: 20 }}>
        06 · MCP
      </span>

      <div
        data-reveal
        data-delay="80"
        onMouseMove={trackMouse}
        className="fr-card fr-spot"
        style={{ padding: '48px 48px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <div className="fr-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: GREEN }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: GREEN }}>Live for AI agents</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(26px, 3.4vw, 40px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#F2F2F5',
            margin: '0 0 16px',
          }}
        >
          Query my résumé over MCP
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(242,242,245,0.5)', lineHeight: 1.8, margin: '0 0 28px', maxWidth: 560 }}>
          My CV is a live{' '}
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(242,242,245,0.8)', textDecoration: 'underline' }}
          >
            Model Context Protocol
          </a>{' '}
          server. Point Claude, Cursor, or any MCP client at it and just ask about my experience — it can
          fetch an overview, dig into specific projects, or search across everything.
        </p>

        {/* Endpoint URL */}
        <button
          onClick={() => copy(MCP_URL, 'url')}
          onMouseMove={trackMouse}
          className="fr-spot"
          style={codeBox}
        >
          <span style={{ color: 'rgba(242,242,245,0.9)' }}>{MCP_URL}</span>
          <span style={copyHint}>{copied === 'url' ? 'copied ✓' : 'copy'}</span>
        </button>

        {/* Claude Code one-liner */}
        <button
          onClick={() => copy(CLI, 'cli')}
          onMouseMove={trackMouse}
          className="fr-spot"
          style={{ ...codeBox, marginTop: 12 }}
        >
          <span style={{ color: 'rgba(242,242,245,0.55)' }}>
            <span style={{ color: GREEN }}>$</span> {CLI}
          </span>
          <span style={copyHint}>{copied === 'cli' ? 'copied ✓' : 'copy'}</span>
        </button>
      </div>
    </section>
  );
}

const codeBox: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  padding: '16px 20px',
  borderRadius: 12,
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
  fontSize: 14,
  textAlign: 'left',
  cursor: 'pointer',
  overflowX: 'auto',
};

const copyHint: React.CSSProperties = {
  flexShrink: 0,
  fontSize: 12,
  fontWeight: 600,
  color: 'rgba(242,242,245,0.4)',
  fontFamily: 'var(--font-body)',
};
