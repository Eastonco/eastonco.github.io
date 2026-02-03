'use client';

import { motion } from 'framer-motion';
import { ManualCard, TechnicalRule } from './ui/manual-card';
import { HardwareButton, IconButton } from './ui/hardware-button';

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="framer-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Section header */}
          <div className="flex items-baseline gap-4 mb-8">
            <span className="font-mono text-sm font-bold text-muted-foreground">03.</span>
            <h2 className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-ink">
              Transmission
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Receipt-style contact form */}
            <ManualCard sectionNumber="03.A" title="Contact Terminal">
              {/* Perforated edge effect */}
              <div className="perforated-edge -mx-4 mb-6" />

              <div className="font-mono text-center">
                <p className="text-sm text-muted-foreground mb-6">
                  Have a project in mind? Open to discussing new opportunities and collaborations.
                </p>

                <TechnicalRule />

                {/* Contact methods */}
                <div className="py-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">Email:</span>
                    <a
                      href="mailto:connor@eastonco.net"
                      className="text-sm text-signal-red hover:underline"
                    >
                      connor@eastonco.net
                    </a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">Schedule:</span>
                    <a
                      href="https://calendly.com/eastonco"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-signal-red hover:underline"
                    >
                      calendly.com/eastonco
                    </a>
                  </div>
                </div>

                <TechnicalRule />

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <HardwareButton
                    href="mailto:connor@eastonco.net"
                    variant="primary"
                    size="md"
                  >
                    Send Email
                  </HardwareButton>
                  <HardwareButton
                    href="https://calendly.com/eastonco"
                    variant="secondary"
                    size="md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Call
                  </HardwareButton>
                </div>

                {/* Perforated edge effect */}
                <div className="perforated-edge -mx-4 mt-6 mb-4" />

                {/* Social links */}
                <div className="flex items-center justify-center gap-4 pt-4">
                  <IconButton
                    href="https://github.com/eastonco"
                    target="_blank"
                    rel="noopener noreferrer"
                    ariaLabel="GitHub"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </IconButton>

                  <IconButton
                    href="https://linkedin.com/in/eastonco"
                    target="_blank"
                    rel="noopener noreferrer"
                    ariaLabel="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </IconButton>

                  <IconButton
                    href="https://instagram.com/eastonco"
                    target="_blank"
                    rel="noopener noreferrer"
                    ariaLabel="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </IconButton>
                </div>
              </div>
            </ManualCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
