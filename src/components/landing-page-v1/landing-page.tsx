import Header from "../header";
import HeroSection from "../hero-section";
import AboutSection from "../about-section";
import BlogPreviewSection from "../blog-preview-section";
import ProjectsSection from "../projects-section";
import ContactSection from "../contact-section";
import Footer from "../footer";
import ScrollAnimations from "../ScrollAnimations";

export default function LandingPage() {
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
