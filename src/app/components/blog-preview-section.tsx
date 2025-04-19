"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// This would be replaced with actual blog data in a real implementation
const samplePosts = [
  {
    slug: "building-with-nextjs",
    title: "Building Modern Websites with Next.js",
    excerpt: "Learn how to leverage Next.js App Router for building fast, SEO-friendly websites with great user experience.",
    date: "April 15, 2025",
    readTime: "5 min read",
  },
  {
    slug: "mastering-framer-motion",
    title: "Mastering Animations with Framer Motion",
    excerpt: "Discover how to create beautiful, performant animations that enhance your website's user experience.",
    date: "April 10, 2025",
    readTime: "4 min read",
  },
  {
    slug: "tailwind-css-tips",
    title: "Tailwind CSS Tips for Clean Design",
    excerpt: "Explore advanced techniques for creating elegant interfaces with Tailwind CSS.",
    date: "April 5, 2025",
    readTime: "3 min read",
  }
];

export default function BlogPreviewSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="framer-container">
        <div className="flex justify-between items-baseline mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Latest Articles
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/blog"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all articles →
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {samplePosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-48 mb-4 bg-secondary/40 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Blog Image Placeholder
                  </div>
                </div>
                <div className="flex gap-2 text-sm text-muted-foreground mb-2">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground">
                  {post.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
