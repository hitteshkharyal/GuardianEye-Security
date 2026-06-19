'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useAppStore } from '@/lib/store/useAppStore';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const setIsLoading = useAppStore((s) => s.setIsLoading);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const progress = progressRef.current;
    const text = textRef.current;
    const percentEl = percentRef.current;
    if (!container || !progress || !text || !percentEl) return;

    let count = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Cinematic exit
        gsap.to(container, {
          clipPath: 'circle(0% at 50% 50%)',
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: () => {
            setIsLoading(false);
            setVisible(false);
          },
        });
      },
    });

    tl.to(count, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(count.val);
        percentEl.textContent = `${v}`;
        progress.style.width = `${v}%`;
      },
    });

    tl.to(text, { opacity: 0, y: -20, duration: 0.4 }, '-=0.3');

    return () => { tl.kill(); };
  }, [setIsLoading]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="preloader"
      style={{ clipPath: 'circle(150% at 50% 50%)' }}
      aria-label="Loading GuardianEye Security"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Scan line */}
      <div className="scan-line" aria-hidden="true" />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-accent/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-accent/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-accent/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-accent/30" />

      {/* Main content */}
      <div ref={textRef} className="relative z-10 text-center space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 border border-accent/60 rotate-45" />
            <div className="absolute inset-1 border border-accent/40 rotate-45" />
            <div className="absolute inset-2 bg-accent/20 rotate-45" />
          </div>
          <span className="text-xs tracking-[0.4em] uppercase text-accent font-inter">GuardianEye</span>
        </div>

        {/* Counter */}
        <div className="relative">
          <span
            ref={percentRef}
            className="text-[8rem] font-bold leading-none text-white/10 font-space select-none"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            0
          </span>
          <span className="text-accent text-2xl absolute top-1/2 -translate-y-1/2 -right-6">%</span>
        </div>

        {/* Tagline */}
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-inter">
          Initializing Surveillance Network
        </p>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64">
        <div className="w-full h-px bg-white/10 relative overflow-hidden">
          <div
            ref={progressRef}
            className="absolute left-0 top-0 h-full bg-accent transition-none"
            style={{ width: '0%', boxShadow: '0 0 10px rgba(0,212,255,0.8)' }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-white/20 font-inter tracking-widest">GUARDIAN</span>
          <span className="text-xs text-white/20 font-inter tracking-widest">EYE</span>
        </div>
      </div>
    </div>
  );
}
