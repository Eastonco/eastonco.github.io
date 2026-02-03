import Header from '@/components/header';
import Footer from '@/components/footer';
import { getAllPosts } from '@/lib/mdx';
import { AnimatedHeader, AnimatedBlogPreview } from './client-components';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex min-h-screen flex-col bg-paper paper-texture">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="framer-container flex flex-col items-center">
            <AnimatedHeader />

            <div className="space-y-6 w-full max-w-3xl">
              {posts.map((post, index) => (
                <AnimatedBlogPreview key={post.slug} index={index} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
