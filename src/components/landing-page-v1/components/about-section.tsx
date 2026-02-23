'use client';

import { motion } from 'framer-motion';
import { Section, Container, AnimatedContainer, GradientText } from '../../ui/layout';
import { AnimatedOrb } from '../../ui/animated-backgrounds';
import { typography, spacing } from '../../../lib/design-system';

const skills = [
  'TypeScript',
  'Kotlin',
  'Docker',
  'React',
  'Next.js',
  'Node.js',
  'Figma',
  'AI'
];

export default function AboutSection() {
  return (
    <Section id="about" size="medium">
      {/* About-specific accent element */}
      <AnimatedOrb
        size="medium"
        position={{ left: '33%', top: '25%' }}
        colors="from-[#0ea5e9]/20 to-[#22d3ee]/20"
        opacity={0.15}
        duration={7}
      />
      
      <Container size="content">
        <AnimatedContainer variant="fadeInUp">
          <GradientText 
            as="h2" 
            className={`mb-10 ${typography.heading.h2}`}
            gradient="from-[#0ea5e9] to-[#8b5cf6]"
          >
            About Me
          </GradientText>
          
          <div className="prose dark:prose-invert prose-lg max-w-none text-gray-200">
            <p className={typography.body.large}>
              I&apos;m a passionate designer and developer focused on creating beautiful, functional
              digital experiences. With expertise in modern frontend technologies and a keen eye for
              design, I bridge the gap between technical implementation and user-centered design.
            </p>
            <p className={typography.body.large}>
              My approach combines clean aesthetics with performance-optimized code, resulting in
              websites and applications that are both visually compelling and technically sound.
            </p>
            
            <AnimatedContainer variant="fadeIn" delay={0.3}>
              <GradientText 
                as="h3" 
                className={`mt-12 mb-6 ${typography.heading.h3}`}
                gradient="from-[#ec4899] to-[#8b5cf6]"
              >
                Skills & Expertise
              </GradientText>
            </AnimatedContainer>
            
            <div className={`mt-6 flex flex-wrap ${spacing.gap.sm}`}>
              {skills.map((skill, index) => (
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
        </AnimatedContainer>
      </Container>
    </Section>
  );
}
