import { getPostBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Background from '@/components/framer-theme/Background';
import Nav from '@/components/framer-theme/Nav';
import Footer from '@/components/framer-theme/Footer';
import ScrollRevealInit from '@/components/framer-theme/ScrollRevealInit';

export const dynamicParams = true;

type Params = Promise<{ slug: string }>;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPost({ params }: { params: Params }) {
  const post = await getPostBySlug((await params).slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <div style={{ background: '#0A0A0E', minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <Background />
      <Nav />
      <ScrollRevealInit />

      <main
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 800,
          margin: '0 auto',
          padding: '120px 32px 80px',
          flex: 1,
        }}
      >
        {/* Back link */}
        <a
          href="/blog"
          className="fr-btn fr-btn-ghost"
          style={{ marginBottom: 40, display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          ← All posts
        </a>

        {/* Post header card */}
        <div className="fr-card" style={{ padding: '36px', marginBottom: 40 }}>
          {frontmatter.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {frontmatter.tags.map((tag: string) => (
                <span key={tag} className="fr-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#F2F2F5',
              lineHeight: 1.1,
              margin: '0 0 20px',
            }}
          >
            {frontmatter.title}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: 'ui-monospace, monospace',
              fontSize: 13,
              color: 'rgba(242,242,245,0.35)',
            }}
          >
            <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
            <span>·</span>
            <span>{frontmatter.readingTime}</span>
          </div>
        </div>

        {/* MDX content */}
        <div className="prose" style={{ color: 'rgba(242,242,245,0.82)' }}>
          {content}
        </div>
      </main>

      <Footer />
    </div>
  );
}
