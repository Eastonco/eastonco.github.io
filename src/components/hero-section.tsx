'use client';

import { Section, Container, AnimatedContainer } from './ui/layout';
import { AnimatedOrb } from './ui/animated-backgrounds';
import { Button } from './ui/button';
import { typography, spacing } from '../lib/design-system';
import ShadowedGradientText from './ui/shadowed-gradient-text';

export default function HeroSection() {
  return (
    <Section className="flex min-h-screen items-center" size="large">
      {/* Hero-specific accent element */}
      <AnimatedOrb
        size="large"
        position={{ top: '5rem', right: '5rem' }}
        colors="from-[#4f46e5] to-[#8b5cf6]"
        opacity={0.2}
        duration={8}
      />
      
      <Container>
        <div className={`flex max-w-[700px] flex-col ${spacing.gap.lg}`}>
          <AnimatedContainer variant="fadeInUp">
            <ShadowedGradientText gradient="from-[#4f46e5] via-[#ec4899] to-[#0ea5e9]">
              Software Engineer, Teacher, Plane guy
            </ShadowedGradientText>
          </AnimatedContainer>
          
          <AnimatedContainer variant="fadeInUp" delay={0.3}>
            <p className={`${typography.body.large} text-gray-300`}>
              and you found my website, neat!
            </p>
          </AnimatedContainer>
          
          <AnimatedContainer variant="fadeInUp" delay={0.5}>
            <div className={`mt-6 flex ${spacing.gap.sm}`}>
              <Button href="#about" variant="primary">
                Learn more
              </Button>
              <Button href="#contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </AnimatedContainer>
        </div>
      </Container>
    </Section>
  );
}
