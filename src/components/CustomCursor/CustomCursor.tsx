import React, { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsapConfig';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface CustomCursorHandle {
  setHover: (hovering: boolean, label?: string) => void;
}

export default function CustomCursor({
  cursorApiRef
}: {
  cursorApiRef: React.MutableRefObject<CustomCursorHandle | null>;
}) {
  // Support any device with a fine pointer and hover capability (including tablets with mouse/trackpad)
  const hasFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const prefersReducedMotion = useReducedMotion();

  const pointerPosRef = useRef<HTMLDivElement>(null);
  const pointerInnerRef = useRef<HTMLDivElement>(null);
  const ringPosRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);
  const ringSpinRef = useRef<HTMLImageElement>(null);
  const labelSpanRef = useRef<HTMLSpanElement>(null);

  const visibleRef = useRef(false);
  const expandedRef = useRef(false);
  const pressedRef = useRef(false);

  // Expose zero-re-render imperative hover API
  useEffect(() => {
    const syncVisualState = () => {
      const pInner = pointerInnerRef.current;
      const rInner = ringInnerRef.current;
      const rSpin = ringSpinRef.current;
      const lSpan = labelSpanRef.current;
      if (!pInner || !rInner || !rSpin || !lSpan) return;

      const isExp = expandedRef.current;
      const isDown = pressedRef.current;

      const pointerScale = isDown ? (isExp ? 0.28 : 0.82) : isExp ? 0.35 : 1;
      const ringScale = isDown ? (isExp ? 0.9 : 0.18) : isExp ? 1 : 0.22;

      pInner.style.transform = `translate3d(-8px, -8px, 0) scale(${pointerScale})`;
      rInner.style.transform = `translate3d(-50%, -50%, 0) scale(${ringScale})`;
      rInner.style.opacity = isExp ? '1' : '0';
      rSpin.style.opacity = isExp ? '0.8' : '0';
      lSpan.style.opacity = isExp ? '1' : '0';
    };

    cursorApiRef.current = {
      setHover: (hovering: boolean, label = 'VIEW') => {
        expandedRef.current = hovering;
        if (hovering && labelSpanRef.current) {
          labelSpanRef.current.textContent = label || 'VIEW';
        }
        syncVisualState();
      }
    };

    return () => {
      cursorApiRef.current = null;
    };
  }, [cursorApiRef]);

  useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion) {
      document.body.classList.remove('custom-cursor-enabled');
      return;
    }

    document.body.classList.add('custom-cursor-enabled');

    const pointerPosEl = pointerPosRef.current;
    const ringPosEl = ringPosRef.current;
    const pointerInnerEl = pointerInnerRef.current;
    const ringInnerEl = ringInnerRef.current;
    if (!pointerPosEl || !ringPosEl || !pointerInnerEl || !ringInnerEl) return;

    // Secondary ring uses ultra-responsive GSAP quickTo without CSS transition contention
    const xToRing = gsap.quickTo(ringPosEl, 'x', { duration: 0.09, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ringPosEl, 'y', { duration: 0.09, ease: 'power3.out' });

    const setCursorVisibility = (show: boolean) => {
      if (visibleRef.current === show) return;
      visibleRef.current = show;
      const opacityVal = show ? '1' : '0';
      pointerPosEl.style.opacity = opacityVal;
      ringPosEl.style.opacity = opacityVal;
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Ignore touch pointers on hybrid touch+mouse devices
      if (e.pointerType === 'touch') {
        setCursorVisibility(false);
        return;
      }

      const x = e.clientX;
      const y = e.clientY;

      if (!visibleRef.current) {
        // Snap immediately on first entrance so cursor never flies in from (0,0)
        pointerPosEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        gsap.set(ringPosEl, { x, y });
        setCursorVisibility(true);
      } else {
        // Zero-latency hardware-accelerated direct transform for primary pointer
        pointerPosEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        xToRing(x);
        yToRing(y);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      pressedRef.current = true;
      const isExp = expandedRef.current;
      pointerInnerEl.style.transform = `translate3d(-8px, -8px, 0) scale(${isExp ? 0.28 : 0.82})`;
      ringInnerEl.style.transform = `translate3d(-50%, -50%, 0) scale(${isExp ? 0.9 : 0.18})`;
    };

    const handlePointerUp = () => {
      pressedRef.current = false;
      const isExp = expandedRef.current;
      pointerInnerEl.style.transform = `translate3d(-8px, -8px, 0) scale(${isExp ? 0.35 : 1})`;
      ringInnerEl.style.transform = `translate3d(-50%, -50%, 0) scale(${isExp ? 1 : 0.22})`;
    };

    const handleMouseLeaveWindow = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setCursorVisibility(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCursorVisibility(false);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseout', handleMouseLeaveWindow, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseout', handleMouseLeaveWindow);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasFinePointer, prefersReducedMotion]);

  if (!hasFinePointer || prefersReducedMotion) return null;

  return (
    <div
      className="custom-cursor-layer pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary Crimson Pointer — Zero-latency direct translate3d wrapper */}
      <div
        ref={pointerPosRef}
        className="fixed top-0 left-0 opacity-0 will-change-transform pointer-events-none"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          transition: 'opacity 150ms ease-out'
        }}
      >
        <div
          ref={pointerInnerRef}
          className="will-change-transform pointer-events-none"
          style={{
            transform: 'translate3d(-8px, -8px, 0) scale(1)',
            transition: 'transform 180ms cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          <img
            src="/assets/reference/cursor.avif"
            alt=""
            draggable={false}
            className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(214,4,7,0.65)] select-none pointer-events-none"
          />
        </div>
      </div>

      {/* Contextual Expanding Ring & Label — Separate inner scale from outer GSAP quickTo */}
      <div
        ref={ringPosRef}
        className="fixed top-0 left-0 opacity-0 will-change-transform pointer-events-none"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          transition: 'opacity 150ms ease-out'
        }}
      >
        <div
          ref={ringInnerRef}
          className="relative w-24 h-24 rounded-full flex items-center justify-center bg-[#050505]/90 border border-[#d60407]/85 shadow-[0_0_30px_rgba(214,4,7,0.45)] will-change-transform pointer-events-none"
          style={{
            transform: 'translate3d(-50%, -50%, 0) scale(0.22)',
            opacity: 0,
            transition:
              'transform 240ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          <img
            ref={ringSpinRef}
            src="/assets/reference/ring.avif"
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-contain scale-125 opacity-0 animate-spin-slow pointer-events-none select-none"
            style={{ transition: 'opacity 200ms ease-out' }}
          />
          <span
            ref={labelSpanRef}
            className="relative z-10 font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[#f5f5f5] text-center px-2 leading-tight opacity-0 pointer-events-none select-none"
            style={{ transition: 'opacity 160ms ease-out' }}
          >
            VIEW
          </span>
        </div>
      </div>
    </div>
  );
}
