import React, { useEffect, useRef } from 'react';
import { PROJECTS, Project } from '../../data/projects';
import { gsap } from '../../animations/gsapConfig';

interface CaseStudiesProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onCursorHover: (hovering: boolean, label?: string) => void;
}

export default function CaseStudies({
  project,
  onClose,
  onSelectProject,
  onCursorHover
}: CaseStudiesProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!project || !overlayRef.current) return;

    overlayRef.current.scrollTop = 0;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.5 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 0.65,
          ease: 'power4.inOut'
        }
      );

      if (heroImgRef.current) {
        gsap.fromTo(
          heroImgRef.current,
          { scale: 1.12, filter: 'brightness(0.35)' },
          {
            scale: 1,
            filter: 'brightness(1)',
            duration: 1.1,
            delay: 0.2,
            ease: 'power3.out'
          }
        );
      }

      if (contentRef.current) {
        const blocks = contentRef.current.querySelectorAll('.case-study-reveal');
        gsap.fromTo(
          blocks,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.06,
            delay: 0.25,
            ease: 'power3.out'
          }
        );
      }
    }, overlayRef);

    return () => ctx.revert();
  }, [project]);

  const handleAnimatedClose = () => {
    if (!overlayRef.current) {
      onClose();
      return;
    }
    gsap.to(overlayRef.current, {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 0.45,
      ease: 'power4.inOut',
      onComplete: onClose
    });
  };

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleAnimatedClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project]);

  if (!project) return null;

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Case Study`}
      data-lenis-prevent
      className="fixed inset-0 z-[2100] bg-[#070707] text-[#f5f5f5] overflow-y-auto overflow-x-hidden select-text min-h-dvh-safe"
    >
      {/* Blurred Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        <img
          src={project.cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover blur-[40px] scale-110"
        />
        <div className="absolute inset-0 bg-[#070707]/80" />
      </div>

      {/* Sticky Top Case-Study Control Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between gap-2 px-4 sm:px-6 md:px-12 py-3.5 sm:py-4 bg-[#070707]/92 backdrop-blur-md border-b border-white/15 safe-top-pad">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="font-mono-tech text-[10px] sm:text-xs text-[#d60407] shrink-0">
            CASE // {project.id}
          </span>
          <span className="text-white/25 shrink-0">/</span>
          <span className="font-mono-tech text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.18em] uppercase text-white/85 truncate">
            {project.title}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => onSelectProject(prevProject)}
            onMouseEnter={() => onCursorHover(true, 'PREV')}
            onMouseLeave={() => onCursorHover(false)}
            aria-label={`Previous Project: ${prevProject.title}`}
            className="px-2.5 sm:px-3.5 py-2 border border-white/15 hover:border-[#d60407] font-mono-tech text-[10px] tracking-[0.16em] uppercase text-white/80 hover:text-white transition-colors min-h-[40px] flex items-center"
          >
            <span>←</span>
            <span className="hidden md:inline ml-1.5">{prevProject.title}</span>
          </button>
          <button
            onClick={() => onSelectProject(nextProject)}
            onMouseEnter={() => onCursorHover(true, 'NEXT')}
            onMouseLeave={() => onCursorHover(false)}
            aria-label={`Next Project: ${nextProject.title}`}
            className="px-2.5 sm:px-3.5 py-2 border border-white/15 hover:border-[#d60407] font-mono-tech text-[10px] tracking-[0.16em] uppercase text-white/80 hover:text-white transition-colors min-h-[40px] flex items-center"
          >
            <span className="hidden md:inline mr-1.5">{nextProject.title}</span>
            <span>→</span>
          </button>
          <button
            onClick={handleAnimatedClose}
            onMouseEnter={() => onCursorHover(true, 'CLOSE')}
            onMouseLeave={() => onCursorHover(false)}
            aria-label="Close Case Study"
            className="px-3.5 sm:px-4 py-2 bg-[#d60407] hover:bg-[#990000] text-white font-mono-tech text-[10px] sm:text-xs tracking-[0.18em] uppercase transition-colors flex items-center gap-1.5 min-h-[40px]"
          >
            <span>CLOSE</span>
            <span>✕</span>
          </button>
        </div>
      </div>

      {/* Main Case Study Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14 md:py-20 space-y-12 sm:space-y-16 safe-bottom-pad"
      >
        {/* 1. Header & Overview */}
        <header className="case-study-reveal space-y-5 sm:space-y-6">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="px-3 py-1 bg-[#d60407] text-white font-mono-tech text-[10px] tracking-[0.2em] uppercase">
              {project.badge}
            </span>
            <span className="font-mono-tech text-xs tracking-[0.18em] uppercase text-[#d60407]">
              {project.year} · {project.role}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.9] text-white">
            {project.title}
          </h1>

          <p className="font-serif-accent text-xl sm:text-2xl md:text-3xl text-white/90 max-w-4xl leading-snug">
            {project.summary}
          </p>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 py-5 sm:py-6 border-y border-white/15">
            {project.stats.map((st, idx) => (
              <div key={idx}>
                <div className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-white/50">
                  {st.label}
                </div>
                <div className="font-display text-xl sm:text-2xl md:text-3xl text-[#d60407] mt-1">
                  {st.value}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* 2. Hero Visual Preview */}
        <div className="case-study-reveal relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border border-white/20 bg-black">
          <img
            ref={heroImgRef}
            src={project.cover}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 3. Problem Solved & Full Overview */}
        <div className="case-study-reveal grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 pt-2 sm:pt-4">
          <div className="lg:col-span-5 bg-[#111] border-l-4 border-[#d60407] p-5 sm:p-6 md:p-8 space-y-3">
            <div className="font-mono-tech text-xs tracking-[0.22em] uppercase text-[#d60407]">
              01 // THE PROBLEM BEING SOLVED
            </div>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              {project.problemSolved}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="font-mono-tech text-xs tracking-[0.22em] uppercase text-white/50">
              02 // SYSTEM OVERVIEW
            </div>
            <p className="text-sm sm:text-base md:text-lg text-[#c4c4c4] leading-relaxed">
              {project.overview}
            </p>
          </div>
        </div>

        {/* 4. Technical Architecture Breakdown */}
        <div className="case-study-reveal space-y-5 sm:space-y-6 pt-6 sm:pt-8 border-t border-white/15">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-white">
              03 // TECHNICAL <span className="font-serif-accent text-[#d60407] lowercase">architecture</span>
            </h2>
            <span className="font-mono-tech text-xs text-white/40 uppercase tracking-widest">
              LAYERED DESIGN
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {project.architecture.map((arch, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 bg-[#0e0e0e] border border-white/12 hover:border-[#d60407]/60 transition-colors"
              >
                <div className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#d60407] mb-2">
                  LAYER 0{idx + 1}
                </div>
                <h3 className="font-display text-base sm:text-lg uppercase text-white mb-2.5">
                  {arch.layer}
                </h3>
                <p className="text-xs sm:text-sm text-[#a3a3a3] leading-relaxed">{arch.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Development Process & Key Features */}
        <div className="case-study-reveal grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pt-6 sm:pt-8 border-t border-white/15">
          {/* Development Process */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-white">
              04 // DEVELOPMENT <span className="font-serif-accent text-[#d60407] lowercase">process</span>
            </h2>
            <div className="space-y-3.5 sm:space-y-4">
              {project.developmentProcess.map((step, idx) => (
                <div key={idx} className="p-4 sm:p-5 bg-[#0e0e0e] border border-white/10">
                  <div className="font-mono-tech text-xs text-[#d60407] uppercase tracking-wider mb-1">
                    {step.phase}
                  </div>
                  <p className="text-xs sm:text-sm text-[#c4c4c4] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features / Engineering Highlights */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-white">
              05 // KEY <span className="font-serif-accent text-[#d60407] lowercase">features</span>
            </h2>
            <div className="space-y-3">
              {project.highlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 bg-[#0e0e0e] border border-white/10 flex items-start gap-3"
                >
                  <span className="font-mono-tech text-xs text-[#d60407] pt-0.5 shrink-0">
                    0{idx + 1}.
                  </span>
                  <span className="text-xs sm:text-sm md:text-base text-white/90">{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Challenges, Implementation Details & Final Outcome */}
        <div className="case-study-reveal grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/15">
          <div className="p-5 sm:p-6 bg-[#0e0e0e] border border-white/12">
            <div className="font-mono-tech text-xs tracking-[0.2em] uppercase text-[#d60407] mb-3">
              06 // ENGINEERING CHALLENGES
            </div>
            <p className="text-xs sm:text-sm text-[#c4c4c4] leading-relaxed">
              {project.challenges}
            </p>
          </div>

          <div className="p-5 sm:p-6 bg-[#0e0e0e] border border-white/12">
            <div className="font-mono-tech text-xs tracking-[0.2em] uppercase text-[#d60407] mb-3">
              07 // IMPLEMENTATION DETAILS
            </div>
            <p className="text-xs sm:text-sm text-[#c4c4c4] leading-relaxed">
              {project.implementationDetails}
            </p>
          </div>

          <div className="p-5 sm:p-6 bg-[#d60407]/10 border border-[#d60407]/40">
            <div className="font-mono-tech text-xs tracking-[0.2em] uppercase text-[#d60407] mb-3">
              08 // FINAL OUTCOME
            </div>
            <p className="text-xs sm:text-sm text-white leading-relaxed">{project.finalOutcome}</p>
          </div>
        </div>

        {/* 7. Visual Gallery & Technology Stack */}
        <div className="case-study-reveal space-y-6 sm:space-y-8 pt-6 sm:pt-8 border-t border-white/15">
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-white">
            09 // VISUAL <span className="font-serif-accent text-[#d60407] lowercase">plates</span> &amp; STACK
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {project.gallery.map((item, idx) => (
              <figure key={idx} className="bg-[#0e0e0e] border border-white/15 overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <figcaption className="p-3.5 sm:p-4 font-mono-tech text-xs text-white/75">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Tech Stack & Action Links */}
          <div className="p-5 sm:p-6 md:p-8 bg-[#0e0e0e] border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-white/50">
                VERIFIED TECHNOLOGIES USED
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono-tech text-xs uppercase px-3 py-1 bg-black border border-[#d60407]/40 text-white"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 bg-[#d60407] hover:bg-[#990000] text-white font-mono-tech text-xs tracking-[0.2em] uppercase transition-colors text-center"
                >
                  GITHUB REPOSITORY ↗
                </a>
              )}
              {project.externalUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 border border-white/25 hover:border-white text-white font-mono-tech text-xs tracking-[0.2em] uppercase transition-colors text-center"
                >
                  EXTERNAL LINK ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Case Study Navigation Footer */}
        <div className="pt-6 sm:pt-8 pb-8 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <button
            onClick={() => onSelectProject(prevProject)}
            className="w-full sm:w-auto px-5 sm:px-6 py-4 bg-[#111] hover:bg-[#d60407] text-white border border-white/15 font-mono-tech text-xs tracking-[0.18em] uppercase transition-colors text-center sm:text-left"
          >
            ← PREV: {prevProject.title}
          </button>
          <button
            onClick={handleAnimatedClose}
            className="w-full sm:w-auto px-5 sm:px-6 py-4 bg-white/5 hover:bg-white hover:text-black text-white font-mono-tech text-xs tracking-[0.18em] uppercase transition-colors text-center"
          >
            RETURN TO PORTFOLIO
          </button>
          <button
            onClick={() => onSelectProject(nextProject)}
            className="w-full sm:w-auto px-5 sm:px-6 py-4 bg-[#111] hover:bg-[#d60407] text-white border border-white/15 font-mono-tech text-xs tracking-[0.18em] uppercase transition-colors text-center sm:text-right"
          >
            NEXT: {nextProject.title} →
          </button>
        </div>
      </div>
    </div>
  );
}
