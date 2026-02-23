'use client';

import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import { useEffect } from 'react';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const dm = DM_Sans({ subsets: ['latin'], variable: '--font-body' });

const GREEN = '#4ADE80';
const VIOLET = '#7B5FEA';
const BLUE = '#4F9EE8';

const SKILLS = [
  { name: 'TypeScript', dot: '#7B5FEA' },
  { name: 'React',      dot: '#4F9EE8' },
  { name: 'Next.js',    dot: '#E0E0E8' },
  { name: 'Kotlin',     dot: '#E87756' },
  { name: 'Node.js',    dot: '#4ADE80' },
  { name: 'Docker',     dot: '#2496ED' },
  { name: 'Figma',      dot: '#E84B9C' },
  { name: 'AI',         dot: '#FFD060' },
];

const SYSTEMS = [
  { name: 'TypeScript',    uptime: '99.9%' },
  { name: 'React / Next',  uptime: '99.8%' },
  { name: 'Node.js',       uptime: '100%'  },
  { name: 'Kotlin',        uptime: '99.5%' },
  { name: 'Docker',        uptime: '99.9%' },
];

const STATS = [
  { val: '5+',   label: 'Years shipping' },
  { val: '20+',  label: 'Projects live' },
  { val: '200+', label: 'Students taught' },
];

const PROJECTS = [
  {
    n: '01',
    title: 'The Big Red Button',
    desc: 'Multiplayer cookie clicker with real-time Supabase. Minimal premise, maximum engagement.',
    href: '/red-button',
    year: '2024',
    tags: ['Supabase', 'React', 'Real-time'],
    glowColor: 'rgba(239,68,68,0.25)',
    gradTop: 'rgba(123,30,30,0.6)',
    gradBot: 'rgba(20,10,10,0.6)',
  },
  {
    n: '02',
    title: 'Dumpster Dive',
    desc: 'Anonymous thought-sharing. No feeds, no engagement loops — just the internet talking.',
    href: '/dumpster-dive',
    year: '2024',
    tags: ['Next.js', 'Anonymous', 'Social'],
    glowColor: 'rgba(79,158,232,0.25)',
    gradTop: 'rgba(20,50,80,0.6)',
    gradBot: 'rgba(10,10,20,0.6)',
  },
];

// Mouse-tracking gradient spotlight on cards
function trackMouse(e: React.MouseEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
  e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
}

export default function FramerTheme() {
  // Scroll-triggered reveal
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const d = parseInt((e.target as HTMLElement).dataset.delay ?? '0');
            setTimeout(() => e.target.classList.add('fr-on'), d);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`${bricolage.variable} ${dm.variable}`}
      style={{ background: '#0A0A0E', color: '#F2F2F5', minHeight: '100vh', fontFamily: 'var(--font-body)', overflowX: 'hidden' }}
    >
      <style>{`
        /* ── Scroll reveal ── */
        [data-reveal] {
          opacity: 0; transform: translateY(22px); filter: blur(3px);
          transition:
            opacity 0.7s cubic-bezier(0.16,1,0.3,1),
            transform 0.7s cubic-bezier(0.16,1,0.3,1),
            filter 0.7s cubic-bezier(0.16,1,0.3,1) !important;
        }
        .fr-on { opacity: 1 !important; transform: none !important; filter: blur(0) !important; }

        /* ── Hero stagger (load-time) ── */
        @keyframes fr-load {
          from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          to   { opacity: 1; transform: none; filter: blur(0); }
        }
        .h0 { animation: fr-load 0.75s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .h1 { animation: fr-load 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .h2 { animation: fr-load 0.75s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .h3 { animation: fr-load 0.75s cubic-bezier(0.16,1,0.3,1) 0.38s both; }
        .h4 { animation: fr-load 0.75s cubic-bezier(0.16,1,0.3,1) 0.52s both; }

        /* ── Glass card ── */
        .fr-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s !important;
        }
        .fr-card:hover {
          border-color: rgba(255,255,255,0.14);
          transform: translateY(-3px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }

        /* ── Mouse-tracking spotlight ── */
        .fr-spot { position: relative; overflow: hidden; }
        .fr-spot::after {
          content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
          background: radial-gradient(480px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.055), transparent 50%);
          opacity: 0; transition: opacity 0.3s !important;
        }
        .fr-spot:hover::after { opacity: 1; }

        /* ── Project card glow ── */
        .fr-proj-glow { transition: box-shadow 0.3s, transform 0.3s !important; }

        /* ── Nav link ── */
        .fr-nav { font-size: 14px; text-decoration: none; color: rgba(242,242,245,0.45); padding: 6px 14px; border-radius: 8px; transition: color 0.15s, background 0.15s !important; }
        .fr-nav:hover { color: #F2F2F5; background: rgba(255,255,255,0.07); }

        /* ── Buttons ── */
        .fr-btn { display: inline-block; padding: 11px 26px; border-radius: 10px; font-family: var(--font-body); font-size: 14px; font-weight: 600; text-decoration: none; cursor: pointer; transition: all 0.18s !important; }
        .fr-btn-white { background: white; color: #0A0A0E; box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 4px 20px rgba(255,255,255,0.08); }
        .fr-btn-white:hover { background: rgba(255,255,255,0.92); transform: translateY(-1px); box-shadow: 0 0 0 1px rgba(255,255,255,0.2), 0 8px 32px rgba(255,255,255,0.14); }
        .fr-btn-ghost { background: rgba(255,255,255,0.06); color: #F2F2F5; border: 1px solid rgba(255,255,255,0.1); }
        .fr-btn-ghost:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.18); transform: translateY(-1px); }

        /* ── Gradient border (CTA card) ── */
        .fr-grad-wrap { position: relative; border-radius: 20px; }
        .fr-grad-wrap::before {
          content: ''; position: absolute; inset: -1px; border-radius: 21px; z-index: 0;
          background: linear-gradient(135deg, ${VIOLET}, ${BLUE}, ${GREEN});
          opacity: 0; transition: opacity 0.4s !important;
        }
        .fr-grad-wrap:hover::before { opacity: 1; }
        .fr-grad-inner { position: relative; z-index: 1; border-radius: 20px; }

        /* ── Green pulse ── */
        @keyframes fr-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.55); } 60% { box-shadow: 0 0 0 8px rgba(74,222,128,0); } }
        .fr-pulse { animation: fr-pulse 2.4s ease-in-out infinite; }

        /* ── Skill chip ── */
        .fr-chip { display: inline-flex; align-items: center; gap: 7px; padding: 7px 15px; border-radius: 99px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); font-size: 13px; font-weight: 500; transition: background 0.18s, border-color 0.18s, transform 0.18s !important; cursor: default; }
        .fr-chip:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.16); transform: translateY(-1px); }

        /* ── Tag ── */
        .fr-tag { font-size: 11px; padding: 3px 10px; border-radius: 99px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: rgba(242,242,245,0.6); font-weight: 500; }

        /* ── System row ── */
        .fr-sys { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.15s !important; border-radius: 6px; padding-left: 4px; padding-right: 4px; }
        .fr-sys:last-child { border-bottom: none; }
        .fr-sys:hover { background: rgba(255,255,255,0.03); }

        /* ── Background mesh ── */
        @keyframes fr-mesh { 0%,100% { transform: scale(1) translate(0,0); } 40% { transform: scale(1.06) translate(-1%,2%); } 70% { transform: scale(0.96) translate(2%,-1%); } }
        .fr-mesh { animation: fr-mesh 22s ease-in-out infinite; }

        /* ── Divider ── */
        .fr-divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 0; }

        /* ── Section label ── */
        .fr-label { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(242,242,245,0.3); }
      `}</style>

      {/* ── GRADIENT MESH BACKGROUND ──────────────────── */}
      <div
        aria-hidden
        style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}
      >
        <div
          className="fr-mesh"
          style={{
            position: 'absolute', inset: '-20%',
            background: `
              radial-gradient(ellipse at 18% 32%, rgba(123,95,234,0.22) 0%, transparent 52%),
              radial-gradient(ellipse at 82% 14%, rgba(79,158,232,0.14) 0%, transparent 44%),
              radial-gradient(ellipse at 55% 82%, rgba(74,222,128,0.09) 0%, transparent 40%)
            `,
          }}
        />
        {/* Subtle grid */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ── NAV ───────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
          zIndex: 100, display: 'flex', alignItems: 'center', gap: 2,
          background: 'rgba(10,10,14,0.75)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, padding: '6px 10px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: '#F2F2F5', padding: '4px 10px', marginRight: 4 }}>CE</span>
        <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)', marginRight: 4 }} />
        {['About', 'Work', 'Contact'].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="fr-nav">{l}</a>
        ))}
        <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)', marginLeft: 4, marginRight: 8 }} />
        {/* Status light */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 8, background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.18)' }}>
          <div className="fr-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: GREEN }}>Available</span>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────── */}
      <section
        style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', textAlign: 'center',
          padding: '100px 32px 80px', position: 'relative', zIndex: 1,
        }}
      >
        {/* Label */}
        <div
          className="h0"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 99,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
            color: 'rgba(242,242,245,0.6)', marginBottom: 40,
            backdropFilter: 'blur(8px)',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: VIOLET, display: 'inline-block' }} />
          SOFTWARE ENGINEER · TEACHER
        </div>

        {/* Name */}
        <h1
          className="h1"
          style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(64px, 11vw, 148px)',
            fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em',
            margin: '0 0 0', color: '#F2F2F5',
          }}
        >
          Connor
        </h1>
        <h1
          className="h2"
          style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(64px, 11vw, 148px)',
            fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em',
            margin: '0 0 48px',
            background: `linear-gradient(135deg, ${VIOLET} 0%, ${BLUE} 50%, rgba(242,242,245,0.8) 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}
        >
          Easton
        </h1>

        {/* Bio */}
        <p
          className="h3"
          style={{
            fontSize: 17, color: 'rgba(242,242,245,0.55)', lineHeight: 1.75,
            maxWidth: 520, margin: '0 0 40px',
          }}
        >
          Building on the web with TypeScript, React, and Kotlin. The craft matters
          more than the framework. Available for the right work.
        </p>

        {/* CTAs */}
        <div className="h4" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <a href="#work" className="fr-btn fr-btn-white">See the work</a>
          <a href="#contact" className="fr-btn fr-btn-ghost">Get in touch ↗</a>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute', bottom: 36,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            opacity: 0.25,
          }}
        >
          <div style={{ width: 1, height: 48, background: 'rgba(242,242,245,0.5)' }} />
          <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}>scroll</span>
        </div>
      </section>

      {/* ── BENTO: ABOUT + STATUS ─────────────────────── */}
      <section
        id="about"
        style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 80px', position: 'relative', zIndex: 1 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>

          {/* Bio card — 2 cols */}
          <div
            data-reveal data-delay="0"
            onMouseMove={trackMouse}
            className="fr-card fr-spot"
            style={{ gridColumn: '1 / 3', padding: '36px 36px' }}
          >
            <span className="fr-label" style={{ display: 'block', marginBottom: 20 }}>01 · About</span>
            <p
              style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.8vw, 30px)',
                fontWeight: 700, color: '#F2F2F5', lineHeight: 1.45, margin: '0 0 20px',
              }}
            >
              Engineer by trade,<br />teacher by choice.
            </p>
            <p style={{ fontSize: 15, color: 'rgba(242,242,245,0.5)', lineHeight: 1.8, margin: 0, maxWidth: 460 }}>
              The craft of making complexity legible never gets old. I&apos;ve built and shipped
              software for years, and spent just as long making it teachable. When I&apos;m not
              at a keyboard, I&apos;m airborne or close to it.
            </p>
          </div>

          {/* System status card — 1 col */}
          <div
            data-reveal data-delay="100"
            onMouseMove={trackMouse}
            className="fr-card fr-spot"
            style={{ padding: '28px 28px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <span className="fr-label">System Status</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div className="fr-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: GREEN }}>Operational</span>
              </div>
            </div>
            {SYSTEMS.map(s => (
              <div key={s.name} className="fr-sys">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, opacity: 0.9 }} />
                  <span style={{ fontSize: 13, color: 'rgba(242,242,245,0.7)' }}>{s.name}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(242,242,245,0.35)', fontFamily: 'monospace' }}>{s.uptime} ↑</span>
              </div>
            ))}
          </div>

          {/* Stats — 3 small cards */}
          {STATS.map((s, i) => (
            <div
              key={s.label}
              data-reveal data-delay={`${(i + 1) * 80}`}
              onMouseMove={trackMouse}
              className="fr-card fr-spot"
              style={{ padding: '24px 28px' }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800,
                  letterSpacing: '-0.03em', lineHeight: 1,
                  background: `linear-gradient(135deg, #F2F2F5, rgba(242,242,245,0.45))`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
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

      {/* ── SKILLS ────────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 80px', position: 'relative', zIndex: 1 }}>
        <span data-reveal className="fr-label" style={{ display: 'block', marginBottom: 20 }}>02 · Skills</span>
        <div data-reveal data-delay="80" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SKILLS.map(s => (
            <span key={s.name} className="fr-chip">
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
              {s.name}
            </span>
          ))}
        </div>
      </section>

      {/* ── WORK ──────────────────────────────────────── */}
      <section
        id="work"
        style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 80px', position: 'relative', zIndex: 1 }}
      >
        <span data-reveal className="fr-label" style={{ display: 'block', marginBottom: 20 }}>03 · Work</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {PROJECTS.map((p, i) => (
            <div
              key={p.n}
              data-reveal data-delay={`${i * 100}`}
              onMouseMove={trackMouse}
              className="fr-card fr-spot fr-proj-glow"
              style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 24px 64px ${p.glowColor}, 0 0 0 1px rgba(255,255,255,0.12)`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
              }}
            >
              {/* Preview area */}
              <div
                style={{
                  height: 200,
                  background: `linear-gradient(160deg, ${p.gradTop}, ${p.gradBot})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Subtle noise overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }} />
                <span
                  style={{
                    fontFamily: 'var(--font-display)', fontSize: 60, fontWeight: 800,
                    color: 'rgba(255,255,255,0.08)', letterSpacing: '-0.04em', userSelect: 'none',
                  }}
                >
                  {p.n}
                </span>
              </div>
              {/* Content */}
              <div style={{ padding: '28px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700,
                      color: '#F2F2F5', margin: 0, letterSpacing: '-0.02em',
                    }}
                  >
                    {p.title}
                  </h3>
                  <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(242,242,245,0.3)', marginTop: 4 }}>{p.year}</span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(242,242,245,0.5)', lineHeight: 1.7, margin: '0 0 20px' }}>{p.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {p.tags.map(t => <span key={t} className="fr-tag">{t}</span>)}
                  </div>
                  <a
                    href={p.href}
                    style={{ fontSize: 13, fontWeight: 600, color: 'rgba(242,242,245,0.5)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = '#F2F2F5')}
                    onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = 'rgba(242,242,245,0.5)')}
                  >
                    View →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────── */}
      <section
        id="contact"
        style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 100px', position: 'relative', zIndex: 1 }}
      >
        <span data-reveal className="fr-label" style={{ display: 'block', marginBottom: 20 }}>04 · Contact</span>

        <div data-reveal data-delay="80" className="fr-grad-wrap">
          <div
            onMouseMove={trackMouse}
            className="fr-card fr-spot fr-grad-inner"
            style={{ padding: '64px 60px', textAlign: 'center' }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 76px)',
                fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95,
                color: '#F2F2F5', margin: '0 0 24px',
              }}
            >
              Let&apos;s build<br />something great.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(242,242,245,0.45)', margin: '0 auto 40px', maxWidth: 400, lineHeight: 1.7 }}>
              Available for product work, consulting, and the right freelance engagements.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:hello@eastonco.net" className="fr-btn fr-btn-white">
                hello@eastonco.net
              </a>
              <a href="https://calendly.com/eastonco" target="_blank" rel="noopener noreferrer" className="fr-btn fr-btn-ghost">
                Calendly ↗
              </a>
              <a href="https://github.com/Eastonco" target="_blank" rel="noopener noreferrer" className="fr-btn fr-btn-ghost">
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '28px 32px',
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'relative', zIndex: 1,
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'rgba(242,242,245,0.5)' }}>CE</span>
        <span style={{ fontSize: 12, color: 'rgba(242,242,245,0.2)', letterSpacing: '0.06em' }}>
          © {new Date().getFullYear()} Connor Easton
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div className="fr-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN }} />
          <span style={{ fontSize: 12, color: 'rgba(74,222,128,0.7)', fontWeight: 600 }}>All systems operational</span>
        </div>
      </footer>
    </div>
  );
}
