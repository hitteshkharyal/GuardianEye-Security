'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Monitoring', href: '#monitoring' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Products', href: '#products' },
  { label: 'Global', href: '#global' },
  { label: 'Process', href: '#process' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
      style={{
        background: scrolled
          ? 'rgba(5,5,5,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-3 group cursor-none"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div className="w-7 h-7 relative flex-shrink-0">
            <div className="absolute inset-0 border border-accent/70 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
            <div className="absolute inset-1 border border-accent/40 -rotate-45 group-hover:rotate-45 transition-transform duration-700" />
            <div className="absolute inset-2 bg-accent/30 rotate-45" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white font-space">GuardianEye</span>
            <span className="text-[0.6rem] tracking-[0.4em] uppercase text-accent/70 font-inter">Security</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="nav-link group relative"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+918000000000"
            className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase text-white/50 hover:text-accent transition-colors duration-300 font-inter cursor-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            24/7 Support
          </a>
          <button
            id="nav-book-btn"
            onClick={() => handleNavClick('#contact')}
            className="btn-primary text-xs hidden md:block"
          >
            Book Inspection
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden cursor-none p-2 flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-4 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-[360px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(20px)' }}
      >
        <div className="section-container py-6 space-y-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block text-left text-lg font-medium text-white/70 hover:text-accent transition-colors duration-300 w-full"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="btn-primary w-full text-center"
          >
            Book Free Inspection
          </button>
        </div>
      </div>
    </nav>
  );
}
