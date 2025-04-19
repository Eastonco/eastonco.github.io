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
              className="text-muted-foreground hover:text-foreground mb-8 flex items-center gap-2 text-sm"
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
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </Link>

            <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">{frontmatter.title}</h1>

            <div className="text-muted-foreground mb-8 flex flex-wrap gap-2 text-sm">
              <time dateTime={frontmatter.date}>{formattedDate}</time>
              <span>•</span>
              <span>{frontmatter.readingTime}</span>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {frontmatter.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-secondary/50 rounded-full px-2 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose dark:prose-invert prose-lg max-w-none">{content}</div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
