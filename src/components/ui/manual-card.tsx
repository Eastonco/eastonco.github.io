'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface ManualCardProps {
  children: ReactNode;
  sectionNumber?: string;
  title?: string;
  href?: string;
  className?: string;
  interactive?: boolean;
}

export function ManualCard({
  children,
  sectionNumber,
  title,
  href,
  className = '',
  interactive = false,
}: ManualCardProps) {
  const baseStyles = `
    relative
    bg-cream
    border-4 border-ink
    shadow-brutal
    ${interactive ? 'transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm cursor-pointer' : ''}
  `;

  const content = (
    <div className={`${baseStyles} ${className}`}>
      {/* Section number badge */}
      {sectionNumber && (
        <div className="absolute -top-3 -left-1 bg-ink text-cream px-2 py-0.5 font-mono text-xs font-bold">
          {sectionNumber}
        </div>
      )}

      {/* Title bar */}
      {title && (
        <div className="border-b-2 border-ink px-4 py-3 bg-cardboard">
          <h3 className="font-mono text-lg font-bold uppercase tracking-wide text-ink">
            {title}
          </h3>
        </div>
      )}

      {/* Content area */}
      <div className="p-4">{children}</div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

// Simple bordered card without section number
interface SimpleCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'recessed';
}

export function SimpleCard({ children, className = '', variant = 'default' }: SimpleCardProps) {
  const variantStyles = {
    default: 'bg-cream border-4 border-ink shadow-brutal',
    subtle: 'bg-paper border-2 border-ink',
    recessed: 'bg-cardboard border-2 border-ink shadow-inset-brutal',
  };

  return <div className={`p-4 ${variantStyles[variant]} ${className}`}>{children}</div>;
}

// Horizontal rule with technical styling
export function TechnicalRule({ className = '' }: { className?: string }) {
  return <hr className={`border-t-2 border-ink my-4 ${className}`} />;
}

// Label/value pair for specs-style content
interface SpecRowProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export function SpecRow({ label, value, className = '' }: SpecRowProps) {
  return (
    <div className={`flex justify-between items-baseline py-1 ${className}`}>
      <span className="font-mono text-sm uppercase tracking-wide text-muted-foreground">
        {label}:
      </span>
      <span className="font-mono text-sm text-ink">{value}</span>
    </div>
  );
}
