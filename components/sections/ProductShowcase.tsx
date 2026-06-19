'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 'dome',
    name: 'Dome Camera',
    model: 'GE-D4K PRO',
    tagline: 'Discreet. Powerful. Always Watching.',
    color: '#00D4FF',
    features: ['4K Ultra HD', '360° Coverage', 'AI Face Detection', 'IR Night Vision 30m', 'Weatherproof IP67', 'Wide Dynamic Range'],
    specs: [
      { label: 'Resolution', value: '4K / 8MP' },
      { label: 'Frame Rate', value: '30 fps' },
      { label: 'Night Vision', value: '30m IR' },
      { label: 'Field of View', value: '360°' },
      { label: 'Storage', value: 'SD + Cloud' },
      { label: 'Connectivity', value: 'PoE / WiFi' },
    ],
    description: 'The GE-D4K PRO dome camera blends seamlessly into any environment while delivering uncompromising 4K surveillance with AI-powered detection.',
  },
  {
    id: 'bullet',
    name: 'Bullet Camera',
    model: 'GE-B8K ULTRA',
    tagline: 'Long-Range Precision. Zero Compromise.',
    color: '#4DF2FF',
    features: ['8K Resolution', '500m Night Range', 'Varifocal Lens', 'Thermal Imaging', 'LPR Capable', 'PTZ Ready'],
    specs: [
      { label: 'Resolution', value: '8K / 33MP' },
      { label: 'Night Range', value: '500m' },
      { label: 'Zoom', value: '40× Optical' },
      { label: 'Detection', value: 'LPR + Face' },
      { label: 'IP Rating', value: 'IP68' },
      { label: 'Temp Range', value: '-40° to 70°C' },
    ],
    description: 'Purpose-built for perimeter surveillance. The GE-B8K ULTRA delivers military-grade imaging at distances where other cameras simply go dark.',
  },
  {
    id: 'ptz',
    name: 'PTZ Camera',
    model: 'GE-PTZ360',
    tagline: 'Follow Every Movement. Miss Nothing.',
    color: '#00D4FF',
    features: ['360° Pan/Tilt/Zoom', 'Auto-Tracking AI', '60fps Recording', 'ONVIF Compatible', 'Smart Patrol', 'Motion Prediction'],
    specs: [
      { label: 'Pan Speed', value: '240°/s' },
      { label: 'Zoom', value: '60× Optical' },
      { label: 'Presets', value: '300 Positions' },
      { label: 'Tracking', value: 'AI Auto-Track' },
      { label: 'Protocol', value: 'ONVIF / RTSP' },
      { label: 'Frame Rate', value: '60 fps' },
    ],
    description: 'The GE-PTZ360 doesn\'t wait for criminals to enter the frame. Its predictive AI tracking anticipates movement and follows threats autonomously.',
  },
  {
    id: 'thermal',
    name: 'Thermal Camera',
    model: 'GE-T640',
    tagline: 'See Through Darkness. See Through Deception.',
    color: '#FF6B35',
    features: ['Thermal Imaging', 'Heat Map Analytics', 'Perimeter Detection', 'Fire Prevention', 'Fog Penetrating', 'VCA Intelligence'],
    specs: [
      { label: 'Sensor', value: '640×480 Thermal' },
      { label: 'Detection Range', value: '2km+' },
      { label: 'Temp Accuracy', value: '±0.3°C' },
      { label: 'Response', value: '<1 second' },
      { label: 'Wavelength', value: '8–14 μm' },
      { label: 'Analytics', value: 'Fire + Intruder' },
    ],
    description: 'Beyond visible light. The GE-T640 thermal camera detects human presence through smoke, fog, and complete darkness — up to 2km away.',
  },
];

// CSS-based 3D camera illustration
function Camera3D({ product, isActive }: { product: typeof products[0]; isActive: boolean }) {
  const cameraRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = cameraRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    let raf: number;
    let rotX = 0, rotY = 0;

    const animate = () => {
      rotX += (mouseRef.current.y * -15 - rotX) * 0.08;
      rotY += (mouseRef.current.x * 20 - rotY) * 0.08;
      if (el) {
        el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
      raf = requestAnimationFrame(animate);
    };

    el.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const color = product.color;
  const isDome = product.id === 'dome';
  const isThermal = product.id === 'thermal';

  return (
    <div
      ref={cameraRef}
      className="w-64 h-64 mx-auto relative transition-all duration-700"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-20"
        style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
      />

      {/* Camera body - different shapes per type */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isDome ? (
          <div className="relative w-40 h-32 flex flex-col items-center">
            {/* Dome shape */}
            <div
              className="w-40 h-20 rounded-t-full relative"
              style={{
                background: `linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)`,
                border: `1px solid rgba(255,255,255,0.1)`,
                boxShadow: `0 0 40px ${color}30, inset 0 0 20px rgba(0,0,0,0.5)`,
              }}
            >
              {/* Lens inside dome */}
              <div
                className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full"
                style={{
                  background: `radial-gradient(circle, #001a2e 0%, #000d1a 100%)`,
                  border: `2px solid ${color}80`,
                  boxShadow: `0 0 20px ${color}60, inset 0 0 10px ${color}30`,
                }}
              >
                <div className="absolute inset-2 rounded-full" style={{ background: `radial-gradient(circle, ${color}30, transparent 60%)` }} />
              </div>
              {/* Accent ring */}
              <div className="absolute inset-x-4 bottom-0 h-px" style={{ background: `${color}40` }} />
            </div>
            {/* Base mount */}
            <div className="w-24 h-8 rounded-b-lg" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)' }} />
          </div>
        ) : product.id === 'bullet' ? (
          <div className="relative">
            <div
              className="w-12 h-44 rounded-l-full rounded-r-sm relative"
              style={{
                background: 'linear-gradient(90deg, #1a1a1a 0%, #0d0d0d 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: `0 0 40px ${color}30`,
                transform: 'rotate(-15deg)',
              }}
            >
              {/* Lens end */}
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full"
                style={{ border: `2px solid ${color}80`, boxShadow: `0 0 15px ${color}60` }}
              >
                <div className="absolute inset-1 rounded-full" style={{ background: `${color}20` }} />
              </div>
              {/* Body details */}
              {[0.3, 0.5, 0.7].map((pos) => (
                <div key={pos} className="absolute left-0 right-0 h-px" style={{ top: `${pos * 100}%`, background: `${color}20` }} />
              ))}
            </div>
          </div>
        ) : product.id === 'ptz' ? (
          <div className="relative flex flex-col items-center gap-2">
            {/* PTZ head */}
            <div
              className="w-28 h-20 rounded-full relative"
              style={{
                background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
                border: `1px solid rgba(255,255,255,0.1)`,
                boxShadow: `0 0 40px ${color}30`,
              }}
            >
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full"
                style={{ border: `2px solid ${color}80`, boxShadow: `0 0 20px ${color}60` }}
              >
                <div className="absolute inset-2 rounded-full" style={{ background: `radial-gradient(circle, #001a2e, #000)` }} />
              </div>
            </div>
            {/* Pan base */}
            <div className="w-16 h-6 rounded" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }} />
            <div className="w-20 h-4 rounded-sm" style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)' }} />
          </div>
        ) : (
          // Thermal
          <div className="relative">
            <div
              className="w-14 h-36 rounded-sm relative"
              style={{
                background: 'linear-gradient(180deg, #1a1010 0%, #0d0808 100%)',
                border: `1px solid rgba(255,107,53,0.2)`,
                boxShadow: `0 0 40px rgba(255,107,53,0.2)`,
                transform: 'rotate(-10deg)',
              }}
            >
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-8 rounded-sm"
                style={{ border: `1px solid rgba(255,107,53,0.6)`, boxShadow: `0 0 15px rgba(255,107,53,0.5)` }}
              >
                <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.1), rgba(255,200,0,0.1))' }} />
              </div>
              {/* Heat gradient overlay */}
              <div
                className="absolute inset-x-0 bottom-0 h-20 opacity-30"
                style={{ background: 'linear-gradient(to top, rgba(255,107,53,0.3), transparent)' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Rotating ring decoration */}
      <div
        className="absolute inset-4 rounded-full border opacity-20 animate-spin-slow"
        style={{ borderColor: color, borderStyle: 'dashed' }}
      />
    </div>
  );
}

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    // calculate scroll distance based on window width rather than track.clientWidth
    // because track is a flex container and clientWidth may equal scrollWidth
    const totalWidth = track.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${totalWidth + window.innerHeight}`,
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const newIndex = Math.min(
            products.length - 1,
            Math.floor(self.progress * products.length)
          );
          setActiveIndex(newIndex);
        },
      },
    });

    tl.to(track, { x: -totalWidth, ease: 'none' });

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative bg-bg-secondary overflow-hidden"
      style={{ height: '100vh' }}
      aria-label="3D Product Showcase"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-10">
        <div className="section-container">
          <div className="relative flex items-start justify-between">
            <div className="flex-1 text-center">
              <div className="section-label mb-3">Product Line</div>
              <h2 className="section-title">
                Our <span className="text-accent">Cameras</span>
              </h2>
            </div>
            {/* Progress indicator */}
            <div className="hidden md:flex gap-2 items-center pt-8">
              {products.map((p, i) => (
                <div
                  key={i}
                  className="h-px transition-all duration-500"
                  style={{
                    width: i === activeIndex ? '40px' : '16px',
                    background: i === activeIndex ? '#00D4FF' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
              <span className="text-xs font-inter text-white/30 ml-2">
                {String(activeIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal track —
          The track starts with padding matching section-container so the
          first card has the same left inset as all other page sections.
          overflow-hidden on the wrapper clips the scrolling cards. */}
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center" style={{ overflow: 'hidden' }}>
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{
            gap: '1.5rem',
            /* Mirror section-container padding: clamp(1.5rem, 5vw, 5rem) */
            paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
            paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
            /* Ensure track fills at minimum the full container width before scrolling */
            minWidth: '100%',
          }}
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              className="flex-shrink-0 glass relative overflow-hidden flex flex-col lg:flex-row"
              style={{
                width: 'clamp(320px, 80vw, 640px)',
                height: '72vh',
                border: `1px solid rgba(255,255,255,0.07)`,
                /* Right gap between cards */
                marginRight: i < products.length - 1 ? '1.5rem' : 0,
              }}
            >
              {/* 3D Camera View — explicitly padded so the model never touches the card border */}
              <div
                className="flex-1 flex items-center justify-center relative"
                style={{
                  padding: '2.5rem',
                  background: `radial-gradient(circle at 50% 50%, ${product.color}08, transparent 70%)`,
                  minHeight: '55%',
                }}
              >
                <Camera3D product={product} isActive={i === activeIndex} />

                {/* Floating feature tags — kept well inside the camera panel */}
                {product.features.slice(0, 3).map((feat, fi) => (
                  <div
                    key={fi}
                    className="absolute glass-accent"
                    style={{
                      top: `${18 + fi * 23}%`,
                      left: fi % 2 === 0 ? '12%' : 'auto',
                      right: fi % 2 !== 0 ? '12%' : 'auto',
                      padding: '0.35rem 0.75rem',
                      opacity: i === activeIndex ? 1 : 0,
                      transition: `opacity 0.5s ${fi * 0.1}s`,
                      pointerEvents: 'none',
                    }}
                  >
                    <span className="text-[0.65rem] text-accent font-inter tracking-widest whitespace-nowrap">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Product Info Panel — padded so content is never flush to any border */}
              <div
                className="w-full lg:w-72 flex flex-col justify-between"
                style={{
                  padding: '2rem',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div>
                  <p
                    className="text-[0.65rem] tracking-[0.3em] uppercase font-inter mb-2"
                    style={{ color: product.color, lineHeight: '1.6' }}
                  >
                    {product.model}
                  </p>
                  <h3 className="text-2xl font-bold font-space text-white mb-2" style={{ lineHeight: '1.2' }}>
                    {product.name}
                  </h3>
                  <p className="text-xs text-white/40 italic font-inter mb-4" style={{ lineHeight: '1.6' }}>
                    {product.tagline}
                  </p>
                  <p
                    className="text-sm text-white/55 font-inter mb-6"
                    style={{ lineHeight: '1.75' }}
                  >
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div>
                    {product.specs.map((spec, si) => (
                      <div
                        key={si}
                        className="product-spec-item"
                      >
                        <span className="text-xs text-white/35 font-inter" style={{ lineHeight: '1.6' }}>{spec.label}</span>
                        <span className="text-xs font-medium font-space" style={{ color: product.color }}>
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  id={`product-${product.id}-inquiry-btn`}
                  className="btn-outline mt-6 text-center w-full"
                  style={{ borderColor: `${product.color}40`, color: product.color }}
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 text-white/20">
        <span className="text-[0.65rem] tracking-widest uppercase font-inter">Scroll to explore</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-1 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1 h-1 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </section>
  );
}
