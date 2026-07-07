type Post = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    readingTime: string;
  };
};

export default function BlogSection({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 80px', position: 'relative', zIndex: 1 }}>
      <span data-reveal className="fr-label" style={{ display: 'block', marginBottom: 20 }}>
        04 · Blog
      </span>
      <div className="fr-grid-3">
        {posts.map((post, i) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            data-reveal
            data-delay={`${i * 80}`}
            className="fr-card"
            style={{ padding: '28px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {post.frontmatter.tags.slice(0, 2).map((t) => (
                <span key={t} className="fr-tag">
                  {t}
                </span>
              ))}
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 700,
                color: '#F2F2F5',
                margin: 0,
                lineHeight: 1.35,
                letterSpacing: '-0.02em',
              }}
            >
              {post.frontmatter.title}
            </h3>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(242,242,245,0.5)',
                lineHeight: 1.65,
                margin: 0,
                flexGrow: 1,
              }}
            >
              {post.frontmatter.excerpt}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
              <span style={{ fontSize: 11, color: 'rgba(242,242,245,0.3)', fontFamily: 'monospace' }}>
                {new Date(post.frontmatter.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
              <span style={{ fontSize: 11, color: 'rgba(242,242,245,0.3)' }}>{post.frontmatter.readingTime}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
