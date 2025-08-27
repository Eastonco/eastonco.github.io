'use client';

import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
      {/* Contact-specific subtle accent (minimized for seamless flow) */}
      <motion.div 
        className="absolute bottom-10 right-1/4 w-56 h-56 bg-gradient-to-r from-[#4f46e5]/20 to-[#8b5cf6]/15 rounded-full blur-3xl"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.2, 0.15],
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
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2 
            className="mb-8 text-4xl font-bold md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-[#ec4899]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            className="mb-10 text-xl text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Have a project in mind? Feel free to reach out. I&apos;m always open to discussing new
            opportunities and creative collaborations.
          </motion.p>

          <motion.div 
            className="flex flex-col items-center justify-center gap-5 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="mailto:hello@yourwebsite.com"
              className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] text-white w-full rounded-lg px-6 py-3.5 transition-all sm:w-auto font-medium shadow-lg shadow-[#4f46e5]/20"
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              Send me an email
            </motion.a>
            <motion.a
              href="https://calendly.com/eastonco"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 w-full rounded-lg px-6 py-3.5 transition-all sm:w-auto font-medium shadow-lg"
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule a call
            </motion.a>
          </motion.div>

          <motion.div 
            className="mt-16 flex items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="https://github.com/eastonco"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-all hover:scale-110"
              aria-label="GitHub"
              whileHover={{ 
                y: -3,
                filter: "drop-shadow(0 0 8px rgba(79, 70, 229, 0.7))"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </motion.a>
            <motion.a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-all hover:scale-110"
              aria-label="Twitter"
              whileHover={{ 
                y: -3,
                filter: "drop-shadow(0 0 8px rgba(14, 165, 233, 0.7))"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/eastonco"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-all hover:scale-110"
              aria-label="LinkedIn"
              whileHover={{ 
                y: -3,
                filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.7))"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
