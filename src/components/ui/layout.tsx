'use client';

/**
 * Reusable section and container components
 */

import { motion } from 'framer-motion';
import { spacing, motionVariants } from '../../lib/design-system';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  background?: React.ReactNode;
}

export function Section({
  children,
  id,
  size = 'medium',
  className = '',
  background,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative ${spacing.section[size]} overflow-hidden ${className}`}
    >
      {background}
      {children}
    </section>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  size?: 'full' | 'content' | 'narrow';
  className?: string;
}

export function Container({
  children,
  size = 'full',
  className = '',
}: ContainerProps) {
  const sizeClasses = {
    full: spacing.container.maxWidth,
    content: spacing.container.content,
    narrow: spacing.container.narrow,
  };

  return (
    <div className={`${sizeClasses[size]} ${spacing.container.padding} relative z-10 ${className}`}>
      {children}
    </div>
  );
}

interface AnimatedContainerProps {
  children: React.ReactNode;
  variant?: keyof typeof motionVariants;
  delay?: number;
  className?: string;
  viewportOnce?: boolean;
}

export function AnimatedContainer({
  children,
  variant = 'fadeInUp',
  delay = 0,
  className = '',
  viewportOnce = true,
}: AnimatedContainerProps) {
  const motionProps = motionVariants[variant];
  
  // Handle stagger variant differently
  if (variant === 'stagger' && 'animate' in motionProps) {
    return (
      <motion.div
        className={className}
        animate={motionProps.animate}
        viewport={{ once: viewportOnce }}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <motion.div
      className={className}
      initial={'initial' in motionProps ? motionProps.initial : undefined}
      whileInView={'animate' in motionProps ? motionProps.animate : undefined}
      transition={{
        ...('transition' in motionProps ? motionProps.transition : {}),
        delay,
      }}
      viewport={{ once: viewportOnce }}
    >
      {children}
    </motion.div>
  );
}

interface GradientTextProps {
  children: React.ReactNode;
  gradient?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export function GradientText({
  children,
  gradient = 'from-[#0ea5e9] to-[#8b5cf6]',
  className = '',
  as: Component = 'span',
}: GradientTextProps) {
  return (
    <Component className={`bg-clip-text text-transparent bg-gradient-to-r ${gradient} ${className}`}>
      {children}
    </Component>
  );
}