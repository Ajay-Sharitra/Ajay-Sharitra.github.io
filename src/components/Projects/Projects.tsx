import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS, Project } from '../../data/projects';
import { gsap } from '../../animations/gsapConfig';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
  onCursorHover: (hovering: boolean, label?: string) => void;
}

export default function Projects({ onSelectProject, onCursorHover }: ProjectsProps) {
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const prefersReducedMotion = useReducedMotion();

  const pinnedWrapperRef = useRef<HTMLDivElement>(null);
  const mobileListRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const circleStrokeRef = useRef<SVGCircleElement>(null);
  const lastStepIdxRef = useRef<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = PROJECTS.length;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  // Desktop Pinned Scroll Showcase (Optimized: Only tweens when active step index changes)
  useEffect(() => {
    if (!isDesktop || prefersReducedMotion || !pinnedWrapperRef.current) return;

    const steps = stepsRefs.current.filter(Boolean) as HTMLDivElement[];
    if (steps.length === 0) return;

    const getStepState = (offset: number) => {
      if (offset === 0) {
        return {
          top: '20%',
          scale: 1,
          opacity: 1,
          filter: 'brightness(1) blur(0px)',
          pointerEvents: 'auto' as const
        };
      }
      if (offset === -1) {
        return {
          top: '-18%',
          scale: 0.45,
          opacity: 0.25,
          filter: 'brightness(0.4) blur(4px)',
          pointerEvents: 'none' as const
        };
      }
      if (offset <= -2) {
        return {
          top: '-35%',
          scale: 0.2,
          opacity: 0,
          filter: 'brightness(0.2) blur(8px)',
          pointerEvents: 'none' as const
        };
      }
      if (offset === 1) {
        return {
          top: '68%',
          scale: 0.42,
          opacity: 0.35,
          filter: 'brightness(0.45) blur(3px)',
          pointerEvents: 'none' as const
        };
      }
      return {
        top: '88%',
        scale: 0.18,
        opacity: 0.1,
        filter: 'brightness(0.2) blur(6px)',
        pointerEvents: 'none' as const
      };
    };

    const ctx = gsap.context(() => {
      lastStepIdxRef.current = 0;

      steps.forEach((el, idx) => {
        gsap.set(el, {
          ...getStepState(idx),
          zIndex: total - idx
        });
      });

      if (circleStrokeRef.current) {
        gsap.set(circleStrokeRef.current, {
          strokeDasharray: circumference,
          strokeDashoffset: circumference
        });
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: pinnedWrapperRef.current,
          start: 'top top',
          end: () => `+=${total * 95}%`,
          pin: true,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const exact = Math.min(self.progress * total, total - 0.0001);
            const currentIdx = Math.floor(exact);
            const localProgress = exact - currentIdx;

            if (circleStrokeRef.current) {
              const overallOffset = circumference * (1 - (currentIdx + localProgress) / total);
              circleStrokeRef.current.style.strokeDashoffset = String(overallOffset);
            }

            if (currentIdx !== lastStepIdxRef.current) {
              lastStepIdxRef.current = currentIdx;
              setActiveIndex(currentIdx);

              steps.forEach((stepEl, sIdx) => {
                const offset = sIdx - currentIdx;
                const target = getStepState(offset);
                gsap.to(stepEl, {
                  top: target.top,
                  scale: target.scale,
                  opacity: target.opacity,
                  filter: target.filter,
                  pointerEvents: target.pointerEvents,
                  duration: 0.55,
                  ease: 'power3.out',
                  overwrite: 'auto'
                });
              });
            }
          }
        }
      });
    }, pinnedWrapperRef);

    return () => ctx.revert();
  }, [isDesktop, prefersReducedMotion, total, circumference]);

  // Mobile & Tablet Scroll-Triggered Card Reveals
  useEffect(() => {
    if (isDesktop || prefersReducedMotion || !mobileListRef.current) return;

    const ctx = gsap.context(() => {
      const cards = mobileListRef.current!.querySelectorAll('.mobile-project-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 86%'
            }
          }
        );
      });
    }, mobileListRef);

    return () => ctx.revert();
  }, [isDesktop, prefersReducedMotion]);

  const currentProject = PROJECTS[activeIndex] || PROJECTS[0];

  return (
    <section id="work" className="relative w-full bg-[#050505] text-[#f5f5f5]">
      {/* Section Intro Banner */}
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12 pt-20 sm:pt-28 pb-10 sm:pb-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="font-mono-tech text-xs text-[#d60407]">05 // SELECTED WORKS</span>
              <span className="text-white/25">/</span>
              <span className="font-mono-tech text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white/70">
                CASE STUDIES 01—0{total}
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.1rem,6vw,6.2rem)] uppercase leading-[0.88] tracking-tight">
              SELECTED <span className="font-serif-accent text-[#d60407] lowercase">projects</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#a3a3a3] max-w-md leading-relaxed">
            Real production systems, offline desktop applications, open-source Python executables,
            AI/LLM architectures, and CCNA infrastructure deployments. Select any project to inspect
            its full engineering case study.
          </p>
        </div>
      </div>

      {/* DESKTOP EXPERIENCE: Pinned Scroll Storytelling */}
      {isDesktop && !prefersReducedMotion ? (
        <div
          ref={pinnedWrapperRef}
          className="relative w-full h-screen overflow-hidden bg-[#050505] select-none"
        >
          {/* Blurred Dynamic Background Layer */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {PROJECTS.map((proj, idx) => (
              <img
                key={proj.id}
                src={proj.cover}
                alt=""
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover scale-110 blur-[26px] brightness-[0.28] transition-opacity duration-700 ${
                  idx === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          </div>

          {/* Left & Right Fixed Editorial Context */}
          <div className="relative z-20 h-full max-w-[1680px] mx-auto px-8 xl:px-14 flex items-center justify-between pointer-events-none">
            {/* Left Project Title, Category & Problem */}
            <div className="w-[26%] space-y-5 pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#d60407]/20 border border-[#d60407]/50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d60407] live-crimson-dot" />
                <span className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#f5f5f5]">
                  {currentProject.badge}
                </span>
              </div>

              <div className="font-mono-tech text-xs tracking-[0.2em] uppercase text-[#d60407]">
                {currentProject.category}
              </div>

              <h3 className="font-display text-4xl xl:text-6xl uppercase leading-[0.9] tracking-tight text-white">
                {currentProject.title}
              </h3>

              <p className="text-sm text-[#c4c4c4] leading-relaxed">
                {currentProject.summary}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/15">
                {currentProject.stats.map((st, sIdx) => (
                  <div key={sIdx}>
                    <div className="font-mono-tech text-[9px] tracking-[0.18em] uppercase text-white/50">
                      {st.label}
                    </div>
                    <div className="font-display text-sm xl:text-base text-[#d60407] mt-0.5">
                      {st.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectProject(currentProject)}
                  onMouseEnter={() => onCursorHover(true, 'CASE STUDY')}
                  onMouseLeave={() => onCursorHover(false)}
                  className="px-5 py-3 bg-[#d60407] hover:bg-[#990000] text-white font-mono-tech text-[11px] tracking-[0.2em] uppercase transition-colors"
                >
                  OPEN CASE STUDY ↗
                </button>
                {currentProject.githubUrl && (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => onCursorHover(true, 'GITHUB')}
                    onMouseLeave={() => onCursorHover(false)}
                    className="px-4 py-3 bg-white/5 hover:bg-white hover:text-black border border-white/20 text-white font-mono-tech text-[11px] tracking-[0.18em] uppercase transition-colors"
                  >
                    REPO
                  </a>
                )}
              </div>
            </div>

            {/* Right Problem & Tech Stack Panel */}
            <div className="w-[24%] text-right space-y-6 pointer-events-auto flex flex-col items-end">
              <div>
                <div className="font-mono-tech text-[10px] tracking-[0.22em] uppercase text-[#d60407] mb-2">
                  PROBLEM SOLVED
                </div>
                <p className="text-xs xl:text-sm text-[#b8b8b8] leading-relaxed">
                  {currentProject.problemSolved}
                </p>
              </div>

              <div>
                <div className="font-mono-tech text-[10px] tracking-[0.22em] uppercase text-white/50 mb-2.5">
                  TECHNOLOGY STACK
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {currentProject.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono-tech text-[10px] uppercase tracking-wider px-2.5 py-1 bg-black/80 border border-white/15 text-white/85"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Circular Step Progress Indicator */}
              <div className="pt-4 flex items-center gap-4">
                <div className="text-right">
                  <div className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-white/50">
                    SCROLL PROGRESS
                  </div>
                  <div className="font-mono-tech text-xs text-[#d60407]">
                    PROJECT {currentProject.id} OF 0{total}
                  </div>
                </div>
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg width="96" height="96" className="-rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r={radius}
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <circle
                      ref={circleStrokeRef}
                      cx="48"
                      cy="48"
                      r={radius}
                      stroke="#d60407"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  <span className="absolute font-serif-accent text-3xl text-white">
                    {currentProject.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Pinned Project Preview Cards */}
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              ref={(el) => {
                stepsRefs.current[idx] = el;
              }}
              onClick={() => onSelectProject(proj)}
              onMouseEnter={() => onCursorHover(true, 'VIEW')}
              onMouseLeave={() => onCursorHover(false)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${proj.title} Case Study`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(proj);
                }
              }}
              className="absolute left-[29vw] w-[42vw] h-[58vh] bg-[#111] border border-white/20 hover:border-[#d60407] overflow-hidden cursor-pointer group shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
            >
              <img
                src={proj.cover}
                alt={proj.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Bottom Overlay Inside Card */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="font-mono-tech text-[10px] tracking-[0.22em] uppercase text-[#d60407] block">
                    {proj.year} // {proj.role}
                  </span>
                  <span className="font-display text-2xl uppercase tracking-tight text-white">
                    {proj.title}
                  </span>
                </div>
                <span className="px-3.5 py-2 bg-[#d60407] text-white font-mono-tech text-[10px] tracking-[0.2em] uppercase">
                  INSPECT CASE ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* MOBILE & TABLET DELIBERATE EXPERIENCE: Vertical Case-Study Storytelling Cards */
        <div
          ref={mobileListRef}
          className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12 pb-20 sm:pb-24 space-y-8 sm:space-y-12"
        >
          {PROJECTS.map((proj) => (
            <article
              key={proj.id}
              className="mobile-project-card bg-[#0c0c0c] border border-white/15 overflow-hidden flex flex-col"
            >
              {/* Visual Preview */}
              <div
                onClick={() => onSelectProject(proj)}
                className="relative aspect-[16/10] w-full overflow-hidden bg-black cursor-pointer"
              >
                <img
                  src={proj.cover}
                  alt={proj.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-black/45" />
                <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 right-3.5 sm:right-4 flex items-center justify-between gap-2">
                  <span className="font-serif-accent text-2xl sm:text-3xl text-white bg-black/75 px-3 py-0.5 border border-white/15">
                    {proj.id}
                  </span>
                  <span className="font-mono-tech text-[9px] sm:text-[10px] tracking-[0.16em] uppercase px-2.5 sm:px-3 py-1 bg-[#d60407] text-white">
                    {proj.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-8 space-y-4 sm:space-y-5">
                <div>
                  <div className="font-mono-tech text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#d60407] mb-1">
                    {proj.category}
                  </div>
                  <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-tight text-white">
                    {proj.title}
                  </h3>
                </div>

                {/* Quick Stats Strip on Mobile */}
                <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-white/10">
                  {proj.stats.map((st, sIdx) => (
                    <div key={sIdx}>
                      <div className="font-mono-tech text-[9px] tracking-[0.14em] uppercase text-white/50">
                        {st.label}
                      </div>
                      <div className="font-display text-xs sm:text-sm text-[#d60407] mt-0.5">
                        {st.value}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm sm:text-base text-[#c4c4c4] leading-relaxed">
                  {proj.summary}
                </p>

                <div className="p-3.5 sm:p-4 bg-black/60 border-l-2 border-[#d60407]">
                  <div className="font-mono-tech text-[10px] tracking-[0.18em] uppercase text-[#d60407] mb-1">
                    PROBLEM SOLVED
                  </div>
                  <p className="text-xs sm:text-sm text-[#a3a3a3] leading-relaxed">
                    {proj.problemSolved}
                  </p>
                </div>

                {/* Key Features */}
                <ul className="space-y-1.5 pt-1">
                  {proj.highlights.slice(0, 3).map((hl, hIdx) => (
                    <li key={hIdx} className="text-xs sm:text-sm text-white/85 flex items-start gap-2">
                      <span className="text-[#d60407] font-mono-tech shrink-0">+</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono-tech text-[10px] uppercase tracking-wider px-2.5 py-1 bg-white/5 border border-white/12 text-white/85"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onSelectProject(proj)}
                    className="flex-1 sm:flex-none px-6 py-3.5 bg-[#d60407] hover:bg-[#990000] text-white font-mono-tech text-xs tracking-[0.18em] uppercase text-center min-h-[46px]"
                  >
                    FULL CASE STUDY ↗
                  </button>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3.5 border border-white/20 text-white font-mono-tech text-xs tracking-[0.18em] uppercase text-center min-h-[46px] flex items-center justify-center"
                    >
                      GITHUB ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
