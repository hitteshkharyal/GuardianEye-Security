'use client';

const footerLinks = {
  Solutions: ['Residential CCTV', 'Commercial Security', 'Industrial Surveillance', 'Smart City', 'Remote Monitoring', 'AI Analytics'],
  Products: ['Dome Cameras', 'Bullet Cameras', 'PTZ Cameras', 'Thermal Cameras', 'NVR Systems', 'Cloud Storage'],
  Company: ['About Us', 'Our Process', 'Case Studies', 'Careers', 'Blog', 'Contact'],
};

export default function Footer() {
  return (
    <footer
      className="relative bg-bg-primary overflow-hidden"
      aria-label="Site footer"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      {/* Top accent line — a thin glow above content for premium feel */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)' }}
      />

      <div className="section-container" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-10 gap-y-14 mb-16">
          {/* Brand column */}
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 relative flex-shrink-0">
                <div className="absolute inset-0 border border-accent/60 rotate-45" />
                <div className="absolute inset-1 border border-accent/30 rotate-45" />
                <div className="absolute inset-2 bg-accent/20 rotate-45" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-[0.2em] uppercase font-space">GuardianEye</p>
                <p className="text-[0.6rem] tracking-[0.4em] uppercase text-accent/60 font-inter">Security</p>
              </div>
            </div>

            <p
              className="text-sm text-white/50 font-inter max-w-xs mb-8"
              style={{ lineHeight: '1.9' }}
            >
              See Everything. Miss Nothing. Premium CCTV and AI surveillance solutions engineered for modern security challenges.
            </p>

            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
              <span className="text-xs text-white/40 font-inter" style={{ lineHeight: '1.7' }}>
                24/7 Monitoring Active
              </span>
            </div>

            <div className="flex gap-3 flex-wrap">
              {['ISO 27001', 'SOC 2', 'NDAA'].map((cert) => (
                <span
                  key={cert}
                  className="text-[0.6rem] text-accent/50 font-inter border border-accent/20 px-2.5 py-1.5 tracking-wider"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3
                className="text-[0.7rem] tracking-[0.3em] uppercase text-white/40 font-inter mb-7 font-medium"
              >
                {category}
              </h3>
              <ul className="space-y-0">
                {links.map((link) => (
                  <li key={link} className="py-2">
                    <a
                      href="#contact"
                      className="text-sm text-white/40 hover:text-accent transition-colors duration-300 font-inter cursor-none"
                      style={{ lineHeight: '1.75' }}
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px mb-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)' }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-xs text-white/25 font-inter" style={{ lineHeight: '1.8' }}>
            © 2024 GuardianEye Security. All rights reserved.
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-white/25 hover:text-white/50 transition-colors font-inter cursor-none"
                style={{ lineHeight: '1.8' }}
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-xs text-white/15 font-inter" style={{ lineHeight: '1.8' }}>
            Designed with precision. Built for trust.
          </p>
        </div>
      </div>
    </footer>
  );
}
