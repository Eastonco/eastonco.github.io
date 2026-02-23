export default function Background() {
  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div
        className="fr-mesh"
        style={{
          position: 'absolute',
          inset: '-20%',
          background: `
            radial-gradient(ellipse at 18% 32%, rgba(123,95,234,0.22) 0%, transparent 52%),
            radial-gradient(ellipse at 82% 14%, rgba(79,158,232,0.14) 0%, transparent 44%),
            radial-gradient(ellipse at 55% 82%, rgba(74,222,128,0.09) 0%, transparent 40%)
          `,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}
