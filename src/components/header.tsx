'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IndicatorLight } from './ui/indicator-light';

export default function Header() {
  return (
    <motion.header
      className="sticky top-0 z-40 w-full bg-paper border-b-4 border-ink"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="framer-container flex h-14 items-center justify-between">
        {/* Logo / Site name */}
        <Link href="/" className="flex items-center gap-3">
          <IndicatorLight status="on" color="green" size="sm" />
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-ink">
            EASTONCO.NET
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-ink hover:bg-ink hover:text-cream transition-colors duration-100"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-ink hover:bg-ink hover:text-cream transition-colors duration-100"
          >
            Blog
          </Link>
          <Link
            href="#projects"
            className="px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-ink hover:bg-ink hover:text-cream transition-colors duration-100"
          >
            Projects
          </Link>
          <Link
            href="#contact"
            className="px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-ink hover:bg-ink hover:text-cream transition-colors duration-100"
          >
            Contact
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
