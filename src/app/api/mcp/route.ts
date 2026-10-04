import { createMcpHandler } from '@modelcontextprotocol/server';
import { load } from '@/lib/content/cv';
import { createCvServer } from '@/lib/mcp/server';

// Next evaluates this module at build time, so invalid CV frontmatter fails the build.
load();

// Web-standard handler: serves the 2026-07-28 protocol, with stateless fallback for 2025-era clients.
const handler = createMcpHandler(createCvServer, {
  onerror: error => console.error('[mcp]', error),
});

export const runtime = 'nodejs'; // cv.ts reads markdown from disk
export const maxDuration = 60;

const serve = (request: Request) => handler.fetch(request);
export { serve as GET, serve as POST, serve as DELETE };
