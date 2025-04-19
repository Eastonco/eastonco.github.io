"use client";

import { motion } from "framer-motion";

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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center md:text-left">Projects</h2>
          
          <div className="flex flex-col items-center justify-center min-h-[200px] border-2 border-dashed border-secondary rounded-xl p-8">
            <p className="text-muted-foreground text-lg text-center">
              Projects section coming soon.
            </p>
            <p className="text-muted-foreground text-center mt-2">
              This area will showcase my latest work and side projects.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
