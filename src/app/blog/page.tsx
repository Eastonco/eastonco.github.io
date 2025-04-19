"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../../components/header";
import Footer from "../../components/footer";

// This would be replaced with actual blog data in a real implementation
const samplePosts = [
  {
    slug: "building-with-nextjs",
    title: "Building Modern Websites with Next.js",
    excerpt: "Learn how to leverage Next.js App Router for building fast, SEO-friendly websites with great user experience.",
    date: "April 15, 2025",
    readTime: "5 min read",
    tags: ["Next.js", "Web Development", "Frontend"]
  },
  {
    slug: "mastering-framer-motion",
    title: "Mastering Animations with Framer Motion",
    excerpt: "Discover how to create beautiful, performant animations that enhance your website's user experience.",
    date: "April 10, 2025",
    readTime: "4 min read",
    tags: ["Animation", "Framer Motion", "React"]
  },
  {
    slug: "tailwind-css-tips",
    title: "Tailwind CSS Tips for Clean Design",
    excerpt: "Explore advanced techniques for creating elegant interfaces with Tailwind CSS.",
    date: "April 5, 2025",
    readTime: "3 min read",
    tags: ["CSS", "Tailwind", "Design"]
  },
  {
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices for 2025",
    excerpt: "Stay ahead of the curve with these essential TypeScript patterns and practices.",
    date: "March 28, 2025",
    readTime: "6 min read",
    tags: ["TypeScript", "JavaScript", "Best Practices"]
  },
  {
    slug: "responsive-design-fundamentals",
    title: "Responsive Design Fundamentals",
    excerpt: "Master the core principles of creating websites that work beautifully across all devices.",
    date: "March 20, 2025",
    readTime: "4 min read",
    tags: ["Responsive Design", "CSS", "Mobile First"]
  }
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="framer-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Blog</h1>
              <p className="text-xl text-muted-foreground mb-12">
                Thoughts, learnings, and insights on design, development, and technology.
              </p>
              
              {/* Filter by tags would go here in a real implementation */}
              
              <div className="space-y-12">
                {samplePosts.map((post) => (
                  <motion.article 
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="group"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div>
                        <div className="flex gap-2 text-sm text-muted-foreground mb-2">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span 
                              key={tag}
                              className="px-2 py-1 bg-secondary/50 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
