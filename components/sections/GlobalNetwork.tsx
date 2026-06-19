'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5000, suffix: '+', label: 'Installations' },
  { value: 120, suffix: '+', label: 'Cities' },
  { value: 99.9, suffix: '%', label: 'Uptime' },
  { value: 24, suffix: '/7', label: 'Support' },
];

const locations = [
  { name: 'New York', lat: 40.7, lng: -74.0, count: '340+ sites' },
  { name: 'London', lat: 51.5, lng: -0.12, count: '280+ sites' },
  { name: 'Dubai', lat: 25.2, lng: 55.27, count: '420+ sites' },
  { name: 'Singapore', lat: 1.35, lng: 103.8, count: '190+ sites' },
  { name: 'Mumbai', lat: 19.07, lng: 72.87, count: '510+ sites' },
  { name: 'Tokyo', lat: 35.68, lng: 139.69, count: '230+ sites' },
  { name: 'Sydney', lat: -33.86, lng: 151.21, count: '160+ sites' },
  { name: 'São Paulo', lat: -23.55, lng: -46.63, count: '145+ sites' },
];

// Canvas globe
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ y: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    let t = 0;

    const resize = () => {
      const size = Math.min(canvas.offsetWidth, canvas.offsetHeight);
      canvas.width = size;
      canvas.height = size;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    };
    canvas.addEventListener('mousemove', onMouseMove);

    const project = (lat: number, lng: number, radius: number, rot: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + rot) * (Math.PI / 180);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      return { x, y, z };
    };

    const draw = () => {
      t += 0.005;
      rotRef.current.targetY += (mouseRef.current.x * 30 - rotRef.current.targetY) * 0.05;
      rotRef.current.y += (rotRef.current.targetY + t * 10 - rotRef.current.y) * 0.05;

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const R = W * 0.38;
      const rot = rotRef.current.y;

      ctx.clearRect(0, 0, W, H);

      // Glow under globe
      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.2);
      glowGrad.addColorStop(0, 'rgba(0,212,255,0.05)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, W, H);

      // Atmosphere glow
      const atmoGrad = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.15);
      atmoGrad.addColorStop(0, 'rgba(0,212,255,0.08)');
      atmoGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = atmoGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // Globe base
      const globeGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R);
      globeGrad.addColorStop(0, '#0d1520');
      globeGrad.addColorStop(0.5, '#060d15');
      globeGrad.addColorStop(1, '#020810');
      ctx.fillStyle = globeGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Latitude grid lines
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        let first = true;
        for (let lng = 0; lng <= 360; lng += 3) {
          const p = project(lat, lng, R, rot);
          if (p.z < 0) { first = true; continue; }
          const sx = cx + p.x;
          const sy = cy - p.y;
          const alpha = (p.z / R) * 0.08;
          if (first) { ctx.moveTo(sx, sy); first = false; }
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(0,212,255,0.06)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Longitude grid lines
      for (let lng = 0; lng < 360; lng += 20) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = project(lat, lng, R, rot);
          if (p.z < 0) { first = true; continue; }
          const sx = cx + p.x;
          const sy = cy - p.y;
          if (first) { ctx.moveTo(sx, sy); first = false; }
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(0,212,255,0.04)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Location markers
      locations.forEach((loc, i) => {
        const p = project(loc.lat, loc.lng, R, rot);
        if (p.z < 0) return;

        const sx = cx + p.x;
        const sy = cy - p.y;
        const alpha = p.z / R;

        // Ping animation
        const pingPhase = (t * 2 + i * 0.7) % 1;
        const pingR = pingPhase * 12;
        ctx.beginPath();
        ctx.arc(sx, sy, pingR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,212,255,${(1 - pingPhase) * alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${alpha})`;
        ctx.fill();

        // Label
        if (alpha > 0.5) {
          ctx.font = `${10 * alpha}px Inter, sans-serif`;
          ctx.fillStyle = `rgba(0,212,255,${alpha * 0.7})`;
          ctx.textAlign = 'center';
          ctx.fillText(loc.name, sx, sy - 10);
        }
      });

      // Connection arcs between select locations
      const connections = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 4], [2, 6]];
      connections.forEach(([a, b]) => {
        const pa = project(locations[a].lat, locations[a].lng, R, rot);
        const pb = project(locations[b].lat, locations[b].lng, R, rot);
        if (pa.z < 0 || pb.z < 0) return;

        const phase = ((t * 0.8 + a * 0.3) % 1);

        ctx.beginPath();
        ctx.moveTo(cx + pa.x, cy - pa.y);
        ctx.lineTo(cx + pb.x, cy - pb.y);
        ctx.strokeStyle = `rgba(0,212,255,0.12)`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Moving particle along arc
        const px = cx + pa.x + (pb.x - pa.x) * phase;
        const py = cy - pa.y + (-pb.y + pa.y) * phase;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,212,255,0.8)';
        ctx.fill();
      });

      // Globe edge highlight
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,212,255,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-none"
      data-cursor="hover"
      aria-label="Interactive global security network"
    />
  );
}

export default function GlobalNetwork() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const statsEl = statsRef.current;
    const globeEl = globeRef.current;
    if (!statsEl || !globeEl) return;

    gsap.fromTo(globeEl,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out',
        scrollTrigger: { trigger: globeEl, start: 'top 80%' },
      }
    );

    ScrollTrigger.create({
      trigger: statsEl,
      start: 'top 80%',
      onEnter: () => {
        stats.forEach((stat, i) => {
          gsap.to({}, {
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              const prog = this.progress();
              setAnimatedStats((prev) => {
                const next = [...prev];
                next[i] = parseFloat((prog * stat.value).toFixed(stat.suffix === '%' ? 1 : 0));
                return next;
              });
            },
          });
        });
      },
      once: true,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="global"
      className="relative bg-bg-primary py-24 overflow-hidden min-h-screen flex items-center"
      aria-label="Global Security Network"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)' }}
        />
      </div>

      <div className="section-container w-full">
        {/* Header */}
        <div className="section-header">
          <div className="section-label">Global Network</div>
          <h2 className="section-title">
            Security Without
            <br />
            <span className="text-accent">Borders</span>
          </h2>
          <p className="section-subtitle">
            Monitoring operations across 6 continents, 120+ cities, with a unified command network.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Globe */}
          <div ref={globeRef} className="aspect-square max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto w-full opacity-0">
            <GlobeCanvas />
          </div>

          {/* Stats + info */}
          <div>
            {/* Stats grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="glass-accent p-7 hud-corner">
                  <div className="stat-number">
                    {animatedStats[i]}{stat.suffix}
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase text-white/40 font-inter mt-2" style={{ lineHeight: '1.6' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Location list */}
            <div className="space-y-0">
              <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-inter mb-4">
                Active Deployment Zones
              </p>
              <div className="grid grid-cols-2 gap-2">
                {locations.slice(0, 6).map((loc, i) => (
                  <div key={i} className="flex items-center gap-3 py-3.5 border-b border-white/05 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors" style={{ lineHeight: '1.5' }}>
                        {loc.name}
                      </p>
                      <p className="text-[0.65rem] text-accent/50 font-inter mt-0.5">{loc.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              id="global-contact-btn"
              className="btn-primary mt-8"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Expand to Your City
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
