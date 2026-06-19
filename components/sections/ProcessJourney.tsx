'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MessageSquare, MapPin, ClipboardList, Wrench, CheckCircle2, Users, Headphones
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    icon: MessageSquare,
    title: 'Consultation',
    desc: 'Free discovery call with our security specialists to understand your specific needs and objectives.',
    duration: '1 Day',
    color: '#00D4FF',
  },
  {
    num: '02',
    icon: MapPin,
    title: 'Site Survey',
    desc: 'On-site assessment by our certified engineers to identify vulnerabilities and optimal camera positions.',
    duration: '2–3 Days',
    color: '#4DF2FF',
  },
  {
    num: '03',
    icon: ClipboardList,
    title: 'Security Plan',
    desc: 'Custom security architecture blueprint with camera types, network topology, and coverage maps.',
    duration: '1–2 Days',
    color: '#00D4FF',
  },
  {
    num: '04',
    icon: Wrench,
    title: 'Installation',
    desc: 'Professional installation by certified technicians. Minimal disruption with clean cable management.',
    duration: '1–3 Days',
    color: '#4DF2FF',
  },
  {
    num: '05',
    icon: CheckCircle2,
    title: 'Testing & QA',
    desc: 'Rigorous system testing across all cameras, network connections, recording, and alert systems.',
    duration: '1 Day',
    color: '#00D4FF',
  },
  {
    num: '06',
    icon: Users,
    title: 'Staff Training',
    desc: 'Complete training for your team on system operation, monitoring interface, and incident response.',
    duration: 'Half Day',
    color: '#4DF2FF',
  },
  {
    num: '07',
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Ongoing remote monitoring, maintenance, software updates, and round-the-clock technical support.',
    duration: 'Ongoing',
    color: '#00D4FF',
  },
];

export default function ProcessJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    // Animate SVG path draw
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1,
      },
    });

    // Animate each step
    stepsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          delay: i * 0.05,
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-bg-secondary py-24 lg:py-28 overflow-hidden"
      aria-label="Installation Process"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-label">Our Process</div>
          <h2 className="section-title">
            From Quote to
            <br />
            <span className="text-accent">Operation</span>
          </h2>
          <p className="section-subtitle">
            A seamless 7-step journey from initial consultation to a fully operational security network.
          </p>
        </div>

        {/* SVG connecting path (desktop) */}
        <div className="hidden lg:block absolute left-[8.5rem] top-72 bottom-28 w-1 pointer-events-none">
          <svg
            width="2"
            height="100%"
            className="absolute inset-0"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M 1 0 L 1 1000"
              stroke="url(#pathGrad)"
              strokeWidth="1.5"
              fill="none"
            />
            <defs>
              <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                ref={(el) => { stepsRef.current[i] = el; }}
                className="flex gap-6 lg:gap-12 items-start group opacity-0"
              >
                {/* Step marker */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div
                    className="w-14 h-14 flex items-center justify-center relative z-10 transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `rgba(0,212,255,0.08)`,
                      border: `1px solid ${step.color}40`,
                      boxShadow: `0 0 20px ${step.color}20`,
                    }}
                  >
                    <Icon size={20} className="text-accent" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="lg:hidden w-px h-12 bg-gradient-to-b from-accent/30 to-transparent" />
                  )}
                </div>

                {/* Content */}
                <div
                  className="flex-1 glass p-6 lg:p-8 group-hover:border-accent/20 transition-all duration-500"
                  style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                >
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[0.65rem] font-inter tracking-[0.3em] text-accent/60">{step.num}</span>
                        <div className="h-px w-6 bg-accent/20" />
                        <span className="text-[0.65rem] font-inter tracking-widest text-white/20 uppercase">
                          {step.duration}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-space text-white group-hover:text-accent transition-colors duration-300 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-white/40 font-inter leading-relaxed max-w-xl">
                        {step.desc}
                      </p>
                    </div>
                    <div
                      className="text-5xl font-bold font-space opacity-5 group-hover:opacity-10 transition-opacity duration-500 flex-shrink-0"
                      style={{ color: step.color }}
                    >
                      {step.num}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline summary */}
        <div className="mt-16 glass-accent p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs text-accent/60 font-inter tracking-widest uppercase mb-2" style={{ lineHeight: '1.6' }}>Total Timeline</p>
            <p className="text-4xl font-bold text-white font-space">5&#8211;10 <span className="text-accent">Days</span></p>
            <p className="text-sm text-white/40 font-inter mt-2" style={{ lineHeight: '1.7' }}>From first call to live monitoring</p>
          </div>
          <div className="flex gap-10 flex-wrap justify-center">
            {[
              { val: '500+', label: 'Projects/Year' },
              { val: '4.9★', label: 'Client Rating' },
              { val: '100%', label: 'Satisfaction' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-accent font-space">{s.val}</div>
                <div className="text-xs text-white/30 font-inter mt-1.5" style={{ lineHeight: '1.6' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <button
            id="process-cta-btn"
            className="btn-primary"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}
