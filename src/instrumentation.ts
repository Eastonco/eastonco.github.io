import type { Instrumentation } from 'next';

// Next.js instrumentation hook: runs once when a server instance starts.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { logs } = await import('@opentelemetry/api-logs');
    const { loggerProvider } = await import('@/lib/logger');
    const { tracerProvider } = await import('@/lib/tracing');
    logs.setGlobalLoggerProvider(loggerProvider);
    // Also installs the async-context manager, so logs emitted inside a span carry its trace id.
    tracerProvider.register();
  }
}

// Called for every uncaught server error: page renders, route handlers, server actions, proxy.
export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  const { flushLogs, log } = await import('@/lib/logger');
  const err = error instanceof Error ? error : new Error(String(error));
  log('error', `[request] ${err.message}`, {
    'error.type': err.name,
    'error.stack': err.stack ?? null,
    // Matches the digest shown on the error page, to tie a visitor's report to this log.
    'error.digest': (err as Error & { digest?: string }).digest ?? null,
    'http.method': request.method,
    'url.path': request.path,
    'next.route': context.routePath,
    'next.route_type': context.routeType,
    'next.render_source': context.renderSource ?? null,
  });
  await flushLogs();
};
