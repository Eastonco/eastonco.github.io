import { getPostBySlug } from "@/app/lib/mdx";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";

export const dynamicParams = true;

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  const { frontmatter, content } = post;
  const formattedDate = format(new Date(frontmatter.date), 'MMMM d, yyyy');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <article className="framer-container">
          <div className="max-w-3xl mx-auto">
            <Link 
              href="/blog" 
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 mb-8"
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
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {frontmatter.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-8">
              <time dateTime={frontmatter.date}>{formattedDate}</time>
              <span>•</span>
              <span>{frontmatter.readingTime}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {frontmatter.tags.map((tag: string) => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-secondary/50 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="prose dark:prose-invert prose-lg max-w-none">
              {content}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
