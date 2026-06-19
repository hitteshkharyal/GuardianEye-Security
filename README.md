# GuardianEye Security

A premium, high-performance web application for a modern CCTV and Security solutions company. This project features cutting-edge UI/UX, smooth scroll animations, and dynamic 3D elements to create a "wow" experience for visitors.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/) (ScrollTrigger) & CSS Animations
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Form Handling**: React Hook Form & Zod

## Key Features

- **Dynamic Hero Section**: Real-time canvas scanning effect with floating interface elements.
- **Lens Fly-Through Experience**: A GSAP-powered 3D tunnel scroll animation simulating a camera lens assembly.
- **Horizontal Product Showcase**: Pin-and-scroll horizontal track for hardware products.
- **Interactive Storytelling**: Scroll-triggered text revealing and metric counting.
- **Global Network Map**: Pulse animations and connection lines mapping out service coverage.
- **Premium Aesthetics**: Dark mode default, neon cyan accents (`#00D4FF`), glassmorphism cards, and technical monospace typography elements.

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository (if you haven't already).
2. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Copy the example environment file and fill in your local details if you are connecting to a backend:

```bash
cp .env.example .env.local
```

### Running the Development Server

Start the local server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/app`: Next.js App Router layout, page, and global CSS.
- `/components/core`: Reusable UI elements (Navbar, Footer, SectionDivider, Preloader).
- `/components/sections`: The major building blocks of the homepage (HeroSection, LensFlyThrough, ContactSection, etc.).
- `/lib`: Utilities and Zustand store configuration.

## Future Backend Integration

The project is currently a frontend-only Next.js application, perfectly styled and animated. Environment files (`.env.local`) have been set up in preparation for the backend phase (e.g., connecting the contact form to a database or CRM).

## License

All rights reserved by GuardianEye Security.
