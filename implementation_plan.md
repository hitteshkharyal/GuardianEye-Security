# GuardianEye Security — Cinematic Website

## Overview

A cinematic, scroll-driven luxury digital experience for a premium CCTV & AI surveillance company. Inspired by the storytelling depth, camera transitions, and immersive scroll feel of JeskoJets — but reimagined through the lens of an intelligent security ecosystem.

The user physically **travels** through a surveillance network. Not a website. A **journey**.

---

## Reference Analysis: JeskoJets Key Techniques

From the HTML source analysis, JeskoJets achieves its signature feel through:

- **Preloader with clip-mask globe** — cinematic intro before any content
- **Multi-layer hero parallax** — separate back/front/window layers animated independently  
- **`data-char-reveal`, `data-line-reveal`, `data-div-reveal`** attributes triggering staggered text animations
- **Window fly-through** — layered images (back → window frame → glass → front overlay) scaled/faded on scroll to create portal effect
- **Barba.js page transitions** — clip-path transitions between pages
- **Continuous cloud marquee animation** — subtle ambient motion in background
- **SVG animated paths** — `stroke-dasharray/offset` path drawing animations
- **CMS-driven content** — clean separation of data from presentation

**GuardianEye adaptation**: Replace jet window → CCTV lens. Sky → dark space with particles. Clouds → scanning data streams. Blueprint → camera schematics.

---

## Open Questions

> [!IMPORTANT]
> **Q1: Do you want a real backend/API integration?** (e.g., a form submission endpoint, WhatsApp API, CRM webhook) or just a fully functional frontend that's CRM-ready?

> [!IMPORTANT]
> **Q2: 3D model source for CCTV cameras?** Options:
> - **Option A**: Procedurally generate cameras in Three.js (pure code, instant, no assets needed)
> - **Option B**: I source a free GLTF model from Sketchfab/Three.js examples
> - **Option C**: Use stylized geometric approximations (fastest, looks great)
> 
> **Recommendation**: Option A — procedurally built cameras with Three.js geometry groups for maximum control and zero asset dependencies.

> [!IMPORTANT]
> **Q3: Globe in Section 5 — real geographical data or cinematic abstraction?** Options:
> - **Option A**: Full interactive globe with real lat/lon markers (Three.js globe with real data)
> - **Option B**: Cinematic abstract globe (glowing sphere, animated arcs, no real geo data)

> [!WARNING]
> **Build time**: This is a 10,000+ line project with 40+ files. I'll build it section by section in a single session. Expect 45–90 minutes of build time.

---

## Proposed Architecture

### Tech Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router (TypeScript) |
| Styling | Tailwind CSS v3 |
| 3D Engine | Three.js + React Three Fiber + Drei |
| Animation | GSAP 3 + ScrollTrigger + Framer Motion |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Fonts | Space Grotesk + Inter (Google Fonts) |
| Smooth Scroll | Lenis |

---

## Proposed Folder Structure

```
e:/cctv/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata, providers
│   ├── page.tsx                # Home page — assembles all sections
│   ├── globals.css             # Tailwind base + custom CSS
│   └── favicon.ico
├── components/
│   ├── core/
│   │   ├── CustomCursor.tsx    # Magnetic cursor with hover states
│   │   ├── Preloader.tsx       # Cinematic intro sequence
│   │   ├── Navbar.tsx          # Transparent nav, scroll-reactive
│   │   └── PageTransition.tsx  # Framer Motion page wrapper
│   ├── sections/
│   │   ├── HeroSection.tsx     # Section 1: 3D CCTV hero
│   │   ├── LensFlyThrough.tsx  # Section 2: Signature scroll experience
│   │   ├── MonitoringWorld.tsx # Section 3: AI monitoring control room
│   │   ├── ProductShowcase.tsx # Section 4: 3D camera showcase
│   │   ├── GlobalNetwork.tsx   # Section 5: Interactive globe
│   │   ├── IndustrySolutions.tsx # Section 6: Industry cards
│   │   ├── AIStorytelling.tsx  # Section 7: AI detection visualization
│   │   ├── ProcessJourney.tsx  # Section 8: Scroll timeline
│   │   ├── Testimonials.tsx    # Section 9: Glassmorphism cards
│   │   └── ContactSection.tsx  # Section 10: Premium contact form
│   └── ui/
│       ├── MagneticButton.tsx
│       ├── SplitText.tsx
│       ├── GlowBadge.tsx
│       ├── HUDElement.tsx
│       └── StatCounter.tsx
├── lib/
│   ├── three/
│   │   ├── CCTVCamera.tsx      # Procedural 3D camera geometry
│   │   ├── ParticleField.tsx   # Floating particle system
│   │   ├── Globe.tsx           # Interactive 3D globe
│   │   └── LensScene.tsx       # Fly-through lens scene
│   ├── gsap/
│   │   ├── animations.ts       # Reusable GSAP animation factories
│   │   └── scrollTriggers.ts   # ScrollTrigger configurations
│   ├── hooks/
│   │   ├── useLenis.ts         # Smooth scroll setup
│   │   ├── useMousePosition.ts # Global cursor tracking
│   │   ├── useScrollProgress.ts
│   │   └── useInView.ts
│   └── store/
│       └── useAppStore.ts      # Zustand global state
├── public/
│   └── fonts/                  # Self-hosted font fallbacks
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Section-by-Section Implementation

### Section 1 — Cinematic Hero
- **3D Scene**: React Three Fiber canvas with procedural CCTV camera (cylinder body + dome + lens ring)
- **Environment**: Black fog, 2000 floating particles (instanced mesh), 3 blue point lights
- **Animation**: Slow Y-axis auto-rotation + mouse parallax tilt (lerped)
- **Lens glow**: PointLight inside lens mesh, pulsing via sin wave
- **Text**: GSAP `SplitText` character reveal on load complete
- **CTAs**: Magnetic button with glow border + cursor distortion

### Section 2 — Lens Fly-Through (SIGNATURE)
- **Scroll height**: 400vh pinned section
- **Timeline (GSAP ScrollTrigger)**:
  - 0–20% scroll: Camera zooms toward viewer (scale 1→3, camera z 0→-5)
  - 20–50% scroll: Lens ring expands to fill viewport (CSS clip-path circle expanding)
  - 50–70% scroll: Chromatic aberration shader activates
  - 70–100% scroll: Viewer emerges inside monitoring world (crossfade to Section 3)
- **Technique**: Three.js camera animation along a bezier path + CSS clip-path overlay
- **Post-processing**: `@react-three/postprocessing` for depth of field + chromatic aberration
- **Mobile**: Simplified version — lens scale animation only, no path camera

### Section 3 — AI Monitoring World
- **Environment**: Dark control room grid, holographic floating panels
- **HUD Elements**: Animated SVG overlays (scanning rings, crosshairs)
- **Cards**: 6 feature cards floating with staggered Framer Motion entrance
- **Ambient**: Continuous particle data stream (canvas-based, not Three.js for perf)
- **Color grade**: CSS filter for green-tinted terminal feel → transitions to neutral

### Section 4 — 3D Product Showcase
- **Layout**: Horizontal scroll section (300vw inner container)
- **Products**: 4 cameras (Dome, Bullet, PTZ, Thermal) — each procedurally built
- **Per-product animation**:
  1. Camera slides in from right
  2. Auto-rotates to show all angles
  3. Hotspot labels appear (HTML elements positioned via `useFrame` worldToScreen)
  4. Specs panel slides in from left
- **ScrollTrigger**: `scrub: true` horizontal transform

### Section 5 — Global Security Network
- **Globe**: Three.js sphere with custom shader (dark oceans, glowing continents via texture)
- **Markers**: 15 instanced cone meshes at key cities
- **Arcs**: Animated `THREE.QuadraticBezierCurve3` lines between markers
- **Stats**: CountUp animation on enter viewport
- **Interaction**: Mouse rotation (lerped) + click-to-focus on markers

### Section 6 — Industry Solutions
- **Layout**: 3D card stack, scrolling through transforms each card's 3D perspective
- **8 industries** with icon, title, problem/solution brief
- **Emerge animation**: Cards rise from globe section via clip-path + translateY

### Section 7 — AI Security Storytelling
- **Canvas HUD**: Full-width canvas with animated scanning overlays
- **Face detection**: Animated bounding boxes appearing on dark backgrounds
- **Heat map**: Procedural gradient canvas animation
- **Behavior analytics**: Flowing SVG path animations
- **Timeline**: Staggered section reveals as user scrolls

### Section 8 — Process Journey
- **SVG path**: 7-step connected light path spanning full section width
- **ScrollTrigger path draw**: `stroke-dashoffset` animated as user scrolls
- **Step reveals**: Each step fades in as the path reaches it
- **Camera follow**: Subtle parallax on each step card

### Section 9 — Testimonials
- **Layout**: Glassmorphism cards in staggered grid
- **Mouse parallax**: Cards tilt subtly on cursor movement
- **Stats row**: Animated counters with glow accents
- **Company logos**: Marquee scroll

### Section 10 — Contact
- **Background**: Three.js scene with floating CCTV camera + particles
- **Form**: React Hook Form + Zod, custom styled inputs with glow-on-focus
- **Validation**: Real-time inline errors with smooth transitions
- **Success state**: Full-screen success animation (scan effect)
- **WhatsApp CTA**: Fixed bottom-right button

---

## Animation Architecture

```typescript
// Animation Manager
const animations = {
  textReveal: (target) => gsap.from(SplitText.chars, { y: 100, opacity: 0, stagger: 0.02 }),
  fadeUp: (target) => gsap.from(target, { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }),
  magneticButton: (el) => /* mouse distance → translate transform */,
  lensExpand: (progress) => /* clip-path circle(0% → 150%) */,
  cameraPath: (progress) => /* THREE.CatmullRomCurve3 point at t */,
}
```

---

## Performance Strategy

| Technique | Implementation |
|---|---|
| Instanced meshes | Particles, markers use `InstancedMesh` |
| Dynamic imports | All Three.js scenes lazy-loaded |
| Viewport culling | R3F `frustumCulled` on all meshes |
| GSAP kills | All ScrollTriggers killed on unmount |
| Image optimization | Next.js `<Image>` with `priority` on hero |
| Font display | `font-display: swap` + preconnect |
| Canvas pooling | Single R3F canvas shared across sections |
| Lenis scroll | Replaces native scroll for smooth inertia |
| GPU animations | All animations use `transform` + `opacity` only |
| Code splitting | `dynamic()` imports for each heavy section |

---

## Verification Plan

### During Build
- Check FPS in browser DevTools Performance panel after each Three.js section
- Verify ScrollTrigger pinning doesn't cause layout shifts
- Test on Safari (WebGL 1 fallback for post-processing)

### After Build  
- Lighthouse Performance score target: 80+ desktop, 65+ mobile
- Check `npm run build` completes without TypeScript errors
- Verify smooth scroll on all major sections
- Test form validation end-to-end
