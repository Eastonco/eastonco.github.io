// Public, read-only MCP server for Connor Easton's CV, served at /api/mcp
// (src/app/api/mcp/route.ts). All data comes from src/lib/content/cv.ts.
// To add a tool: register it here; the route needs no changes.
import { McpServer, type CallToolResult } from '@modelcontextprotocol/server';
import { z } from 'zod';
import { getOverview, getTopic, listSkills, listTopics, searchBySkill } from '@/lib/content/cv';

const READ_ONLY = { readOnlyHint: true, openWorldHint: false } as const;

// Factory, not a singleton: createMcpHandler builds a fresh instance per request.
export function createCvServer(): McpServer {
  const server = new McpServer({ name: 'eastonco-cv', version: '2.0.0' });

  server.registerTool(
    'get_overview',
    {
      title: 'Get Overview',
      description:
        'Start here. Connor Easton at a glance: current role, location, years of experience, top skills, contact links, and a short bio.',
      annotations: READ_ONLY,
    },
    async () => json(getOverview())
  );

  server.registerTool(
    'list_topics',
    {
      title: 'List Topics',
      description:
        'List every CV topic (experience, projects, skills, education, interests) with its id, category, and a one-line summary. Pass an id to get_topic_details for the full write-up.',
      annotations: READ_ONLY,
    },
    async () => json(listTopics())
  );

  server.registerTool(
    'get_topic_details',
    {
      title: 'Get Topic Details',
      description:
        'Get the full write-up for one CV topic: summary, the details in markdown, and any extra fields like roles, skills, dates, and links.',
      inputSchema: z.object({
        id: z.string().describe('Topic id from list_topics, e.g. "expedia-group"'),
      }),
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

  // Enum rebuilt from CV frontmatter on every request, so clients always see the current skills.
  const skills = listSkills() as [string, ...string[]];

  server.registerTool(
    'search_by_skill',
    {
      title: 'Search by Skill',
      description:
        'Find which jobs and projects used a given skill or technology. Returns each matching topic with a snippet; pass its id to get_topic_details for more.',
      inputSchema: z.object({
        skill: z.enum(skills).describe('Skill or technology to look up'),
      }),
      annotations: READ_ONLY,
    },
    async ({ skill }) => json(searchBySkill(skill))
  );

  return server;
}

function json(data: unknown): CallToolResult {
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
}
