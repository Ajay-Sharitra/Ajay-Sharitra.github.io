import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PROFILE } from '../../data/profile';
import { gsap, ScrollTrigger } from '../../animations/gsapConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroProps {
  isReady: boolean;
  onExploreWork: () => void;
  onOpenContact: () => void;
  onCursorHover: (hovering: boolean, label?: string) => void;
}

const CROSSHAIR_ICON = (
  <svg width="16" height="16" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 11.8077V10.1923H9.69231V0.5H11.3077V10.1923H21V11.8077H11.3077V21.5H9.69231V11.8077H0Z"
      fill="currentColor"
    />
  </svg>
);

export default function Hero({
  isReady,
  onExploreWork,
  onOpenContact,
  onCursorHover
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const portraitWrapRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);
  const titleWordsRef = useRef<HTMLDivElement>(null);
  const introBoxRef = useRef<HTMLDivElement>(null);
  const rightIdentifiersRef = useRef<HTMLDivElement>(null);
  const ledgerCrosshairsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Three.js Subtle Crimson Technical Particle & Node Field with Adaptive Mobile Quality & Intersection Pause
  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current || !sectionRef.current) return;

    let rafId: number | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let particlesGeometry: THREE.BufferGeometry | null = null;
    let particlesMaterial: THREE.PointsMaterial | null = null;
    let isHeroVisible = true;

    try {
      const isSmallScreen = window.innerWidth < 768;
      const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.z = 12;

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: !isSmallScreen,
        powerPreference: 'high-performance'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallScreen ? 1.0 : 1.5));

      const count = isSmallScreen ? 90 : 280;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 28;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        const isCrimson = Math.random() > 0.35;
        colors[i * 3] = isCrimson ? 0.84 : 0.7;
        colors[i * 3 + 1] = isCrimson ? 0.02 : 0.7;
        colors[i * 3 + 2] = isCrimson ? 0.03 : 0.7;
      }

      particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      particlesMaterial = new THREE.PointsMaterial({
        size: isSmallScreen ? 0.075 : 0.065,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });

      const points = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(points);

      let mouseX = 0;
      let mouseY = 0;
      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return;
        mouseX = (e.clientX / window.innerWidth - 0.5) * 1.4;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 1.4;
      };
      if (!isCoarse) {
        window.addEventListener('pointermove', onPointerMove, { passive: true });
      }

      const onResize = () => {
        if (!renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize, { passive: true });

      const observer = new IntersectionObserver(
        (entries) => {
          isHeroVisible = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0.02 }
      );
      observer.observe(sectionRef.current);

      const clock = new THREE.Clock();
      const animate = () => {
        if (isHeroVisible && !document.hidden && renderer) {
          const elapsed = clock.getElapsedTime();
          points.rotation.y = elapsed * 0.035 + mouseX * 0.25;
          points.rotation.x = Math.sin(elapsed * 0.15) * 0.08 + mouseY * 0.2;
          renderer.render(scene, camera);
        }
        rafId = requestAnimationFrame(animate);
      };
      animate();

      return () => {
        observer.disconnect();
        if (!isCoarse) {
          window.removeEventListener('pointermove', onPointerMove);
        }
        window.removeEventListener('resize', onResize);
        if (rafId !== null) cancelAnimationFrame(rafId);
        if (particlesGeometry) particlesGeometry.dispose();
        if (particlesMaterial) particlesMaterial.dispose();
        if (renderer) renderer.dispose();
      };
    } catch {
      // Fallback if WebGL unavailable
    }
  }, [prefersReducedMotion]);

  // Entrance & Scroll Parallax Animations (Responsive via gsap.matchMedia)
  useEffect(() => {
    if (!isReady || !sectionRef.current) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Portrait reveal
      if (portraitImgRef.current) {
        gsap.fromTo(
          portraitImgRef.current,
          {
            scale: 0.92,
            yPercent: 5,
            filter: 'brightness(0.18) contrast(1.12)'
          },
          {
            scale: 1,
            yPercent: 0,
            filter: 'brightness(1) contrast(1.04)',
            duration: 1.75,
            ease: 'power3.out'
          }
        );
      }

      // Staggered Headline Words
      if (titleWordsRef.current) {
        const words = titleWordsRef.current.querySelectorAll('.hero-word-inner');
        gsap.fromTo(
          words,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.065,
            ease: 'expo.out',
            delay: 0.12
          }
        );
      }

      // Left Intro Narrative Reveal
      if (introBoxRef.current) {
        const items = introBoxRef.current.querySelectorAll('.hero-intro-item');
        gsap.fromTo(
          items,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.09,
            ease: 'power3.out',
            delay: 0.28
          }
        );
      }

      // Right Technical Identifiers Reveal
      if (rightIdentifiersRef.current) {
        const spans = rightIdentifiersRef.current.querySelectorAll('.hero-tech-id');
        gsap.fromTo(
          spans,
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.07,
            ease: 'power3.out',
            delay: 0.35
          }
        );
      }

      // Device-specific Scroll Parallax
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        if (portraitWrapRef.current) {
          gsap.to(portraitWrapRef.current, {
            yPercent: 14,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true
            }
          });
        }
      });

      if (ledgerCrosshairsRef.current && !prefersReducedMotion) {
        const crosshairs = ledgerCrosshairsRef.current.querySelectorAll('.ledger-plus');
        ScrollTrigger.create({
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const deg = self.progress * 720;
            gsap.set(crosshairs, { rotation: deg });
          }
        });
      }
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [isReady, prefersReducedMotion]);

  // Subtle Mouse Parallax on Portrait (Desktop fine pointer only)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || window.innerWidth < 1024 || !portraitImgRef.current) return;
    const xRatio = (e.clientX / window.innerWidth - 0.5) * 16;
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 10;
    gsap.to(portraitImgRef.current, {
      x: xRatio,
      y: yRatio,
      duration: 0.75,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-dvh-safe overflow-hidden flex flex-col justify-between bg-[#050505] select-none pt-20 sm:pt-24 pb-10 sm:pb-14"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 75% 65% at 55% 42%, rgba(165, 4, 7, 0.36) 0%, rgba(75, 0, 0, 0.16) 48%, rgba(5, 5, 5, 1) 100%)'
      }}
    >
      {/* Subtle 3D Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />

      {/* Background Kinetic Marquee Rail */}
      <div className="absolute inset-x-0 top-[44%] lg:top-1/2 -translate-y-1/2 z-[2] pointer-events-none overflow-hidden opacity-[0.12] lg:opacity-[0.14]">
        <div className="animate-marquee-rail flex items-center whitespace-nowrap">
          {[0, 1].map((idx) => (
            <div key={idx} className="flex items-center">
              <span className="font-display text-[clamp(4.5rem,18vw,19rem)] uppercase tracking-tight text-white mx-6 sm:mx-8 leading-none">
                AJAY SHARITRA — SOFTWARE. SYSTEMS. SECURITY.
              </span>
              <span className="font-serif-accent text-[clamp(4.5rem,18vw,19rem)] text-[#d60407] mx-6 sm:mx-8 leading-none">
                ENGINEERED FOR IMPACT.
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP Central Crimson Portrait Composition (lg and above) */}
      <div
        ref={portraitWrapRef}
        className="hidden lg:flex lg:absolute lg:inset-0 z-[3] items-end justify-center pointer-events-none"
      >
        <div className="relative w-full max-w-[960px] h-[88vh] flex items-end justify-center">
          <img
            ref={portraitImgRef}
            src="/assets/portraits/ajay-crimson-hero.jpg"
            alt="Ajay Sharitra — Software, Systems & Security Engineer"
            fetchPriority="high"
            className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_70px_rgba(0,0,0,0.95)]"
            style={{
              maskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)'
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Foreground Editorial Content Grid */}
      <div className="relative z-[10] max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-12 flex-1 flex flex-col justify-between">
        {/* MOBILE / TABLET DEDICATED PORTRAIT STAGE (Below lg) */}
        <div className="lg:hidden relative w-full mt-2 mb-5 overflow-hidden border border-white/15 bg-[#0b0b0b]">
          <div className="relative aspect-[16/11] sm:aspect-[16/9] w-full overflow-hidden">
            <img
              src="/assets/portraits/ajay-crimson-hero.jpg"
              alt="Ajay Sharitra — Software, Systems & Security Engineer"
              fetchPriority="high"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black/75 backdrop-blur-md border border-[#d60407]/50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d60407] live-crimson-dot" />
                <span className="font-mono-tech text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-[#f5f5f5]">
                  {PROFILE.degree} · CCNA
                </span>
              </div>
              <span className="font-mono-tech text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 bg-[#d60407] text-white">
                TVL // IN
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <span className="font-mono-tech text-[10px] tracking-[0.22em] uppercase text-[#d60407]">
                {PROFILE.name} // PORTFOLIO
              </span>
              <span className="font-mono-tech text-[9px] tracking-[0.16em] uppercase text-white/75">
                PYTHON · GO · JS · PYTORCH
              </span>
            </div>
          </div>
        </div>

        {/* Top / Mid Row: Left Supporting Narrative + Right Floating Technical Identifiers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-1 lg:pt-12">
          {/* Left Column: Supporting Statement & CTAs */}
          <div ref={introBoxRef} className="lg:col-span-4 space-y-4 sm:space-y-5 z-10 order-2 lg:order-1">
            <div className="hero-intro-item hidden lg:inline-flex items-center gap-2.5 px-3 py-1 bg-[#d60407]/15 border border-[#d60407]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d60407] live-crimson-dot" />
              <span className="font-mono-tech text-[10px] tracking-[0.22em] uppercase text-[#f5f5f5]">
                {PROFILE.degree} · CCNA
              </span>
            </div>

            <p className="hero-intro-item text-sm sm:text-base md:text-lg text-[#f5f5f5]/90 font-normal leading-relaxed max-w-[42ch]">
              {PROFILE.heroSubtext}
            </p>

            <p className="hero-intro-item font-mono-tech text-[11px] sm:text-xs text-white/60 leading-relaxed max-w-[44ch]">
              {PROFILE.supportingStatement}
            </p>

            <div className="hero-intro-item grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3 pt-1 sm:pt-2">
              <button
                onClick={onExploreWork}
                onMouseEnter={() => onCursorHover(true, 'EXPLORE')}
                onMouseLeave={() => onCursorHover(false)}
                className="w-full sm:w-auto justify-center px-6 py-3.5 bg-[#d60407] hover:bg-[#b00306] text-white font-mono-tech text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-3 shadow-[0_0_30px_rgba(214,4,7,0.35)] min-h-[46px]"
              >
                <span>SELECTED WORK</span>
                <span>↓</span>
              </button>
              <button
                onClick={onOpenContact}
                onMouseEnter={() => onCursorHover(true, 'CONTACT')}
                onMouseLeave={() => onCursorHover(false)}
                className="w-full sm:w-auto justify-center px-6 py-3.5 bg-white/5 hover:bg-white hover:text-black text-white border border-white/20 font-mono-tech text-xs tracking-[0.2em] uppercase transition-all duration-300 min-h-[46px]"
              >
                INITIATE CONTACT
              </button>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4 lg:order-2" />

          {/* Right Column: Floating Technical Identifiers */}
          <div
            ref={rightIdentifiersRef}
            className="lg:col-span-4 flex flex-col lg:items-end justify-start lg:text-right space-y-1.5 sm:space-y-2 z-10 order-3"
          >
            <div className="hero-tech-id font-mono-tech text-[10px] tracking-[0.22em] sm:tracking-[0.25em] uppercase text-[#d60407] mb-1">
              CORE DISCIPLINES // 01—05
            </div>
            <div className="flex flex-wrap lg:flex-col gap-1.5 sm:gap-2 lg:items-end">
              <span className="hero-tech-id font-display text-xs sm:text-sm md:text-base tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#f5f5f5] px-2.5 py-1 lg:p-0 bg-white/[0.04] lg:bg-transparent border border-white/10 lg:border-none">
                SOFTWARE ENGINEERING
              </span>
              <span className="hero-tech-id font-display text-xs sm:text-sm md:text-base tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#f5f5f5]/85 px-2.5 py-1 lg:p-0 bg-white/[0.04] lg:bg-transparent border border-white/10 lg:border-none">
                IT INFRASTRUCTURE &amp; NETWORKING
              </span>
              <span className="hero-tech-id font-display text-xs sm:text-sm md:text-base tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#f5f5f5]/75 px-2.5 py-1 lg:p-0 bg-white/[0.04] lg:bg-transparent border border-white/10 lg:border-none">
                CYBERSECURITY &amp; HARDENING
              </span>
              <span className="hero-tech-id font-display text-xs sm:text-sm md:text-base tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#f5f5f5]/65 px-2.5 py-1 lg:p-0 bg-white/[0.04] lg:bg-transparent border border-white/10 lg:border-none">
                AI &amp; LLM ARCHITECTURE
              </span>
              <span className="hero-tech-id font-display text-xs sm:text-sm md:text-base tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#d60407] px-2.5 py-1 lg:p-0 bg-[#d60407]/10 lg:bg-transparent border border-[#d60407]/30 lg:border-none">
                SYSTEMS AUTOMATION
              </span>
            </div>

            {/* Floating Telemetry Coordinates */}
            <div className="hero-tech-id pt-4 hidden lg:flex flex-col lg:items-end font-mono-tech text-[10px] tracking-[0.2em] text-white/45 space-y-1">
              <span>LOC // 08.7139° N, 77.7567° E</span>
              <span>CERT // CISCO CCNA VERIFIED</span>
              <span>STACK // PYTHON · GO · JS · PYTORCH</span>
            </div>
          </div>
        </div>

        {/* Bottom Oversized Headline Reveal */}
        <div ref={titleWordsRef} className="mt-4 lg:mt-auto pt-2 lg:pt-6 z-10 order-1 lg:order-4 mb-5 lg:mb-0">
          <div className="hidden lg:flex flex-wrap items-baseline justify-between gap-4 border-b border-white/15 pb-5">
            <div className="overflow-hidden">
              <span className="hero-word-inner block font-mono-tech text-xs sm:text-sm tracking-[0.3em] uppercase text-[#d60407]">
                {PROFILE.name} // PORTFOLIO
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-word-inner block font-mono-tech text-[11px] tracking-[0.22em] uppercase text-white/60">
                SCROLL TO DECONSTRUCT ↓
              </span>
            </div>
          </div>

          <h1 className="mt-1 lg:mt-4 flex flex-wrap items-baseline gap-x-3 sm:gap-x-6 lg:gap-x-8 gap-y-1 leading-[0.88] tracking-tight uppercase">
            <span className="overflow-hidden inline-block max-w-full">
              <span className="hero-word-inner inline-block font-display text-[clamp(2.1rem,9.2vw,8.5rem)] text-[#f5f5f5]">
                SOFTWARE.
              </span>
            </span>
            <span className="overflow-hidden inline-block max-w-full">
              <span className="hero-word-inner inline-block font-serif-accent text-[clamp(2.35rem,9.8vw,9.2rem)] text-[#d60407] lowercase">
                systems.
              </span>
            </span>
            <span className="overflow-hidden inline-block max-w-full">
              <span className="hero-word-inner inline-block font-display text-[clamp(2.1rem,9.2vw,8.5rem)] text-[#f5f5f5]">
                SECURITY.
              </span>
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom Fixed-Style Ledger Strip */}
      <div
        ref={ledgerCrosshairsRef}
        className="relative z-[12] w-full border-t border-white/10 bg-[#050505]/85 backdrop-blur-md px-4 sm:px-6 md:px-12 py-2.5 sm:py-3 mt-6 flex items-center justify-between text-[10px] sm:text-xs tracking-[0.16em] sm:tracking-[0.22em] font-mono-tech uppercase text-white/75"
      >
        <span className="ledger-plus text-[#d60407] inline-flex">{CROSSHAIR_ICON}</span>
        <span>SOFTWARE</span>
        <span className="ledger-plus text-white/60 inline-flex">{CROSSHAIR_ICON}</span>
        <span className="hidden sm:inline">INFRASTRUCTURE</span>
        <span className="ledger-plus text-[#d60407] hidden sm:inline-flex">{CROSSHAIR_ICON}</span>
        <span>SECURITY</span>
        <span className="ledger-plus text-white/60 inline-flex">{CROSSHAIR_ICON}</span>
        <span className="hidden md:inline">INTELLIGENCE</span>
        <span className="ledger-plus text-[#d60407] hidden md:inline-flex">{CROSSHAIR_ICON}</span>
      </div>
    </section>
  );
}
