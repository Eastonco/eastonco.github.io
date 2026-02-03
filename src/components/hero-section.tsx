'use client';

import { motion } from 'framer-motion';
import { HardwareButton } from './ui/hardware-button';
import { IndicatorLight } from './ui/indicator-light';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center py-16 md:py-24">
      <div className="framer-container">
        <div className="max-w-4xl">
          {/* Name block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-ink uppercase">
              Connor Easton
            </h1>
            <div className="h-1 bg-ink mt-4 mb-8 w-full max-w-md" />
          </motion.div>

          {/* Identity tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8"
          >
            <p className="font-mono text-xl md:text-2xl lg:text-3xl text-ink tracking-wide">
              Software Engineer. Pilot. Trader.
              <br />
              <span className="text-muted-foreground">Photographer. Tinkerer.</span>
            </p>
          </motion.div>

          {/* Status indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap gap-6 mb-12 py-4 border-y-2 border-ink"
          >
            <div className="flex items-center gap-3">
              <IndicatorLight status="on" color="green" size="md" />
              <span className="font-mono text-sm uppercase tracking-wide">
                Status: Building Things
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm uppercase tracking-wide text-muted-foreground">
                Location: Seattle, WA
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm uppercase tracking-wide text-muted-foreground">
                Role: SDE @ Expedia
              </span>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap gap-4"
          >
            <HardwareButton href="#projects" variant="primary" size="lg">
              View Projects
            </HardwareButton>
            <HardwareButton href="#contact" variant="secondary" size="lg">
              Get in Touch
            </HardwareButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
