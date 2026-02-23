'use client';

import { Section, Container, AnimatedContainer, GradientText } from '../../ui/layout';
import { AnimatedOrb } from '../../ui/animated-backgrounds';
import { Button, IconButton } from '../../ui/button';
import { typography, spacing } from '../../../lib/design-system';

export default function ContactSection() {
  return (
    <Section id="contact" size="medium">
      {/* Contact-specific subtle accent */}
      <AnimatedOrb
        size="medium"
        position={{ bottom: '2.5rem', right: '25%' }}
        colors="from-[#4f46e5]/20 to-[#8b5cf6]/15"
        opacity={0.15}
        duration={8}
      />
      
      <Container size="narrow" className="text-center">
        <AnimatedContainer variant="fadeInUp">
          <GradientText 
            as="h2" 
            className={`mb-8 ${typography.heading.h2}`}
            gradient="from-[#0ea5e9] to-[#ec4899]"
          >
            Get in Touch
          </GradientText>
          
          <AnimatedContainer variant="fadeIn" delay={0.2}>
            <p className={`mb-10 ${typography.body.large} text-gray-300`}>
              Have a project in mind? Feel free to reach out. I&apos;m always open to discussing new
              opportunities and creative collaborations.
            </p>
          </AnimatedContainer>

          <AnimatedContainer variant="fadeInUp" delay={0.3}>
            <div className={`flex flex-col items-center justify-center ${spacing.gap.md} sm:flex-row`}>
              <Button 
                href="mailto:hello@yourwebsite.com"
                variant="primary"
                className="w-full sm:w-auto shadow-lg shadow-[#4f46e5]/20"
              >
                Send me an email
              </Button>
              <Button 
                href="https://calendly.com/eastonco"
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                Schedule a call
              </Button>
            </div>
          </AnimatedContainer>

          <AnimatedContainer variant="fadeIn" delay={0.5}>
            <div className={`mt-16 flex items-center justify-center ${spacing.gap.lg}`}>
              <IconButton
                href="https://github.com/eastonco"
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel="GitHub"
                hoverColor="rgba(79, 70, 229, 0.7)"
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
              </IconButton>
              
              <IconButton
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel="Twitter"
                hoverColor="rgba(14, 165, 233, 0.7)"
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
              </IconButton>
              
              <IconButton
                href="https://linkedin.com/in/eastonco"
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel="LinkedIn"
                hoverColor="rgba(236, 72, 153, 0.7)"
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
              </IconButton>
            </div>
          </AnimatedContainer>
        </AnimatedContainer>
      </Container>
    </Section>
  );
}
