'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    readingTime: string;
  };
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

// Format date in technical style
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return <BlogCardClient post={post} index={index} />;
}

export function BlogCardClient({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div
          className="
            flex min-h-[280px] flex-col h-full
            bg-cream border-4 border-ink shadow-brutal
            transition-all duration-100
            hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm
          "
        >
          {/* Header bar */}
          <div className="border-b-2 border-ink px-4 py-3 bg-cardboard flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              {formatDate(post.frontmatter.date)}
            </span>
            <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              {post.frontmatter.readingTime}
            </span>
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Title */}
            <h3 className="font-mono text-lg font-bold text-ink mb-3 leading-tight group-hover:text-signal-red transition-colors">
              {post.frontmatter.title}
            </h3>

            {/* Excerpt */}
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
              {post.frontmatter.excerpt}
            </p>

            {/* Tags */}
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border-light">
                {post.frontmatter.tags.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 font-mono text-xs uppercase border border-ink bg-paper"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
