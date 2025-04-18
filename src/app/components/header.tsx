"use client";

import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b" : ""
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="framer-container flex items-center justify-between h-16">
        <nav className="flex items-center gap-6 text-sm">
          <Link 
            href="/" 
            className="font-medium transition-colors hover:text-foreground/80"
          >
            Home
          </Link>
          <Link 
            href="/blog" 
            className="font-medium transition-colors hover:text-foreground/80"
          >
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
