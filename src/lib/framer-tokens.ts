export const GREEN = '#4ADE80';
export const VIOLET = '#7B5FEA';
export const BLUE = '#4F9EE8';

export const SKILLS = [
  { name: 'TypeScript', dot: '#7B5FEA' },
  { name: 'React', dot: '#4F9EE8' },
  { name: 'Next.js', dot: '#E0E0E8' },
  { name: 'Kotlin', dot: '#E87756' },
  { name: 'Node.js', dot: '#4ADE80' },
  { name: 'Docker', dot: '#2496ED' },
  { name: 'AWS', dot: '#E84B9C' },
  { name: 'AI Infra', dot: '#FFD060' },
];

export const INTERESTS = [
  'Full Stack Development',
  'Finance',
  'Aviation',
  'Teaching',
  'Snowboarding',
];

export const STATS = [
  { val: '5+', label: 'Years shipping' },
  { val: '20+', label: 'Projects live' },
  { val: '200+', label: 'Students taught' },
];

export interface Project {
  title: string;
  desc: string;
  href: string;
  year: string;
  tags: string[];
  image?: string; // optional URL — shown instead of the auto-generated number
}

export const PROJECTS: Project[] = [
  {
    title: 'Receipt Printer',
    desc: 'Tired of writing boring emails? Send an anonymous physical receipt directly to my desk',
    href: 'https://printer.eastonco.net',
    year: '2026',
    tags: ['Raspberry Pi', 'CloudFlare', 'Printer drivers?'],
    // ponytail: LinkedIn CDN hotlink-blocks (403); drop a local image in /public to restore a photo.
    // Falls back to the auto-generated number card meanwhile.
  },
  {
    title: 'The Big Red Button',
    desc: 'Multiplayer cookie clicker with real-time Supabase. Minimal premise, maximum engagement.',
    href: '/red-button',
    year: '2024',
    tags: ['Supabase', 'React', 'Real-time'],
    image: '/redbutton.png'
  },
  {
    title: 'Dumpster Dive',
    desc: 'Anonymous thought-sharing. No feeds, no engagement loops — just the internet talking.',
    href: '/dumpster-dive',
    year: '2024',
    tags: ['Next.js', 'Anonymous', 'Social'],
    image: '/trash.jpg'
  },
];
