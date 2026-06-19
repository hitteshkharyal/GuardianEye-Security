'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Rajesh Kumar',
    title: 'Head of Security, Infosys Campus',
    rating: 5,
    quote: 'GuardianEye transformed our 22-acre campus security. The AI detection caught three unauthorized entries in the first week. Absolutely phenomenal ROI.',
    metric: '22 Acres',
    metricLabel: 'Secured',
    initials: 'RK',
    color: '#00D4FF',
  },
  {
    name: 'Sarah Mitchell',
    title: 'Operations Director, Pacific Mall',
    rating: 5,
    quote: 'Installation was flawless and the live monitoring dashboard is unlike anything we\'ve used before. Our shoplifting incidents dropped 68% in 3 months.',
    metric: '-68%',
    metricLabel: 'Shoplifting',
    initials: 'SM',
    color: '#4DF2FF',
  },
  {
    name: 'Ahmed Al-Rashid',
    title: 'VP Infrastructure, Al-Futtaim Group',
    rating: 5,
    quote: 'We deployed GuardianEye across 8 warehouse facilities. The thermal cameras caught a potential fire hazard at 3AM that would have cost us millions.',
    metric: '8',
    metricLabel: 'Facilities',
    initials: 'AA',
    color: '#00D4FF',
  },
  {
    name: 'Priya Nair',
    title: 'Principal, Delhi Public School',
    rating: 5,
    quote: 'The entire staff feels safer. The face recognition at our entrance identified an unauthorized visitor within seconds. The system paid for itself on day one.',
    metric: '100%',
    metricLabel: 'Staff Satisfaction',
    initials: 'PN',
    color: '#4DF2FF',
  },
  {
    name: 'Marcus Chen',
    title: 'CTO, SkyTech Manufacturing',
    rating: 5,
    quote: 'Integration with our existing ERP system was seamless. The API is exceptional. GuardianEye\'s technical team is world-class — true security engineers.',
    metric: '240+',
    metricLabel: 'Cameras Deployed',
    initials: 'MC',
    color: '#00D4FF',
  },
  {
    name: 'Fatima Al-Zaabi',
    title: 'Director, Dubai Health Authority',
    rating: 5,
    quote: 'HIPAA compliance was a non-negotiable. GuardianEye delivered a fully encrypted, zero-trust architecture that exceeded every regulatory requirement.',
    metric: 'HIPAA+',
    metricLabel: 'Compliant',
    initials: 'FZ',
    color: '#4DF2FF',
  },
];

const clientLogos = [
  'Infosys', 'Al-Futtaim', 'Reliance', 'DHA', 'Tata', 'Pacific Malls', 'SkyTech', 'ADNOC'
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (cards) {
      gsap.fromTo(
        Array.from(cards),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-bg-primary py-28 overflow-hidden"
      aria-label="Client Testimonials"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,212,255,0.03), transparent 70%)' }}
      />

      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-label">Client Stories</div>
          <h2 className="section-title">
            Trusted by the
            <span className="text-accent"> Best</span>
          </h2>
          <p className="section-subtitle">
            Over 5,000 installations. 98.3% client retention. Here's what they say.
          </p>
        </div>

        {/* Testimonial grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card cursor-none"
              data-cursor="hover"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, si) => (
                  <Star key={si} size={12} className="fill-accent text-accent" />
                ))}
              </div>

              <p
                className="text-sm text-white/60 font-inter mb-6"
                style={{ lineHeight: '1.75' }}
              >
                {t.quote}
              </p>

              {/* Metric highlight */}
              <div
                className="inline-flex items-baseline gap-1 px-3 py-1 mb-6"
                style={{ background: `${t.color}10`, border: `1px solid ${t.color}20` }}
              >
                <span className="text-xl font-bold font-space" style={{ color: t.color }}>{t.metric}</span>
                <span className="text-xs text-white/30 font-inter">{t.metricLabel}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/05">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-sm font-bold font-space"
                  style={{ background: `${t.color}15`, border: `1px solid ${t.color}30`, color: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/30 font-inter">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {[
            { val: '5000+', label: 'Installations Completed' },
            { val: '98.3%', label: 'Client Retention Rate' },
            { val: '4.9/5', label: 'Average Rating' },
            { val: '120+', label: 'Cities Covered' },
          ].map((s, i) => (
            <div key={i} className="glass p-7 text-center">
              <div className="stat-number text-4xl">{s.val}</div>
              <p className="text-xs text-white/35 font-inter mt-3 tracking-wide" style={{ lineHeight: '1.6' }}>{s.label}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Client logo marquee - Full Width */}
      <div className="mt-24 w-full">
        <p className="text-xs tracking-[0.3em] uppercase text-white/20 font-inter text-center mb-10">
          Trusted Partners
        </p>
        <div
          className="relative overflow-hidden w-full max-w-[1920px] mx-auto px-4 md:px-12"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          }}
        >
          <div
            ref={marqueeRef}
            className="flex gap-16 md:gap-24 items-center w-max"
            style={{ animation: 'marquee 40s linear infinite' }}
          >
            {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logo, i) => (
              <div key={i} className="flex-shrink-0 text-white/20 font-space font-bold text-lg md:text-xl tracking-widest hover:text-white/40 transition-colors duration-300">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
