'use client';

import { PROJECTS } from '@/lib/framer-tokens';
import { trackMouse } from './trackMouse';

// Cycles through these palettes by index — add more as needed
const GRADIENTS = [
  { gradTop: 'rgba(20,50,80,0.6)',  gradBot: 'rgba(10,10,20,0.6)',  glow: 'rgba(79,158,232,0.25)' },
  { gradTop: 'rgba(123,30,30,0.6)', gradBot: 'rgba(20,10,10,0.6)',  glow: 'rgba(239,68,68,0.25)' },
  { gradTop: 'rgba(30,60,40,0.6)',  gradBot: 'rgba(10,20,14,0.6)',  glow: 'rgba(74,222,128,0.25)' },
  { gradTop: 'rgba(60,30,90,0.6)',  gradBot: 'rgba(15,10,25,0.6)',  glow: 'rgba(123,95,234,0.25)' },
  { gradTop: 'rgba(70,50,20,0.6)',  gradBot: 'rgba(20,15,5,0.6)',   glow: 'rgba(255,208,96,0.25)' },
];

export default function WorkSection() {
  return (
    <section
      id="work"
      style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 80px', position: 'relative', zIndex: 1 }}
    >
      <span data-reveal className="fr-label" style={{ display: 'block', marginBottom: 20 }}>
        03 · Projects
      </span>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12 }}>
        {PROJECTS.map((p, i) => {
          const { gradTop, gradBot, glow } = GRADIENTS[i % GRADIENTS.length];
          const label = String(i + 1).padStart(2, '0');

          return (
            <a
              key={p.title}
              href={p.href}
              data-reveal
              data-delay={`${i * 100}`}
              onMouseMove={trackMouse}
              className="fr-card fr-spot fr-proj-glow"
              style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', textDecoration: 'none', display: 'block' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 24px 64px ${glow}, 0 0 0 1px rgba(255,255,255,0.12)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {/* Preview area */}
              <div
                style={{
                  height: 200,
                  background: `linear-gradient(160deg, ${gradTop}, ${gradBot})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 60,
                      fontWeight: 800,
                      color: 'rgba(255,255,255,0.08)',
                      letterSpacing: '-0.04em',
                      userSelect: 'none',
                      position: 'relative',
                    }}
                  >
                    {label}
                  </span>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '28px 28px' }}>
                <div
                  style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 22,
                      fontWeight: 700,
                      color: '#F2F2F5',
                      margin: 0,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {p.title}
                  </h3>
                  <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(242,242,245,0.3)', marginTop: 4 }}>
                    {p.year}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(242,242,245,0.5)', lineHeight: 1.7, margin: '0 0 20px' }}>
                  {p.desc}
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  {p.tags.map((t) => (
                    <span key={t} className="fr-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
