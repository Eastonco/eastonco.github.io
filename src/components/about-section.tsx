'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="bg-secondary/20 py-20 md:py-32">
      <div className="framer-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">About Me</h2>
          <div className="prose dark:prose-invert prose-lg max-w-none">
            <p>
              I&apos;m a passionate designer and developer focused on creating beautiful, functional
              digital experiences. With expertise in modern frontend technologies and a keen eye for
              design, I bridge the gap between technical implementation and user-centered design.
            </p>
            <p>
              My approach combines clean aesthetics with performance-optimized code, resulting in
              websites and applications that are both visually compelling and technically sound.
            </p>
            <h3 className="mt-8 mb-4 text-xl font-semibold">Skills & Expertise</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                'React',
                'Next.js',
                'TypeScript',
                'UI/UX Design',
                'Tailwind CSS',
                'Framer Motion',
                'Responsive Design',
                'Node.js',
                'Figma',
              ].map(skill => (
                <span
                  key={skill}
                  className="bg-secondary rounded-full px-3 py-1 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
