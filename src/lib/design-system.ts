/**
 * Design System Constants
 * Warm Technical / Hardware Brutalist Aesthetic
 * Inspired by Teenage Engineering, Dieter Rams, technical documentation
 */

// Color tokens - warm paper palette
export const colors = {
  // Base colors - paper/cardboard inspired
  base: {
    paper: '#F5F0E8',
    cardboard: '#E8E0D4',
    cream: '#FFFAF5',
    kraft: '#D4C8B8',
  },
  // Text colors - high contrast
  text: {
    primary: 'text-[#1A1A1A]',
    secondary: 'text-[#4A4A4A]',
    muted: 'text-[#7A7A7A]',
    inverse: 'text-[#F5F0E8]',
  },
  // Accent colors - signal/technical
  accent: {
    red: '#C41E3A',
    blue: '#2B4A6F',
    orange: '#E87800',
    green: '#2D5016',
  },
  // Borders
  borders: {
    heavy: 'border-[#1A1A1A]',
    medium: 'border-[#4A4A4A]',
    light: 'border-[#C4B8A8]',
  },
  // Surfaces
  surfaces: {
    recessed: 'bg-[#E0D8CC]',
    raised: 'bg-[#FFFAF5]',
    paper: 'bg-[#F5F0E8]',
  },
  // Legacy compatibility - now using solid colors
  backgrounds: {
    card: 'bg-[#FFFAF5] border-4 border-[#1A1A1A]',
    cardSubtle: 'bg-[#F5F0E8] border-2 border-[#1A1A1A]',
  },
} as const;

// Spacing tokens
export const spacing = {
  section: {
    small: 'py-12 md:py-16',
    medium: 'py-16 md:py-24',
    large: 'py-24 md:py-32',
  },
  container: {
    padding: 'px-4 sm:px-6 lg:px-8',
    maxWidth: 'max-w-6xl mx-auto',
    content: 'max-w-4xl mx-auto',
    narrow: 'max-w-2xl mx-auto',
  },
  gap: {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  },
  grid: {
    gutter: '1.5rem',
  },
} as const;

// Typography tokens - monospace headings, clean body
export const typography = {
  heading: {
    display: 'font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase',
    h1: 'font-mono text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
    h2: 'font-mono text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide uppercase',
    h3: 'font-mono text-xl md:text-2xl font-bold tracking-wide',
    h4: 'font-mono text-lg md:text-xl font-semibold tracking-wide',
  },
  body: {
    large: 'font-sans text-lg md:text-xl',
    medium: 'font-sans text-base md:text-lg',
    small: 'font-sans text-sm md:text-base',
    xs: 'font-sans text-xs md:text-sm',
  },
  mono: {
    large: 'font-mono text-lg md:text-xl',
    medium: 'font-mono text-base md:text-lg',
    small: 'font-mono text-sm',
    xs: 'font-mono text-xs',
  },
  weight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black',
  },
} as const;

// Border tokens - heavy, deliberate
export const borders = {
  none: 'border-0',
  thin: 'border border-[#C4B8A8]',
  medium: 'border-2 border-[#1A1A1A]',
  heavy: 'border-4 border-[#1A1A1A]',
  rule: 'border-t-2 border-[#1A1A1A]',
  ruleLight: 'border-t border-[#C4B8A8]',
} as const;

// Shadow tokens - hard offset, hardware-like
export const shadows = {
  none: 'shadow-none',
  brutal: 'shadow-[4px_4px_0px_#1A1A1A]',
  brutalSm: 'shadow-[2px_2px_0px_#1A1A1A]',
  brutalLg: 'shadow-[6px_6px_0px_#1A1A1A]',
  brutalPressed: 'shadow-[1px_1px_0px_#1A1A1A]',
  inset: 'shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)]',
} as const;

// Animation tokens - mechanical, deliberate
export const animations = {
  transitions: {
    default: 'transition-all duration-100',
    medium: 'transition-all duration-200',
    slow: 'transition-all duration-300',
  },
  hover: {
    press: 'hover:translate-x-[2px] hover:translate-y-[2px]',
    lift: 'hover:-translate-y-[2px]',
  },
  focus: {
    ring: 'focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2 focus:ring-offset-[#F5F0E8]',
  },
} as const;

// Component tokens
export const components = {
  button: {
    primary: `bg-[#C41E3A] ${colors.text.inverse} font-mono font-bold px-6 py-3 border-4 border-[#1A1A1A] ${shadows.brutal} ${animations.transitions.default} hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none`,
    secondary: `bg-[#FFFAF5] ${colors.text.primary} font-mono font-bold px-6 py-3 border-4 border-[#1A1A1A] ${shadows.brutal} ${animations.transitions.default} hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none`,
    ghost: `bg-transparent ${colors.text.primary} font-mono font-bold px-6 py-3 border-2 border-[#1A1A1A] ${animations.transitions.default} hover:bg-[#1A1A1A] hover:text-[#F5F0E8]`,
  },
  card: {
    default: `bg-[#FFFAF5] border-4 border-[#1A1A1A] ${shadows.brutal} p-6`,
    subtle: `bg-[#F5F0E8] border-2 border-[#1A1A1A] p-6`,
    interactive: `bg-[#FFFAF5] border-4 border-[#1A1A1A] ${shadows.brutal} p-6 ${animations.transitions.default} hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1A1A1A] cursor-pointer`,
  },
  input: {
    default: `bg-transparent border-b-2 border-[#1A1A1A] px-0 py-2 font-mono ${colors.text.primary} placeholder-[#7A7A7A] focus:outline-none focus:border-[#C41E3A]`,
    boxed: `bg-[#FFFAF5] border-2 border-[#1A1A1A] px-4 py-3 font-mono ${colors.text.primary} placeholder-[#7A7A7A] focus:outline-none focus:border-[#C41E3A]`,
  },
  badge: {
    default: `font-mono text-xs px-3 py-1 border-2 border-[#1A1A1A] bg-[#FFFAF5] ${colors.text.primary}`,
    active: `font-mono text-xs px-3 py-1 border-2 border-[#2D5016] bg-[#2D5016] text-[#F5F0E8]`,
  },
} as const;

// Framer Motion variants - mechanical, snappy
export const motionVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  },
  buttonPress: {
    rest: { scale: 1, x: 0, y: 0 },
    pressed: { scale: 0.98, x: 4, y: 4 },
    transition: { type: 'spring', stiffness: 500, damping: 30 },
  },
  toggleSwitch: {
    off: { x: 0 },
    on: { x: 24 },
    transition: { type: 'spring', stiffness: 700, damping: 30 },
  },
} as const;

// Responsive breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;
