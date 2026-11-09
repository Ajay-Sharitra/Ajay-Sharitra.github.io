import React, { useEffect, useRef } from 'react';
import { PROFESSIONAL_EXPERIENCE } from '../../data/experience';
import { gsap } from '../../animations/gsapConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ExperienceProps {
  onCursorHover: (hovering: boolean, label?: string) => void;
}

export default function Experience({ onCursorHover }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const timelineWrapRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Vertical Crimson Spine Scrub
      if (progressLineRef.current && timelineWrapRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineWrapRef.current,
              start: 'top 72%',
              end: 'bottom 58%',
              scrub: 0.4
            }
          }
        );
      }

      // Timeline Cards Reveal
      if (timelineWrapRef.current) {
        const cards = timelineWrapRef.current.querySelectorAll('.timeline-entry-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%'
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-[#060606] text-[#f5f5f5] py-20 sm:py-28 md:py-40 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/15 pb-6 sm:pb-8 mb-12 sm:mb-20 gap-5 sm:gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="font-mono-tech text-xs text-[#d60407]">06 // TRAJECTORY</span>
              <span className="text-white/25">/</span>
              <span className="font-mono-tech text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white/70">
                PROFESSIONAL EXPERIENCE
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.1rem,6vw,6.2rem)] uppercase leading-[0.88] tracking-tight">
              FIELD <span className="font-serif-accent text-[#d60407] lowercase">experience</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#a3a3a3] max-w-md leading-relaxed">
            Grounded engineering across commercial software development, NIC eOffice digital
            governance support, R&amp;D institutional IT infrastructure, and CCNA network security.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div ref={timelineWrapRef} className="relative">
          {/* Background Spine Track */}
          <div className="absolute left-3.5 sm:left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/12 -translate-x-1/2" />

          {/* Animated Crimson Progress Spine */}
          <div
            ref={progressLineRef}
            className="absolute left-3.5 sm:left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#d60407] -translate-x-1/2 shadow-[0_0_20px_rgba(214,4,7,0.8)]"
          />

          <div className="space-y-12 sm:space-y-16 md:space-y-24">
            {PROFESSIONAL_EXPERIENCE.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.id}
                  className="timeline-entry-card relative grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-start pl-10 sm:pl-12 md:pl-0"
                >
                  {/* Center Node Marker */}
                  <div className="absolute left-3.5 sm:left-4 md:left-1/2 top-1.5 sm:top-2 -translate-x-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 bg-[#050505] border-2 border-[#d60407] flex items-center justify-center">
                    <span className="font-mono-tech text-[10px] text-[#d60407]">{item.index}</span>
                  </div>

                  {/* Left Column (Desktop Even: Metadata, Odd: Card) */}
                  <div
                    className={`md:col-span-5 ${
                      isEven ? 'md:text-right md:pr-10' : 'md:order-2 md:pl-10'
                    }`}
                  >
                    <div className="inline-block px-3 py-1 bg-[#d60407]/15 border border-[#d60407]/40 font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#d60407] mb-2.5 sm:mb-3">
                      {item.period}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-white">
                      {item.role}
                    </h3>
                    <div className="font-mono-tech text-xs text-white/75 uppercase tracking-wider mt-1">
                      {item.organization}
                    </div>
                    <div className="font-mono-tech text-[11px] text-white/45 mt-1">
                      {item.environment} · {item.location}
                    </div>
                  </div>

                  <div className="hidden md:block md:col-span-2" />

                  {/* Right Column: Detailed Responsibilities Panel */}
                  <div
                    onMouseEnter={() => onCursorHover(true, item.index)}
                    onMouseLeave={() => onCursorHover(false)}
                    className={`md:col-span-5 ${
                      isEven ? 'md:pl-4' : 'md:order-1 md:pr-4'
                    }`}
                  >
                    <div className="p-5 sm:p-6 md:p-8 bg-[#0c0c0c] border border-white/12 hover:border-[#d60407]/60 transition-colors space-y-4 sm:space-y-5">
                      <p className="text-sm sm:text-base text-[#d4d4d4] leading-relaxed">
                        {item.summary}
                      </p>

                      <div className="space-y-2.5 pt-2 border-t border-white/10">
                        <div className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#d60407]">
                          KEY RESPONSIBILITIES &amp; DELIVERABLES
                        </div>
                        <ul className="space-y-2">
                          {item.responsibilities.map((resp, rIdx) => (
                            <li
                              key={rIdx}
                              className="text-xs sm:text-sm text-[#a3a3a3] leading-relaxed flex items-start gap-2.5"
                            >
                              <span className="text-[#d60407] font-mono-tech pt-0.5 shrink-0">+</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.domains.map((dom) => (
                          <span
                            key={dom}
                            className="font-mono-tech text-[10px] uppercase tracking-wider px-2.5 py-1 bg-black border border-white/15 text-white/80"
                          >
                            {dom}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
