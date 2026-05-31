import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, ExternalLink } from 'lucide-react';

const DEFAULT_VIEW_COUNT = 15432;
const STORAGE_KEY = 'portfolio_view_count';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [viewCount, setViewCount] = useState<number>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_VIEW_COUNT;
    }
    const storedCount = Number(localStorage.getItem(STORAGE_KEY));
    return Number.isInteger(storedCount) && storedCount > 0 ? storedCount : DEFAULT_VIEW_COUNT;
  });

  useEffect(() => {
    const storedCount = Number(localStorage.getItem(STORAGE_KEY));
    const nextCount = Number.isInteger(storedCount) && storedCount > 0 ? storedCount + 1 : DEFAULT_VIEW_COUNT + 1;
    localStorage.setItem(STORAGE_KEY, String(nextCount));
    setViewCount(nextCount);

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
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
    <footer
      id="footer"
      ref={sectionRef}
      className="relative"
      style={{
        zIndex: 1,
        background: '#0B0F1A',
        padding: '80px 0 40px',
      }}
    >
      <div style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>
        <div ref={contentRef} className="max-w-[1200px] mx-auto">
          {/* Top Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <h2
              className="font-display text-center md:text-left"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                fontWeight: 700,
                color: '#F1F5F9',
                lineHeight: 1.2,
              }}
            >
              Let's Build Something Great
            </h2>

            <a
              href="mailto:KEEYRUN@outlook.com"
              className="inline-flex items-center gap-2 font-semibold text-sm transition-all duration-300 whitespace-nowrap"
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
              Get In Touch
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Divider */}
          <div
            className="my-12"
            style={{ height: '1px', background: 'rgba(212, 168, 83, 0.1)' }}
          />

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Name */}
            <span
              className="font-body"
              style={{ fontSize: '14px', fontWeight: 500, color: '#94A3B8' }}
            >
              Kiran Kumar Pasupuleti
            </span>

            

            {/* Contact Links */}
            <div className="flex items-center gap-6">
              <a
                href="mailto:KEEYRUN@outlook.com"
                className="flex items-center gap-2 font-body transition-colors duration-300 hover:text-[#D4A853]"
                style={{ fontSize: '14px', fontWeight: 400, color: '#94A3B8' }}
              >
                <Mail size={14} />
                KEEYRUN@outlook.com
              </a>
              <a
                href="tel:+919030363881"
                className="flex items-center gap-2 font-body transition-colors duration-300 hover:text-[#D4A853]"
                style={{ fontSize: '14px', fontWeight: 400, color: '#94A3B8' }}
              >
                <Phone size={14} />
                India: +91-9030363881
              </a>
              <a
                href="tel:+15879693881"
                className="flex items-center gap-2 font-body transition-colors duration-300 hover:text-[#D4A853]"
                style={{ fontSize: '14px', fontWeight: 400, color: '#94A3B8' }}
              >
                <Phone size={14} />
                Canada: +1 587-969-3881
              </a>
            </div>

            {/* Copyright */}
            <span
              className="font-body"
              style={{ fontSize: '12px', fontWeight: 400, color: '#64748B' }}
            >
              {new Date().getFullYear()} All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
