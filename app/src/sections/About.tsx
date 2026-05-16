import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 13, suffix: '+', label: 'Years Exp.' },
  { value: 2, suffix: '', label: 'Major Clients' },
  { value: 11, suffix: '', label: 'Apps Migrated' },
  { value: 400, suffix: '+', label: 'Vulns Fixed' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column entrance
      if (leftRef.current) {
        gsap.from(leftRef.current, {
          x: -40,
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

      // Right column entrance
      if (rightRef.current) {
        gsap.from(rightRef.current, {
          x: 40,
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

      // Stats counter animation
      if (statsRef.current) {
        const statElements = statsRef.current.querySelectorAll('.stat-number');
        statElements.forEach((el) => {
          const target = parseInt(el.getAttribute('data-value') || '0', 10);
          const proxy = { value: 0 };
          gsap.to(proxy, {
            value: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
            onUpdate: () => {
              el.textContent = Math.floor(proxy.value).toString();
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative"
      style={{
        zIndex: 1,
        padding: '120px 0',
        background: 'radial-gradient(ellipse at center, rgba(17, 24, 39, 0.95) 0%, rgba(11, 15, 26, 0.9) 100%)',
      }}
    >
      <div
        className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        style={{ padding: '0 clamp(24px, 5vw, 64px)' }}
      >
        {/* Left Column */}
        <div ref={leftRef} className="lg:col-span-5">
          <span className="section-label">01 — ABOUT</span>
          <h2
            className="font-display font-bold mt-4"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 1.2,
              color: '#F1F5F9',
              letterSpacing: '-0.02em',
            }}
          >
            Architecting Solutions That Scale
          </h2>
        </div>

        {/* Right Column */}
        <div ref={rightRef} className="lg:col-span-7">
          <p className="font-body text-base leading-relaxed" style={{ color: '#94A3B8', lineHeight: 1.8, marginBottom: '20px' }}>
            Around <span className="text-[#D4A853] font-medium">13+ Years</span> of professional IT Experience (Offshore and onsite) in Analysis, Design, Development, Testing, and Implementation of Client/Server and Web-based N-tier architecture systems using Microsoft Technologies. Played a crucial role during the transition of our client merger over a period of 2 years and was awarded <span className="text-[#D4A853] font-medium">Most Trusted Partner</span> from Client.
          </p>
          <p className="font-body text-base leading-relaxed" style={{ color: '#94A3B8', lineHeight: 1.8, marginBottom: '20px' }}>
            Developed .Net/C# based windows applications that connect to external restful APIs, DB2/SQL Server, Aerospike (NoSQL) database to monitor <span className="text-[#D4A853] font-medium">20 million+</span> real time customer data and generate automated business cases in Pega. Built multiple .Net Core applications to enhance operations by applying core business logic and assistance in production support.
          </p>
          <p className="font-body text-base leading-relaxed" style={{ color: '#94A3B8', lineHeight: 1.8 }}>
            Project Lead to remediate <span className="text-[#D4A853] font-medium">400+</span> application vulnerabilities and security flaws using Veracode and SonarQube to build maintainable, secure and robust applications. Expertise in developing User Controls and Custom Controls using C#, with experience in translating visual and written designs into efficient back-end libraries and Front-end Components.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-12">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="flex items-baseline justify-center sm:justify-start">
                  <span
                    className="stat-number font-display"
                    data-value={stat.value}
                    style={{ fontSize: '36px', color: '#D4A853', fontWeight: 700, lineHeight: 1 }}
                  >
                    0
                  </span>
                  <span className="font-display" style={{ fontSize: '36px', color: '#D4A853', fontWeight: 700 }}>
                    {stat.suffix}
                  </span>
                </div>
                <span
                  className="font-body block mt-1"
                  style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 400 }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
