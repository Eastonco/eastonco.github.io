import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

// Blog posts: MDX files in src/content/blog/, compiled at request time.
const contentDirectory = path.join(process.cwd(), 'src/content/blog');

// Get all posts
export async function getAllPosts() {
  // Check if the directory exists
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);

  const posts = files
    .filter(file => path.extname(file) === '.mdx')
    .map(file => {
      const filePath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return { slug: path.basename(file, '.mdx'), frontmatter: parseFrontmatter(data) };
    })
    .sort(
      (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );

  return posts;
}

// Get a single post by slug
export async function getPostBySlug(slug: string) {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  // Compile the MDX content
  const mdxSource = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: 'github-dark',
              keepBackground: true,
            },
          ],
        ],
        remarkPlugins: [remarkGfm],
      },
      parseFrontmatter: true,
    },
  });

  return {
    content: mdxSource.content,
    frontmatter: { slug, ...parseFrontmatter(data) },
  };
}

// Single source of truth for blog frontmatter defaults.
function parseFrontmatter(data: Record<string, unknown>) {
  return {
    title: (data.title as string) || 'Untitled',
    date: data.date ? new Date(data.date as string).toISOString() : new Date().toISOString(),
    excerpt: (data.excerpt as string) || '',
    tags: (data.tags as string[]) || [],
    author: (data.author as string) || 'Anonymous',
    readingTime: (data.readingTime as string) || '3 min read',
  };
}
