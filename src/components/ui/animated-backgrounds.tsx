'use client';

/**
 * Reusable animated background components
 * Extracted from individual sections for consistency and maintainability
 */

import { motion } from 'framer-motion';

interface AnimatedOrbProps {
  size?: 'small' | 'medium' | 'large' | 'xl';
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  colors: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  opacity?: number;
  duration?: number;
  className?: string;
}

const sizeClasses = {
  small: 'w-32 h-32',
  medium: 'w-48 h-48',
  large: 'w-96 h-96',
  xl: 'w-[800px] h-[800px]',
} as const;

const blurClasses = {
  sm: 'blur-sm',
  md: 'blur-md',
  lg: 'blur-lg',
  xl: 'blur-xl',
  '2xl': 'blur-2xl',
  '3xl': 'blur-3xl',
} as const;

export function AnimatedOrb({
  size = 'medium',
  position,
  colors,
  blur = '3xl',
  opacity = 0.15,
  duration = 8,
  className = '',
}: AnimatedOrbProps) {
  const positionStyles = {
    ...(position.top && { top: position.top }),
    ...(position.bottom && { bottom: position.bottom }),
    ...(position.left && { left: position.left }),
    ...(position.right && { right: position.right }),
  };

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} bg-gradient-to-r ${colors} rounded-full ${blurClasses[blur]} ${className}`}
      style={positionStyles}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [opacity * 0.7, opacity, opacity * 0.7],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  );
}

export function FloatingOrb({
  size = 'medium',
  position,
  colors,
  blur = '3xl',
  opacity = 0.15,
  duration = 20,
  className = '',
}: AnimatedOrbProps) {
  const positionStyles = {
    ...(position.top && { top: position.top }),
    ...(position.bottom && { bottom: position.bottom }),
    ...(position.left && { left: position.left }),
    ...(position.right && { right: position.right }),
  };

  return (
    <motion.div
      className={`fixed ${sizeClasses[size]} bg-gradient-to-r ${colors} rounded-full ${blurClasses[blur]} z-0 ${className}`}
      style={positionStyles}
      animate={{
        y: [0, 30, 0],
        x: [0, -20, 0],
        scale: [1, 1.05, 1],
        opacity: [opacity * 0.7, opacity, opacity * 0.7],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  );
}

interface BackgroundGradientProps {
  variant?: 'dark' | 'darker' | 'navy';
  className?: string;
}

export function BackgroundGradient({ variant = 'dark', className = '' }: BackgroundGradientProps) {
  const gradients = {
    dark: 'bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]',
    darker: 'bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]',
    navy: 'bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155]',
  };

  return (
    <div className={`absolute inset-0 ${gradients[variant]} z-0 ${className}`} />
  );
}

interface GlobalBackgroundProps {
  children?: React.ReactNode;
}

export function GlobalBackground({ children }: GlobalBackgroundProps) {
  return (
    <>
      <BackgroundGradient />
      
      {/* Global floating orbs */}
      <FloatingOrb
        size="xl"
        position={{ top: '-24rem', right: '25%' }}
        colors="from-[#4f46e5]/10 to-[#8b5cf6]/5"
        duration={20}
      />
      
      <FloatingOrb
        size="xl"
        position={{ top: '33%', right: '-24rem' }}
        colors="from-[#ec4899]/10 to-[#8b5cf6]/5"
        duration={25}
      />
      
      <FloatingOrb
        size="large"
        position={{ bottom: '-24rem', left: '-8rem' }}
        colors="from-[#0ea5e9]/10 to-[#22d3ee]/5"
        duration={22}
      />
      
      {children}
    </>
  );
}