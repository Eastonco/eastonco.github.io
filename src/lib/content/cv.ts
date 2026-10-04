// Loads the CV/resume from markdown files in src/content/cv/ for the MCP server
// (src/lib/mcp/server.ts). One file per topic; overview.md is special.
// ponytail: gray-matter to split frontmatter/body, then return the RAW markdown —
// no compileMDX/JSX, because MCP clients (LLMs) consume markdown text directly.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const CATEGORIES = ['experience', 'project', 'skill', 'education', 'interest'] as const;
export type TopicCategory = (typeof CATEGORIES)[number];

// Frontmatter schemas. Topics are loose: extra fields (contexts, aircraft, clients, …) are kept
// and returned by get_topic_details as-is. A bad file throws with its name and the problems.
const TopicFrontmatter = z.looseObject({
  name: z.string(),
  category: z.enum(CATEGORIES),
  summary: z.string(), // one-liner for list_topics
  skills: z.array(z.string()).optional(),
  tech_stack: z.array(z.string()).optional(),
  links: z.array(z.string()).optional(),
});

const OverviewFrontmatter = z.object({
  name: z.string(),
  headline: z.string(),
  currentRole: z.string(),
  location: z.string(),
  yearsExperience: z.string(),
  topSkills: z.array(z.string()),
  contact: z.object({
    website: z.string(),
    email: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }),
});

export type Topic = z.infer<typeof TopicFrontmatter> & {
  id: string; // = filename without .md, used by get_topic_details
  details: string; // the markdown body
};

export type Overview = z.infer<typeof OverviewFrontmatter> & {
  summary: string; // the markdown body of overview.md
};

const CV_DIR = path.join(process.cwd(), 'src/content/cv');

function parse<T>(schema: z.ZodType<T>, data: unknown, file: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `cv: invalid frontmatter in src/content/cv/${file}\n${z.prettifyError(result.error)}`
    );
  }
  return result.data;
}

// ponytail: no cache — a handful of tiny files, sync reads are negligible and dev edits show live.
export function load(): { overview: Overview; topics: Topic[] } {
  const files = fs.readdirSync(CV_DIR).filter(f => f.endsWith('.md'));
  let overview: Overview | null = null;
  const topics: Topic[] = [];

  for (const file of files) {
    const { data, content } = matter(fs.readFileSync(path.join(CV_DIR, file), 'utf8'));
    const details = content.trim();
    if (file === 'overview.md') {
      overview = { ...parse(OverviewFrontmatter, data, file), summary: details };
    } else {
      const id = file.replace(/\.md$/, '');
      topics.push({ id, ...parse(TopicFrontmatter, data, file), details });
    }
  }

  if (!overview) throw new Error('cv: src/content/cv/overview.md is missing');
  // Stable sort → experience first, then projects, skills, education, interests.
  topics.sort((a, b) => CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category));
  return { overview, topics };
}

export function getOverview(): Overview {
  return load().overview;
}

export function listTopics() {
  return load().topics.map(({ id, name, category, summary }) => ({ id, name, category, summary }));
}

export function getTopic(id: string): Topic | null {
  return load().topics.find(t => t.id === id) ?? null;
}

// Every skill/technology tag in topic frontmatter (skills + tech_stack), deduped case-insensitively.
// These are the allowed values for the MCP search_by_skill tool.
export function listSkills(): string[] {
  const skills = new Map<string, string>(); // lowercase -> first-seen casing
  for (const t of load().topics) {
    for (const skill of [...(t.skills ?? []), ...(t.tech_stack ?? [])]) {
      if (!skills.has(skill.toLowerCase())) skills.set(skill.toLowerCase(), skill);
    }
  }
  return [...skills.values()].sort((a, b) => a.localeCompare(b));
}

// Topics that mention a skill, each with a short snippet around the first mention.
// ponytail: in-memory substring scan; fine for a handful of topics.
export function searchBySkill(skill: string) {
  const q = skill.toLowerCase().trim();
  if (!q) return [];
  return load()
    .topics.map(t => {
      const text = [t.name, t.summary, t.details, ...(t.skills ?? []), ...(t.tech_stack ?? [])]
        .join(' ')
        .replace(/\s+/g, ' ');
      const idx = text.toLowerCase().indexOf(q);
      if (idx === -1) return null;
      const start = Math.max(0, idx - 60);
      const snippet = text.slice(start, idx + q.length + 60).trim();
      return { id: t.id, name: t.name, category: t.category, snippet: `…${snippet}…` };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}
