'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface HardwareButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
}

const variants = {
  primary: 'bg-signal-red text-cream',
  secondary: 'bg-cream text-ink',
  ghost: 'bg-transparent text-ink border-2',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function HardwareButton({
  children,
  variant = 'secondary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  target,
  rel,
}: HardwareButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    font-mono font-bold uppercase tracking-wide
    border-4 border-ink
    shadow-brutal
    transition-all duration-100
    hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm
    active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-brutal
    focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 focus:ring-offset-paper
  `;

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

// Smaller variant for icon buttons
interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  ariaLabel: string;
  className?: string;
  target?: string;
  rel?: string;
}

export function IconButton({
  children,
  onClick,
  href,
  ariaLabel,
  className = '',
  target,
  rel,
}: IconButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    w-12 h-12
    bg-cream text-ink
    border-2 border-ink
    shadow-brutal-sm
    transition-all duration-100
    hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1A1A1A]
    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
    focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 focus:ring-offset-paper
  `;

  const combinedStyles = `${baseStyles} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={combinedStyles}
      >
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} aria-label={ariaLabel} className={combinedStyles}>
      {children}
    </button>
  );
}
