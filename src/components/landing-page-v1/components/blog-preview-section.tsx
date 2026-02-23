import Link from 'next/link';
import { Section, Container, AnimatedContainer } from '../../ui/layout';
import { typography, spacing } from '../../../lib/design-system';
import { getAllPosts } from '../../../lib/mdx';

// Client component for the blog card with animations
import { BlogCard}  from './blog-card'

export default async function BlogPreviewSection() {
  // Fetch all blog posts and get the top 3 most recent
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  // Don't render the section if there are no posts
  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <Section size="medium">
      <Container>
        <div className={`mb-12 flex items-baseline justify-between`}>
          <AnimatedContainer variant="fadeInUp">
            <h2 className={`${typography.heading.h3} md:${typography.heading.h4}`}>
              Latest Articles
            </h2>
          </AnimatedContainer>
          
          <AnimatedContainer variant="slideIn" delay={0.2}>
            <Link href="/blog" className="text-primary text-sm font-medium hover:underline">
              View all articles →
            </Link>
          </AnimatedContainer>
        </div>

        <div className={`grid grid-cols-1 ${spacing.gap.lg} md:grid-cols-2 lg:grid-cols-3`}>
          {recentPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
