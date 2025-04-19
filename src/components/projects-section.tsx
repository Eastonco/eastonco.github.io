'use client';

import { motion } from 'framer-motion';

export default function ProjectsSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="framer-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-12 text-center text-3xl font-bold md:text-left md:text-4xl">
            Projects
          </h2>

          <div className="border-secondary flex min-h-[200px] flex-col items-center justify-center rounded-xl border-2 border-dashed p-8">
            <p className="text-muted-foreground text-center text-lg">
              Projects section coming soon.
            </p>
            <p className="text-muted-foreground mt-2 text-center">
              This area will showcase my latest work and side projects.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
