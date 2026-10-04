import FramerTheme from '@/components/framer-theme';
import { getAllPosts } from '@/lib/content/blog';

export default async function FramerThemePage() {
  const posts = (await getAllPosts()).slice(0, 3);
  return <FramerTheme posts={posts} />;
}
