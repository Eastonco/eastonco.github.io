'use client';

interface IndicatorLightProps {
  status: 'on' | 'off' | 'pulse';
  color?: 'green' | 'red' | 'amber' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const colorMap = {
  green: {
    on: 'bg-signal-green shadow-[0_0_6px_#2D5016]',
    off: 'bg-[#7A7A7A]',
  },
  red: {
    on: 'bg-signal-red shadow-[0_0_6px_#C41E3A]',
    off: 'bg-[#7A7A7A]',
  },
  amber: {
    on: 'bg-signal-orange shadow-[0_0_6px_#E87800]',
    off: 'bg-[#7A7A7A]',
  },
  blue: {
    on: 'bg-tech-blue shadow-[0_0_6px_#2B4A6F]',
    off: 'bg-[#7A7A7A]',
  },
};

const sizeMap = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export function IndicatorLight({
  status,
  color = 'green',
  size = 'md',
  label,
  className = '',
}: IndicatorLightProps) {
  const isOn = status === 'on' || status === 'pulse';
  const colorStyles = isOn ? colorMap[color].on : colorMap[color].off;
  const pulseStyles = status === 'pulse' ? 'animate-pulse' : '';

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`
          rounded-full
          border border-ink
          ${sizeMap[size]}
          ${colorStyles}
          ${pulseStyles}
        `}
        aria-hidden="true"
      />
      {label && (
        <span className="font-mono text-xs uppercase tracking-wide text-ink">
          {label}
        </span>
      )}
    </div>
  );
}

// Status badge with indicator light
interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'coming-soon';
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const configs = {
    active: { light: 'on' as const, color: 'green' as const, text: 'ACTIVE' },
    inactive: { light: 'off' as const, color: 'green' as const, text: 'INACTIVE' },
    'coming-soon': { light: 'pulse' as const, color: 'amber' as const, text: 'COMING SOON' },
  };

  const config = configs[status];

  return (
    <div
      className={`
        inline-flex items-center gap-2
        px-3 py-1
        border-2 border-ink
        bg-cream
        font-mono text-xs uppercase tracking-wide
        ${className}
      `}
    >
      <IndicatorLight status={config.light} color={config.color} size="sm" />
      <span>{config.text}</span>
    </div>
  );
}
