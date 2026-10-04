// Server-side structured logs, exported to PostHog Logs over OpenTelemetry (OTLP/HTTP).
// Registered globally in src/instrumentation.ts. With NEXT_PUBLIC_POSTHOG_KEY unset (local dev, CI)
// the provider has no exporter, so log() only writes to the console.
import { SeverityNumber, type AnyValueMap } from '@opentelemetry/api-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { BatchLogRecordProcessor, LoggerProvider } from '@opentelemetry/sdk-logs';

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.POSTHOG_HOST ?? 'https://us.i.posthog.com'; // override for testing

export const loggerProvider = new LoggerProvider({
  resource: resourceFromAttributes({
    'service.name': 'eastonco.net',
    'deployment.environment': process.env.VERCEL_ENV ?? 'development',
  }),
  processors: key
    ? [
        new BatchLogRecordProcessor({
          exporter: new OTLPLogExporter({
            url: `${host}/i/v1/logs`,
            headers: { Authorization: `Bearer ${key}` },
          }),
        }),
      ]
    : [],
});

const logger = loggerProvider.getLogger('eastonco.net');

const severities = {
  debug: SeverityNumber.DEBUG,
  info: SeverityNumber.INFO,
  warn: SeverityNumber.WARN,
  error: SeverityNumber.ERROR,
} as const;

type Level = keyof typeof severities;

// Emits a log record to PostHog and mirrors it to the console (Vercel runtime logs).
export function log(level: Level, message: string, attributes: AnyValueMap = {}): void {
  console[level](message, attributes);
  logger.emit({
    body: message,
    severityNumber: severities[level],
    severityText: level.toUpperCase(),
    attributes,
  });
}

// Records are batched; call this with after() before the serverless function finishes.
export async function flushLogs(): Promise<void> {
  try {
    await loggerProvider.forceFlush();
  } catch (error) {
    console.error('[logger] flush failed', error);
  }
}
