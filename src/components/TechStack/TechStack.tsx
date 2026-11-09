import React, { useEffect, useRef, useState } from 'react';
import { TECHNICAL_ARSENAL } from '../../data/skills';
import { gsap } from '../../animations/gsapConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface TechStackProps {
  onCursorHover: (hovering: boolean, label?: string) => void;
}

export default function TechStack({ onCursorHover }: TechStackProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const groups = gridRef.current.querySelectorAll('.arsenal-group-panel');
        gsap.fromTo(
          groups,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 84%'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="arsenal"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-[#f5f5f5] py-20 sm:py-28 md:py-40 border-t border-white/10 overflow-hidden"
    >
      {/* Subtle Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #d60407 1px, transparent 1px), linear-gradient(to bottom, #d60407 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/15 pb-6 sm:pb-8 mb-10 sm:mb-16 gap-5 sm:gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="font-mono-tech text-xs text-[#d60407]">04 // TECHNICAL ARSENAL</span>
              <span className="text-white/25">/</span>
              <span className="font-mono-tech text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white/70">
                VERIFIED TECHNOLOGY STACK
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.1rem,6vw,6.2rem)] uppercase leading-[0.88] tracking-tight">
              SYSTEMS <span className="font-serif-accent text-[#d60407] lowercase">arsenal</span>
            </h2>
          </div>

          <div className="max-w-md space-y-2">
            <p className="text-sm sm:text-base text-[#a3a3a3] leading-relaxed">
              Every technology listed below is backed by real implementation—spanning production
              software, Cisco network engineering, cybersecurity auditing, and PyTorch LLM research.
            </p>
          </div>
        </div>

        {/* 6 Structured Animated Skill Matrices */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {TECHNICAL_ARSENAL.map((group) => (
            <div
              key={group.id}
              className="arsenal-group-panel bg-[#0c0c0c] border border-white/12 hover:border-[#d60407]/60 transition-all duration-300 flex flex-col justify-between p-5 sm:p-6 md:p-8 relative group"
            >
              {/* Top Corner Accent */}
              <div className="absolute top-0 left-0 w-10 h-[2px] bg-[#d60407] group-hover:w-full transition-all duration-500" />

              <div>
                {/* Group Header */}
                <div className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-5 sm:mb-6">
                  <div>
                    <span className="font-mono-tech text-[10px] tracking-[0.22em] sm:tracking-[0.24em] uppercase text-[#d60407] block mb-1">
                      CLUSTER // {group.index}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-white">
                      {group.category}
                    </h3>
                  </div>
                  <span className="font-serif-accent text-3xl text-white/30 group-hover:text-[#d60407] transition-colors">
                    {group.index}
                  </span>
                </div>

                <p className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-white/55 mb-5 sm:mb-6">
                  {group.subtitle}
                </p>

                {/* Animated Skill Rows */}
                <div className="space-y-3.5 sm:space-y-4">
                  {group.items.map((item) => {
                    const key = `${group.id}-${item.name}`;
                    const isHovered = hoveredSkill === key;
                    return (
                      <div
                        key={item.name}
                        onPointerEnter={(e) => {
                          if (e.pointerType === 'mouse') {
                            setHoveredSkill(key);
                            onCursorHover(true, item.tag);
                          }
                        }}
                        onPointerLeave={(e) => {
                          if (e.pointerType === 'mouse') {
                            setHoveredSkill(null);
                            onCursorHover(false);
                          }
                        }}
                        onClick={() => setHoveredSkill((prev) => (prev === key ? null : key))}
                        className={`p-3.5 sm:p-4 border transition-all duration-300 ${
                          isHovered
                            ? 'bg-[#d60407]/12 border-[#d60407]'
                            : 'bg-[#121212] border-white/8'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-display text-sm sm:text-base uppercase tracking-wider text-white flex items-center gap-2">
                            <span
                              className={`w-1.5 h-1.5 rounded-full transition-colors shrink-0 ${
                                isHovered ? 'bg-[#d60407]' : 'bg-white/40'
                              }`}
                            />
                            {item.name}
                          </span>
                          <span className="font-mono-tech text-[10px] tracking-[0.16em] uppercase px-2 py-0.5 bg-black/70 border border-white/15 text-[#d60407] shrink-0">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#a3a3a3] leading-relaxed">{item.context}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Telemetry */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] uppercase text-white/45">
                <span>VERIFIED CAPABILITY</span>
                <span className="text-[#d60407]">0{group.items.length} MODULES</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
