'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useAppStore } from '@/lib/store/useAppStore';

// Procedural CCTV Camera mesh
function CCTVCamera({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const lensLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Slow auto-rotation
    groupRef.current.rotation.y += 0.003;

    // Mouse parallax tilt
    const targetX = mouseRef.current.y * 0.3;
    const targetZ = mouseRef.current.x * 0.3;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.z += (-targetZ - groupRef.current.rotation.z) * 0.05;

    // Pulsing lens glow
    if (lensLightRef.current) {
      lensLightRef.current.intensity = 2 + Math.sin(t * 2) * 1.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Camera Body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.4, 0.5, 2.2, 32]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Front Lens Ring */}
      <mesh position={[0, 1.15, 0]}>
        <torusGeometry args={[0.38, 0.06, 16, 64]} />
        <meshStandardMaterial color="#00D4FF" metalness={1} roughness={0.1} emissive="#00D4FF" emissiveIntensity={0.5} />
      </mesh>

      {/* Lens Glass */}
      <mesh position={[0, 1.25, 0]}>
        <circleGeometry args={[0.32, 64]} />
        <meshStandardMaterial
          color="#001a2e"
          metalness={0.2}
          roughness={0}
          transparent
          opacity={0.9}
          emissive="#00D4FF"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Inner Lens Layers */}
      <mesh position={[0, 1.26, 0]}>
        <circleGeometry args={[0.2, 64]} />
        <meshStandardMaterial color="#000820" metalness={0} roughness={0} transparent opacity={0.95} emissive="#0066ff" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 1.27, 0]}>
        <circleGeometry args={[0.1, 64]} />
        <meshStandardMaterial color="#00D4FF" metalness={0} roughness={0} transparent opacity={0.6} emissive="#00D4FF" emissiveIntensity={1} />
      </mesh>

      {/* Mounting Base */}
      <mesh position={[0, -1.3, 0]}>
        <sphereGeometry args={[0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#080808" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Mounting Bracket */}
      <mesh position={[0, -1.5, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.15, 0.4, 0.6]} />
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Cable Detail */}
      <mesh position={[0.1, -1.8, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Accent ring detail on body */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.51, 0.02, 8, 64]} />
        <meshStandardMaterial color="#00D4FF" metalness={1} roughness={0} emissive="#00D4FF" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <torusGeometry args={[0.45, 0.015, 8, 64]} />
        <meshStandardMaterial color="#00D4FF" metalness={1} roughness={0} emissive="#00D4FF" emissiveIntensity={0.2} />
      </mesh>

      {/* Lens point light */}
      <pointLight ref={lensLightRef} position={[0, 1.5, 0.5]} color="#00D4FF" intensity={3} distance={4} />
    </group>
  );
}

// Instanced particle field
function ParticleField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 800;

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15
      );
      dummy.scale.setScalar(Math.random() * 0.5 + 0.1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, dummy.matrix);
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
      dummy.position.y += Math.sin(t * 0.3 + i * 0.1) * 0.002;
      dummy.rotation.y = t * 0.1 + i;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[0.015, 0]} />
      <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.8} transparent opacity={0.7} />
    </instancedMesh>
  );
}

// Volumetric light rays
function LightRays() {
  return (
    <>
      <mesh position={[-3, 3, -5]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.02, 2, 12, 8, 1, true]} />
        <meshStandardMaterial color="#00D4FF" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
      <mesh position={[3, 4, -6]} rotation={[0, 0, -Math.PI / 8]}>
        <cylinderGeometry args={[0.02, 1.5, 10, 8, 1, true]} />
        <meshStandardMaterial color="#00D4FF" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>
    </>
  );
}

function Scene({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      <fog attach="fog" args={['#050505', 8, 25]} />
      <ambientLight intensity={0.05} />
      <pointLight position={[-5, 5, 5]} color="#00D4FF" intensity={2} distance={15} />
      <pointLight position={[5, -3, 3]} color="#0066ff" intensity={1} distance={10} />
      <spotLight position={[0, 8, 0]} color="#ffffff" intensity={0.5} angle={0.4} penumbra={1} castShadow />

      <LightRays />
      <ParticleField />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <CCTVCamera mouseRef={mouseRef} />
      </Float>
    </>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isLoading = useAppStore((s) => s.isLoading);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(headingRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' })
      .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.6')
      .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5');
  }, [isLoading]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-bg-primary"
      aria-label="Hero section"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#050505' }}
        >
          <Scene mouseRef={mouseRef} />
        </Canvas>
      </div>

      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,212,255,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }}
      />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 sm:pb-28 px-6 text-center">
        {/* Status indicator */}
        <div className="flex items-center gap-2 mb-6 glass-accent px-4 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-inter">
            AI Surveillance Active
          </span>
        </div>

        {/* Main headline */}
        <h1
          ref={headingRef}
          className="section-title text-white mb-6 opacity-0"
          style={{ lineHeight: '0.9' }}
        >
          <span className="block">See Everything.</span>
          <span className="block text-accent glow-text">Miss Nothing.</span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="section-subtitle max-w-xl mb-10 opacity-0"
        >
          AI-powered surveillance solutions engineered for modern security.
          <br />
          <span className="text-white/40 text-sm">Protecting what matters most.</span>
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto opacity-0">
          <button
            id="hero-book-btn"
            className="btn-primary w-full sm:w-auto"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Free Site Inspection
          </button>
          <button
            id="hero-explore-btn"
            className="btn-outline w-full sm:w-auto"
            onClick={() => document.querySelector('#solutions')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Solutions
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[0.6rem] tracking-[0.4em] uppercase text-white/30 font-inter">Scroll</span>
        <div className="scroll-indicator__line" />
      </div>

      {/* Side labels */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-3">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-accent/30" />
        <span
          className="text-[0.6rem] tracking-[0.4em] uppercase text-white/25 font-inter"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          GuardianEye Security
        </span>
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-3">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-accent/30" />
        <span
          className="text-[0.6rem] tracking-[0.4em] uppercase text-white/25 font-inter"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Established 2010
        </span>
      </div>
    </section>
  );
}
