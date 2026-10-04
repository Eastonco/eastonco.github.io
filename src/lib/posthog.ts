// Server-side PostHog client (posthog-node) for events that happen outside the browser,
// e.g. MCP tool calls. Browser analytics live in src/components/PostHogProvider.tsx.
import { PostHog } from 'posthog-node';

let client: PostHog | null | undefined;

// Shared client, or null when NEXT_PUBLIC_POSTHOG_KEY is unset (local dev, CI) so callers can skip.
// Events are batched; call flushPostHog() before the serverless function finishes.
export function getPostHog(): PostHog | null {
  if (client === undefined) {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.POSTHOG_HOST ?? 'https://us.i.posthog.com'; // override for testing
    client = key ? new PostHog(key, { host }) : null;
  }
  return client;
}

export async function flushPostHog(): Promise<void> {
  try {
    await client?.flush();
  } catch (error) {
    console.error('[posthog] flush failed', error);
  }
}
