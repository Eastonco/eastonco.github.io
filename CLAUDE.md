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

No test suite is configured. CI (`.github/workflows/ci.yml`) runs lint, format check, and build on every PR. Node version: `.nvmrc` (24).

## Architecture

This is Connor Easton's personal portfolio site — a Next.js 16 App Router project deployed to Vercel at [eastonco.net](https://eastonco.net).

**Key directories:**

- `src/app/` — App Router pages (`page.tsx`, `layout.tsx`) and route segments
- `src/components/` — React components. `editorial-theme/` is the live homepage theme (tokens in `editorial-theme/editorial.css`); `framer-theme/` and `themes/` hold unrouted theme references (see below)
- `src/lib/` — Utilities: `content/blog.ts` and `content/cv.ts` (content loaders), `mcp/server.ts` (MCP server), `supabase.ts` (client), `posthog.ts` (server-side analytics)
- `src/content/` — Editable content: `blog/*.mdx` (blog posts), `cv/*.md` (CV served over MCP), `site.ts` (homepage copy: the editorial theme's thesis, beliefs, case studies and lab, plus the older framer theme's projects, skills and stats)
- `src/styles/` — Global CSS

**Blog system:** MDX files in `src/content/blog/` are read at request time by `getAllPosts()` and `getPostBySlug()` in `src/lib/content/blog.ts`. They use `next-mdx-remote/rsc` with `rehype-pretty-code` (github-dark theme) and `rehype-slug` for code highlighting and heading anchors. Frontmatter fields: `title`, `date`, `excerpt`, `tags`, `author`, `readingTime`.

**MCP server:** Public, read-only MCP server for the CV at `/api/mcp`, built on the official `@modelcontextprotocol/server` (v2). Tools are registered in `src/lib/mcp/server.ts` (`createCvServer` factory); `src/app/api/mcp/route.ts` just wraps it with `createMcpHandler`, which serves the 2026-07-28 protocol plus a stateless fallback for 2025-era clients. Add tools in `server.ts` only. CV frontmatter is validated with zod in `src/lib/content/cv.ts`; invalid frontmatter fails the build.

**Analytics:** PostHog is proxied through `/ingest/*` rewrites in `next.config.ts` to avoid ad blockers. Client-side is initialized in `src/components/PostHogProvider.tsx` (wraps the root layout); server-side uses `src/lib/posthog.ts` (a no-op when the key is unset). MCP tool calls are tracked by PostHog MCP analytics (`@posthog/mcp`, `instrument()` in `src/lib/mcp/server.ts`), which sends `$mcp_tool_call` events; the MCP route flushes events with `after()`. Required env: `NEXT_PUBLIC_POSTHOG_KEY`.

**Supabase:** Client is initialized in `src/lib/supabase.ts` (marked `'use client'`). Required env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Supabase is self-hosted (Docker, exposed at `supabase.eastonco.net`); `GET /api/health` checks its auth service and database and returns 200 or 503, for uptime monitors.

**Themes:** The homepage renders `src/components/editorial-theme`, whose "Now" section has a live terminal that calls `/api/mcp` from the browser. `src/components/framer-theme` (the previous homepage) and `src/components/themes/` keep alternate theme references (cozy, framer, retro, web2) that are intentionally not routed, for a future theme switcher. `src/components/satisfying-interactions.tsx` is likewise kept but unrouted.

## Styling conventions

- Tailwind CSS v4 with `prettier-plugin-tailwindcss` for class ordering
- Prettier: single quotes, 2-space indent, 100-char print width, trailing commas (ES5)
