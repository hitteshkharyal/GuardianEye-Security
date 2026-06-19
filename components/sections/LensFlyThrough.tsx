'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LensFlyThrough() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const cameraBodyRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lensGlowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const lens = lensRef.current;
    const cameraBody = cameraBodyRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const lensGlow = lensGlowRef.current;
    const text = textRef.current;

    if (!section || !sticky || !lens || !cameraBody || !overlay || !content || !lensGlow || !text) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        pin: sticky,
        pinSpacing: false,
      },
    });

    // Phase 1 (0–25%): Camera grows, approaches viewer
    tl.fromTo(cameraBody, { scale: 1, y: 0, opacity: 1 }, { scale: 4, y: -80, opacity: 0, ease: 'power2.in' }, 0)
      // Lens ring expands
      .fromTo(lens,
        { scale: 1, clipPath: 'circle(8% at 50% 50%)' },
        { scale: 1, clipPath: 'circle(35% at 50% 50%)', ease: 'power2.in' },
        0
      )

    // Phase 2 (25–60%): Lens fills viewport
    tl.to(lens,
      { clipPath: 'circle(150% at 50% 50%)', ease: 'power4.inOut' },
      0.25
    )
      .to(lensGlow, { opacity: 1, scale: 1.5, ease: 'power2.out' }, 0.25)

    // Phase 3 (60–100%): Inside content reveals
    tl.fromTo(content,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, ease: 'power2.out' },
      0.65
    )
      .fromTo(text,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power3.out' },
        0.7
      )
      .to(overlay, { opacity: 0, ease: 'power2.out' }, 0.6);

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lens-transition"
      className="relative"
      style={{ height: '400vh' }}
      aria-label="Lens fly-through transition"
    >
      <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden bg-bg-primary">

        {/* Background radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)' }}
          />
        </div>

        {/* Camera body (CSS representation for scroll) */}
        <div
          ref={cameraBodyRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 2 }}
        >
          <div className="relative flex flex-col items-center">
            {/* Camera SVG / CSS art */}
            <div className="relative">
              {/* Body */}
              <div
                className="w-24 h-52 rounded-full mx-auto relative"
                style={{
                  background: 'linear-gradient(180deg, #1a1a1a 0%, #080808 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 0 60px rgba(0,212,255,0.3), inset 0 0 30px rgba(0,0,0,0.5)',
                }}
              >
                {/* Lens ring on body */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full"
                  style={{
                    border: '2px solid rgba(0,212,255,0.6)',
                    boxShadow: '0 0 20px rgba(0,212,255,0.4)',
                  }}
                />
                {/* Lens center */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,30,60,1) 0%, rgba(0,10,30,1) 100%)',
                    border: '1px solid rgba(0,212,255,0.4)',
                    boxShadow: 'inset 0 0 20px rgba(0,212,255,0.3), 0 0 30px rgba(0,212,255,0.5)',
                  }}
                />
                {/* Accent rings */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-accent/30" />
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-12 h-px bg-accent/20" />
              </div>
              {/* Mount */}
              <div className="w-10 h-8 mx-auto rounded-b-lg"
                style={{ background: 'linear-gradient(180deg, #111 0%, #050505 100%)', border: '1px solid rgba(255,255,255,0.05)' }}
              />
            </div>

            {/* Label */}
            <div className="mt-8 text-center">
              <p className="text-xs tracking-[0.4em] uppercase text-accent/60 font-inter">
                Entering Lens
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-8 h-px bg-accent/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <div className="w-8 h-px bg-accent/30" />
              </div>
            </div>
          </div>
        </div>

        {/* Lens clip-path overlay — the portal */}
        <div
          ref={lensRef}
          className="absolute inset-0 z-10"
          style={{
            clipPath: 'circle(8% at 50% 50%)',
            background: 'radial-gradient(circle at 50% 50%, #000820 0%, #050505 60%, #000000 100%)',
          }}
        >
          {/* Lens inner glow rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full relative">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.15) 0%, rgba(0,212,255,0.05) 30%, transparent 70%)',
                }}
              />
              {/* Lens chromatic aberration rings */}
              {[0.92, 0.84, 0.76, 0.65].map((scale, i) => (
                <div
                  key={i}
                  className="absolute inset-0 m-auto rounded-full border"
                  style={{
                    width: `${scale * 100}%`,
                    height: `${scale * 100}%`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderColor: `rgba(0,212,255,${0.04 + i * 0.03})`,
                    boxShadow: `0 0 ${20 + i * 10}px rgba(0,212,255,${0.05 + i * 0.02}) inset`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Inside lens content — monitoring world preview */}
          <div
            ref={contentRef}
            className="absolute inset-0 opacity-0"
            style={{
              background: 'linear-gradient(180deg, #000510 0%, #050505 100%)',
            }}
          >
            {/* Grid */}
            <div className="absolute inset-0 grid-bg opacity-30" />

            {/* Horizontal HUD lines */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px opacity-10"
                style={{
                  top: `${12.5 * i}%`,
                  background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)',
                }}
              />
            ))}

            {/* Floating HUD elements */}
            <div className="absolute top-1/4 left-1/4 w-24 h-16 border border-accent/20 flex items-center justify-center">
              <span className="text-[0.6rem] text-accent/40 tracking-widest font-inter">SECTOR-A</span>
            </div>
            <div className="absolute top-1/3 right-1/4 w-20 h-12 border border-accent/20 flex items-center justify-center">
              <span className="text-[0.6rem] text-accent/40 tracking-widest font-inter">ACTIVE</span>
            </div>
            <div className="absolute bottom-1/3 left-1/3 w-32 h-8 border border-accent/15">
              <div className="h-full bg-accent/10 w-3/4" />
            </div>

            {/* Center text */}
            <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
              <div className="text-center space-y-4">
                <div className="section-label">You Are Inside</div>
                <h2 className="section-title">The Network</h2>
                <p className="section-subtitle max-w-md mx-auto text-center px-6">
                  Experience AI-powered surveillance from the inside
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lens glow pulse */}
        <div
          ref={lensGlowRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0"
        >
          <div
            className="w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
        </div>

        {/* Dark overlay (fades out during transition) */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 15%, rgba(5,5,5,0.8) 50%, #050505 80%)',
          }}
        />

        {/* Scroll progress text */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-2">
            <div className="w-px h-8 bg-gradient-to-b from-accent/40 to-transparent" />
          </div>
        </div>

        {/* Side coordinates */}
        <div className="absolute top-8 left-8 z-30 hidden lg:block">
          <p className="text-[0.6rem] font-inter tracking-widest text-white/20">
            LAT: 28.6139° N
          </p>
          <p className="text-[0.6rem] font-inter tracking-widest text-white/20">
            LON: 77.2090° E
          </p>
        </div>
        <div className="absolute top-8 right-8 z-30 hidden lg:block text-right">
          <p className="text-[0.6rem] font-inter tracking-widest text-white/20">
            ZOOM: ×4.2
          </p>
          <p className="text-[0.6rem] font-inter tracking-widest text-accent/40 animate-pulse">
            ● REC
          </p>
        </div>
      </div>
    </section>
  );
}
