import { createMcpHandler } from '@modelcontextprotocol/server';
import { after } from 'next/server';
import { load } from '@/lib/content/cv';
import { flushLogs, log } from '@/lib/logger';
import { createCvServer } from '@/lib/mcp/server';
import { flushPostHog } from '@/lib/posthog';

// Next evaluates this module at build time, so invalid CV frontmatter fails the build.
load();

// Web-standard handler: serves the 2026-07-28 protocol, with stateless fallback for 2025-era clients.
const handler = createMcpHandler(createCvServer, {
  onerror: error => log('error', '[mcp] handler error', { error: String(error) }),
});

export const runtime = 'nodejs'; // cv.ts reads markdown from disk
export const maxDuration = 60;

const serve = (request: Request) => {
  // Send this request's PostHog events and logs once the response is done, before the function sleeps.
  after(() => Promise.all([flushPostHog(), flushLogs()]));
  return handler.fetch(request);
};
export { serve as GET, serve as POST, serve as DELETE };
