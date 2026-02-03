/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        border: 'var(--border)',
        'border-light': 'var(--border-light)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        // Warm technical palette direct colors
        paper: '#F5F0E8',
        cream: '#FFFAF5',
        cardboard: '#E8E0D4',
        kraft: '#D4C8B8',
        ink: '#1A1A1A',
        'signal-red': '#C41E3A',
        'signal-orange': '#E87800',
        'signal-green': '#2D5016',
        'tech-blue': '#2B4A6F',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        none: '0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        receipt: ['Courier New', 'Courier', 'monospace'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px #1A1A1A',
        'brutal-sm': '2px 2px 0px #1A1A1A',
        'brutal-lg': '6px 6px 0px #1A1A1A',
        'brutal-pressed': '1px 1px 0px #1A1A1A',
        'inset-brutal': 'inset 2px 2px 4px rgba(0,0,0,0.15)',
        'none': 'none',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
