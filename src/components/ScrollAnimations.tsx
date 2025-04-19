'use client';
import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    // Progress bar at the top of the page
    const updateScrollProgress = () => {
      const scrollProgress = document.querySelector('.scroll-progress') as HTMLElement;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;

      if (scrollProgress) {
        scrollProgress.style.width = `${progress}%`;
      }
    };

    // Intersection Observer for fade-up animations
    const observeElements = () => {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll('.skills-group, .experience-item').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
      });
    };

    // Initialize animations
    updateScrollProgress();
    observeElements();

    // Event listeners
    window.addEventListener('scroll', updateScrollProgress);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return null;
}
