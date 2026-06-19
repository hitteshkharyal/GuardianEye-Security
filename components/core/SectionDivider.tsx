'use client';

import { useEffect, useState } from 'react';

interface SectionDividerProps {
  sectionId?: string;
  label?: string;
}

export default function SectionDivider({ sectionId = 'SEC', label = 'SYSTEM ACTIVE' }: SectionDividerProps) {
  const [coords, setCoords] = useState({ lat: '28.6139° N', lng: '77.2090° E' });

  useEffect(() => {
    // Generate slightly randomized lat/lng coordinates to simulate real-time dynamic GPS tracking
    const randomLat = (28.6 + Math.random() * 0.1).toFixed(4);
    const randomLng = (77.2 + Math.random() * 0.1).toFixed(4);
    setCoords({
      lat: `${randomLat}° N`,
      lng: `${randomLng}° E`,
    });
  }, []);

  return (
    <div className="w-full px-4 md:px-8 my-12 relative pointer-events-none select-none">
      <div className="flex items-center justify-between gap-6 text-[0.6rem] font-inter tracking-[0.25em] text-white/25 uppercase">
        {/* Left detail: Section ID & Coords */}
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-accent/60 font-semibold">{sectionId}</span>
          <span className="text-white/10">|</span>
          <span className="font-mono">GPS: {coords.lat} {coords.lng}</span>
        </div>

        {/* Center: Glowing HUD Line with target icon */}
        <div className="flex-1 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/20 to-accent/40" />
          
          <div className="relative flex items-center justify-center w-6 h-6 flex-shrink-0">
            {/* Outer spinning brackets */}
            <div className="absolute inset-0 border border-accent/30 rounded-sm rotate-45 animate-spin-slow" style={{ animationDuration: '12s' }} />
            {/* Inner pulsing core */}
            <div className="w-1.5 h-1.5 bg-accent animate-pulse" />
          </div>

          <div className="flex-1 h-px bg-gradient-to-r from-accent/40 via-accent/20 to-transparent" />
        </div>

        {/* Right detail: System Status & Label */}
        <div className="hidden md:flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-accent animate-ping" />
            <span className="text-white/40">{label}</span>
          </span>
          <span className="text-white/10">|</span>
          <span className="font-mono text-accent/50">SYS_V4.2</span>
        </div>
      </div>
    </div>
  );
}
