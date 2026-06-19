'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  city: z.string().min(2, 'Please enter your city'),
  propertyType: z.string().min(1, 'Please select a property type'),
  cameras: z.string().min(1, 'Please select camera quantity'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const propertyTypes = [
  'Residential Home', 'Apartment Complex', 'Office Building', 'Retail Store',
  'Warehouse / Factory', 'Hospital / Healthcare', 'School / College',
  'Government / PSU', 'Other',
];

const cameraOptions = [
  '1–4 cameras', '5–10 cameras', '11–20 cameras', '21–50 cameras',
  '51–100 cameras', '100+ cameras',
];

// Floating camera decoration
function FloatingCamera() {
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

    const draw = () => {
      t += 0.01;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Ambient particles
      for (let i = 0; i < 60; i++) {
        const x = (Math.sin(i * 2.5 + t * 0.3) * 0.4 + 0.5) * W;
        const y = (Math.cos(i * 1.7 + t * 0.2) * 0.4 + 0.5) * H;
        const size = Math.sin(i + t) * 1 + 1.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${0.1 + Math.sin(i + t) * 0.05})`;
        ctx.fill();
      }

      // Rotating rings
      const cx = W * 0.5, cy = H * 0.45;
      [80, 120, 160].forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,212,255,${0.06 - i * 0.015})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4 + i * 2, 8 + i * 2]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Ping waves
      const pingR = ((t * 30) % 120);
      ctx.beginPath();
      ctx.arc(cx, cy, pingR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,212,255,${Math.max(0, 0.3 - pingR / 120 * 0.3)})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((res) => setTimeout(res, 1500));
    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setSubmitted(true);

    // Animate success
    gsap.fromTo(
      '.success-panel',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll('.form-field'),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: section, start: 'top 70%' },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-bg-primary pt-28 pb-40 overflow-hidden"
      aria-label="Contact and Booking"
    >
      {/* Canvas background */}
      <FloatingCamera />
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="section-header">
          <div className="section-label">Get Started</div>
          <h2 className="section-title">
            Book Your Free
            <br />
            <span className="text-accent">Site Inspection</span>
          </h2>
          <p className="section-subtitle">
            Our security experts will visit your site, assess your needs, and provide a custom security plan — completely free.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info sidebar */}
          <div className="space-y-5">
            {/* Quick contact cards */}
            <div className="glass p-7">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center glass-accent">
                  <Phone size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-white/30 font-inter mb-1.5" style={{ lineHeight: '1.6' }}>Call Us Now</p>
                  <a href="tel:+918000000000" className="text-white font-semibold hover:text-accent transition-colors cursor-none">
                    +91 800 000 0000
                  </a>
                  <p className="text-xs text-white/30 font-inter mt-1.5" style={{ lineHeight: '1.6' }}>Mon–Sun, 24/7</p>
                </div>
              </div>
            </div>

            <div className="glass p-7">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center glass-accent">
                  <Mail size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-white/30 font-inter mb-1.5" style={{ lineHeight: '1.6' }}>Email Us</p>
                  <a href="mailto:security@guardianeye.in" className="text-white font-semibold hover:text-accent transition-colors cursor-none text-sm">
                    security@guardianeye.in
                  </a>
                  <p className="text-xs text-white/30 font-inter mt-1.5" style={{ lineHeight: '1.6' }}>Reply within 1 hour</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/918000000000?text=Hi%2C%20I%27m%20interested%20in%20a%20free%20site%20inspection"
              target="_blank"
              rel="noopener noreferrer"
              id="whatsapp-btn"
              className="glass p-7 flex items-center gap-4 group hover:border-green-500/30 transition-all duration-300 cursor-none"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-green-500/10 border border-green-500/30">
                <MessageCircle size={16} className="text-green-400" />
              </div>
              <div>
                <p className="text-xs text-white/30 font-inter mb-1.5" style={{ lineHeight: '1.6' }}>WhatsApp</p>
                <p className="text-white font-semibold group-hover:text-green-400 transition-colors duration-300">
                  Chat with Expert
                </p>
                <p className="text-xs text-white/30 font-inter mt-1.5" style={{ lineHeight: '1.6' }}>Instant response</p>
              </div>
            </a>

            {/* Features list */}
            <div className="glass-accent p-7">
              <p className="text-xs tracking-widest uppercase text-accent/60 font-inter mb-5" style={{ lineHeight: '1.6' }}>
                What You Get
              </p>
              {[
                'Free site assessment',
                'Custom security plan',
                'Camera placement map',
                'Cost breakdown',
                'No obligation quote',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5">
                  <CheckCircle2 size={14} className="text-accent flex-shrink-0" />
                  <span className="text-sm text-white/60 font-inter" style={{ lineHeight: '1.6' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="success-panel glass h-full min-h-96 flex flex-col items-center justify-center text-center p-12 opacity-0">
                <div className="w-20 h-20 flex items-center justify-center glass-accent rounded-full mb-6">
                  <CheckCircle2 size={36} className="text-accent" />
                </div>
                <h3 className="text-3xl font-bold font-space text-white mb-4">
                  Request Received!
                </h3>
                <p className="text-white/50 font-inter max-w-sm mb-8">
                  Our security expert will contact you within 2 hours to schedule your free site inspection.
                </p>
                <div className="flex gap-4">
                  <a href="tel:+918000000000" className="btn-primary">Call Now</a>
                  <a
                    href="https://wa.me/918000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="glass p-8 space-y-6"
                noValidate
              >
                {/* Name + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-field space-y-2 opacity-0">
                    <label className="form-label" htmlFor="fullName">Full Name</label>
                    <input
                      id="fullName"
                      className="form-input"
                      placeholder="John Smith"
                      {...register('fullName')}
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-xs flex items-center gap-1 font-inter">
                        <AlertCircle size={12} /> {errors.fullName.message}
                      </p>
                    )}
                  </div>
                  <div className="form-field space-y-2 opacity-0">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      className="form-input"
                      placeholder="+91 98765 43210"
                      type="tel"
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs flex items-center gap-1 font-inter">
                        <AlertCircle size={12} /> {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email + City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-field space-y-2 opacity-0">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      className="form-input"
                      placeholder="john@company.com"
                      type="email"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs flex items-center gap-1 font-inter">
                        <AlertCircle size={12} /> {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="form-field space-y-2 opacity-0">
                    <label className="form-label" htmlFor="city">City</label>
                    <input
                      id="city"
                      className="form-input"
                      placeholder="Mumbai"
                      {...register('city')}
                    />
                    {errors.city && (
                      <p className="text-red-400 text-xs flex items-center gap-1 font-inter">
                        <AlertCircle size={12} /> {errors.city.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Property type + Cameras */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-field space-y-2 opacity-0">
                    <label className="form-label" htmlFor="propertyType">Property Type</label>
                    <select
                      id="propertyType"
                      className="form-input"
                      style={{ appearance: 'none', background: 'rgba(255,255,255,0.03)' }}
                      {...register('propertyType')}
                    >
                      <option value="" style={{ background: '#111' }}>Select type...</option>
                      {propertyTypes.map((t) => (
                        <option key={t} value={t} style={{ background: '#111' }}>{t}</option>
                      ))}
                    </select>
                    {errors.propertyType && (
                      <p className="text-red-400 text-xs flex items-center gap-1 font-inter">
                        <AlertCircle size={12} /> {errors.propertyType.message}
                      </p>
                    )}
                  </div>
                  <div className="form-field space-y-2 opacity-0">
                    <label className="form-label" htmlFor="cameras">Cameras Required</label>
                    <select
                      id="cameras"
                      className="form-input"
                      style={{ appearance: 'none', background: 'rgba(255,255,255,0.03)' }}
                      {...register('cameras')}
                    >
                      <option value="" style={{ background: '#111' }}>Select range...</option>
                      {cameraOptions.map((t) => (
                        <option key={t} value={t} style={{ background: '#111' }}>{t}</option>
                      ))}
                    </select>
                    {errors.cameras && (
                      <p className="text-red-400 text-xs flex items-center gap-1 font-inter">
                        <AlertCircle size={12} /> {errors.cameras.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="form-field space-y-2 opacity-0">
                  <label className="form-label" htmlFor="message">Additional Requirements (Optional)</label>
                  <textarea
                    id="message"
                    className="form-input resize-none h-28"
                    placeholder="Tell us about your security requirements, existing systems, or specific concerns..."
                    {...register('message')}
                  />
                </div>

                {/* Submit */}
                <div className="form-field flex flex-col sm:flex-row gap-4 opacity-0">
                  <button
                    id="form-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex-1 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Book Free Site Inspection →'}
                  </button>
                  <a
                    href="tel:+918000000000"
                    id="form-call-btn"
                    className="btn-outline text-center"
                  >
                    Talk to Expert
                  </a>
                </div>

                <p className="text-xs text-white/20 font-inter text-center mt-20" style={{ lineHeight: '1.6' }}>
                  By submitting, you agree to our Privacy Policy. We'll never share your data.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
