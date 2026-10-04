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
