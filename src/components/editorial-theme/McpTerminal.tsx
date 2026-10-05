'use client';

import { useEffect, useState } from 'react';

const MCP_URL = 'https://eastonco.net/api/mcp';
const CLI = `claude mcp add --transport http eastonco ${MCP_URL}`;

const CALLS = [
  { label: 'get_overview', name: 'get_overview', args: {} },
  { label: 'list_topics', name: 'list_topics', args: {} },
  { label: 'search_by_skill("MCP")', name: 'search_by_skill', args: { skill: 'MCP' } },
] as const;

type Call = (typeof CALLS)[number];

// Calls this site's own MCP endpoint (same origin) with a stateless JSON-RPC tools/call.
// The server may answer as SSE ("data: {...}") or plain JSON; handle both.
async function callTool(call: Call): Promise<string> {
  const res = await fetch('/api/mcp', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: { name: call.name, arguments: call.args },
    }),
  });
  const raw = await res.text();
  const payload = raw.trimStart().startsWith('{')
    ? raw
    : raw
        .split('\n')
        .find(line => line.startsWith('data: '))
        ?.slice(6);
  if (!payload) throw new Error(`HTTP ${res.status}`);
  const msg = JSON.parse(payload);
  if (msg.error) throw new Error(msg.error.message);
  return msg.result.content[0].text;
}

export default function McpTerminal() {
  const [active, setActive] = useState<Call | null>(null);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [shown, setShown] = useState(0);

  // Stream the response in like an agent reading it, instead of dumping it all at once.
  useEffect(() => {
    if (status !== 'done') return;
    const chunk = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? Infinity : 24;
    let frame = 0;
    const step = () => {
      setShown(n => {
        const next = Math.min(output.length, n + chunk);
        if (next < output.length) frame = requestAnimationFrame(step);
        return next;
      });
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [status, output]);

  const run = async (call: Call) => {
    setActive(call);
    setStatus('loading');
    setOutput('');
    setShown(0);
    try {
      setOutput(await callTool(call));
      setStatus('done');
    } catch (e) {
      setOutput(String(e));
      setStatus('error');
    }
  };

  const copy = () => {
    navigator.clipboard?.writeText(CLI);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <figure className="m-0 flex flex-col overflow-hidden rounded-xl border border-[var(--ed-line)] bg-[var(--ed-surface)]">
      <div className="ed-mono flex items-center justify-between border-b border-[var(--ed-line)] px-4 py-3 text-[var(--ed-faint)]">
        <span>Fig. 1 · Live</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--ed-accent)]" />
          /api/mcp
        </span>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-[var(--ed-line)] px-4 py-3">
        {CALLS.map(call => (
          <button
            key={call.label}
            onClick={() => run(call)}
            disabled={status === 'loading'}
            className={`cursor-pointer rounded-md border px-2.5 py-1.5 font-[family-name:var(--font-ed-mono)] text-xs transition-colors disabled:cursor-wait ${
              active?.label === call.label
                ? 'border-[var(--ed-accent)] text-[var(--ed-text)]'
                : 'border-[var(--ed-line-strong)] text-[var(--ed-muted)] hover:text-[var(--ed-text)]'
            }`}
          >
            {call.label}
          </button>
        ))}
      </div>

      <pre className="m-0 h-72 overflow-auto px-4 py-4 font-[family-name:var(--font-ed-mono)] text-[12px] leading-relaxed whitespace-pre-wrap text-[var(--ed-muted)]">
        {status === 'idle' && (
          <>
            <span className="text-[var(--ed-faint)]">
              {
                '// My CV is an MCP server. Run a tool to query it,\n// the same way an agent would.\n\n'
              }
            </span>
            <span className="text-[var(--ed-accent)]">›</span> <span className="ed-cursor" />
          </>
        )}
        {status !== 'idle' && active && (
          <>
            <span className="text-[var(--ed-accent)]">›</span>{' '}
            <span className="text-[var(--ed-text)]">tools/call {active.label}</span>
            {'\n\n'}
            {status === 'loading' && <span className="ed-cursor" />}
            {status === 'error' && <span className="text-red-400">{output}</span>}
            {status === 'done' && output.slice(0, shown)}
            {status === 'done' && shown < output.length && <span className="ed-cursor" />}
          </>
        )}
      </pre>

      <button
        onClick={copy}
        className="flex cursor-pointer items-center justify-between gap-4 border-t border-[var(--ed-line)] px-4 py-3 text-left font-[family-name:var(--font-ed-mono)] text-[11px] text-[var(--ed-faint)] hover:text-[var(--ed-muted)]"
      >
        <span className="truncate">$ {CLI}</span>
        <span className="shrink-0">{copied ? 'copied' : 'copy'}</span>
      </button>
    </figure>
  );
}
