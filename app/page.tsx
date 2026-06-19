'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Preloader from '@/components/core/Preloader';
import Navbar from '@/components/core/Navbar';
import CustomCursor from '@/components/core/CustomCursor';
import Footer from '@/components/core/Footer';
import SectionDivider from '@/components/core/SectionDivider';
import { useAppStore } from '@/lib/store/useAppStore';

// Dynamic imports for heavy 3D sections
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  ssr: false,
  loading: () => <div className="h-screen bg-bg-primary" />,
});

const LensFlyThrough = dynamic(() => import('@/components/sections/LensFlyThrough'), {
  ssr: false,
  loading: () => <div style={{ height: '400vh' }} className="bg-bg-primary" />,
});

// Other sections can render SSR
import MonitoringWorld from '@/components/sections/MonitoringWorld';
import ProductShowcase from '@/components/sections/ProductShowcase';
import GlobalNetwork from '@/components/sections/GlobalNetwork';
import IndustrySolutions from '@/components/sections/IndustrySolutions';
import AIStorytelling from '@/components/sections/AIStorytelling';
import ProcessJourney from '@/components/sections/ProcessJourney';
import Testimonials from '@/components/sections/Testimonials';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  const isLoading = useAppStore((s) => s.isLoading);

  useEffect(() => {
    // Lenis smooth scroll setup
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      return lenis;
    };

    let lenis: Awaited<ReturnType<typeof initLenis>> | null = null;

    if (!isLoading) {
      initLenis().then((l) => { lenis = l; });
    }

    return () => {
      if (lenis) {
        (lenis as { destroy?: () => void }).destroy?.();
      }
    };
  }, [isLoading]);

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Ambient scan line */}
      <div className="scan-line" aria-hidden="true" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Preloader */}
      <Preloader />

      {/* Main content */}
      <main className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />

        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Lens Fly-Through (Signature Experience) */}
        <LensFlyThrough />

        {/* Section 3: AI Monitoring World */}
        <MonitoringWorld />

        <SectionDivider sectionId="SEC_03" label="AI_MONITORING_ONLINE" />

        {/* Section 4: Product Showcase */}
        <ProductShowcase />

        <SectionDivider sectionId="SEC_04" label="OPTICS_CALIBRATION_OK" />

        {/* Section 5: Global Network */}
        <GlobalNetwork />

        <SectionDivider sectionId="SEC_05" label="NETWORK_SYNC_ACTIVE" />

        {/* Section 6: Industry Solutions */}
        <IndustrySolutions />

        <SectionDivider sectionId="SEC_06" label="SECURITY_POLICIES_APPLIED" />

        {/* Section 7: AI Storytelling */}
        <AIStorytelling />

        <SectionDivider sectionId="SEC_07" label="NEURAL_NET_LOAD_12%" />

        {/* Section 8: Process Journey */}
        <ProcessJourney />

        <SectionDivider sectionId="SEC_08" label="DEPLOYMENT_FLOW_READY" />

        {/* Section 9: Testimonials */}
        <Testimonials />

        <SectionDivider sectionId="SEC_09" label="COMMUNICATION_ESTABLISHED" />

        {/* Section 10: Contact */}
        <ContactSection />

        <Footer />
      </main>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/918000000000?text=Hi%2C%20I%27m%20interested%20in%20CCTV%20installation"
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className={`fixed bottom-8 right-8 z-[8000] flex items-center gap-3 glass-accent px-4 py-3 transition-all duration-500 hover:scale-105 cursor-none ${isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
        aria-label="Chat on WhatsApp"
        style={{
          border: '1px solid rgba(0,212,255,0.2)',
          boxShadow: '0 0 20px rgba(0,212,255,0.15)',
        }}
      >
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs tracking-widest uppercase font-inter text-white/70">
          Expert Online
        </span>
      </a>
    </>
  );
}
