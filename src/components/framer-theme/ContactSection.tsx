'use client';

import { trackMouse } from './trackMouse';

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 100px', position: 'relative', zIndex: 1 }}
    >
      <span data-reveal className="fr-label" style={{ display: 'block', marginBottom: 20 }}>
        05 · Contact
      </span>

      <div data-reveal data-delay="80" className="fr-grad-wrap">
        <div onMouseMove={trackMouse} className="fr-card fr-spot fr-grad-inner" style={{ padding: '64px 60px', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 76px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#F2F2F5',
              margin: '0 0 24px',
            }}
          >
            Let&apos;s build
            <br />
            something great.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'rgba(242,242,245,0.45)',
              margin: '0 auto 40px',
              maxWidth: 400,
              lineHeight: 1.7,
            }}
          >
            Available for product work, consulting, and the right freelance engagements.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:eastonco@icloud.com" className="fr-btn fr-btn-white" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/eastonco" target="_blank" rel="noopener noreferrer" className="fr-btn fr-btn-ghost" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://calendly.com/eastonco" target="_blank" rel="noopener noreferrer" className="fr-btn fr-btn-ghost" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </a>
            <a href="https://github.com/Eastonco" target="_blank" rel="noopener noreferrer" className="fr-btn fr-btn-ghost" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
