import { getPostBySlug } from '@/lib/mdx';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamicParams = true;

type Params = Promise<{ slug: string }>;

// Format date in technical style
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default async function BlogPost({ params }: { params: Params }) {
  const post = await getPostBySlug((await params).slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const formattedDate = formatDate(frontmatter.date);

  return (
    <div className="flex min-h-screen flex-col bg-paper paper-texture">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <article className="framer-container">
          <div className="mx-auto max-w-3xl">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted-foreground hover:text-ink transition-colors mb-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Log
            </Link>

            {/* Post header card */}
            <div className="bg-cream border-4 border-ink shadow-brutal mb-8">
              {/* Meta bar */}
              <div className="border-b-2 border-ink px-6 py-3 bg-cardboard flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {formattedDate}
                </span>
                <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {frontmatter.readingTime}
                </span>
              </div>

              {/* Title section */}
              <div className="p-6">
                <h1 className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold text-ink leading-tight mb-4">
                  {frontmatter.title}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 font-mono text-xs uppercase border border-ink bg-paper"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Post content */}
            <div className="prose prose-warm max-w-none">
              {content}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
