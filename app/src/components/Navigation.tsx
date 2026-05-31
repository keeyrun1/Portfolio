import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#footer' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['about', 'skills', 'experience', 'certifications', 'education', 'footer'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(11, 15, 26, 0.85)' : 'rgba(11, 15, 26, 0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(212, 168, 83, 0.1)',
        height: '72px',
      }}
    >
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between" style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          className="font-mono text-sm tracking-[0.1em] text-[#D4A853] hover:text-[#E5B86A] transition-colors duration-300"
          style={{ fontWeight: 500 }}
        >
          KIRAN P 
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="relative text-sm font-medium transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: isActive ? '#D4A853' : '#94A3B8',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#F1F5F9';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#94A3B8';
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: '#D4A853' }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X size={24} color="#F1F5F9" />
          ) : (
            <Menu size={24} color="#F1F5F9" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'rgba(11, 15, 26, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '24px clamp(24px, 5vw, 64px)',
          }}
        >
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="block py-3 text-base font-medium transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  color: isActive ? '#D4A853' : '#94A3B8',
                  borderBottom: '1px solid rgba(212, 168, 83, 0.05)',
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
