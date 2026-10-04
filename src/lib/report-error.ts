// Client-side error reporting: sends handled errors to PostHog Error Tracking.
// Uncaught errors are captured automatically (capture_exceptions in PostHogProvider).
import posthog from 'posthog-js';

export function reportError(
  error: unknown,
  context: string,
  properties: Record<string, unknown> = {}
): void {
  console.error(`[${context}]`, error);
  posthog.captureException(error, { context, ...properties });
}
