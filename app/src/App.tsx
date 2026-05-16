import { useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import Footer from './sections/Footer';

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    let lenis: any = null;

    async function initLenis() {
      try {
        const Lenis = (await import('lenis')).default;
        lenis = new Lenis({
          lerp: 0.08,
          duration: 1.2,
          smoothWheel: true,
        });

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return lenis;
      } catch (err) {
        console.warn('Lenis failed to load, using native scroll');
        return null;
      }
    }

    initLenis();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: '#0B0F1A' }}>
      {/* Particle Canvas Background */}
      <ParticleCanvas />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Certifications />
        <Education />
        <Footer />
      </main>
    </div>
  );
}
