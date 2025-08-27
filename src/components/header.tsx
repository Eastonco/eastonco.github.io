'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {

  return (
    <motion.header
      className={`sticky top-0 z-40 w-full transition-all duration-200`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="framer-container flex h-16 items-center justify-between">
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-foreground/80 font-medium ">
            Home
          </Link>
          <Link href="/blog" className="hover:text-foreground/80 font-medium">
            Blog
          </Link>
        </nav>
        
      </div>
    </motion.header>
  );
}
