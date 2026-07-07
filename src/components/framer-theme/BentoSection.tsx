'use client';

import { GREEN, STATS, INTERESTS } from '@/lib/framer-tokens';
import { trackMouse } from './trackMouse';

export default function BentoSection() {
  return (
    <section
      id="about"
      style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 80px', position: 'relative', zIndex: 1 }}
    >
      <div className="fr-bento">
        {/* Bio card — 2 cols */}
        <div
          data-reveal
          data-delay="0"
          onMouseMove={trackMouse}
          className="fr-card fr-spot fr-bento-bio"
          style={{ padding: '36px 36px' }}
        >
          <span className="fr-label" style={{ display: 'block', marginBottom: 20 }}>
            01 · About
          </span>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 2.8vw, 30px)',
              fontWeight: 700,
              color: '#F2F2F5',
              lineHeight: 1.45,
              margin: '0 0 20px',
            }}
          >
            I love a good side quest
          </p>
          <p style={{ fontSize: 15, color: 'rgba(242,242,245,0.5)', lineHeight: 1.8, margin: 0, maxWidth: 460 }}>
            I'm a Software Engineer at Expedia Group working on travel technology, focusing on modernizing legacy systems to work with AI tooling. Outside of work, I spend time flying as an instrument rated private pilot, traveling, and trying to beat the S&P via algo trading - So far unsuccessful... 
          </p>
        </div>

        {/* System status card — 1 col */}
        <div
          data-reveal
          data-delay="100"
          onMouseMove={trackMouse}
          className="fr-card fr-spot"
          style={{ padding: '28px 28px' }}
        >
          <span className="fr-label" style={{ display: 'block', marginBottom: 20 }}>Interests</span>
          {INTERESTS.map((name) => (
            <div key={name} className="fr-sys">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, opacity: 0.9 }} />
                <span style={{ fontSize: 13, color: 'rgba(242,242,245,0.7)' }}>{name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats — 3 small cards */}
        {STATS.map((s, i) => (
          <div
            key={s.label}
            data-reveal
            data-delay={`${(i + 1) * 80}`}
            onMouseMove={trackMouse}
            className="fr-card fr-spot"
            style={{ padding: '24px 28px' }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 44,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                background: `linear-gradient(135deg, #F2F2F5, rgba(242,242,245,0.45))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 6,
              }}
            >
              {s.val}
            </div>
            <div style={{ fontSize: 13, color: 'rgba(242,242,245,0.4)', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
