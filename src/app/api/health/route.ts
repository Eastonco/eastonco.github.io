// Health check for uptime monitors: GET /api/health → 200 when everything is up, 503 otherwise.
// Checks the self-hosted Supabase stack (behind supabase.eastonco.net) that the red button,
// dumpster dive, and guestbook depend on.

export const dynamic = 'force-dynamic';

const TIMEOUT_MS = 5000;

type Check = { ok: boolean; status?: number; latency_ms: number; error?: string };

async function check(path: string): Promise<Check> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { ok: false, latency_ms: 0, error: 'Supabase env not configured' };

  const start = performance.now();
  try {
    const res = await fetch(`${url}${path}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return { ok: res.ok, status: res.status, latency_ms: Math.round(performance.now() - start) };
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'TimeoutError';
    return {
      ok: false,
      latency_ms: Math.round(performance.now() - start),
      error: timedOut ? `timed out after ${TIMEOUT_MS}ms` : 'unreachable',
    };
  }
}

export async function GET() {
  const [auth, database] = await Promise.all([
    check('/auth/v1/health'), // GoTrue auth service
    check('/rest/v1/counters?select=id&limit=1'), // PostgREST + Postgres, via an anon-readable table
  ]);
  const ok = auth.ok && database.ok;

  return Response.json(
    { status: ok ? 'ok' : 'down', checks: { supabase_auth: auth, supabase_database: database } },
    { status: ok ? 200 : 503, headers: { 'Cache-Control': 'no-store' } }
  );
}
