import Header from '../header';
import HeroSection from '../hero-section';
import AboutSection from '../about-section';
import BlogPreviewSection from '../blog-preview-section';
import ProjectsSection from '../projects-section';
import ContactSection from '../contact-section';
import Footer from '../footer';

export default async function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper paper-texture">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <BlogPreviewSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
