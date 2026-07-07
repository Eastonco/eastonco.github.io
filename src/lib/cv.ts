// Loads the CV/resume from markdown files in src/content/cv/ for the MCP server
// (src/app/api/[transport]/route.ts). One file per topic; overview.md is special.
// ponytail: gray-matter to split frontmatter/body, then return the RAW markdown —
// no compileMDX/JSX, because MCP clients (LLMs) consume markdown text directly.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type TopicCategory = 'experience' | 'project' | 'skill' | 'education' | 'interest';

export interface Topic {
  id: string; // = filename without .md, used by get_topic_details
  name: string;
  category: TopicCategory;
  summary: string; // frontmatter one-liner for list_topics
  details: string; // the markdown body
  skills?: string[];
  dates?: string;
  links?: string[];
}

export interface Overview {
  name: string;
  headline: string;
  currentRole: string;
  location: string;
  yearsExperience: string;
  summary: string; // the markdown body of overview.md
  topSkills: string[];
  contact: { website: string; email?: string; linkedin?: string; github?: string };
}

const CV_DIR = path.join(process.cwd(), 'src/content/cv');
const CATEGORY_ORDER: TopicCategory[] = ['experience', 'project', 'skill', 'education', 'interest'];

// ponytail: no cache — 8 tiny files, sync reads are negligible and dev edits show live.
function load(): { overview: Overview; topics: Topic[] } {
  const files = fs.readdirSync(CV_DIR).filter((f) => f.endsWith('.md'));
  let overview: Overview | null = null;
  const topics: Topic[] = [];

  for (const file of files) {
    const { data, content } = matter(fs.readFileSync(path.join(CV_DIR, file), 'utf8'));
    const body = content.trim();
    if (file === 'overview.md') {
      overview = { ...(data as Omit<Overview, 'summary'>), summary: body };
    } else {
      topics.push({ id: file.replace(/\.md$/, ''), ...(data as Omit<Topic, 'id' | 'details'>), details: body });
    }
  }

  if (!overview) throw new Error('cv: src/content/cv/overview.md is missing');
  // Stable sort → experience first, then projects, skills, education, interests.
  topics.sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category));
  return { overview, topics };
}

export function getOverview(): Overview {
  return load().overview;
}

export function listTopics() {
  return load().topics.map(({ id, name, category, summary }) => ({ id, name, category, summary }));
}

export function getTopic(id: string): Topic | null {
  return load().topics.find((t) => t.id === id) ?? null;
}

// ponytail: in-memory substring scan; fine for a handful of topics.
export function searchExperience(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return load()
    .topics.map((t) => {
      const haystack = [t.name, t.summary, t.details, ...(t.skills ?? [])].join(' ').toLowerCase();
      const idx = haystack.indexOf(q);
      if (idx === -1) return null;
      const start = Math.max(0, idx - 40);
      const snippet = haystack.slice(start, idx + q.length + 40).trim();
      return { id: t.id, name: t.name, category: t.category, snippet: `…${snippet}…` };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}
