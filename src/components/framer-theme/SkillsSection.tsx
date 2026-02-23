import { SKILLS } from '@/lib/framer-tokens';

export default function SkillsSection() {
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 80px', position: 'relative', zIndex: 1 }}>
      <span data-reveal className="fr-label" style={{ display: 'block', marginBottom: 20 }}>
        02 · Skills
      </span>
      <div data-reveal data-delay="80" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {SKILLS.map((s) => (
          <span key={s.name} className="fr-chip">
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
            {s.name}
          </span>
        ))}
      </div>
    </section>
  );
}
