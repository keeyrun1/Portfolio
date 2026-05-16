import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative"
      style={{
        zIndex: 1,
        padding: '120px 0',
        background: 'rgba(11, 15, 26, 0.94)',
      }}
    >
      <div style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="section-label">05 — EDUCATION</span>
            <h2
              className="font-display font-bold mt-4"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                lineHeight: 1.2,
                color: '#F1F5F9',
                letterSpacing: '-0.02em',
              }}
            >
              Academic Foundation
            </h2>
          </div>

          {/* Education Card */}
          <div
            ref={cardRef}
            className="text-center mx-auto"
            style={{
              maxWidth: '700px',
              background: 'rgba(17, 24, 39, 0.7)',
              border: '1px solid rgba(212, 168, 83, 0.15)',
              borderRadius: '20px',
              padding: '48px',
            }}
          >
            <div className="flex justify-center">
              <GraduationCap size={48} color="#D4A853" />
            </div>

            <h3
              className="font-display mt-5"
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#F1F5F9',
              }}
            >
              Bachelor of Technology
            </h3>

            <p
              className="font-body mt-2"
              style={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#2DD4BF',
              }}
            >
              Computer Science Engineering
            </p>

            <p
              className="font-body mt-3"
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#94A3B8',
              }}
            >
              Jawaharlal Nehru Technological University, Hyderabad
            </p>

            <span
              className="inline-block font-mono mt-4"
              style={{
                fontSize: '14px',
                color: '#D4A853',
                background: 'rgba(212, 168, 83, 0.1)',
                borderRadius: '6px',
                padding: '4px 16px',
              }}
            >
              2011
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
