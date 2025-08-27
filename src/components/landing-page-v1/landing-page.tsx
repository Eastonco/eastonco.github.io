import Header from '../header';
import HeroSection from '../hero-section';
import AboutSection from '../about-section';
import BlogPreviewSection from '../blog-preview-section';
import ProjectsSection from '../projects-section';
import ContactSection from '../contact-section';
import Footer from '../footer';
import ScrollAnimations from '../ScrollAnimations';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      {/* Global background gradient that spans the entire page */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] z-0" />
      
      {/* Global animated decorative elements that flow across sections */}
      <motion.div 
        className="fixed -top-96 right-1/4 w-[800px] h-[800px] bg-gradient-to-r from-[#4f46e5]/10 to-[#8b5cf6]/5 rounded-full blur-3xl z-0"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="fixed top-1/3 -right-96 w-[900px] h-[900px] bg-gradient-to-r from-[#ec4899]/10 to-[#8b5cf6]/5 rounded-full blur-3xl z-0"
        animate={{
          x: [0, -30, 0],
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.12, 0.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="fixed -bottom-96 -left-32 w-[700px] h-[700px] bg-gradient-to-r from-[#0ea5e9]/10 to-[#22d3ee]/5 rounded-full blur-3xl z-0"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.08, 1],
          opacity: [0.1, 0.14, 0.1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
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
    </div>
  );
}
