import { getPostBySlug } from '@/lib/mdx';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';

export const dynamicParams = true;

type Params = Promise<{ slug: string }>;

export default async function BlogPost({ params }: { params: Params }) {
  const post = await getPostBySlug((await params).slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const formattedDate = format(new Date(frontmatter.date), 'MMMM d, yyyy');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <article className="framer-container">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground mb-8 flex items-center gap-2 text-sm transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:-translate-x-1"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </Link>
            
            <div className="mb-12 rounded-xl border border-border bg-card/40 dark:bg-card/20 backdrop-blur-sm p-8 shadow-sm dark:shadow-md dark:shadow-black/10">
              <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl text-foreground">{frontmatter.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <time dateTime={frontmatter.date}>{formattedDate}</time>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{frontmatter.readingTime}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {frontmatter.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-border bg-background dark:bg-secondary/30 px-3 py-1 text-xs font-medium text-foreground/90 shadow-sm transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/30 cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-p:text-base prose-a:text-blue-600 dark:prose-a:text-blue-400">{content}</div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
