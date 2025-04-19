'use client';

import Link from 'next/link';
import ThemeToggle from './theme-toggle';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled ? 'bg-background/80 border-b backdrop-blur-md' : ''
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="framer-container flex h-16 items-center justify-between">
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-foreground/80 font-medium transition-colors">
            Home
          </Link>
          <Link href="/blog" className="hover:text-foreground/80 font-medium transition-colors">
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
