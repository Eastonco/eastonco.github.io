'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center py-20 md:py-32 overflow-hidden">
      {/* Hero-specific accent elements */}
      <motion.div 
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.15, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex max-w-[700px] flex-col gap-7">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5] via-[#ec4899] to-[#0ea5e9]">
                Software Engineer, Teacher, and plane guy
              </span>
            </h1>
            <motion.div 
              className="absolute -z-10 w-full h-full left-1 top-1 bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5]/60 via-[#ec4899]/60 to-[#0ea5e9]/60 opacity-50 blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <span className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
                Software Engineer, Teacher, and plane guy
              </span>
            </motion.div>
          </motion.div>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Building digital products, brands, and experiences that people love.
          </motion.p>
          <motion.div
            className="mt-6 flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.a
              href="#about"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 transition-all shadow-lg hover:shadow-primary/50 font-medium"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Learn more
            </motion.a>
            <motion.a
              href="#contact"
              className="border-2 border-accent text-foreground hover:bg-accent/20 rounded-lg px-6 py-3 transition-all shadow-lg hover:shadow-accent/40 font-medium"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get in touch
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
