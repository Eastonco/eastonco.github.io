import Header from './components/header';
import HeroSection from './components/hero-section';
import AboutSection from './components/about-section';
import BlogPreviewSection from './components/blog-preview-section';
import ProjectsSection from './components/projects-section';
import ContactSection from './components/contact-section';
import Footer from './components/footer';
import ScrollAnimations from '../ScrollAnimations';
import { GlobalBackground } from '../ui/animated-backgrounds';

export default async function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <GlobalBackground>
        <ScrollAnimations />
        <Header />
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <BlogPreviewSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </GlobalBackground>
    </div>
  );
}
