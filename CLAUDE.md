# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with Turbopack
npm run build      # Production build
npm run lint       # ESLint
npm run format     # Prettier (write)
npm run format:check  # Prettier (check only)
```

No test suite is configured.

## Architecture

This is Connor Easton's personal portfolio site — a Next.js 15 App Router project deployed to Vercel at [eastonco.net](https://eastonco.net).

**Key directories:**
- `src/app/` — App Router pages (`page.tsx`, `layout.tsx`) and route segments
- `src/components/` — Shared React components; `ui/` holds primitives
- `src/lib/` — Utilities: `mdx.ts` (blog content), `supabase.ts` (client), `posthog.ts` (server-side analytics), `design-system.ts` (design tokens), `metadata.ts`
- `src/content/blog/` — MDX files for blog posts (read via `src/lib/mdx.ts`)
- `src/styles/` — Global CSS

**Blog system:** MDX files in `src/content/blog/` are read at request time by `getAllPosts()` and `getPostBySlug()` in `src/lib/mdx.ts`. They use `next-mdx-remote/rsc` with `rehype-pretty-code` (github-dark theme) and `rehype-slug` for code highlighting and heading anchors. Frontmatter fields: `title`, `date`, `excerpt`, `tags`, `author`, `readingTime`.

**Analytics:** PostHog is proxied through `/ingest/*` rewrites in `next.config.ts` to avoid ad blockers. Client-side is initialized in `src/components/PostHogProvider.tsx` (wraps the root layout); server-side uses `src/lib/posthog.ts`. Required env: `NEXT_PUBLIC_POSTHOG_KEY`.

**Supabase:** Client is initialized in `src/lib/supabase.ts` (marked `'use client'`). Required env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

**Design system:** `src/lib/design-system.ts` exports typed constants for colors, spacing, typography, animations, and Framer Motion variants. Use these tokens instead of ad-hoc Tailwind strings when building new components.

**Home page toggle:** `src/app/page.tsx` has an `isSiteLive` boolean that switches between the live landing page and an under-construction placeholder.

## Styling conventions

- Tailwind CSS v4 with `prettier-plugin-tailwindcss` for class ordering
- Prettier: single quotes, 2-space indent, 100-char print width, trailing commas (ES5)
- `src/components/landing-page-v1/` contains an older landing page variant kept for reference
