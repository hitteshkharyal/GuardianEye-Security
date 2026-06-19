'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Home, Building2, Warehouse, Factory, Heart, GraduationCap, ShoppingBag, Landmark
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    icon: Home,
    name: 'Residential',
    problem: 'Home break-ins and package theft on the rise',
    solution: 'Smart home CCTV with mobile alerts and AI face recognition',
    metric: '94%',
    metricLabel: 'Reduction in incidents',
    tags: ['AI Detection', 'Mobile App', '4K Quality'],
  },
  {
    icon: Building2,
    name: 'Commercial',
    problem: 'Employee safety and asset protection across floors',
    solution: 'Enterprise-grade surveillance with centralized monitoring dashboard',
    metric: '360°',
    metricLabel: 'Coverage guaranteed',
    tags: ['Multi-Floor', 'Access Control', 'Cloud DVR'],
  },
  {
    icon: Warehouse,
    name: 'Warehouses',
    problem: 'Inventory theft and unauthorized access in large facilities',
    solution: 'Long-range cameras with license plate recognition at entry points',
    metric: '500m',
    metricLabel: 'Detection range',
    tags: ['LPR', 'Thermal', 'Night Vision'],
  },
  {
    icon: Factory,
    name: 'Factories',
    problem: 'Worker safety compliance and machinery monitoring',
    solution: 'Heat detection cameras with PPE compliance AI and incident logging',
    metric: '98.7%',
    metricLabel: 'Safety compliance rate',
    tags: ['Thermal', 'PPE AI', 'HAZMAT'],
  },
  {
    icon: Heart,
    name: 'Hospitals',
    problem: 'Patient safety, restricted zone access and asset security',
    solution: 'HIPAA-compliant camera networks with behavior anomaly detection',
    metric: '24/7',
    metricLabel: 'Patient safety monitoring',
    tags: ['HIPAA', 'Behavior AI', 'Panic Button'],
  },
  {
    icon: GraduationCap,
    name: 'Schools',
    problem: 'Campus security and unauthorized visitor detection',
    solution: 'Perimeter cameras with visitor management and crowd analytics',
    metric: '2min',
    metricLabel: 'Average threat response',
    tags: ['Crowd AI', 'Visitor Mgmt', 'Alerts'],
  },
  {
    icon: ShoppingBag,
    name: 'Retail',
    problem: 'Shoplifting, queue management and customer analytics',
    solution: 'Overhead dome cameras with POS integration and behavior analytics',
    metric: '62%',
    metricLabel: 'Shrinkage reduction',
    tags: ['POS Integration', 'Heat Maps', 'Analytics'],
  },
  {
    icon: Landmark,
    name: 'Government',
    problem: 'Critical infrastructure protection and public safety',
    solution: 'Military-grade encrypted surveillance with command center integration',
    metric: 'Class A',
    metricLabel: 'Security clearance',
    tags: ['Encrypted', 'Biometric', 'SCIF Ready'],
  },
];

export default function IndustrySolutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    gsap.fromTo(
      Array.from(grid.children),
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        stagger: { amount: 0.8, from: 'start' },
        scrollTrigger: { trigger: grid, start: 'top 75%' },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative bg-bg-secondary py-28 overflow-hidden"
      aria-label="Industry Solutions"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05), transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-label">Industry Solutions</div>
          <h2 className="section-title">
            Built for Every
            <br />
            <span className="text-accent">Environment</span>
          </h2>
          <p className="section-subtitle">
            Bespoke security architecture tailored to your industry's unique threat landscape.
          </p>
        </div>

        {/* Industry Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <div
                key={i}
                className="industry-card group cursor-none"
                data-cursor="hover"
                style={{
                  '--mouse-x': '50%',
                  '--mouse-y': '50%',
                } as React.CSSProperties}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(0) + '%';
                  const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(0) + '%';
                  e.currentTarget.style.setProperty('--mouse-x', x);
                  e.currentTarget.style.setProperty('--mouse-y', y);
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/10 group-hover:border-accent/40 transition-colors duration-300">
                    <Icon size={18} className="text-white/50 group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-accent font-space">{industry.metric}</div>
                    <div className="text-[0.6rem] text-white/30 font-inter">{industry.metricLabel}</div>
                  </div>
                </div>

                {/* Industry name */}
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                  {industry.name}
                </h3>

                {/* Problem → Solution */}
                <p className="text-xs text-white/30 font-inter mb-2" style={{ lineHeight: '1.7' }}>
                  {industry.problem}
                </p>
                <p className="text-xs text-white/50 font-inter mb-4" style={{ lineHeight: '1.7' }}>
                  → {industry.solution}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-auto">
                  {industry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.6rem] px-2 py-1 border border-accent/15 text-accent/50 font-inter tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover bottom line */}
                <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-accent/30 transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="mt-16 glass p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-semibold text-lg" style={{ lineHeight: '1.5' }}>Not sure which solution fits you?</p>
            <p className="text-white/40 text-sm font-inter mt-2" style={{ lineHeight: '1.7' }}>Our security experts will conduct a free site assessment and recommend the optimal setup.</p>
          </div>
          <button
            id="industry-consult-btn"
            className="btn-primary whitespace-nowrap flex-shrink-0"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
