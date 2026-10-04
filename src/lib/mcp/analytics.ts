// PostHog tracking for MCP tool calls: one `mcp_tool_called` event per call.
// Events are anonymous (no person profiles); the route flushes them after each response.
import type { CallToolResult, McpRequestContext, McpServer } from '@modelcontextprotocol/server';
import { getPostHog } from '@/lib/posthog';

const DISTINCT_ID = 'mcp-server';

type Run = () => CallToolResult | Promise<CallToolResult>;

// Returns a wrapper that times a tool handler and records its outcome.
export function createToolTracker(server: McpServer, ctx?: McpRequestContext) {
  return async (
    tool: string,
    input: Record<string, unknown>,
    run: Run
  ): Promise<CallToolResult> => {
    const start = performance.now();
    let isError = true;
    try {
      const result = await run();
      isError = result.isError === true;
      return result;
    } finally {
      // Client name/version is only known for clients on the 2026-07-28 protocol (or after initialize).
      const client = server.server.getClientVersion();
      getPostHog()?.capture({
        distinctId: DISTINCT_ID,
        event: 'mcp_tool_called',
        properties: {
          tool,
          input,
          is_error: isError,
          duration_ms: Math.round(performance.now() - start),
          protocol_era: ctx?.era,
          client_name: client?.name,
          client_version: client?.version,
          user_agent: ctx?.requestInfo?.headers.get('user-agent') ?? undefined,
          $process_person_profile: false,
        },
      });
    }
  };
}
