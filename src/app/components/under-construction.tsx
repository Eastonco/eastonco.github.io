"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";

export default function UnderConstruction() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col gap-6 max-w-[650px] mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Under Construction
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Websites are hard... Check back later.
          </motion.p>
          <motion.div
            className="flex gap-6 mt-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a 
              href="https://github.com/eastonco" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/connor-easton" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://instagram.com/eastonconnora" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
