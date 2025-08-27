'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { typography, spacing, colors } from '../lib/design-system';

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

// Format date to be more readable
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 50
      }}
      className="group h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <motion.div 
          className={`flex min-h-[280px] flex-col rounded-xl p-6 h-full ${colors.backgrounds.card}`}
          initial={{ boxShadow: "0 0 0 0 rgba(79, 70, 229, 0)" }}
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.15)"
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Blog icon */}
          <motion.div
            className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white"
            whileHover={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: 1.1 
            }}
            transition={{ duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h4.5M16.5 7.5h-3.75" />
            </svg>
          </motion.div>

          {/* Date and reading time */}
          <div className={`text-gray-300 mb-3 flex ${spacing.gap.xs} text-sm`}>
            <span>{formatDate(post.frontmatter.date)}</span>
            <span>•</span>
            <span>{post.frontmatter.readingTime}</span>
          </div>

          {/* Title */}
          <h3 className={`group-hover:text-primary mb-3 ${typography.heading.h4} text-white transition-colors leading-tight`}>
            {post.frontmatter.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-300 leading-relaxed mb-4 flex-1">
            {post.frontmatter.excerpt}
          </p>
          
          {/* Tags */}
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {post.frontmatter.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 rounded-full border border-blue-600/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
}