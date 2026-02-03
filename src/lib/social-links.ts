/**
 * Centralized social links configuration
 * Used across contact-section, footer, and other components
 */

export interface SocialLink {
  name: string;
  href: string;
  hoverColor: string;
  icon: 'github' | 'twitter' | 'linkedin' | 'instagram';
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/eastonco',
    hoverColor: 'rgba(79, 70, 229, 0.7)',
    icon: 'github',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/yourusername',
    hoverColor: 'rgba(14, 165, 233, 0.7)',
    icon: 'twitter',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/eastonco',
    hoverColor: 'rgba(236, 72, 153, 0.7)',
    icon: 'linkedin',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/eastonco',
    hoverColor: 'rgba(236, 72, 153, 0.7)',
    icon: 'instagram',
  },
];

/**
 * SVG path data for social icons
 * Centralized to avoid duplication across components
 */
export const socialIconPaths: Record<SocialLink['icon'], string> = {
  github: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
  twitter: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z',
  linkedin: '', // LinkedIn uses multiple elements, handled separately
  instagram: '', // Instagram uses multiple elements, handled separately
};
