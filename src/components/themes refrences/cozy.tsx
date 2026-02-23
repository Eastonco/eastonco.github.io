'use client';

import { Nunito, Caveat } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-body' });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-accent' });

const SKILLS = [
  { name: 'TypeScript', bg: '#E2D9F8', dot: '#8B6BC8', label: 'daily driver' },
  { name: 'React',      bg: '#C8DEF5', dot: '#4A86C0', label: 'component brain' },
  { name: 'Next.js',    bg: '#E0E0E8', dot: '#555',    label: 'full-stack' },
  { name: 'Kotlin',     bg: '#F7DECE', dot: '#C06040', label: 'android side' },
  { name: 'Node.js',    bg: '#C6EAD8', dot: '#3A8C60', label: 'backend' },
  { name: 'Docker',     bg: '#C8DEF5', dot: '#2088D0', label: 'ship it' },
  { name: 'Figma',      bg: '#F5D4E0', dot: '#C03070', label: 'design eye' },
  { name: 'AI',         bg: '#FBF0B8', dot: '#B88020', label: 'experimenting' },
];

const PROJECTS = [
  {
    title: 'The Big Red Button',
    desc: 'Multiplayer cookie clicker powered by real-time Supabase. Minimal premise, maximum chaos.',
    href: '/red-button',
    accent: '#F5D4E0',
    border: '#E8A8C0',
    emoji: '🔴',
    year: '2024',
  },
  {
    title: 'Dumpster Dive',
    desc: 'Anonymous thought-sharing with no feeds, no engagement loops — just the raw internet talking.',
    href: '/dumpster-dive',
    accent: '#C6EAD8',
    border: '#90CCA8',
    emoji: '🌿',
    year: '2024',
  },
];

export default function CozyTheme() {
  return (
    <div
      className={`${nunito.variable} ${caveat.variable}`}
      style={{ background: '#FDF8F2', minHeight: '100vh', fontFamily: 'var(--font-body)', position: 'relative', overflowX: 'hidden' }}
    >
      <style>{`
        /* ── Blobs ── */
        .cz-blob {
          position: fixed; border-radius: 60% 40% 70% 30% / 40% 60% 30% 70%;
          filter: blur(60px); pointer-events: none; z-index: 0;
          animation: cz-morph 18s ease-in-out infinite;
        }
        .cz-blob-1 { width: 480px; height: 480px; top: -120px; right: -80px; background: #E2D9F8; opacity: 0.55; animation-delay: 0s; }
        .cz-blob-2 { width: 420px; height: 420px; bottom: -100px; left: -80px; background: #F7DECE; opacity: 0.5; animation-delay: -6s; }
        .cz-blob-3 { width: 340px; height: 340px; top: 40%; left: -60px; background: #C6EAD8; opacity: 0.4; animation-delay: -12s; }
        @keyframes cz-morph {
          0%,100% { border-radius: 60% 40% 70% 30% / 40% 60% 30% 70%; }
          33%      { border-radius: 40% 60% 30% 70% / 60% 40% 70% 30%; }
          66%      { border-radius: 70% 30% 55% 45% / 30% 70% 45% 55%; }
        }

        /* ── Nav ── */
        .cz-nav-link {
          font-family: var(--font-body); font-size: 14px; font-weight: 600; text-decoration: none;
          color: #7A5C4A; padding: 8px 20px; border-radius: 99px;
          transition: background 0.2s, color 0.2s !important;
        }
        .cz-nav-link:hover { background: rgba(180,140,110,0.12); color: #3D2B1F; }

        /* ── Skill chip ── */
        .cz-chip {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 16px; border-radius: 99px;
          font-size: 14px; font-weight: 600; color: #3D2B1F;
          box-shadow: 0 2px 10px rgba(100,60,30,0.08);
          transition: transform 0.2s, box-shadow 0.2s !important; cursor: default;
        }
        .cz-chip:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(100,60,30,0.14); }
        .cz-chip-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .cz-chip-label { font-size: 11px; font-weight: 400; opacity: 0.65; }

        /* ── Project card ── */
        .cz-card {
          border-radius: 24px; border-width: 2px; border-style: solid;
          padding: 28px 30px; display: flex; gap: 20px; align-items: flex-start;
          box-shadow: 0 4px 24px rgba(100,60,30,0.07);
          transition: transform 0.22s, box-shadow 0.22s !important;
        }
        .cz-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(100,60,30,0.13); }

        /* ── CTA buttons ── */
        .cz-btn {
          display: inline-block; padding: 12px 28px; border-radius: 99px;
          font-family: var(--font-body); font-size: 14px; font-weight: 700;
          text-decoration: none; transition: transform 0.18s, box-shadow 0.18s !important;
        }
        .cz-btn:hover { transform: translateY(-2px); }
        .cz-btn-warm {
          background: #E8A878; color: white;
          box-shadow: 0 4px 16px rgba(200,120,60,0.35);
        }
        .cz-btn-warm:hover { box-shadow: 0 8px 24px rgba(200,120,60,0.45); }
        .cz-btn-ghost {
          background: white; color: #7A5C4A;
          box-shadow: 0 2px 12px rgba(100,60,30,0.12);
          border: 2px solid rgba(180,140,110,0.25);
        }
        .cz-btn-ghost:hover { box-shadow: 0 6px 20px rgba(100,60,30,0.18); }

        /* ── Section heading ── */
        .cz-section-title {
          font-family: var(--font-accent); font-size: 32px; font-weight: 700;
          color: #3D2B1F; margin: 0 0 28px; letter-spacing: 0.01em;
        }

        /* ── Contact item ── */
        .cz-contact-link {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 22px; border-radius: 18px; background: white;
          box-shadow: 0 2px 14px rgba(100,60,30,0.08);
          text-decoration: none; color: #3D2B1F; font-weight: 600; font-size: 14px;
          border: 2px solid transparent;
          transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s !important;
        }
        .cz-contact-link:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(100,60,30,0.14); border-color: rgba(180,140,110,0.3); }

        /* ── Dot grid background ── */
        .cz-root::before {
          content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(rgba(140,100,70,0.09) 1.2px, transparent 1.2px);
          background-size: 28px 28px;
        }

        /* ── Float animation ── */
        @keyframes cz-float { 0%,100% { transform: translateY(0px) rotate(-4deg); } 50% { transform: translateY(-10px) rotate(4deg); } }
        .cz-float { animation: cz-float 5s ease-in-out infinite; }
        @keyframes cz-float-b { 0%,100% { transform: translateY(0px) rotate(6deg); } 50% { transform: translateY(-8px) rotate(-2deg); } }
        .cz-float-b { animation: cz-float-b 7s ease-in-out infinite; }

        /* ── Sparkle dots ── */
        @keyframes cz-twinkle { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(0.6); } }
      `}</style>

      {/* Background atmosphere */}
      <div className="cz-root" />
      <div className="cz-blob cz-blob-1" />
      <div className="cz-blob cz-blob-2" />
      <div className="cz-blob cz-blob-3" />

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', justifyContent: 'center', padding: '14px 0',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            display: 'flex', gap: 4, alignItems: 'center',
            background: 'rgba(255,248,242,0.85)',
            border: '2px solid rgba(180,140,110,0.18)',
            borderRadius: 99, padding: '4px 8px',
            boxShadow: '0 4px 24px rgba(100,60,30,0.1)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-accent)', fontSize: 20, color: '#C8906A', padding: '0 10px' }}>ce</span>
          <div style={{ width: 1, height: 20, background: 'rgba(180,140,110,0.2)' }} />
          {['about', 'work', 'contact'].map(l => (
            <a key={l} href={`#${l}`} className="cz-nav-link">{l}</a>
          ))}
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section
        style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', textAlign: 'center',
          padding: '80px 32px 64px', position: 'relative', zIndex: 1,
        }}
      >
        {/* Floating decorations */}
        <div className="cz-float" style={{ position: 'absolute', top: '18%', left: '8%', fontSize: 28, userSelect: 'none', opacity: 0.7 }}>✦</div>
        <div className="cz-float-b" style={{ position: 'absolute', top: '28%', right: '10%', fontSize: 22, userSelect: 'none', opacity: 0.6 }}>◌</div>
        <div className="cz-float" style={{ position: 'absolute', bottom: '22%', left: '12%', fontSize: 18, userSelect: 'none', opacity: 0.5, animationDelay: '1.5s' }}>♡</div>
        <div className="cz-float-b" style={{ position: 'absolute', bottom: '30%', right: '8%', fontSize: 24, userSelect: 'none', opacity: 0.55, animationDelay: '3s' }}>☁</div>

        {/* Greeting */}
        <div
          style={{
            fontFamily: 'var(--font-accent)', fontSize: 24, color: '#B09080', marginBottom: 12,
          }}
        >
          hi there, i&apos;m
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(52px, 9vw, 108px)',
            fontWeight: 800, color: '#3D2B1F', margin: '0 0 6px',
            lineHeight: 0.95, letterSpacing: '-0.03em',
          }}
        >
          Connor
        </h1>
        <h1
          style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(52px, 9vw, 108px)',
            fontWeight: 800, margin: '0 0 28px', lineHeight: 0.95,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #D06898 0%, #C8906A 50%, #9B72C8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Easton
        </h1>

        {/* Pill subtitle */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
          {['Software Engineer', 'Teacher', 'Builder'].map((t, i) => (
            <span
              key={t}
              style={{
                padding: '6px 18px', borderRadius: 99,
                background: [' #E2D9F8', '#F7DECE', '#C6EAD8'][i],
                fontSize: 13, fontWeight: 700, color: '#3D2B1F',
                boxShadow: '0 2px 10px rgba(100,60,30,0.08)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <p
          style={{
            fontSize: 17, color: '#8A6A58', lineHeight: 1.75,
            maxWidth: 480, margin: '0 0 40px',
          }}
        >
          Building on the web with TypeScript, React, and Kotlin.
          The craft matters more than the framework.
          Available for the right work.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <a href="#work" className="cz-btn cz-btn-warm">see my work ✦</a>
          <a href="#contact" className="cz-btn cz-btn-ghost">say hello ☁</a>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────── */}
      <section
        id="about"
        style={{
          maxWidth: 680, margin: '0 auto', padding: '80px 32px',
          position: 'relative', zIndex: 1,
        }}
      >
        <div
          style={{
            background: 'white', borderRadius: 28,
            padding: '40px 44px',
            boxShadow: '0 6px 32px rgba(100,60,30,0.08)',
            border: '2px solid rgba(180,140,110,0.14)',
            position: 'relative',
          }}
        >
          {/* Corner deco */}
          <div style={{ position: 'absolute', top: 20, right: 24, fontFamily: 'var(--font-accent)', fontSize: 40, color: '#E2D9F8', userSelect: 'none' }}>✦</div>

          <h2 className="cz-section-title">a little about me</h2>

          <p style={{ fontSize: 17, color: '#6A5040', lineHeight: 1.9, margin: '0 0 20px' }}>
            <span style={{ fontFamily: 'var(--font-accent)', fontSize: 56, color: '#E8A878', float: 'left', lineHeight: 0.8, marginRight: 8, marginTop: 8 }}>E</span>
            ngineer by trade, teacher by choice. I&apos;ve built and shipped software for years, and
            spent just as long making it teachable. The craft of making complexity legible never gets old.
          </p>

          <p style={{ fontSize: 15, color: '#8A6A58', lineHeight: 1.85, margin: 0 }}>
            When I&apos;m not at a keyboard, I&apos;m airborne or close to it. I care about clean
            abstractions, thoughtful UX, and systems that don&apos;t page you at 3am.
          </p>
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 680, margin: '0 auto', padding: '0 32px 80px',
          position: 'relative', zIndex: 1,
        }}
      >
        <h2 className="cz-section-title" style={{ textAlign: 'center' }}>things i know ◌</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {SKILLS.map(s => (
            <span key={s.name} className="cz-chip" style={{ background: s.bg }}>
              <span className="cz-chip-dot" style={{ background: s.dot }} />
              {s.name}
              <span className="cz-chip-label">{s.label}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── WORK ────────────────────────────────────────── */}
      <section
        id="work"
        style={{
          maxWidth: 680, margin: '0 auto', padding: '0 32px 80px',
          position: 'relative', zIndex: 1,
        }}
      >
        <h2 className="cz-section-title">things i&apos;ve made ♡</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {PROJECTS.map(p => (
            <div
              key={p.title}
              className="cz-card"
              style={{ background: p.accent, borderColor: p.border }}
            >
              <div style={{ fontSize: 44, flexShrink: 0, lineHeight: 1 }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)', fontSize: 20, fontWeight: 800,
                      color: '#3D2B1F', margin: 0,
                    }}
                  >
                    {p.title}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-accent)', fontSize: 16, color: '#8A6A58' }}>{p.year}</span>
                </div>
                <p style={{ fontSize: 14, color: '#6A5040', lineHeight: 1.7, margin: '0 0 16px' }}>{p.desc}</p>
                <a
                  href={p.href}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
                    color: '#3D2B1F', textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    borderBottom: `2px solid rgba(60,40,20,0.2)`, paddingBottom: 1,
                  }}
                >
                  take a look →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          maxWidth: 680, margin: '0 auto', padding: '0 32px 100px',
          position: 'relative', zIndex: 1,
        }}
      >
        <div
          style={{
            background: '#FBF0B8', borderRadius: 28, padding: '40px 44px',
            boxShadow: '0 6px 32px rgba(160,120,40,0.1)',
            border: '2px solid rgba(200,170,80,0.3)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontFamily: 'var(--font-accent)', fontSize: 52, marginBottom: 12 }}>☁</div>
          <h2 className="cz-section-title" style={{ margin: '0 0 14px' }}>let&apos;s chat!</h2>
          <p style={{ fontSize: 15, color: '#8A7040', lineHeight: 1.8, margin: '0 0 32px', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
            I&apos;m always happy to hear from interesting people. Whether it&apos;s a project,
            a question, or just a hello — my inbox is open.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360, margin: '0 auto' }}>
            <a href="mailto:hello@eastonco.net" className="cz-contact-link">
              <span style={{ fontSize: 20 }}>✉</span>
              hello@eastonco.net
            </a>
            <a href="https://calendly.com/eastonco" target="_blank" rel="noopener noreferrer" className="cz-contact-link">
              <span style={{ fontSize: 20 }}>📅</span>
              schedule a call on Calendly
            </a>
            <a href="https://github.com/Eastonco" target="_blank" rel="noopener noreferrer" className="cz-contact-link">
              <span style={{ fontSize: 20 }}>🐙</span>
              github.com/Eastonco
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer
        style={{
          borderTop: '2px solid rgba(180,140,110,0.12)',
          padding: '28px 32px',
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10,
          position: 'relative', zIndex: 1,
        }}
      >
        <span style={{ fontFamily: 'var(--font-accent)', fontSize: 20, color: '#C8906A' }}>
          made with ♡
        </span>
        <span style={{ color: 'rgba(140,100,70,0.3)' }}>·</span>
        <span style={{ fontSize: 13, color: '#B09080', fontWeight: 600 }}>
          © {new Date().getFullYear()} Connor Easton
        </span>
      </footer>
    </div>
  );
}
