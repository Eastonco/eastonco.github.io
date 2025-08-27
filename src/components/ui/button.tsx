'use client';

/**
 * Reusable button components with consistent styling
 */

import { motion } from 'framer-motion';
import { animations } from '../../lib/design-system';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
} as const;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  className = '',
  target,
  rel,
}: ButtonProps) {
  const baseClasses = `${sizeClasses[size]} font-medium rounded-lg transition-all shadow-lg ${animations.transitions.default}`;
  
  const variantClasses = {
    primary: `bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] text-white hover:shadow-primary/50`,
    secondary: `bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:shadow-white/15`,
    ghost: `border-2 border-accent text-foreground hover:bg-accent/20`,
  };

  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={combinedClassName}
        whileHover={disabled ? {} : { scale: 1.03 }}
        whileTap={disabled ? {} : { scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

interface IconButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
  target?: string;
  rel?: string;
  hoverColor?: string;
}

export function IconButton({
  children,
  href,
  onClick,
  ariaLabel,
  className = '',
  target,
  rel,
  hoverColor = 'rgba(79, 70, 229, 0.7)',
}: IconButtonProps) {
  const baseClasses = `text-white/80 hover:text-white transition-all hover:scale-110 ${className}`;

  const motionProps = {
    whileHover: { 
      y: -3,
      filter: `drop-shadow(0 0 8px ${hoverColor})`
    },
    transition: { type: "spring" as const, stiffness: 400, damping: 10 }
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        aria-label={ariaLabel}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}