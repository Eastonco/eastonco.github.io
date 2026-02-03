import Link from 'next/link';
import { getAllPosts } from '../lib/mdx';
import { BlogCardClient } from './blog-card';

export default async function BlogPreviewSection() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 border-t-4 border-ink">
      <div className="framer-container">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-8">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm font-bold text-muted-foreground">LOG</span>
            <h2 className="font-mono text-2xl md:text-3xl font-bold uppercase tracking-wide text-ink">
              Recent Transmissions
            </h2>
          </div>
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-wide text-signal-red hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post, i) => (
            <BlogCardClient key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
