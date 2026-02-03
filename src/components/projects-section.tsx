'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ManualCard, TechnicalRule } from './ui/manual-card';
import { StatusBadge } from './ui/indicator-light';

interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  externalLink?: string;
  tags: string[];
  status: 'active' | 'inactive' | 'coming-soon';
}

const projects: Project[] = [
  {
    id: 'checkrides',
    title: 'Checkrides.fyi',
    description: 'Platform for pilots to find and review DPEs (Designated Pilot Examiners). Built to help the aviation community.',
    externalLink: 'https://checkrides.fyi',
    tags: ['Next.js', 'Supabase', 'Vercel'],
    status: 'active',
  },
  {
    id: 'red-button',
    title: 'The Big Red Button',
    description: 'Real-time collaborative clicker game. Cookie clicker but with friends.',
    link: '/red-button',
    tags: ['Supabase', 'Real-time', 'Next.js'],
    status: 'active',
  },
  {
    id: 'trading-bot',
    title: 'Polymarket Trading Bot',
    description: 'Algorithmic trading system exploiting cryptocurrency price correlation inefficiencies.',
    tags: ['Python', 'APIs', 'Trading'],
    status: 'active',
  },
  {
    id: 'more',
    title: 'More Coming',
    description: 'Always building something new.',
    tags: [],
    status: 'coming-soon',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="framer-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Section header */}
          <div className="flex items-baseline gap-4 mb-8">
            <span className="font-mono text-sm font-bold text-muted-foreground">02.</span>
            <h2 className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-ink">
              Modules
            </h2>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <ManualCard
                  sectionNumber={`02.${String.fromCharCode(65 + index)}`}
                  title={project.title}
                >
                  {/* Status badge */}
                  <div className="mb-4">
                    <StatusBadge status={project.status} />
                  </div>

                  {/* Description */}
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  {project.tags.length > 0 && (
                    <>
                      <TechnicalRule />
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 font-mono text-xs uppercase border border-ink bg-paper"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Action buttons */}
                  {(project.link || project.externalLink) && (
                    <div className="mt-4 flex gap-2">
                      {project.link && (
                        <Link
                          href={project.link}
                          className="font-mono text-xs uppercase tracking-wide text-signal-red hover:underline"
                        >
                          Launch
                        </Link>
                      )}
                      {project.externalLink && (
                        <a
                          href={project.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs uppercase tracking-wide text-signal-red hover:underline"
                        >
                          Visit Site
                        </a>
                      )}
                    </div>
                  )}
                </ManualCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
