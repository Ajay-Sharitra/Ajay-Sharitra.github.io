import React, { useEffect, useRef } from 'react';
import { PROFILE } from '../../data/profile';
import { gsap } from '../../animations/gsapConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AboutProps {
  onCursorHover: (hovering: boolean, label?: string) => void;
}

export default function About({ onCursorHover }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bigTitleRef = useRef<HTMLHeadingElement>(null);
  const leadWordsRef = useRef<HTMLParagraphElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Staggered Title Reveal
      if (bigTitleRef.current) {
        const chars = bigTitleRef.current.querySelectorAll('.about-title-line');
        gsap.fromTo(
          chars,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: bigTitleRef.current,
              start: 'top 84%'
            }
          }
        );
      }

      // Word-by-word Lead Reveal (Avoid GPU blur on mobile)
      if (leadWordsRef.current) {
        const words = leadWordsRef.current.querySelectorAll('.about-lead-word');
        mm.add(
          {
            isDesktop: '(min-width: 1024px)',
            isMobile: '(max-width: 1023px)'
          },
          (context) => {
            const { isDesktop } = context.conditions as { isDesktop: boolean };
            gsap.fromTo(
              words,
              {
                opacity: 0.18,
                y: isDesktop ? 24 : 14,
                filter: isDesktop ? 'blur(2px)' : 'none'
              },
              {
                opacity: 1,
                y: 0,
                filter: 'none',
                duration: isDesktop ? 0.85 : 0.65,
                stagger: isDesktop ? 0.024 : 0.016,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: leadWordsRef.current,
                  start: 'top 85%'
                }
              }
            );
          }
        );
      }

      // Asymmetric Image Clip-Path Reveal
      if (imageCardRef.current) {
        gsap.fromTo(
          imageCardRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.06 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.35,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: imageCardRef.current,
              start: 'top 84%'
            }
          }
        );
      }

      // Facts / Metrics Strip Reveal
      if (metricsRef.current) {
        const boxes = metricsRef.current.querySelectorAll('.metric-strip-row');
        gsap.fromTo(
          boxes,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: metricsRef.current,
              start: 'top 84%'
            }
          }
        );
      }
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  const leadWords = PROFILE.aboutLead.split(' ');

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-[#f5f5f5] pt-20 sm:pt-28 md:pt-40 overflow-hidden"
    >
      {/* Top Section Index Header */}
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-10 sm:mb-14">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="font-mono-tech text-xs text-[#d60407]">02 // IDENTITY</span>
            <span className="text-white/25">/</span>
            <span className="font-mono-tech text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white/70">
              ABOUT &amp; PHILOSOPHY
            </span>
          </div>
          <span className="font-mono-tech text-xs tracking-[0.18em] uppercase text-white/40 hidden sm:inline">
            B.E. COMPUTER SCIENCE &amp; ENGINEERING
          </span>
        </div>

        {/* Oversized Editorial Headline */}
        <div className="text-center py-4 sm:py-6 md:py-14">
          <p className="font-mono-tech text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#d60407] mb-3 sm:mb-4">
            COMPUTER SCIENCE · INFRASTRUCTURE · CYBERSECURITY
          </p>
          <h2
            ref={bigTitleRef}
            className="uppercase leading-[0.84] tracking-tight text-[#d60407] select-none"
          >
            <span className="block overflow-hidden">
              <span className="about-title-line block font-display text-[clamp(2.2rem,10.5vw,12.5rem)]">
                ENGINEERED
              </span>
            </span>
            <span className="block overflow-hidden -mt-0.5 md:-mt-4">
              <span className="about-title-line block font-serif-accent text-[clamp(2.6rem,12.5vw,14.5rem)] text-[#f5f5f5] lowercase">
                with
              </span>
            </span>
            <span className="block overflow-hidden -mt-0.5 md:-mt-4">
              <span className="about-title-line block font-display text-[clamp(2.2rem,10.5vw,12.5rem)]">
                INTENTION
              </span>
            </span>
          </h2>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mt-6 md:mt-16 pb-20 sm:pb-28">
          {/* Left Column: Asymmetric Portrait & Manifesto Quote */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div
              ref={imageCardRef}
              onMouseEnter={() => onCursorHover(true, 'AJAY .B')}
              onMouseLeave={() => onCursorHover(false)}
              className="relative overflow-hidden border border-white/15 bg-[#0d0d0d] group"
            >
              <div className="aspect-[4/5] w-full overflow-hidden relative">
                <img
                  src="/assets/portraits/ajay-crimson-hero.png"
                  alt="Ajay Sharitra Portrait"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 flex items-end justify-between gap-2">
                  <div>
                    <div className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#d60407]">
                      SYSTEMS ARCHITECT
                    </div>
                    <div className="font-display text-lg sm:text-xl uppercase tracking-tight text-white">
                      {PROFILE.fullName}
                    </div>
                  </div>
                  <span className="font-mono-tech text-[10px] px-2.5 py-1 bg-[#d60407] text-white uppercase tracking-widest shrink-0">
                    CCNA
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary Portrait & Grounded Manifesto Card */}
            <div className="p-5 sm:p-6 md:p-8 bg-[#0d0d0d] border-l-2 border-[#d60407] space-y-4">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <img
                  src="/assets/portraits/ajay-editorial.png"
                  alt="Ajay Sharitra"
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-cover object-top rounded-full border border-[#d60407]/50 shrink-0"
                />
                <div>
                  <div className="font-mono-tech text-[10px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[#d60407]">
                    GROUNDED ENGINEERING MANIFESTO
                  </div>
                  <div className="font-mono-tech text-xs text-white/60">
                    Tirunelveli, Tamil Nadu
                  </div>
                </div>
              </div>
              <blockquote className="font-serif-accent text-xl sm:text-2xl md:text-3xl text-[#f5f5f5] leading-snug">
                &ldquo;{PROFILE.manifestoQuote}&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Right Column: Oversized Editorial Lead + Narrative + 3 Pillars */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-12">
            {/* Animated Editorial Lead Paragraph */}
            <p
              ref={leadWordsRef}
              className="font-display text-xl sm:text-2xl md:text-4xl uppercase leading-[1.2] tracking-tight text-[#f5f5f5]"
            >
              <span className="hidden sm:inline-block sm:w-16 md:w-28" />
              {leadWords.map((word, idx) => (
                <span
                  key={idx}
                  className={`about-lead-word inline-block mr-[0.28em] ${
                    word.includes('Computer') ||
                    word.includes('Software') ||
                    word.includes('CCNA-certified') ||
                    word.includes('security') ||
                    word.includes('neural')
                      ? 'text-[#d60407]'
                      : ''
                  }`}
                >
                  {word}
                </span>
              ))}
            </p>

            {/* Long-Form Background Paragraphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4 border-t border-white/10">
              {PROFILE.aboutParagraphs.slice(0, 2).map((para, i) => (
                <p key={i} className="text-sm sm:text-base text-[#a3a3a3] leading-relaxed font-normal">
                  {para}
                </p>
              ))}
            </div>

            <p className="text-sm sm:text-base md:text-lg text-[#f5f5f5]/90 leading-relaxed border-l border-white/20 pl-4 sm:pl-5">
              {PROFILE.aboutParagraphs[2]}
            </p>

            {/* Professional Philosophy Pillars */}
            <div className="space-y-5 sm:space-y-6 pt-2 sm:pt-4">
              <div className="font-mono-tech text-xs tracking-[0.22em] sm:tracking-[0.25em] uppercase text-[#d60407]">
                ENGINEERING PHILOSOPHY // 01—03
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {PROFILE.philosophies.map((item) => (
                  <div
                    key={item.index}
                    className="p-5 sm:p-6 bg-[#0d0d0d] border border-white/10 hover:border-[#d60407]/60 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-serif-accent text-3xl text-[#d60407] block mb-2">
                        {item.index}
                      </span>
                      <h3 className="font-display text-base uppercase tracking-wider text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#a3a3a3] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crimson Architectural Facts & Figures Band */}
      <div
        ref={metricsRef}
        className="w-full bg-[#990000] text-black py-14 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden"
      >
        <div className="max-w-[1560px] mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-2 border-b border-black/30 pb-4 mb-6 font-mono-tech text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em] uppercase text-black/80">
            <span>VERIFIED CREDENTIALS &amp; TELEMETRY</span>
            <span>NO FABRICATED METRICS</span>
          </div>

          <div className="divide-y divide-black/30">
            {PROFILE.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="metric-strip-row py-6 sm:py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 group"
              >
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono-tech text-xs text-black/60">0{idx + 1}</span>
                  <div className="font-serif-accent text-[clamp(2.8rem,9vw,8.5rem)] leading-none text-black group-hover:text-white transition-colors">
                    {metric.value}
                  </div>
                </div>
                <div className="md:text-right max-w-md pl-7 md:pl-0">
                  <div className="font-display text-base sm:text-lg md:text-2xl uppercase tracking-wider text-black group-hover:text-white transition-colors">
                    {metric.label}
                  </div>
                  <p className="font-mono-tech text-[11px] sm:text-xs uppercase tracking-[0.14em] text-black/75 mt-1">
                    {metric.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
