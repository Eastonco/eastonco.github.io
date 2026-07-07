import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { getOverview, getTopic, listTopics, searchExperience } from '@/lib/cv';

// Public, read-only MCP server for Connor Easton's CV. URL: /api/mcp
// ponytail: uses the adapter's [transport] convention — no hand-written transport.
const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'get_overview',
      {
        title: 'Get CV Overview',
        description: "High-level summary of Connor Easton: bio, current role, and top skills.",
        inputSchema: {},
      },
      async () => json(getOverview())
    );

    server.registerTool(
      'list_topics',
      {
        title: 'List CV Topics',
        description:
          'List available CV topics (experience, projects, skills, interests) with ids for get_topic_details.',
        inputSchema: {},
      },
      async () => json(listTopics())
    );

    server.registerTool(
      'get_topic_details',
      {
        title: 'Get Topic Details',
        description: 'Fetch full details for one CV topic by its id (see list_topics).',
        inputSchema: { id: z.string().describe('Topic id, e.g. "expedia-group"') },
      },
      async ({ id }) => {
        const topic = getTopic(id);
        if (!topic) {
          const valid = listTopics()
            .map((t) => t.id)
            .join(', ');
          return json({ error: `No topic "${id}". Valid ids: ${valid}` });
        }
        return json(topic);
      }
    );

    server.registerTool(
      'search_experience',
      {
        title: 'Search Experience',
        description: 'Free-text search across all CV content; returns matching topics and snippets.',
        inputSchema: { query: z.string().describe('e.g. "Kotlin", "aviation", "real-time"') },
      },
      async ({ query }) => json(searchExperience(query))
    );
  },
  {
    serverInfo: { name: 'eastonco-cv', version: '1.0.0' },
    capabilities: { tools: {} },
  },
  {
    basePath: '/api', // must match this route's location: /api/[transport]
    maxDuration: 60,
    verboseLogs: process.env.NODE_ENV === 'development',
  }
);

function json(data: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] };
}

export { handler as GET, handler as POST, handler as DELETE };
