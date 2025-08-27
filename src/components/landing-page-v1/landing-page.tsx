import Header from '../header';
import HeroSection from '../hero-section';
import AboutSection from '../about-section';
import BlogPreviewSection from '../blog-preview-section';
import ProjectsSection from '../projects-section';
import ContactSection from '../contact-section';
import Footer from '../footer';
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
