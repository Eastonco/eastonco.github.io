import Image from "next/image";
import { Inter } from "next/font/google";
import ScrollAnimations from "./components/ScrollAnimations";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="portfolio-container">
      <header className="header-section">
        <div className="scroll-indicator">Scroll</div>
      </header>
      
      <section className="hero-section" id="hero">
        <div className="container">
          <h1 className="hero-title">Meet <span className="name">Your Name</span></h1>
          <div className="hero-content">
            <p className="hero-bio">
              I'm a hands-on designer, engineer, and business leader with 15 years building
              startups (2 exits) and leading at scale. I thrive at
              the intersection of 0→1 vision and high-impact execution. I've led
              cross-functional teams of up to 15, including engineers, designers, and researchers.
            </p>
            <div className="hero-images">
              <div className="image-container image1">
                <div className="placeholder-image">Graphic 1</div>
              </div>
              <div className="image-container image2">
                <div className="placeholder-image">Graphic 2</div>
              </div>
              <div className="image-container image3">
                <div className="placeholder-image">UX Design</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skills-section" id="skills">
        <div className="container">
          <div className="skills-wrapper">
            <div className="skills-group">
              <div className="skill-tag">Management</div>
              <div className="skill-tag">Product Strategy</div>
              <div className="skill-tag">Marketplace</div>
              <div className="skill-tag">Cloud Software</div>
              <div className="skill-tag">B2C</div>
            </div>
            
            <div className="skills-group">
              <div className="skill-tag">Social Software</div>
              <div className="skill-tag">iOS</div>
              <div className="skill-tag">Figma</div>
              <div className="skill-tag">Design Research</div>
              <div className="skill-tag">Azure</div>
            </div>
            
            <div className="skills-group">
              <div className="skill-tag">Firebase</div>
              <div className="skill-tag">Supabase</div>
              <div className="skill-tag">Next.js</div>
              <div className="skill-tag">C#</div>
              <div className="skill-tag">Management</div>
            </div>
          </div>
          
          <div className="experience-wrapper">
            <div className="experience-item">
              <h2 className="experience-years">15 yrs</h2>
              <p className="experience-title">Engineering</p>
            </div>
            
            <div className="experience-item">
              <h2 className="experience-years">12 yrs</h2>
              <p className="experience-title">Product Management</p>
            </div>
            
            <div className="experience-item">
              <h2 className="experience-years">12 yrs</h2>
              <p className="experience-title">Product Design</p>
            </div>
            
            <div className="experience-item">
              <h2 className="experience-years">8 yrs</h2>
              <p className="experience-title">Managing Teams</p>
            </div>
            
            <div className="experience-item">
              <h2 className="experience-years">7 yrs</h2>
              <p className="experience-title">UX Research</p>
            </div>
            
            <div className="experience-item">
              <h2 className="experience-years">3 yrs</h2>
              <p className="experience-title">iOS, Next.js, Supabase</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container">
          <h2 className="contact-title">See a way I can help you? Feel free to contact me.</h2>
          
          <div className="contact-details">
            <div className="location">Los Angeles, CA</div>
            
            <div className="contact-links">
              <a href="#" className="contact-link">Message me</a>
              <a href="#" className="contact-link">Book time</a>
              <a href="#" className="contact-link">Résumé</a>
            </div>
            
            <div className="social-links">
              <div className="social-label">DMs open</div>
              <div className="social-icons">
                <a href="#" className="social-icon">GitHub</a>
                <a href="#" className="social-icon">Instagram</a>
                <a href="#" className="social-icon">Twitter</a>
                <a href="#" className="social-icon">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="site-footer">
        <div className="container">
          <p>© 2025 — Your Name</p>
        </div>
      </footer>
      
      <div className="scroll-progress"></div>
    </div>
  );
}
