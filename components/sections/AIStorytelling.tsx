'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const aiFeatures = [
  {
    id: 'face',
    title: 'Face Detection & Recognition',
    desc: 'Neural network trained on millions of faces for sub-second identification. Cross-reference against watchlists in real time.',
    stats: [{ label: 'Accuracy', value: '99.7%' }, { label: 'Speed', value: '<0.3s' }],
    color: '#00D4FF',
    scanType: 'face',
  },
  {
    id: 'vehicle',
    title: 'Vehicle & License Plate Tracking',
    desc: 'Automatic number plate recognition across 50+ nationalities. Track vehicle paths across multiple cameras seamlessly.',
    stats: [{ label: 'LPR Rate', value: '99.1%' }, { label: 'Cameras', value: 'Unlimited' }],
    color: '#4DF2FF',
    scanType: 'vehicle',
  },
  {
    id: 'crowd',
    title: 'Crowd Analysis & Heat Maps',
    desc: 'Real-time density monitoring, flow analysis, and overcrowding alerts. Optimize space usage with behavioral heat maps.',
    stats: [{ label: 'Capacity', value: 'Unlimited' }, { label: 'Zones', value: 'Custom' }],
    color: '#00D4FF',
    scanType: 'crowd',
  },
  {
    id: 'intrusion',
    title: 'Intrusion Detection',
    desc: 'Virtual perimeter fencing with instant alerts. Distinguish humans from animals and vehicles with 99.4% accuracy.',
    stats: [{ label: 'False Alarms', value: '<0.1%' }, { label: 'Response', value: '<2s' }],
    color: '#FF6B35',
    scanType: 'perimeter',
  },
  {
    id: 'behavior',
    title: 'Behavior Analytics',
    desc: 'Detect loitering, tailgating, fighting, and suspicious movement patterns before incidents escalate.',
    stats: [{ label: 'Events', value: '20+ types' }, { label: 'Learning', value: 'Continuous' }],
    color: '#00D4FF',
    scanType: 'behavior',
  },
];

// Animated HUD canvas per feature
function FeatureHUD({
  scanType,
  color,
  isActive,
}: {
  scanType: string;
  color: string;
  isActive: boolean;
}) {
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
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r},${g},${b}`;
    };
    const rgb = hexToRgb(color);

    const draw = () => {
      t += 0.02;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      if (!isActive) { raf = requestAnimationFrame(draw); return; }

      if (scanType === 'face') {
        // Face detection box
        const bx = W * 0.25, by = H * 0.15, bw = W * 0.5, bh = H * 0.65;
        ctx.strokeStyle = `rgba(${rgb},0.6)`;
        ctx.lineWidth = 1.5;
        // Corners
        const cs = 16;
        [
          [bx, by], [bx + bw, by], [bx, by + bh], [bx + bw, by + bh]
        ].forEach(([cx2, cy2], i) => {
          const dx = i % 2 === 0 ? 1 : -1;
          const dy = i < 2 ? 1 : -1;
          ctx.beginPath();
          ctx.moveTo(cx2, cy2 + dy * cs);
          ctx.lineTo(cx2, cy2);
          ctx.lineTo(cx2 + dx * cs, cy2);
          ctx.stroke();
        });

        // Scan line
        const scanY = by + ((Math.sin(t) + 1) / 2) * bh;
        ctx.beginPath();
        ctx.moveTo(bx, scanY);
        ctx.lineTo(bx + bw, scanY);
        ctx.strokeStyle = `rgba(${rgb},0.4)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Face landmark dots
        const landmarks = [
          [0.38, 0.35], [0.62, 0.35], // eyes
          [0.5, 0.5],   // nose
          [0.42, 0.65], [0.58, 0.65], // mouth
        ];
        landmarks.forEach(([lx, ly]) => {
          ctx.beginPath();
          ctx.arc(bx + lx * bw, by + ly * bh, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb},0.8)`;
          ctx.fill();
        });

        // Label
        ctx.fillStyle = `rgba(${rgb},0.8)`;
        ctx.font = '9px Inter, sans-serif';
        ctx.fillText('FACE DETECTED', bx, by - 6);

      } else if (scanType === 'vehicle') {
        // Moving car outline
        const cx2 = W * 0.5;
        const carX = (Math.sin(t * 0.5) * 0.2 + 0.5) * W;
        const carY = H * 0.5;

        // Car box
        ctx.strokeStyle = `rgba(${rgb},0.6)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(carX - 40, carY - 20, 80, 40);

        // LP box
        ctx.strokeStyle = `rgba(${rgb},0.9)`;
        ctx.strokeRect(carX - 20, carY + 8, 40, 16);

        // LP text
        ctx.fillStyle = `rgba(${rgb},1)`;
        ctx.font = '8px Inter, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('MH01AB1234', carX, carY + 19);

        // Motion trail
        for (let i = 1; i <= 5; i++) {
          const prevX = (Math.sin(t * 0.5 - i * 0.1) * 0.2 + 0.5) * W;
          ctx.fillStyle = `rgba(${rgb},${0.1 - i * 0.02})`;
          ctx.fillRect(prevX - 40, carY - 20, 80, 40);
        }

      } else if (scanType === 'crowd') {
        // Heat map dots
        const dots = 40;
        for (let i = 0; i < dots; i++) {
          const x = (Math.sin(i * 1.7 + t * 0.2) * 0.3 + 0.5) * W;
          const y = (Math.cos(i * 2.3 + t * 0.15) * 0.3 + 0.5) * H;
          const heat = (Math.sin(i + t) + 1) / 2;
          const heatColor = heat > 0.7 ? '255,100,50' : heat > 0.4 ? `${rgb}` : '0,100,200';
          ctx.beginPath();
          ctx.arc(x, y, 8 + heat * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${heatColor},${0.1 + heat * 0.1})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${heatColor},0.8)`;
          ctx.fill();
        }
        // Count
        ctx.fillStyle = `rgba(${rgb},0.6)`;
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`CROWD: ${dots} DETECTED`, 10, 20);

      } else if (scanType === 'perimeter') {
        // Perimeter fence
        ctx.strokeStyle = `rgba(${rgb},0.3)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([8, 4]);
        ctx.strokeRect(W * 0.1, H * 0.1, W * 0.8, H * 0.8);
        ctx.setLineDash([]);

        // Intruder
        const ix = (Math.sin(t * 0.4) * 0.5 + 0.5) * W;
        const iy = H * 0.5;
        const isInside = ix > W * 0.1 && ix < W * 0.9;
        ctx.beginPath();
        ctx.arc(ix, iy, 10, 0, Math.PI * 2);
        ctx.strokeStyle = isInside ? 'rgba(255,100,50,0.8)' : `rgba(${rgb},0.4)`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (isInside) {
          ctx.fillStyle = 'rgba(255,100,50,0.1)';
          ctx.fill();
          ctx.fillStyle = 'rgba(255,100,50,0.8)';
          ctx.font = '9px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('⚠ BREACH', ix, iy - 16);
        }

      } else {
        // Behavior: movement trails
        for (let i = 0; i < 3; i++) {
          const startX = W * (0.2 + i * 0.25);
          const endX = startX + Math.sin(t + i) * 40;
          const endY = H * (0.3 + Math.cos(t * 0.7 + i) * 0.2);

          ctx.beginPath();
          ctx.moveTo(startX, H * 0.8);
          ctx.quadraticCurveTo(startX + 20, H * 0.5, endX, endY);
          ctx.strokeStyle = `rgba(${rgb},0.4)`;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(endX, endY, 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb},0.8)`;
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${rgb},0.6)`;
        ctx.font = '9px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('BEHAVIOR ANALYSIS ACTIVE', 10, 20);
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [scanType, color, isActive]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
  );
}

export default function AIStorytelling() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    featuresRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ai-security"
      className="relative bg-bg-primary py-28 overflow-hidden"
      aria-label="AI Security Intelligence"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-label">AI Intelligence</div>
          <h2 className="section-title">
            Surveillance That
            <span className="text-accent"> Thinks</span>
          </h2>
          <p className="section-subtitle">
            Our neural networks process 10,000 frames per second, identifying threats before humans can blink.
          </p>
        </div>

        {/* Feature list */}
        <div className="space-y-8">
          {aiFeatures.map((feat, i) => (
            <div
              key={feat.id}
              ref={(el) => { featuresRef.current[i] = el; }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center opacity-0`}
            >
              {/* HUD visualization */}
              <div
                className="w-full lg:w-1/2 aspect-video relative glass overflow-hidden"
                style={{ border: `1px solid ${feat.color}20` }}
              >
                <FeatureHUD scanType={feat.scanType} color={feat.color} isActive={true} />

                {/* Corner labels */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: feat.color }} />
                  <span className="text-[0.6rem] font-inter tracking-widest" style={{ color: feat.color }}>
                    LIVE ANALYSIS
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="text-[0.6rem] font-inter text-white/20">GUARDIANEYE AI v4.2</span>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <span
                    className="text-[0.65rem] tracking-[0.3em] uppercase font-inter"
                    style={{ color: feat.color }}
                  >
                    AI Module {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold font-space text-white mt-2">
                    {feat.title}
                  </h3>
                </div>

                <p className="text-white/50 font-inter leading-relaxed">
                  {feat.desc}
                </p>

                {/* Stats */}
                <div className="flex gap-8">
                  {feat.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-bold font-space" style={{ color: feat.color }}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-white/30 font-inter mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/30 font-inter">
                    <span>Detection Accuracy</span>
                    <span style={{ color: feat.color }}>
                      {feat.stats[0].value}
                    </span>
                  </div>
                  <div className="h-px w-full bg-white/10 relative overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full transition-all duration-1000"
                      style={{
                        width: feat.stats[0].value.includes('%') ? feat.stats[0].value : '95%',
                        background: `linear-gradient(90deg, ${feat.color}, ${feat.color}40)`,
                        boxShadow: `0 0 8px ${feat.color}`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
