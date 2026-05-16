import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Layers, Database, Cloud, MessageSquare, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    icon: Code2,
    name: 'Languages',
    skills: ['C#.NET', 'ASP.NET', 'JavaScript', 'HTML', 'CSS', 'XML'],
  },
  {
    icon: Layers,
    name: 'Frameworks',
    skills: ['.NET Core 2/3/6', '.NET Framework 4.0/4.6/5/6', 'ASP.NET MVC', 'Angular', 'React', 'jQuery', 'WCF'],
  },
  {
    icon: Database,
    name: 'Databases',
    skills: ['SQL Server 2016/2012/2008', 'DB2', 'Aerospike (NoSQL)'],
  },
  {
    icon: Cloud,
    name: 'Cloud & DevOps',
    skills: ['Microsoft Azure', 'PCF', 'IIS 5.0/6.0/7.0', 'Harness', 'IAAS'],
  },
  {
    icon: MessageSquare,
    name: 'Messaging & Data',
    skills: ['IBM MQ', 'Apache Kafka', 'RESTful APIs', 'Web Services', 'Web API'],
  },
  {
    icon: Wrench,
    name: 'Tools & Practices',
    skills: ['GitHub', 'Bitbucket', 'TFS', 'Bamboo', 'JIRA', 'Confluence', 'Splunk', 'Veracode', 'SonarQube', 'SCRUM', 'Agile'],
  },
];

export default function Skills() {
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
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Cards stagger entrance
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
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
      id="skills"
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
          <div ref={headingRef}>
            <span className="section-label">02 — EXPERTISE</span>
            <h2
              className="font-display font-bold mt-4 mb-4"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                lineHeight: 1.2,
                color: '#F1F5F9',
                letterSpacing: '-0.02em',
              }}
            >
              Technical Arsenal
            </h2>
            <p
              className="font-body mb-16"
              style={{ fontSize: '16px', color: '#94A3B8' }}
            >
              Technologies and tools mastered over 13+ years of enterprise development
            </p>
          </div>

          {/* Skills Grid */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SKILL_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className="glass-card p-8"
                >
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(212, 168, 83, 0.1)',
                    }}
                  >
                    <Icon size={24} color="#D4A853" />
                  </div>

                  {/* Category Name */}
                  <h3
                    className="font-body mt-4"
                    style={{ fontSize: '16px', fontWeight: 600, color: '#F1F5F9' }}
                  >
                    {category.name}
                  </h3>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono"
                        style={{
                          fontSize: '12px',
                          color: '#2DD4BF',
                          background: 'rgba(45, 212, 191, 0.08)',
                          border: '1px solid rgba(45, 212, 191, 0.15)',
                          borderRadius: '6px',
                          padding: '6px 12px',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
