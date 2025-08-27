/**
 * Design System Constants
 * Centralized design tokens for consistent theming across components
 */

// Color tokens
export const colors = {
  gradients: {
    primary: 'from-[#4f46e5] to-[#8b5cf6]',
    secondary: 'from-[#0ea5e9] to-[#8b5cf6]',
    accent: 'from-[#ec4899] to-[#8b5cf6]',
    hero: 'from-[#4f46e5] via-[#ec4899] to-[#0ea5e9]',
    blue: 'from-[#0ea5e9] to-[#22d3ee]',
    purple: 'from-[#8b5cf6] to-[#a855f7]',
    pink: 'from-[#ec4899] to-[#f97316]',
    textPrimary: 'from-[#0ea5e9] to-[#8b5cf6]',
    textAccent: 'from-[#ec4899] to-[#8b5cf6]',
    textHero: 'from-[#4f46e5] via-[#ec4899] to-[#0ea5e9]',
  },
  backgrounds: {
    glass: 'bg-white/5 backdrop-blur-sm border border-white/10',
    glassDark: 'bg-white/10 backdrop-blur-sm border border-white/20',
    card: 'bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl',
  },
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
    accent: 'text-white/80',
  }
} as const;

// Spacing tokens
export const spacing = {
  section: {
    small: 'py-16 md:py-24',
    medium: 'py-20 md:py-32',
    large: 'py-24 md:py-40',
  },
  container: {
    padding: 'px-4 sm:px-6 lg:px-8',
    maxWidth: 'max-w-7xl mx-auto',
    content: 'max-w-4xl mx-auto',
    narrow: 'max-w-2xl mx-auto',
  },
  gap: {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  }
} as const;

// Typography tokens
export const typography = {
  heading: {
    h1: 'text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
    h3: 'text-2xl md:text-3xl font-bold',
    h4: 'text-xl md:text-2xl font-semibold',
  },
  body: {
    large: 'text-xl md:text-2xl',
    medium: 'text-lg md:text-xl',
    small: 'text-base',
    xs: 'text-sm',
  },
  weight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }
} as const;

// Animation tokens
export const animations = {
  transitions: {
    default: 'transition-all duration-200',
    slow: 'transition-all duration-300',
    fast: 'transition-all duration-150',
  },
  hover: {
    scale: 'hover:scale-105',
    scaleSmall: 'hover:scale-103',
    lift: 'hover:-translate-y-1',
  },
  focus: {
    ring: 'focus:ring-2 focus:ring-primary focus:ring-offset-2',
  }
} as const;

// Component variants
export const components = {
  button: {
    primary: `bg-gradient-to-r ${colors.gradients.primary} text-white rounded-lg px-6 py-3 font-medium shadow-lg hover:shadow-primary/50 ${animations.transitions.default}`,
    secondary: `${colors.backgrounds.glassDark} text-white rounded-lg px-6 py-3 font-medium shadow-lg ${animations.transitions.default}`,
    ghost: `border-2 border-accent text-foreground hover:bg-accent/20 rounded-lg px-6 py-3 font-medium ${animations.transitions.default}`,
  },
  card: {
    default: `${colors.backgrounds.card} rounded-xl p-6`,
    hover: `${colors.backgrounds.card} rounded-xl p-6 ${animations.hover.lift} ${animations.transitions.default}`,
  },
  input: {
    default: `${colors.backgrounds.glass} rounded-lg px-4 py-3 ${colors.text.primary} placeholder-gray-400 ${animations.transitions.default}`,
  }
} as const;

// Framer Motion variants
export const motionVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 }
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
} as const;

// Responsive breakpoints (for reference)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;