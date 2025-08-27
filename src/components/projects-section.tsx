'use client';

import { motion } from 'framer-motion';

export default function ProjectsSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Projects-specific subtle accent (minimized for seamless flow) */}
      <motion.div 
        className="absolute right-1/4 top-1/3 w-40 h-40 bg-gradient-to-r from-[#ec4899]/15 to-[#4f46e5]/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="framer-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="mb-12 text-center text-4xl font-bold md:text-left md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-[#ec4899]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Projects
          </motion.h2>

          <motion.div 
            className="flex min-h-[250px] flex-col items-center justify-center rounded-xl p-10 backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.15)" }}
          >
            <motion.div
              className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] text-white"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </motion.div>
            <p className="text-center text-xl text-white font-medium">
              Projects section coming soon.
            </p>
            <p className="mt-4 text-center text-gray-300">
              This area will showcase my latest work and side projects.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
