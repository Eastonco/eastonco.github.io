# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev          # Start dev server with Turbopack (http://localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changes
```

## Architecture Overview

This is a Next.js 15 personal portfolio site using the App Router, deployed on Vercel.

### Key Directories

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components (Header, Footer, sections)
- `src/components/ui/` - Reusable UI primitives (Button, Layout, animated backgrounds)
- `src/lib/` - Utilities: MDX parsing, Supabase client, design system tokens, metadata
- `src/content/blog/` - MDX blog posts with frontmatter
- `src/styles/globals.css` - Global styles, CSS variables, prose styling

### Blog System

Blog posts are MDX files in `src/content/blog/`. The MDX processing (`src/lib/mdx.ts`) uses:
- `gray-matter` for frontmatter parsing
- `next-mdx-remote/rsc` for React Server Component compilation
- `rehype-pretty-code` with `shiki` for syntax highlighting
- `remark-gfm` for GitHub-flavored markdown

Frontmatter fields: `title`, `date`, `excerpt`, `tags`, `author`, `readingTime`

### Design System

`src/lib/design-system.ts` exports centralized design tokens:
- `colors` - Gradients, backgrounds, text colors
- `spacing` - Section padding, container widths, gaps
- `typography` - Heading and body text scales
- `animations` - Transition durations, hover effects
- `components` - Pre-composed button/card/input styles
- `motionVariants` - Framer Motion animation presets

### External Services

- **Supabase**: Client initialized in `src/lib/supabase.ts`, requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **PostHog**: Analytics provider wrapper in `src/components/PostHogProvider.tsx`
- **Vercel**: Analytics and Speed Insights integrated in root layout

### CSS Architecture

- Tailwind CSS 4 with custom CSS variables in `globals.css`
- `.framer-container` class for consistent page layout (1200px max-width)
- `.prose` class customized for blog content styling
- CSS variables define the color palette (currently light mode only in `:root`)
