import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Badge fade in
    if (badgeRef.current) {
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    }

    // Name character animation
    if (nameRef.current) {
      const text = nameRef.current.textContent || '';
      nameRef.current.innerHTML = '';
      const chars = text.split('');
      chars.forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        nameRef.current!.appendChild(span);
      });

      tl.to(nameRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.03,
      }, '-=0.3');
    }

    // Subtitle
    if (subtitleRef.current) {
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4');
    }

    // Contact row
    if (contactRef.current) {
      tl.to(contactRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3');
    }

    // CTA buttons
    if (ctaRef.current) {
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3');
    }

    // Scroll indicator
    if (scrollIndicatorRef.current) {
      tl.to(scrollIndicatorRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.2');
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen"
      style={{ zIndex: 1 }}
    >
      <div className="text-center px-6">
        {/* Role Badge */}
        <div
          ref={badgeRef}
          className="inline-block opacity-0"
          style={{ transform: 'translateY(20px)' }}
        >
          <span
            className="inline-block font-mono uppercase"
            style={{
              fontSize: '12px',
              letterSpacing: '0.1em',
              color: '#2DD4BF',
              background: 'rgba(45, 212, 191, 0.1)',
              border: '1px solid rgba(45, 212, 191, 0.3)',
              borderRadius: '9999px',
              padding: '6px 16px',
              fontWeight: 500,
            }}
          >
            .NET TECHNOLOGY LEAD
          </span>
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="font-display font-bold mt-6"
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            lineHeight: 1.1,
            color: '#F1F5F9',
            letterSpacing: '-0.02em',
            textShadow: '0 2px 40px rgba(0, 0, 0, 0.6)',
          }}
        >
          Kiran Kumar Pasupuleti
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body opacity-0"
          style={{
            fontSize: '18px',
            fontWeight: 400,
            color: '#94A3B8',
            marginTop: '16px',
            transform: 'translateY(20px)',
          }}
        >
          I build AI-enabled enterprise platforms, release readiness automation, and cloud-integrated .NET systems that unify legacy architecture and accelerate business consolidation.
        </p>

        {/* Contact Row */}
        <div
          ref={contactRef}
          className="flex flex-wrap items-center justify-center gap-6 opacity-0"
          style={{
            marginTop: '32px',
            transform: 'translateY(20px)',
          }}
        >
          <a
            href="mailto:KEEYRUN@outlook.com"
            className="flex items-center gap-2 font-medium text-sm transition-colors duration-300 hover:text-[#D4A853]"
            style={{ color: '#94A3B8', fontSize: '14px', fontWeight: 500 }}
          >
            <Mail size={16} color="#D4A853" />
            KEEYRUN@outlook.com
          </a>
          <a
            href="tel:+15879693881"
            className="flex items-center gap-2 font-medium text-sm transition-colors duration-300 hover:text-[#D4A853]"
            style={{ color: '#94A3B8', fontSize: '14px', fontWeight: 500 }}
          >
            <Phone size={16} color="#D4A853" />
            +1 587-969-3881
          </a>
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4 opacity-0"
          style={{
            marginTop: '40px',
            transform: 'translateY(20px)',
          }}
        >
          <a
            href="#experience"
            onClick={(e) => handleNavClick(e, '#experience')}
            className="inline-block font-semibold text-sm transition-all duration-300"
            style={{
              background: '#D4A853',
              color: '#0B0F1A',
              padding: '14px 32px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E5B86A';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(212, 168, 83, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#D4A853';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            View Experience
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="inline-block font-semibold text-sm transition-all duration-300"
            style={{
              background: 'transparent',
              color: '#F1F5F9',
              border: '1px solid rgba(241, 245, 249, 0.2)',
              padding: '14px 32px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#D4A853';
              e.currentTarget.style.color = '#D4A853';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(241, 245, 249, 0.2)';
              e.currentTarget.style.color = '#F1F5F9';
            }}
          >
            About Me
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className="relative overflow-hidden"
            style={{ width: '1px', height: '24px', backgroundColor: 'rgba(241, 245, 249, 0.3)' }}
          >
            <div
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: 'rgba(241, 245, 249, 0.6)',
                left: '0',
                animation: 'scrollPulse 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0% { top: 0; opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { top: 24px; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
