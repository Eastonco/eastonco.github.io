"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center py-20 md:py-32">
      <div className="framer-container">
        <div className="flex flex-col gap-6 max-w-[650px]">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Designer, developer, and creative technologist
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Building digital products, brands, and experiences that people love.
          </motion.p>
          <motion.div
            className="flex gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a 
              href="#about" 
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Learn more
            </a>
            <a 
              href="#contact" 
              className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
