// Public, read-only MCP server for Connor Easton's CV, served at /api/mcp
// (src/app/api/mcp/route.ts). All data comes from src/lib/content/cv.ts.
// To add a tool: register it here; the route needs no changes.
import { McpServer, type CallToolResult } from '@modelcontextprotocol/server';
import { z } from 'zod';
import { getOverview, getTopic, listTopics, searchExperience } from '@/lib/content/cv';

const READ_ONLY = { readOnlyHint: true, openWorldHint: false } as const;

// Factory, not a singleton: createMcpHandler builds a fresh instance per request.
export function createCvServer(): McpServer {
  const server = new McpServer({ name: 'eastonco-cv', version: '2.0.0' });

  server.registerTool(
    'get_overview',
    {
      title: 'Get CV Overview',
      description: 'High-level summary of Connor Easton: bio, current role, and top skills.',
      annotations: READ_ONLY,
    },
    async () => json(getOverview())
  );

  server.registerTool(
    'list_topics',
    {
      title: 'List CV Topics',
      description:
        'List available CV topics (experience, projects, skills, interests) with ids for get_topic_details.',
      annotations: READ_ONLY,
    },
    async () => json(listTopics())
  );

  server.registerTool(
    'get_topic_details',
    {
      title: 'Get Topic Details',
      description: 'Fetch full details for one CV topic by its id (see list_topics).',
      inputSchema: z.object({ id: z.string().describe('Topic id, e.g. "expedia-group"') }),
      annotations: READ_ONLY,
    },
    async ({ id }) => {
      const topic = getTopic(id);
      if (!topic) {
        const valid = listTopics()
          .map(t => t.id)
          .join(', ');
        return { ...json({ error: `No topic "${id}". Valid ids: ${valid}` }), isError: true };
      }
      return json(topic);
    }
  );

  server.registerTool(
    'search_experience',
    {
      title: 'Search Experience',
      description: 'Free-text search across all CV content; returns matching topics and snippets.',
      inputSchema: z.object({
        query: z.string().describe('e.g. "Kotlin", "aviation", "real-time"'),
      }),
      annotations: READ_ONLY,
    },
    async ({ query }) => json(searchExperience(query))
  );

  return server;
}

function json(data: unknown): CallToolResult {
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
}
