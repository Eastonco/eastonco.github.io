import { VIOLET, BLUE } from '@/lib/framer-tokens';

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '100px 32px 80px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Eyebrow label */}
      <div
        className="h0"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          borderRadius: 99,
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.05)',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: 'rgba(242,242,245,0.6)',
          marginBottom: 40,
          backdropFilter: 'blur(8px)',
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: VIOLET, display: 'inline-block' }} />
        SOFTWARE ENGINEER · TEACHER · PILOT
      </div>

      {/* Name */}
      <h1
        className="h1"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(64px, 11vw, 148px)',
          fontWeight: 800,
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
          margin: '0 0 0',
          color: '#F2F2F5',
        }}
      >
        Connor
      </h1>
      <h1
        className="h2"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(64px, 11vw, 148px)',
          fontWeight: 800,
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
          margin: '0 0 48px',
          background: `linear-gradient(135deg, ${VIOLET} 0%, ${BLUE} 50%, rgba(242,242,245,0.8) 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Easton
      </h1>

      {/* Bio */}
      <p
        className="h3"
        style={{
          fontSize: 17,
          color: 'rgba(242,242,245,0.55)',
          lineHeight: 1.75,
          maxWidth: 520,
          margin: '0 0 40px',
        }}
      >
        Software Engineer at Expedia Group building the future of travel technology. Private pilot, film photographer, and lifelong tinkerer. Have you sent me a{' '}
        <a href="https://printer.eastonco.net" style={{ color: 'rgba(242,242,245,0.55)', textDecoration: 'underline' }}>receipt</a>
        {' '}yet?
      </p>

      {/* CTAs */}
      <div className="h4" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <a href="#work" className="fr-btn fr-btn-white">
          Projects
        </a>
        <a href="#contact" className="fr-btn fr-btn-ghost">
          Get in touch ↗
        </a>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          opacity: 0.25,
        }}
      >
        <div style={{ width: 1, height: 48, background: 'rgba(242,242,245,0.5)' }} />
        <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}>scroll</span>
      </div>
    </section>
  );
}
