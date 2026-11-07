import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PROFILE } from '../data/profile';

interface ProfileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConnect: () => void;
}

export default function ProfileOverlay({
  isOpen,
  onClose,
  onOpenConnect,
}: ProfileOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      wasOpenRef.current = true;
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power4.out' }
        );
      }
    } else if (!isOpen) {
      wasOpenRef.current = false;
    }
  }, [isOpen]);

  const handleClose = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        yPercent: 100,
        opacity: 0,
        duration: 0.28,
        ease: 'power3.in',
        onComplete: () => {
          wasOpenRef.current = false;
          onClose();
        },
      });
    } else {
      wasOpenRef.current = false;
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[60] bg-[#0b0b0b] flex flex-col overflow-y-auto custom-scrollbar select-text text-[#cee49f]"
      style={{ cursor: 'auto' }}
    >
      {/* Top Header */}
      <div className="sticky top-0 z-20 flex justify-between items-center px-6 md:px-16 py-6 bg-[#0b0b0b] border-b border-[#cee49f]/15">
        <div className="flex items-center gap-4">
          <span className="mono text-[calc(10*var(--px))] text-[#cee49f] opacity-60">
            PROFILE / PERSPECTIVE
          </span>
          <span className="opacity-30">/</span>
          <span className="mono text-[calc(10*var(--px))] text-[#cee49f] uppercase tracking-wider">
            {PROFILE.name}
          </span>
        </div>

        <button
          onClick={handleClose}
          className="pill flex items-center gap-2 hover:bg-[#cee49f] hover:text-[#0b0b0b] transition-colors"
          style={{ cursor: 'pointer' }}
          aria-label="Close profile"
        >
          <span>CLOSE</span>
          <span className="text-xs">✕</span>
        </button>
      </div>

      {/* Main Body */}
      <div className="max-w-5xl mx-auto w-full px-6 md:px-12 py-12 md:py-20">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="mono text-xs text-[#cee49f]/60 uppercase tracking-widest mb-4">
            {PROFILE.location} · {PROFILE.credentials[0]}
          </div>
          <h1 className="font-sans-bold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.9]">
            {PROFILE.name}
          </h1>
          <h2 className="mono text-sm md:text-base tracking-widest uppercase opacity-75 mt-4">
            {PROFILE.title}
          </h2>

          {/* Manifesto Quote Box */}
          <div className="mt-10 p-6 md:p-8 bg-[#cee49f]/5 border-l-2 border-[#cee49f] rounded-[2px]">
            <p className="font-serif-light text-2xl md:text-3xl italic text-[#cee49f] leading-snug">
              "{PROFILE.manifestoQuote}"
            </p>
            <div className="mono text-xs uppercase tracking-widest opacity-60 mt-4">
              — Ajay Sharitra · The Vision
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-[#cee49f]/20 mb-16">
          {PROFILE.stats.map((stat, i) => (
            <div key={i}>
              <div className="mono text-[10px] text-[#cee49f]/50 uppercase tracking-widest">
                {stat.label}
              </div>
              <div className="font-sans-bold text-2xl md:text-3xl text-[#cee49f] mt-1">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Bio Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="mono text-xs uppercase tracking-widest opacity-60 mb-2">
              THE PHILOSOPHY
            </h3>
            <p className="mono text-xs opacity-80 leading-relaxed">
              Why a neighbourhood tech practice matters.
            </p>
          </div>
          <div className="md:col-span-2 space-y-6 text-base md:text-lg leading-relaxed font-light opacity-90">
            {PROFILE.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Three Layers Business Model */}
        <div className="mb-20">
          <div className="mono text-xs uppercase tracking-widest opacity-60 mb-6">
            THE 3-LAYER SUSTAINABLE PRACTICE
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROFILE.layers.map((layer, i) => (
              <div
                key={i}
                className="p-6 bg-[#cee49f]/5 border border-[#cee49f]/20 rounded-[2px] flex flex-col justify-between"
              >
                <div>
                  <div className="mono text-xs text-[#cee49f]/50 mb-2">
                    LAYER {layer.num}
                  </div>
                  <h4 className="font-sans-bold text-xl uppercase tracking-tight mb-2">
                    {layer.title}
                  </h4>
                  <div className="mono text-[11px] opacity-70 mb-4">{layer.subtitle}</div>
                  <p className="text-sm opacity-80 leading-relaxed mb-6">
                    {layer.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#cee49f]/10">
                  <div className="mono text-[10px] uppercase tracking-widest opacity-50 mb-2">
                    EXAMPLES
                  </div>
                  <ul className="space-y-1 text-xs opacity-75">
                    {layer.examples.map((ex, exIdx) => (
                      <li key={exIdx}>• {ex}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Matrix */}
        <div className="mb-16">
          <div className="mono text-xs uppercase tracking-widest opacity-60 mb-6">
            ENGINEERING CAPABILITIES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROFILE.skills.map((cat, i) => (
              <div key={i} className="p-6 border border-[#cee49f]/15 rounded-[2px]">
                <h5 className="mono text-xs tracking-wider uppercase mb-4 text-[#cee49f]">
                  {cat.title}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="mono text-xs px-2.5 py-1 bg-[#cee49f]/10 border border-[#cee49f]/20 rounded-[2px]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to Connect */}
        <div className="p-8 md:p-12 border border-[#cee49f]/30 rounded-[2px] text-center flex flex-col items-center">
          <h3 className="font-sans-bold text-2xl md:text-3xl uppercase tracking-tight">
            Let's Build Something Useful Together
          </h3>
          <p className="mono text-xs opacity-75 mt-2 max-w-xl">
            Whether you need a custom business application, network infrastructure setup, or honest technical advice.
          </p>
          <button
            onClick={() => {
              onClose();
              onOpenConnect();
            }}
            className="mt-6 px-8 py-3 bg-[#cee49f] text-[#0b0b0b] font-mono-medium font-bold text-xs uppercase tracking-wider rounded-[2px] hover:opacity-90 transition-opacity"
            style={{ cursor: 'pointer' }}
          >
            GET IN TOUCH ↗
          </button>
        </div>
      </div>
    </div>
  );
}
