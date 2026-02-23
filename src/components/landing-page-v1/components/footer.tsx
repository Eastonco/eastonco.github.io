'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="mt-auto border-t py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="framer-container">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Connor Easton. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/eastonco"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://github.com/eastonco"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/eastonco"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
