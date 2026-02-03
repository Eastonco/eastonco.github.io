'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Types for the blog post
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

// Format date in technical style
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

// Blog post preview component with animations
export function AnimatedBlogPreview({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <motion.article
      key={post.slug}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: 0.1 + (index * 0.1),
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="group w-full"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div
          className="
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
          <div className="p-6">
            {/* Title */}
            <h2 className="font-mono text-xl md:text-2xl font-bold text-ink mb-3 leading-tight group-hover:text-signal-red transition-colors">
              {post.frontmatter.title}
            </h2>

            {/* Excerpt */}
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
              {post.frontmatter.excerpt}
            </p>

            {/* Tags */}
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border-light">
                {post.frontmatter.tags.map((tag: string) => (
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
    </motion.article>
  );
}

// Header animation component
export function AnimatedHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-3xl mb-12"
    >
      {/* Section header */}
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-mono text-sm font-bold text-muted-foreground">LOG</span>
        <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-ink">
          Transmissions
        </h1>
      </div>

      {/* Subtitle */}
      <p className="font-sans text-lg text-muted-foreground leading-relaxed max-w-2xl">
        Thoughts, learnings, and occasional technical documentation on design, development, and technology.
      </p>

      {/* Divider */}
      <div className="mt-6 h-1 w-full bg-ink" />
    </motion.div>
  );
}
