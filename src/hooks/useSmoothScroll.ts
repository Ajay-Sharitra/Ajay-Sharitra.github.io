import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll(isLocked: boolean = false) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (isLocked) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);

  const scrollTo = (target: string | number | HTMLElement, offset = 0) => {
    const isCoarsePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none), (pointer: coarse)').matches;

    if (lenisRef.current && !isCoarsePointer) {
      lenisRef.current.scrollTo(target, { offset, duration: 1.2 });
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return { lenis: lenisRef.current, scrollTo };
}
