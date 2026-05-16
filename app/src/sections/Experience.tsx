import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_DATA = [
  {
    id: 1,
    date: 'Dec 2016 — Present',
    role: 'Technology Lead',
    company: 'Infosys Limited',
    location: 'Canada',
    teamSize: 'Team Size: 9',
    responsibilities: [
      'Led SDLC for web-based intranet & Risk Monitoring Applications using .NET Core 2/3/6, C#, PCF, Harness',
      'Created Splunk Dashboards for portfolio overview and support analytics',
      'Orchestrated Agile Scrum ceremonies across offshore/onshore teams',
      'Performed code reviews and resolved critical technical issues',
      'Designed CSS templates and built full-stack web applications',
      'Migrated 11 applications from Physical servers to on-Premises IAAS servers',
    ],
    techStack: ['.NET Core', 'C#', 'Aerospike', 'Kafka', 'PCF', 'Splunk', 'DB2', 'SQL Server'],
    side: 'right',
  },
  {
    id: 2,
    date: 'Dec 2011 — Nov 2016',
    role: 'Associate',
    company: 'Cognizant Technology Solutions',
    location: 'Hyderabad, India',
    teamSize: '',
    responsibilities: [
      'Involved in complete SDLC: Planning, Analysis, Design, Development, Testing, Maintenance',
      'Practiced AGILE/SCRUM methodology with sprint planning and demos',
      'Developed business components using C# and migrated web services to WCF',
      'Configured WCF services on Windows Service and handled debugging',
      'Conducted unit testing, system testing, and production implementation',
    ],
    techStack: ['C#', 'ASP.NET', 'MVC', 'WCF', 'SQL Server', 'Entity Framework', 'JIRA', 'Git'],
    side: 'left',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Timeline items stagger entrance
      itemsRef.current.forEach((item, index) => {
        if (item) {
          const fromX = index % 2 === 0 ? -30 : 30;
          gsap.from(item, {
            x: fromX,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.2,
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative"
      style={{
        zIndex: 1,
        padding: '120px 0',
        background: 'rgba(11, 15, 26, 0.94)',
      }}
    >
      <div style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <div ref={headingRef} className="text-center mb-20">
            <span className="section-label">03 — JOURNEY</span>
            <h2
              className="font-display font-bold mt-4 mb-4"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                lineHeight: 1.2,
                color: '#F1F5F9',
                letterSpacing: '-0.02em',
              }}
            >
              Career Timeline
            </h2>
            <p
              className="font-body"
              style={{ fontSize: '16px', color: '#94A3B8' }}
            >
              A decade of leading enterprise transformation
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line - Hidden on mobile */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block"
              style={{
                background: 'linear-gradient(to bottom, #D4A853, #2DD4BF)',
              }}
            />

            {/* Timeline Items */}
            <div className="space-y-16">
              {EXPERIENCE_DATA.map((job, index) => (
                <div
                  key={job.id}
                  ref={(el) => { itemsRef.current[index] = el; }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node - Hidden on mobile */}
                  <div
                    className="absolute left-1/2 top-0 -translate-x-1/2 hidden md:block"
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      border: '3px solid #D4A853',
                      background: '#0B0F1A',
                      zIndex: 2,
                    }}
                  />

                  {/* Content */}
                  <div
                    className={`w-full md:w-[calc(50%-40px)] ${
                      index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'
                    }`}
                  >
                    {/* Date Badge */}
                    <span
                      className="inline-block font-mono mb-3"
                      style={{
                        fontSize: '12px',
                        color: '#2DD4BF',
                        background: 'rgba(45, 212, 191, 0.1)',
                        borderRadius: '6px',
                        padding: '4px 12px',
                      }}
                    >
                      {job.date}
                    </span>

                    {/* Card */}
                    <div className="glass-card p-6 md:p-8">
                      {/* Role */}
                      <h3
                        className="font-body"
                        style={{ fontSize: '20px', fontWeight: 700, color: '#F1F5F9' }}
                      >
                        {job.role}
                      </h3>

                      {/* Company */}
                      <p
                        className="font-body mt-1"
                        style={{ fontSize: '14px', fontWeight: 500, color: '#D4A853' }}
                      >
                        {job.company} — {job.location}
                      </p>

                      {/* Team Size */}
                      {job.teamSize && (
                        <p
                          className="font-mono mt-1"
                          style={{ fontSize: '12px', color: '#94A3B8' }}
                        >
                          {job.teamSize}
                        </p>
                      )}

                      {/* Responsibilities */}
                      <ul className="mt-4 space-y-2">
                        {job.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span
                              className="mt-2 flex-shrink-0"
                              style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#D4A853',
                              }}
                            />
                            <span
                              className="font-body"
                              style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.8 }}
                            >
                              {resp}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(212, 168, 83, 0.1)' }}>
                        {job.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono"
                            style={{
                              fontSize: '10px',
                              color: '#2DD4BF',
                              background: 'rgba(45, 212, 191, 0.08)',
                              border: '1px solid rgba(45, 212, 191, 0.15)',
                              borderRadius: '6px',
                              padding: '4px 10px',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
