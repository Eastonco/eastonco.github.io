// Server-side distributed tracing, exported to PostHog over OpenTelemetry (OTLP/HTTP).
// Registered in src/instrumentation.ts, after which Next.js's built-in spans (routes, rendering,
// fetch) are exported. With NEXT_PUBLIC_POSTHOG_KEY unset (local dev, CI) spans are dropped.
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.POSTHOG_HOST ?? 'https://us.i.posthog.com'; // override for testing

export const tracerProvider = new NodeTracerProvider({
  resource: resourceFromAttributes({
    'service.name': 'eastonco.net',
    'deployment.environment': process.env.VERCEL_ENV ?? 'development',
  }),
  spanProcessors: key
    ? [
        new BatchSpanProcessor(
          new OTLPTraceExporter({
            url: `${host}/i/v1/traces`,
            headers: { Authorization: `Bearer ${key}` },
          })
        ),
      ]
    : [],
});

// Spans are batched; call this with after() before the serverless function finishes.
export async function flushTraces(): Promise<void> {
  try {
    await tracerProvider.forceFlush();
  } catch (error) {
    console.error('[tracing] flush failed', error);
  }
}
