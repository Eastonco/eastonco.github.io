'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="flex min-h-screen items-center py-20 md:py-32">
      <div className="framer-container">
        <div className="flex max-w-[650px] flex-col gap-6">
          <motion.h1
            className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Designer, developer, and creative technologist
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Building digital products, brands, and experiences that people love.
          </motion.p>
          <motion.div
            className="mt-4 flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="#about"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-5 py-2.5 transition-colors"
            >
              Learn more
            </a>
            <a
              href="#contact"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg px-5 py-2.5 transition-colors"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
