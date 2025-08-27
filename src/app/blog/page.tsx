import Header from '@/components/header';
import Footer from '@/components/footer';
import { getAllPosts } from '@/lib/mdx';
import { AnimatedHeader, AnimatedBlogPreview } from './client-components';
import { GlobalBackground } from '@/components/ui/animated-backgrounds';

// Format date to be more readable
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  // Fetch all blog posts from MDX files
  const posts = await getAllPosts();
  
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <GlobalBackground>
        <Header />
        <main className="flex-1 relative z-10">
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 flex flex-col items-center">
              <AnimatedHeader />

              {/* Filter by tags would go here in a real implementation */}

              <div className="space-y-12 w-full max-w-3xl">
                {posts.map((post, index) => {
                  // Format the date for display
                  const formattedPost = {
                    ...post,
                    frontmatter: {
                      ...post.frontmatter,
                      date: formatDate(post.frontmatter.date),
                    }
                  };
                  
                  return <AnimatedBlogPreview key={post.slug} index={index} post={formattedPost} />;
                })}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </GlobalBackground>
    </div>
  );
}
