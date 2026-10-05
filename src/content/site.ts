// Homepage content shown by src/components/framer-theme. Edit copy here, not in components.
// Long-form CV content for the MCP server lives in src/content/cv/*.md.

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
  image?: string; // optional path under /public — shown instead of the auto-generated number
}

export const PROJECTS: Project[] = [
  {
    title: 'Receipt Printer',
    desc: 'Tired of writing boring emails? Send an anonymous physical receipt directly to my desk',
    href: 'https://printer.eastonco.net',
    year: '2026',
    tags: ['Raspberry Pi', 'CloudFlare', 'Printer drivers?'],
    image: '/receipt-printer.jpg',
  },
  {
    // TODO Connor: refine desc/tags to match the real stack.
    title: 'Craigslist Scraper',
    desc: 'A bot that watches Craigslist and surfaces fresh listings before anyone else scrolls to them.',
    href: 'https://cl.eastonco.net',
    year: '2026',
    tags: ['Scraper', 'Automation', 'Node.js'],
    image: '/craigslist.jpg',
  },
  {
    title: 'The Big Red Button',
    desc: 'Multiplayer cookie clicker with real-time Supabase. Minimal premise, maximum engagement.',
    href: '/red-button',
    year: '2024',
    tags: ['Supabase', 'React', 'Real-time'],
    image: '/redbutton.png',
  },
  {
    title: 'Dumpster Dive',
    desc: 'Anonymous thought-sharing. No feeds, no engagement loops — just the internet talking.',
    href: '/dumpster-dive',
    year: '2024',
    tags: ['Next.js', 'Anonymous', 'Social'],
    image: '/trash.jpg',
  },
];

// ── Editorial theme (src/components/editorial-theme) ────────────────────────
// DRAFT copy. The thesis and beliefs are Connor's to rewrite in his own words.

export const THESIS = {
  headline: 'I make large engineering orgs AI\u2011native.', // non-breaking hyphen
  sub: 'The protocols, permissions and guardrails that let agents do real work inside a company, not just in a demo. Currently doing it at Expedia Group, on a platform that serves about two billion requests a week.',
};

export const LINKS = [
  { label: 'GitHub', href: 'https://github.com/Eastonco' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/eastonco' },
  { label: 'Email', href: 'mailto:eastonco@icloud.com' },
];

export const NOW = {
  kicker: 'Now · Expedia Group, Experience Platform',
  title: 'Making a legacy content platform legible to agents',
  body: [
    'Experience Manager is the no-code CMS behind the Home, Search, Deals and Product pages of Expedia.com, Hotels.com and Vrbo. 500+ people publish through it, and it serves 200–250M template requests a day.',
    'I lead its move to AI infrastructure: MCP servers and Claude Code across the stack, and modernizing legacy systems so agents can read and act on them. With principal engineers and SVPs, I am writing the plan for how anyone at the company can publish and use skills, held to a quality bar instead of vibe-coded.',
    'I also taught 800+ coworkers, mostly non-engineers, to use Claude Desktop in one live session. My internal onboarding docs have since reached a few thousand people.',
  ],
};

export const BELIEFS = [
  {
    title: 'The bottleneck is the legacy system, not the model.',
    body: 'Most enterprise AI projects stall because agents cannot read the systems they are pointed at. Making a twelve-year-old service describable is the real work.',
  },
  {
    title: 'Skills are the new internal libraries, so they need code review.',
    body: 'Once anyone can publish a skill, you have a package ecosystem. It needs owners, versions and a bar to clear, the same as any shared dependency.',
  },
  {
    title: 'Adoption is a teaching problem.',
    body: 'Tools do not spread through a company on their own. A good live session in front of 800 people moved more usage than any rollout email.',
  },
];

export interface CaseStudy {
  metric: string;
  metricLabel: string;
  title: string;
  context: string;
  body: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    metric: '$1.8B',
    metricLabel: 'airline credit redeemed',
    title: 'Flight credit redemption',
    context: 'Flights · 2020',
    body: 'A full-stack shopping and checkout flow that let travelers spend COVID-era airline credit on their own. Call center traffic for credits fell 80%.',
  },
  {
    metric: '25+',
    metricLabel: 'teams shipping independently',
    title: 'Micro-frontend platform for EG Console',
    context: 'Core Services · 2022',
    body: 'A modular monorepo on Qiankun, NX and GraphQL so that teams could build and deploy their own frontends inside one unified console.',
  },
  {
    metric: '90%',
    metricLabel: 'less onboarding time',
    title: 'Product Admin Panel',
    context: 'Core Services · 2022–24',
    body: 'Started from scratch with one senior engineer, later a team lead. Rate limits, access lists and usage analytics for 300+ admins; Okta and automatic account selection lifted sign-ups 33%.',
  },
  {
    metric: '$400K',
    metricLabel: 'first data-as-a-service deal',
    title: 'Billing subscriptions for Duetto',
    context: 'Core Services · 2024',
    body: 'Co-led a team of seven on the billing service that closed the Duetto deal and moved Expedia into the $20B+ data-as-a-service market.',
  },
];

export interface LabItem {
  name: string;
  note: string;
  stack: string;
  href: string;
  year?: string;
}

export const LAB: LabItem[] = [
  {
    name: 'Free Stuff Finder',
    note: 'Watches Craigslist and uses Claude Haiku to decide whether each listing matches what you actually want, then sends a push notification.',
    stack: 'Python · Postgres · Claude Haiku · Raspberry Pi',
    href: 'https://cl.eastonco.net',
    year: '2026',
  },
  {
    name: 'CV over MCP',
    note: 'This site’s résumé, served as a public Model Context Protocol server any agent can query.',
    stack: 'MCP · Next.js · PostHog',
    href: '#now',
    year: '2026',
  },
  {
    name: 'checkrides.fyi',
    note: 'Reviews and search for the examiners pilots fly with on checkrides.',
    stack: 'Next.js · Supabase · Vercel',
    href: 'https://checkrides.fyi',
  },
  {
    name: 'Receipt Printer',
    note: 'A thermal printer on my desk that anyone on the internet can print to.',
    stack: 'Node.js · Raspberry Pi · Cloudflare Tunnel',
    href: 'https://printer.eastonco.net',
    year: '2026',
  },
  {
    name: 'The Big Red Button',
    note: 'A multiplayer button, synced in real time.',
    stack: 'React · Supabase Realtime',
    href: '/red-button',
    year: '2024',
  },
  {
    name: 'Dumpster Dive',
    note: 'Anonymous notes, no feed.',
    stack: 'Next.js',
    href: '/dumpster-dive',
    year: '2024',
  },
];

export const OFF_KEYBOARD = [
  {
    kicker: 'Aviation',
    title: 'Instrument-rated private pilot',
    body: 'Because of a history of epilepsy, the FAA medical took two to three years of MRIs and EEGs, and I was not sure I would ever be cleared. Once I was, I earned my private certificate in three months, then a high-performance endorsement and an instrument rating. I fly G1000 Cessna 172s and 182s out of Seattle.',
  },
  {
    kicker: 'Teaching',
    title: '2,000+ people taught',
    body: 'Data structures TA at WSU, a year teaching high schoolers through Microsoft TEALS, guest lectures at WSU and North Seattle College, and the curriculum every new Expedia intern goes through.',
  },
  {
    kicker: 'Finance',
    title: 'Founder, Expedia Finance Club',
    body: 'About 300 coworkers learning the basics of IRAs, account types and investing. I also keep trying to beat the S&P 500 with code. Not yet.',
  },
];

// Intros that sit beside each section's isometric figure.
export const FIGURE_INTROS = {
  work: {
    title: 'Four years on the systems underneath',
    body: 'Before the AI work, I built the platform pieces other teams stand on: checkout flows, a console that 25+ teams deploy into on their own schedule, and the billing behind a new line of business.',
  },
  lab: {
    title: 'I build things because they are fun',
    body: 'Most of these started as a slightly ridiculous idea, and AI made it cheap to find out whether they would work. The receipt printer is real: anyone on the internet can print to my desk.',
  },
  off: {
    title: 'Usually somewhere around 5,000 feet',
    body: 'I fly G1000 Cessnas out of Seattle. The magenta on this site is the course line on that screen.',
  },
};
