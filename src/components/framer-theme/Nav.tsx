import { GREEN } from '@/lib/framer-tokens';

export default function Nav() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
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
      <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)', marginRight: 4 }} />
      {['About', 'Work', 'Contact'].map((l) => (
        <a key={l} href={`/#${l.toLowerCase()}`} className="fr-nav">
          {l}
        </a>
      ))}
      <a href="/blog" className="fr-nav">Blog</a>
      <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)', marginLeft: 4, marginRight: 8 }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 10px',
          borderRadius: 8,
          background: 'rgba(74,222,128,0.08)',
          border: '1px solid rgba(74,222,128,0.18)',
        }}
      >
        <div className="fr-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: GREEN }}>Available</span>
      </div>
    </nav>
  );
}
