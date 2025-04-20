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

// Blog post preview component with animations
export function AnimatedBlogPreview({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <motion.article
      key={post.slug}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay:1.5 + (index * 0.15),
        type: "spring",
        stiffness: 50
      }}
      className="group max-w-3xl w-full rounded-xl p-5 hover:bg-secondary/15 dark:hover:bg-secondary/20 transition-all border border-transparent hover:border-secondary/20 dark:hover:border-secondary/30"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div>
          <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
            <span className="font-medium">{post.frontmatter.date}</span>
            <span className="text-muted-foreground/50 dark:text-muted-foreground/40">•</span>
            <span className="font-medium">{post.frontmatter.readingTime}</span>
          </div>
          <h2 className="text-foreground group-hover:text-primary mb-3 text-2xl font-bold transition-colors">
            {post.frontmatter.title}
          </h2>
          <p className="text-muted-foreground dark:text-muted-foreground/90 mb-6 leading-relaxed">{post.frontmatter.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.map(tag => (
              <span
                key={tag}
                className="bg-primary/10 dark:bg-primary/20 hover:bg-primary/15 dark:hover:bg-primary/25 text-primary dark:text-primary rounded-full px-3 py-1 text-xs font-semibold transition-colors backdrop-blur-sm shadow-sm border border-primary/10 dark:border-primary/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Header animation component
export function AnimatedHeader() {
  // Animation variants for staggered letter animations
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  // Split "Blog" text into individual letters
  const blogTitle = "Blog";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-3xl mb-16 px-5 relative"
    >
      {/* Fun background element */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.07 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-primary z-0"
        style={{ filter: "blur(70px)" }}
      />

      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex items-center gap-3 mb-4"
      >
        <motion.span
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="inline-flex items-center justify-center mb-1 text-sm font-bold text-primary bg-primary/15 dark:bg-primary/20 h-8 w-8 rounded-full"
        >
          ✏️
        </motion.span>
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="inline-block text-sm uppercase tracking-wider font-semibold text-primary/80 dark:text-primary/90 border border-primary/20 dark:border-primary/30 rounded-full px-3 py-1 bg-primary/5 dark:bg-primary/10"
        >
          My Thoughts & Ramblings
        </motion.span>
      </motion.div>
      
      <div className="mb-6 flex">
        {blogTitle.split("").map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block text-5xl md:text-6xl lg:text-7xl font-extrabold"
            style={{ 
              textShadow: "3px 3px 0px rgba(var(--primary-rgb), 0.2)",
              color: "var(--foreground)"
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="text-muted-foreground dark:text-muted-foreground/90 mb-10 text-xl leading-relaxed max-w-2xl relative z-10"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.4 }}
          className="inline-block text-xl mr-2"
        >
          💡
        </motion.span>
        Thoughts, learnings, and occasional rants on design, development, and technology.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex flex-wrap gap-2"
      >
        {['NextJS', 'Design', 'Tech', 'Life'].map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
            className="bg-secondary/30 dark:bg-secondary/40 hover:bg-secondary/40 dark:hover:bg-secondary/50 text-foreground/80 dark:text-foreground/90 rounded-full px-3 py-1 text-sm font-medium transition-all cursor-pointer hover:-translate-y-1"
          >
            #{tag}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
