'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      {/* About-specific accent element (minimized to create seamless flow) */}
      <motion.div 
        className="absolute left-1/3 top-1/4 w-48 h-48 bg-gradient-to-r from-[#0ea5e9]/20 to-[#22d3ee]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{
          duration: 7,
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
          className="mx-auto max-w-3xl"
        >
          <h2 className="mb-10 text-3xl font-bold md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-[#8b5cf6] inline-block">About Me</h2>
          <div className="prose dark:prose-invert prose-lg max-w-none text-gray-200">
            <p className="text-xl">
              I&apos;m a passionate designer and developer focused on creating beautiful, functional
              digital experiences. With expertise in modern frontend technologies and a keen eye for
              design, I bridge the gap between technical implementation and user-centered design.
            </p>
            <p className="text-xl">
              My approach combines clean aesthetics with performance-optimized code, resulting in
              websites and applications that are both visually compelling and technically sound.
            </p>
            <motion.h3 
              className="mt-12 mb-6 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ec4899] to-[#8b5cf6]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Skills & Expertise
            </motion.h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                'TypeScript',
                'Kotlin',
                'Docker',
                'React',
                'Next.js',
                'TypeScript',
                'Node.js',
                'Figma',
                'AI'
              ].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="bg-gradient-to-r from-[#4f46e5]/20 to-[#8b5cf6]/20 border border-[#8b5cf6]/30 text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg hover:shadow-[#8b5cf6]/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(139, 92, 246, 0.3)",
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
