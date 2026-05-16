import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, TrendingUp, Cloud } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CERTS = [
  {
    icon: Trophy,
    title: 'Associate Cloud Engineer',
    issuer: 'Google Cloud',
    issued: 'Jan 2024',
    expires: 'Jan 2027',
    credentialId: '91531373',
  },
  {
    icon: Cloud,
    title: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    issued: 'Jun 2023',
  },
  {
    icon: Trophy,
    title: 'AZ-900: Microsoft Azure Fundamentals',
    issuer: 'Infosys',
    issued: 'Mar 2023',
    credentialId: 'OV5HKOIWPR',
  },
  {
    icon: TrendingUp,
    title: 'Financial Services Capital Markets',
    issuer: 'Infosys',
    issued: 'Oct 2020',
    credentialId: 'JGGRMJ009D',
  },
  {
    icon: Trophy,
    title: 'Agile Scrum in Practice',
    issuer: 'Infosys',
    issued: 'Sep 2018',
    credentialId: '4DFEXJEW8F',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Cards stagger entrance with scale
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.from(cards, {
          scale: 0.95,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.12,
          immediateRender: false,
          scrollTrigger: {
            trigger: cardsRef.current,
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
      id="certifications"
      ref={sectionRef}
      className="relative"
      style={{
        zIndex: 1,
        padding: '120px 0',
        background: 'rgba(17, 24, 39, 0.92)',
      }}
    >
      <div style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div ref={headingRef} className="text-center mb-16">
            <span className="section-label">04 — CREDENTIALS</span>
            <h2
              className="font-display font-bold mt-4 mb-4"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                lineHeight: 1.2,
                color: '#F1F5F9',
                letterSpacing: '-0.02em',
              }}
            >
              Certifications
            </h2>
            <p
              className="font-body"
              style={{ fontSize: '16px', color: '#FFFFFF' }}
            >
              Industry-recognized validations of expertise
            </p>
          </div>

          {/* Certs Grid */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {CERTS.map((cert) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.title}
                  className="p-10 text-center transition-all duration-400"
                  style={{
                    background: 'rgba(30, 41, 59, 0.96)',
                    border: '1px solid rgba(212, 168, 83, 0.25)',
                    borderRadius: '16px',
                    boxShadow: '0 24px 70px rgba(0, 0, 0, 0.3)',
                    minHeight: '240px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div className="flex justify-center">
                    <Icon size={32} color="#D4A853" />
                  </div>
                  <h3
                    className="font-body mt-5"
                    style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF' }}
                  >
                    {cert.title}
                  </h3>
                  <p
                    className="font-body mt-2"
                    style={{ fontSize: '14px', fontWeight: 400, color: '#CBD5E1' }}
                  >
                    {cert.issuer}
                  </p>
                  {cert.issued ? (
                    <p
                      className="font-body mt-1"
                      style={{ fontSize: '13px', color: '#CBD5E1' }}
                    >
                      Issued {cert.issued}
                      {cert.expires ? ` · Expires ${cert.expires}` : ''}
                    </p>
                  ) : null}
                  {cert.credentialId ? (
                    <p
                      className="font-body mt-1"
                      style={{ fontSize: '13px', color: '#E2E8F0' }}
                    >
                      Credential ID: {cert.credentialId}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
