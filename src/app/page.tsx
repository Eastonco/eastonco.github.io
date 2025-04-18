import Header from "./components/header";
import HeroSection from "./components/hero-section";
import AboutSection from "./components/about-section";
import BlogPreviewSection from "./components/blog-preview-section";
import ProjectsSection from "./components/projects-section";
import ContactSection from "./components/contact-section";
import Footer from "./components/footer";
import ScrollAnimations from "./components/ScrollAnimations";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollAnimations />
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
