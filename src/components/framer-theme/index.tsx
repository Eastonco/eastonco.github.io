'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import Background from './Background';
import Nav from './Nav';
import HeroSection from './HeroSection';
import BentoSection from './BentoSection';
import SkillsSection from './SkillsSection';
import WorkSection from './WorkSection';
import BlogSection from './BlogSection';
import MCPSection from './MCPSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

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

export default function FramerTheme({ posts }: { posts: Post[] }) {
  useScrollReveal();

  return (
    <div
      style={{
        background: '#0A0A0E',
        color: '#F2F2F5',
        minHeight: '100vh',
        fontFamily: 'var(--font-body)',
        overflowX: 'hidden',
      }}
    >
      <Background />
      <Nav />
      <HeroSection />
      <BentoSection />
      <SkillsSection />
      <WorkSection />
      <BlogSection posts={posts} />
      <ContactSection />
      <MCPSection />
      <Footer />
    </div>
  );
}
