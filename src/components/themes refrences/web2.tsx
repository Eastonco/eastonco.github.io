'use client';

import { Varela_Round, Lato } from 'next/font/google';

const varela = Varela_Round({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-body' });

const BLUE = '#2E6DA4';
const DARK = '#1a2e4a';

const SKILLS = [
  { name: 'TypeScript', pct: 95 },
  { name: 'React', pct: 90 },
  { name: 'Next.js', pct: 85 },
  { name: 'Node.js', pct: 80 },
  { name: 'Kotlin', pct: 75 },
  { name: 'Docker', pct: 70 },
];

const PROJECTS = [
  {
    title: 'The Big Red Button',
    desc: 'Multiplayer cookie clicker with real-time Supabase. Minimal premise, maximum engagement.',
    href: '/red-button',
    tags: ['supabase', 'real-time', 'react'],
    badge: 'Live',
  },
  {
    title: 'Dumpster Dive',
    desc: 'Anonymous thought-sharing. No feeds, no engagement loops — just the internet talking.',
    href: '/dumpster-dive',
    tags: ['next.js', 'anonymous', 'social'],
    badge: 'Beta',
  },
];

const TAGS = ['TypeScript', 'React', 'Next.js', 'Kotlin', 'Node.js', 'Docker', 'Figma', 'AI', 'Design', 'Teaching'];

const STATS = [
  { label: 'Projects Shipped', val: '20+' },
  { label: 'Years Experience', val: '5+' },
  { label: 'Students Taught', val: '200+' },
  { label: 'Cups of Coffee', val: '∞' },
];

const SOCIALS = [
  { label: 'GitHub', bg: '#24292E', href: 'https://github.com/Eastonco' },
  { label: 'LinkedIn', bg: '#0A66C2', href: '#' },
  { label: 'Twitter / X', bg: '#1DA1F2', href: '#' },
];

function GlossOrb({ size, fontSize, style }: { size: number; fontSize: number; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(145deg, #88CCFF 0%, #2E6DA4 55%, #1A3A60 100%)',
        boxShadow: `0 ${size / 12}px ${size / 4}px rgba(46,109,164,0.45), inset 0 ${size / 24}px ${size / 12}px rgba(255,255,255,0.35)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontSize,
        color: 'rgba(255,255,255,0.92)',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '15%',
          right: '15%',
          height: '38%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0) 100%)',
          borderRadius: '50%',
        }}
      />
      CE
    </div>
  );
}

function CardHead({ label, right }: { label: string; right?: React.ReactNode }) {
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, #4A90D4 0%, ${BLUE} 100%)`,
        padding: '9px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #1a5090',
      }}
    >
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'white' }}>{label}</span>
      {right && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{right}</span>}
    </div>
  );
}

export default function Web2Theme() {
  return (
    <div
      className={`${varela.variable} ${lato.variable}`}
      style={{ background: '#E4EAF0', minHeight: '100vh', fontFamily: 'var(--font-body)' }}
    >
      <style>{`
        /* Glossy button */
        .w2-btn {
          display: inline-block; padding: 8px 20px; border-radius: 18px;
          font-family: var(--font-display); font-size: 12px; text-decoration: none;
          cursor: pointer; position: relative; overflow: hidden;
          transition: filter 0.15s !important;
        }
        .w2-btn::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 50%;
          background: linear-gradient(to bottom, rgba(255,255,255,0.38), rgba(255,255,255,0.06));
          border-radius: 18px 18px 0 0; pointer-events: none;
        }
        .w2-btn:hover { filter: brightness(1.1); }
        .w2-btn-blue {
          background: linear-gradient(to bottom, #4E96D8 0%, #1F5EA8 100%);
          color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.28);
        }
        .w2-btn-orange {
          background: linear-gradient(to bottom, #FFAA42 0%, #F47316 100%);
          color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.28);
        }
        .w2-btn-gray {
          background: linear-gradient(to bottom, #F6F6F6 0%, #DCDCDC 100%);
          color: #3a3a3a; border: 1px solid #BBBBBB;
          box-shadow: 0 2px 4px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.85);
        }
        /* Card box */
        .w2-card {
          background: white; border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.14), 0 1px 2px rgba(0,0,0,0.08);
          border: 1px solid #C8D4DE; overflow: hidden;
          transition: box-shadow 0.2s !important;
        }
        .w2-card:hover { box-shadow: 0 5px 18px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.1); }
        /* Glossy progress bar */
        .w2-track {
          height: 17px; border-radius: 9px;
          background: linear-gradient(to bottom, #C0CAD4 0%, #D4DEE8 50%, #C0CAD4 100%);
          border: 1px solid #A8B4C0; box-shadow: inset 0 2px 4px rgba(0,0,0,0.18);
          overflow: hidden;
        }
        .w2-fill {
          height: 100%; border-radius: 9px;
          background: linear-gradient(to bottom, #5AAAF0 0%, #2070C0 55%, #1858A0 100%);
          position: relative;
        }
        .w2-fill::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 50%;
          background: linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0));
          border-radius: 9px 9px 0 0;
        }
        /* Tag pill */
        .w2-tag {
          display: inline-block; padding: 3px 9px; border-radius: 10px; font-size: 11px;
          background: linear-gradient(to bottom, #EEF3F8, #DCE6F0);
          border: 1px solid #B8C8D8; color: #4A6882;
          transition: all 0.14s !important; cursor: default;
        }
        .w2-tag:hover {
          background: linear-gradient(to bottom, #2E6DA4, #1A4A7A);
          color: white; border-color: #1A4A7A;
        }
        /* Nav link */
        .w2-nav {
          display: inline-block; padding: 6px 16px; border-radius: 14px;
          font-family: var(--font-display); font-size: 12px; text-decoration: none;
          color: rgba(255,255,255,0.72); transition: all 0.14s !important;
        }
        .w2-nav:hover { background: rgba(255,255,255,0.18); color: white; }
        /* Social links */
        .w2-social {
          display: flex; align-items: center; gap: 8px; padding: 7px 14px;
          border-radius: 6px; font-size: 12px; text-decoration: none; color: white;
          transition: filter 0.14s !important;
        }
        .w2-social:hover { filter: brightness(1.15); }
        /* Even/odd rows */
        .row-even { background: #F6F9FB; }
        .row-odd  { background: #FFFFFF; }
        /* Float anim */
        @keyframes w2float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-7px); } }
        .w2-float { animation: w2float 4s ease-in-out infinite; }
        /* Top-bar */
        .w2-topbar-link { color: rgba(255,255,255,0.48); font-size: 11px; text-decoration: none; transition: color 0.14s !important; }
        .w2-topbar-link:hover { color: rgba(255,255,255,0.85); }
      `}</style>

      {/* ── HEADER ──────────────────────────────────────── */}
      <header
        style={{
          background: `linear-gradient(to bottom, ${DARK} 0%, ${BLUE} 100%)`,
          boxShadow: '0 3px 10px rgba(0,0,0,0.45)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        {/* Utility strip */}
        <div
          style={{
            background: 'rgba(0,0,0,0.28)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            padding: '4px 32px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <a href="mailto:hello@eastonco.net" className="w2-topbar-link">✉ hello@eastonco.net</a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <a href="https://github.com/Eastonco" target="_blank" rel="noopener noreferrer" className="w2-topbar-link">GitHub</a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          {/* RSS badge */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '2px 8px',
              borderRadius: 3,
              background: 'linear-gradient(to bottom, #FF9933, #E06000)',
              color: 'white',
              fontSize: 10,
              fontFamily: 'var(--font-display)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
            }}
          >
            RSS
          </span>
        </div>

        {/* Logo + Nav */}
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            padding: '14px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <GlossOrb size={44} fontSize={16} />
            <div>
              <div
                style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'white', letterSpacing: '-0.01em' }}
              >
                Connor Easton
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>
                Software Engineer · Teacher
              </div>
            </div>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {['Home', 'About', 'Portfolio', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="w2-nav">
                {l}
              </a>
            ))}
            <a href="#contact" className="w2-btn w2-btn-orange" style={{ marginLeft: 12 }}>
              Hire Me ›
            </a>
          </nav>
        </div>
      </header>

      {/* ── HERO BANNER ─────────────────────────────────── */}
      <div
        id="home"
        style={{
          background: 'linear-gradient(to bottom, #D2DCE8 0%, #E4EAF0 100%)',
          borderBottom: '1px solid #B4C4D4',
          padding: '48px 32px 44px',
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 200px',
            gap: 48,
            alignItems: 'center',
          }}
        >
          <div>
            {/* Availability badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 12px',
                borderRadius: 12,
                background: 'linear-gradient(to bottom, #FFD040, #F59000)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.22)',
                fontSize: 11,
                fontFamily: 'var(--font-display)',
                color: 'white',
                marginBottom: 20,
              }}
            >
              <span style={{ fontSize: 8 }}>●</span> Available for Work
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                color: '#1A2E4A',
                lineHeight: 1.15,
                margin: '0 0 16px',
                textShadow: '0 1px 2px rgba(255,255,255,0.7)',
              }}
            >
              Building great software,
              <br />
              <span style={{ color: BLUE }}>beautifully.</span>
            </h1>

            <p
              style={{ fontSize: 14, color: '#4A6080', lineHeight: 1.75, maxWidth: 500, margin: '0 0 28px' }}
            >
              TypeScript, React, Next.js, Kotlin, distributed systems. I care about clean
              abstractions, thoughtful UX, and systems that don&apos;t page you at 3am.
            </p>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <a href="#portfolio" className="w2-btn w2-btn-blue">
                View Portfolio ›
              </a>
              <a href="#contact" className="w2-btn w2-btn-gray">
                Get in Touch
              </a>
            </div>
          </div>

          {/* Floating orb */}
          <div className="w2-float" style={{ display: 'flex', justifyContent: 'center' }}>
            <GlossOrb size={160} fontSize={44} />
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT: content + sidebar ──────────────── */}
      <div
        style={{
          maxWidth: 960,
          margin: '28px auto',
          padding: '0 32px',
          display: 'grid',
          gridTemplateColumns: '1fr 268px',
          gap: 22,
          alignItems: 'start',
        }}
      >
        {/* ── LEFT COLUMN ───── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

          {/* Skills */}
          <div className="w2-card">
            <CardHead label="⚙ Skills &amp; Expertise" right="Updated 2025" />
            <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {SKILLS.map(s => (
                <div key={s.name}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, alignItems: 'baseline' }}
                  >
                    <span style={{ fontSize: 13, color: '#2D3748', fontFamily: 'var(--font-display)' }}>
                      {s.name}
                    </span>
                    <span style={{ fontSize: 11, color: '#718096' }}>{s.pct}%</span>
                  </div>
                  <div className="w2-track">
                    <div className="w2-fill" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          <div className="w2-card" id="portfolio">
            <CardHead label="◈ Featured Projects" />
            {PROJECTS.map((p, i) => (
              <div
                key={p.title}
                className={i % 2 === 0 ? 'row-even' : 'row-odd'}
                style={{ padding: '18px 20px', borderTop: i > 0 ? '1px solid #EAF0F6' : 'none' }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <h3
                      style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: '#1A3A60', margin: 0 }}
                    >
                      {p.title}
                    </h3>
                    {/* Badge */}
                    <span
                      style={{
                        padding: '2px 7px',
                        borderRadius: 3,
                        fontSize: 10,
                        fontFamily: 'var(--font-display)',
                        background:
                          p.badge === 'Beta'
                            ? 'linear-gradient(to bottom, #FFAA00, #E08000)'
                            : 'linear-gradient(to bottom, #44CC66, #228844)',
                        color: 'white',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.28)',
                      }}
                    >
                      {p.badge}
                    </span>
                  </div>
                  {/* Stars */}
                  <span style={{ color: '#F59E0B', fontSize: 15, letterSpacing: 1 }}>★★★★★</span>
                </div>

                <p style={{ fontSize: 13, color: '#4A6080', lineHeight: 1.65, margin: '0 0 12px' }}>{p.desc}</p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {p.tags.map(t => (
                      <span key={t} className="w2-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a href={p.href} className="w2-btn w2-btn-blue" style={{ fontSize: 11, padding: '5px 13px' }}>
                    View ›
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* About */}
          <div className="w2-card" id="about">
            <CardHead label="✦ About Me" />
            <div
              style={{
                padding: '20px',
                display: 'grid',
                gridTemplateColumns: '76px 1fr',
                gap: 18,
                alignItems: 'start',
              }}
            >
              <GlossOrb size={76} fontSize={20} />
              <div>
                <p style={{ fontSize: 13, color: '#4A6080', lineHeight: 1.75, margin: '0 0 14px' }}>
                  Engineer by trade, teacher by choice. I&apos;ve built and shipped software for years, and
                  spent just as long making it teachable. The craft of making complexity legible never gets
                  old.
                </p>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {TAGS.map(t => (
                    <span key={t} className="w2-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="w2-card" id="contact">
            <CardHead label="✉ Get In Touch" />
            <div style={{ padding: '20px' }}>
              <p style={{ fontSize: 13, color: '#4A6080', lineHeight: 1.7, margin: '0 0 16px' }}>
                Interested in working together? I&apos;m available for the right projects and consulting
                engagements.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="mailto:hello@eastonco.net" className="w2-btn w2-btn-orange">
                  ✉ Email Me
                </a>
                <a
                  href="https://calendly.com/eastonco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w2-btn w2-btn-blue"
                >
                  Schedule a Call
                </a>
                <a
                  href="https://github.com/Eastonco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w2-btn w2-btn-gray"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ───── */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Status */}
          <div className="w2-card">
            <CardHead
              label="● Status"
              right={
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#4ADE80',
                    boxShadow: '0 0 6px #4ADE80',
                  }}
                />
              }
            />
            <div style={{ padding: '14px 16px' }}>
              <div
                style={{ fontSize: 12, color: '#2D3748', fontFamily: 'var(--font-display)', marginBottom: 6 }}
              >
                Open to Freelance
              </div>
              <div style={{ fontSize: 12, color: '#718096', lineHeight: 1.65 }}>
                Available for interesting projects. Let&apos;s build something great.
              </div>
              <div style={{ marginTop: 12 }}>
                <a
                  href="#contact"
                  className="w2-btn w2-btn-orange"
                  style={{ fontSize: 12, padding: '7px 0', display: 'block', textAlign: 'center' }}
                >
                  Contact Now ›
                </a>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="w2-card">
            <CardHead label="◈ Quick Stats" />
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={i % 2 === 0 ? 'row-even' : 'row-odd'}
                style={{
                  padding: '9px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #EAF0F6',
                }}
              >
                <span style={{ fontSize: 12, color: '#4A6080' }}>{s.label}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: BLUE }}>{s.val}</span>
              </div>
            ))}
          </div>

          {/* Tag cloud */}
          <div className="w2-card">
            <CardHead label="◎ Tag Cloud" />
            <div style={{ padding: '12px', display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {TAGS.map(t => (
                <span key={t} className="w2-tag" style={{ cursor: 'pointer' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="w2-card">
            <CardHead label="⇪ Connect" />
            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 7 }}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w2-social"
                  style={{ background: s.bg }}
                >
                  <span>→</span> {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Powered-by badge */}
          <div
            style={{
              background: 'white',
              borderRadius: 10,
              border: '1px solid #C8D4DE',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              padding: '12px 16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 10, color: '#AAA', marginBottom: 3 }}>Powered by</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: BLUE }}>
              Next.js 15 + Vercel
            </div>
            <div style={{ color: '#F59E0B', fontSize: 13, marginTop: 4, letterSpacing: 2 }}>★★★★★</div>
          </div>
        </aside>
      </div>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer
        style={{
          marginTop: 12,
          background: `linear-gradient(to bottom, ${BLUE} 0%, ${DARK} 100%)`,
          borderTop: '3px solid #1A3A60',
          boxShadow: '0 -3px 10px rgba(0,0,0,0.28)',
          padding: '24px 32px',
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <GlossOrb size={30} fontSize={11} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
              Connor Easton
            </span>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>
            © {new Date().getFullYear()} · Built with ♥ and too much coffee
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Home', 'About', 'Portfolio', 'Contact'].map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.48)', textDecoration: 'none' }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
