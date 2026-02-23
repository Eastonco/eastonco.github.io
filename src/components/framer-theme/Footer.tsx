import { GREEN } from '@/lib/framer-tokens';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '28px 32px',
        maxWidth: 1100,
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        boxSizing: 'border-box',
      }}
    >
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'rgba(242,242,245,0.5)' }}>
        eastonco
      </span>
      <span style={{ fontSize: 12, color: 'rgba(242,242,245,0.2)', letterSpacing: '0.06em' }}>
        © {new Date().getFullYear()} Connor Easton
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div className="fr-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN }} />
        <span style={{ fontSize: 12, color: 'rgba(74,222,128,0.7)', fontWeight: 600 }}>All systems operational</span>
      </div>
    </footer>
  );
}
