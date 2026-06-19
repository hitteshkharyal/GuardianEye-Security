'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Radio, Zap, Moon, Cloud, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Eye,
    title: '24/7 Monitoring',
    desc: 'Round-the-clock surveillance with zero blind spots. Our AI never sleeps.',
    stat: '99.9%',
    statLabel: 'Uptime',
  },
  {
    icon: Radio,
    title: 'Real-Time Alerts',
    desc: 'Instant notifications delivered to your device within milliseconds of detection.',
    stat: '<100ms',
    statLabel: 'Response Time',
  },
  {
    icon: Zap,
    title: 'Motion Detection',
    desc: 'Neural network-powered detection that distinguishes threats from noise.',
    stat: '99.4%',
    statLabel: 'Accuracy',
  },
  {
    icon: Moon,
    title: 'Night Vision',
    desc: 'Crystal clear 4K imaging even in complete darkness with thermal sensing.',
    stat: '50m',
    statLabel: 'Night Range',
  },
  {
    icon: Cloud,
    title: 'Cloud Recording',
    desc: 'Military-grade encrypted storage with 90-day rolling retention.',
    stat: '90 Days',
    statLabel: 'Retention',
  },
  {
    icon: Smartphone,
    title: 'Remote Access',
    desc: 'View any camera, anywhere in the world from any device.',
    stat: '∞',
    statLabel: 'Locations',
  },
];

// Canvas HUD animation
function HUDCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scanning line
      const scanY = ((Math.sin(t * 0.5) + 1) / 2) * canvas.height;
      const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.5, 'rgba(0,212,255,0.08)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 60, canvas.width, 120);

      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.strokeStyle = 'rgba(0,212,255,0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Grid points
      const cols = 12;
      const rows = 8;
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = (canvas.width / cols) * i;
          const y = (canvas.height / rows) * j;
          const dist = Math.abs(y - scanY);
          const alpha = Math.max(0, 0.15 - dist / 300);
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,212,255,${alpha})`;
          ctx.fill();
        }
      }

      // Corner brackets
      const drawBracket = (x: number, y: number, size: number, dirX: number, dirY: number) => {
        ctx.beginPath();
        ctx.moveTo(x, y + dirY * size);
        ctx.lineTo(x, y);
        ctx.lineTo(x + dirX * size, y);
        ctx.strokeStyle = 'rgba(0,212,255,0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      };

      const m = 20;
      const s = 30;
      drawBracket(m, m, s, 1, 1);
      drawBracket(canvas.width - m, m, s, -1, 1);
      drawBracket(m, canvas.height - m, s, 1, -1);
      drawBracket(canvas.width - m, canvas.height - m, s, -1, -1);

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

export default function MonitoringWorld() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current?.children;
    const title = titleRef.current;
    if (!section || !cards || !title) return;

    gsap.fromTo(title,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: title, start: 'top 80%' },
      }
    );

    gsap.fromTo(Array.from(cards),
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="monitoring"
      className="relative min-h-screen bg-bg-primary overflow-hidden py-32"
      aria-label="AI Monitoring Solutions"
    >
      {/* HUD Canvas */}
      <HUDCanvas />

      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,212,255,0.3))' }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div ref={titleRef} className="section-header opacity-0">
          <div className="section-label">AI Monitoring World</div>
          <h2 className="section-title">
            Inside the
            <span className="text-accent"> Intelligence</span>
          </h2>
          <p className="section-subtitle">
            A surveillance ecosystem that thinks, learns, and responds in real-time.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="glass hud-corner p-8 group hover:border-accent/30 transition-all duration-500 cursor-none relative overflow-hidden"
                data-cursor="hover"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 30% 30%, rgba(0,212,255,0.06), transparent 70%)' }}
                />

                {/* Card number */}
                <div className="absolute top-4 right-4 text-[0.6rem] font-inter tracking-widest text-white/15">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 border border-accent/20 rotate-45 group-hover:rotate-90 transition-transform duration-700" />
                  <Icon size={20} className="text-accent relative z-10" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors duration-300 text-left">
                  {feat.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed mb-6 font-inter text-left">
                  {feat.desc}
                </p>

                {/* Stat */}
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-accent font-space">{feat.stat}</span>
                  <span className="text-xs text-white/30 font-inter mb-1">{feat.statLabel}</span>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-accent/40 transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA row */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-white/05">
          <div>
            <p className="text-white/40 text-sm font-inter">Trusted by enterprises across industries</p>
            <div className="flex items-center gap-4 mt-3">
              {['ISO 27001', 'SOC 2', 'GDPR', 'NDAA'].map((cert) => (
                <span key={cert} className="text-xs text-accent/60 font-inter border border-accent/20 px-2 py-1">
                  {cert}
                </span>
              ))}
            </div>
          </div>
          <button
            id="monitoring-explore-btn"
            className="btn-outline whitespace-nowrap"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get a Demo
          </button>
        </div>
      </div>
    </section>
  );
}
