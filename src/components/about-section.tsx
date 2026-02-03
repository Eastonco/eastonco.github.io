'use client';

import { motion } from 'framer-motion';
import { ManualCard, SpecRow, TechnicalRule } from './ui/manual-card';

const skills = [
  'TypeScript',
  'React',
  'Next.js',
  'Kotlin',
  'Java',
  'GraphQL',
  'Docker',
  'AWS',
];

const interests = [
  { label: 'Aviation', detail: 'PPL, working on IR' },
  { label: 'Algorithmic Trading', detail: 'Polymarket, crypto arbitrage' },
  { label: 'Film Photography', detail: '35mm & medium format' },
  { label: 'Hardware Modding', detail: 'GameCube, Raspberry Pi' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="framer-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Section header */}
          <div className="flex items-baseline gap-4 mb-8">
            <span className="font-mono text-sm font-bold text-muted-foreground">01.</span>
            <h2 className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-ink">
              Specifications
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column - Core specs */}
            <ManualCard sectionNumber="01.A" title="System Info">
              <div className="space-y-1">
                <SpecRow label="Model" value="Connor Easton" />
                <SpecRow label="Role" value="Software Engineer (SDE III)" />
                <SpecRow label="Org" value="Expedia Group" />
                <SpecRow label="Location" value="Seattle, WA" />
                <SpecRow label="Age" value="26" />
              </div>

              <TechnicalRule />

              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Building products at Expedia using TypeScript, React, and GraphQL.
                Previously studied CS at WSU where I was a TA. Currently volunteer
                with Microsoft TEALS teaching high school CS.
              </p>
            </ManualCard>

            {/* Right column - Capabilities */}
            <div className="space-y-8">
              <ManualCard sectionNumber="01.B" title="Capabilities">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 font-mono text-xs uppercase border-2 border-ink bg-cream"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </ManualCard>

              <ManualCard sectionNumber="01.C" title="Interests">
                <div className="space-y-3">
                  {interests.map((interest) => (
                    <div key={interest.label} className="flex justify-between items-baseline">
                      <span className="font-mono text-sm font-bold text-ink">
                        {interest.label}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {interest.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </ManualCard>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
