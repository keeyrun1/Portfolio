import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const getYearsExperience = (startDate: string) => {
  const start = new Date(startDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const hasNotReachedAnniversary =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());
  if (hasNotReachedAnniversary) {
    years -= 1;
  }
  return Math.max(years, 0);
};

const YEARS_EXPERIENCE = getYearsExperience('2011-12-01');

const STATS = [
  { value: YEARS_EXPERIENCE, suffix: '+', label: 'Years Exp.' },
  { value: 2, suffix: '', label: 'Major Clients' },
  { value: 11, suffix: '', label: 'Apps Migrated' },
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
            Kiran Kumar Pasupuleti is an AI Automation Engineer, Technology Lead, and aspiring Engineering Manager with over <span className="text-[#D4A853] font-medium">{YEARS_EXPERIENCE}+ years</span> of experience delivering enterprise-grade software solutions across design, development, modernization, and production support. His background is rooted in Microsoft technologies, with strong expertise in C#, .NET, .NET Core, ASP.NET, Web API, SQL Server, Azure, and enterprise integration platforms, along with experience building scalable systems that support demanding business environments
          </p>
          <p className="font-body text-base leading-relaxed" style={{ color: '#94A3B8', lineHeight: 1.8, marginBottom: '20px' }}>
          Over the course of his career, he has worked on client/server and web-based N-tier applications, led teams across offshore and onsite models, and contributed to full software delivery lifecycles from requirement analysis through implementation and support. He has played a key role in large-scale initiatives including client merger transitions, migration of 11 applications to on-premises IAAS infrastructure, remediation of security vulnerabilities, and development of systems that process and monitor over 40 million real-time customer records
          </p>
          <p className="font-body text-base leading-relaxed" style={{ color: '#94A3B8', lineHeight: 1.8, marginBottom: '20px' }}>
          My experience in capital markets, trading risk, and mutual funds has helped build a strong understanding of business-critical systems where stability, performance, and accuracy matter deeply. In these environments, he has built .NET Core applications, real-time APIs, internal web platforms, Splunk dashboards, and automation-driven solutions that improve operational efficiency and support smarter business decisions
          </p>
          <p className="font-body text-base leading-relaxed" style={{ color: '#94A3B8', lineHeight: 1.8 }}>
          Alongside hands-on engineering, he has developed a strong leadership style centered on ownership, collaboration, and a client-first mindset. He has led code reviews, supported backlog grooming and Agile ceremonies, resolved technical issues across teams, and worked closely with business and delivery stakeholders to turn complex requirements into practical, maintainable solutions. What defines his work is a focus on smart execution: building systems that are not only functional, but secure, scalable, and efficient. He is especially interested in applying AI and automation to reduce repetitive work, improve engineering productivity, and help organizations modernize how they build and operate technology. Today, he is focused on opportunities where he can combine enterprise engineering experience with AI-driven automation, technical leadership, and people management to create meaningful business impact through practical innovation.
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
