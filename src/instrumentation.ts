// Next.js instrumentation hook: runs once when a server instance starts.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { logs } = await import('@opentelemetry/api-logs');
    const { loggerProvider } = await import('@/lib/logger');
    logs.setGlobalLoggerProvider(loggerProvider);
  }
}
