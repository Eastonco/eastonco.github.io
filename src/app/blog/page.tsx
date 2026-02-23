import { getAllPosts } from '@/lib/mdx';
import Background from '@/components/framer-theme/Background';
import Nav from '@/components/framer-theme/Nav';
import Footer from '@/components/framer-theme/Footer';
import ScrollRevealInit from '@/components/framer-theme/ScrollRevealInit';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div style={{ background: '#0A0A0E', minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <Background />
      <Nav />
      <ScrollRevealInit />

      <main style={{ position: 'relative', zIndex: 1, paddingTop: 100, flex: 1 }}>
        <section
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '60px 32px 100px',
          }}
        >
          <p
            className="h0 fr-label"
            style={{ marginBottom: 16 }}
          >
            Writing
          </p>

          <h1
            className="h1"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#F2F2F5',
              lineHeight: 1.05,
              margin: '0 0 20px',
            }}
          >
            Thoughts & learnings
          </h1>

          <p
            className="h2"
            style={{
              fontSize: 18,
              color: 'rgba(242,242,245,0.5)',
              margin: '0 0 60px',
            }}
          >
            Design, development, and occasional rants.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {posts.map((post, i) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                data-reveal
                data-delay={i * 80}
                className="fr-card fr-spot"
                style={{
                  padding: '28px 32px',
                  display: 'flex',
                  gap: 20,
                  textDecoration: 'none',
                }}
              >
                {/* Date + reading time column */}
                <div
                  style={{
                    flexShrink: 0,
                    width: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    paddingTop: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: 11,
                      color: 'rgba(242,242,245,0.35)',
                      lineHeight: 1.4,
                    }}
                  >
                    {formatDate(post.frontmatter.date)}
                  </span>
                  <span
                    style={{
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: 11,
                      color: 'rgba(242,242,245,0.25)',
                    }}
                  >
                    {post.frontmatter.readingTime}
                  </span>
                </div>

                {/* Content column */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {post.frontmatter.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                      {post.frontmatter.tags.map((tag) => (
                        <span key={tag} className="fr-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 20,
                      fontWeight: 700,
                      color: '#F2F2F5',
                      margin: '0 0 8px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {post.frontmatter.title}
                  </h2>

                  {post.frontmatter.excerpt && (
                    <p
                      style={{
                        fontSize: 14,
                        color: 'rgba(242,242,245,0.45)',
                        margin: '0 0 12px',
                        lineHeight: 1.6,
                      }}
                    >
                      {post.frontmatter.excerpt}
                    </p>
                  )}

                  <span
                    style={{
                      fontSize: 12,
                      color: 'rgba(242,242,245,0.3)',
                    }}
                  >
                    Read →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
