'use client';

import { Press_Start_2P, VT323 } from 'next/font/google';
import { useState, useEffect } from 'react';

const pressStart = Press_Start_2P({ subsets: ['latin'], weight: '400', variable: '--font-pixel' });
const vt323 = VT323({ subsets: ['latin'], weight: '400', variable: '--font-vt' });

const VISITOR_COUNT = 847392;

const SKILLS = [
  { name: 'TypeScript', pct: 95, color: '#00FFFF' },
  { name: 'React / Next.js', pct: 92, color: '#FF69B4' },
  { name: 'Kotlin', pct: 78, color: '#00FF00' },
  { name: 'Node.js', pct: 75, color: '#FFFF00' },
  { name: 'Docker', pct: 70, color: '#FF7700' },
  { name: 'AI / LLMs', pct: 65, color: '#FF00FF' },
];

const PROJECTS = [
  { title: 'The Big Red Button', desc: 'cookie clicker... with friends!!', status: '🟢 ONLINE', href: '/red-button' },
  { title: 'Dumpster Dive', desc: 'dump ur thoughts on the internet', status: '🟢 ONLINE', href: '/dumpster-dive' },
  { title: '????.exe', desc: 'coming soon!!!', status: '🚧 UNDER CONSTRUCTION', href: null },
];

const COOL_LINKS = ['» CoolSites.net', '» AddictingGames.com', '» Homestar Runner', '» eBaum\'s World', '» Newgrounds.com'];

const BADGES = [
  { text: 'NETSCAPE NOW!', bg: '#003399', fg: '#FFFFFF' },
  { text: 'MADE WITH NOTEPAD', bg: '#C0C0C0', fg: '#000000' },
  { text: 'NO FRAMES!', bg: '#CC0000', fg: '#FFFFFF' },
  { text: 'IE6 READY ✓', bg: '#000080', fg: '#FFFFFF' },
  { text: 'UNDER 18? CLICK HERE', bg: '#FF6600', fg: '#FFFFFF' },
  { text: 'BEST @ 800x600', bg: '#006600', fg: '#FFFFFF' },
];

export default function RetroTheme() {
  const [blink, setBlink] = useState(true);
  const [starShadow, setStarShadow] = useState('');
  const [starShadow2, setStarShadow2] = useState('');

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 550);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const rand = (n: number) => Math.floor(Math.random() * n);
    const makeStars = (count: number, colors: string[]) =>
      Array.from({ length: count }, () =>
        `${rand(3000)}px ${rand(3000)}px ${colors[rand(colors.length)]}`
      ).join(', ');
    setStarShadow(makeStars(600, ['#ffffff', '#ffffff', '#ffffff', '#ffff99', '#aaaaff']));
    setStarShadow2(makeStars(150, ['#ffff00', '#ff00ff', '#00ffff', '#ff6600']));
  }, []);

  return (
    <div
      className={`${pressStart.variable} ${vt323.variable}`}
      style={{ background: '#000000', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}
    >
      <style>{`
        @keyframes rainbow-cycle {
          0%   { color: #FF0000; }
          14%  { color: #FF7700; }
          28%  { color: #FFFF00; }
          42%  { color: #00FF00; }
          57%  { color: #00FFFF; }
          71%  { color: #0000FF; }
          85%  { color: #FF00FF; }
          100% { color: #FF0000; }
        }
        @keyframes neon-glow {
          0%, 100% { text-shadow: 0 0 6px #FF00FF, 0 0 14px #FF00FF, 0 0 28px #FF00FF; }
          50%       { text-shadow: 0 0 12px #FF00FF, 0 0 30px #FF00FF, 0 0 60px #FF00FF, 0 0 80px #FF00FF; }
        }
        @keyframes cyan-glow {
          0%, 100% { text-shadow: 0 0 6px #00FFFF, 0 0 14px #00FFFF; }
          50%       { text-shadow: 0 0 14px #00FFFF, 0 0 30px #00FFFF, 0 0 50px #00FFFF; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes marquee-scroll {
          from { transform: translateX(100vw); }
          to   { transform: translateX(-150%); }
        }
        @keyframes pulse-border {
          0%   { border-color: #FF0000; box-shadow: 0 0 6px #FF0000; }
          33%  { border-color: #00FF00; box-shadow: 0 0 6px #00FF00; }
          66%  { border-color: #0000FF; box-shadow: 0 0 6px #0000FF; }
          100% { border-color: #FF0000; box-shadow: 0 0 6px #FF0000; }
        }
        @keyframes star-drift {
          from { transform: translateY(0); }
          to   { transform: translateY(-3000px); }
        }
        @keyframes star-drift-slow {
          from { transform: translateY(0); }
          to   { transform: translateY(-3000px); }
        }
        @keyframes shimmer-bar {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes type-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        .rainbow    { animation: rainbow-cycle 2s linear infinite !important; }
        .neon-pink  { animation: neon-glow 2s ease-in-out infinite !important; }
        .neon-cyan  { animation: cyan-glow 2s ease-in-out infinite !important; }
        .spin-anim  { display: inline-block; animation: spin 4s linear infinite !important; }
        .spin-fast  { display: inline-block; animation: spin 1.5s linear infinite !important; }
        .bounce-anim { display: inline-block; animation: bounce 0.8s ease-in-out infinite !important; }

        .win98-window {
          background: #C0C0C0;
          border: 2px solid;
          border-color: #FFFFFF #808080 #808080 #FFFFFF;
          box-shadow: 2px 2px 0 #000;
        }
        .win98-titlebar {
          background: linear-gradient(90deg, #000080 0%, #1084D0 100%);
          padding: 3px 6px;
          display: flex; align-items: center; justify-content: space-between;
          font-family: var(--font-vt); font-size: 18px; color: #FFFFFF;
          user-select: none;
        }
        .win98-x {
          background: #C0C0C0;
          border: 2px solid; border-color: #FFFFFF #808080 #808080 #FFFFFF;
          width: 18px; height: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; color: #000; cursor: pointer; font-family: Arial;
          font-weight: bold;
        }
        .win98-btn {
          background: #C0C0C0;
          border: 2px solid; border-color: #FFFFFF #808080 #808080 #FFFFFF;
          padding: 4px 10px;
          font-family: var(--font-vt); font-size: 20px; color: #000;
          text-decoration: none; cursor: pointer; display: inline-block;
          transition: none !important;
        }
        .win98-btn:hover { background: #D4D4D4; }
        .win98-btn:active { border-color: #808080 #FFFFFF #FFFFFF #808080; }

        .neon-box {
          border: 2px solid #FF00FF;
          animation: pulse-border 3s ease infinite !important;
          padding: 10px;
        }
        .lcd {
          font-family: var(--font-vt); font-size: 26px;
          background: #001100; color: #00FF00;
          padding: 4px 10px;
          border: 3px inset #004400;
          letter-spacing: 0.08em;
          display: inline-block;
        }
        .retro-link { color: #00FFFF; text-decoration: underline; transition: none !important; }
        .retro-link:hover { color: #FFFF00; background: #AA0000; }

        .progress-track {
          background: #000;
          border: 1px inset #606060;
          height: 18px;
          position: relative;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: repeating-linear-gradient(
            90deg,
            currentColor 0px, currentColor 8px,
            rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 10px
          );
          background-size: 200% 100%;
          animation: shimmer-bar 1.5s linear infinite !important;
        }
        .progress-pct {
          position: absolute; right: 4px; top: 1px;
          font-family: var(--font-vt); font-size: 14px; color: #FFF;
          line-height: 16px;
        }

        .nav-btn {
          font-family: var(--font-vt); font-size: 22px;
          color: #FFFF00; text-decoration: none;
          background: #000080;
          border: 3px solid;
          border-color: #8888FF #000044 #000044 #8888FF;
          padding: 4px 14px;
          display: inline-block;
          white-space: nowrap;
          transition: none !important;
        }
        .nav-btn:hover { background: #0000CC; color: #FFFFFF; }

        .star-layer {
          position: fixed; top: 0; left: 0;
          width: 1px; height: 1px;
          border-radius: 50%;
          z-index: 0;
        }

        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* Starfield layers */}
      <div className="star-layer" style={{ boxShadow: starShadow, animation: 'star-drift 80s linear infinite', background: '#FFF' }} />
      <div className="star-layer" style={{ boxShadow: starShadow2, animation: 'star-drift-slow 40s linear infinite', background: '#FF0', width: 2, height: 2 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── MARQUEE TICKER ── */}
        <div style={{ background: '#000080', borderBottom: '3px solid #FFFF00', height: 30, overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', whiteSpace: 'nowrap', animation: 'marquee-scroll 18s linear infinite', paddingTop: 4, fontFamily: 'var(--font-vt)', fontSize: 22, color: '#FFFF00' }}>
            ⭐ WELCOME TO CONNOR&apos;S HOMEPAGE!! ⭐ BEST VIEWED IN INTERNET EXPLORER 6 AT 800x600 ⭐ SIGN MY GUESTBOOK!! ⭐ YOU ARE VISITOR #{VISITOR_COUNT.toLocaleString()} ⭐ NO HOTLINKING!! ⭐ ADD ME ON AIM: easton_co_2001 ⭐ I UPDATED THE SITE!! CHECK IT OUT!! ⭐
          </div>
        </div>

        {/* ── HEADER ── */}
        <div style={{ textAlign: 'center', padding: '18px 16px 12px', background: 'linear-gradient(180deg, #000033 0%, #000000 100%)', borderBottom: '4px solid #FF00FF' }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>
            <span className="spin-anim" style={{ color: '#FF00FF' }}>✦</span>
            <span className="bounce-anim" style={{ color: '#FFFF00', margin: '0 16px', fontSize: 22 }}>🔥</span>
            <span className="spin-anim" style={{ color: '#00FFFF', animationDirection: 'reverse' }}>✦</span>
            <span className="bounce-anim" style={{ color: '#FF69B4', margin: '0 16px', fontSize: 22, animationDelay: '-0.3s' }}>🔥</span>
            <span className="spin-anim" style={{ color: '#FFFF00' }}>✦</span>
          </div>

          <h1
            className="neon-pink"
            style={{ fontFamily: 'var(--font-pixel)', fontSize: 'clamp(12px, 2.8vw, 26px)', margin: '0 0 10px', letterSpacing: '0.08em', animation: 'neon-glow 2s ease-in-out infinite, rainbow-cycle 4s linear infinite' }}
          >
            CONNOR EASTON
          </h1>

          <div
            style={{ fontFamily: 'var(--font-vt)', fontSize: 22, color: '#FF69B4', marginBottom: 8, opacity: blink ? 1 : 0, transition: 'none' }}
          >
            ★·.·´¯`·.·★ SOFTWARE ENGINEER · TEACHER · PLANE GUY ★·.·´¯`·.·★
          </div>

          <div style={{ fontFamily: 'var(--font-vt)', fontSize: 20, color: '#00FFFF', marginBottom: 6 }}>
            ~ WELCOME TO MY HOMEPAGE!! U FOUND IT :D ~
          </div>

          <div style={{ fontFamily: 'var(--font-vt)', fontSize: 18, color: '#888', marginBottom: 10 }}>
            visitors: <span className="lcd">{VISITOR_COUNT.toLocaleString()}</span>
          </div>

          {/* Divider of spinning stars */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, fontSize: 16, marginTop: 8 }}>
            {Array.from({ length: 11 }, (_, i) => (
              <span key={i} className="spin-anim" style={{ color: ['#FF0000','#FF7700','#FFFF00','#00FF00','#00FFFF','#0000FF','#FF00FF'][i % 7], animationDelay: `${-i * 0.3}s`, animationDuration: `${2 + (i % 3)}s` }}>★</span>
            ))}
          </div>
        </div>

        {/* ── NAVIGATION ── */}
        <div style={{ background: '#000066', padding: '10px 16px', display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', borderBottom: '3px solid #FFFF00' }}>
          {['[ HOME ]', '[ ABOUT ME ]', '[ MY PROJECTS ]', '[ SKILLS ]', '[ GUESTBOOK ]', '[ EMAIL ME!! ]'].map(label => (
            <a key={label} href="#" className="nav-btn">{label}</a>
          ))}
        </div>

        {/* ── THREE-COLUMN BODY ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '190px 1fr 190px' }}>

          {/* LEFT SIDEBAR */}
          <div style={{ background: 'rgba(0,0,60,0.8)', borderRight: '3px solid #FF00FF', padding: 10 }}>

            {/* AIM Status */}
            <div style={{ background: '#F0F0FF', border: '2px inset #888', padding: 8, marginBottom: 10 }}>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 17, color: '#000080', marginBottom: 4, fontWeight: 'bold' }}>🟡 AIM Status</div>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 16, color: '#000' }}>easton_co_2001</div>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 15, color: '#008000' }}>● away: coding stuff</div>
            </div>

            {/* Cool Links */}
            <div style={{ background: '#000033', border: '2px outset #0000AA', padding: 8, marginBottom: 10 }}>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 20, color: '#FFFF00', textAlign: 'center', marginBottom: 8 }}>
                <span className="spin-fast" style={{ marginRight: 4 }}>⚡</span> LINKS
              </div>
              {COOL_LINKS.map(l => (
                <div key={l} style={{ fontFamily: 'var(--font-vt)', fontSize: 16, marginBottom: 4 }}>
                  <a href="#" className="retro-link">{l}</a>
                </div>
              ))}
            </div>

            {/* Web ring */}
            <div style={{ background: '#001A00', border: '2px solid #00FF00', padding: 8, marginBottom: 10 }}>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 16, color: '#00FF00', textAlign: 'center', marginBottom: 6 }}>[ WEB RING ]</div>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 15, color: '#00FF00', marginBottom: 4, textAlign: 'center' }}>Nerd Ring #42</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <a href="#" style={{ color: '#00FF00', textDecoration: 'none', fontFamily: 'var(--font-vt)', fontSize: 16 }}>◄ PREV</a>
                <a href="#" style={{ color: '#00FF00', textDecoration: 'none', fontFamily: 'var(--font-vt)', fontSize: 16 }}>NEXT ►</a>
              </div>
            </div>

            {/* 88x31 badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 10 }}>
              {BADGES.map(b => (
                <div key={b.text} style={{ width: 88, height: 31, background: b.bg, color: b.fg, fontFamily: 'var(--font-vt)', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: '1px solid #444', cursor: 'pointer', lineHeight: 1.2, padding: '0 4px' }}>
                  {b.text}
                </div>
              ))}
            </div>

            {/* Free hit counter badge */}
            <div style={{ background: '#111', border: '1px solid #555', padding: 6, textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 13, color: '#888', marginBottom: 2 }}>free counter from:</div>
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: '#FFFF00' }}>STATCOUNTER.COM</div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div style={{ padding: '14px 18px', borderRight: '3px solid #FF00FF' }}>

            {/* WELCOME BOX */}
            <div className="neon-box" style={{ marginBottom: 16, background: 'rgba(0,0,30,0.9)' }}>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 26, color: '#FF69B4', marginBottom: 8, textShadow: '2px 2px 0 #000' }}>
                👋 OMG YOU&apos;RE HERE!!
              </div>
              <p style={{ fontFamily: 'var(--font-vt)', fontSize: 19, color: '#00FF00', lineHeight: 1.65, margin: '0 0 8px' }}>
                HEY!! welcome 2 my homepage lol. i make websites &amp; software stuff &amp; i also teach
                programming &amp; sometimes fly planes. idk how u found this but ur here now!! 😂
              </p>
              <p style={{ fontFamily: 'var(--font-vt)', fontSize: 19, color: '#FFFF00', lineHeight: 1.65, margin: 0 }}>
                pls sign my guestbook!! &amp; dont steal my html!! i worked hard on it ok ✋
              </p>
              <div style={{ marginTop: 10, fontFamily: 'var(--font-vt)', fontSize: 16, color: '#888' }}>
                <span style={{ color: '#FF69B4' }}>last updated:</span> feb 22, 2004 &nbsp;|&nbsp; <span style={{ color: '#00FFFF' }}>new: added more fire gifs!!</span>
              </div>
            </div>

            {/* SKILLS — win98 window */}
            <div className="win98-window" style={{ marginBottom: 16 }}>
              <div className="win98-titlebar">
                <span>📊 skills.exe — Skill Analyzer v2.0</span>
                <div style={{ display: 'flex', gap: 2 }}>
                  <div className="win98-x">_</div>
                  <div className="win98-x">□</div>
                  <div className="win98-x">✕</div>
                </div>
              </div>
              <div style={{ padding: '10px', background: '#C0C0C0' }}>
                {SKILLS.map(s => (
                  <div key={s.name} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontFamily: 'var(--font-vt)', fontSize: 18, color: s.color }}>{s.name}</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${s.pct}%`, color: s.color }} />
                      <span className="progress-pct">{s.pct}%</span>
                    </div>
                  </div>
                ))}
                <div style={{ fontFamily: 'var(--font-vt)', fontSize: 15, color: '#444', marginTop: 6 }}>
                  ✓ Scan complete. No viruses found.
                </div>
              </div>
            </div>

            {/* PROJECTS */}
            <div style={{ fontFamily: 'var(--font-vt)', fontSize: 28, color: '#FFFF00', marginBottom: 10, textShadow: '2px 2px 0 #FF0000', textAlign: 'center' }}>
              ★ MY PROJECTS ★
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
              {PROJECTS.map(p => (
                <div key={p.title} className="win98-window">
                  <div className="win98-titlebar">
                    <span style={{ fontSize: 15 }}>{p.title}</span>
                    <div className="win98-x">✕</div>
                  </div>
                  <div style={{ padding: 8, background: '#FFFFFF', fontFamily: 'var(--font-vt)', fontSize: 16 }}>
                    <div style={{ color: '#000080', marginBottom: 6, lineHeight: 1.4 }}>{p.desc}</div>
                    <div style={{ marginBottom: 8 }}>{p.status}</div>
                    {p.href ? (
                      <a href={p.href} className="win98-btn" style={{ fontSize: 16, display: 'block', textAlign: 'center' }}>
                        OPEN →
                      </a>
                    ) : (
                      <div style={{ textAlign: 'center', color: '#CC6600', fontSize: 17 }}>
                        <span className="bounce-anim">🚧</span> SOON
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* IE ERROR popup for fun */}
            <div className="win98-window" style={{ maxWidth: 380, margin: '0 auto 16px' }}>
              <div className="win98-titlebar" style={{ background: 'linear-gradient(90deg, #808080, #C0C0C0)' }}>
                <span>⚠ Important Message</span>
                <div className="win98-x">✕</div>
              </div>
              <div style={{ padding: 12, background: '#C0C0C0', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ fontSize: 32 }}>⚠️</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-vt)', fontSize: 18, color: '#000', lineHeight: 1.5 }}>
                    Your computer has been infected with 1337 h4x. Please download our free toolbar to fix this.
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <a href="#" className="win98-btn" style={{ fontSize: 17 }}>OK</a>
                    <a href="#" className="win98-btn" style={{ fontSize: 17 }}>OK</a>
                    <a href="#" className="win98-btn" style={{ fontSize: 17 }}>Cancel</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal star divider */}
            <div style={{ display: 'flex', gap: 0, justifyContent: 'center', alignItems: 'center', margin: '8px 0' }}>
              <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, transparent, #FF00FF)' }} />
              {['★','✦','♦','✦','★'].map((s, i) => (
                <span key={i} className="spin-anim" style={{ color: ['#FF0000','#FFFF00','#00FF00','#FFFF00','#FF0000'][i], fontSize: 14, animationDelay: `${-i*0.5}s` }}>{s}</span>
              ))}
              <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, #FF00FF, transparent)' }} />
            </div>

            {/* About me blurb */}
            <div style={{ background: 'rgba(0,20,0,0.7)', border: '2px solid #00FF00', padding: 12, marginTop: 8 }}>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 22, color: '#00FF00', marginBottom: 8 }}>
                🤓 a bit about me:
              </div>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 18, color: '#AAFFAA', lineHeight: 1.7 }}>
                hey im connor!! i live on the internet basically lol. i write code for a living (typescript, react, kotlin etc etc) and i ALSO teach programming which is pretty cool. fun fact: i fly planes sometimes 🛩️ im not making that up<br /><br />
                if u have questions or just wanna chat hit me up on AIM or sign the guestbook!!<br /><br />
                <span style={{ color: '#FFFF00' }}>email: hello@eastonco.net</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ background: 'rgba(40,0,40,0.7)', padding: 10 }}>

            {/* About mini */}
            <div style={{ background: '#1A001A', border: '2px solid #FF00FF', padding: 8, marginBottom: 10 }}>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 18, color: '#FF00FF', textAlign: 'center', marginBottom: 8 }}>
                <span className="spin-anim">⭐</span> ABOUT ME
              </div>
              {[
                ['name:', 'connor e.'],
                ['age:', 'old enough'],
                ['location:', 'the internet'],
                ['aim:', 'easton_co_2001'],
                ['email:', 'hello@'],
                ['status:', '🟢 ONLINE'],
                ['mood:', 'coding 💻'],
                ['music:', '🎵 LP - Numb'],
              ].map(([k, v]) => (
                <div key={k} style={{ fontFamily: 'var(--font-vt)', fontSize: 15, color: '#FFAAFF', marginBottom: 3, lineHeight: 1.3 }}>
                  <span style={{ color: '#FF00FF' }}>{k}</span> {v}
                </div>
              ))}
            </div>

            {/* Guestbook */}
            <div style={{ background: '#001A1A', border: '2px solid #00FFFF', padding: 8, marginBottom: 10, textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 18, color: '#00FFFF', marginBottom: 8 }}>
                📖 GUESTBOOK
              </div>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 16, color: '#AAFFFF', marginBottom: 8, lineHeight: 1.4 }}>
                12 ppl have signed!!
              </div>
              <a href="#" className="win98-btn" style={{ display: 'block', textAlign: 'center', marginBottom: 6, fontSize: 17 }}>SIGN IT!! ✍</a>
              <a href="#" className="retro-link" style={{ fontFamily: 'var(--font-vt)', fontSize: 16 }}>read entries</a>
            </div>

            {/* Quote of the day */}
            <div style={{ background: '#0D0022', border: '2px solid #9900FF', padding: 8, marginBottom: 10 }}>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 16, color: '#9900FF', textAlign: 'center', marginBottom: 6 }}>QUOTE OF THE DAY</div>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 15, color: '#DD99FF', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.5 }}>
                &ldquo;programming is just magic for nerds&rdquo;
              </div>
            </div>

            {/* Currently playing */}
            <div style={{ background: '#001100', border: '1px solid #00FF00', padding: 8, marginBottom: 10 }}>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 14, color: '#00FF00', marginBottom: 4 }}>🎵 NOW PLAYING:</div>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 14, color: '#AAFFAA', marginBottom: 4, lineHeight: 1.3 }}>Linkin Park<br />- Numb.mp3</div>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 16, color: '#007700', letterSpacing: '0.08em' }}>◄◄  ■  ▶  ◄◄  ▶▶</div>
              <div style={{ background: '#000', height: 6, marginTop: 6, position: 'relative' }}>
                <div style={{ background: '#00FF00', height: '100%', width: '60%' }} />
              </div>
            </div>

            {/* Top friends (very myspace) */}
            <div style={{ background: '#1A0000', border: '2px solid #FF4444', padding: 8 }}>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 16, color: '#FF4444', textAlign: 'center', marginBottom: 6 }}>MY TOP 8 😎</div>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 14, color: '#FF9999', lineHeight: 1.8 }}>
                1. xX_coder_gurl<br />
                2. iiTech4Lyfe<br />
                3. pyth0n_pwr<br />
                4. node_nerd99<br />
                5. h4ck3r_m0m<br />
                6. css_wizrd<br />
                7. git_gang<br />
                8. l33t_devs
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ background: '#000022', borderTop: '4px solid #FF00FF', padding: '14px 16px', textAlign: 'center' }}>
          {/* Web ring footer */}
          <div style={{ fontFamily: 'var(--font-vt)', fontSize: 18, color: '#888', marginBottom: 8 }}>
            [ ◄ PREV &nbsp;|&nbsp; <a href="#" style={{ color: '#00FFFF', textDecoration: 'underline' }}>NERD RING</a> &nbsp;|&nbsp; NEXT ► ]
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
            {['HOME', 'ABOUT', 'PROJECTS', 'GUESTBOOK', 'LINKS', 'EMAIL'].map(l => (
              <a key={l} href="#" className="retro-link" style={{ fontFamily: 'var(--font-vt)', fontSize: 18 }}>{l}</a>
            ))}
          </div>

          <div style={{ fontFamily: 'var(--font-vt)', fontSize: 18, color: '#FFFF00', marginBottom: 6 }}>
            ⚠️ this site is best viewed in <span style={{ color: '#00FFFF' }}>internet explorer 6.0</span> at <span style={{ color: '#FF69B4' }}>800×600 resolution</span> ⚠️
          </div>
          <div style={{ fontFamily: 'var(--font-vt)', fontSize: 17, color: '#FF69B4', marginBottom: 6 }}>
            © 2001-2004 Connor Easton — ALL RIGHTS RESERVED — NO STEALING MY HTML!!
          </div>
          <div style={{ fontFamily: 'var(--font-vt)', fontSize: 16, color: '#555', marginBottom: 12 }}>
            page has loaded <span style={{ color: '#00FF00' }}>{VISITOR_COUNT.toLocaleString()}</span> times since january 1st, 2001
          </div>

          {/* Final spinning star row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, fontSize: 18 }}>
            {Array.from({ length: 15 }, (_, i) => (
              <span key={i} className="spin-anim" style={{ color: ['#FF0000','#FF7700','#FFFF00','#00FF00','#00FFFF','#0000FF','#FF00FF'][i % 7], animationDelay: `${-i * 0.25}s`, animationDuration: `${1.5 + (i % 3) * 0.5}s` }}>★</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
