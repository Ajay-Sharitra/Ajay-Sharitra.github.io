import React, { useState, useEffect, useRef } from 'react';
import { EXPERTISE_CATEGORIES } from '../../data/skills';
import { gsap } from '../../animations/gsapConfig';
import { animateSVGPaths } from '../../animations/scrollAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ExpertiseProps {
  onCursorHover: (hovering: boolean, label?: string) => void;
}

export default function Expertise({ onCursorHover }: ExpertiseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (svgContainerRef.current) {
        const paths = svgContainerRef.current.querySelectorAll<SVGGeometryElement>('line, path');
        if (paths.length > 0) {
          animateSVGPaths(paths, sectionRef.current!);
        }
      }

      if (cardsContainerRef.current) {
        const rows = cardsContainerRef.current.querySelectorAll('.expertise-domain-row');
        gsap.fromTo(
          rows,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 84%'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const activeCategory = EXPERTISE_CATEGORIES[activeIndex] || EXPERTISE_CATEGORIES[0];

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative w-full bg-[#070707] text-[#f5f5f5] py-20 sm:py-28 md:py-40 overflow-hidden"
    >
      {/* Background Architectural Crimson SVG Geometry */}
      <div
        ref={svgContainerRef}
        className="absolute inset-0 pointer-events-none opacity-35 flex items-center justify-center overflow-hidden z-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 1080"
          fill="none"
          className="w-full h-full object-cover"
        >
          <line x1="-56.9" y1="540.3" x2="1986.1" y2="540.3" stroke="#990000" strokeWidth="1" />
          <line x1="959.8" y1="540.2" x2="264.8" y2="-153.8" stroke="#990000" strokeWidth="1" />
          <line x1="564.8" y1="540.2" x2="-152.5" y2="-128.8" stroke="#990000" strokeWidth="1" />
          <line x1="565.2" y1="541.2" x2="-152.2" y2="1210.2" stroke="#990000" strokeWidth="1" />
          <line x1="371.2" y1="540.8" x2="1090.2" y2="1206.8" stroke="#990000" strokeWidth="1" />
          <line x1="1544.8" y1="540.2" x2="827.5" y2="-128.8" stroke="#990000" strokeWidth="1" />
          <line x1="1545.2" y1="541.2" x2="827.8" y2="1210.2" stroke="#990000" strokeWidth="1" />
          <line x1="959.8" y1="539.8" x2="1654.2" y2="-154.2" stroke="#990000" strokeWidth="1" />
          <path d="M959.5 540L406.6 1092.1" stroke="#990000" strokeWidth="1" />
          <line x1="959.3" y1="1207.1" x2="959.3" y2="-126" stroke="#990000" strokeWidth="1" />
          <path
            d="M1356.75 933.75H565.25V145.75L1356.75 143.25V933.75Z"
            stroke="#990000"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/15 pb-6 sm:pb-8 mb-10 sm:mb-16 gap-5 sm:gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="font-mono-tech text-xs text-[#d60407]">03 // CAPABILITIES</span>
              <span className="text-white/25">/</span>
              <span className="font-mono-tech text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white/70">
                FIVE CORE DOMAINS
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.1rem,6vw,6.2rem)] uppercase leading-[0.88] tracking-tight">
              TECHNICAL <span className="font-serif-accent text-[#d60407] lowercase">expertise</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#a3a3a3] max-w-md leading-relaxed">
            Five interconnected engineering pillars—combining software development, CCNA network
            infrastructure, defensive security, PyTorch LLM mechanics, and practical automation.
          </p>
        </div>

        {/* Main Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left 7 Columns: 5 Interactive Domain Rows */}
          <div
            ref={cardsContainerRef}
            className="lg:col-span-7 divide-y divide-white/10 border-t border-b border-white/10"
          >
            {EXPERTISE_CATEGORIES.map((cat, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <div
                  key={cat.id}
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') {
                      setActiveIndex(idx);
                      onCursorHover(true, cat.shortTitle);
                    }
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === 'mouse') {
                      onCursorHover(false);
                    }
                  }}
                  onClick={() => setActiveIndex(idx)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(idx);
                    }
                  }}
                  className={`expertise-domain-row py-6 sm:py-8 md:py-10 px-3.5 sm:px-5 md:px-6 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#d60407]/[0.08] border-l-4 border-l-[#d60407]'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="flex items-baseline gap-3 sm:gap-5 md:gap-6 min-w-0">
                      <span
                        className={`font-serif-accent text-2xl sm:text-3xl md:text-4xl transition-colors shrink-0 ${
                          isSelected ? 'text-[#d60407]' : 'text-white/40'
                        }`}
                      >
                        {cat.num}
                      </span>
                      <div className="min-w-0">
                        <h3
                          className={`font-display text-lg sm:text-2xl md:text-3xl uppercase tracking-tight transition-colors ${
                            isSelected ? 'text-white' : 'text-white/80'
                          }`}
                        >
                          {cat.title}
                        </h3>
                        <div className="font-mono-tech text-[11px] sm:text-xs text-[#d60407] uppercase tracking-[0.14em] mt-1">
                          {cat.subtitle}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`font-mono-tech text-[10px] sm:text-xs px-2.5 py-1 border transition-all shrink-0 ${
                        isSelected
                          ? 'border-[#d60407] bg-[#d60407] text-white'
                          : 'border-white/15 text-white/45'
                      }`}
                    >
                      {isSelected ? 'ACTIVE' : 'TAP'}
                    </span>
                  </div>

                  {/* Expanded Details */}
                  <div
                    className={`grid transition-all duration-500 ease-out overflow-hidden ${
                      isSelected ? 'grid-rows-[1fr] opacity-100 mt-5 sm:mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'
                    }`}
                  >
                    <div className="overflow-hidden space-y-4 sm:space-y-5 pl-0 md:pl-12">
                      <p className="text-sm sm:text-base text-[#c4c4c4] leading-relaxed">
                        {cat.description}
                      </p>

                      {/* Deliverables List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {cat.deliverables.map((del, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-start gap-2 text-xs text-white/85 font-mono-tech"
                          >
                            <span className="text-[#d60407] shrink-0">+</span>
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>

                      {/* Relevant Technologies Pills */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {cat.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-mono-tech text-[11px] uppercase tracking-wider px-3 py-1 bg-black/80 border border-[#d60407]/40 text-[#f5f5f5]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Mobile Inline Visual Representation */}
                      <div className="lg:hidden relative aspect-[16/9] w-full overflow-hidden border border-white/15 mt-4">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <span className="absolute bottom-3 left-3 right-3 font-mono-tech text-[10px] tracking-[0.18em] uppercase text-[#d60407]">
                          {cat.metrics}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 5 Columns: Sticky Cinematic Visual Composition (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
            <div className="relative bg-[#0d0d0d] border border-white/15 overflow-hidden p-6">
              {/* Top Telemetry Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 font-mono-tech text-[11px] tracking-[0.2em] uppercase">
                <span className="text-[#d60407]">DOMAIN // {activeCategory.num}</span>
                <span className="text-white/50">{activeCategory.shortTitle}</span>
              </div>

              {/* Layered Image Composition */}
              <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-black border border-white/10">
                {EXPERTISE_CATEGORIES.map((cat, idx) => (
                  <img
                    key={cat.id}
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                      idx === activeIndex
                        ? 'opacity-100 scale-100 filter-none'
                        : 'opacity-0 scale-110 blur-sm pointer-events-none'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />

                <div className="absolute inset-x-0 bottom-4 px-5 flex flex-col">
                  <span className="font-serif-accent text-5xl text-[#d60407] leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                    {activeCategory.shortTitle}
                  </span>
                  <span className="font-mono-tech text-[10px] tracking-[0.22em] uppercase text-white/80 mt-2">
                    {activeCategory.metrics}
                  </span>
                </div>
              </div>

              {/* Technology Quick Matrix */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between font-mono-tech text-[11px] text-white/60">
                <span>STACK VERIFIED</span>
                <span className="text-[#d60407]">{activeCategory.technologies.length} TECHNOLOGIES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
