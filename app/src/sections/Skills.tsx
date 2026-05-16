import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Layers, Database, Cloud, MessageSquare, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    icon: Code2,
    name: 'Languages',
    skills: ['C#', '.NET', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    icon: Layers,
    name: 'Frameworks',
    skills: ['.NET 7/8', 'ASP.NET Core', 'Entity Framework', 'ML.NET', 'React', 'Angular', 'WPF'],
  },
  {
    icon: Database,
    name: 'Databases',
    skills: ['SQL Server', 'DB2', 'Aerospike', 'PostgreSQL', 'Cosmos DB'],
  },
  {
    icon: Cloud,
    name: 'Cloud & DevOps',
    skills: ['Microsoft Azure', 'GitHub Actions', 'Docker', 'Kubernetes', 'PCF', 'Harness', 'Apache Kafka', 'IBM MQ'],
  },
  {
    icon: MessageSquare,
    name: 'AI & Automation',
    skills: ['AI Agents', 'Release Readiness', 'LLM Integration', 'Automation Workflows', 'Prompt Engineering'],
  },
  {
    icon: Wrench,
    name: 'Tools & Practices',
    skills: ['GitHub', 'GitHub Actions', 'GitHub Workflows', 'Bamboo', 'Jira', 'Azure DevOps', 'SonarQube', 'Veracode', 'Splunk', 'SCRUM', 'Agile'],
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
          immediateRender: false,
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
              className="font-body mb-6"
              style={{ fontSize: '16px', color: '#E2E8F0' }}
            >
              AI engineering, enterprise integration, release readiness automation, and modern .NET/C# stack experience across DB2, Aerospike, SQL, and cloud platforms.
            </p>
            <div className="mb-14">
              <p className="font-body mb-3" style={{ fontSize: '15px', color: '#CBD5E1' }}>
                Key strengths included in this portfolio:
              </p>
              <ul className="list-disc ml-6 space-y-3" style={{ color: '#CBD5E1', fontSize: '15px' }}>
                <li>Building AI agents for release readiness, automation, and enterprise workflows.</li>
                <li>Standardizing integrations across legacy systems, APIs, and messaging platforms.</li>
                <li>Driving CI/CD with GitHub Actions, GitHub Workflows, Bamboo, Docker, and Kubernetes.</li>
                <li>Monitoring and operational insight with Splunk, Jira, Kafka, MQ, and cloud observability.</li>
              </ul>
            </div>
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
                  style={{ minHeight: '220px', background: 'rgba(30, 41, 59, 0.92)', border: '1px solid rgba(212, 168, 83, 0.18)' }}
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
